import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSession } from 'next-auth/react';

import { Header } from '@/components';

describe('Header', () => {
  it('renders a Header', async () => {
    const mockSession: any = {
      expires: new Date(Date.now() + 2 * 86400).toISOString(),
      user: { username: 'admin' },
    };
    (useSession as jest.Mock).mockReturnValueOnce([mockSession, false]);
    render(<Header />);
    await waitFor(() => {
      const content = screen.getByText('repo.md');
      expect(content).toBeInTheDocument();
    });
  });

  it('renders a Header for authenticated user', async () => {
    const user = { username: 'admin', image: '/public/favicon.ico' };
    const mockSession: any = {
      data: { user },
    };
    (useSession as jest.Mock).mockReturnValue(mockSession);
    render(<Header />);
    await waitFor(() => {
      const userAvatar = screen.getByRole('img');
      expect(userAvatar).toBeInTheDocument();
    });
  });
});
