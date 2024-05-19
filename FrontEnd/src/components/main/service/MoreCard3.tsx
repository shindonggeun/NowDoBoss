import * as m from '@src/containers/main/MainContainerStyle'
import Share from '@src/assets/ShareService.svg'

const MoreCard3 = () => {
  return (
    <m.EctCardContent>
      <m.EctImgIcon src={Share} alt="Chat" />
      <m.CardTitle>공유하기</m.CardTitle>
      <m.CardSubTitle>
        전문적인 분석 결과를 진단받고 <br />
        쉽게 공유할 수 있어요
      </m.CardSubTitle>
    </m.EctCardContent>
  )
}

export default MoreCard3
