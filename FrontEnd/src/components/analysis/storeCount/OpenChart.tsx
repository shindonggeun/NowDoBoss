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
        <s.ChartSubTitle>{selectedService.serviceCodeName}의</s.ChartSubTitle>
        <s.ChartSubTitle>개업률은</s.ChartSubTitle>
        <s.ChartSubTitle>
          <s.HighlightText>{openedRate}%</s.HighlightText> 이에요.
        </s.ChartSubTitle>
      </s.ChartSubTitleWrap>
    </s.OpenChart>
  )
}

export default OpenChart
