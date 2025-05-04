import { Search } from "lucide-react"
import { Input } from "../../../shared/ui"
import { usePostFiltersStore } from "../../../entities/posts/models"
import { useSearchPosts } from "../lib/useSearchPosts"

export const SearchInput = () => {
  // 검색 훅 가져오기
  const { executeSearch } = useSearchPosts();
  const { searchQuery, setSearchQuery } = usePostFiltersStore();

  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="게시물 검색..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && executeSearch()}
        />
      </div>
    </div>
  )
}
