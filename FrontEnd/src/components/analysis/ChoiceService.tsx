import { useState } from 'react'
import analysisStore from '@src/stores/analysisStore'
import { SelectedServiceType } from '@src/types/AnalysisType'
import ChoiceServiceType from '@src/components/analysis/ChoiceServiceType'
import ChoiceServiceDetail from '@src/components/ChoiceServiceDetail'
import * as c from '@src/components/styles/analysis/ChoiceServiceStyle'

const ChoiceService = () => {
  const serviceDataBody = analysisStore(state => state.serviceDataBody)
  const [selectedType, setSelectedType] = useState('')
  const [serviceList, setServiceList] = useState<SelectedServiceType[]>([])

  const handleServiceTypeClick = (serviceType: string) => {
    const filteredList = serviceDataBody.filter(
      item => item.serviceType === serviceType,
    )
    setSelectedType(serviceType)
    setServiceList(filteredList)
  }

  return (
    <c.Container>
      <c.Title>분석하고 싶은 업종을 선택해주세요.</c.Title>
      <ChoiceServiceType
        handleServiceTypeClick={handleServiceTypeClick}
        selectedType={selectedType}
      />
      <ChoiceServiceDetail serviceList={serviceList} />
    </c.Container>
  )
}

export default ChoiceService
