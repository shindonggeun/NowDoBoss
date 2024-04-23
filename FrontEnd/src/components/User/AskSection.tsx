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
      <a.Title>{title}</a.Title>
      <a.Subtitle onClick={goPage}>{subtitle}</a.Subtitle>
    </a.Container>
  )
}

export default AskSection
