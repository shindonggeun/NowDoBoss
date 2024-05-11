import { TitlePropsType } from '@src/types/ProfileType'
import * as t from '@src/components/styles/profile/TitleStyle'

const Title = (props: TitlePropsType) => {
  const { title } = props

  return <t.Container>{title}</t.Container>
}

export default Title
