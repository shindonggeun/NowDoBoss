import * as w from '@src/components/styles/analysis/WarningBoxStyle'

const WarningBox = () => {
  return (
    <w.Container>
      <w.TitleContainer>
        <w.InfoImage src="/icons/info.png" alt="" />
        <w.Title>먼저 읽어주세요</w.Title>
      </w.TitleContainer>
      <w.Text>
        본 보고서는 서울특별시의 선택 상권분석을 돕기 위해 제공하는 정보입니다.
        소상공인마당 공공데이터에서 수집된 신회할만한 자료 및 정보로부터 얻어진
        것이나 통계적으로 추정된 정보를 이용하여 작성되었기에 보고서 내용에 대한
        정확성이나 완전성을 보장할 수 없습니다. 따라서 본 레포트의 정보를
        기반으로 한 의사결정은 사용자의 신중한 판단 하에 이루어져야 하며, 이로
        인해 발생할 수 있는 직접적, 간접적 손실에 대해서는 당사가 책임지지
        않음을 명시합니다. 또한, 본 레포트는 일반적인 정보 제공을 목적으로 하며,
        어떠한 경우에도 특정 사업의 성공을 보장하거나, 투자 권유의 의도를 담고
        있지 않습니다.
      </w.Text>
    </w.Container>
  )
}

export default WarningBox
