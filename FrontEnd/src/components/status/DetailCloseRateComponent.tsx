import {
  ChangeIndicatorResponse,
  StoreCloseResponse,
} from '@src/types/StatusType'
import * as c from '@src/components/styles/status/DeatilComponentStyle'
import DoughnutChart2 from '@src/common/DoughnutChart2'
import BarChartCompare from '@src/common/BarChartCompare'
import useStateStore from '@src/stores/statusStore'
import ContainerBox from '@src/common/ContainerBox'
import { useQuery } from '@tanstack/react-query'
import {
  fetchStatusChangeIndicator,
  fetchStatusClose,
} from '@src/api/statusApi'
import { useEffect } from 'react'

const DetailCloseRateComponent = () => {
  const { selectedRegion, regionCode } = useStateStore()

  // api 호출
  // 개업률
  const {
    data: ClosedData,
    isLoading: CloseLoading,
    refetch: CloseRefetch,
  } = useQuery<StoreCloseResponse>({
    queryKey: ['StatusDetailClose'],
    queryFn: () => fetchStatusClose(Number(regionCode)),
    enabled: !!regionCode,
  })

  // 변화지표
  const {
    data: IndicatorData,
    isLoading: IndicatorLoading,
    refetch: IndicatorRefetch,
  } = useQuery<ChangeIndicatorResponse>({
    queryKey: ['StatusDetailIndicator'],
    queryFn: () => fetchStatusChangeIndicator(Number(regionCode)),
    enabled: !!regionCode,
  })

  useEffect(() => {
    CloseRefetch()
    IndicatorRefetch()
  }, [CloseRefetch, IndicatorRefetch, regionCode])

  let CloseData
  let CloseLabels
  let CloseRate

  if (ClosedData) {
    CloseData = ClosedData.dataBody
    CloseLabels = CloseData.map(data => data.administrationCodeName)
    CloseRate = CloseData.map(data => data.curClosedRate)
  }

  let ChangeData
  if (IndicatorData) {
    ChangeData = IndicatorData.dataBody
  }
  return (
    <div>
      {!CloseLoading && ClosedData && !IndicatorLoading && IndicatorData ? (
        <div>
          <c.MixConatiner>
            <c.MixInnerConatiner>
              <c.AnalysisTitle>폐업률 분석</c.AnalysisTitle>
              <c.AnalysisSubTitle>
                폐업률이 가장 높은 동은{' '}
                <c.AnalysiEemphasis>
                  {CloseData![0].administrationCodeName}
                </c.AnalysiEemphasis>
                입니다
              </c.AnalysisSubTitle>
              <ContainerBox height={10} />
              <DoughnutChart2
                labels={CloseLabels!}
                value={CloseRate!}
                subTextCenter="폐업률 1위"
                textCenter={CloseData![0].administrationCodeName}
              />
            </c.MixInnerConatiner>
            <c.MixInnerConatiner>
              <c.AnalysisTitle>평균 폐업 영업개월</c.AnalysisTitle>
              <c.AnalysisSubTitle>
                폐업 영업개월은 서울시 평균보다
                <c.AnalysiEemphasis>
                  {ChangeData!.closedMonths > 52 ? ' 높습' : ' 낮습'}
                </c.AnalysiEemphasis>
                니다
              </c.AnalysisSubTitle>
              <ContainerBox height={20} />
              <BarChartCompare
                labels={[selectedRegion!, '서울시']}
                values={[ChangeData!.closedMonths, 52]}
                minvalue={0}
              />
              <ContainerBox height={20} />
            </c.MixInnerConatiner>
          </c.MixConatiner>
        </div>
      ) : (
        <div />
      )}
    </div>
  )
}
export default DetailCloseRateComponent
