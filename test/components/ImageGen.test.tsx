import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ImageGen from '../../components/ImageGen';
import { generateOrnament } from '../../services/gemini';

vi.mock('../../services/gemini', () => ({
  generateOrnament: vi.fn(),
}));

const mockGenerateOrnament = generateOrnament as ReturnType<typeof vi.fn>;

describe('ImageGen', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders forge button and input', () => {
    const onGenerated = vi.fn();
    render(<ImageGen onGenerated={onGenerated} />);

    expect(screen.getByPlaceholderText(/Describe your ornament/)).toBeInTheDocument();
    expect(screen.getByText('FORGE ORNAMENT')).toBeInTheDocument();
  });

  it('does not call generateOrnament when input is empty', async () => {
    const onGenerated = vi.fn();
    render(<ImageGen onGenerated={onGenerated} />);

    fireEvent.click(screen.getByText('FORGE ORNAMENT'));

    // generateOrnament should never be called with empty input
    expect(mockGenerateOrnament).not.toHaveBeenCalled();
    expect(onGenerated).not.toHaveBeenCalled();
  });

  it('shows error message when generation fails (returns null)', async () => {
    mockGenerateOrnament.mockResolvedValue(null);
    const onGenerated = vi.fn();
    render(<ImageGen onGenerated={onGenerated} />);

    const input = screen.getByPlaceholderText(/Describe your ornament/);
    fireEvent.change(input, { target: { value: 'A blue crystal heart' } });
    fireEvent.click(screen.getByText('FORGE ORNAMENT'));

    await waitFor(() => {
      expect(screen.getByText('Failed to forge ornament. Try a different description.')).toBeInTheDocument();
    });

    expect(onGenerated).not.toHaveBeenCalled();
  });

  it('calls onGenerated with ornament data on success', async () => {
    const fakeUrl = 'data:image/png;base64,abc123';
    mockGenerateOrnament.mockResolvedValue(fakeUrl);
    const onGenerated = vi.fn();
    render(<ImageGen onGenerated={onGenerated} />);

    const input = screen.getByPlaceholderText(/Describe your ornament/);
    fireEvent.change(input, { target: { value: 'A golden star' } });
    fireEvent.click(screen.getByText('FORGE ORNAMENT'));

    await waitFor(() => {
      expect(onGenerated).toHaveBeenCalledTimes(1);
    });

    const ornament = onGenerated.mock.calls[0][0];
    expect(ornament.url).toBe(fakeUrl);
    expect(ornament.name).toBe('A golden star');
    expect(ornament).toHaveProperty('id');
    expect(ornament).toHaveProperty('date');
  });
});
