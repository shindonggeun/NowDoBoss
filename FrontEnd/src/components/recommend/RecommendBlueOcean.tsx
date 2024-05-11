import * as r from '@src/components/styles/recommend/RecommendReportStyle'
// import BarChart from '@src/common/BarChart'
import { RecommendCommercialType } from '@src/types/MapType'
import BarChart from '@src/common/BarChart'

type RecommendBlueOceanPropsType = {
  selectedData: RecommendCommercialType
}
const RecommendBlueOcean = (props: RecommendBlueOceanPropsType) => {
  const { selectedData } = props

  // 배열 내림차순으로 정렬
  const blueOceanArray = Object.entries(selectedData.blueOceanInfo)
    .map(([name, count]) => ({
      name,
      count: parseFloat(count.toFixed(1)), // count 값을 소수점 첫째 자리까지 반올림
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  return (
    <r.Div>
      <r.BlueOcean>
        <r.BlueOceanTitle>블루오션</r.BlueOceanTitle>
        <r.SubContent>
          주변 상권에는 많지만 해당 상권에 적은 업종을 제안합니다.
        </r.SubContent>
      </r.BlueOcean>
      <r.Chart>
        {blueOceanArray[1] && <BarChart blueOceanArray={blueOceanArray} />}
      </r.Chart>
      <r.CountDiv>
        {blueOceanArray[1] &&
          blueOceanArray.map(blueOcean => {
            return <r.Blue key={blueOcean.name}>{blueOcean.count}%</r.Blue>
          })}
      </r.CountDiv>
    </r.Div>
  )
}

export default RecommendBlueOcean
