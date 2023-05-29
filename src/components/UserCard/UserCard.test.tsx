/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, fireEvent, screen } from '@testing-library/react';
import { UserCard } from './UserCard';


describe('UserCard', () => {
  const user = {
    display_name: 'John Doe',
    reputation: 100,
    profile_image: 'profile.jpg',
  };

  test('renders user card with initial state', () => {
    render(<UserCard user={user} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Reputation: 100')).toBeInTheDocument();
    expect(screen.getByAltText('...')).toBeInTheDocument();
    
  });

  test('expands card on click', () => {
    const { container } = render(<UserCard user={user} />);
    const cardBody = container.firstElementChild as HTMLElement;
    fireEvent.click(cardBody);

    expect(container.querySelector('.card-extension')).toBeInTheDocument();
  });
})