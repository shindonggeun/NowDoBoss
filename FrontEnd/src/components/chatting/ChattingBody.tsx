import * as c from '@src/components/styles/chatting/ChattingBodyStyle'
import { MessageType } from '@src/types/ChattingType'

export type ChattingBodyPropsType = {
  messages: MessageType[]
}

const ChattingBody = (props: ChattingBodyPropsType) => {
  const { messages } = props
  console.log(messages)
  return <c.Container>바디</c.Container>
}

export default ChattingBody
