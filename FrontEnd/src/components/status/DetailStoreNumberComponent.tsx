import { DetailDataBody } from '@src/types/StatusType'
import BarChart3 from '@src/common/BarChart3'
import * as c from '@src/components/styles/status/DeatilComponentStyle'
import ContainerBox from '@src/common/ContainerBox'

interface DetailStoreNumberProps {
  props: DetailDataBody
}

const DetailStoreNumberComponent = ({ props }: DetailStoreNumberProps) => {
  const StoreData = props!.storeDistrictDetail.storeDistrictTotalTopEightList
  console.log(props!.storeDistrictDetail)

  const StoreLabels = StoreData.map(item => item.serviceCodeName)
  const StoreValues = StoreData.map(item => item.totalStore)
  return (
    <>
      <c.AnalysisTitle>점포수 분석</c.AnalysisTitle>
      <c.AnalysisSubTitle>
        가장 많은 업종은
        <c.AnalysiEemphasis>{StoreData[0].serviceCodeName}</c.AnalysiEemphasis>
        입니다.
      </c.AnalysisSubTitle>
      <BarChart3
        labels={StoreLabels}
        values={StoreValues}
        minvalue={0}
        dataLavel="점포수(개)"
      />
      <ContainerBox height={30} />
    </>
  )
}

export default DetailStoreNumberComponent
