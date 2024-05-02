import analysisStore from '@src/stores/analysisStore'
import HalfDoughnutChart from '@src/common/HalfDoughnutChart'
import * as s from '@src/components/styles/analysis/StoreCountAnalysisStyle'

const FranchiseChart = () => {
  const selectedService = analysisStore(state => state.selectedService)

  const labels = ['프랜차이즈', '일반']
  const values = [3, 8]

  return (
    <s.FranchiseChart>
      <s.ChartTitle>프랜차이즈 점포 수</s.ChartTitle>
      <s.ChartSubTitleWrap>
        <s.ChartSubTitle>{selectedService.serviceCodeName}의</s.ChartSubTitle>
        <s.ChartSubTitle>프랜차이즈 점포는</s.ChartSubTitle>
        <s.ChartSubTitle>00개 있어요.</s.ChartSubTitle>
      </s.ChartSubTitleWrap>
      <HalfDoughnutChart labels={labels} values={values} />
    </s.FranchiseChart>
  )
}

export default FranchiseChart
