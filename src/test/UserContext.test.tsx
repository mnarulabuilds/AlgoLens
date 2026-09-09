import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { UserProvider, useUser } from '../common/context/UserContext';

const topic = {
  id: 'algo/Sorting',
  label: 'Sorting 📊',
  category: 'Algorithms 🧠',
  route: '/algo/Sorting',
};

function TestConsumer() {
  const { favorites, addFavorite, removeFavorite, isFavorite, recentlyViewed, addToRecentlyViewed } =
    useUser();

  return (
    <div>
      <span data-testid="fav-count">{favorites.length}</span>
      <span data-testid="recent-count">{recentlyViewed.length}</span>
      <span data-testid="is-fav">{String(isFavorite(topic.id))}</span>
      <button type="button" onClick={() => addFavorite(topic)}>
        Add favorite
      </button>
      <button type="button" onClick={() => removeFavorite(topic.id)}>
        Remove favorite
      </button>
      <button type="button" onClick={() => addToRecentlyViewed(topic)}>
        Track view
      </button>
    </div>
  );
}

describe('UserContext', () => {
  it('adds and removes favorites', async () => {
    const user = userEvent.setup();
    render(
      <UserProvider>
        <TestConsumer />
      </UserProvider>
    );

    expect(screen.getByTestId('fav-count')).toHaveTextContent('0');
    await user.click(screen.getByText('Add favorite'));
    expect(screen.getByTestId('fav-count')).toHaveTextContent('1');
    expect(screen.getByTestId('is-fav')).toHaveTextContent('true');

    await user.click(screen.getByText('Remove favorite'));
    expect(screen.getByTestId('fav-count')).toHaveTextContent('0');
  });

  it('tracks recently viewed topics', async () => {
    const user = userEvent.setup();
    render(
      <UserProvider>
        <TestConsumer />
      </UserProvider>
    );

    await act(async () => {
      await user.click(screen.getByText('Track view'));
    });

    expect(screen.getByTestId('recent-count')).toHaveTextContent('1');
  });
});
