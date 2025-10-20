import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import flowbiteReact from "flowbite-react/plugin/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss(), flowbiteReact()],
	server: {
		port: 5173,
		strictPort: true,
		host: true,
		origin: "http://0.0.0.0:5173",
		watch: {
			usePolling: true,
		},
		proxy: {
			"/api": {
				target: "http://localhost:5000", // arahkan ke Rapid SCADA
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""), // hapus '/api' biar path asli dipake
			},
		},
		// allowedHosts: ["rapid-scadapintu-air-production.up.railway.app"],
	},
});
