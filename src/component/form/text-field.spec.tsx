import React from 'react';
import { render, screen } from '@testing-library/react';
import { TextField, TextFieldProps } from './text-field';
import { TextField as TF } from '@radix-ui/themes';

describe('TextField', () => {
  const defaultProps: TextFieldProps = {
    placeholder: 'Enter text',
  };

  it('renders the TextField component without icon and button', () => {
    render(<TextField {...defaultProps} />);

    // Check if the TextField is rendered with the placeholder
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders the TextField component with an icon', () => {
    render(
      <TextField
        {...defaultProps}
        icon={<span data-testid="icon">Icon</span>}
      />,
    );

    // Check if the icon is rendered
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders the TextField component with a button', () => {
    render(
      <TextField
        {...defaultProps}
        button={<button data-testid="button">Button</button>}
      />,
    );

    // Check if the button is rendered
    expect(screen.getByTestId('button')).toBeInTheDocument();
  });

  it('renders the TextField component with both icon and button', () => {
    render(
      <TextField
        {...defaultProps}
        icon={<span data-testid="icon">Icon</span>}
        button={<button data-testid="button">Button</button>}
      />,
    );

    // Check if both the icon and the button are rendered
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByTestId('button')).toBeInTheDocument();
  });
});
