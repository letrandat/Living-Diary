import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Vault from '../../components/Vault';
import { UserProfile } from '../../types';
import { DEFAULT_USER } from '../../constants';

describe('Vault', () => {
  it('shows "The chest is empty" when ornaments array is empty', () => {
    render(<Vault user={DEFAULT_USER} />);
    expect(screen.getByText('The chest is empty')).toBeInTheDocument();
  });

  it('renders ornaments when present', () => {
    const userWithOrnaments: UserProfile = {
      ...DEFAULT_USER,
      ornaments: [
        { id: 'orn-1', url: 'https://example.com/crystal.png', name: 'Crystal Leaf', date: '2025-06-15' },
        { id: 'orn-2', url: 'https://example.com/moon.png', name: 'Moon Stone', date: '2025-07-20' },
      ],
    };

    render(<Vault user={userWithOrnaments} />);

    expect(screen.getByText('Crystal Leaf')).toBeInTheDocument();
    expect(screen.getByText('Moon Stone')).toBeInTheDocument();
    expect(screen.queryByText('The chest is empty')).not.toBeInTheDocument();
  });
});
