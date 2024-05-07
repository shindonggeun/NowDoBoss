import { ChoiceServicePropsType } from '@src/types/AnalysisType'
import * as c from '@src/components/styles/analysis/ChoiceServiceTypeStyle'

const ChoiceServiceType = (props: ChoiceServicePropsType) => {
  const { handleServiceTypeClick, selectedType } = props

  return (
    <c.ServiceTypeContainer>
      <c.ServiceType onClick={() => handleServiceTypeClick('RESTAURANT')}>
        <c.ServiceImgBox $isSelected={selectedType === 'RESTAURANT'}>
          <c.ServiceImg src="src/assets/restaurant.png" alt="food" />
        </c.ServiceImgBox>
        <c.ServiceTitle>음식점</c.ServiceTitle>
      </c.ServiceType>
      <c.ServiceType onClick={() => handleServiceTypeClick('ACADEMY')}>
        <c.ServiceImgBox $isSelected={selectedType === 'ACADEMY'}>
          <c.ServiceImg src="src/assets/education.png" alt="education" />
        </c.ServiceImgBox>
        <c.ServiceTitle>교육</c.ServiceTitle>
      </c.ServiceType>
      <c.ServiceType onClick={() => handleServiceTypeClick('LEISURE')}>
        <c.ServiceImgBox $isSelected={selectedType === 'LEISURE'}>
          <c.ServiceImg src="src/assets/leisure.png" alt="leisure" />
        </c.ServiceImgBox>
        <c.ServiceTitle>레저/오락</c.ServiceTitle>
      </c.ServiceType>
      <c.ServiceType onClick={() => handleServiceTypeClick('SERVICE')}>
        <c.ServiceImgBox $isSelected={selectedType === 'SERVICE'}>
          <c.ServiceImg src="src/assets/service.png" alt="service" />
        </c.ServiceImgBox>
        <c.ServiceTitle>서비스</c.ServiceTitle>
      </c.ServiceType>
      <c.ServiceType onClick={() => handleServiceTypeClick('RETAIL')}>
        <c.ServiceImgBox $isSelected={selectedType === 'RETAIL'}>
          <c.ServiceImg src="src/assets/retail.png" alt="retail" />
        </c.ServiceImgBox>
        <c.ServiceTitle>도소매업</c.ServiceTitle>
      </c.ServiceType>
      <c.ServiceType onClick={() => handleServiceTypeClick('HOUSEHOLDS')}>
        <c.ServiceImgBox $isSelected={selectedType === 'HOUSEHOLDS'}>
          <c.ServiceImg src="src/assets/households.png" alt="households" />
        </c.ServiceImgBox>
        <c.ServiceTitle>생활용품</c.ServiceTitle>
      </c.ServiceType>
    </c.ServiceTypeContainer>
  )
}

export default ChoiceServiceType
