import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  left: 10%;
  top: 25%;
  z-index: 1;
`

export const Top = styled.button`
  padding: 20px 50px;
  background-color: #fff;
  border: 1px solid rgb(202, 190, 169);
  border-radius: 10px;
  outline: none;
  cursor: pointer;
`

export const MenuItem = styled.div`
  color: #333;
  font-weight: 400;
  font-size: 1rem;
  padding: 5px 0;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    color: #2a65f0;
  }
`
