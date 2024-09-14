import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from './login-page';
import { useLogin } from '../hook/use-login';

// Mock the useLogin hook
jest.mock('../hook/use-login');

describe('LoginPage', () => {
  const mockDoLogin = jest.fn();
  const mockSetEmail = jest.fn();
  const mockSetPassword = jest.fn();

  beforeEach(() => {
    // Mock the useLogin hook's return values
    (useLogin as any).mockReturnValue({
      doLogin: mockDoLogin,
      email: '',
      errorMessage: [],
      loading: false,
      password: '',
      setEmail: mockSetEmail,
      setPassword: mockSetPassword,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the LoginPage with all elements', () => {
    render(<LoginPage />);

    // Check if the "Login" title is rendered
    expect(screen.getByTestId('login-text')).toBeInTheDocument();

    // Check if the email input is rendered
    expect(screen.getByPlaceholderText('email')).toBeInTheDocument();

    // Check if the password input is rendered
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();

    // Check if the "Login" button is rendered
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
  });

  it('updates email input and password input', () => {
    render(<LoginPage />);

    // Type into the email input
    const emailInput = screen.getByPlaceholderText('email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    // Check if setEmail was called with the correct value
    expect(mockSetEmail).toHaveBeenCalledWith('test@example.com');

    // Type into the password input
    const passwordInput = screen.getByPlaceholderText('password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Check if setPassword was called with the correct value
    expect(mockSetPassword).toHaveBeenCalledWith('password123');
  });

  it('calls doLogin when the Login button is clicked', () => {
    render(<LoginPage />);

    // Click the "Login" button
    const loginButton = screen.getByTestId('login-button');
    fireEvent.click(loginButton);

    // Check if doLogin was called
    expect(mockDoLogin).toHaveBeenCalled();
  });

  it('displays error messages when provided', () => {
    // Update the mock to return error messages
    (useLogin as any).mockReturnValue({
      doLogin: mockDoLogin,
      email: '',
      errorMessage: ['Invalid email or password'],
      loading: false,
      password: '',
      setEmail: mockSetEmail,
      setPassword: mockSetPassword,
    });

    render(<LoginPage />);

    // Check if the error message is displayed
    expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
  });
});
