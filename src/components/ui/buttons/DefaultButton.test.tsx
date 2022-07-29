import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DefaultButton } from '@/components';

describe('DefaultButton', () => {
  it('renders a button', () => {
    render(<DefaultButton />);
  });
});
