import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BottomNav from '../../components/BottomNav';
import { ViewType } from '../../types';

const NAV_LABELS = ['Spirit', 'Diary', 'Guide', 'Forge', 'Vault', 'Market'] as const;

const NAV_IDS: ViewType[] = ['home', 'journal', 'chat', 'gen', 'vault', 'shop'];

describe('BottomNav', () => {
  it('renders all 6 nav buttons with aria-labels', () => {
    render(<BottomNav activeView="home" onViewChange={() => {}} />);

    for (const label of NAV_LABELS) {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }
  });

  it('calls onViewChange with correct ViewType when clicked', () => {
    const onViewChange = vi.fn();
    render(<BottomNav activeView="home" onViewChange={onViewChange} />);

    for (let i = 0; i < NAV_LABELS.length; i++) {
      fireEvent.click(screen.getByLabelText(NAV_LABELS[i]));
      expect(onViewChange).toHaveBeenLastCalledWith(NAV_IDS[i]);
    }

    expect(onViewChange).toHaveBeenCalledTimes(NAV_LABELS.length);
  });

  it('highlights active view with purple theme', () => {
    const { rerender } = render(<BottomNav activeView="home" onViewChange={() => {}} />);

    const spiritBtn = screen.getByLabelText('Spirit');
    expect(spiritBtn.className).toContain('text-purple-400');

    const diaryBtn = screen.getByLabelText('Diary');
    expect(diaryBtn.className).toContain('text-slate-500');

    // Switch active to journal
    rerender(<BottomNav activeView="journal" onViewChange={() => {}} />);

    expect(screen.getByLabelText('Spirit').className).toContain('text-slate-500');
    expect(screen.getByLabelText('Diary').className).toContain('text-purple-400');
  });
});
