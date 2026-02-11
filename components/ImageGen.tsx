
import { useState, type ReactElement } from 'react';
import { Sparkles, Loader2, Info } from 'lucide-react';
import { generateOrnament } from '../services/gemini';
import { Ornament } from '../types';

interface ImageGenProps {
  onGenerated: (ornament: Ornament) => void;
}

function ImageGen({ onGenerated }: ImageGenProps): ReactElement {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastImage, setLastImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleForge(): Promise<void> {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setError(null);

    try {
      const url = await generateOrnament(prompt, '1K');
      if (url) {
        setLastImage(url);
        onGenerated({ id: `ORN-${Date.now()}`, url, name: prompt, date: new Date().toISOString() });
      } else {
        setError('Failed to forge ornament. Try a different description.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }

    setLoading(false);
    setPrompt('');
  }

  return (
    <div className="w-full h-full p-6 flex flex-col">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-white handwritten">Spirit Forge</h2>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-2">Manifest your diary into physical items</p>
      </div>

      <div className="bg-white/[0.03] p-4 rounded-3xl border border-white/[0.06] flex items-start gap-3 mb-6">
        <Info className="text-purple-400 shrink-0" size={18} />
        <p className="text-[11px] text-slate-400 leading-tight">
          Describe an object that represents your feelings today. Our AI will forge it into a magical ornament to hang on your tree forever.
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        {lastImage ? (
          <div className="relative group">
            <img src={lastImage} alt="Generated ornament" className="w-64 h-64 rounded-3xl shadow-2xl animate-in zoom-in-50" />
            <div className="absolute inset-0 bg-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ) : (
          <div className="w-64 h-64 border-4 border-dashed border-white/[0.08] rounded-3xl flex items-center justify-center text-slate-600">
            <Sparkles size={48} className="opacity-20" />
          </div>
        )}
      </div>

      <div className="mt-8 space-y-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-2xl text-sm font-medium">
            {error}
          </div>
        )}
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your ornament (e.g. A blue crystal heart)"
          className="w-full p-5 bg-white/[0.04] rounded-2xl border border-white/[0.08] text-white placeholder:text-slate-500 focus:ring-2 focus:ring-purple-500/30"
        />
        <button
          onClick={handleForge}
          disabled={loading}
          className="w-full py-5 bg-purple-500 text-white rounded-2xl font-black shadow-[0_0_20px_rgba(168,85,247,0.3)] flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
          {loading ? 'FORGING REALITY...' : 'FORGE ORNAMENT'}
        </button>
      </div>
    </div>
  );
}

export default ImageGen;
