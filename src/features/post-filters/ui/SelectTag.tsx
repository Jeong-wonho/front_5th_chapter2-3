import { useNavigate } from "react-router-dom"
import { usePostFiltersStore } from "../../../entities/posts/models"
import { useTagsQuery } from "../../../entities/tag/api"
import { Tag } from "../../../entities/tag/models"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"


export const SelectTag = () => {
  const { data: tagsData } = useTagsQuery()
  const { selectedTag, setSelectedTag, updateURL } = usePostFiltersStore();
  const navigate = useNavigate()

  return (
    <Select
      value={selectedTag}
      onValueChange={(value) => {
        setSelectedTag(value)
        updateURL(navigate)
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="태그 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">모든 태그</SelectItem>
        {tagsData?.map((tag: Tag) => (
          <SelectItem key={tag.url} value={tag.slug}>
            {tag.slug}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
