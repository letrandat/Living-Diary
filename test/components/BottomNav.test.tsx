import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BottomNav from '../../components/BottomNav';
import { ViewType } from '../../types';

const NAV_LABELS = ['Spirit', 'Diary', 'Guide', 'Forge', 'Vault', 'Market'] as const;

const NAV_IDS: ViewType[] = ['home', 'journal', 'chat', 'gen', 'vault', 'shop'];

describe('BottomNav', () => {
  it('renders all 6 nav labels', () => {
    render(<BottomNav activeView="home" onViewChange={() => {}} />);

    for (const label of NAV_LABELS) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it('calls onViewChange with correct ViewType when clicked', () => {
    const onViewChange = vi.fn();
    render(<BottomNav activeView="home" onViewChange={onViewChange} />);

    for (let i = 0; i < NAV_LABELS.length; i++) {
      fireEvent.click(screen.getByText(NAV_LABELS[i]));
      expect(onViewChange).toHaveBeenLastCalledWith(NAV_IDS[i]);
    }

    expect(onViewChange).toHaveBeenCalledTimes(NAV_LABELS.length);
  });

  it('highlights active view', () => {
    const { rerender } = render(<BottomNav activeView="home" onViewChange={() => {}} />);

    // The active button gets text-emerald-600; inactive gets text-slate-400
    const spiritBtn = screen.getByText('Spirit').closest('button')!;
    expect(spiritBtn.className).toContain('text-emerald-600');

    const diaryBtn = screen.getByText('Diary').closest('button')!;
    expect(diaryBtn.className).toContain('text-slate-400');

    // Switch active to journal
    rerender(<BottomNav activeView="journal" onViewChange={() => {}} />);

    expect(screen.getByText('Spirit').closest('button')!.className).toContain('text-slate-400');
    expect(screen.getByText('Diary').closest('button')!.className).toContain('text-emerald-600');
  });
});
