import { AskSectionPropsType } from '@src/types/UserType'
import * as a from '@src/components/styles/UserStyle/AskSectionStyle'

const AskSection = (props: AskSectionPropsType) => {
  const { title, subtitle } = props

  return (
    <a.Container>
      <a.Title>{title}</a.Title>
      <a.Subtitle>{subtitle}</a.Subtitle>
    </a.Container>
  )
}

export default AskSection
