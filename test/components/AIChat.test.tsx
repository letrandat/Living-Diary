import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AIChat from '../../components/AIChat';

vi.mock('../../services/gemini', () => ({
  chatWithSpirit: vi.fn(() => Promise.resolve('The spirit replies with wisdom.')),
}));

describe('AIChat', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders heading and default message', () => {
    render(<AIChat entries={[]} />);

    expect(screen.getByText('Arboria Guide')).toBeInTheDocument();
    expect(screen.getByText(/Peace be with you/)).toBeInTheDocument();
  });

  it('has heading class for Fraunces font', () => {
    render(<AIChat entries={[]} />);

    const heading = screen.getByText('Arboria Guide');
    expect(heading.className).toContain('heading');
  });

  it('renders input with placeholder and send button', () => {
    render(<AIChat entries={[]} />);

    expect(screen.getByPlaceholderText('Whisper to the spirit...')).toBeInTheDocument();
    expect(screen.getByLabelText('Send message')).toBeInTheDocument();
  });

  it('sends message on Enter key', async () => {
    render(<AIChat entries={[]} />);

    const input = screen.getByPlaceholderText('Whisper to the spirit...');
    fireEvent.change(input, { target: { value: 'Hello spirit' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    // User message should appear
    await waitFor(() => {
      expect(screen.getByText('Hello spirit')).toBeInTheDocument();
    });
  });

  it('clears input after sending', async () => {
    render(<AIChat entries={[]} />);

    const input = screen.getByPlaceholderText('Whisper to the spirit...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    await waitFor(() => {
      expect(input.value).toBe('');
    });
  });
});
