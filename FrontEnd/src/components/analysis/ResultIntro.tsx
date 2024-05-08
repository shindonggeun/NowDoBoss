import { useEffect, useState } from 'react'
import selectPlaceStore from '@src/stores/selectPlaceStore'
import analysisStore from '@src/stores/analysisStore'
import * as r from '@src/components/styles/analysis/ResultIntroStyle'

const ResultIntro = () => {
  const selectedGoo = selectPlaceStore(state => state.selectedGoo)
  const selectedDong = selectPlaceStore(state => state.selectedDong)
  const selectedCommercial = selectPlaceStore(state => state.selectedCommercial)
  const selectedServiceType = analysisStore(state => state.selectedServiceType)
  const selectedService = analysisStore(state => state.selectedService)
  const [type, setType] = useState('')

  useEffect(() => {
    switch (selectedServiceType) {
      case 'RESTAURANT':
        setType('음식점')
        break
      case 'ACADEMY':
        setType('교육')
        break
      case 'LEISURE':
        setType('레저/오락')
        break
      case 'SERVICE':
        setType('서비스')
        break
      case 'RETAIL':
        setType('도소매')
        break
      case 'HOUSEHOLDS':
        setType('생활용품')
        break
      default:
        setType('')
    }
  }, [selectedServiceType])

  return (
    <r.IntroContainer>
      <r.IntroTitle>상권분석 결과입니다.</r.IntroTitle>
      <r.IntroDetails>
        <r.DetailItem>
          <r.DetailItemTitle>위치 :</r.DetailItemTitle>
          {selectedGoo.name} {selectedDong.name} {selectedCommercial.name}
        </r.DetailItem>
        <r.DetailItem>
          <r.DetailItemTitle>업종 :</r.DetailItemTitle>
          {type} - {selectedService.serviceCodeName}
        </r.DetailItem>
      </r.IntroDetails>
    </r.IntroContainer>
  )
}

export default ResultIntro
