import { DetailDataBody } from '@src/types/StatusType'
import * as c from '@src/components/styles/status/DeatilComponentStyle'
import DoughnutChart2 from '@src/common/DoughnutChart2'
import BarChartCompare from '@src/common/BarChartCompare'
import useStateStore from '@src/stores/statusStore'
import ContainerBox from '@src/common/ContainerBox'

interface DetailOpenRateProps {
  props: DetailDataBody
}

const DetailOpenRateComponent = ({ props }: DetailOpenRateProps) => {
  const { selectedRegion } = useStateStore()

  const OpenData =
    props!.storeDistrictDetail.openedStoreAdministrationTopFiveList
  const OpenLabels = OpenData.map(data => data.administrationCodeName)
  const OpenRate = OpenData.map(data => data.curOpenedRate)

  // 영업개월
  const ChangeData = props!.changeIndicatorDistrictDetail

  return (
    <div>
      <c.MixConatiner>
        <c.MixInnerConatiner>
          <c.AnalysisTitle>개업률 분석</c.AnalysisTitle>
          <c.AnalysisSubTitle>
            개업률이 가장 높은 동은
            <c.AnalysiEemphasis>
              {OpenData[0].administrationCodeName}
            </c.AnalysiEemphasis>
            입니다
          </c.AnalysisSubTitle>
          <ContainerBox height={10} />
          <DoughnutChart2
            labels={OpenLabels}
            value={OpenRate}
            subTextCenter="개업률 1위"
            textCenter={OpenData[0].administrationCodeName}
          />
        </c.MixInnerConatiner>
        <c.MixInnerConatiner>
          <c.AnalysisTitle>평균 영업 영업개월</c.AnalysisTitle>
          <c.AnalysisSubTitle>
            운영 영업개월은 서울시 평균보다
            <c.AnalysiEemphasis>
              {ChangeData.openedMonths > 106 ? ' 높습' : ' 낮습'}
            </c.AnalysiEemphasis>
            니다
          </c.AnalysisSubTitle>
          <ContainerBox height={20} />
          <BarChartCompare
            labels={[selectedRegion!, '서울시']}
            values={[ChangeData.openedMonths, 106]} // 폐업 : 52
            minvalue={0}
          />
          <ContainerBox height={20} />
        </c.MixInnerConatiner>
      </c.MixConatiner>
    </div>
  )
}

export default DetailOpenRateComponent
