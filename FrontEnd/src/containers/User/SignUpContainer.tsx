import { useNavigate } from 'react-router-dom'
import InfoSection from '@src/components/User/InfoSection'
import AskSection from '@src/components/User/AskSection'
import SocialLoginContainer from '@src/containers/User/SocialLoginContainer'
import * as u from '@src/containers/User/UserContainerStyle'

const SignUpContainer = () => {
  const navigate = useNavigate()

  return (
    <u.Container>
      <u.LeftWrap>
        <InfoSection
          title="Welecome!"
          subtitle="환영합니다! 회원가입 후 다양한 기능을 이용하세요."
        />
        <SocialLoginContainer state="register" />
        <u.GeneralBtnDiv>
          <u.GeneralBtn onClick={() => navigate('/register/general')}>
            ID/PW 회원가입
          </u.GeneralBtn>
        </u.GeneralBtnDiv>
        <AskSection title="계정이 이미 있으신가요?" subtitle="Log In" />
      </u.LeftWrap>
      <u.RightWrap>
        <u.ImgDiv>
          <img src="/gifs/buildings.gif" alt="img" />
        </u.ImgDiv>
      </u.RightWrap>
    </u.Container>
  )
}

export default SignUpContainer
