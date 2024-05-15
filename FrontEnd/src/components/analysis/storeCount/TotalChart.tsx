import analysisStore from '@src/stores/analysisStore'
import HorizontalBarChart from '@src/common/HorizontalBarChart'
import * as s from '@src/components/styles/analysis/StoreCountAnalysisStyle'

const TotalChart = () => {
  const selectedService = analysisStore(state => state.selectedService)
  const storeCountDataBody = analysisStore(state => state.storeCountDataBody)

  const selectedServiceInfo = storeCountDataBody.sameStoreInfos.find(
    info => info.serviceCodeName === selectedService.serviceCodeName,
  ) // 선택한 서비스와 일치하는 객체 찾기
  const totalStore = selectedServiceInfo ? selectedServiceInfo.totalStore : 0 // 선택한 서비스의 totalStore 값

  // 차트 props
  const initiallabels = storeCountDataBody.sameStoreInfos.map(
    info => info.serviceCodeName,
  )
  const values = storeCountDataBody.sameStoreInfos.map(info => info.totalStore)

  // 레이블의 최대 길이를 정하고, 넘어가는 경우 자르고 "..."을 추가하는 함수
  function truncateLabels(labels: string[], maxLength: number) {
    return labels.map(label => {
      // 레이블이 최대 길이보다 짧거나 같으면 그대로 반환
      if (label.length <= maxLength) return label
      // 레이블이 최대 길이보다 길면, 지정된 길이까지 자르고 "..."을 추가
      return `${label.substring(0, maxLength)}...`
    })
  }

  // 함수 사용하여 레이블 처리
  const labels = truncateLabels(initiallabels, 6)

  return (
    <s.TotalChart>
      <s.ChartTitle>선택 상권 총 점포 수</s.ChartTitle>
      <s.ChartSubTitle>
        선택하신 업종 {selectedService.serviceCodeName}과 유사한 업종 점포가{' '}
        <s.HighlightText>{totalStore}개</s.HighlightText> 있어요.
      </s.ChartSubTitle>
      <HorizontalBarChart
        labels={labels}
        values={values}
        datasetsLabel="점포 수(개)"
        aspectRatio={1.7}
        xDisplay={false}
        pluginUnit="개"
      />
    </s.TotalChart>
  )
}

export default TotalChart
