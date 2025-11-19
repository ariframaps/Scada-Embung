import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom";
import GaugeChart from "../GaugeChart";

describe("component - gauge chart", () => {
	it("load and display gauge chart", () => {
		// ARRANGE
		render(<GaugeChart value={2} />);
		// ACT
		const channelValue = screen.getByRole("paragraph");
		// ASSERT
		expect(channelValue).toBeInTheDocument();
	});

	it("should render the correct value", () => {
		// ARRANGE
		render(<GaugeChart value={2} />);
		// ACT
		const channelValue = screen.getByRole("paragraph");
		// ASSERT
		expect(channelValue).toHaveTextContent("2%");
	});
});
