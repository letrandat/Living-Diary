
import { useState, type ReactElement } from 'react';
import { Search, Heart, MessageCircle, UserPlus, Gift, Sparkles, Send } from 'lucide-react';

interface FeedPost {
  id: number;
  user: string;
  content: string;
  tags: string[];
  likes: number;
  timeAgo: string;
}

const MOCK_FEEDS: FeedPost[] = [
  { id: 1, user: 'FloraGazer', content: 'Today I finally realized that letting go isn\'t weakness. My tree looks stronger than ever.', tags: ['Growth', 'Healing'], likes: 24, timeAgo: '2h' },
  { id: 2, user: 'SkyWalker', content: 'The winter chill is here, but the snow on my branches feels peaceful.', tags: ['Winter', 'Calm'], likes: 12, timeAgo: '5h' },
  { id: 3, user: 'Seedling99', content: 'Met a new friend today! Sent them a golden ornament.', tags: ['Friends', 'Joy'], likes: 56, timeAgo: '8h' },
];

const LEADERBOARD = [
  { rank: 1, name: 'FloraGazer', level: 14 },
  { rank: 2, name: 'SkyWalker', level: 13 },
  { rank: 3, name: 'Seedling99', level: 12 },
];

function getAvatarColor(name: string): { bg: string; text: string } {
  const colors = [
    { bg: 'var(--accent-bg)', text: 'var(--accent)' },
    { bg: 'var(--secondary-bg)', text: 'var(--secondary)' },
    { bg: 'var(--color-sakura-bg)', text: 'var(--color-sakura)' },
    { bg: 'var(--color-oak-bg)', text: 'var(--color-oak)' },
    { bg: 'var(--color-willow-bg)', text: 'var(--color-willow)' },
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

function getMedal(rank: number): string {
  switch (rank) {
    case 1: return '🥇';
    case 2: return '🥈';
    case 3: return '🥉';
    default: return '';
  }
}

function SocialHub(): ReactElement {
  const [searchQuery, setSearchQuery] = useState('');
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [letterText, setLetterText] = useState('');

  function toggleLike(postId: number): void {
    setLikedPosts(prev => {
      const next = new Set(prev);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
  }

  const filteredFeeds = searchQuery
    ? MOCK_FEEDS.filter(p =>
        p.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : MOCK_FEEDS;

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="p-6 pb-16">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-black text-[var(--text-primary)] heading">Garden of Souls</h2>
          <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mt-1">Community echoes</p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search gardeners..."
            aria-label="Search gardeners"
            className="w-full pl-11 pr-4 py-3.5 bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:ring-2 focus:ring-[var(--accent-border)] outline-none text-sm"
          />
        </div>

        {/* Feed */}
        <div className="space-y-4 mb-10">
          <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Global Echoes</h3>
          {filteredFeeds.map(post => {
            const isLiked = likedPosts.has(post.id);
            const avatarColor = getAvatarColor(post.user);
            return (
              <div
                key={post.id}
                className="bg-[var(--bg-surface)] p-5 rounded-3xl border border-[var(--border)] transition-all active:scale-[0.99]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm"
                    style={{ background: avatarColor.bg, color: avatarColor.text }}
                  >
                    {post.user[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[var(--text-primary)] truncate">{post.user}</span>
                      <span className="text-[10px] text-[var(--text-muted)]">{post.timeAgo}</span>
                    </div>
                    <div className="flex gap-1.5 mt-0.5">
                      {post.tags.map(t => (
                        <span key={t} className="text-[10px] font-bold text-[var(--accent-light)]">#{t}</span>
                      ))}
                    </div>
                  </div>
                  <button
                    aria-label={`Follow ${post.user}`}
                    className="p-2 rounded-xl bg-[var(--accent-bg)] text-[var(--accent)] hover:bg-[var(--accent-border)] transition-colors"
                  >
                    <UserPlus size={16} />
                  </button>
                </div>

                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4 italic">"{post.content}"</p>

                <div className="flex items-center gap-5">
                  <button
                    onClick={() => toggleLike(post.id)}
                    data-testid={`like-${post.id}`}
                    aria-label={`Like ${post.user}'s post`}
                    className={`flex items-center gap-1.5 text-sm transition-colors ${isLiked ? 'text-[var(--danger)]' : 'text-[var(--text-muted)] hover:text-[var(--danger)]'}`}
                  >
                    <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                    <span className="text-xs font-bold">{post.likes + (isLiked ? 1 : 0)}</span>
                  </button>
                  <button aria-label={`Reply to ${post.user}`} className="flex items-center gap-1.5 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                    <MessageCircle size={16} />
                    <span className="text-xs font-bold">Reply</span>
                  </button>
                  <button aria-label={`Send gift to ${post.user}`} className="flex items-center gap-1.5 text-[var(--text-muted)] hover:text-[var(--warning)] transition-colors">
                    <Gift size={16} />
                    <span className="text-xs font-bold">Gift</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Anonymous Letters */}
        <div className="rounded-3xl p-6 border border-[var(--accent-border)] mb-10 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--accent-bg), var(--secondary-bg))' }}>
          <div className="absolute top-3 right-3 opacity-10">
            <Sparkles size={64} className="text-[var(--accent)]" />
          </div>
          <h3 className="text-lg font-black text-[var(--text-primary)] heading mb-1">Anonymous Letters</h3>
          <p className="text-xs text-[var(--text-secondary)] mb-4 max-w-[260px]">
            Share a feeling or secret wish. Your name stays hidden unless you choose otherwise.
          </p>
          <div className="flex gap-2">
            <input
              value={letterText}
              onChange={(e) => setLetterText(e.target.value)}
              placeholder="Write your letter..."
              aria-label="Anonymous letter"
              className="flex-1 px-4 py-3 bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm outline-none focus:ring-2 focus:ring-[var(--accent-border)]"
            />
            <button
              onClick={() => setLetterText('')}
              aria-label="Send anonymous letter"
              className="p-3 bg-[var(--accent)] text-[var(--text-inverse)] rounded-2xl"
              style={{ boxShadow: 'var(--shadow-accent)' }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>

        {/* Leaderboard */}
        <div>
          <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4">Top Gardeners</h3>
          <div className="bg-[var(--bg-surface)] rounded-3xl border border-[var(--border)] overflow-hidden">
            {LEADERBOARD.map((gardener, i) => {
              const avatarColor = getAvatarColor(gardener.name);
              return (
                <div
                  key={gardener.rank}
                  className={`flex items-center gap-4 px-5 py-4 ${i < LEADERBOARD.length - 1 ? 'border-b border-[var(--border)]' : ''}`}
                >
                  <span className="text-lg font-black text-[var(--text-muted)] w-6 text-center">
                    {getMedal(gardener.rank)}
                  </span>
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ background: avatarColor.bg, color: avatarColor.text }}
                  >
                    {gardener.name[0]}
                  </div>
                  <span className="flex-1 text-sm font-bold text-[var(--text-primary)]">{gardener.name}</span>
                  <span className="text-xs font-black text-[var(--accent)] bg-[var(--accent-bg)] px-3 py-1 rounded-full">
                    LVL {gardener.level}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocialHub;
