import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import { loadEnv } from "vite"
import { resolve } from "path"
const mode = process.env.NODE_ENV || "development"
const env = loadEnv(mode, process.cwd(), "")

export default defineConfig({
  base: env.VITE_BASE_PATH,
		plugins: [react()],
		build: {
			rollupOptions: {
				input: {
					main: resolve(__dirname, "index.html"),
				},
			},
		},
})
