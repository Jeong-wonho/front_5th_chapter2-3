import { usePostFiltersStore } from "../../../entities/posts/models";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"


export const SelectSortControl = () => {
  const { 
    sortBy,
    setSortBy,
  } = usePostFiltersStore();
  
  return (
    <Select value={sortBy} onValueChange={setSortBy}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="정렬 기준" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none">없음</SelectItem>
        <SelectItem value="id">ID</SelectItem>
        <SelectItem value="title">제목</SelectItem>
        <SelectItem value="reactions">반응</SelectItem>
      </SelectContent>
    </Select>
  )
}
