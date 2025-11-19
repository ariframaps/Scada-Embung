import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import flowbiteReact from "flowbite-react/plugin/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss(), flowbiteReact()],
	test: {
		environment: "jsdom", // 👈 for React Testing Library,
		globals: true, // 👈 gives global expect, describe, it
	},
	server: {
		port: 5173,
		strictPort: true,
		host: true,
		origin: "http://127.0.0.1:5173",
		watch: {
			usePolling: true,
		},
		proxy: {
			"/api": {
				target: "http://100.106.153.106:8080", // arahkan ke Rapid SCADA
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""), // hapus '/api' biar path asli dipake
			},
		},
		// allowedHosts: ["rapid-scadapintu-air-production.up.railway.app"],
	},
});
