import React from 'react';
import { render, screen } from '@testing-library/react';
import UserTable, { UserTableProps } from './user-table';
import { User } from '../../../type/user';

// Mock the TablePagination component
jest.mock('../../../component/pagination/table-pagination', () => {
  return {
    __esModule: true,
    default: ({ page, totalPages, onPageChange }: any) => (
      <div data-testid="table-pagination">
        Pagination Component - Page: {page} / Total Pages: {totalPages}
        <button onClick={() => onPageChange(page + 1)}>Next</button>
      </div>
    ),
  };
});

// Define mock data for the tests
const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
  } as User,
  {
    id: 2,
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '0987654321',
  } as User,
];

describe('UserTable', () => {
  const defaultProps: UserTableProps = {
    items: mockUsers,
    page: 1,
    size: 10,
    totalPages: 2,
    onPageChange: jest.fn(),
  };

  it('renders the table with user data', () => {
    render(<UserTable {...defaultProps} />);

    // Check if the table headers are rendered
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();

    // Check if the table rows are rendered with user data
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('1234567890')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('0987654321')).toBeInTheDocument();
  });

  it('displays the loading spinner when loading is true', () => {
    render(<UserTable {...defaultProps} loading={true} />);

    expect(screen.getByTestId('user-table')).toBeInTheDocument();
    const table = screen.getByTestId('user-table');
    expect(table).toHaveClass('animate-pulse');
  });

  it('renders the pagination component', () => {
    render(<UserTable {...defaultProps} />);

    // Check if the pagination component is rendered
    expect(screen.getByTestId('table-pagination')).toBeInTheDocument();
    expect(
      screen.getByText('Pagination Component - Page: 1 / Total Pages: 2'),
    ).toBeInTheDocument();
  });

  it('calls onPageChange when the next button is clicked', () => {
    const onPageChangeMock = jest.fn();
    render(<UserTable {...defaultProps} onPageChange={onPageChangeMock} />);

    // Click the "Next" button in the pagination
    screen.getByText('Next').click();

    // Check if the onPageChange function is called
    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });
});
