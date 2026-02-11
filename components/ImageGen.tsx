
import { useState, type ReactElement } from 'react';
import { Sparkles, Loader2, Info } from 'lucide-react';
import { generateOrnament } from '../services/gemini';
import type { Ornament } from '../types';

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
    } finally {
      setLoading(false);
      setPrompt('');
    }
  }

  return (
    <div className="w-full h-full p-6 flex flex-col">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-[var(--text-primary)] handwritten">Spirit Forge</h2>
        <p className="text-xs text-[var(--text-secondary)] font-bold uppercase tracking-widest mt-2">Manifest your diary into physical items</p>
      </div>

      <div className="bg-[var(--bg-surface)] p-4 rounded-3xl border border-[var(--border)] flex items-start gap-3 mb-6">
        <Info className="text-[var(--accent)] shrink-0" size={18} />
        <p className="text-[11px] text-[var(--text-secondary)] leading-tight">
          Describe an object that represents your feelings today. Our AI will forge it into a magical ornament to hang on your tree forever.
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        {lastImage ? (
          <div className="relative group">
            <img src={lastImage} alt="Generated ornament" className="w-64 h-64 rounded-3xl shadow-2xl animate-in zoom-in-50" />
            <div className="absolute inset-0 bg-[var(--accent-bg)] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ) : (
          <div className="w-64 h-64 border-4 border-dashed border-[var(--border)] rounded-3xl flex items-center justify-center text-[var(--text-muted)]">
            <Sparkles size={48} className="opacity-20" />
          </div>
        )}
      </div>

      <div className="mt-8 space-y-4">
        {error && (
          <div className="bg-[var(--danger-bg)] border border-[var(--danger)] text-[var(--danger)] px-4 py-3 rounded-2xl text-sm font-medium">
            {error}
          </div>
        )}
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your ornament (e.g. A blue crystal heart)"
          className="w-full p-5 bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:ring-2 focus:ring-[var(--accent-border)]"
        />
        <button
          onClick={handleForge}
          disabled={loading}
          className="w-full py-5 bg-[var(--accent)] text-[var(--text-inverse)] rounded-2xl font-black flex items-center justify-center gap-3 disabled:opacity-50"
          style={{ boxShadow: 'var(--shadow-accent)' }}
        >
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
          {loading ? 'FORGING REALITY...' : 'FORGE ORNAMENT'}
        </button>
      </div>
    </div>
  );
}

export default ImageGen;
