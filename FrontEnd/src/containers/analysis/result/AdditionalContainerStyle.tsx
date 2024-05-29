import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
`

export const Button = styled.button`
  width: 100%;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  font-family: Helvetica, 'sans-serif';
  transition: all 0.2s;
  padding: 2px 15px;
  border-radius: 100px;
  background: white;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background: white;
  }

  svg {
    width: 30px;
    transition: transform 0.3s ease-in-out;
  }

  &:hover svg {
    transform: translateX(5px);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    padding: 2px 8px;

    svg {
      width: 25px;
    }
  }

  @media (max-width: 576px) {
    font-size: 12px;
    padding: 2px 5px;

    svg {
      width: 22px;
    }
  }
`
