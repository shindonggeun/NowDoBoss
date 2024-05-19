import * as m from '@src/containers/main/MainContainerStyle'
import Commu from '@src/assets/CommuService.svg'

const MoreCard2 = () => {
  return (
    <m.EctCardContent>
      <m.EctImgIcon src={Commu} alt="Chat" />
      <m.CardTitle>커뮤니티</m.CardTitle>
      <m.CardSubTitle>
        같은 관심사를 가진 사람들을 <br />
        커뮤니티에서 만나보세요
      </m.CardSubTitle>
    </m.EctCardContent>
  )
}

export default MoreCard2
