import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ButtonLink } from '@/components';

describe('Home', () => {
  it('renders a button', () => {
    render(<ButtonLink />);
  });
});
