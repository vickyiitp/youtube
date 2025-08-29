export interface VideoIdea {
  title: string;
  scriptOutline: {
    hook: string;
    mainPoints: string[];
    cta: string;
  };
  formatSuggestion: string;
}

export interface OpportunityCluster {
  clusterTitle: string;
  description: string;
  opportunityScore: number;
  videoIdeas: VideoIdea[];
  relatedKeywords: string[];
}

export interface GroundingSource {
    uri: string;
    title: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
  description: string;
  viewCount?: string;
  likeCount?: string;
  commentCount?: string;
  publishedAt?: string;
}

export interface AnalysisResult {
  opportunityClusters?: OpportunityCluster[];
  groundingSources?: GroundingSource[];
  analyzedVideos?: YouTubeVideo[];
  isFallback?: boolean;
}