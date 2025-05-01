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
      
      // /api 경로를 다양한 패턴으로 찾아 치환
      return code
        // fetch 호출: "/api/경로" (큰따옴표)
        .replace(/(['"`])\/api([^"'`\\]*)\1/g, 
          (_, quote, apiPath) => `${quote}https://dummyjson.com${apiPath}${quote}`)
        // 변수에 할당: url = /api/경로 + 변수
        .replace(/(const|let|var)\s+(\w+)\s*=\s*(['"`])\/api([^"'`\\]*)\3/g,
          (_, declType, varName, quote, apiPath) => 
          `${declType} ${varName} = ${quote}https://dummyjson.com${apiPath}${quote}`)
        // URL 템플릿: `/api/${변수}`
        .replace(/(`\/api\/\$\{[^`]*\}[^`]*`)/g,
          (match) => match.replace('/api/', 'https://dummyjson.com/'))
        // 직접 문자열: url = tag ? "/api/posts/tag/${tag}" : "/api/posts/tags"
        .replace(/(tag\s*\?\s*['"`])\/api([^"'`\\]*)(['"`]\s*:\s*['"`])\/api([^"'`\\]*['"`])/g,
          (_, prefix, path1, middle, path2) => 
          `${prefix}https://dummyjson.com${path1}${middle}https://dummyjson.com${path2}`)
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

