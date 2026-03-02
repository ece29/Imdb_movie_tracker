// Utility functions for movie data processing and formatting

export interface MovieDetails {
  Title: string;
  Year: string;
  Rated?: string;
  Poster: string;
  Actors: string;
  Plot: string;
  imdbRating?: string;
  Type?: string;
  Runtime?: string;
}

export interface SentimentResult {
  summary: string;
  classification: 'positive' | 'mixed' | 'negative';
}

export interface MovieResponse {
  details: MovieDetails;
  reviews: string[];
  ai: SentimentResult;
}

// Validate IMDb ID format
export function isValidImdbId(id: string): boolean {
  return /^tt\d+$/.test(id.trim());
}

// Format rating display
export function formatRating(rating: string | undefined): string {
  if (!rating || rating === 'N/A') return 'Not rated';
  return `${rating}/10`;
}

// Truncate text to specified length
export function truncateText(text: string, maxLength: number = 250): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Classify sentiment by keywords
export function classifySentiment(text: string): 'positive' | 'mixed' | 'negative' {
  const positiveKeywords = ['great', 'amazing', 'excellent', 'brilliant', 'loved', 'fantastic', 'wonderful', 'masterpiece'];
  const negativeKeywords = ['terrible', 'awful', 'horrible', 'bad', 'worst', 'disappointing', 'waste', 'boring'];
  
  const lower = text.toLowerCase();
  const positiveCount = positiveKeywords.filter(w => lower.includes(w)).length;
  const negativeCount = negativeKeywords.filter(w => lower.includes(w)).length;
  
  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'mixed';
}
