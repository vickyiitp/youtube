
import React from 'react';

interface SectionProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, subtitle, children }) => {
  return (
    <section className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-100">{title}</h2>
      <p className="mt-3 text-lg text-slate-400 max-w-2xl mx-auto">{subtitle}</p>
      <div className="mt-12">
        {children}
      </div>
    </section>
  );
};

export default Section;