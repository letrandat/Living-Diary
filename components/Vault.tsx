
import type { ReactElement } from 'react';
import type { UserProfile } from '../types';
import { Package, Calendar } from 'lucide-react';

interface VaultProps {
  user: UserProfile;
}

function Vault({ user }: VaultProps): ReactElement {
  return (
    <div className="w-full h-full p-6 overflow-y-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-[var(--accent-bg)] text-[var(--accent)] rounded-2xl shadow-lg"><Package size={20} /></div>
        <h2 className="text-2xl font-black text-[var(--text-primary)]">Soul Vault</h2>
      </div>

      <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-6">Your Ornament Collection ({user.ornaments.length})</p>

      {user.ornaments.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center text-[var(--text-muted)] border-4 border-dashed border-[var(--border)] rounded-[3rem]">
          <Package size={48} className="mb-2 opacity-20" />
          <p className="text-sm font-bold">The chest is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {user.ornaments.map((orn) => (
            <div key={orn.id} className="bg-[var(--bg-surface)] p-3 rounded-3xl border border-[var(--border)] group">
              <img src={orn.url} alt={orn.name} className="w-full h-32 object-contain rounded-2xl mb-3 bg-[var(--bg-surface)]" />
              <p className="text-[10px] font-black text-[var(--text-primary)] truncate">{orn.name}</p>
              <div className="flex items-center gap-1 mt-1 text-[var(--text-muted)]">
                <Calendar size={10} />
                <span className="text-[8px]">{new Date(orn.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Vault;
