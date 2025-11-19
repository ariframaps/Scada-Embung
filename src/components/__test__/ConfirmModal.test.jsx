import { render, screen } from "@testing-library/react";
import { describe, expect, it, vitest } from "vitest";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ConfirmModal from "../ConfirmModal";

describe("component - confirm modal", () => {
	beforeEach(() => {
		render(
			<ConfirmModal
				disabled={false}
				btnClassName=""
				btnText="Buka semua"
				text="Apakah anda yakin ingin membuka semua?"
				setAnswer={vitest.fn()}
				type="open"
			/>
		);
	});

	it("load and display confirm modal", () => {
		// ACT
		const controlBtn = screen.getByTestId("control-btn");
		// ASSERT
		expect(controlBtn).toBeInTheDocument();
		expect(controlBtn).toHaveTextContent("Buka semua");
	});

	it("should show modal if the btn is clicked", async () => {
		// ACT
		const controlBtn = screen.getByTestId("control-btn");
		await userEvent.click(controlBtn); // open modal
		const modalText = await screen.findByRole("heading", { level: 4 });
		const yesBtn = await screen.findByTestId("yes-btn");
		const noBtn = await screen.findByTestId("no-btn");
		// ASSERT
		expect(modalText).toHaveTextContent(
			"Apakah anda yakin ingin membuka semua?"
		);
		expect(yesBtn).toHaveTextContent("Iya");
		expect(noBtn).toHaveTextContent("Tidak, kembali");
	});

	it("should close modal if confirm btn is clicked", async () => {
		// ACT
		const controlBtn = screen.getByTestId("control-btn");
		await userEvent.click(controlBtn); // open modal
		const yesBtn = await screen.findByTestId("yes-btn");
		await userEvent.click(yesBtn); //close modal
		// ASSERT
		expect(yesBtn).not.toBeInTheDocument(yesBtn);
	});

	it("should not display modal if it is disabled", async () => {
		// ARRANGE
		render(
			<ConfirmModal
				disabled={true}
				btnClassName=""
				btnText="Buka semua"
				text="Apakah anda yakin ingin membuka semua?"
				setAnswer={vitest.fn()}
				type="open"
			/>
		);
		// ACT
		const controlBtn = screen.getAllByTestId("control-btn");
		await userEvent.click(controlBtn[1]); // open modal
		const yesBtn = screen.queryByTestId("yes-btn");
		// ASSERT
		expect(yesBtn).not.toBeInTheDocument();
	});
});
