import styled from 'styled-components'

export const SidebarContainer = styled.div`
  width: 85%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  padding: 20px;
  box-sizing: border-box;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`

export const MenuItem = styled.div`
    font-weight: 500;
    padding: 5px 0;
    border-radius: 5px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #f0f0f0;
        
`
