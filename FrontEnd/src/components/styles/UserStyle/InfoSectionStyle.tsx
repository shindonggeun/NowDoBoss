import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5%;
`

export const Title = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 0.1rem;
  line-height: normal;

  @media (max-width: 768px) {
    line-height: 1.2;
  }
`

export const Subtitle = styled.div`
  font-size: 0.9rem;
`
