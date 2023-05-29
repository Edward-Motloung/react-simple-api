import { render, fireEvent, screen } from '@testing-library/react';
import { Paginator } from './Paginator';

describe('Paginator', () => {
  const props = {
    totalRows: 50,
    pageSize: 10,
    goto: jest.fn(),
  };

  test('renders pagination with correct page labels', () => {
    render(<Paginator {...props} />);
    
    const pageLinks = screen.getAllByRole('button', { name: /\d+/ });

    expect(pageLinks).toHaveLength(5);

    expect(pageLinks[0]).toHaveClass('page-link--active'); 

    expect(pageLinks[0]).toHaveTextContent('1');
    expect(pageLinks[1]).toHaveTextContent('2');
    expect(pageLinks[2]).toHaveTextContent('3');
    expect(pageLinks[3]).toHaveTextContent('4');
    expect(pageLinks[4]).toHaveTextContent('5');
  });

  test('calls goto function with correct page number on page link click', () => {
    render(<Paginator {...props} />);
    const pageLink = screen.getByText('2');

    fireEvent.click(pageLink);

    expect(props.goto).toHaveBeenCalledWith(2);
  });
});
