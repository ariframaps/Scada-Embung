// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
	testDir: "./tests",
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: "html",
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('')`. */
		// baseURL: 'http://localhost:3000',

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: "on-first-retry",
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: "chromium",
			use: {
				...devices["Desktop Chrome"],
				screenshot: "on",
				video: "on",
				trace: "on",
			},
		},

		{
			name: "firefox",
			use: {
				...devices["Desktop Firefox"],
				screenshot: "on",
				video: "on",
				trace: "on",
			},
		},

		{
			name: "webkit",
			use: {
				...devices["Desktop Safari"],
				screenshot: "on",
				video: "on",
				trace: "on",
			},
		},

		// ultra wide
		{
			name: "Desktop UltraWide",
			use: {
				viewport: { width: 2560, height: 1440 },
				screenshot: "on",
				video: "on",
				trace: "on",
			},
		},

		// large desktop
		{
			name: "Desktop Large",
			use: {
				viewport: { width: 1920, height: 1080 },
				screenshot: "on",
				video: "on",
				trace: "on",
			},
		},

		// tablet device
		{
			name: "Tablet iPad",
			use: {
				...devices["iPad (gen 7)"],
				screenshot: "on",
				video: "on",
				trace: "on",
			},
		},
		{
			name: "Tablet iPad Mini",
			use: {
				...devices["iPad Mini"],
				screenshot: "on",
				video: "on",
				trace: "on",
			},
		},

		/* Test against mobile viewports. */
		{
			name: "Mobile Chrome",
			use: {
				...devices["Pixel 5"],
				screenshot: "on",
				video: "on",
				trace: "on",
			},
		},
		{
			name: "Mobile Safari",
			use: {
				...devices["iPhone 12"],
				screenshot: "on",
				video: "on",
				trace: "on",
			},
		},

		// small device
		{
			name: "Mobile Small",
			use: {
				viewport: { width: 320, height: 640 },
				isMobile: true,
				deviceScaleFactor: 2,
				screenshot: "on",
				video: "on",
				trace: "on",
			},
		},

		/* Test against branded browsers. */
		{
			name: "Microsoft Edge",
			use: {
				...devices["Desktop Edge"],
				screenshot: "on",
				video: "on",
				trace: "on",
				channel: "msedge",
			},
		},
		{
			name: "Google Chrome",
			use: {
				...devices["Desktop Chrome"],
				screenshot: "on",
				video: "on",
				trace: "on",
				channel: "chrome",
			},
		},
	],

	/* Run your local dev server before starting the tests */
	// webServer: {
	//   command: 'npm run start',
	//   url: 'http://localhost:3000',
	//   reuseExistingServer: !process.env.CI,
	// },
});
