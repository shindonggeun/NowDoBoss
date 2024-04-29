import * as c from '@src/components/styles/simulation/StepStyle'

interface Step3Props {
  nextStep: () => void
}

const SelectionStep3 = ({ nextStep }: Step3Props) => {
  return (
    <>
      <h1>setp3 페이지 입니다</h1>
      <c.Title>
        <c.Emphasis>어떤 업종</c.Emphasis>
        으로 창업을 생각하고 계신가요?
      </c.Title>
      <button type="button" onClick={nextStep}>
        다음
      </button>
    </>
  )
}

export default SelectionStep3
