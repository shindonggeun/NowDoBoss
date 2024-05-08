import SelectContainer from '@src/containers/analysis/SelectContainer'
import ResultContainer from '@src/containers/analysis/ResultContainer'
import { useState } from 'react'

const AnalysisContainer = () => {
  const [isReady, setIsReady] = useState(false)

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto' }}
    >
      <SelectContainer setIsReady={setIsReady} />
      {isReady && <ResultContainer />}
    </div>
  )
}

export default AnalysisContainer
