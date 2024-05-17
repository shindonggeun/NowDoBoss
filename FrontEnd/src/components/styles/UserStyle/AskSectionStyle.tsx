import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1%;
  width: 100%;
`

export const FirstWrap = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`

export const TitleDiv = styled.div`
  display: flex;
  width: 85%;
  align-items: center;
`

export const Title = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
`

export const Subtitle = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  margin-left: 1%;
  cursor: pointer;
  color: #333;

  &:hover {
    text-decoration: underline;
  }
`
export const Back = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 15%;
  right: 0;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  color: #333;

  &:hover {
    text-decoration: underline;
  }
`

export const SecondWrap = styled.div`
  display: flex;
`

export const ViewTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  color: #333;

  &:hover {
    text-decoration: underline;
  }
`
