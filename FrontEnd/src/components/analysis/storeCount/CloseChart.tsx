import analysisStore from '@src/stores/analysisStore'
import * as s from '@src/components/styles/analysis/result/StoreCountAnalysisStyle'

const CloseChart = () => {
  const selectedService = analysisStore(state => state.selectedService)
  const storeCountDataBody = analysisStore(state => state.storeCountDataBody)

  const { closedRate } = storeCountDataBody.openAndCloseStoreInfo

  return (
    <s.CloseChart>
      <s.ChartTitle>폐업률</s.ChartTitle>
      <s.ChartSubTitleWrap>
        <s.InfoText>{selectedService.serviceCodeName}의</s.InfoText>
        <s.InfoText>폐업률은</s.InfoText>
        <s.InfoText>
          <s.HighlightText>{closedRate}%</s.HighlightText> 이에요.
        </s.InfoText>
      </s.ChartSubTitleWrap>
    </s.CloseChart>
  )
}

export default CloseChart
