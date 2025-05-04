import { BrowserRouter as Router } from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { queryClient } from "./shared/lib/query-client"

import PostsManagerPage from "./pages/PostsManagerPage.tsx"
import { Header } from "./widgets/header/ui"
import { Footer } from "./widgets/footer/ui"

// GitHub Pages 배포용 basename 설정
const BASE_PATH = import.meta.env.VITE_BASE_PATH || '/'

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router basename={BASE_PATH}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <PostsManagerPage />
          </main>
          <Footer />
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
