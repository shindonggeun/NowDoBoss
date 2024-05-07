import { DetailDataBody } from '@src/types/StatusType'
import BarChart3 from '@src/common/BarChart3'
import * as c from '@src/components/styles/status/DeatilComponentStyle'
import ContainerBox from '@src/common/ContainerBox'

interface DetailStoreNumberProps {
  props: DetailDataBody
}

const DetailStoreNumberComponent = ({ props }: DetailStoreNumberProps) => {
  // console.log(props)
  const StoreData = props!.storeDistrictDetail.storeDistrictTotalTopEightList

  const storeDistrictTotalTopEightList = [
    {
      serviceCode: 'CS300043',
      serviceCodeName: '전자상거래업',
      totalStoreChangeRate: 900000,
    },
    {
      serviceCode: 'CS100001',
      serviceCodeName: '한식음식점',
      totalStoreChangeRate: 800000,
    },
    {
      serviceCode: 'CS200033',
      serviceCodeName: '부동산중개업',
      totalStoreChangeRate: 755668,
    },
    {
      serviceCode: 'CS300011',
      serviceCodeName: '일반의류',
      totalStoreChangeRate: 674334,
    },
    {
      serviceCode: 'CS200028',
      serviceCodeName: '미용실',
      totalStoreChangeRate: 567477,
    },
    {
      serviceCode: 'CS300022',
      serviceCodeName: '화장품',
      totalStoreChangeRate: 456732,
    },
    {
      serviceCode: 'CS100010',
      serviceCodeName: '커피-음료',
      totalStoreChangeRate: 334455,
    },
    {
      serviceCode: 'CS200001',
      serviceCodeName: '일반교습학원',
      totalStoreChangeRate: 221224,
    },
  ]

  const StoreLabels = storeDistrictTotalTopEightList.map(
    item => item.serviceCodeName,
  )
  const StoreValues = storeDistrictTotalTopEightList.map(
    item => item.totalStoreChangeRate,
  )
  return (
    <>
      <c.AnalysisTitle>점포수 분석</c.AnalysisTitle>
      <c.AnalysisSubTitle>
        가장 많은 업종은
        <c.AnalysiEemphasis>{StoreData[0].serviceCodeName}</c.AnalysiEemphasis>
        입니다.
      </c.AnalysisSubTitle>
      <BarChart3 labels={StoreLabels} values={StoreValues} minvalue={0} />
      <ContainerBox height={30} />
    </>
  )
}

export default DetailStoreNumberComponent
