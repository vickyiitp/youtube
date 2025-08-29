
import React, { useState } from 'react';
import { OpportunityCluster } from '../types';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { ScriptIcon } from './icons/ScriptIcon';
import { VideoIcon } from './icons/VideoIcon';
import { TagIcon } from './icons/TagIcon';


interface OpportunityCardProps {
  cluster: OpportunityCluster;
  defaultOpen?: boolean;
}

const OpportunityScore: React.FC<{ score: number }> = ({ score }) => {
    const getScoreColor = () => {
        if (score > 80) return 'bg-green-500/20 text-green-300 border-green-400/30';
        if (score > 60) return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30';
        return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
    };

    return (
        <div className={`px-3 py-1 text-sm font-bold rounded-full border ${getScoreColor()}`}>
            Opportunity: {score}/100
        </div>
    );
};


const OpportunityCard: React.FC<OpportunityCardProps> = ({ cluster, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-slate-700/50 bg-slate-800/30 rounded-xl shadow-lg transition-all duration-300 animate-slide-in-up">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 md:p-6 flex justify-between items-center text-left"
      >
        <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
                {cluster.clusterTitle}
            </h3>
            <p className="text-slate-400 mt-1 text-sm md:text-base">{cluster.description}</p>
        </div>
        <div className="flex items-center gap-4 ml-4">
            <OpportunityScore score={cluster.opportunityScore} />
            <ChevronDownIcon className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 md:px-6 pb-6 pt-2 border-t border-slate-700/50">
           <div className="my-4">
                <div className="flex items-center gap-2 mb-2 text-slate-300">
                    <TagIcon className="w-5 h-5"/>
                    <h4 className="font-semibold">Related Keywords</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                    {cluster.relatedKeywords.map((keyword, i) => (
                        <span key={i} className="bg-slate-700 text-slate-300 text-xs font-medium px-2.5 py-1 rounded-full">{keyword}</span>
                    ))}
                </div>
            </div>
            
          {cluster.videoIdeas.map((idea, index) => (
            <div key={index} className="mt-6 p-4 bg-slate-900/50 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                    <LightbulbIcon className="w-6 h-6 text-yellow-300"/>
                    <h4 className="text-lg font-semibold text-slate-100">{idea.title}</h4>
                </div>
                
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-slate-300">
                      <ScriptIcon className="w-5 h-5"/>
                      <h5 className="font-semibold">Script Outline</h5>
                  </div>
                  <ul className="space-y-2 text-slate-400 text-sm list-disc list-inside">
                    <li><span className="font-bold text-slate-300">Hook:</span> {idea.scriptOutline.hook}</li>
                    {idea.scriptOutline.mainPoints.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                    <li><span className="font-bold text-slate-300">CTA:</span> {idea.scriptOutline.cta}</li>
                  </ul>
                </div>
                <div>
                   <div className="flex items-center gap-2 mb-2 text-slate-300">
                      <VideoIcon className="w-5 h-5"/>
                      <h5 className="font-semibold">Format Suggestion</h5>
                  </div>
                  <p className="text-slate-400 text-sm">{idea.formatSuggestion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OpportunityCard;
