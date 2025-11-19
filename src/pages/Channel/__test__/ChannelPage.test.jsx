import { describe, it, beforeEach, vi, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ChannelPage from "../ChannelPage";
import { getChannelValue, sendCommand } from "../../../lib/api";
import { activeChannels } from "../../../data/channel";

vi.mock("../../../lib/api", () => ({
	getChannelValue: vi.fn(),
	sendCommand: vi.fn(),
}));

vi.mock("../../../data/constant", () => ({
	GAUGE_ANIMATION_TIME: 10, // ✅ Very fast for tests
	POLLING_TIME: 10000, // Keep polling slow
	WEB_APP_TITLE: "Pintu Air",
}));

const mockChannel = activeChannels[0];

describe("page - ChannelPage integration", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	const renderWithRoute = (
		initialPath = `/channel/${encodeURI(mockChannel.channelName)}`
	) =>
		render(
			<MemoryRouter initialEntries={[initialPath]}>
				<Routes>
					<Route path="/channel/:id" element={<ChannelPage />} />
					<Route path="/not-found" element={<p>Not found page</p>} />
				</Routes>
			</MemoryRouter>
		);

	it("renders and shows default button states", async () => {
		getChannelValue.mockResolvedValueOnce({
			success: true,
			data: [
				{
					cnlNum: mockChannel.channelNumber,
					val: 50,
					stat: 1,
				},
			],
		});

		renderWithRoute();

		await waitFor(() => {
			expect(screen.getByText(mockChannel.channelName)).toBeInTheDocument();
		});

		const openButton = screen.getByRole("button", { name: /buka/i });
		const stopButton = screen.getByRole("button", { name: /stop/i });
		const closeButton = screen.getByRole("button", { name: /tutup/i });

		expect(openButton).toBeEnabled();
		expect(closeButton).toBeEnabled();
		expect(stopButton).toBeDisabled();
	});

	it("enables stop button after clicking open or close", async () => {
		getChannelValue.mockResolvedValue({
			success: true,
			data: [
				{
					cnlNum: mockChannel.channelNumber,
					val: 50,
					stat: 1,
				},
			],
		});
		sendCommand.mockResolvedValue({ success: true, message: "ok" });

		renderWithRoute();
		await screen.findByText(mockChannel.channelName);

		const openButton = screen.getByRole("button", { name: /buka/i });
		await userEvent.click(openButton);

		const stopButton = await screen.findByRole("button", { name: /stop/i });
		await waitFor(
			() => {
				expect(stopButton).toBeEnabled();
			},
			{ timeout: 100 }
		);
	});

	it("shows error text when getChannelValue fails", async () => {
		getChannelValue.mockResolvedValue({ success: false });

		renderWithRoute();

		await waitFor(() => {
			expect(screen.getByText(/terjadi kesalahan/i)).toBeInTheDocument();
		});
	});
});
