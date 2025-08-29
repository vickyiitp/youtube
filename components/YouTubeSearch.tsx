import React, { useState } from 'react';
import { searchVideos } from '../services/youtubeService';
import { YouTubeVideo } from '../types';
import VideoResultCard from './VideoResultCard';
import VideoDetailModal from './VideoDetailModal';
import { SearchIcon } from './icons/SearchIcon';
import { YouTubeIcon } from './icons/YouTubeIcon';
import { KeyIcon } from './icons/KeyIcon';

const YouTubeSearch: React.FC = () => {
  const isApiKeySet = !!process.env.YOUTUBE_API_KEY;

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || !isApiKeySet) return;

    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setResults([]);

    try {
      const videos = await searchVideos(query);
      setResults(videos);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('YOUTUBE_API_KEY')) {
          setError("Configuration Error: The YOUTUBE_API_KEY is missing. Please set it in your environment's secrets.");
        } else if (err.message.includes('status 403')) {
          setError("API Error (403): Access Forbidden. Your key may be invalid, restricted, or have exceeded its daily quota.");
        } else if (err.message.includes('status 400')) {
          setError("API Error (400): Bad Request. Please check your search query.");
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }
      } else {
        setError('An unknown error occurred while fetching videos.');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCardClick = (video: YouTubeVideo) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  }

  return (
    <>
      <div className="w-full max-w-7xl mx-auto animate-fade-in">
        <div className="p-4 md:p-6 bg-slate-800/30 rounded-lg border border-slate-700/50">
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
              <YouTubeIcon className="w-8 h-8 text-red-500" />
              YouTube Video Search
          </h2>
          <p className="text-slate-400 mt-1">
              Search for videos on YouTube to research topics, analyze competitors, and find inspiration.
          </p>
          
          {!isApiKeySet && (
            <div className="mt-6 bg-purple-500/10 border border-purple-400/30 text-purple-300 p-4 rounded-lg flex items-start gap-4 animate-pulse-glow">
              <KeyIcon className="w-8 h-8 mt-1 flex-shrink-0 text-purple-400" />
              <div>
                <h3 className="font-bold text-lg text-purple-200">Set Your YouTube API Key to Continue</h3>
                <p className="text-sm mt-1">
                  This feature requires a YouTube API key. Please open the{' '}
                  <strong className="text-purple-200">"Secrets"</strong> tab in your development environment (usually in the left sidebar) to add your key.
                </p>
                <div className="mt-3 text-xs bg-slate-900/50 p-2 rounded-md font-mono">
                    <p>Secret Name: <code className="bg-slate-700 px-1.5 py-1 rounded">YOUTUBE_API_KEY</code></p>
                    <p className="mt-1">Secret Value: <code className="bg-slate-700 px-1.5 py-1 rounded">[Paste Your Key Here]</code></p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSearch} className="mt-6 flex flex-col sm:flex-row gap-2">
              <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={!isApiKeySet ? "API key required to search" : "e.g., 'Unreal Engine 5 beginner tutorial'"}
                  className="flex-grow bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading || !isApiKeySet}
              />
              <button
                  type="submit"
                  disabled={isLoading || !isApiKeySet}
                  className="bg-gradient-to-r from-red-600 to-red-800 text-white font-bold py-3 px-6 rounded-lg hover:from-red-700 hover:to-red-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                  {isLoading ? (
                      <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Searching...
                      </>
                  ) : (
                      <div className="flex items-center gap-2">
                          <SearchIcon className="w-5 h-5" />
                          Search
                      </div>
                  )}
              </button>
          </form>
        </div>

          {error && <p className="text-red-400 mt-4 text-center p-4 bg-red-500/10 rounded-lg">{error}</p>}
        
        <div className="mt-8">
          {isLoading && (
              <div className="text-center text-slate-400">Loading results...</div>
          )}

          {!isLoading && hasSearched && results.length === 0 && !error && (
              <div className="text-center text-slate-400 p-8 bg-slate-800/30 rounded-lg">
                  <h3 className="text-xl font-semibold text-slate-200">No results found.</h3>
                  <p>Try a different search term to find videos.</p>
              </div>
          )}
          
          {!isLoading && !hasSearched && !isApiKeySet && (
             <div className="text-center text-slate-500 p-8">
                  <p>Please configure your YouTube API key to begin searching.</p>
              </div>
          )}

          {!isLoading && !hasSearched && isApiKeySet && (
              <div className="text-center text-slate-500 p-8">
                  <p>Enter a topic above to search for YouTube videos.</p>
              </div>
          )}

          {results.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {results.map(video => (
                      <VideoResultCard key={video.id} video={video} onCardClick={handleCardClick} />
                  ))}
              </div>
          )}
        </div>
      </div>
      {selectedVideo && <VideoDetailModal video={selectedVideo} onClose={handleCloseModal} />}
    </>
  );
};

export default YouTubeSearch;