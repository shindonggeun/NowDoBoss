import styled from 'styled-components'

interface SubmitButtonStyleProps {
  $isAgreed: boolean
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const Title = styled.div`
  word-wrap: break-word;
  word-break: keep-all;
  color: #333;
  font-weight: 600;
  font-size: 1.1rem;
`

export const InfoTextWrap = styled.div`
  margin: 24px 0;
`

export const InfoText = styled.div`
  margin-bottom: 10px;
  font-size: 0.9rem;
  font-weight: 400;
  color: rgb(89, 95, 99);
`

export const AgreeSection = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  margin-bottom: 15px;

  label {
    font-weight: 400;
    font-size: 0.8rem;
  }
`

export const AgreeInput = styled.input`
  margin-right: 5px;
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const SubmitButton = styled.button<SubmitButtonStyleProps>`
  padding: 4px 12px;
  min-width: 49px;
  height: 36px;
  font-size: 0.9rem;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 6px;
  background-color: ${props => (props.$isAgreed ? '#d4e5f9' : '#e0e0e0')};
  color: ${props => (props.$isAgreed ? '#2a7de1' : '#9e9e9e')};
  cursor: ${props => (props.$isAgreed ? 'pointer' : 'not-allowed')};

  &:disabled {
    cursor: not-allowed;
  }
`
