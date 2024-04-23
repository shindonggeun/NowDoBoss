import * as i from '@src/components/styles/UserStyle/InputStyle'

interface InputFieldProps {
  placeholder: string
}

const PwInput = (props: InputFieldProps) => {
  const { placeholder } = props

  return <i.PwInput type="password" placeholder={placeholder} />
}

export default PwInput
