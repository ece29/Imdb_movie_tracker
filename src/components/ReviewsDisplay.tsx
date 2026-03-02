// ReviewsDisplay component - shows sample reviews from audience
'use client';

interface ReviewsDisplayProps {
  reviews: string[];
  maxReviewsShow?: number;
}

export default function ReviewsDisplay({ reviews, maxReviewsShow = 5 }: ReviewsDisplayProps) {
  if (reviews.length === 0) {
    return (
      <div className="bg-gray-100 rounded-lg p-6 text-center text-gray-600">
        <p>No reviews available for this movie.</p>
      </div>
    );
  }

  const displayReviews = reviews.slice(0, maxReviewsShow);

  return (
    <div className="space-y-4 animate-fadeIn">
      <h3 className="text-xl font-bold text-gray-900">
        Sample Audience Reviews ({reviews.length} total)
      </h3>

      <div className="space-y-3">
        {displayReviews.map((review, idx) => (
          <div
            key={idx}
            className="bg-gray-50 border-l-4 border-blue-500 p-4 rounded hover:bg-gray-100 transition-colors"
          >
            <p className="text-gray-700 italic">
              \"{review.length > 200 ? review.substring(0, 200) + '...' : review}\"
            </p>
            <span className="text-xs text-gray-500 mt-2 block">Review {idx + 1} of {maxReviewsShow}</span>
          </div>
        ))}
      </div>

      {reviews.length > maxReviewsShow && (
        <p className="text-sm text-gray-600 text-center mt-4">
          ... and {reviews.length - maxReviewsShow} more reviews
        </p>
      )}
    </div>
  );
}
