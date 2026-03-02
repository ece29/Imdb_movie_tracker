// SearchInput component - handles movie ID input with validation
'use client';

import { isValidImdbId } from '@/lib/utils';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  isLoading: boolean;
  error?: string;
}

export default function SearchInput({
  value,
  onChange,
  onSearch,
  isLoading,
  error,
}: SearchInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      onSearch();
    }
  };

  const isValid = value.trim().length > 0 && isValidImdbId(value);

  return (
    <div className="w-full space-y-2">
      <div className="flex gap-2 flex-col sm:flex-row">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Enter IMDb ID (e.g., tt0133093 for The Matrix)"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className={`w-full px-4 py-3 border-2 rounded-lg transition-all ${
              error
                ? 'border-red-500 bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300'
                : 'border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
        </div>
        <button
          onClick={onSearch}
          disabled={isLoading || !isValid}
          className={`px-6 py-3 rounded-lg font-semibold transition-all transform ${
            isLoading || !isValid
              ? 'bg-gray-400 cursor-not-allowed opacity-50'
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin inline-block">⏳</span>
              Searching...
            </span>
          ) : (
            '🔍 Search'
          )}
        </button>
      </div>

      {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

      <p className="text-xs text-gray-600">
        💡 Tip: Find IMDb ID at <span className="font-mono bg-gray-100 px-1">imdb.com/title/ID</span>
      </p>
    </div>
  );
}
