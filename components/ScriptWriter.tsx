import React, { useState } from 'react';
import { generateScript } from '../services/geminiService';
import { ScriptSection } from '../types';
import { FileText, Loader2, Copy, CheckCircle2, Video, PenTool } from 'lucide-react';

export const ScriptWriter: React.FC = () => {
  const [title, setTitle] = useState('');
  const [script, setScript] = useState<ScriptSection[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!title.trim()) return;
    setLoading(true);
    setScript([]);
    try {
      const result = await generateScript(title);
      setScript(result);
    } catch (e) {
      console.error(e);
      alert('Script generation failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    const text = script.map(s => `## ${s.heading}\n\n[Visual: ${s.visualCue}]\n\n${s.content}`).join('\n\n---\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 h-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between md:items-end mb-6 gap-2">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Script Writer</h1>
          <p className="text-sm md:text-base text-zinc-400">Transform your video title into a structured script.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center bg-zinc-900 p-2 rounded-xl border border-zinc-800 focus-within:border-red-600 transition-colors mb-6 md:mb-8">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your video title..."
          className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-base md:text-lg text-white placeholder-zinc-600"
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !title}
          className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 whitespace-nowrap"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <PenTool className="w-5 h-5" />}
          Write Script
        </button>
      </div>

      {script.length > 0 && (
        <div className="flex-1 overflow-hidden flex flex-col bg-zinc-900 rounded-xl border border-zinc-800 shadow-2xl">
          <div className="p-3 md:p-4 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur flex justify-between items-center sticky top-0 z-10">
            <div className="flex items-center gap-2 text-xs md:text-sm text-zinc-400">
              <FileText className="w-4 h-4" />
              <span>{script.length} Sections</span>
            </div>
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 text-xs md:text-sm font-medium text-zinc-300 hover:text-white transition-colors bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-lg"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 md:space-y-8 scroll-smooth">
            {script.map((section, idx) => (
              <div key={idx} className="relative pl-6 md:pl-8 border-l-2 border-zinc-800 hover:border-red-600 transition-colors group">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-zinc-900 border-2 border-zinc-700 group-hover:border-red-600 transition-colors"></div>
                
                <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 flex items-center gap-3">
                  <span className="text-red-600 text-xs md:text-sm font-mono opacity-50">{(idx + 1).toString().padStart(2, '0')}</span>
                  {section.heading}
                </h3>

                <div className="bg-black/30 rounded-lg p-3 md:p-4 mb-3 md:mb-4 border border-zinc-800/50">
                  <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-blue-400 mb-1 md:mb-2 uppercase tracking-wider">
                    <Video className="w-3 h-3" /> Visual Cue
                  </div>
                  <p className="text-zinc-300 text-xs md:text-sm italic font-light">{section.visualCue}</p>
                </div>

                <div className="prose prose-invert prose-sm md:prose-lg max-w-none">
                  <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap font-light">{section.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {loading && (
         <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 animate-pulse py-12">
            <Loader2 className="w-10 h-10 md:w-12 md:h-12 animate-spin mb-4 text-red-600" />
            <p className="text-base md:text-lg font-medium text-zinc-300">Gemini is crafting your script...</p>
            <p className="text-xs md:text-sm">This may take a moment.</p>
         </div>
      )}
    </div>
  );
};