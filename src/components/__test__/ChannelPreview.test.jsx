import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom";
import ChannelPreview from "../ChannelPreview";

describe("component - channel preview", () => {
	it("load and display channel preview", () => {
		// ARRANGE
		render(<ChannelPreview disabled={false} value={2} name={"miaaw 10"} />);
		// ACT
		const channelName = screen.getByRole("heading");
		// ASSERT
		expect(channelName).toBeInTheDocument();
	});

	it("should have correct title", () => {
		// ARRANGE
		render(<ChannelPreview disabled={false} value={2} name={"embung 5"} />);
		// ACT
		const channelName = screen.getByRole("heading", { level: 5 });
		// ASSERT
		expect(channelName).toHaveTextContent("embung 5");
	});

	it("should have the correct href link if clicked", () => {
		// ARRANGE
		render(<ChannelPreview disabled={false} value={2} name={"embung 5"} />);
		// ACT
		const cardLink = screen.getByRole("link");
		// ASSERT
		expect(cardLink).toHaveAttribute("href", "/channel/embung 5");
	});

	it("should display invalid message if the value is invalid", () => {
		// ARRANGE
		render(<ChannelPreview disabled={false} value={-2} name={"embung 5"} />);
		// ACT
		const message = screen.getByRole("paragraph");
		// ASSERT
		expect(message).toHaveTextContent("embung 5 value is not valid");
	});

	it("should disable the button and the link if the disable is true", () => {
		// ARRANGE
		render(<ChannelPreview disabled={true} value={2} name={"embung 5"} />);
		// ACT
		const cardLink = screen.getByRole("link");
		const cardBtn = screen.getByRole("button");
		// ASSERT
		expect(cardLink).toHaveAttribute("href", "#");
		expect(cardBtn).toBeDisabled();
	});
});
