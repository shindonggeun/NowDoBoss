import { forwardRef, Ref, useEffect, useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { postAnalysisBookmarks } from '@src/api/analysisApi'
import selectPlaceStore from '@src/stores/selectPlaceStore'
import analysisStore from '@src/stores/analysisStore'
import { AnalysisBookmarksDataType } from '@src/types/AnalysisType'
import FlowPopulationAnalysisContainer from '@src/containers/analysis/FlowPopulationAnalysisContainer'
import FacilitiesAnalysis from '@src/components/analysis/facilities/FacilitiesAnalysis'
import StoreCountAnalysisContainer from '@src/containers/analysis/StoreCountAnalysisContainer'
import SalesAnalysisContainer from '@src/containers/analysis/SalesAnalysisContainer'
import ResidentPopulationAnalysisContainer from '@src/containers/analysis/ResidentPopulationAnalysisContainer'
import ExpenditureAnalysisContainer from '@src/containers/analysis/ExpenditureAnalysisContainer'
import SideBarMenu from '@src/components/analysis/SideBarMenu'
import ResultIntro from '@src/components/analysis/ResultIntro'
import ScrollToTopButton from '@src/common/ScrolllToTopButton'
import * as a from '@src/containers/analysis/ResultContainerStyle'

const ResultContainer = forwardRef((_, ref: Ref<HTMLDivElement>) => {
  const selectedGoo = selectPlaceStore(state => state.selectedGoo)
  const selectedDong = selectPlaceStore(state => state.selectedDong)
  const selectedCommercial = selectPlaceStore(state => state.selectedCommercial)
  const selectedService = analysisStore(state => state.selectedService)

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

  const { mutate: PostAnalysisBookmarks } = useMutation({
    mutationKey: ['PostAnalysisBookmarks'],
    mutationFn: postAnalysisBookmarks,
    onSuccess: res => console.log(res),
  })

  const handlePostAnalysisBookmarks = () => {
    console.log('okay!')
    const data: AnalysisBookmarksDataType = {
      districtCode: String(selectedGoo.code),
      districtCodeName: selectedGoo.name,
      administrationCode: String(selectedDong.code),
      administrationCodeName: selectedDong.name,
      commercialCode: String(selectedCommercial.code),
      commercialCodeName: selectedCommercial.name,
      serviceType: selectedService.serviceType,
      serviceCode: selectedService.serviceCode,
      serviceCodeName: selectedService.serviceCodeName,
    }

    PostAnalysisBookmarks(data)
  }

  return (
    <a.Container ref={ref}>
      <a.ImgDiv>
        <img src="/images/Buildings.png" alt="buildings" />
      </a.ImgDiv>
      <a.ResultWrap>
        <a.IntroTitle>분석 리포트</a.IntroTitle>
      </a.ResultWrap>
      <ResultIntro handlePostAnalysisBookmarks={handlePostAnalysisBookmarks} />
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
})

ResultContainer.displayName = 'ResultContainer'
export default ResultContainer
