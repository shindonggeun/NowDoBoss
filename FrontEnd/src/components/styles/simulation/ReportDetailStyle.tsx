import styled from 'styled-components'

export const SummaryHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1rem 1.3rem;
  position: relative;

  @media (max-width: 768px) {
    margin: 0 1.3rem;
  }
`

export const HighLight = styled.div`
  display: flex;
  align-items: center;
  width: 7rem;
  background-color: #fdffc7;
  font-size: 1.2rem;
  font-weight: 700;
  padding: 0.2rem 2.5rem;
  position: absolute;
  left: 1rem;
  z-index: 0;

  @media (max-width: 768px) {
    width: 6rem;

    font-size: 1rem;
    padding: 0.2rem 1.7rem;
  }
`

export const SummarySubTitle = styled.div`
  margin: 4rem 3rem 0 0;
  font-size: 0.9rem;
  color: #808080;

  @media (max-width: 768px) {
    margin: 3.2rem 3rem 0 0;
    font-size: 0.8rem;
  }
`

export const LightIcon = styled.img`
  width: 2.5rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    width: 2rem;
  }
`

export const Body = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem 4vw;

  @media (max-width: 768px) {
    margin: 1.2rem 6vw;
  }
`

export const BodyText = styled.div`
  display: flex;
  flex-direction: column;
`

export const TextTitle = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #4c545e;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`

export const TextSubtitle = styled.div`
  font-size: 0.8rem;
  color: #808c9b;
  @media (max-width: 768px) {
    font-size: 0.6rem;
  }
`

export const TextPrice = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1b3fff;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`
