import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-radius: 5px;
  background-color: #ffffff;

  @media (max-width: 480px) {
    padding: 12px;
  }
`

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3px;
`

export const InfoImage = styled.img`
  width: 18px;
  height: 18px;
`

export const Title = styled.div`
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
  margin-left: 5px;
`

export const Text = styled.div`
  display: flex;
  color: #333;
  font-size: 0.9rem;
`
