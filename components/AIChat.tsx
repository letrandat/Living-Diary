
import React, { useState, useRef, useEffect } from 'react';
import { Message, JournalEntry } from '../types';
import { chatWithSpirit } from '../services/gemini';
import { Send, Sparkles } from 'lucide-react';

interface AIChatProps {
  entries: JournalEntry[];
}

const AIChat: React.FC<AIChatProps> = ({ entries }) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('arboria_chat');
    return saved ? JSON.parse(saved) : [{ role: 'model', text: 'Peace be with you. I remember your recent reflections. How are you carrying them today?' }];
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('arboria_chat', JSON.stringify(messages));
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg: Message = { role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await chatWithSpirit(messages, text, entries);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'The spirit is fading... try again later.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-6 bg-emerald-50/30">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-lg"><Sparkles size={20} /></div>
        <h2 className="text-xl font-black text-emerald-900">Arboria Guide</h2>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-3xl ${msg.role === 'user' ? 'bg-emerald-600 text-white rounded-tr-none' : 'bg-white shadow-sm rounded-tl-none text-slate-700'}`}>
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
          className="flex-1 p-4 bg-white rounded-2xl shadow-lg border-none focus:ring-2 focus:ring-emerald-400 outline-none"
        />
        <button onClick={handleSend} className="p-4 bg-emerald-600 text-white rounded-2xl shadow-lg"><Send size={20} /></button>
      </div>
    </div>
  );
};

export default AIChat;
