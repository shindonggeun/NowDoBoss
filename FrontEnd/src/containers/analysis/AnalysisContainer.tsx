import ResultSection from '@src/components/analysis/ResultSection'
import SelectLocation from '@src/components/analysis/SelectLocation'
import * as a from '@src/containers/analysis/AnalysisContainerStyle'
import { useRef } from 'react'

const AnalysisContainer = () => {
  const element = useRef<HTMLDivElement>(null)
  const onMoveBox = () => {
    element.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <a.Container>
      <a.SelectLocationContainer onClick={onMoveBox}>
        <SelectLocation />
      </a.SelectLocationContainer>
      <ResultSection />
    </a.Container>
  )
}

export default AnalysisContainer
