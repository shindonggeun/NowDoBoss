import analysisStore from '@src/stores/analysisStore'
import * as s from '@src/components/styles/analysis/result/StoreCountAnalysisStyle'

const OpenChart = () => {
  const selectedService = analysisStore(state => state.selectedService)
  const storeCountDataBody = analysisStore(state => state.storeCountDataBody)

  const { openedRate } = storeCountDataBody.openAndCloseStoreInfo

  return (
    <s.OpenChart>
      <s.ChartTitle>개업률</s.ChartTitle>
      <s.ChartSubTitleWrap>
        <s.InfoText>{selectedService.serviceCodeName}의</s.InfoText>
        <s.InfoText>개업률은</s.InfoText>
        <s.InfoText>
          <s.HighlightText>{openedRate}%</s.HighlightText> 이에요.
        </s.InfoText>
      </s.ChartSubTitleWrap>
    </s.OpenChart>
  )
}

export default OpenChart
