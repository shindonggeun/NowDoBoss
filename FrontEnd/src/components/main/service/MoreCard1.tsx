import * as m from '@src/containers/main/MainContainerStyle'
import Chat from '@src/assets/ChatService.svg'

const MoreCard1 = () => {
  return (
    <m.EctCardContent>
      <m.EctImgIcon src={Chat} alt="Chat" />
      <m.CardTitle>채팅 서비스</m.CardTitle>
      <m.CardSubTitle>
        궁금한 점을 바로 해결하고,
        <br />
        창업에 필요한 정보와 조언을 <br />
        실시간으로 물어볼 수 있어요
      </m.CardSubTitle>
    </m.EctCardContent>
  )
}

export default MoreCard1
