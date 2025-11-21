export enum AppView {
  DASHBOARD = 'DASHBOARD',
  IDEATION = 'IDEATION',
  SCRIPTING = 'SCRIPTING',
  METADATA = 'METADATA'
}

export interface VideoIdea {
  title: string;
  description: string;
  viralScore: number;
  targetAudience: string;
}

export interface ScriptSection {
  heading: string;
  content: string;
  visualCue: string;
}

export interface GeneratedMetadata {
  titles: string[];
  description: string;
  tags: string[];
}

export interface AnalyticsData {
  day: string;
  views: number;
  subs: number;
}