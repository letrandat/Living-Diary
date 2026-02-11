
import React, { useState } from 'react';
import { Send, Calendar as CalendarIcon, Hash, Trees, X } from 'lucide-react';
import { JournalEntry } from '../types';

interface JournalViewProps {
  entries: JournalEntry[];
  currentTreeTypeId: string;
  onAddEntry: (entry: JournalEntry) => void;
}

const JournalView: React.FC<JournalViewProps> = ({ entries, currentTreeTypeId, onAddEntry }) => {
  const [content, setContent] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  // Helper to get stamp color based on tree type
  const getStampColor = () => {
    switch (currentTreeTypeId) {
      case 'oak': return 'text-emerald-600';
      case 'willow': return 'text-blue-500';
      case 'sakura': return 'text-pink-400';
      default: return 'text-emerald-600';
    }
  };

  // Check if a specific day has an entry
  const getEntryForDay = (day: number) => {
    return entries.find(e => {
      const d = new Date(e.date);
      return d.getDate() === day && d.getMonth() === new Date().getMonth();
    });
  };

  return (
    <div className="w-full h-full p-6 bg-white overflow-y-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black text-emerald-900 handwritten">Daily Roots</h2>
        <button 
          onClick={() => setShowCalendar(!showCalendar)}
          className={`p-3 rounded-2xl transition-colors ${showCalendar ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'}`}
        >
          <CalendarIcon size={20} />
        </button>
      </div>

      {showCalendar && (
        <div className="bg-slate-50 p-6 rounded-3xl mb-8 grid grid-cols-7 gap-2 animate-in slide-in-from-top-4 relative">
          {[...Array(30)].map((_, i) => {
            const day = i + 1;
            const entry = getEntryForDay(day);
            const isToday = day === new Date().getDate();

            return (
              <button 
                key={i} 
                onClick={() => entry && setSelectedEntry(entry)}
                className={`h-12 flex flex-col items-center justify-center rounded-xl transition-all relative
                  ${isToday ? 'border-2 border-emerald-400' : ''}
                  ${entry ? 'bg-white shadow-md active:scale-95' : 'bg-slate-100 text-slate-300'}`}
              >
                <span className="text-[10px] font-bold opacity-60">{day}</span>
                {entry && (
                  <Trees size={14} className={`${getStampColor()} animate-in zoom-in-50`} strokeWidth={3} />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Memory Viewer Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in">
          <div className="bg-white w-full max-w-sm rounded-[3rem] p-8 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
             <button 
              onClick={() => setSelectedEntry(null)}
              className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full text-slate-400"
             >
               <X size={18} />
             </button>

             <div className="mb-6">
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Spirit Memory</p>
                <h3 className="text-xl font-bold text-slate-900">
                  {new Date(selectedEntry.date).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
                </h3>
             </div>

             <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <p className="text-slate-700 leading-relaxed italic">"{selectedEntry.content}"</p>
             </div>

             <button 
              onClick={() => setSelectedEntry(null)}
              className="mt-8 w-full py-4 bg-slate-900 text-white rounded-2xl font-black shadow-lg"
             >
               RETURN TO ROOTS
             </button>
          </div>
        </div>
      )}

      <div className="bg-emerald-50 p-6 rounded-[2.5rem] mb-8">
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Speak to your tree..."
          className="w-full h-40 bg-transparent border-none focus:ring-0 text-emerald-900 placeholder:text-emerald-300 resize-none font-medium"
        />
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-2">
            <div className="p-2 bg-white rounded-full text-emerald-400"><Hash size={16} /></div>
          </div>
          <button 
            onClick={() => {
              if (content.trim()) {
                onAddEntry({ id: Date.now().toString(), userId: '1', date: new Date().toISOString(), content, isPublic: false, hashtags: [] });
                setContent('');
              }
            }}
            className="px-6 py-3 bg-emerald-600 text-white rounded-2xl font-black flex items-center gap-2 shadow-lg"
          >
            PLANT <Send size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-4 pb-12">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recent Reflections</h3>
        {entries.slice(0, 5).map(e => (
          <div key={e.id} className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 mb-2">{new Date(e.date).toLocaleDateString()}</p>
            <p className="text-slate-700 text-sm leading-relaxed italic">"{e.content}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JournalView;
