import { useNavigate } from 'react-router-dom'
import selectPlaceStore from '@src/stores/selectPlaceStore'
import analysisStore from '@src/stores/analysisStore'
import * as t from '@src/components/styles/analysis/result/TopSectionStyle'

const TopSection = () => {
  const navigate = useNavigate()
  const selectedCommercial = selectPlaceStore(state => state.selectedCommercial)
  const selectedService = analysisStore(state => state.selectedService)

  return (
    <t.Container>
      <t.TitleDiv>
        <t.Title>{selectedCommercial.name}</t.Title>
        <t.Divider>|</t.Divider>
        <t.Title>{selectedService.serviceCodeName}</t.Title>
      </t.TitleDiv>
      <div onClick={() => navigate('/analysis')}>닫기버튼</div>
    </t.Container>
  )
}
export default TopSection
