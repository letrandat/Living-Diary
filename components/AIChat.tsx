
import { useState, useRef, useEffect, type ReactElement } from 'react';
import type { Message, JournalEntry } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { chatWithSpirit } from '../services/gemini';
import { Send, Sparkles } from 'lucide-react';

interface AIChatProps {
  entries: JournalEntry[];
}

const DEFAULT_MESSAGE: Message = { role: 'model', text: 'Peace be with you. I remember your recent reflections. How are you carrying them today?' };

const BUBBLE_STYLES: Record<Message['role'], string> = {
  user: 'bg-[var(--accent-bg)] text-[var(--text-primary)] rounded-tr-none border border-[var(--accent-border)]',
  model: 'bg-[var(--bg-surface)] rounded-tl-none text-[var(--text-secondary)] border border-[var(--border)]',
};

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
      const reply: Message = { role: 'model', text: response };
      setMessages(prev => [...prev, reply].slice(-50));
    } catch {
      const fallback: Message = { role: 'model', text: 'The spirit is fading... try again later.' };
      setMessages(prev => [...prev, fallback]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="w-full h-full flex flex-col p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-[var(--accent-bg)] text-[var(--accent)] rounded-2xl shadow-lg"><Sparkles size={20} /></div>
        <h2 className="text-xl font-black text-[var(--text-primary)] heading">Arboria Guide</h2>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-3xl ${BUBBLE_STYLES[msg.role]}`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start" role="status" aria-label="Spirit is typing">
            <div className="bg-[var(--bg-surface)] rounded-3xl rounded-tl-none border border-[var(--border)] p-4 flex gap-1.5">
              {[0, 150, 300].map(delay => (
                <span key={delay} className="w-2 h-2 bg-[var(--text-muted)] rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Whisper to the spirit..."
          className="flex-1 p-4 bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:ring-2 focus:ring-[var(--accent-border)] outline-none"
        />
        <button onClick={handleSend} aria-label="Send message" className="p-4 bg-[var(--accent)] text-[var(--text-inverse)] rounded-2xl" style={{ boxShadow: 'var(--shadow-accent)' }}><Send size={20} /></button>
      </div>
    </div>
  );
}

export default AIChat;
