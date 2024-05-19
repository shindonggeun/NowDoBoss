import * as r from '@src/components/styles/recommend/RecommendReportStyle'
// import BarChart from '@src/common/BarChart'
import { RecommendCommercialType } from '@src/types/MapType'
import BarChart from '@src/common/BarChart'

type RecommendBlueOceanPropsType = {
  selectedData: RecommendCommercialType
}
const RecommendBlueOcean = (props: RecommendBlueOceanPropsType) => {
  const { selectedData } = props

  return (
    <r.Div>
      <r.BlueOcean>
        <r.BlueOceanTitle>블루오션</r.BlueOceanTitle>
        <r.SubContent>
          주변 상권에는 많지만 해당 상권에 적은 업종을 제안합니다.
        </r.SubContent>
      </r.BlueOcean>
      <r.Chart>
        {selectedData.blueOceanInfo[1] && (
          <BarChart blueOceanInfo={selectedData.blueOceanInfo} />
        )}
      </r.Chart>
      <r.CountDiv>
        {selectedData.blueOceanInfo[1] &&
          selectedData.blueOceanInfo.map(
            (blueOcean: {
              serviceCodeName: string
              myStore: number
              totalStore: number
              storeRate: number
            }) => {
              return (
                <r.Blue key={blueOcean.serviceCodeName}>
                  {parseFloat(blueOcean.storeRate.toFixed(1))}%
                </r.Blue>
              )
            },
          )}
      </r.CountDiv>
    </r.Div>
  )
}

export default RecommendBlueOcean
