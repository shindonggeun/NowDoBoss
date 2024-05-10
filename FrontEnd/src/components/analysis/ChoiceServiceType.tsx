import analysisStore from '@src/stores/analysisStore'
import { ChoiceServicePropsType } from '@src/types/AnalysisType'
import * as c from '@src/components/styles/analysis/ChoiceServiceTypeStyle'

const ChoiceServiceType = (props: ChoiceServicePropsType) => {
  const { handleServiceTypeClick } = props
  const selectedServiceType = analysisStore(state => state.selectedServiceType)

  return (
    <c.ServiceTypeContainer>
      <c.ServiceType onClick={() => handleServiceTypeClick('RESTAURANT')}>
        <c.ServiceImgBox $isSelected={selectedServiceType === 'RESTAURANT'}>
          <c.ServiceImg src="/images/restaurant.png" alt="food" />
        </c.ServiceImgBox>
        <c.ServiceTitle>음식점</c.ServiceTitle>
      </c.ServiceType>
      <c.ServiceType onClick={() => handleServiceTypeClick('ACADEMY')}>
        <c.ServiceImgBox $isSelected={selectedServiceType === 'ACADEMY'}>
          <c.ServiceImg src="/images/education.png" alt="education" />
        </c.ServiceImgBox>
        <c.ServiceTitle>교육</c.ServiceTitle>
      </c.ServiceType>
      <c.ServiceType onClick={() => handleServiceTypeClick('LEISURE')}>
        <c.ServiceImgBox $isSelected={selectedServiceType === 'LEISURE'}>
          <c.ServiceImg src="/images/leisure.png" alt="leisure" />
        </c.ServiceImgBox>
        <c.ServiceTitle>레저/오락</c.ServiceTitle>
      </c.ServiceType>
      <c.ServiceType onClick={() => handleServiceTypeClick('SERVICE')}>
        <c.ServiceImgBox $isSelected={selectedServiceType === 'SERVICE'}>
          <c.ServiceImg src="/images/service.png" alt="service" />
        </c.ServiceImgBox>
        <c.ServiceTitle>서비스</c.ServiceTitle>
      </c.ServiceType>
      <c.ServiceType onClick={() => handleServiceTypeClick('RETAIL')}>
        <c.ServiceImgBox $isSelected={selectedServiceType === 'RETAIL'}>
          <c.ServiceImg src="/images/retail.png" alt="retail" />
        </c.ServiceImgBox>
        <c.ServiceTitle>도소매업</c.ServiceTitle>
      </c.ServiceType>
      <c.ServiceType onClick={() => handleServiceTypeClick('HOUSEHOLDS')}>
        <c.ServiceImgBox $isSelected={selectedServiceType === 'HOUSEHOLDS'}>
          <c.ServiceImg src="/images/households.png" alt="households" />
        </c.ServiceImgBox>
        <c.ServiceTitle>생활용품</c.ServiceTitle>
      </c.ServiceType>
    </c.ServiceTypeContainer>
  )
}

export default ChoiceServiceType
