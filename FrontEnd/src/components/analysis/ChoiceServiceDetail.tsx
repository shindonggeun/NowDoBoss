import analysisStore from '@src/stores/analysisStore'
import {
  ChoiceServiceDetailPropsType,
  SelectedServiceType,
} from '@src/types/AnalysisType'
import * as c from '@src/components/styles/analysis/ChoiceServiceDetailStyle'

const ChoiceServiceDetail = (props: ChoiceServiceDetailPropsType) => {
  const { serviceList } = props
  const selectedService = analysisStore(state => state.selectedService)
  const setSelectedService = analysisStore(state => state.setSelectedService)

  const handleServiceItemClick = (item: SelectedServiceType) => {
    setSelectedService(item)
  }

  return (
    <c.ServiceDetailContainer>
      {serviceList.length === 0 ? (
        <c.NoneMsg>
          현재 상권에는 해당 분류의 항목을 찾을 수 없습니다.
        </c.NoneMsg>
      ) : (
        serviceList.map(item => (
          <c.ServiceDetailItem
            key={item.serviceCode}
            onClick={() => handleServiceItemClick(item)}
            $isSelected={item.serviceCode === selectedService.serviceCode}
          >
            {item.serviceCodeName}
          </c.ServiceDetailItem>
        ))
      )}
    </c.ServiceDetailContainer>
  )
}

export default ChoiceServiceDetail
