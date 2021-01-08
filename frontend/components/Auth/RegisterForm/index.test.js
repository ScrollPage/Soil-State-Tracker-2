import React, { useState as useStateMock } from 'react';
import RegisterForm from './index'
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

describe("Registerform", () => {
	it("rendering and submiting form values", async () => {

		// 1 step form testing
		let step = 0;
		const onSubmit = jest.fn();
		const setStep = jest.fn();
		const { rerender } = render(<RegisterForm step={step} setStep={setStep} handleSubmit={onSubmit} />);

		const values = {
			email: "email@email.ru",
			firstName: "firstName",
			lastName: "lastName",
			password: "Password123",
			confirmPassword: "Password123"
		}

		userEvent.type(screen.getByPlaceholderText(/имя/i), values.firstName);
		userEvent.type(screen.getByPlaceholderText(/фамилия/i), values.lastName);

		userEvent.click(screen.getByText(/продолжить/i));
		step++;

		await waitFor(() => {
			expect(setStep).toHaveBeenCalledWith(1);
		})

		// 2 step form testing
		rerender(<RegisterForm step={step} setStep={setStep} handleSubmit={onSubmit} />)

		userEvent.type(screen.getByPlaceholderText(/e-mail/i), values.email);
		userEvent.type(screen.getByPlaceholderText("Пароль"), values.password);
		userEvent.type(screen.getByPlaceholderText(/повторите пароль/i), values.confirmPassword);

		userEvent.click(screen.getByText(/регистрация/i));

		await waitFor(() => {
			expect(onSubmit).toHaveBeenCalledWith(values);
		})

	})
})
