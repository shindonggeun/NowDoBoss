import * as c from '@src/components/styles/simulation/StepStyle'

interface Step1Props {
  nextStep: () => void
  isFranchise: boolean
  onSelectedkFranchise: (value: boolean) => void 
}

const SelectionStep1 = ({ nextStep, isFranchise, onSelectedkFranchise}: Step1Props) => {
  return (
    <c.Container>
      <h2>setp1 페이지 입니다</h2>
      <c.Title>
        <c.Emphasis>프렌차이즈</c.Emphasis>창업을 생각하고 계신가요?
      </c.Title>
      <div>
        <c.SelectButton size="m" selected={isFranchise} type="button" onClick={() => onSelectedkFranchise(true)}>
          네!
        </c.SelectButton>
        <c.SelectButton size="m" selected={!isFranchise} type="button" onClick={() => onSelectedkFranchise(false)}>
          아니요!
        </c.SelectButton>
      </div>
  
      <button type="button" onClick={nextStep}>
        다음
      </button>
    </c.Container>
  )
}

export default SelectionStep1
