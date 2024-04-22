import { InfoSectionPropsType } from '@src/types/UserType'
import * as i from '@src/components/styles/UserStyle/InfoSectionStyle'

const InfoSection = (props: InfoSectionPropsType) => {
  const { title, subtitle } = props

  return (
    <i.Container>
      <i.Title>{title}</i.Title>
      <i.Subtitle>{subtitle}</i.Subtitle>
    </i.Container>
  )
}

export default InfoSection
