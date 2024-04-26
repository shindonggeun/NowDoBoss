import styled from 'styled-components'
import GoogleBtnSmallImage from 'src/assets/GoogleBtnSmall.png'
import NaverBtnSmallImage from 'src/assets/NaverBtnSmall.png'
import KakaoBtnSmallImage from 'src/assets/KakaoBtnSmall.png'
import GoogleBtnImage from 'src/assets/GoogleBtn.png'
import NaverBtnImage from 'src/assets/NaverBtn.png'
import KakaoBtnImage from 'src/assets/KakaoBtn.png'

export const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const OrTextSmallWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 16px 0;
`

export const OrText = styled.span`
  font-size: 14px;
  margin: 0 16px;
`

export const Separator = styled.div`
  flex-grow: 1;
  height: 1px;
  background-color: #ccc;
`

export const SmallButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`

export const GoogleBtnSmall = styled.img.attrs({
  src: GoogleBtnSmallImage,
})`
    width: 11%;
    height: auto;
    min-width: 45px; /* 최소 너비 설정 */
    cursor: pointer;

    &:hover {
        filter: brightness(0.9);
    }

    &:active {
        transform: translateY(2px);
    }

    @media (max-width: 350px) {
        width: 19%;
        min-width: 30px;
`

export const NaverBtnSmall = styled.img.attrs({
  src: NaverBtnSmallImage,
})`
    width: 11%;
    height: auto;
    min-width: 45px; /* 최소 너비 설정 */
    cursor: pointer;

    &:hover {
        filter: brightness(0.9);
    }

    &:active {
        transform: translateY(2px);
    }

    @media (max-width: 350px) {
        width: 19%;
        min-width: 30px;
`

export const KakaoBtnSmall = styled.img.attrs({
  src: KakaoBtnSmallImage,
})`
    width: 11%;
    height: auto;
    min-width: 45px; /* 최소 너비 설정 */
    cursor: pointer;

    &:hover {
        filter: brightness(0.9);
    }

    &:active {
        transform: translateY(2px);
    }

    @media (max-width: 350px) {
        width: 19%;
        min-width: 30px;
`

export const TopSeparator = styled.div`
  width: 100%;
  flex-grow: 1;
  height: 1px;
  border-bottom: 2px dotted #ccc;
  margin-bottom: 32px;
`

export const OrTextWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 32px 0;
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-direction: column;
  align-items: center;
  @media (max-width: 350px) {
    gap: 10px;
  }
`

export const GoogleBtn = styled.img.attrs({
  src: GoogleBtnImage,
})`
  width: 60%;
  height: auto;
  min-width: 300px; /* 최소 너비 설정 */
  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }

  &:active {
    transform: translateY(2px);
  }

  @media (max-width: 350px) {
    width: 80%;
    min-width: 30px;
  }
`

export const NaverBtn = styled.img.attrs({
  src: NaverBtnImage,
})`
  width: 60%;
  height: auto;
  min-width: 300px; /* 최소 너비 설정 */
  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }

  &:active {
    transform: translateY(2px);
  }

  @media (max-width: 350px) {
    width: 80%;
    min-width: 30px;
  }
`

export const KakaoBtn = styled.img.attrs({
  src: KakaoBtnImage,
})`
  width: 60%;
  height: auto;
  min-width: 300px; /* 최소 너비 설정 */
  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }

  &:active {
    transform: translateY(2px);
  }

  @media (max-width: 350px) {
    width: 80%;
    min-width: 30px;
  }
`
