import { PageControl } from "../../../features/post-pagination/ui/PageControl"
import { PageSelect } from "../../../features/post-pagination/ui/PageSelect"

interface PostPaginationProps {
  limit: number
  setLimit: (limit: number) => void
  skip: number
  setSkip: (skip: number) => void
  total: number
}
export const PostPagination = ({ limit, setLimit, skip, setSkip, total }: PostPaginationProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <PageSelect limit={limit} setLimit={setLimit} />
        <PageControl skip={skip} limit={limit} total={total} setSkip={setSkip} />
      </div>
    </div>
  )
}
