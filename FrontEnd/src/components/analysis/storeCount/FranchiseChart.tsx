import analysisStore from '@src/stores/analysisStore'
import HalfDoughnutChart from '@src/common/HalfDoughnutChart'
import * as s from '@src/components/styles/analysis/StoreCountAnalysisStyle'

const FranchiseChart = () => {
  const selectedService = analysisStore(state => state.selectedService)
  const storeCountDataBody = analysisStore(state => state.storeCountDataBody)

  const { normalStore, franchiseeStore } =
    storeCountDataBody.franchiseeStoreInfo

  // 차트 props
  const labels = ['일반', '프랜차이즈']
  const values = [normalStore, franchiseeStore]

  return (
    <s.FranchiseChart>
      <s.ChartTitle>프랜차이즈 점포 수</s.ChartTitle>
      <s.ChartSubTitleWrap>
        <s.ChartSubTitle>{selectedService.serviceCodeName}의</s.ChartSubTitle>
        <s.ChartSubTitle>프랜차이즈 점포는</s.ChartSubTitle>
        <s.ChartSubTitle>
          <s.HighlightText>{franchiseeStore}개</s.HighlightText> 있어요.
        </s.ChartSubTitle>
      </s.ChartSubTitleWrap>
      <HalfDoughnutChart labels={labels} values={values} />
    </s.FranchiseChart>
  )
}

export default FranchiseChart
