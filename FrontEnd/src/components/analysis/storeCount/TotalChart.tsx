import * as s from '@src/components/styles/analysis/StoreCountAnalysisStyle'

const TotalChart = () => {
  return (
    <s.TotalChart>
      <s.ChartTitle>선택 상권 총 점포 수</s.ChartTitle>
      <s.ChartSubTitle>
        선택하신 업종 00000과 유사한 업종 점포가 00개 있어요.
      </s.ChartSubTitle>
    </s.TotalChart>
  )
}

export default TotalChart
