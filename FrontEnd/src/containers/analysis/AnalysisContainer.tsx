import SelectContainer from '@src/containers/analysis/SelectContainer'
import ResultContainer from '@src/containers/analysis/ResultContainer'
import { useRef, useState } from 'react'

const AnalysisContainer = () => {
  const [isReady, setIsReady] = useState(false)
  const resultContainerRef = useRef<HTMLDivElement>(null)

  const handleResultButtonClick = () => {
    setIsReady(true)
    resultContainerRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <SelectContainer
        setIsReady={setIsReady}
        handleResultButtonClick={handleResultButtonClick}
      />
      {isReady && <ResultContainer ref={resultContainerRef} />}
    </div>
  )
}

export default AnalysisContainer
