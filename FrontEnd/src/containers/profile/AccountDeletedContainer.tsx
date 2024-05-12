import { useNavigate } from 'react-router-dom'
import * as a from '@src/containers/profile/AccountDeletedContainerStyle'
import SlimLogoImg from '@src/assets/logo_slim.svg'

const AccountDeletedContainer = () => {
  const navigate = useNavigate()

  return (
    <a.Container>
      <a.ImageContainer>
        <img src={SlimLogoImg} alt="logo" />
      </a.ImageContainer>
      <a.Title>회원탈퇴가 완료되었습니다.</a.Title>
      <a.Text>
        <a.HighlightText>NOWDOBOSS</a.HighlightText>를 이용해주셔서 감사합니다.
      </a.Text>
      <a.Text>
        더욱더 노력하고 발전하는 <a.HighlightText>NOWDOBOSS</a.HighlightText>가
        되겠습니다.
      </a.Text>
      <a.Button onClick={() => navigate('/')}>확인</a.Button>
    </a.Container>
  )
}

export default AccountDeletedContainer
