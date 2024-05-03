import styled from 'styled-components'

// 이미지
export const ImgContainer = styled.div`
  margin: 0 -10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  padding: 20px 0;
`

export const ImgLabel = styled.label`
  border-radius: 5px;
`

export const ImgBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid #bababa;
  border-radius: 5px;
  width: 100px;
  height: 100px;
  color: #bababa;
  font-weight: 600;
  margin: 10px;

  .p {
    font-size: 1rem;
    margin-top: 0;
  }
`

export const ImgIcon = styled.img``

export const Plus = styled.div`
  //margin: 20px 0 0;
`

export const ImageInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`
export const ImagePreview = styled.div`
  border-radius: 5px;
  width: 100px;
  height: 100px;
  border: 2px solid #bababa;
  display: flex;
  position: relative;
  margin: 10px;
`

export const Delete = styled.div`
  position: absolute;
  right: -10px;
  top: -10px;
  cursor: pointer;
  width: 20px;
  height: 20px;
  background-color: #bababa;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #bababa;
  border-radius: 50%;
  font-weight: 500;

  &:hover {
    background-color: white;
    color: #bababa;
  }
`
