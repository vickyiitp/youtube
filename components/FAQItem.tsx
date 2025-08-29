
import React, { useState } from 'react';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-700/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-4"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-slate-100">{question}</span>
        <ChevronDownIcon
          className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
            <p className="pb-4 text-slate-400">
                {answer}
            </p>
        </div>
      </div>
    </div>
  );
};

export default FAQItem;