import { DetailDataBody } from '@src/types/StatusType'
import BarChart4 from '@src/common/BarChart4'
import * as c from '@src/components/styles/status/DeatilComponentStyle'
import ContainerBox from '@src/common/ContainerBox'

interface DetailStoreNumberProps {
  props: DetailDataBody
}

const DetailStoreNumberComponent = ({ props }: DetailStoreNumberProps) => {
  const StoreData = props!.storeDistrictDetail.storeDistrictTotalTopEightList

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
        values={StoreValues}
        infos={StoreLabels}
        dataLavel="점포수(개)"
      />
      <ContainerBox height={30} />
    </>
  )
}

export default DetailStoreNumberComponent
