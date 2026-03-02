// SentimentDisplay component - shows AI sentiment analysis results
'use client';

import { SentimentResult } from '@/lib/utils';

interface SentimentDisplayProps {
  sentiment: SentimentResult;
  reviewCount: number;
}

export default function SentimentDisplay({ sentiment, reviewCount }: SentimentDisplayProps) {
  const getClassColor = () => {
    switch (sentiment.classification) {
      case 'positive':
        return 'bg-green-50 border-green-200 text-green-900';
      case 'negative':
        return 'bg-red-50 border-red-200 text-red-900';
      default:
        return 'bg-yellow-50 border-yellow-200 text-yellow-900';
    }
  };

  const getClassIcon = () => {
    switch (sentiment.classification) {
      case 'positive':
        return '😊';
      case 'negative':
        return '😞';
      default:
        return '😐';
    }
  };

  const getClassLabel = () => {
    return sentiment.classification.charAt(0).toUpperCase() + sentiment.classification.slice(1);
  };

  return (
    <div className={`border-2 rounded-lg p-6 ${getClassColor()} animate-fadeIn`}>
      <div className="flex items-start gap-4">
        <div className="text-4xl">{getClassIcon()}</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
            Audience Sentiment: {getClassLabel()}
          </h3>
          <p className="text-sm opacity-75 mb-3">Based on {reviewCount} reviews analyzed</p>
          <p className="leading-relaxed italic">\"{sentiment.summary}\"</p>
        </div>
      </div>
      
      {/* Sentiment indicator bar */}
      <div className="mt-4 h-2 bg-white rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${
            sentiment.classification === 'positive'
              ? 'bg-green-500 w-4/5'
              : sentiment.classification === 'negative'
              ? 'bg-red-500 w-1/3'
              : 'bg-yellow-500 w-1/2'
          }`}
        />
      </div>
    </div>
  );
}
