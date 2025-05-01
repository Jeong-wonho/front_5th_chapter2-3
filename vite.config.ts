import react from "@vitejs/plugin-react"
import { resolve } from "path"
import { defineConfig, Plugin } from "vite"
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiReplace()],
  base: "/front_5th_chapter2-3/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
    outDir: "dist",
  },

  server: {
    proxy: {
      "/api": {
        // target: 'https://jsonplaceholder.typicode.com',
        target: "https://dummyjson.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})

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
