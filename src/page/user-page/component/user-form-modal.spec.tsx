import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserFormModal from './user-form-modal';
import { useCreateUser } from '../../../hook/use-user';

// Mock the useCreateUser hook
jest.mock('../../../hook/use-user');

describe('UserFormModal', () => {
  // Mock implementation of the useCreateUser hook
  const createUserMock = jest.fn();
  const setUserMock = jest.fn();

  beforeEach(() => {
    (useCreateUser as any).mockReturnValue({
      createUser: createUserMock,
      errorMessage: [],
      loading: false,
      setUser: setUserMock,
      user: {
        name: '',
        email: '',
        phone: '',
        password: '',
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without errors', () => {
    render(<UserFormModal />);
    // Check if the "Add New" button is present
    expect(screen.getByText('Add New')).toBeInTheDocument();
  });

  it('opens the dialog when "Add New" button is clicked', () => {
    render(<UserFormModal />);
    // Click the "Add New" button to open the dialog
    fireEvent.click(screen.getByText('Add New'));
    // Check if the dialog content is visible
    expect(screen.getByText('Add user')).toBeInTheDocument();
  });

  it('allows user input in form fields', () => {
    render(<UserFormModal />);
    // Open the dialog
    fireEvent.click(screen.getByText('Add New'));

    // Enter text into the form fields
    fireEvent.change(screen.getByPlaceholderText('Enter your full name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your phone'), {
      target: { value: '1234567890' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'password123' },
    });

    // Check if the setUser function is called with correct values
    expect(setUserMock).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'John Doe' }),
    );
    expect(setUserMock).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'john@example.com' }),
    );
    expect(setUserMock).toHaveBeenCalledWith(
      expect.objectContaining({ phone: '1234567890' }),
    );
    expect(setUserMock).toHaveBeenCalledWith(
      expect.objectContaining({ password: 'password123' }),
    );
  });

  it('calls createUser and closes the dialog on success', async () => {
    // Mock createUser to resolve successfully
    createUserMock.mockResolvedValue(true);
    const onSuccessMock = jest.fn();

    render(<UserFormModal onSuccess={onSuccessMock} />);
    // Open the dialog
    fireEvent.click(screen.getByText('Add New'));

    // Click the "Save" button
    fireEvent.click(screen.getByText('Save'));

    // Wait for createUser to be called and dialog to close
    await waitFor(() => {
      expect(createUserMock).toHaveBeenCalled();
      expect(onSuccessMock).toHaveBeenCalled();
      expect(screen.queryByText('Add user')).not.toBeInTheDocument();
    });
  });

  it('displays error messages when provided', () => {
    // Update the mock to return error messages
    (useCreateUser as any).mockReturnValue({
      createUser: createUserMock,
      errorMessage: ['Error 1', 'Error 2'],
      loading: false,
      setUser: setUserMock,
      user: {
        name: '',
        email: '',
        phone: '',
        password: '',
      },
    });

    render(<UserFormModal />);
    // Open the dialog
    fireEvent.click(screen.getByText('Add New'));

    // Check if error messages are displayed
    expect(screen.getByText('Error 1')).toBeInTheDocument();
    expect(screen.getByText('Error 2')).toBeInTheDocument();
  });
});
