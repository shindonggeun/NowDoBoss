interface Step1Props {
  nextStep: () => void
}

const SelctionStep1 = ({ nextStep }: Step1Props) => {
  return (
    <>
      <h1>setp1 페이지 입니다</h1>
      <button type="button" onClick={nextStep}>
        다음
      </button>
    </>
  )
}

export default SelctionStep1
