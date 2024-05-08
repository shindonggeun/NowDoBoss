import { CategoryTitleCardProps } from '@src/types/AnalysisType'
import * as c from '@src/components/styles/analysis/CategoryTitleCardStyle'

const CategoryTitleCard = (props: CategoryTitleCardProps) => {
  const { src, title } = props
  return (
    <c.CardContainer>
      <c.IconImg src={src} alt={title} />
      <c.Title>{title}</c.Title>
    </c.CardContainer>
  )
}

export default CategoryTitleCard
