
import { GoogleGenAI } from "@google/genai";

export async function getAIConsultantResponse(prompt: string): Promise<string> {
  // Safety check to prevent app crash if process.env is missing (e.g. static GitHub Pages deployment)
  const apiKey = typeof process !== 'undefined' && process.env ? process.env.API_KEY : null;
  
  if (!apiKey) {
    console.error("Gemini API Key missing in process.env");
    return "The AI consultant is currently offline as the API key is not configured. Please contact administration.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: `You are the Lead Strategy Consultant for Web Prime AI (WebPrimeAI.in).
        
        Our Services:
        1. Website Design & Development: Custom UI/UX, mobile-first, performance-driven. Best for brands wanting more leads/sales.
        2. UGC Ads (User-Generated Content): Authentic creator-style video ads for Reels/Shorts/TikTok. Best for brands running paid social.
        3. AI QR Screen Solutions: Smart engagement systems that turn offline scans into online action. Best for retail, events, and outdoor ads.
        
        Brand Messaging: "Build Smarter. Engage Better. Convert Faster."
        Approach: No buzzwords, just results. Design meets intelligence.
        
        Contact Info:
        - Email: hello@webprimai.in
        - Phone / WhatsApp: +91 95992 03951
        - Locations: Specializing in high-impact solutions for modern businesses.
        
        Your Goal: Be a helpful, conversion-focused strategist. Help users understand how our services solve their business problems. Encourage them to book a free consultation or demo.`,
        temperature: 0.7,
      },
    });

    return response.text || "I'm having trouble thinking right now. Could you rephrase that?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered an error while processing your request. Let's try again in a moment.";
  }
}
