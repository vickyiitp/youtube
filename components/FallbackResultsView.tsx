import React from 'react';
import { AnalysisResult } from '../types';
import AnalyzedVideos from './AnalyzedVideos';
import { AlertIcon } from './icons/AlertIcon';
import { TagIcon } from './icons/TagIcon';

// Utility to get common words from titles
const getCommonThemes = (videos: AnalysisResult['analyzedVideos']): string[] => {
  if (!videos || videos.length === 0) return [];
  
  const stopWords = new Set(['a', 'an', 'the', 'and', 'or', 'but', 'for', 'in', 'on', 'at', 'to', 'of', 'by', 'with', 'is', 'are', 'was', 'were', 'it', 'i', 'you', 'he', 'she', 'they', 'we', 'how', 'what', 'when', 'where', 'why', 'vs', 'your', 'my', 'for', 'the', 'and', 'with', 'to', 'a', 'in', 'of']);
  
  const wordCounts: { [key: string]: number } = {};
  
  videos.forEach(video => {
    video.title
      .toLowerCase()
      .replace(/[^\w\s]/g, '') // remove punctuation
      .split(/\s+/)
      .forEach(word => {
        if (word && !stopWords.has(word) && isNaN(Number(word))) {
          wordCounts[word] = (wordCounts[word] || 0) + 1;
        }
      });
  });

  // Get words that appear more than once (or just the most frequent if none repeat), sort by frequency
  const sortedWords = Object.entries(wordCounts).sort(([, a], [, b]) => b - a);
  const frequentWords = sortedWords.filter(([, count]) => count > 1);
  
  const themes = (frequentWords.length > 0 ? frequentWords : sortedWords).map(([word]) => word);

  return themes.slice(0, 10); // Take top 10
};


const FallbackResultsView: React.FC<{ results: AnalysisResult }> = ({ results }) => {
    const commonThemes = getCommonThemes(results.analyzedVideos);

    return (
        <div className="space-y-8 animate-slide-in-up">
            <div className="bg-yellow-500/10 border border-yellow-400/30 text-yellow-300 px-4 py-3 rounded-lg flex items-start gap-3">
                <AlertIcon className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                    <h3 className="font-bold">AI Analysis Unavailable</h3>
                    <p className="text-sm">We couldn't generate AI-powered insights, likely due to high demand. As a backup, here is a simplified report based on the top YouTube search results for your topic.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {results.analyzedVideos && results.analyzedVideos.length > 0 && (
                    <AnalyzedVideos videos={results.analyzedVideos}/>
                )}

                {commonThemes.length > 0 && (
                    <div className="p-4 bg-slate-800/50 rounded-lg">
                        <h3 className="text-lg font-semibold text-slate-300 mb-3 flex items-center gap-2">
                            <TagIcon className="w-5 h-5"/>
                            Common Themes & Keywords
                        </h3>
                        <p className="text-sm text-slate-400 mb-4">These are the most frequent words found in the top video titles, suggesting key areas of focus.</p>
                        <div className="flex flex-wrap gap-2">
                            {commonThemes.map((theme, i) => (
                                <span key={i} className="bg-slate-700 text-slate-300 text-sm font-medium px-3 py-1 rounded-full">{theme}</span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FallbackResultsView;
