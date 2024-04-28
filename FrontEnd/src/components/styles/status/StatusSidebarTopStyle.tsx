import styled from 'styled-components'

export const Container = styled.div`
  background-color: #0066ff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3rem;
  color: white;
  text-align: center;
  font-weight: 600;
  font-size: 1.2rem;
`

export const Item = styled.div`
  display: flex;
  //justify-content: space-evenly;
  text-align: center;
  border-bottom: 1px solid lightgray;
  font-size: 14px;
  margin: 0.7rem 20%;
`

export const NarrowIcon = styled.img`
  width: 1rem;
  margin: 5px 10px;
  cursor: 'pointer';
`

export const Name = styled.div`
  flex: 1;
  font-weight: 500;
  text-align: left;
`

export const Traffic = styled.div`
  flex: 1;
  text-align: right;
`

export const Percent = styled.div`
  flex: 1;
  text-align: right;
`
