
import React from 'react';
import Section from './Section';

const TestimonialCard = ({ quote, name, role }: { quote: string, name: string, role: string }) => (
    <div className="p-6 bg-slate-800/30 rounded-lg border border-slate-700/50 text-left flex flex-col h-full">
        <p className="text-slate-300 flex-grow">"{quote}"</p>
        <div className="mt-4 pt-4 border-t border-slate-700">
            <p className="font-bold text-slate-100">{name}</p>
            <p className="text-sm text-cyan-400">{role}</p>
        </div>
    </div>
);

const Testimonials: React.FC = () => {
  return (
    <Section
      title="Trusted by Creators of All Sizes"
      subtitle="See how Content Compass AI is helping creators break through the noise and build engaged audiences."
    >
      <div className="grid md:grid-cols-3 gap-6">
        <TestimonialCard 
            name="Alex 'TechFlow' Rivera"
            role="Tech YouTuber - 250k Subscribers"
            quote="I was stuck in a content rut. This tool didn't just give me keywords, it gave me a whole new direction for my channel that my audience loves."
        />
        <TestimonialCard 
            name="Brenda Chen"
            role="Cooking Channel - 15k Subscribers"
            quote="Finding underserved niches in the cooking space is impossible. Content Compass found three for me in five minutes. My last video based on its idea is my best performing one yet!"
        />
        <TestimonialCard 
            name="Sam Jones"
            role="Gaming Historian - 80k Subscribers"
            quote="The opportunity score is a game-changer. It helps me decide which deep-dive video to produce next by showing me what my audience is actually hungry for."
        />
      </div>
    </Section>
  );
};

export default Testimonials;