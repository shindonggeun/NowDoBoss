import { SearchSectionPropsType } from '@src/types/AnalysisType'
import selectPlaceStore from '@src/stores/selectPlaceStore'
import analysisStore from '@src/stores/analysisStore'
import SidebarHeader from '@src/common/SidebarHeader'
import ChoicePlace from '@src/common/ChoicePlace'
import ChoiceService from '@src/components/analysis/ChoiceService'
import MainButton from '@src/common/MainButton'
import * as s from '@src/components/styles/analysis/SearchSectionStyle'

const SearchSection = (props: SearchSectionPropsType) => {
  const { isOpen, setIsOpen, handleResultButtonClick } = props
  const selectedGoo = selectPlaceStore(state => state.selectedGoo)
  const selectedDong = selectPlaceStore(state => state.selectedDong)
  const selectedCommercial = selectPlaceStore(state => state.selectedCommercial)
  const selectedService = analysisStore(state => state.selectedService)

  // 상권분석 결과 보기 버튼 disabled 조건
  const isSelectionComplete =
    selectedGoo.code !== 0 &&
    selectedDong.code !== 0 &&
    selectedCommercial.code !== 0 &&
    selectedService.serviceCode !== ''

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
          {selectedCommercial.code !== 0 && <ChoiceService />}
          <s.BtnContainer
            onClick={handleResultButtonClick}
            disabled={!isSelectionComplete}
          >
            <MainButton buttonContent="상권분석 결과 보기" />
          </s.BtnContainer>
        </s.ContentSlide>
      )}
    </s.Container>
  )
}

export default SearchSection
