import React from 'react';
import LoginForm from './index'
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

describe("Loginform", () => {
	it("rendering and submiting form values", async () => {
		const onSubmit = jest.fn();
		render(<LoginForm handleSubmit={onSubmit} />);

		const values = {
			email: "email@email.ru",
			password: "password"
		}

		userEvent.type(screen.getByPlaceholderText(/e-mail/i), values.email);
		userEvent.type(screen.getByPlaceholderText(/пароль/i), values.password);

		userEvent.click(screen.getByText(/продолжить/i));

		await waitFor(() => {
			expect(onSubmit).toHaveBeenCalledWith(values);
		})

	})

	it("error output with empty values", async () => {
		const onSubmit = jest.fn();
		render(<LoginForm handleSubmit={onSubmit} />);

		const values = {
			email: "",
			password: ""
		}

		userEvent.type(screen.getByPlaceholderText(/e-mail/i), values.email);
		userEvent.type(screen.getByPlaceholderText(/пароль/i), values.password);

		userEvent.click(screen.getByText(/продолжить/i));

		await waitFor(() => {
			expect(onSubmit).not.toHaveBeenCalled();
		})

		expect(screen.getByText("Введите E-mail")).toBeInTheDocument();
		expect(screen.getByText("Введите пароль")).toBeInTheDocument();


	})

	it("error output with uncorrect email", async () => {
		const onSubmit = jest.fn();
		render(<LoginForm handleSubmit={onSubmit} />);

		const values = {
			email: "uncorrect",
			password: "password"
		}

		userEvent.type(screen.getByPlaceholderText(/e-mail/i), values.email);
		userEvent.type(screen.getByPlaceholderText(/пароль/i), values.password);

		userEvent.click(screen.getByText(/продолжить/i));

		await waitFor(() => {
			expect(onSubmit).not.toHaveBeenCalled();
		})

		expect(screen.getByText("Некорректный E-mail")).toBeInTheDocument();

	})

})