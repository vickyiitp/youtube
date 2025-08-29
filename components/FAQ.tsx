
import React from 'react';
import Section from './Section';
import FAQItem from './FAQItem';

const FAQ: React.FC = () => {
  return (
    <Section
      title="Frequently Asked Questions"
      subtitle="Have questions? We've got answers. Here are some of the most common things creators ask about Content Compass AI."
    >
      <div className="max-w-3xl mx-auto text-left space-y-4">
        <FAQItem
          question="Who is this tool for?"
          answer="Content Compass AI is for any YouTube creator, from aspiring beginners looking for their first breakthrough idea to established channels wanting to find new growth areas and stay ahead of trends."
        />
        <FAQItem
          question="How is this different from just searching on YouTube?"
          answer="While YouTube search shows you what's popular, our AI analyzes the *gaps* between what people are searching for and the quality of the content available. It connects YouTube data with Google Search trends to find underserved niches, something manual research can't easily do."
        />
        <FAQItem
          question="What kind of topics work best?"
          answer="You can analyze anything! It works great for broad topics like 'fitness' or 'finance' to find specific niches, as well as for very specific topics like '3D printing for miniatures' to find unique video angles."
        />
        <FAQItem
          question="Are the API keys I provide secure?"
          answer="This application is designed to run entirely in your browser. Your API keys are used for direct communication between your browser and the Google/YouTube APIs and are never stored on any server, ensuring your credentials remain private to you."
        />
      </div>
    </Section>
  );
};

export default FAQ;
