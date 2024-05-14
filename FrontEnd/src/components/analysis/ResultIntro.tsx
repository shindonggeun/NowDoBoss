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
    <r.Container>
      <r.InfoDiv>
        <r.ServiceText>
          {selectedService.serviceCodeName} ({type})
        </r.ServiceText>
        <r.CommercialText>{selectedCommercial.name}</r.CommercialText>
        <r.GuText>
          서울시 {selectedGoo.name} {selectedDong.name}
        </r.GuText>
        <r.ShareBox>
          <r.ShareBoxText>분석 리포트 공유하기</r.ShareBoxText>
        </r.ShareBox>
      </r.InfoDiv>
      <r.WarningDiv>
        <r.WarnTitle>책임의 한계 안내</r.WarnTitle>
        <r.Text>
          본 보고서는 서울특별시의 선택 상권분석을 돕기 위해 제공하는
          정보입니다. 소상공인마당 공공데이터에서 수집된 신회할만한 자료 및
          정보로부터 얻어진 것이나 통계적으로 추정된 정보를 이용하여
          작성되었기에 보고서 내용에 대한 정확성이나 완전성을 보장할 수
          없습니다. 본 레포트와 관련된 모든 정보는 최선을 다해 정확하게
          제공하고자 하였으나, 시장 환경의 변화, 정책의 개정, 경제적 조건의 변동
          등 외부 요인에 의해 예고 없이 변경될 수 있습니다. 따라서 본 레포트의
          정보를 기반으로 한 의사결정은 사용자의 신중한 판단 하에 이루어져야
          하며, 이로 인해 발생할 수 있는 직접적, 간접적 손실에 대해서는 당사가
          책임지지 않음을 명시합니다. 또한, 본 레포트는 일반적인 정보 제공을
          목적으로 하며, 어떠한 경우에도 특정 사업의 성공을 보장하거나, 투자
          권유의 의도를 담고 있지 않습니다. 특히, 상권 분석 및 사업 예측에는
          다양한 변수가 작용할 수 있으므로, 본 레포트를 사업 결정의 유일한
          근거로 삼지 말고, 다양한 출처의 정보를 종합적으로 검토하고 전문가의
          조언을 구하는 것을 권장드립니다. 본 경고문을 통해, 사용자께서는 본
          레포트 정보를 활용함에 있어 발생할 수 있는 모든 위험을 인지하고 이에
          동의하는 것으로 간주합니다.
        </r.Text>
      </r.WarningDiv>
    </r.Container>
  )
}

export default ResultIntro
