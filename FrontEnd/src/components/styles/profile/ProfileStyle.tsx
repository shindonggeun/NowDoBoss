import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  height: auto;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const Img = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`

export const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding-left: 10px;

  @media (max-width: 768px) {
    padding-left: 0;
    padding-top: 20px;
  }
`

export const EmailDiv = styled.div`
  display: flex;
  align-items: center;
`

export const Name = styled.div`
  font-size: 1rem;
  font-weight: 500;
`

export const Email = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
`

export const Provider = styled.img`
  margin-left: 5px;
  width: 16px;
  height: 16px;
  border-radius: 100%;
`
