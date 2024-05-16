import * as r from '@src/components/styles/recommend/RecommendReportStyle'
import ThreeBox, { formatKRW } from '@src/common/ThreeBox'
import { RecommendCommercialType } from '@src/types/MapType'
import ThumbUp from '@src/assets/thumbUp.svg'
import RecommendBanner from '@src/components/recommend/RecommendBanner'

type RecommendBodyPropsType = {
  selectedData: RecommendCommercialType
}

const RecommendBody = (props: RecommendBodyPropsType) => {
  const { selectedData } = props
  const roundNumber = (num: number, decimalPlaces: number) => {
    const factor = 10 ** decimalPlaces
    return Math.round(num * factor) / factor
  }

  return (
    <r.Div>
      <r.Summary>
        <r.SummaryHeader>
          <r.LightIcon src={ThumbUp} alt="핵심요약" />
          <r.HighLight>핵심 요약</r.HighLight>
        </r.SummaryHeader>
        <r.SummaryContent>
          <b>{selectedData.commercialCodeName} 상권</b> 은 선택하신 지역에서{' '}
          <br />타 상권 대비 <b>점포 수</b>가{' '}
          <b>
            {' '}
            {formatKRW(
              selectedData.storeCommercialInfo.myStores -
                selectedData.storeCommercialInfo.administrationStores,
            )}
            개 더{' '}
            {selectedData.storeCommercialInfo.myStores -
              selectedData.storeCommercialInfo.administrationStores >
            0
              ? '많'
              : '적'}
            습니다.{' '}
          </b>
          <br />타 상권 대비 <b>유동인구 </b>는{' '}
          <b>
            {formatKRW(
              selectedData.footTrafficCommercialInfo.myFootTraffic -
                selectedData.footTrafficCommercialInfo
                  .administrationFootTraffic,
            )}
            명 더{' '}
            {selectedData.footTrafficCommercialInfo.myFootTraffic -
              selectedData.footTrafficCommercialInfo.administrationFootTraffic >
            0
              ? '많'
              : '적'}
            습니다.{' '}
          </b>
          <br />
          <b>현재 상권 전체 매출 액</b>은{' '}
          <b>
            평균{' '}
            {formatKRW(
              (selectedData.salesCommercialInfo.mySales -
                selectedData.salesCommercialInfo.administrationSales) /
                4,
            )}
            원 더{' '}
            {(selectedData.salesCommercialInfo.mySales -
              selectedData.salesCommercialInfo.administrationSales) /
              4 >
            0
              ? '많'
              : '적'}
            습니다.
          </b>
          <br />
          <b>폐업률</b>은 타 상권 대비{' '}
          <b>
            {
              (roundNumber(
                Number(
                  formatKRW(
                    selectedData.closedRateCommercialInfo.myClosedRate -
                      selectedData.closedRateCommercialInfo
                        .administrationClosedRate,
                  ),
                ),
                2,
              ),
              2)
            }
            % 더{' '}
            {roundNumber(
              selectedData.closedRateCommercialInfo.myClosedRate,
              2,
            ) -
              roundNumber(
                selectedData.closedRateCommercialInfo.administrationClosedRate,
                2,
              ) >
            0
              ? '많'
              : '적'}
            습니다.
          </b>
          <br />
        </r.SummaryContent>
      </r.Summary>
      <RecommendBanner selectedData={selectedData} />
      <r.MainContent>
        <ThreeBox
          MainContent="유동 인구"
          AroundData={
            selectedData.footTrafficCommercialInfo.administrationFootTraffic
          }
          CurrentData={selectedData.footTrafficCommercialInfo.myFootTraffic}
          SeoulData={selectedData.footTrafficCommercialInfo.otherFootTraffic}
          Unit="명"
        />
        <ThreeBox
          MainContent="점포 수"
          AroundData={selectedData.storeCommercialInfo.administrationStores}
          CurrentData={selectedData.storeCommercialInfo.myStores}
          SeoulData={selectedData.storeCommercialInfo.otherStores}
          Unit="개"
        />
        <ThreeBox
          MainContent="폐업률"
          AroundData={roundNumber(
            selectedData.closedRateCommercialInfo.administrationClosedRate,
            2,
          )}
          CurrentData={roundNumber(
            selectedData.closedRateCommercialInfo.myClosedRate,
            2,
          )}
          SeoulData={roundNumber(
            selectedData.closedRateCommercialInfo.otherClosedRate,
            2,
          )}
          Unit="%"
        />
        <ThreeBox
          MainContent="총 매출"
          AroundData={selectedData.salesCommercialInfo.administrationSales / 4}
          CurrentData={selectedData.salesCommercialInfo.mySales / 4}
          SeoulData={selectedData.salesCommercialInfo.otherSales / 4}
          Unit="원"
        />
      </r.MainContent>
    </r.Div>
  )
}

export default RecommendBody
