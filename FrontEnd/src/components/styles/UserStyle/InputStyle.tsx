import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 3%;
`
export const CheckIconWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2%;
`

export const InputTitle = styled.div`
  margin-bottom: 1%;
  font-size: 1rem;
  font-weight: 500;
  color: #333;
`

export const HalfInput = styled.input`
  padding: 0.5rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  flex: 1;

  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`

export const CodeContainer = styled.div`
  margin-top: 1%;
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const EmailFirstRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1%;
`

export const EmailSecondRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1%;
  width: 100%;
`

export const EmailFlex2Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  flex: 2;

  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`

export const EmailFlex1Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  flex: 1;

  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`

export const Btn = styled.div`
  padding: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex: 1;

  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }

  &:active {
    background-color: #e0e0e0;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`

export const ErrMsg = styled.span`
  color: #dc3545;
  font-size: 0.9rem;
  margin-top: 4px;
`
