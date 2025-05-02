import { SearchInput } from "../../../features/post-filters/ui/SearchInput"
import { SelectSortControl } from "../../../features/post-filters/ui/SelectSortControl"
import { SelectSortOrder } from "../../../features/post-filters/ui/SelectSortOrder"
import { SelectTag } from "../../../features/post-filters/ui/SelectTag"


export const PostFiltersPanel = () => {

  
  return (
    <div className="flex gap-4">
      <SearchInput />
      <SelectTag
      />
      <SelectSortControl/>
      <SelectSortOrder/>
    </div>
  )
}
