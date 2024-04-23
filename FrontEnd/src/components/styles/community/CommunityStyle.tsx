import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
`
export const Context = styled.div`
  display: flex;
  justify-content: space-between;
`
export const LeftGrid = styled.div`
  display: grid;
  height: 15vh;
`
export const Title = styled.div`
  font-weight: 600;
  font-size: 1.7rem;
`
export const Sub = styled.div`
  font-weight: 500;
`

// 생성하기 버튼
export const CreateButton = styled.div`
  background-color: #94a3b8;
  color: #f1f5f9;
  font-weight: 600;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 40px;
  cursor: pointer;

  &:hover {
    background-color: #707d8d;
  }
`

export const ArrowDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80px;
  margin: 10px 0;
`
export const ArrowButton = styled.img`
  cursor: pointer;
`
export const Slick = styled.div``
export const SlickChild = styled.div`
  &:hover {
    margin: -10px 0 0 10px;
    cursor: pointer;
  }
`
export const ChatCard = styled.div`
  border: 2px solid #d9d9d9;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  //-3px -3px 5px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  width: auto;
  height: auto;
  padding: 20px 30px;
  margin: 10px 30px 10px 4px;
  min-height: 175px;
`

export const CategoryBadge = styled.div`
  background-color: #f1f5f9;
  color: #94a3b8;
  border-radius: 5px;
  font-weight: 600;
  font-size: 13px;
  width: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const CardTitle = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  margin: 5px 0;
`

export const CardContent = styled.div`
  font-weight: 500;
  font-size: 16px;
  margin: 5px 0;
`

export const CardCategory = styled.div`
  font-weight: 600;
  color: #696d6e;
  display: flex;
  margin: 5px 0 0 -5px;
`

export const Icon = styled.img`
  scale: 80%;
`

export const CardSubContent = styled.div`
  font-weight: 500;
  color: #696d6e;
  margin: 5px 0;
`
