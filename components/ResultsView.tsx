import React from 'react';
import { AnalysisResult } from '../types';
import OpportunityCard from './OpportunityCard';
import AnalyzedVideos from './AnalyzedVideos';

interface ResultsViewProps {
  results: AnalysisResult;
}

const ResultsView: React.FC<ResultsViewProps> = ({ results }) => {
  return (
    <div className="space-y-8">
      {results.opportunityClusters?.map((cluster, index) => (
        <OpportunityCard key={index} cluster={cluster} defaultOpen={index === 0} />
      ))}
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-in-up">
        {results.analyzedVideos && results.analyzedVideos.length > 0 && (
            <AnalyzedVideos videos={results.analyzedVideos}/>
        )}

        {results.groundingSources && results.groundingSources.length > 0 && (
            <div className="p-4 bg-slate-800/50 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-300 mb-3">Web Data Sources</h3>
                <ul className="space-y-2">
                    {results.groundingSources.map((source, index) => (
                        <li key={index} className="text-sm">
                            <a 
                              href={source.uri} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-cyan-400 hover:text-cyan-300 hover:underline truncate block"
                            >
                              {source.title || source.uri}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        )}
      </div>
    </div>
  );
};

export default ResultsView;