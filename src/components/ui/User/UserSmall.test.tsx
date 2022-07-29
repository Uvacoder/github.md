import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserSmall } from '@/components';

describe('UserSmall', () => {
  it('renders User component', async () => {
    render(
      <UserSmall
        owner={{ login: 'username__1', avatar_url: 'https://github.com/' }}
      />
    );
    const content = await screen.getByText('@username__1');
    expect(content).toBeInTheDocument();
  });
});
