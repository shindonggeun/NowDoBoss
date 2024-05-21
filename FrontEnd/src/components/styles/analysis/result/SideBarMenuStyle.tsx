import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    flex-direction: row;
  }
`

export const MenuItem = styled.div`
  color: #ffffff;
  font-weight: 400;
  font-size: 1rem;
  padding: 12px 16px;
  border-radius: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    color: #2a65f0;
  }
`
