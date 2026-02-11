import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../../App';

vi.mock('../../services/gemini', () => ({
  getGeminiClient: vi.fn(),
  generateOrnament: vi.fn(),
  chatWithSpirit: vi.fn(),
}));

describe('App integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders with home view (TreeScene) by default', () => {
    render(<App />);

    // TreeScene shows the WATER button and dewdrop wallet
    expect(screen.getByText('WATER')).toBeInTheDocument();
    expect(screen.getByText('FERTILIZE')).toBeInTheDocument();
    // Default user has 500 dewdrops
    expect(screen.getByText(/500/)).toBeInTheDocument();
  });

  it('clicking nav items switches views', () => {
    render(<App />);

    // Click Diary nav button (aria-label="Diary")
    fireEvent.click(screen.getByLabelText('Diary'));

    // JournalView renders "Daily Roots" heading
    expect(screen.getByText('Daily Roots')).toBeInTheDocument();

    // Click More to reveal Market, then click Market
    fireEvent.click(screen.getByLabelText('More options'));
    fireEvent.click(screen.getByText('Market'));

    // Shop renders "Green Market"
    expect(screen.getByText('Green Market')).toBeInTheDocument();

    // Click Spirit (home) to go back
    fireEvent.click(screen.getByLabelText('Spirit'));

    expect(screen.getByText('WATER')).toBeInTheDocument();
  });

  it('clicking Garden nav shows social hub', () => {
    render(<App />);

    fireEvent.click(screen.getByLabelText('Garden'));

    expect(screen.getByText('Garden of Souls')).toBeInTheDocument();
    expect(screen.getByText('Global Echoes')).toBeInTheDocument();
  });

  it('water button deducts 10 dewdrops', async () => {
    render(<App />);

    // Default user has 500 dewdrops
    expect(screen.getByText(/500/)).toBeInTheDocument();

    // Click the WATER button
    fireEvent.click(screen.getByText('WATER'));

    // Dewdrops should now be 490
    await waitFor(() => {
      expect(screen.getByText(/490/)).toBeInTheDocument();
    });
  });
});
