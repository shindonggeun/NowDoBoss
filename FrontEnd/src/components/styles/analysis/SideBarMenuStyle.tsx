import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  left: 10%;
  top: 25%;
  z-index: 1;
  //
  //@media (max-width: 1480px) {
  //  left: 8%;
  //}

  @media (max-width: 992px) {
    display: none;
  }
`

export const Top = styled.button`
  padding: 20px 60px 20px 10px;
  height: auto;
  background-color: #fff;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  border: 2px solid #2a65f0; /* 파란색 테두리 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 파란색 계열의 그림자 */

  @media (max-width: 1245px) {
    padding: 20px 50px 20px 10px;
  }

  @media (max-width: 1110px) {
    padding: 15px 40px 15px 10px;
  }
`

export const MenuItem = styled.div`
  color: #333;
  font-weight: 400;
  font-size: 1rem;
  padding: 7px 0;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    color: #2a65f0;
  }
`
