import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Shop from '../../components/Shop';
import { UserProfile } from '../../types';
import { DEFAULT_USER } from '../../constants';

function makeUser(overrides: Partial<UserProfile> = {}): UserProfile {
  return { ...DEFAULT_USER, ...overrides };
}

describe('Shop', () => {
  it('renders all 4 shop items', () => {
    const mockSetUser = vi.fn();
    render(<Shop user={makeUser()} setUser={mockSetUser} />);

    expect(screen.getByText('Auto-Water Sprite')).toBeInTheDocument();
    expect(screen.getByText('Golden Fertilizer')).toBeInTheDocument();
    expect(screen.getByText('Sakura Essence')).toBeInTheDocument();
    expect(screen.getByText('Ornament Chest')).toBeInTheDocument();
  });

  it('shows "Not enough dewdrops" toast when balance is insufficient', async () => {
    const mockSetUser = vi.fn();
    const poorUser = makeUser({ dewdrops: 0 });
    render(<Shop user={poorUser} setUser={mockSetUser} />);

    // Click buy on Auto-Water Sprite (costs 200)
    const buyButtons = screen.getAllByRole('button').filter(btn => btn.textContent?.includes('200'));
    fireEvent.click(buyButtons[0]);

    // setUser should NOT be called — early return before state update
    expect(mockSetUser).not.toHaveBeenCalled();

    // Toast appears directly (no setTimeout needed)
    expect(screen.getByText(/Not enough dewdrops/)).toBeInTheDocument();
  });

  it('Golden Fertilizer purchase increases treeLevel', async () => {
    const mockSetUser = vi.fn();
    const user = makeUser({ dewdrops: 500, treeLevel: 3 });
    render(<Shop user={user} setUser={mockSetUser} />);

    // Click buy on Golden Fertilizer (costs 500)
    const buyButtons = screen.getAllByRole('button').filter(btn => btn.textContent?.includes('500'));
    fireEvent.click(buyButtons[0]);

    expect(mockSetUser).toHaveBeenCalledTimes(1);
    const updater = mockSetUser.mock.calls[0][0];
    const result = updater(user);

    expect(result.dewdrops).toBe(0);
    expect(result.treeLevel).toBe(4);
  });

  it('Sakura Essence unlocks sakura tree type', async () => {
    const mockSetUser = vi.fn();
    const user = makeUser({ dewdrops: 1000, unlockedTreeTypes: ['oak', 'willow'] });
    render(<Shop user={user} setUser={mockSetUser} />);

    // Click buy on Sakura Essence (costs 1000)
    const buyButtons = screen.getAllByRole('button').filter(btn => btn.textContent?.includes('1000'));
    fireEvent.click(buyButtons[0]);

    expect(mockSetUser).toHaveBeenCalledTimes(1);
    const updater = mockSetUser.mock.calls[0][0];
    const result = updater(user);

    expect(result.dewdrops).toBe(0);
    expect(result.unlockedTreeTypes).toContain('sakura');
  });

  it('Ornament Chest adds 3 ornaments', async () => {
    const mockSetUser = vi.fn();
    const user = makeUser({ dewdrops: 350, ornaments: [] });
    render(<Shop user={user} setUser={mockSetUser} />);

    // Click buy on Ornament Chest (costs 350)
    const buyButtons = screen.getAllByRole('button').filter(btn => btn.textContent?.includes('350'));
    fireEvent.click(buyButtons[0]);

    expect(mockSetUser).toHaveBeenCalledTimes(1);
    const updater = mockSetUser.mock.calls[0][0];
    const result = updater(user);

    expect(result.dewdrops).toBe(0);
    expect(result.ornaments).toHaveLength(3);
    expect(result.ornaments[0]).toHaveProperty('id');
    expect(result.ornaments[0]).toHaveProperty('url');
    expect(result.ornaments[0]).toHaveProperty('name');
    expect(result.ornaments[0]).toHaveProperty('date');
  });
});
