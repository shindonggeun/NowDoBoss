import * as s from '@src/components/styles/recommend/SearchBarStyle'
import ChoicePlace from '@src/common/ChoicePlace'
import MainButton from '@src/common/MainButton'
import SidebarHeader from '@src/common/SidebarHeader'

type SearchBarPropsType = {
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchBar = (props: SearchBarPropsType) => {
  const { setIsSubmit, isOpen, setIsOpen } = props
  return (
    <s.Container $isOpen={isOpen}>
      <s.Header onClick={() => setIsOpen(!isOpen)}>
        <SidebarHeader
          title="상권 추천받기"
          // subTitle="원하시는 위치의 상권을 추천받을 수 있습니다."
          subTitle=""
          close={false}
          icon={false}
          isOpen={isOpen}
        />
      </s.Header>
      {isOpen && (
        <s.ContentSlide>
          <ChoicePlace />
          <s.Content
            onClick={() => {
              setIsSubmit(true)
            }}
          >
            <MainButton buttonContent="상권 추천받기" />
          </s.Content>
        </s.ContentSlide>
      )}
    </s.Container>
  )
}

export default SearchBar
