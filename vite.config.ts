import { defineConfig, Plugin } from "vite"
import react from "@vitejs/plugin-react"
import * as path from "node:path"

// API 경로를 빌드 시에만 치환하는 플러그인
function apiReplace(): Plugin {
  return {
    name: "api-replace",
    apply: "build",
    transform(code, id) {
      if (!id.match(/\.(ts|js|tsx|jsx)$/)) return
      return code.replace(
        /(['"`])\/api([^"'`\\]*)\1/g,
        (_, quote, apiPath) => `${quote}https://dummyjson.com${apiPath}${quote}`,
      )
    },
  }
}

export default defineConfig({
  plugins: [react(), apiReplace()],
  base: process.env.NODE_ENV === "production" ? "/front_5th_chapter2-3/" : "/",
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@/app": path.resolve(__dirname, "src/app"),
      "@/widgets": path.resolve(__dirname, "src/widgets"),
      "@/pages": path.resolve(__dirname, "src/pages"),
      "@/entities": path.resolve(__dirname, "src/entities"),
      "@/features": path.resolve(__dirname, "src/features"),
      "@/shared": path.resolve(__dirname, "src/shared"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://dummyjson.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
