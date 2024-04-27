import * as s from '@src/components/styles/recommend/SearchBarStyle'
import ChoicePlace from '@src/common/ChoicePlace'
import MainButton from '@src/common/MainButton'

type SearchBarPropsType = {
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchBar = (props: SearchBarPropsType) => {
  const { setIsSubmit } = props
  return (
    <s.Container>
      <s.Header>
        상권 추천받기
        <s.SubTitle>원하시는 위치의 상권을 추천받을 수 있습니다.</s.SubTitle>
      </s.Header>
      <ChoicePlace />
      <s.Content
        onClick={() => {
          setIsSubmit(true)
        }}
      >
        <MainButton buttonContent="상권 추천받기" />
      </s.Content>
    </s.Container>
  )
}

export default SearchBar
