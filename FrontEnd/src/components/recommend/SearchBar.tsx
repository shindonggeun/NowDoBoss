import * as s from '@src/components/styles/recommend/SearchBarStyle'
import ChoicePlace from '@src/common/ChoicePlace'
import MainButton from '@src/common/MainButton'
import SidebarHeader from '@src/common/SidebarHeader'
import NotLogin from '@src/common/swal/NotLogin'
import { useNavigate } from 'react-router-dom'
import { DistrictType } from '@src/stores/selectPlaceStore'
import { useEffect, useState } from 'react'

type SearchBarPropsType = {
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  selectedGoo: DistrictType
}

const SearchBar = (props: SearchBarPropsType) => {
  const { setIsSubmit, isOpen, setIsOpen, selectedGoo } = props
  const navigate = useNavigate()

  // 로그인 한 사용자인지 확인
  const userLoggedIn = localStorage.getItem('isLogIn') === 'true'

  // 로그인 안되어 있으면 로그인 페이지로 보내기
  const onClickSubmit = () => {
    if (userLoggedIn) {
      setIsSubmit(true)
      setIsOpen(true)
    } else {
      NotLogin(navigate)
    }
  }

  const [isSelect, setIsSelect] = useState<boolean>(false)
  useEffect(() => {
    if (selectedGoo.code) {
      setIsSelect(true)
    } else {
      setIsSelect(false)
    }
  }, [selectedGoo])

  return (
    <s.Container $isOpen={isOpen}>
      <s.Header onClick={() => setIsOpen(!isOpen)}>
        <SidebarHeader
          title="상권추천"
          subTitle="원하시는 위치의 상권을 추천받을 수 있습니다."
          // subTitle=""
          close={false}
          icon={false}
          isOpen={isOpen}
        />
      </s.Header>
      {isOpen && (
        <s.ContentSlide>
          <ChoicePlace />
          <s.Content onClick={onClickSubmit} $isSelect={isSelect}>
            <MainButton buttonContent="상권 추천받기" />
          </s.Content>
        </s.ContentSlide>
      )}
    </s.Container>
  )
}

export default SearchBar
