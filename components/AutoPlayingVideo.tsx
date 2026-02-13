
import React, { useRef, useEffect } from 'react';

interface AutoPlayingVideoProps {
  src: string;
  poster: string;
  className?: string;
}

/**
 * Utility to attempt conversion of a Google Drive share link to a direct stream link.
 * Note: Google Drive hotlinking is unreliable for production, but common in showcases.
 */
const getDirectVideoUrl = (url: string) => {
  if (url.includes('drive.google.com')) {
    const match = url.match(/\/d\/(.+?)\//);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=download&id=${match[1]}`;
    }
  }
  return url;
};

export const AutoPlayingVideo: React.FC<AutoPlayingVideoProps> = ({ src, poster, className = "" }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const directSrc = getDirectVideoUrl(src);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            video.play().catch(() => {
              // Browsers might block even muted autoplay if user hasn't interacted 
              // or due to battery saver, we handle gracefully.
            });
          } else if (entry.intersectionRatio < 0.3) {
            video.pause();
          }
        });
      },
      { 
        threshold: [0.3, 0.6],
        rootMargin: '0px'
      }
    );

    observer.observe(video);
    return () => {
      observer.unobserve(video);
      observer.disconnect();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      className={`w-full h-full object-cover ${className}`}
    >
      <source src={directSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};
