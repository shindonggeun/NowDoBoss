import InfoSection from '@src/components/User/InfoSection'
import AskSection from '@src/components/User/AskSection'
import SocialBtnSection from '@src/components/User/SocialBtnSection'
import TextInput from '@src/components/User/TextInput'
import PwInput from '@src/components/User/PwInput'
import EmailInput from '@src/components/User/EmailInput'
import * as u from '@src/containers/User/UserContainerStyle'

const SignUpContainer = () => {
  return (
    <u.Container>
      <u.LeftWrap>
        <InfoSection
          title="Welecome!"
          subtitle="환영합니다! 회원가입 후 다양한 기능을 이용하세요."
        />
        <u.FirstSection>
          <u.InputDiv>
            <div>Name</div>
            <TextInput placeholder="Your name" flex={1} />
          </u.InputDiv>
          <u.InputDiv>
            <div>Nickname</div>
            <TextInput placeholder="Your nickname" flex={1} />
          </u.InputDiv>
        </u.FirstSection>

        <u.EmailSection>
          <div>Email</div>
          <u.EmailFirstRow>
            <EmailInput placeholder="example@example.com" flex={2} />
            <u.Btn flex={1}>인증번호 전송</u.Btn>
          </u.EmailFirstRow>
          <u.EmailSecondRow>
            <TextInput placeholder="000000" flex={1} />
            <u.Btn flex={1}>인증번호 확인 3:00</u.Btn>
          </u.EmailSecondRow>
        </u.EmailSection>

        <u.FirstSection>
          <u.InputDiv>
            <div>Password</div>
            <PwInput placeholder="Your password" />
          </u.InputDiv>
          <u.InputDiv>
            <div>Repeat password</div>
            <PwInput placeholder="Repeat" />
          </u.InputDiv>
        </u.FirstSection>

        <u.Btn marginTop="6%">Sign Up</u.Btn>
        <AskSection title="계정이 이미 있으신가요?" subtitle="Log In" />
        <SocialBtnSection />
      </u.LeftWrap>
      <u.RightWrap />
    </u.Container>
  )
}

export default SignUpContainer
