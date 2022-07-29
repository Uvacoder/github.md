import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DefaultButton } from '@/components';

describe('DefaultButton', () => {
  it('renders a button w/ children', async () => {
    render(<DefaultButton children="Children" />);
    const content = await screen.getByText('Children');
    expect(content).toBeInTheDocument();
  });
});
