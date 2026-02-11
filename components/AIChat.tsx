
import { useState, useRef, useEffect, type ReactElement } from 'react';
import { Message, JournalEntry } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { chatWithSpirit } from '../services/gemini';
import { Send, Sparkles } from 'lucide-react';

interface AIChatProps {
  entries: JournalEntry[];
}

const DEFAULT_MESSAGE: Message = { role: 'model', text: 'Peace be with you. I remember your recent reflections. How are you carrying them today?' };

function AIChat({ entries }: AIChatProps): ReactElement {
  const [messages, setMessages] = useLocalStorage<Message[]>('arboria_chat', [DEFAULT_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  async function handleSend(): Promise<void> {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg: Message = { role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await chatWithSpirit(messages, text, entries);
      setMessages(prev => [...prev, { role: 'model' as const, text: response }].slice(-50));
    } catch {
      setMessages(prev => [...prev, { role: 'model', text: 'The spirit is fading... try again later.' }]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="w-full h-full flex flex-col p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-purple-500/20 text-purple-400 rounded-2xl shadow-lg"><Sparkles size={20} /></div>
        <h2 className="text-xl font-black text-white">Arboria Guide</h2>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-3xl ${msg.role === 'user' ? 'bg-purple-500/20 text-purple-100 rounded-tr-none border border-purple-500/20' : 'bg-white/[0.04] rounded-tl-none text-slate-300 border border-white/[0.06]'}`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Whisper to the spirit..."
          className="flex-1 p-4 bg-white/[0.04] rounded-2xl border border-white/[0.08] text-white placeholder:text-slate-500 focus:ring-2 focus:ring-purple-500/30 outline-none"
        />
        <button onClick={handleSend} className="p-4 bg-purple-500 text-white rounded-2xl shadow-[0_0_16px_rgba(168,85,247,0.3)]"><Send size={20} /></button>
      </div>
    </div>
  );
}

export default AIChat;
