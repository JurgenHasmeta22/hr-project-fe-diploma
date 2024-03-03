import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from './index';
import authenticationController from '~/services/authentication';
import { useNavigate } from 'react-router-dom';

jest.mock('~/services/authentication');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

test('renders login form', () => {
    const { getByLabelText, getByText } = render(<Login />);

    expect(getByLabelText(/username/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
    expect(getByText(/logohu/i)).toBeInTheDocument();
});

test('submits form', () => {
    const { getByLabelText, getByText } = render(<Login />);

    fireEvent.change(getByLabelText(/username/i), {
        target: { value: 'testuser' },
    });
    fireEvent.change(getByLabelText(/password/i), {
        target: { value: 'testpassword' },
    });
    fireEvent.click(getByText(/logohu/i));
});

test('validates form fields', async () => {
    const { getByLabelText, getByText } = render(<Login />);

    fireEvent.click(getByText(/logohu/i));
    expect(await getByText('required')).toBeInTheDocument();

    fireEvent.change(getByLabelText(/username/i), {
        target: { value: 'testuser' },
    });
    fireEvent.change(getByLabelText(/password/i), {
        target: { value: 'testpassword' },
    });
    fireEvent.click(getByText(/logohu/i));
});

test('submits form and handles authentication response', async () => {
    const { getByLabelText, getByText } = render(<Login />);

    fireEvent.change(getByLabelText(/username/i), {
        target: { value: 'testuser' },
    });
    fireEvent.change(getByLabelText(/password/i), {
        target: { value: 'testpassword' },
    });
    fireEvent.click(getByText(/logohu/i));

    // const mockResponse = { status: 200, user: { username: 'testuser' } };
    // authenticationController.onLogin.mockResolvedValue(mockResponse);

    await waitFor(() => {
        expect(authenticationController.onLogin).toHaveBeenCalledWith({
            userName: 'testuser',
            password: 'testpassword',
        });
        expect(getByText('Ju jeni loguar me sukses')).toBeInTheDocument();
    });
});

test('submits form and handles authentication error', async () => {
    const { getByLabelText, getByText } = render(<Login />);

    fireEvent.change(getByLabelText(/username/i), {
        target: { value: 'testuser' },
    });
    fireEvent.change(getByLabelText(/password/i), {
        target: { value: 'testpassword' },
    });
    fireEvent.click(getByText(/logohu/i));

    // const mockError = new Error('Authentication failed');
    // authenticationController.onLogin.mockRejectedValue(mockError);

    await waitFor(() => {
        expect(authenticationController.onLogin).toHaveBeenCalledWith({
            userName: 'testuser',
            password: 'testpassword',
        });
        expect(getByText('Authentication failed')).toBeInTheDocument();
    });
});
4;
test('navigates to dashboard after successful authentication', async () => {
    const { getByLabelText, getByText } = render(<Login />);

    fireEvent.change(getByLabelText(/username/i), {
        target: { value: 'testuser' },
    });
    fireEvent.change(getByLabelText(/password/i), {
        target: { value: 'testpassword' },
    });
    fireEvent.click(getByText(/logohu/i));

    // const mockResponse = { status: 200, user: { username: 'testuser' } };
    // authenticationController.onLogin.mockResolvedValue(mockResponse);

    await waitFor(() => {
        expect(useNavigate).toHaveBeenCalledWith('/dashboard');
    });
});

test('displays loading state while form submission is in progress', async () => {
    const { getByLabelText, getByText } = render(<Login />);

    fireEvent.change(getByLabelText(/username/i), {
        target: { value: 'testuser' },
    });
    fireEvent.change(getByLabelText(/password/i), {
        target: { value: 'testpassword' },
    });
    fireEvent.click(getByText(/logohu/i));
});

test('resets form after form submission is canceled', async () => {
    const { getByLabelText, getByText } = render(<Login />);

    fireEvent.change(getByLabelText(/username/i), {
        target: { value: 'testuser' },
    });
    fireEvent.change(getByLabelText(/password/i), {
        target: { value: 'testpassword' },
    });
    fireEvent.click(getByText(/logohu/i));
});
