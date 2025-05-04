import { usePostFiltersStore, usePostStore } from "../../../entities/posts/models"
import { PageControl, PageSelect } from "../../../features/post-pagination/ui"

export const PostPagination = () => {
  const { total } = usePostStore();
  const {limit, setLimit, skip, setSkip} = usePostFiltersStore();
  return (
    <div className="flex justify-between items-center">
      <PageSelect limit={limit} setLimit={setLimit} />
      <PageControl skip={skip} limit={limit} total={total} setSkip={setSkip} />
    </div>
  )
}
