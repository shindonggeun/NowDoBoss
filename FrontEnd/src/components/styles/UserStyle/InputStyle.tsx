import styled from 'styled-components'

interface EmailSendBtnProps {
  flex?: number
}

export const TextInput = styled.input<EmailSendBtnProps>`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  flex: ${props => (props.flex ? props.flex : '1')};
`

export const PwInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`

interface EmailInputProps {
  flex?: number
}

export const EmailInput = styled.input<EmailInputProps>`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  flex: ${props => (props.flex ? props.flex : '1')};
`
