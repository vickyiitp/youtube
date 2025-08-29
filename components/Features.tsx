
import React from 'react';
import Section from './Section';
import { AIBrainIcon } from './icons/AIBrainIcon';
import { DatabaseIcon } from './icons/DatabaseIcon';
import { TargetIcon } from './icons/TargetIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';

const FeatureCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <div className="p-6 bg-slate-800/30 rounded-lg border border-slate-700/50 text-left">
    <div className="flex items-center gap-4">
        {icon}
        <h3 className="text-xl font-bold text-slate-100">{title}</h3>
    </div>
    <p className="mt-3 text-slate-400">{children}</p>
  </div>
);

const Features: React.FC = () => {
  return (
    <Section
      title="Your AI-Powered Content Strategist"
      subtitle="We go beyond simple keyword research to give you a true competitive edge in the crowded creator economy."
    >
      <div className="grid md:grid-cols-2 gap-6">
        <FeatureCard 
            icon={<DatabaseIcon className="w-8 h-8 text-cyan-400" />}
            title="Data-Driven Analysis"
        >
            Leverages both Google Search and the YouTube API to ground its analysis in what people are actively searching for and watching right now.
        </FeatureCard>
        <FeatureCard 
            icon={<AIBrainIcon className="w-8 h-8 text-purple-400" />}
            title="Advanced AI Strategy"
        >
            Uses the powerful Gemini model to not just gather data, but to synthesize it, identifying patterns, gaps, and unique angles that humans might miss.
        </FeatureCard>
        <FeatureCard 
            icon={<TargetIcon className="w-8 h-8 text-green-400" />}
            title="Niche Opportunity Discovery"
        >
            Pinpoints underserved "Opportunity Clusters" within your topic, giving you a roadmap to content that has a built-in audience with low competition.
        </FeatureCard>
        <FeatureCard 
            icon={<LightbulbIcon className="w-8 h-8 text-yellow-400" />}
            title="Creative Idea Generation"
        >
            Provides concrete video ideas complete with catchy titles, script outlines, and format suggestions to eliminate creator's block.
        </FeatureCard>
      </div>
    </Section>
  );
};

export default Features;