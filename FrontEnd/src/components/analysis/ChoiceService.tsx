import { useState } from 'react'
import analysisStore from '@src/stores/analysisStore'
import { SelectedServiceType } from '@src/types/AnalysisType'
import ChoiceServiceType from '@src/components/analysis/ChoiceServiceType'
import ChoiceServiceDetail from '@src/components/analysis/ChoiceServiceDetail'
import * as c from '@src/components/styles/analysis/ChoiceServiceStyle'

const ChoiceService = () => {
  const serviceDataBody = analysisStore(state => state.serviceDataBody)
  const selectedServiceType = analysisStore(state => state.selectedServiceType)
  const setSelectedServiceType = analysisStore(
    state => state.setSelectedServiceType,
  )
  const setSelectedService = analysisStore(state => state.setSelectedService)
  const [serviceList, setServiceList] = useState<SelectedServiceType[]>([])

  const handleServiceTypeClick = (serviceType: string) => {
    setSelectedService({
      serviceCode: '',
      serviceCodeName: '',
      serviceType: '',
    }) // 업종 소분류 초기화
    setSelectedServiceType(serviceType) // 업종 대분류 저장
    const filteredList = serviceDataBody.filter(
      item => item.serviceType === serviceType,
    )
    setServiceList(filteredList) // 해당 대분류에 해당하는 소분류 리스트로 변경
  }

  return (
    <c.Container>
      <c.Title>분석하고 싶은 업종을 선택해주세요.</c.Title>
      <ChoiceServiceType handleServiceTypeClick={handleServiceTypeClick} />
      {selectedServiceType && <ChoiceServiceDetail serviceList={serviceList} />}
    </c.Container>
  )
}

export default ChoiceService
