import { Tag } from "../../../entities/tag/models"
import { SearchInput } from "../../../features/post-filters/ui/SearchInput"
import { SelectSortControl } from "../../../features/post-filters/ui/SelectSortControl"
import { SelectSortOrder } from "../../../features/post-filters/ui/SelectSortOrder"
import { SelectTag } from "../../../features/post-filters/ui/SelectTag"

interface PostFiltersPanelProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  searchPosts: () => void
  selectedTag: string
  setSelectedTag: (tag: string) => void
  fetchPostsByTag: (tag: string) => void
  updateURL: () => void
  tags: Tag[]
  sortBy: string
  setSortBy: (sortBy: string) => void
  sortOrder: string
  setSortOrder: (sortOrder: string) => void
}
export const PostFiltersPanel = ({
  searchQuery,
  setSearchQuery,
  searchPosts,
  selectedTag,
  setSelectedTag,
  fetchPostsByTag,
  updateURL,
  tags,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}: PostFiltersPanelProps) => {
  return (
    <div className="flex gap-4">
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchPosts={searchPosts} />
      <SelectTag
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        fetchPostsByTag={fetchPostsByTag}
        updateURL={updateURL}
        tags={tags}
      />
      <SelectSortControl sortBy={sortBy} setSortBy={setSortBy} />
      <SelectSortOrder sortOrder={sortOrder} setSortOrder={setSortOrder} />
    </div>
  )
}
