import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SocialHub from '../../components/SocialHub';

describe('SocialHub', () => {
  it('renders heading and feed section', () => {
    render(<SocialHub />);

    expect(screen.getByText('Garden of Souls')).toBeInTheDocument();
    expect(screen.getByText('Global Echoes')).toBeInTheDocument();
    expect(screen.getByText('Top Gardeners')).toBeInTheDocument();
  });

  it('renders mock feed posts', () => {
    render(<SocialHub />);

    // Names appear in both feed and leaderboard, so use getAllByText
    expect(screen.getAllByText('FloraGazer').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('SkyWalker').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Seedling99').length).toBeGreaterThanOrEqual(1);
  });

  it('toggles like on posts', () => {
    render(<SocialHub />);

    // FloraGazer has 24 likes initially
    expect(screen.getByText('24')).toBeInTheDocument();

    // Find the like button for the first post (contains Heart icon)
    const likeButtons = screen.getAllByText('24');
    fireEvent.click(likeButtons[0].closest('button')!);

    // Should now show 25
    expect(screen.getByText('25')).toBeInTheDocument();
  });

  it('filters posts by search query', () => {
    render(<SocialHub />);

    const searchInput = screen.getByPlaceholderText('Search gardeners...');
    fireEvent.change(searchInput, { target: { value: 'Flora' } });

    // FloraGazer appears in filtered feed + leaderboard
    expect(screen.getAllByText('FloraGazer').length).toBeGreaterThanOrEqual(1);
    // SkyWalker's post is filtered out but name still in leaderboard
    // Check the post content is hidden
    expect(screen.queryByText(/winter chill/i)).not.toBeInTheDocument();
  });

  it('renders anonymous letters section with input', () => {
    render(<SocialHub />);

    expect(screen.getByText('Anonymous Letters')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Write your letter...')).toBeInTheDocument();
  });

  it('renders leaderboard with rankings', () => {
    render(<SocialHub />);

    expect(screen.getByText('LVL 14')).toBeInTheDocument();
    expect(screen.getByText('LVL 13')).toBeInTheDocument();
    expect(screen.getByText('LVL 12')).toBeInTheDocument();
  });
});
