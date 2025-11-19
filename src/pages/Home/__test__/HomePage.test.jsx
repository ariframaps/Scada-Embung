import { describe, it, beforeEach, vi, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { getChannelValue } from "../../../lib/api";
import HomePage from "../HomePage";

const mockData = {
	success: true,
	data: [
		{ cnlNum: 101, val: 50, stat: 1 },
		{ cnlNum: 102, val: 70, stat: 1 },
	],
};

vi.mock("../../../lib/api", () => ({
	getChannelValue: vi.fn(),
	// sendCommand: vi.fn(),
}));

vi.mock("../../../data/constant", () => ({
	GAUGE_ANIMATION_TIME: 10, // ✅ Very fast for tests
	POLLING_TIME: 10000, // Keep polling slow
	WEB_APP_TITLE: "Pintu Air",
}));

describe("page - Hompage integration", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders and shows all buttons and the enable status", async () => {
		getChannelValue.mockResolvedValue(mockData);
		render(<HomePage />);

		// Wait for data loaded
		await waitFor(() => {
			expect(screen.getByText("Buka semua")).toBeInTheDocument();
		});

		expect(screen.getByText("Stop")).toBeInTheDocument();
		expect(screen.getByText("Tutup semua")).toBeInTheDocument();

		// Cards should show
		expect(screen.getByText(/50/i)).toBeInTheDocument();
		expect(screen.getByText(/70/i)).toBeInTheDocument();
	});

	it("renders and shows all card buttons", async () => {
		getChannelValue.mockResolvedValue(mockData);

		render(<HomePage />);

		await waitFor(() => {
			expect(screen.getByText("Buka semua")).toBeInTheDocument();
		});

		// Check each card value or name
		expect(screen.getByText(/50/i)).toBeInTheDocument();
		expect(screen.getByText(/70/i)).toBeInTheDocument();
	});
	it("should show confirm open after the open button is clicked", async () => {
		getChannelValue.mockResolvedValue(mockData);

		render(<HomePage />);

		await waitFor(() => {
			expect(screen.getByText("Buka semua")).toBeInTheDocument();
		});

		await userEvent.click(screen.getByText("Buka semua"));

		expect(
			screen.getByText("Apakah anda yakin ingin membuka semua?")
		).toBeInTheDocument();
	});
	it("should show confirm close after the close button is clicked", async () => {
		getChannelValue.mockResolvedValue(mockData);

		render(<HomePage />);

		await waitFor(() => {
			expect(screen.getByText("Buka semua")).toBeInTheDocument();
		});

		await userEvent.click(screen.getByText("Tutup semua"));

		expect(
			screen.getByText("Apakah anda yakin ingin menutup semua?")
		).toBeInTheDocument();
	});
});
