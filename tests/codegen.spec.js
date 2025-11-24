import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
	await page.goto("http://localhost:5173/login");
	await expect(page.getByRole("textbox", { name: "Username" })).toBeVisible();
	await expect(page.getByTestId("password")).toBeVisible();
	await expect(page.getByRole("button", { name: "Show" })).toBeVisible();
	await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
	await page.getByRole("textbox", { name: "Username" }).click();
	await page.getByRole("textbox", { name: "Username" }).fill("admin");
	await page.getByRole("textbox", { name: "Username" }).press("Tab");
	await page.getByTestId("password").fill("passwordsalah");
	await page.getByRole("button", { name: "Show" }).click();
	await expect(page.getByTestId("password")).toBeVisible();
	await page.getByRole("button", { name: "Login" }).click();
	await expect(page.getByText("Login Gagal!Invalid username")).toBeVisible();
	await page.getByTestId("password").click();
	await page.getByTestId("password").fill("scada");
	await page.getByRole("button", { name: "Hide" }).click();
	await page.getByRole("button", { name: "Show" }).click();
	await expect(page.getByRole("button", { name: "Hide" })).toBeVisible();
	await page.getByRole("button", { name: "Login" }).click();
	await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
	await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
	await expect(page.getByRole("button", { name: "Buka semua" })).toBeVisible();
	await expect(
		page.getByRole("button", { name: "Tutup semua" })
	).toBeVisible();
	await expect(page.getByRole("link", { name: "Embung 1" })).toBeVisible();
	await page.getByRole("link", { name: "Embung 2" }).click();
	await page.getByRole("button").filter({ hasText: /^$/ }).click();
	await expect(page.getByRole("link", { name: "Embung 2" })).toBeVisible();
	await page.getByRole("button", { name: "Buka semua" }).click();
	await expect(
		page.getByRole("heading", { name: "Apakah anda yakin ingin" })
	).toBeVisible();
	await expect(page.getByTestId("yes-btn")).toBeVisible();
	await expect(page.getByTestId("no-btn")).toBeVisible();
	await expect(page.getByRole("button", { name: "Close" })).toBeVisible();
	await page.getByTestId("yes-btn").click();
	await expect(page.getByRole("button", { name: "Stop" })).toBeVisible();
	await page.getByRole("button", { name: "Stop" }).click();
	page.once("dialog", (dialog) => {
		console.log(`Dialog message: ${dialog.message()}`);
		dialog.dismiss().catch(() => {});
	});
	await expect(page.getByText("Mengirim data...")).toBeVisible();
	await page.getByRole("button", { name: "Tutup semua" }).click();
	await expect(
		page.getByRole("heading", { name: "Apakah anda yakin ingin" })
	).toBeVisible();
	await expect(page.getByTestId("yes-btn")).toBeVisible();
	await expect(page.getByTestId("no-btn")).toBeVisible();
	await page.getByTestId("yes-btn").click();
	await expect(page.getByRole("button", { name: "Stop" })).toBeVisible();
	await page.getByRole("button", { name: "Stop" }).click();
	page.once("dialog", (dialog) => {
		console.log(`Dialog message: ${dialog.message()}`);
		dialog.dismiss().catch(() => {});
	});
	await expect(page.getByText("Mengirim data...")).toBeVisible();
	await expect(
		page.getByRole("link", { name: "Kontrol Pipa Embung" })
	).toBeVisible();
	await page
		.getByRole("link", { name: "Embung 1" })
		.getByRole("button")
		.click();
	await expect(page.getByRole("meter").locator("svg")).toBeVisible();
	await expect(page.getByText("%")).toBeVisible();
	await expect(page.getByRole("heading", { name: "Embung" })).toBeVisible();
	await expect(
		page.getByRole("button").filter({ hasText: /^$/ })
	).toBeVisible();
	await expect(page.getByRole("button", { name: "Buka" })).toBeVisible();
	await expect(page.getByRole("button", { name: "Tutup" })).toBeVisible();
	await page.getByRole("button", { name: "Buka" }).click();
	await expect(page.getByRole("button", { name: "Stop" })).toBeVisible();
	page.once("dialog", (dialog) => {
		console.log(`Dialog message: ${dialog.message()}`);
		dialog.dismiss().catch(() => {});
	});
	await page.getByRole("button", { name: "Stop" }).click();
	await page.getByRole("button").filter({ hasText: /^$/ }).click();
	await expect(page.getByRole("button", { name: "Buka semua" })).toBeVisible();
	await expect(
		page.getByRole("button", { name: "Tutup semua" })
	).toBeVisible();
	await expect(page.getByRole("link", { name: "Embung 1" })).toBeVisible();
	page.once("dialog", (dialog) => {
		console.log(`Dialog message: ${dialog.message()}`);
		dialog.dismiss().catch(() => {});
	});
	await page.getByRole("button", { name: "Logout" }).click();
	await expect(
		page.locator("div").filter({ hasText: /^Embung$/ })
	).toBeVisible();
	await expect(page.getByRole("textbox", { name: "Username" })).toBeVisible();
	await expect(page.getByTestId("password")).toBeVisible();
	await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
	await expect(page.getByRole("button", { name: "Show" })).toBeVisible();
});
