import { render, screen, fireEvent } from '@testing-library/react';
import CreateUser from './index';

test('renders create user form', () => {
    render(<CreateUser />);

    const usernameInput = screen.getByLabelText(/username/i);
    const firstnameInput = screen.getByLabelText(/emri/i);
    const lastnameInput = screen.getByLabelText(/mbiemri/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const roleSelect = screen.getByLabelText(/roli/i);

    expect(usernameInput).toBeInTheDocument();
    expect(firstnameInput).toBeInTheDocument();
    expect(lastnameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(roleSelect).toBeInTheDocument();
});

test('submits form data', () => {
    render(<CreateUser />);

    const usernameInput = screen.getByLabelText(/username/i);
    const firstnameInput = screen.getByLabelText(/emri/i);
    const lastnameInput = screen.getByLabelText(/mbiemri/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const roleSelect = screen.getByLabelText(/roli/i);
    const saveButton = screen.getByText(/ruaj ndryshimet/i);

    fireEvent.change(usernameInput, { target: { value: 'JohnDoe' } });
    fireEvent.change(firstnameInput, { target: { value: 'John' } });
    fireEvent.change(lastnameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(roleSelect, { target: { value: 'Administrator' } });
    fireEvent.click(saveButton);
});

test('resets form data', () => {
    render(<CreateUser />);

    const usernameInput = screen.getByLabelText(/username/i);
    const resetButton = screen.getByText(/anullo/i);

    fireEvent.change(usernameInput, { target: { value: 'JohnDoe' } });
    fireEvent.click(resetButton);
});
