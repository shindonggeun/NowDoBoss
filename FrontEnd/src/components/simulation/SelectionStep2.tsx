import * as c from '@src/components/styles/simulation/StepStyle'

interface Step2Props {
  nextStep: () => void
}

const SelectionStep2 = ({ nextStep }: Step2Props) => {
  return (
    <>
      <h1>setp2 페이지 입니다</h1>
      <c.Title>
        창업 하시려는
        <c.Emphasis> 위치</c.Emphasis>를 입력해 주세요
      </c.Title>
      <button type="button" onClick={nextStep}>
        다음
      </button>
    </>
  )
}

export default SelectionStep2
