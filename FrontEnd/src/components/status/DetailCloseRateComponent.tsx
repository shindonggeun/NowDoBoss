import { DetailDataBody } from '@src/types/StatusType.ts'

interface DetailCloseRate {
  props: DetailDataBody | undefined
}

const DetailCloseRateComponent = ({ props }: DetailCloseRate) => {
  console.log(props)
  return (
    <>
      <h1>폐업률 페이지</h1>
      <p>폐업률1234</p>
      <p>폐업률1234</p>
      <p>폐업률1234</p>
      <p>폐업률1234</p>
      <p>폐업률1234</p>
      <p>폐업률1234</p>
      <p>폐업률1234</p>
      <p>폐업률1234</p>
      <p>폐업률1234</p>
    </>
  )
}

export default DetailCloseRateComponent
