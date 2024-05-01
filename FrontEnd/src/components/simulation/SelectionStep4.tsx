import * as c from '@src/components/styles/simulation/StepStyle'
import { subCategories } from '@src/stores/simulationStore'

interface Step4Props {
  nextStep: () => void
  category: string
  subCategory: string
  onSelectedSubCategory: (value: string) => void
}

const SelectionStep4 = ({
  nextStep,
  category,
  subCategory,
  onSelectedSubCategory,
}: Step4Props) => {
  return (
    <c.Container>
      {/* <h1>setp4 페이지 입니다</h1> */}
      <c.Title>
        <c.Emphasis>어떤 {category}</c.Emphasis>을/를 생각하고 계신가요?
      </c.Title>
      <c.SubCategoryContainer>
        {subCategories[category].map(subCat => (
          <c.SelectButton
            key={subCat.code}
            size="sm"
            type="button"
            onClick={() => {
              onSelectedSubCategory(subCat.name)
              nextStep()
            }}
            selected={subCategory === subCat.name}
          >
            {subCat.name}
          </c.SelectButton>
        ))}
      </c.SubCategoryContainer>
    </c.Container>
  )
}

export default SelectionStep4
