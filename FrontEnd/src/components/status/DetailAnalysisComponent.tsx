import { DetailDataBody } from '@src/types/StatusType'
import * as c from '@src/components/styles/status/DeatilComponentStyle'
import UpIcon from '@src/assets/top_arrow_up.svg'
import DownIcon from '@src/assets/top_arrow_down.svg'
import ContainerBox from '@src/common/ContainerBox'

interface DetailAnalysisProps {
  props: DetailDataBody
}
const DetailAnalysisComponent = ({ props }: DetailAnalysisProps) => {
  // 행정동 별 매출 top5
  const TopSalesArea = props!.salesDistrictDetail.salesAdministrationTopFiveList

  // 서비스 업종 별 매출 top5
  const TopSalesStore = props!.salesDistrictDetail.salesDistrictSalesTopFiveList

  return (
    <>
      <c.AnalysisTitle>매출 분석</c.AnalysisTitle>
      <c.AnalysisSubTitle>
        가장 많은 매출이 높은 동네는{' '}
        <c.AnalysiEemphasis>
          {TopSalesArea[0].administrationCodeName.replace('?', ',')}
        </c.AnalysiEemphasis>
        이며, 매출 높은 업종은{' '}
        <c.AnalysiEemphasis>
          {TopSalesStore[0].serviceCodeName}
        </c.AnalysiEemphasis>{' '}
        입니다.
        <c.AnalysiEemphasis>{}</c.AnalysiEemphasis>
      </c.AnalysisSubTitle>

      <c.MixConatiner>
        <c.MixInnerConatiner2>
          <c.AnalysisText>매출 높은 동네 Top 5</c.AnalysisText>
          {TopSalesArea.map((list, i) => {
            const name = list.administrationCodeName.replace('?', ',')
            const rate = list.monthSalesChangeRate.toFixed(1)
            const isup = list.monthSalesChangeRate >= 0
            return (
              <c.AnalysisContainer key={list.administrationCode}>
                <c.AnalysisRank>{i + 1}.</c.AnalysisRank>
                <c.AnalysisData>
                  <div>{name}</div>
                  <c.AnalysisDataLeft>
                    <c.AnalysisDataRate isup={isup}>{rate}%</c.AnalysisDataRate>
                    {isup ? (
                      <c.AnalysisDataIcon src={UpIcon} alt="up" />
                    ) : (
                      <c.AnalysisDataIcon src={DownIcon} alt="down" />
                    )}
                  </c.AnalysisDataLeft>
                </c.AnalysisData>
              </c.AnalysisContainer>
            )
          })}
        </c.MixInnerConatiner2>
        <c.MixInnerConatiner2>
          <c.AnalysisText>매출 높은 업종 Top 5</c.AnalysisText>
          {TopSalesStore.map((list, i) => {
            const name = list.serviceCodeName.replace('?', ',')
            const rate = list.monthSalesChangeRate.toFixed(1)
            const isup = list.monthSalesChangeRate >= 0
            return (
              <c.AnalysisContainer key={list.serviceCode}>
                <c.AnalysisRank>{i + 1}.</c.AnalysisRank>
                <c.AnalysisData>
                  <div>{name}</div>
                  <c.AnalysisDataLeft>
                    <c.AnalysisDataRate isup={isup}>{rate}%</c.AnalysisDataRate>
                    {isup ? (
                      <c.AnalysisDataIcon src={UpIcon} alt="up" />
                    ) : (
                      <c.AnalysisDataIcon src={DownIcon} alt="down" />
                    )}
                  </c.AnalysisDataLeft>
                </c.AnalysisData>
              </c.AnalysisContainer>
            )
          })}
        </c.MixInnerConatiner2>
      </c.MixConatiner>
      <ContainerBox height={30} />
    </>
  )
}

export default DetailAnalysisComponent
