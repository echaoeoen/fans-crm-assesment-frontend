import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TablePagination, { TablePaginationProps } from './table-pagination';

describe('TablePagination', () => {
  const onPageChangeMock = jest.fn();

  const defaultProps: TablePaginationProps = {
    page: 1,
    totalPages: 5,
    size: 10,
    onPageChange: onPageChangeMock,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the pagination component with page numbers', () => {
    render(<TablePagination {...defaultProps} />);

    // Check if the "Previous" button is rendered
    expect(screen.getByText('Previous')).toBeInTheDocument();

    // Check if the "Next" button is rendered
    expect(screen.getByText('Next')).toBeInTheDocument();

    // Check if page numbers are rendered
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('calls onPageChange when the "Next" button is clicked', () => {
    render(<TablePagination {...defaultProps} />);

    // Click the "Next" button
    fireEvent.click(screen.getByText('Next'));

    // Check if onPageChange is called with the correct page number
    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange when the "Previous" button is clicked', () => {
    // Set the initial page to 2
    render(<TablePagination {...defaultProps} page={2} />);

    // Click the "Previous" button
    fireEvent.click(screen.getByText('Previous'));

    // Check if onPageChange is called with the correct page number
    expect(onPageChangeMock).toHaveBeenCalledWith(1);
  });

  it('disables going to the previous page when on the first page', () => {
    render(<TablePagination {...defaultProps} page={1} />);

    // Click the "Previous" button
    fireEvent.click(screen.getByText('Previous'));

    // onPageChange should not be called because we are on the first page
    expect(onPageChangeMock).not.toHaveBeenCalled();
  });

  it('disables going to the next page when on the last page', () => {
    render(<TablePagination {...defaultProps} page={5} totalPages={5} />);

    // Click the "Next" button
    fireEvent.click(screen.getByText('Next'));

    // onPageChange should not be called because we are on the last page
    expect(onPageChangeMock).not.toHaveBeenCalled();
  });

  it('renders the correct number of page buttons for less than 10 pages', () => {
    render(<TablePagination {...defaultProps} totalPages={8} />);

    // Check if all page numbers from 1 to 8 are rendered
    for (let i = 1; i <= 8; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  it('renders ellipsis when there are more than 10 pages', () => {
    render(<TablePagination {...defaultProps} totalPages={15} page={8} />);

    // Check if ellipsis is rendered
    expect(screen.getAllByText('...').length).toBeGreaterThan(0);

    // Check if current, first, and last page numbers are rendered
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
  });

  it('calls onPageChange with the correct page number when a page button is clicked', () => {
    render(<TablePagination {...defaultProps} />);

    // Click the page "3" button
    fireEvent.click(screen.getByText('3'));

    // Check if onPageChange is called with the correct page number
    expect(onPageChangeMock).toHaveBeenCalledWith(3);
  });
});
