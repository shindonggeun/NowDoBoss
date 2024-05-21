import { useRef } from 'react'
import SideBarMenu from '@src/components/analysis/result/SideBarMenu'
import AdditionalContainer from '@src/containers/analysis/result/AdditionalContainer'
import TopSection from '@src/components/analysis/result/TopSection'
import SummarySection from '@src/components/analysis/result/SummarySection'
import FlowContainer from '@src/containers/analysis/result/FlowContainer'
import SalesContainer from '@src/containers/analysis/result/SalesContainer'
import StoreContainer from '@src/containers/analysis/result/StoreContainer'
import ResidentContainer from '@src/containers/analysis/result/ResidentContainer'
import ExpenditureContainer from '@src/containers/analysis/result/ExpenditureContainer'
import * as a from '@src/containers/analysis/result/AnalysisResultContainerStyle'

const AnalysisResultContainer = () => {
  // 카테고리별 컴포넌트로 이동하기 위한 ref
  const flowRef = useRef<HTMLDivElement>(null)
  const storeRef = useRef<HTMLDivElement>(null)
  const salesRef = useRef<HTMLDivElement>(null)
  const residentRef = useRef<HTMLDivElement>(null)
  const expenditureRef = useRef<HTMLDivElement>(null)
  const refArr = [flowRef, storeRef, salesRef, residentRef, expenditureRef]

  // 카테고리별 컴포넌트로 이동 함수
  const moveTo = (index: number) => {
    refArr[index]?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <a.Overlay>
      <a.FadeInContainer>
        <a.Container>
          <a.LeftDiv>
            <a.SideTitleDiv>
              <a.SideTitle>NOWDOBOSS</a.SideTitle>
              <a.SideSubTitle>상권분석</a.SideSubTitle>
            </a.SideTitleDiv>
            <a.SideContentDiv>
              <SideBarMenu moveTo={moveTo} />
              <AdditionalContainer />
            </a.SideContentDiv>
          </a.LeftDiv>
          <a.RightDiv>
            <TopSection />
            <a.ContentDiv>
              <SummarySection />
              <FlowContainer ref={flowRef} />
              <StoreContainer ref={storeRef} />
              <SalesContainer ref={salesRef} />
              <ResidentContainer ref={residentRef} />
              <ExpenditureContainer ref={expenditureRef} />
            </a.ContentDiv>
          </a.RightDiv>
        </a.Container>
      </a.FadeInContainer>
    </a.Overlay>
  )
}

export default AnalysisResultContainer
