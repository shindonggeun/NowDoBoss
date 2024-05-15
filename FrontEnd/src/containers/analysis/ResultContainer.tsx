import { useEffect, useRef, useState } from 'react'
import FlowPopulationAnalysisContainer from '@src/containers/analysis/FlowPopulationAnalysisContainer'
import FacilitiesAnalysis from '@src/components/analysis/facilities/FacilitiesAnalysis'
import StoreCountAnalysisContainer from '@src/containers/analysis/StoreCountAnalysisContainer'
import SalesAnalysisContainer from '@src/containers/analysis/SalesAnalysisContainer'
import ResidentPopulationAnalysisContainer from '@src/containers/analysis/ResidentPopulationAnalysisContainer'
import ExpenditureAnalysisContainer from '@src/containers/analysis/ExpenditureAnalysisContainer'
import SideBarMenu from '@src/components/analysis/SideBarMenu'
import ScrollToTopButton from '@src/common/ScrolllToTopButton'
import * as a from '@src/containers/analysis/ResultContainerStyle'

const ResultContainer = () => {
  // 카테고리별 컴포넌트로 이동하기 위한 ref
  const flowRef = useRef<HTMLDivElement>(null)
  const facilitiesRef = useRef<HTMLDivElement>(null)
  const storeRef = useRef<HTMLDivElement>(null)
  const salesRef = useRef<HTMLDivElement>(null)
  const residentRef = useRef<HTMLDivElement>(null)
  const expenditureRef = useRef<HTMLDivElement>(null)
  const refArr = [
    flowRef,
    facilitiesRef,
    storeRef,
    salesRef,
    residentRef,
    expenditureRef,
  ]

  // 카테고리별 컴포넌트로 이동 함수
  const moveTo = (index: number) => {
    refArr[index]?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 1150) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }

    window.addEventListener('scroll', handleShowButton)
    return () => {
      window.removeEventListener('scroll', handleShowButton)
    }
  }, [])

  return (
    <a.Container>
      {showButton && <SideBarMenu moveTo={moveTo} />}
      <a.MainDiv>
        <FlowPopulationAnalysisContainer ref={flowRef} />
        <FacilitiesAnalysis ref={facilitiesRef} />
        <StoreCountAnalysisContainer ref={storeRef} />
        <SalesAnalysisContainer ref={salesRef} />
        <ResidentPopulationAnalysisContainer ref={residentRef} />
        <ExpenditureAnalysisContainer ref={expenditureRef} />
      </a.MainDiv>
      <ScrollToTopButton />
    </a.Container>
  )
}
export default ResultContainer
