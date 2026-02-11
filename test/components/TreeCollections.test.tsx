import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TreeCollections from '../../components/TreeCollections';
import { UserProfile } from '../../types';
import { DEFAULT_USER } from '../../constants';

function makeUser(overrides: Partial<UserProfile> = {}): UserProfile {
  return { ...DEFAULT_USER, ...overrides };
}

describe('TreeCollections', () => {
  it('renders all 3 tree types', () => {
    const mockSetUser = vi.fn();
    const onBack = vi.fn();
    render(<TreeCollections user={makeUser()} setUser={mockSetUser} onBack={onBack} />);

    expect(screen.getByText('Oak of Strength')).toBeInTheDocument();
    expect(screen.getByText('Willow of Peace')).toBeInTheDocument();
    expect(screen.getByText('Cherry Blossom')).toBeInTheDocument();
  });

  it('clicking an unlocked tree calls setUser to update currentTreeTypeId', () => {
    const mockSetUser = vi.fn();
    const onBack = vi.fn();
    const user = makeUser({ currentTreeTypeId: 'oak', unlockedTreeTypes: ['oak', 'willow'] });
    render(<TreeCollections user={user} setUser={mockSetUser} onBack={onBack} />);

    // Click on Willow (unlocked)
    fireEvent.click(screen.getByText('Willow of Peace'));

    expect(mockSetUser).toHaveBeenCalledTimes(1);
    const updater = mockSetUser.mock.calls[0][0];
    const result = updater(user);
    expect(result.currentTreeTypeId).toBe('willow');
  });

  it('clicking a locked tree does not call setUser', () => {
    const mockSetUser = vi.fn();
    const onBack = vi.fn();
    const user = makeUser({ currentTreeTypeId: 'oak', unlockedTreeTypes: ['oak'] });
    render(<TreeCollections user={user} setUser={mockSetUser} onBack={onBack} />);

    // Sakura is not unlocked
    fireEvent.click(screen.getByText('Cherry Blossom'));

    expect(mockSetUser).not.toHaveBeenCalled();
  });

  it('back button calls onBack', () => {
    const mockSetUser = vi.fn();
    const onBack = vi.fn();
    render(<TreeCollections user={makeUser()} setUser={mockSetUser} onBack={onBack} />);

    fireEvent.click(screen.getByText('BACK'));

    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
