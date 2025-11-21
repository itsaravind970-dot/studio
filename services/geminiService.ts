import { GoogleGenAI, Type } from "@google/genai";
import { VideoIdea, ScriptSection, GeneratedMetadata } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateVideoIdeas = async (niche: string): Promise<VideoIdea[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate 5 distinct, high-potential YouTube video ideas for the niche: "${niche}". Focus on trending topics and high click-through potential.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              viralScore: { type: Type.NUMBER, description: "A score from 1-100 indicating potential virality" },
              targetAudience: { type: Type.STRING }
            },
            required: ["title", "description", "viralScore", "targetAudience"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as VideoIdea[];
    }
    return [];
  } catch (error) {
    console.error("Error generating ideas:", error);
    throw error;
  }
};

export const generateScript = async (title: string): Promise<ScriptSection[]> => {
  try {
    // Using gemini-3-pro-preview for better reasoning on long-form content
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Write a structured YouTube video script for a video titled: "${title}". 
      Break it down into sections (Intro, Body Paragraphs, Outro). 
      Include visual cues for the editor.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              heading: { type: Type.STRING, description: "Section header like Intro, Point 1, etc." },
              content: { type: Type.STRING, description: "The spoken script for this section" },
              visualCue: { type: Type.STRING, description: "Instructions for b-roll or graphics" }
            },
            required: ["heading", "content", "visualCue"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as ScriptSection[];
    }
    return [];
  } catch (error) {
    console.error("Error generating script:", error);
    throw error;
  }
};

export const optimizeMetadata = async (description: string): Promise<GeneratedMetadata | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Optimize YouTube metadata for a video about: "${description}". 
      Provide 5 click-bait yet accurate titles, a SEO-optimized description (first 2 sentences are crucial), and a list of 15 relevant tags.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            titles: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            description: { type: Type.STRING },
            tags: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            }
          },
          required: ["titles", "description", "tags"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as GeneratedMetadata;
    }
    return null;
  } catch (error) {
    console.error("Error optimizing metadata:", error);
    throw error;
  }
};