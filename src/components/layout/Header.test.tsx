import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from '@/components';

import { useSession } from 'next-auth/react';
jest.mock('next-auth/react');

describe('Header', () => {
  it('renders a Header', async () => {
    const mockSession: any = {
      expires: new Date(Date.now() + 2 * 86400).toISOString(),
      user: { username: 'admin' },
    };
    (useSession as jest.Mock).mockReturnValueOnce([mockSession, false]);
    // render(<Header />);
    // await waitFor(() => {
    //   const content = screen.getByText('repo.md');
    //   expect(content).toBeInTheDocument();
    // });
  });
});
