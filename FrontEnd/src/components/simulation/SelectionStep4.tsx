import * as c from '@src/components/styles/simulation/StepStyle'
import useSimulationStore, { subCategories } from '@src/stores/simulationStore'

interface Step4Props {
  nextStep: () => void
}

const SelectionStep4 = ({ nextStep }: Step4Props) => {
  const { category, subCategory, setSubCategory } = useSimulationStore()

  return (
    <c.Container>
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
              setSubCategory(subCat.name)
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
