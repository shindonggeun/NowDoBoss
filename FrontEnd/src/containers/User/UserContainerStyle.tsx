import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 5%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const LeftWrap = styled.div`
  flex: 1;
  padding: 5%;
`

export const RightWrap = styled.div`
  flex: 1;
  background-color: #888888;

  @media (max-width: 768px) {
    display: none;
  }
`
export const RowSection = styled.div`
  margin-top: 3%;
  display: flex;
  flex-direction: row;
  gap: 1%;
  width: 100%;
`

export const EmailSection = styled.div`
  margin-top: 3%;
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const EmailCodeSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1%;
  width: 100%;
  margin-top: 1%;
`

export const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`
export const Label = styled.label`
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 1%;
`
export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`

export const InputButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1%;
`

export const EmailInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  flex: 2;
`

export const EmailSendBtn = styled.div`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const EmailCodeInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  flex: 1;
`

export const EmailCheckBtn = styled.div`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
