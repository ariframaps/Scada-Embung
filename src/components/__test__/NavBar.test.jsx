import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom";
import NavBar from "../NavBar";

describe("component - Navbar", () => {
	it("should render the navbar", () => {
		render(
			<MemoryRouter>
				<NavBar />
			</MemoryRouter>
		);
		expect(screen.getByRole("navigation")).toBeInTheDocument();
	});

	it("should show the logo", () => {
		render(
			<MemoryRouter>
				<NavBar />
			</MemoryRouter>
		);
		expect(screen.getByAltText(/Kontrol Pipa/i)).toBeInTheDocument();
	});

	it("should display navbar links and buttons if user is logged in", () => {
		render(
			<MemoryRouter initialEntries={["/home"]}>
				<NavBar />
			</MemoryRouter>
		);
		expect(screen.getByTestId("navbar-collapse")).toBeInTheDocument();
		expect(screen.getByTestId("navbar-toggle")).toBeInTheDocument();
	});

	it("should not display navbar buttons if user is on login page", () => {
		render(
			<MemoryRouter initialEntries={["/login"]}>
				<NavBar />
			</MemoryRouter>
		);

		// These should not exist because pathname === "/login"
		expect(screen.queryByTestId("navbar-collapse")).not.toBeInTheDocument();
		expect(screen.queryByTestId("navbar-toggle")).not.toBeInTheDocument();
	});
});
