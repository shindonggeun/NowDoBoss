import * as c from '@src/components/styles/simulation/StepStyle'
import useSimulationStore from '@src/stores/simulationStore'

interface Step1Props {
  nextStep: () => void
}

const SelectionStep1 = ({ nextStep }: Step1Props) => {
  const { isFranchise, setIsFranchise } = useSimulationStore()
  return (
    <c.Container>
      <c.Title>
        <c.Emphasis>프렌차이즈</c.Emphasis>창업을 생각하고 계신가요?
      </c.Title>
      <c.FranchiseContainer>
        <c.SelectButton
          size="m"
          selected={isFranchise === true}
          type="button"
          onClick={() => {
            setIsFranchise(true)
            nextStep()
          }}
        >
          네!
        </c.SelectButton>
        <c.SelectButton
          size="m"
          selected={isFranchise === false}
          type="button"
          onClick={() => {
            setIsFranchise(false)
            nextStep()
          }}
        >
          아니요!
        </c.SelectButton>
      </c.FranchiseContainer>
    </c.Container>
  )
}

export default SelectionStep1
