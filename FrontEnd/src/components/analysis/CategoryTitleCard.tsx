import { CategoryTitleCardProps } from '@src/types/AnalysisType'
import * as c from '@src/components/styles/analysis/CategoryTitleCardStyle'

const CategoryTitleCard = (props: CategoryTitleCardProps) => {
  const { title } = props
  return (
    <c.CardContainer>
      <c.IconImg src="src/assets/flow_population.png" alt="flow_population" />
      <c.Title>{title}</c.Title>
    </c.CardContainer>
  )
}

export default CategoryTitleCard
