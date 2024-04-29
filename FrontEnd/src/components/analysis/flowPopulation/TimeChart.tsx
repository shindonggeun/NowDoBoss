import analysisStore from '@src/stores/analysisStore'
import AreaChart from '@src/common/AreaChart'

const TimeChart = () => {
  const { flowPopulationDataBody } = analysisStore()

  const labels = [
    '00~06시',
    '06~09시',
    '09~12시',
    '12~15시',
    '15~18시',
    '18~21시',
    '21~24시',
  ]

  const values = Object.values(flowPopulationDataBody.timeSlotFootTraffic)

  return (
    <>
      <div>시간대별 유동인구</div>
      <div>17 ~21시 유동인구가 가장 높아요.</div>
      <div>
        17 ~ 21시 유동인구가 가장 높습니다. 오후와 저녁시간대가 활발한
        상권입니다.
      </div>
      <AreaChart labels={labels} values={values} />
    </>
  )
}

export default TimeChart
