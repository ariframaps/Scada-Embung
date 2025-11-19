import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "../LoginPage";

const setup = () =>
	render(
		<BrowserRouter>
			<LoginPage />
		</BrowserRouter>
	);

describe("page - login page", () => {
	beforeEach(() => {
		setup();
	});

	it("should render and display form elements", () => {
		// ACT
		const form = screen.getByTestId("form");
		const usernameLabel = screen.getByLabelText(/username/i);
		const passwordLabel = screen.getByLabelText(/password/i);
		const usernameInput = screen.getByPlaceholderText(/username/i);
		const passwordInput = screen.getByPlaceholderText(/password/i);
		const showPasswordBtn = screen.getByText("Show");
		const submitBtn = screen.getByText("Login");

		// ASSERT
		expect(form).toBeInTheDocument();
		expect(usernameLabel).toBeInTheDocument();
		expect(passwordLabel).toBeInTheDocument();
		expect(usernameInput).toBeInTheDocument();
		expect(passwordInput).toBeInTheDocument();
		expect(showPasswordBtn).toBeInTheDocument();
		expect(submitBtn).toBeInTheDocument();
	});

	it("should toggle password visibility when show password is clicked", async () => {
		const hiddenPasswordInput = screen.getByPlaceholderText(/password/i);
		const showPasswordBtn = screen.getByText("Show");
		expect(hiddenPasswordInput).toHaveAttribute("type", "password");

		await userEvent.click(showPasswordBtn);
		const showedPasswordInput = await screen.findByTestId("password");
		await expect(showedPasswordInput).toHaveAttribute("type", "text");

		await userEvent.click(showPasswordBtn);
		const hideAgainPasswordInput = await screen.findByTestId("password");
		await expect(hideAgainPasswordInput).toHaveAttribute("type", "password");
	});

	it("should show error if inputs are empty and submitted", async () => {
		const submitBtn = screen.getByText("Login");
		await userEvent.click(submitBtn);

		const errorMsg = await screen.findByText(/Isi username dan password!/i);
		expect(errorMsg).toBeInTheDocument();
	});
});
