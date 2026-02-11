import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BottomNav from '../../components/BottomNav';
import type { ViewType } from '../../types';

const MAIN_LABELS = ['Spirit', 'Diary', 'Garden', 'Guide'] as const;
const MAIN_IDS: ViewType[] = ['home', 'journal', 'social', 'chat'];

const MORE_LABELS = ['Forge', 'Vault', 'Market'] as const;
const MORE_IDS: ViewType[] = ['gen', 'vault', 'shop'];

describe('BottomNav', () => {
  it('renders main nav buttons and more button with aria-labels', () => {
    render(<BottomNav activeView="home" onViewChange={() => {}} />);

    for (const label of MAIN_LABELS) {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }
    expect(screen.getByLabelText('More options')).toBeInTheDocument();
  });

  it('calls onViewChange for main items when clicked', () => {
    const onViewChange = vi.fn();
    render(<BottomNav activeView="home" onViewChange={onViewChange} />);

    for (let i = 0; i < MAIN_LABELS.length; i++) {
      fireEvent.click(screen.getByLabelText(MAIN_LABELS[i]));
      expect(onViewChange).toHaveBeenLastCalledWith(MAIN_IDS[i]);
    }
  });

  it('opens more menu and navigates to secondary items', () => {
    const onViewChange = vi.fn();
    render(<BottomNav activeView="home" onViewChange={onViewChange} />);

    // Test each more item (menu closes after each click, so re-open)
    for (let i = 0; i < MORE_LABELS.length; i++) {
      fireEvent.click(screen.getByLabelText('More options'));
      const btn = screen.getByText(MORE_LABELS[i]);
      expect(btn).toBeInTheDocument();
      fireEvent.click(btn);
      expect(onViewChange).toHaveBeenLastCalledWith(MORE_IDS[i]);
    }
  });

  it('highlights active view with accent theme token', () => {
    const { rerender } = render(<BottomNav activeView="home" onViewChange={() => {}} />);

    const spiritBtn = screen.getByLabelText('Spirit');
    expect(spiritBtn.className).toContain('text-[var(--accent)]');

    const diaryBtn = screen.getByLabelText('Diary');
    expect(diaryBtn.className).toContain('text-[var(--text-muted)]');

    // Switch active to journal
    rerender(<BottomNav activeView="journal" onViewChange={() => {}} />);

    expect(screen.getByLabelText('Spirit').className).toContain('text-[var(--text-muted)]');
    expect(screen.getByLabelText('Diary').className).toContain('text-[var(--accent)]');
  });

  it('highlights more button when a secondary view is active', () => {
    render(<BottomNav activeView="gen" onViewChange={() => {}} />);

    const moreBtn = screen.getByLabelText('More options');
    expect(moreBtn.className).toContain('text-[var(--accent)]');
  });
});
