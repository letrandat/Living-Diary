
import { useState, type ReactElement } from 'react';
import { Send, Calendar as CalendarIcon, Hash, Trees, X } from 'lucide-react';
import { JournalEntry } from '../types';

interface JournalViewProps {
  entries: JournalEntry[];
  currentTreeTypeId: string;
  userId: string;
  onAddEntry: (entry: JournalEntry) => void;
}

function getStampColor(treeTypeId: string): string {
  switch (treeTypeId) {
    case 'oak': return 'text-emerald-400';
    case 'willow': return 'text-cyan-400';
    case 'sakura': return 'text-pink-400';
    default: return 'text-purple-400';
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

  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

  return (
    <div className="w-full h-full p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black text-white handwritten">Daily Roots</h2>
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className={`p-3 rounded-2xl transition-colors ${showCalendar ? 'bg-purple-500/20 text-purple-400' : 'bg-white/[0.05] text-slate-400'}`}
        >
          <CalendarIcon size={20} />
        </button>
      </div>

      {showCalendar && (
        <div className="bg-white/[0.03] border border-white/[0.06] p-6 rounded-3xl mb-8 grid grid-cols-7 gap-2 animate-in slide-in-from-top-4 relative">
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const entry = getEntryForDay(day);
            const isToday = day === new Date().getDate();

            return (
              <button
                key={day}
                onClick={() => entry && setSelectedEntry(entry)}
                className={`h-12 flex flex-col items-center justify-center rounded-xl transition-all relative
                  ${isToday ? 'border-2 border-purple-400/50' : ''}
                  ${entry ? 'bg-white/[0.06] shadow-[0_0_12px_rgba(168,85,247,0.1)] active:scale-95' : 'bg-white/[0.02] text-slate-600'}`}
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in">
          <div className="bg-[#12121a] border border-white/[0.08] w-full max-w-sm rounded-[3rem] p-8 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-purple-500" />
             <button
              onClick={() => setSelectedEntry(null)}
              className="absolute top-6 right-6 p-2 bg-white/[0.06] rounded-full text-slate-400"
             >
               <X size={18} />
             </button>

             <div className="mb-6">
                <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-1">Spirit Memory</p>
                <h3 className="text-xl font-bold text-white">
                  {new Date(selectedEntry.date).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
                </h3>
             </div>

             <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/[0.06]">
                <p className="text-slate-300 leading-relaxed italic">"{selectedEntry.content}"</p>
             </div>

             <button
              onClick={() => setSelectedEntry(null)}
              className="mt-8 w-full py-4 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-2xl font-black shadow-lg"
             >
               RETURN TO ROOTS
             </button>
          </div>
        </div>
      )}

      <div className="bg-white/[0.03] border border-white/[0.06] p-6 rounded-[2.5rem] mb-8">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Speak to your tree..."
          className="w-full h-40 bg-transparent border-none focus:ring-0 text-white placeholder:text-slate-500 resize-none font-medium"
        />
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-2">
            <div className="p-2 bg-white/[0.06] rounded-full text-purple-400"><Hash size={16} /></div>
          </div>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-purple-500 text-white rounded-2xl font-black flex items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
          >
            PLANT <Send size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-4 pb-12">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Recent Reflections</h3>
        {entries.slice(0, 5).map(e => (
          <div key={e.id} className="p-5 bg-white/[0.03] rounded-3xl border border-white/[0.06]">
            <p className="text-[10px] font-bold text-slate-500 mb-2">{new Date(e.date).toLocaleDateString()}</p>
            <p className="text-slate-300 text-sm leading-relaxed italic">"{e.content}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JournalView;
