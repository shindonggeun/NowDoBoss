import styled from 'styled-components'

export const Container = styled.div`
  background-color: #0066ff;
  color: white;
  text-align: center;
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Item = styled.div`
  display: flex;
  width: 100%;
  text-align: center;
  border-bottom: 1px solid lightgray;
  margin: 0.5rem 4rem;
`

export const Name = styled.div`
  flex: 2;
  text-align: left;
`

export const Num = styled.div`
  flex: 1;
  text-align: right;
`

export const Percent = styled.div`
  flex: 1;
  text-align: right;
`
