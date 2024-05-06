import SelectContainer from '@src/containers/analysis/SelectContainer'

const AnalysisPage = () => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto' }}
    >
      <SelectContainer />
      {/* <ResultContainer /> */}
    </div>
  )
}

export default AnalysisPage
