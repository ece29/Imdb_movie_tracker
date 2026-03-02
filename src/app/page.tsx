"use client";

import { useState } from "react";
import SearchInput from "@/components/SearchInput";
import MovieCard from "@/components/MovieCard";
import SentimentDisplay from "@/components/SentimentDisplay";
import ReviewsDisplay from "@/components/ReviewsDisplay";
import { MovieDetails, SentimentResult } from "@/lib/utils";

export default function Home() {
  const [id, setId] = useState("");
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [reviews, setReviews] = useState<string[]>([]);
  const [ai, setAi] = useState<SentimentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!id.trim()) {
      setError("Please enter an IMDb ID");
      return;
    }
    setError(null);
    setLoading(true);
    setMovie(null);
    setReviews([]);
    setAi(null);
    try {
      const res = await fetch(`/api/movie?imdbId=${encodeURIComponent(id.trim())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch data");
      setMovie(data.details);
      setReviews(data.reviews || []);
      setAi(data.ai);
    } catch (e: any) {
      setError(e.message || "An error occurred");
      setMovie(null);
      setReviews([]);
      setAi(null);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            🎬 AI Movie Insight Builder
          </h1>
          <p className="text-gray-600">Discover movie details, read reviews, and get AI-powered sentiment analysis</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12 space-y-8">
        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-600">
          <SearchInput
            value={id}
            onChange={setId}
            onSearch={fetchData}
            isLoading={loading}
            error={error || undefined}
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin text-4xl mb-4">🎥</div>
            <p className="text-lg font-semibold text-gray-700">Fetching movie data and analyzing reviews...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
          </div>
        )}

        {/* Results Section */}
        {!loading && movie && (
          <div className="space-y-6 animate-fadeIn">
            {/* Movie Card */}
            <MovieCard movie={movie} />

            {/* Sentiment Analysis */}
            {ai && (
              <SentimentDisplay sentiment={ai} reviewCount={reviews.length} />
            )}

            {/* Reviews Section */}
            {reviews.length > 0 && (
              <ReviewsDisplay reviews={reviews} />
            )}
          </div>
        )}

        {/* Empty State */}
        {!loading && !movie && !error && (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow-sm">
            <div className="text-6xl mb-4">🍿</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to explore?</h2>
            <p className="text-gray-600 text-center max-w-md">
              Enter an IMDb movie ID above to get started. Find movie details, read audience reviews, and discover what people think!
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <p className="text-sm">Built with Next.js, React, and OpenAI · Powered by OMDB API and IMDb</p>
          <p className="text-xs text-gray-500 mt-2">Contact: abhay@brew.tv</p>
        </div>
      </footer>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
