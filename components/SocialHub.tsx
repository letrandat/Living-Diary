
import React from 'react';
import { Search, Heart, MessageCircle, UserPlus, Gift } from 'lucide-react';

const SocialHub: React.FC = () => {
  const publicFeeds = [
    { id: 1, user: 'FloraGazer', content: 'Today I finally realized that letting go isn\'t weakness. My tree looks stronger than ever.', tags: ['Growth', 'Healing'], likes: 24 },
    { id: 2, user: 'SkyWalker', content: 'The winter chill is here, but the snow on my branches feels peaceful.', tags: ['Winter', 'Calm'], likes: 12 },
    { id: 3, user: 'Seedling99', content: 'Met a new friend today! Sent them a golden ornament.', tags: ['Friends', 'Joy'], likes: 56 },
  ];

  return (
    <div className="w-full h-full p-8 overflow-y-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <h2 className="text-3xl font-bold text-emerald-900 handwritten">Garden of Souls</h2>
        <div className="relative">
          <input 
            placeholder="Search by User ID..." 
            className="pl-12 pr-6 py-3 bg-white rounded-full border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-200 w-full md:w-80 shadow-sm"
          />
          <Search size={18} className="absolute left-4 top-4 text-slate-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Global Echoes</h3>
          {publicFeeds.map(post => (
            <div key={post.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:scale-[1.01] transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                  {post.user[0]}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800">{post.user}</div>
                  <div className="flex gap-2">
                    {post.tags.map(t => <span key={t} className="text-[10px] text-emerald-600">#{t}</span>)}
                  </div>
                </div>
                <button className="ml-auto text-emerald-600 hover:bg-emerald-50 p-2 rounded-full">
                  <UserPlus size={18} />
                </button>
              </div>
              <p className="text-slate-600 mb-6 italic">"{post.content}"</p>
              <div className="flex items-center gap-6 text-slate-400">
                <button className="flex items-center gap-1 hover:text-pink-500 transition-colors">
                  <Heart size={18} /> <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center gap-1 hover:text-emerald-500 transition-colors">
                  <MessageCircle size={18} /> <span className="text-sm">Reply</span>
                </button>
                <button className="flex items-center gap-1 hover:text-amber-500 transition-colors">
                  <Gift size={18} /> <span className="text-sm">Send Gift</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white shadow-xl">
            <h3 className="text-lg font-bold mb-2">Anonymous Letters</h3>
            <p className="text-sm opacity-80 mb-6">Confess a feeling or share a secret wish. Your name remains hidden unless you choose otherwise.</p>
            <button className="w-full py-3 bg-white text-indigo-700 rounded-2xl font-bold shadow-lg hover:bg-indigo-50 transition-colors">
              Write a Letter
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-4">Top Gardeners</h3>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-3">
                  <span className="font-bold text-slate-300">#0{i}</span>
                  <div className="w-8 h-8 rounded-full bg-emerald-100"></div>
                  <span className="text-sm text-slate-700 font-medium">Gardener_{i * 2}02</span>
                  <span className="ml-auto text-xs font-bold text-emerald-600">LVL {15 - i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialHub;
