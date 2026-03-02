// MovieCard component - displays movie details with beautiful styling
'use client';

import Image from 'next/image';
import { MovieDetails } from '@/lib/utils';

interface MovieCardProps {
  movie: MovieDetails;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : null;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:scale-102">
      <div className="grid md:grid-cols-3 gap-6 p-6">
        {posterUrl && (
          <div className="md:col-span-1 flex justify-center">
            <Image
              src={posterUrl}
              alt={movie.Title}
              width={200}
              height={300}
              className="rounded-lg shadow-md object-cover"
              priority
            />
          </div>
        )}
        <div className={posterUrl ? 'md:col-span-2' : 'md:col-span-3'}>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{movie.Title}</h2>
          
          <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
            {movie.Year && <span className="font-semibold">📅 {movie.Year}</span>}
            {movie.Rated && <span className="font-semibold">🏷️ {movie.Rated}</span>}
            {movie.imdbRating && <span className="font-semibold">⭐ IMDb {movie.imdbRating}</span>}
            {movie.Runtime && <span className="font-semibold">⏱️ {movie.Runtime}</span>}
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 mb-1">Plot</h3>
            <p className="text-gray-700 leading-relaxed">{movie.Plot}</p>
          </div>

          {movie.Actors && movie.Actors !== 'N/A' && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Cast</h3>
              <p className="text-gray-700 text-sm">{movie.Actors}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
