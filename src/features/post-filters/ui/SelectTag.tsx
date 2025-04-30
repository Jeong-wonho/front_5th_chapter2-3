import { Tag } from "../../../entities/tag/models"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"

interface TagSelectProps {
    selectedTag: string
    setSelectedTag: (value: string) => void
    fetchPostsByTag: (value: string) => void
    updateURL: () => void
    tags: Tag[]
}
export const SelectTag = ({selectedTag, setSelectedTag, fetchPostsByTag, updateURL, tags}: TagSelectProps) => {
    return (
        <Select
              value={selectedTag}
              onValueChange={(value) => {
                setSelectedTag(value)
                fetchPostsByTag(value)
                updateURL()
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="태그 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 태그</SelectItem>
                {tags.map((tag: Tag) => (
                  <SelectItem key={tag.url} value={tag.slug}>
                    {tag.slug}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
    )
}