import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { DartsListPage } from './DartsListPage';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import fetch from 'node-fetch';
global.fetch = fetch;

describe('DartsListPage - fetch-testing', () => {
  it('endpoint datas expect to be greater than 0', async () => {
    render(
      <MemoryRouter>
        <DartsListPage />
      </MemoryRouter>
    );
  // Várunk a backend válaszára
  await waitFor(async () => {
    const response = await fetch('https://darts.sulla.hu/darts');
    const players = await response.json();
    expect(players.length).toBeGreaterThan(0);
  });

  });
});
  describe('DartsListPage - spinner testing', () => {
  it('should show loading spinner while fetching data', async () => {
    render(
      <MemoryRouter>
        <DartsListPage />
      </MemoryRouter>
    );
    // Check if the loading spinner is shown initially
    expect(screen.getByRole('status')).toBeInTheDocument();

    // Wait for the data to be fetched and rendered
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
  });
});