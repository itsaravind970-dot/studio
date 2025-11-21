import React, { useState } from 'react';
import { generateVideoIdeas } from '../services/geminiService';
import { VideoIdea } from '../types';
import { Sparkles, Loader2, TrendingUp, Target } from 'lucide-react';

export const IdeaGenerator: React.FC = () => {
  const [niche, setNiche] = useState('');
  const [ideas, setIdeas] = useState<VideoIdea[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!niche.trim()) return;
    setLoading(true);
    try {
      const result = await generateVideoIdeas(niche);
      setIdeas(result);
    } catch (e) {
      console.error(e);
      alert('Failed to generate ideas. Please check your API key or try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6 md:space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Idea Generator</h1>
        <p className="text-sm md:text-base text-zinc-400">Input your niche and let Gemini find high-potential viral concepts.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center bg-zinc-900 p-2 rounded-xl border border-zinc-800 focus-within:border-red-600 transition-colors">
        <input
          type="text"
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          placeholder="E.g., 'Vegan Meal Prep', 'Gaming News'"
          className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-base md:text-lg text-white placeholder-zinc-600"
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !niche}
          className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all whitespace-nowrap"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
          Generate
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {ideas.map((idea, index) => (
          <div 
            key={index} 
            className="bg-zinc-900 border border-zinc-800 hover:border-zinc-600 p-5 md:p-6 rounded-xl flex flex-col gap-4 transition-all hover:shadow-xl hover:shadow-black/50 group"
          >
            <div className="flex justify-between items-start">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-600/10 flex items-center justify-center text-red-500 font-bold text-sm md:text-base">
                #{index + 1}
              </div>
              <div className="flex items-center gap-1 text-xs font-medium bg-zinc-800 px-2 py-1 rounded text-zinc-400">
                <TrendingUp className="w-3 h-3 text-green-500" />
                Score: {idea.viralScore}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors leading-tight">
                {idea.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {idea.description}
              </p>
            </div>

            <div className="mt-auto pt-4 border-t border-zinc-800">
              <div className="flex items-start gap-2">
                <Target className="w-4 h-4 text-zinc-500 mt-1" />
                <span className="text-xs text-zinc-500">{idea.targetAudience}</span>
              </div>
            </div>
          </div>
        ))}
        
        {!loading && ideas.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center h-64 text-zinc-600 border-2 border-dashed border-zinc-800 rounded-xl bg-zinc-900/30">
            <LightbulbOffIcon className="w-10 h-10 md:w-12 md:h-12 mb-4 opacity-50" />
            <p className="text-sm md:text-base">Enter a niche above to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const LightbulbOffIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2v1"/><path d="M5.22 5.22 4.15 4.15"/><path d="M12 6a6 6 0 0 0-6 6c0 2.21 1.33 4.15 3.28 5.2a2.04 2.04 0 0 1 .72 1.8"/><path d="m19.85 4.15-1.07 1.07"/><path d="M21 12c0 2.21-1.33 4.15-3.28 5.2a2.04 2.04 0 0 0-.72 1.8"/></svg>
);