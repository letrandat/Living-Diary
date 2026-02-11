
import React, { useState } from 'react';
import { Sparkles, Loader2, Info } from 'lucide-react';
import { generateOrnament } from '../services/gemini';
import { ImageSize, Ornament } from '../types';

interface ImageGenProps {
  onGenerated: (ornament: Ornament) => void;
}

const ImageGen: React.FC<ImageGenProps> = ({ onGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastImage, setLastImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleForge = async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setError(null);
    const url = await generateOrnament(prompt, '1K');
    if (url) {
      const newOrnament: Ornament = {
        id: `ORN-${Date.now()}`,
        url,
        name: prompt,
        date: new Date().toISOString()
      };
      setLastImage(url);
      onGenerated(newOrnament);
    } else {
      setError('Failed to forge ornament. Try a different description.');
    }
    setLoading(false);
    setPrompt('');
  };

  return (
    <div className="w-full h-full p-6 flex flex-col bg-slate-50">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-emerald-900 handwritten">Spirit Forge</h2>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2">Manifest your diary into physical items</p>
      </div>

      <div className="bg-white p-4 rounded-3xl shadow-lg border border-slate-100 flex items-start gap-3 mb-6">
        <Info className="text-emerald-500 shrink-0" size={18} />
        <p className="text-[11px] text-slate-500 leading-tight">
          Describe an object that represents your feelings today. Our AI will forge it into a magical ornament to hang on your tree forever.
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        {lastImage ? (
          <div className="relative group">
            <img src={lastImage} alt="Generated ornament" className="w-64 h-64 rounded-3xl shadow-2xl animate-in zoom-in-50" />
            <div className="absolute inset-0 bg-emerald-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ) : (
          <div className="w-64 h-64 border-4 border-dashed border-slate-200 rounded-3xl flex items-center justify-center text-slate-300">
            <Sparkles size={48} className="opacity-20" />
          </div>
        )}
      </div>

      <div className="mt-8 space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm font-medium">
            {error}
          </div>
        )}
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your ornament (e.g. A blue crystal heart)"
          className="w-full p-5 bg-white rounded-2xl shadow-xl border-none focus:ring-2 focus:ring-emerald-400"
        />
        <button 
          onClick={handleForge}
          disabled={loading}
          className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
          {loading ? 'FORGING REALITY...' : 'FORGE ORNAMENT'}
        </button>
      </div>
    </div>
  );
};

export default ImageGen;
