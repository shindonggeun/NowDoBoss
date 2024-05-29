import { useState } from 'react'
import SelectContainer from '@src/containers/analysis/SelectContainer'
import { useNavigate } from 'react-router-dom'

const AnalysisContainer = () => {
  const [, setIsReady] = useState(false)
  const navigate = useNavigate()

  const handleResultButtonClick = () => {
    navigate('/analysis/result')
  }

  return (
    <SelectContainer
      setIsReady={setIsReady}
      handleResultButtonClick={handleResultButtonClick}
    />
  )
}

export default AnalysisContainer
