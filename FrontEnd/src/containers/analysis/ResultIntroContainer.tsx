import { forwardRef, Ref } from 'react'
import { useMutation } from '@tanstack/react-query'
import selectPlaceStore from '@src/stores/selectPlaceStore'
import analysisStore from '@src/stores/analysisStore'
import { postAnalysisBookmarks } from '@src/api/analysisApi'
import { AnalysisBookmarksDataType } from '@src/types/AnalysisType'
import ResultIntro from '@src/components/analysis/ResultIntro'
import * as r from '@src/containers/analysis/ResultInroContainerStyle'

const ResultIntroContainer = forwardRef((_, ref: Ref<HTMLDivElement>) => {
  const selectedGoo = selectPlaceStore(state => state.selectedGoo)
  const selectedDong = selectPlaceStore(state => state.selectedDong)
  const selectedCommercial = selectPlaceStore(state => state.selectedCommercial)
  const selectedService = analysisStore(state => state.selectedService)

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
    <r.Container ref={ref}>
      <r.ImgDiv>
        <img src="/images/Buildings.png" alt="buildings" />
      </r.ImgDiv>
      {/* <r.ResultWrap> */}
      {/*  <r.IntroTitle>분석 리포트</r.IntroTitle> */}
      {/* </r.ResultWrap> */}
      <ResultIntro handlePostAnalysisBookmarks={handlePostAnalysisBookmarks} />
    </r.Container>
  )
})

ResultIntroContainer.displayName = 'ResultIntroContainer'
export default ResultIntroContainer
