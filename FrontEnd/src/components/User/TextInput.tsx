import * as i from '@src/components/styles/UserStyle/InputStyle'

interface InputFieldProps {
  placeholder: string
  flex: number
}

const TextInput = (props: InputFieldProps) => {
  const { placeholder, flex } = props

  return <i.TextInput type="text" placeholder={placeholder} flex={flex} />
}

export default TextInput
