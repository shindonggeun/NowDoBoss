import * as i from '@src/components/styles/UserStyle/InputStyle'

interface InputFieldProps {
  placeholder: string
  flex: number
}

const EmailInput = (props: InputFieldProps) => {
  const { placeholder, flex } = props

  return <i.EmailInput type="email" placeholder={placeholder} flex={flex} />
}

export default EmailInput
