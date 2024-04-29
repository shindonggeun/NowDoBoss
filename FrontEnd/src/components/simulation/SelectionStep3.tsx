interface Step3Props {
  nextStep: () => void
}

const SelectionStep3 = ({ nextStep }: Step3Props) => {
  return (
    <>
      <h1>setp3 페이지 입니다</h1>
      <button type="button" onClick={nextStep}>
        다음
      </button>
    </>
  )
}

export default SelectionStep3
