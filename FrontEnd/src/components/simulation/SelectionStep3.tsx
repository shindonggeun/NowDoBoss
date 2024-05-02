import * as c from '@src/components/styles/simulation/StepStyle'
import useSimulationStore from '@src/stores/simulationStore'

interface Step3Props {
  nextStep: () => void
}

const SelectionStep3 = ({ nextStep }: Step3Props) => {
  const { category, setCategory } = useSimulationStore()

  const categories = [
    '음식점',
    '학원',
    '레저/오락',
    '서비스',
    '도소매',
    '생활용품',
  ]

  return (
    <c.Container>
      <c.Title>
        <c.Emphasis>어떤 업종</c.Emphasis>
        으로 창업을 생각하고 계신가요?
      </c.Title>
      <c.CategoryContainer>
        {categories.map(cat => (
          <c.SelectButton
            key={cat}
            size="sm"
            type="button"
            onClick={() => {
              setCategory(cat)
              nextStep()
            }}
            selected={category === cat}
          >
            {cat}
          </c.SelectButton>
        ))}
      </c.CategoryContainer>
    </c.Container>
  )
}

export default SelectionStep3
