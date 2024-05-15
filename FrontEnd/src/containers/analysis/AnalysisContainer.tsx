import { useRef, useState } from 'react'
import SelectContainer from '@src/containers/analysis/SelectContainer'
import ResultIntroContainer from '@src/containers/analysis/ResultIntroContainer'
import ResultContainer from '@src/containers/analysis/ResultContainer'

const AnalysisContainer = () => {
  const [isReady, setIsReady] = useState(false)
  const resultIntroContainerRef = useRef<HTMLDivElement>(null)

  const handleResultButtonClick = () => {
    setIsReady(true)
    resultIntroContainerRef.current?.scrollIntoView({
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
      {isReady && (
        <>
          <ResultIntroContainer ref={resultIntroContainerRef} />
          <ResultContainer />
        </>
      )}
    </div>
  )
}

export default AnalysisContainer
