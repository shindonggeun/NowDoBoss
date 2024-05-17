import { useNavigate } from 'react-router-dom'
import { AskSectionPropsType } from '@src/types/UserType'
import * as a from '@src/components/styles/UserStyle/AskSectionStyle'

const AskSection = (props: AskSectionPropsType) => {
  const { title, subtitle } = props
  const navigate = useNavigate()
  const goPage = () => {
    if (subtitle === 'Sign up') {
      navigate('/register')
    } else {
      navigate('/login')
    }
  }

  return (
    <a.Container>
      <a.FirstWrap>
        <a.TitleDiv>
          <a.Title>{title}</a.Title>
          <a.Subtitle onClick={goPage}>{subtitle}</a.Subtitle>
        </a.TitleDiv>
        <a.Back onClick={() => navigate(-1)}>Back</a.Back>
      </a.FirstWrap>
      <a.SecondWrap>
        <a.ViewTitle onClick={() => navigate('/')}>
          계정없이 서비스 둘러보기
        </a.ViewTitle>
      </a.SecondWrap>
    </a.Container>
  )
}

export default AskSection
