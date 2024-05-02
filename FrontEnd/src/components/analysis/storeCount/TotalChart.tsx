import analysisStore from '@src/stores/analysisStore'
// import HorizontalBarChart from '@src/common/ HorizontalBarChart'
import * as s from '@src/components/styles/analysis/StoreCountAnalysisStyle'

const TotalChart = () => {
  const selectedService = analysisStore(state => state.selectedService)

  // const labels = [
  //   '한식음식점',
  //   '중식음식점',
  //   '일식음식점',
  //   '양식음식점',
  //   '치킨전문점',
  //   '분식전문점',
  //   '호프-간이주점',
  //   '커피-음료',
  //   '제과점',
  //   '패스트푸드점',
  // ]
  // const values = [12, 23, 124, 63, 103, 0, 26, 70, 2, 400] // 숫자로 변경
  // const maxValue = Math.max(...values) // 최대값 찾기

  return (
    <s.TotalChart>
      <s.ChartTitle>선택 상권 총 점포 수</s.ChartTitle>
      <s.ChartSubTitle>
        선택하신 업종 {selectedService.serviceCodeName}과 유사한 업종 점포가
        00개 있어요.
      </s.ChartSubTitle>
      {/* <s.HorizontalChart> */}
      {/*  {labels.map((label, index) => ( */}
      {/*    <s.BarContainer key={label}> */}
      {/*      <s.Label>{label}</s.Label> */}
      {/*      <s.BarWrapper> */}
      {/*        <s.Bar */}
      {/*          style={{ width: `${(values[index] / maxValue) * 100}%` }} */}
      {/*        /> */}
      {/*      </s.BarWrapper> */}
      {/*    </s.BarContainer> */}
      {/*  ))} */}
      {/* </s.HorizontalChart> */}
    </s.TotalChart>
  )
}

export default TotalChart
