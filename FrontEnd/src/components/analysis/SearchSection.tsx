import { SearchSectionPropsType } from '@src/types/AnalysisType'
import SidebarHeader from '@src/common/SidebarHeader'
import ChoicePlace from '@src/common/ChoicePlace'
import ChoiceService from '@src/components/ChoiceService'
import MainButton from '@src/common/MainButton'
import * as s from '@src/components/styles/analysis/SearchSectionStyle'

const SearchSection = (props: SearchSectionPropsType) => {
  const { isOpen, setIsOpen } = props

  return (
    <s.Container $isOpen={isOpen}>
      <s.Header onClick={() => setIsOpen(!isOpen)}>
        <SidebarHeader
          title="상권분석"
          subTitle="상권별 단위의 다양한 정보를 조회할 수 있습니다."
          close={false}
          icon={false}
          isOpen={isOpen}
        />
      </s.Header>
      {isOpen && (
        <s.ContentSlide>
          <ChoicePlace />
          <ChoiceService />
          <MainButton buttonContent="상권분석 결과 보기" />
        </s.ContentSlide>
      )}
    </s.Container>
  )
}

export default SearchSection
