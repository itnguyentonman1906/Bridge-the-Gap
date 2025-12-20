
export interface GapAnalysis {
  matchScore: number;
  missingSkills: string[];
  recommendedKeywords: string[];
  resumeFeedback: string;
  atsScore: number;
  suggestions: {
    section: string;
    advice: string;
  }[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface InterviewState {
  isActive: boolean;
  history: Message[];
}

export const AppTab = {
  ANALYZER: 'analyzer',
  SIMULATOR: 'simulator'
} as const;

export type AppTab = typeof AppTab[keyof typeof AppTab];
