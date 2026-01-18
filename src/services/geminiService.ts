
import { GoogleGenAI, Type } from "@google/genai";
import type { GapAnalysis } from "../types";

// Always initialize the GoogleGenAI client with the process.env.GEMINI_API_KEY string directly
const getAI = () => new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const analyzeCVMatch = async (cvText: string, jdText: string): Promise<GapAnalysis> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the following CV against the provided Job Description (JD). 
    CV: ${cvText}
    JD: ${jdText}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          matchScore: { type: Type.NUMBER, description: "Match percentage between 0 and 100" },
          missingSkills: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific technical or soft skills mentioned in JD but missing in CV" },
          recommendedKeywords: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Keywords to add for better ATS filtering" },
          resumeFeedback: { type: Type.STRING, description: "General professional feedback on the resume layout and impact" },
          atsScore: { type: Type.NUMBER, description: "Estimated score for automated tracking systems" },
          suggestions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                section: { type: Type.STRING },
                advice: { type: Type.STRING }
              }
            }
          }
        },
        required: ["matchScore", "missingSkills", "recommendedKeywords", "resumeFeedback", "atsScore", "suggestions"]
      }
    }
  });

  // Extract text content using the .text property as per SDK guidelines
  return JSON.parse(response.text || '{}') as GapAnalysis;
};

export const startInterviewChat = (cvText: string, jdText: string) => {
  const ai = getAI();
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are a professional Senior Hiring Manager. 
      The user is applying for a job based on this JD: "${jdText}". 
      Their background is: "${cvText}".
      Conduct a realistic technical and behavioral interview. 
      Ask one question at a time. 
      Provide brief feedback after their answers and follow up.
      Be demanding but fair.`,
    }
  });
};
