import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserPage from './user-page';
import { useUser } from '../../hook/use-user';

// Mock dependencies
jest.mock('../../hook/use-user');
jest.mock('./component/user-table', () => () => (
  <div data-testid="user-table">UserTable Component</div>
));
jest.mock('../../component/form/text-field', () => ({
  TextField: ({ placeholder, value, onChange, onKeyUp, button }: any) => (
    <div>
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyUp={onKeyUp}
        data-testid="text-field"
      />
      {button}
    </div>
  ),
}));
jest.mock('./component/user-form-modal', () => ({ onSuccess }: any) => (
  <button onClick={onSuccess} data-testid="user-form-modal">
    UserFormModal Component
  </button>
));

describe('UserPage', () => {
  const mockSetPage = jest.fn();
  const mockSetSearch = jest.fn();
  const mockGetUser = jest.fn();

  beforeEach(() => {
    // Mock the useUser hook
    (useUser as any).mockReturnValue({
      loading: false,
      page: 1,
      setPage: mockSetPage,
      size: 10,
      users: {
        data: [],
        totalPages: 5,
      },
      getUser: mockGetUser,
      search: '',
      setSearch: mockSetSearch,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the UserPage with all components', () => {
    render(<UserPage />);

    // Check if the "User Data" title is rendered
    expect(screen.getByText('User Data')).toBeInTheDocument();

    // Check if the TextField component is rendered
    expect(screen.getByPlaceholderText('Search user')).toBeInTheDocument();

    // Check if the UserTable component is rendered
    expect(screen.getByTestId('user-table')).toBeInTheDocument();

    // Check if the UserFormModal component is rendered
    expect(screen.getByTestId('user-form-modal')).toBeInTheDocument();
  });

  it('updates the search input and triggers search on Enter key', () => {
    render(<UserPage />);

    // Type into the search input
    const searchInput = screen.getByPlaceholderText('Search user');
    fireEvent.change(searchInput, { target: { value: 'John Doe' } });

    // Check if setSearch was called with the correct value
    expect(mockSetSearch).toHaveBeenCalledWith('John Doe');

    // Press Enter to trigger getUser
    fireEvent.keyUp(searchInput, { key: 'Enter', code: 'Enter' });

    // Check if getUser was called
    expect(mockGetUser).toHaveBeenCalled();
  });

  it('triggers search when clicking the Search button', () => {
    render(<UserPage />);

    // Click the Search button
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    // Check if setPage and getUser were called
    expect(mockSetPage).toHaveBeenCalledWith(1);
    expect(mockGetUser).toHaveBeenCalled();
  });

  it('resets search and page when the UserFormModal triggers onSuccess', () => {
    render(<UserPage />);

    // Click the UserFormModal button (simulates onSuccess)
    const userFormModalButton = screen.getByTestId('user-form-modal');
    fireEvent.click(userFormModalButton);

    // Check if setPage and setSearch were called to reset
    expect(mockSetPage).toHaveBeenCalledWith(1);
    expect(mockSetSearch).toHaveBeenCalledWith(undefined);
    expect(mockGetUser).toHaveBeenCalled();
  });
});
