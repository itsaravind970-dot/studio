import React, { useState } from 'react';
import { optimizeMetadata } from '../services/geminiService';
import { GeneratedMetadata } from '../types';
import { Search, Loader2, Tag, Type, AlignLeft } from 'lucide-react';

export const MetadataOptimizer: React.FC = () => {
  const [description, setDescription] = useState('');
  const [metadata, setMetadata] = useState<GeneratedMetadata | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOptimize = async () => {
    if (!description.trim()) return;
    setLoading(true);
    try {
      const result = await optimizeMetadata(description);
      setMetadata(result);
    } catch (e) {
      console.error(e);
      alert('Optimization failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6 md:space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-white">SEO Optimizer</h1>
        <p className="text-sm md:text-base text-zinc-400">Get click-worthy titles, optimized descriptions, and tags.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="bg-zinc-900 p-4 md:p-6 rounded-xl border border-zinc-800">
            <label className="block text-sm font-medium text-zinc-400 mb-3">Video Concept</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="E.g. A video about how I built a SaaS in 24 hours..."
              className="w-full h-40 md:h-48 bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-base text-white resize-none focus:border-red-600 outline-none transition-colors"
            />
            <button
              onClick={handleOptimize}
              disabled={loading || !description}
              className="w-full mt-4 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Search className="w-5 h-5" />}
              Optimize Metadata
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          {metadata ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Titles */}
              <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
                <div className="bg-zinc-950 p-3 border-b border-zinc-800 flex items-center gap-2">
                  <Type className="w-4 h-4 text-purple-500" />
                  <h3 className="font-medium text-zinc-200">Titles</h3>
                </div>
                <div className="p-3 md:p-4 space-y-2">
                  {metadata.titles.map((t, i) => (
                    <div key={i} className="p-3 hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors group flex justify-between items-center">
                      <span className="text-sm md:text-base text-zinc-300 group-hover:text-white">{t}</span>
                      <span className="text-xs text-zinc-600 group-hover:text-zinc-400 hidden md:block">Copy</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
                <div className="bg-zinc-950 p-3 border-b border-zinc-800 flex items-center gap-2">
                  <AlignLeft className="w-4 h-4 text-blue-500" />
                  <h3 className="font-medium text-zinc-200">Description</h3>
                </div>
                <div className="p-3 md:p-4">
                  <p className="text-zinc-300 text-xs md:text-sm leading-relaxed whitespace-pre-wrap">{metadata.description}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
                <div className="bg-zinc-950 p-3 border-b border-zinc-800 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-green-500" />
                  <h3 className="font-medium text-zinc-200">Tags</h3>
                </div>
                <div className="p-3 md:p-4 flex flex-wrap gap-2">
                  {metadata.tags.map((tag, i) => (
                    <span key={i} className="bg-zinc-800 text-zinc-300 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm border border-zinc-700">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="h-full min-h-[200px] md:min-h-[300px] flex items-center justify-center border-2 border-dashed border-zinc-800 rounded-xl text-zinc-600 bg-zinc-900/30">
              <div className="text-center">
                <Search className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 opacity-20" />
                <p className="text-sm md:text-base">Optimized results will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};