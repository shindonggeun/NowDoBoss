import * as c from '@src/components/styles/simulation/StepStyle'

interface Step1Props {
  nextStep: () => void
}

const SelectionStep1 = ({ nextStep }: Step1Props) => {
  return (
    <c.Container>
      <h2>setp1 페이지 입니다</h2>
      <c.Title>
        <c.Emphasis>프렌차이즈</c.Emphasis>창업을 생각하고 계신가요?
      </c.Title>
      <div>
        <c.SelectButton size="sm" type="button">
          음식점
        </c.SelectButton>
        <c.SelectButton size="sm" type="button">
          중식 음식점
        </c.SelectButton>
        <c.SelectButton size="sm" type="button">
          패스트 푸드점
        </c.SelectButton>
        <c.SelectButton size="sm" type="button">
          호프/간이주점
        </c.SelectButton>
        <c.SelectButton size="sm" type="button">
          호프/간이주점
        </c.SelectButton>
        <c.SelectButton size="sm" type="button">
          호프/간이주점
        </c.SelectButton>
      </div>
      <div>
        <c.SelectButton size="m" type="button">
          어쩌구
        </c.SelectButton>
        <c.SelectButton size="m" type="button">
          저쩌구ddd
        </c.SelectButton>
      </div>
      <div>
        <c.SelectButton size="lg" type="button">
          어쩌구
        </c.SelectButton>
        <c.SelectButton size="lg" type="button">
          저쩌구dd
        </c.SelectButton>
      </div>
      <button type="button" onClick={nextStep}>
        다음
      </button>
    </c.Container>
  )
}

export default SelectionStep1
