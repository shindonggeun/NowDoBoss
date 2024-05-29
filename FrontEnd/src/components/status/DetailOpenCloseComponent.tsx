import DetailOpenRateComponent from '@src/components/status/DetailOpenRateComponent'
import DetailCloseRateComponent from '@src/components/status/DetailCloseRateComponent'
import ContainerBox from '@src/common/ContainerBox'

const DetailOpenCloseComponent = () => {
  return (
    <div>
      <DetailOpenRateComponent />
      <ContainerBox height={10} />
      <DetailCloseRateComponent />
    </div>
  )
}

export default DetailOpenCloseComponent
