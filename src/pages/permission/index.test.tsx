import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Users from './index';
import usersController from '~/services/users';
import React from 'react';

afterEach(cleanup);

test('renders Users component', () => {
    render(<Users />);
    expect(screen.getByText('Perdoruesit')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
});

test('loads and displays users', async () => {
    render(<Users />);
    const mockUsers = [
        {
            userId: 1,
            Username: 'user1',
            userFirstname: 'First',
            userLastname: 'Last',
            userEmail: 'user1@example.com',
            userIsActive: true,
            balancaLeje: 100,
            password: 'password1',
        },
    ];
    jest.spyOn(usersController, 'getAllUsers').mockResolvedValue(mockUsers);

    const grid = await screen.findByRole('grid');
    expect(grid).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(mockUsers.length + 1); // Add 1 for the header row
});

test('handles button clicks', () => {
    render(<Users />);
});

test('fetches and sets users on mount', async () => {
    const mockUsers = [
        {
            userId: 1,
            Username: 'user1',
            userFirstname: 'First',
            userLastname: 'Last',
            userEmail: 'user1@example.com',
            userIsActive: true,
            balancaLeje: 100,
            password: 'password1',
        },
    ];

    jest.spyOn(usersController, 'getAllUsers').mockResolvedValue(mockUsers);
    const setUsersMock = jest.fn();
    jest.spyOn(React, 'useState').mockReturnValue([[], setUsersMock]);

    render(<Users />);

    const grid = await screen.findByRole('grid');
    expect(grid).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(mockUsers.length + 1); // Add 1 for the header row

    expect(usersController.getAllUsers).toHaveBeenCalled();
    expect(setUsersMock).toHaveBeenCalledWith(mockUsers);
});

test('handles conditional rendering based on fetched user data', async () => {
    jest.spyOn(usersController, 'getAllUsers').mockResolvedValue([]);

    const noUsersMessage = await screen.findByText('No users found');
    expect(noUsersMessage).toBeInTheDocument();

    const mockUsers = [
        {
            userId: 1,
            Username: 'user1',
            userFirstname: 'First',
            userLastname: 'Last',
            userEmail: 'user1@example.com',
            userIsActive: true,
            balancaLeje: 100,
            password: 'password1',
        },
    ];
    jest.spyOn(usersController, 'getAllUsers').mockResolvedValue(mockUsers);

    render(<Users />);

    const grid = await screen.findByRole('grid');
    expect(grid).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(mockUsers.length + 1); // Add 1 for the header row
});

test('handles button handlers', () => {
    render(<Users />);

    const addButton = screen.getByRole('button', { name: /add/i });
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(addButton);
    fireEvent.click(deleteButton);
});

test('handles user interaction with the DataGrid', () => {
    render(<Users />);

    const firstRow = screen.getAllByRole('row')[1];
    fireEvent.click(firstRow);
});

test('cleans up after unmounting Users component', () => {
    const { unmount } = render(<Users />);
    unmount();
});

// test('renders Users component correctly', () => {
//     const component = renderer.create(<Users />);
//     const tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
// });

// test('handles user authentication and authorization', () => {
//     const mockAuthenticatedUser = { id: 1, role: 'admin' }; // Mock an authenticated user with admin role
//     jest.spyOn(usersController, 'getCurrentUser').mockReturnValue(
//         mockAuthenticatedUser,
//     );

//     render(<Users />);
// });
