import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import ChangePassword from './index';

test('renders change password form', () => {
    render(<ChangePassword />);

    const oldPasswordInput = screen.getByLabelText('Passwordi aktual');
    const newPasswordInput = screen.getByLabelText('Passwordi i ri');
    const confirmNewPasswordInput = screen.getByLabelText(
        'Konfirmo passwordin',
    );
    const changePasswordButton = screen.getByText('Ndrysho passwordin');
    expect(oldPasswordInput).toBeInTheDocument();
    expect(newPasswordInput).toBeInTheDocument();
    expect(confirmNewPasswordInput).toBeInTheDocument();
    expect(changePasswordButton).toBeInTheDocument();
});

test('submits the form with valid input', () => {
    render(<ChangePassword />);

    const oldPasswordInput = screen.getByLabelText('Passwordi aktual');
    const newPasswordInput = screen.getByLabelText('Passwordi i ri');
    const confirmNewPasswordInput = screen.getByLabelText(
        'Konfirmo passwordin',
    );
    const changePasswordButton = screen.getByText('Ndrysho passwordin');
    fireEvent.change(oldPasswordInput, { target: { value: 'oldPassword123' } });
    fireEvent.change(newPasswordInput, { target: { value: 'newPassword123' } });
    fireEvent.change(confirmNewPasswordInput, {
        target: { value: 'newPassword123' },
    });
    fireEvent.click(changePasswordButton);
});

test('displays error messages for invalid input', () => {
    render(<ChangePassword />);

    const changePasswordButton = screen.getByText('Ndrysho passwordin');
    fireEvent.click(changePasswordButton);
    const oldPasswordError = screen.getByText(
        'Passwordi aktual eshte i kerkuar',
    );
    const newPasswordError = screen.getByText('Passwordi i ri eshte i kerkuar');
    const confirmNewPasswordError = screen.getByText(
        'Duhet konfirmimi i passwordit',
    );
    expect(oldPasswordError).toBeInTheDocument();
    expect(newPasswordError).toBeInTheDocument();
    expect(confirmNewPasswordError).toBeInTheDocument();
});

test('displays success message after successful form submission', async () => {
    render(<ChangePassword />);

    const oldPasswordInput = screen.getByLabelText('Passwordi aktual');
    const newPasswordInput = screen.getByLabelText('Passwordi i ri');
    const confirmNewPasswordInput = screen.getByLabelText(
        'Konfirmo passwordin',
    );
    const changePasswordButton = screen.getByText('Ndrysho passwordin');
    fireEvent.change(oldPasswordInput, { target: { value: 'oldPassword123' } });
    fireEvent.change(newPasswordInput, { target: { value: 'newPassword123' } });
    fireEvent.change(confirmNewPasswordInput, {
        target: { value: 'newPassword123' },
    });
    fireEvent.click(changePasswordButton);
    const successMessage = await screen.findByText(
        'Ju keni ndryshuar passwordin me sukses',
    );
    expect(successMessage).toBeInTheDocument();
});

test('displays error message after unsuccessful form submission', async () => {
    render(<ChangePassword />);

    const oldPasswordInput = screen.getByLabelText('Passwordi aktual');
    const newPasswordInput = screen.getByLabelText('Passwordi i ri');
    const confirmNewPasswordInput = screen.getByLabelText(
        'Konfirmo passwordin',
    );
    const changePasswordButton = screen.getByText('Ndrysho passwordin');
    fireEvent.change(oldPasswordInput, { target: { value: 'oldPassword123' } });
    fireEvent.change(newPasswordInput, { target: { value: 'newPassword123' } });
    fireEvent.change(confirmNewPasswordInput, {
        target: { value: 'newPassword123' },
    });
    fireEvent.click(changePasswordButton);
    const errorMessage = await screen.findByText(
        'Passwordi nuk eshte ndryshuar me sukses',
    );
    expect(errorMessage).toBeInTheDocument();
});
