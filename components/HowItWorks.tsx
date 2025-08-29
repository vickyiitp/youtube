
import React from 'react';
import Section from './Section';
import { SearchIcon } from './icons/SearchIcon';
import { AIBrainIcon } from './icons/AIBrainIcon';
import { ChartIcon } from './icons/ChartIcon';

const HowItWorks: React.FC = () => {
  return (
    <Section
      title="Go From Idea to Viral Hit in 3 Steps"
      subtitle="Our streamlined process turns your raw ideas into a data-backed content strategy, ready for you to execute."
    >
      <div className="grid md:grid-cols-3 gap-8 md:gap-12 text-left">
        <div className="p-6 bg-slate-800/30 rounded-lg border border-slate-700/50">
          <div className="flex items-center justify-center bg-slate-700/50 w-12 h-12 rounded-lg mb-4">
            <SearchIcon className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-100">1. Input Your Topic</h3>
          <p className="mt-2 text-slate-400">
            Start with a broad topic, a niche interest, or even a single keyword. The more specific you are, the more tailored the insights will be.
          </p>
        </div>
        <div className="p-6 bg-slate-800/30 rounded-lg border border-slate-700/50">
          <div className="flex items-center justify-center bg-slate-700/50 w-12 h-12 rounded-lg mb-4">
            <AIBrainIcon className="w-6 h-6 text-cyan-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-100">2. AI Analyzes the Market</h3>
          <p className="mt-2 text-slate-400">
            Our AI scans top-ranking YouTube videos and Google search results in real-time to understand the current landscape and audience demand.
          </p>
        </div>
        <div className="p-6 bg-slate-800/30 rounded-lg border border-slate-700/50">
          <div className="flex items-center justify-center bg-slate-700/50 w-12 h-12 rounded-lg mb-4">
            <ChartIcon className="w-6 h-6 text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-100">3. Get Actionable Insights</h3>
          <p className="mt-2 text-slate-400">
            Receive a report of untapped "Opportunity Clusters," complete with opportunity scores, keywords, and concrete video ideas with script outlines.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default HowItWorks;