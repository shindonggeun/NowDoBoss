import { TopEightListResponse } from '@src/types/StatusType'
import BarChart4 from '@src/common/BarChart4'
import * as c from '@src/components/styles/status/DeatilComponentStyle'
import ContainerBox from '@src/common/ContainerBox'
import useStateStore from '@src/stores/statusStore'
import { useQuery } from '@tanstack/react-query'
import { fetchStatusStore } from '@src/api/statusApi'
import { useEffect } from 'react'

const DetailStoreNumberComponent = () => {
  const { regionCode } = useStateStore()

  // api 호출
  const { data, isLoading, refetch } = useQuery<TopEightListResponse>({
    queryKey: ['StatusDetailStore'],
    queryFn: () => fetchStatusStore(Number(regionCode)),
    enabled: !!regionCode,
  })

  useEffect(() => {
    refetch()
  }, [refetch, regionCode])

  let StoreData
  let StoreLabels
  let StoreValues

  if (data) {
    StoreData = data.dataBody
    StoreLabels = StoreData.map(item => item.serviceCodeName)
    StoreValues = StoreData.map(item => item.totalStore)
  }

  return (
    <>
      {!isLoading && data ? (
        <div>
          <c.AnalysisTitle>점포수 분석</c.AnalysisTitle>
          <c.AnalysisSubTitle>
            가장 많은 업종은
            <c.AnalysiEemphasis>
              {StoreData![0].serviceCodeName}
            </c.AnalysiEemphasis>
            입니다.
          </c.AnalysisSubTitle>
          <BarChart4
            labels={[
              'Top1',
              'Top2',
              'Top3',
              'Top4',
              'Top5',
              'Top6',
              'Top7',
              'Top8',
            ]}
            values={StoreValues!}
            infos={StoreLabels!}
            dataLavel="점포수(개)"
          />
          <ContainerBox height={30} />
        </div>
      ) : (
        <div />
      )}
    </>
  )
}

export default DetailStoreNumberComponent
