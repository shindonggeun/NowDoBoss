import { DetailDataBody } from '@src/types/StatusType'
import useStateStore from '@src/stores/statusStore'

interface DetailCommercialProps {
  props: DetailDataBody
}
const DetailCommercialComponent = ({ props }: DetailCommercialProps) => {
  const { selectedRegion } = useStateStore()
  return (
    <>
      <div>
        {selectedRegion}의 상권변화는
        {props!.changeIndicatorDistrictDetail.changeIndicatorName}입니다.
      </div>
      <p>상권변화입니당</p>
      <p>상권변화입니당</p>
      <p>상권변화입니당</p>
      <p>상권변화입니당</p>
      <p>상권변화입니당</p>
      <p>상권변화입니당</p>
      <p>상권변화입니당</p>
    </>
  )
}

export default DetailCommercialComponent
