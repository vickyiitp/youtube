import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import TopicInputForm from './components/TopicInputForm';
import LoadingAnimator from './components/LoadingAnimator';
import ResultsView from './components/ResultsView';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import FallbackResultsView from './components/FallbackResultsView';
import Nav from './components/Nav';
import YouTubeSearch from './components/YouTubeSearch';
import { AnalysisResult } from './types';
import { analyzeTopic } from './services/geminiService';

export type ActiveView = 'analyzer' | 'search';

const App: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [activeView, setActiveView] = useState<ActiveView>('analyzer');

  const handleAnalysis = useCallback(async (newTopic: string) => {
    if (!newTopic.trim()) {
      setError('Please enter a topic to analyze.');
      return;
    }
    setTopic(newTopic);
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const analysisResults = await analyzeTopic(newTopic);
      setResults(analysisResults);
    } catch (e) {
      console.error(e);
      setError('An error occurred during analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleTryAgain = () => {
    setResults(null);
    setError(null);
    setTopic('');
  };


  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
        <Nav activeView={activeView} setActiveView={setActiveView} />

        {activeView === 'analyzer' && (
          <>
            {!results && !isLoading && (
               <div className="w-full max-w-5xl text-center animate-fade-in">
                  <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text mb-4">
                      Find Your Next Viral Video
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 mb-8">
                      Our AI analyzes YouTube & Google to uncover hidden content gaps and generate unique ideas for your next video.
                    </p>
                    <TopicInputForm onSubmit={handleAnalysis} isLoading={isLoading} />
                    {error && <p className="text-red-400 mt-4">{error}</p>}
                  </div>
    
                  <div className="mt-24 md:mt-32 space-y-24 md:space-y-32">
                    <HowItWorks />
                    <Features />
                    <Testimonials />
                    <FAQ />
                  </div>
               </div>
            )}
           
            {isLoading && <LoadingAnimator />}
    
            {results && !isLoading && (
               <div className="w-full max-w-5xl animate-fade-in">
                 <div className="text-center mb-12">
                    <h2 className="text-2xl text-slate-400">Content Opportunities for: <span className="font-bold text-cyan-400">"{topic}"</span></h2>
                    <button onClick={handleTryAgain} className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                        Analyze a New Topic
                    </button>
                 </div>
                 {results.isFallback 
                    ? <FallbackResultsView results={results} />
                    : <ResultsView results={results} />
                 }
               </div>
            )}
          </>
        )}

        {activeView === 'search' && <YouTubeSearch />}

      </main>
      <footer className="text-center p-6 mt-16 border-t border-slate-800 text-slate-500">
        <p>&copy; {new Date().getFullYear()} Content Compass AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;