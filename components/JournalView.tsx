
import { useState, type ReactElement } from 'react';
import { Send, Calendar as CalendarIcon, Trees, X } from 'lucide-react';
import type { JournalEntry } from '../types';

interface JournalViewProps {
  entries: JournalEntry[];
  currentTreeTypeId: string;
  userId: string;
  onAddEntry: (entry: JournalEntry) => void;
}

function getStampColor(treeTypeId: string): string {
  switch (treeTypeId) {
    case 'oak': return 'text-[var(--color-oak)]';
    case 'willow': return 'text-[var(--color-willow)]';
    case 'sakura': return 'text-[var(--color-sakura)]';
    default: return 'text-[var(--accent)]';
  }
}

function JournalView({ entries, currentTreeTypeId, userId, onAddEntry }: JournalViewProps): ReactElement {
  const [content, setContent] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  const stampColor = getStampColor(currentTreeTypeId);

  function getEntryForDay(day: number): JournalEntry | undefined {
    const now = new Date();
    return entries.find(e => {
      const d = new Date(e.date);
      return d.getDate() === day && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
  }

  function handleSubmit(): void {
    if (!content.trim()) return;
    onAddEntry({
      id: Date.now().toString(),
      userId,
      date: new Date().toISOString(),
      content,
      isPublic: false,
      hashtags: [],
    });
    setContent('');
  }

  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  return (
    <div className="w-full h-full p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black text-[var(--text-primary)] heading">Daily Roots</h2>
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className={`p-3 rounded-2xl transition-colors ${showCalendar ? 'bg-[var(--accent-bg)] text-[var(--accent)]' : 'bg-[var(--bg-surface)] text-[var(--text-secondary)]'}`}
        >
          <CalendarIcon size={20} />
        </button>
      </div>

      {showCalendar && (
        <div className="bg-[var(--bg-surface)] border border-[var(--border)] p-6 rounded-3xl mb-8 grid grid-cols-7 gap-2 animate-in slide-in-from-top-4 relative">
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const entry = getEntryForDay(day);
            const isToday = day === now.getDate();

            return (
              <button
                key={day}
                onClick={() => entry && setSelectedEntry(entry)}
                className={`h-12 flex flex-col items-center justify-center rounded-xl transition-all relative
                  ${isToday ? 'border-2 border-[var(--accent-border)]' : ''}
                  ${entry ? 'bg-[var(--bg-surface-hover)] active:scale-95' : 'bg-[var(--bg-surface)] text-[var(--text-muted)]'}`}
                style={entry ? { boxShadow: '0 0 12px var(--accent-glow)' } : undefined}
              >
                <span className="text-[10px] font-bold opacity-60">{day}</span>
                {entry && (
                  <Trees size={14} className={`${stampColor} animate-in zoom-in-50`} strokeWidth={3} />
                )}
              </button>
            );
          })}
        </div>
      )}

      {selectedEntry && (
        <div className="fixed inset-0 bg-[var(--bg-overlay)] backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in">
          <div className="bg-[var(--bg-elevated)] border border-[var(--border)] w-full max-w-sm rounded-[3rem] p-8 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-[var(--accent)]" />
             <button
              onClick={() => setSelectedEntry(null)}
              className="absolute top-6 right-6 p-2 bg-[var(--bg-surface-hover)] rounded-full text-[var(--text-secondary)]"
             >
               <X size={18} />
             </button>

             <div className="mb-6">
                <p className="text-[10px] font-black text-[var(--accent)] uppercase tracking-widest mb-1">Spirit Memory</p>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">
                  {new Date(selectedEntry.date).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
                </h3>
             </div>

             <div className="bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border)]">
                <p className="text-[var(--text-secondary)] leading-relaxed italic">"{selectedEntry.content}"</p>
             </div>

             <button
              onClick={() => setSelectedEntry(null)}
              className="mt-8 w-full py-4 bg-[var(--accent-bg)] text-[var(--accent)] border border-[var(--accent-border)] rounded-2xl font-black shadow-lg"
             >
               RETURN TO ROOTS
             </button>
          </div>
        </div>
      )}

      <div className="bg-[var(--bg-surface)] border border-[var(--border)] p-6 rounded-[2.5rem] mb-8">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Speak to your tree..."
          className="w-full h-40 bg-transparent border-none focus:ring-0 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] resize-none font-medium"
        />
        <div className="flex items-center justify-end mt-4">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-[var(--accent)] text-[var(--text-inverse)] rounded-2xl font-black flex items-center gap-2"
            style={{ boxShadow: 'var(--shadow-accent)' }}
          >
            PLANT <Send size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-4 pb-12">
        <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Recent Reflections</h3>
        {entries.slice(0, 5).map(e => (
          <div key={e.id} className="p-5 bg-[var(--bg-surface)] rounded-3xl border border-[var(--border)]">
            <p className="text-[10px] font-bold text-[var(--text-muted)] mb-2">{new Date(e.date).toLocaleDateString()}</p>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed italic">"{e.content}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JournalView;
