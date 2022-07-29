import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ButtonLink } from '@/components';

describe('ButtonLink', () => {
  it('renders a button', () => {
    render(<ButtonLink />);
  });
  it('renders <a /> tag', async () => {
    render(
      <ButtonLink
        link={{
          newTab: true,
          href: 'https://github.com',
        }}
      />
    );
    const link = await screen.getByRole('link');
    expect(link).toBeInTheDocument();
  });
  it('renders local Link', async () => {
    render(
      <ButtonLink
        link={{
          href: '/local-path',
        }}
      />
    );
    const link = await screen.getByRole('button');
    expect(link.parentElement).toHaveAttribute('href', '/local-path');
  });
});
