import analysisStore from '@src/stores/analysisStore'
import PieChart3 from '@src/common/PieChart3'
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
  let values = storeCountDataBody.sameStoreInfos.map(info => info.totalStore)

  // values를 내림차순으로 정렬
  values.sort((a, b) => b - a)

  // values 길이가 6보다 크면, 상위 5개와 나머지의 합으로 재구성
  if (values.length > 6) {
    const topFiveValues = values.slice(0, 5)
    const othersSum = values.slice(5).reduce((acc, current) => acc + current, 0)
    values = [...topFiveValues, othersSum]
  }

  // 레이블의 최대 길이를 정하고, 넘어가는 경우 자르고 "..."을 추가하는 함수
  function truncateLabels(labels: string[], maxLength: number) {
    return labels.map(label => {
      if (label.length <= maxLength) return label
      return `${label.substring(0, maxLength)}...`
    })
  }

  // 함수 사용하여 레이블 처리. '기타' 레이블도 추가해야 함
  let labels = truncateLabels(initiallabels, 6)
  if (labels.length > 6) {
    labels = [...labels.slice(0, 5), '기타']
  }

  return (
    <s.TotalChart>
      <s.ChartTitle>선택 상권 총 점포 수</s.ChartTitle>
      <s.ChartSubTitle>
        선택하신 업종 {selectedService.serviceCodeName}과 유사한 업종 점포가{' '}
        <s.HighlightText>{totalStore}개</s.HighlightText> 있어요.
      </s.ChartSubTitle>
      <PieChart3 value={values} labels={labels} />
    </s.TotalChart>
  )
}

export default TotalChart
