interface Step2Props {
  nextStep: () => void
}

const SelectionStep2 = ({ nextStep }: Step2Props) => {
  return (
    <>
      <h1>setp2 페이지 입니다</h1>
      <button type="button" onClick={nextStep}>
        다음
      </button>
    </>
  )
}

export default SelectionStep2
