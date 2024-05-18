import {
  ChangeIndicatorResponse,
  StoreOpenResponse,
} from '@src/types/StatusType'
import * as c from '@src/components/styles/status/DeatilComponentStyle'
import DoughnutChart2 from '@src/common/DoughnutChart2'
import BarChartCompare from '@src/common/BarChartCompare'
import useStateStore from '@src/stores/statusStore'
import ContainerBox from '@src/common/ContainerBox'
import { useQuery } from '@tanstack/react-query'
import { fetchStatusChangeIndicator, fetchStatusOpen } from '@src/api/statusApi'
import { useEffect } from 'react'

const DetailOpenRateComponent = () => {
  const { selectedRegion, regionCode } = useStateStore()

  // api 호출
  // 개업률
  const {
    data: OpendData,
    isLoading: OpenLoading,
    refetch: OpenRefetch,
  } = useQuery<StoreOpenResponse>({
    queryKey: ['StatusDetailOpen'],
    queryFn: () => fetchStatusOpen(Number(regionCode)),
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
    OpenRefetch()
    IndicatorRefetch()
  }, [OpenRefetch, IndicatorRefetch, regionCode])

  let OpenData
  let OpenLabels
  let OpenRate

  if (OpendData) {
    OpenData = OpendData.dataBody
    OpenLabels = OpenData.map(data => data.administrationCodeName)
    OpenRate = OpenData.map(data => data.curOpenedRate)
  }

  let ChangeData
  if (IndicatorData) {
    ChangeData = IndicatorData.dataBody
  }

  return (
    <div>
      {!OpenLoading && OpendData && !IndicatorLoading && IndicatorData ? (
        <c.MixConatiner>
          <c.MixInnerConatiner>
            <c.AnalysisTitle>개업률 분석</c.AnalysisTitle>
            <c.AnalysisSubTitle>
              개업률이 가장 높은 동은{' '}
              <c.AnalysiEemphasis>
                {OpenData![0].administrationCodeName}
              </c.AnalysiEemphasis>
              입니다
            </c.AnalysisSubTitle>
            <ContainerBox height={10} />
            <DoughnutChart2
              labels={OpenLabels!}
              value={OpenRate!}
              subTextCenter="개업률 1위"
              textCenter={OpenData![0].administrationCodeName}
            />
          </c.MixInnerConatiner>
          <c.MixInnerConatiner>
            <c.AnalysisTitle>평균 운영 영업개월</c.AnalysisTitle>
            <c.AnalysisSubTitle>
              운영 영업개월은 서울시 평균보다
              <c.AnalysiEemphasis>
                {ChangeData!.openedMonths > 106 ? ' 높습' : ' 낮습'}
              </c.AnalysiEemphasis>
              니다
            </c.AnalysisSubTitle>
            <ContainerBox height={20} />
            <BarChartCompare
              labels={[selectedRegion!, '서울시']}
              values={[ChangeData!.openedMonths, 106]} // 폐업 : 52
              minvalue={0}
            />
            <ContainerBox height={20} />
          </c.MixInnerConatiner>
        </c.MixConatiner>
      ) : (
        <div />
      )}
    </div>
  )
}

export default DetailOpenRateComponent
