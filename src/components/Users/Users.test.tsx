/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Users } from './Users';
import { QueryClient, QueryClientProvider } from 'react-query';

let queryClient: QueryClient;
const server = setupServer(
    rest.get('/users', (req: any, res: any, ctx: any) => {
        return res(
            ctx.json({
                data: {
                    items: [
                        { id: 1, display_name: 'User 1' },
                        { id: 2, display_name: 'User 2' },
                        { id: 3, display_name: 'User 3' },
                    ],
                },
            })
        );
    })
);

beforeAll(() => {
    server.listen();
    queryClient = new QueryClient();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Users', () => {

    test('renders user list with search functionality', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Users />
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Loading ...')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('Lets find the Super Dev')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
            expect(screen.getAllByRole('listitem')).toHaveLength(3);
        });
    });

    test('filters user list based on search input', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Users />
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Loading ...')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('User 1')).toBeInTheDocument();
            expect(screen.getByText('User 2')).toBeInTheDocument();
            expect(screen.getByText('User 3')).toBeInTheDocument();
        });

        const searchInput = screen.getByPlaceholderText('Search');

        // Simulate search
        fireEvent.change(searchInput, { target: { value: 'user 1' } });

        expect(screen.queryByText('User 1')).toBeInTheDocument();
        expect(screen.queryByText('User 2')).not.toBeInTheDocument();
        expect(screen.queryByText('User 3')).not.toBeInTheDocument();
    });
});
