import { useEffect, useRef, useState } from 'react'
import * as r from '@src/containers/recommend/RecommendContainerStyle'
import KakaoMap from '@src/common/KakaoMap'
import SearchBar from '@src/components/recommend/SearchBar'
import RecommendReport from '@src/components/recommend/RecommendReport'
import ReduceButton from '@src/common/ReduceButton'
import { useQuery } from '@tanstack/react-query'
import { recommendCommercial } from '@src/api/recommendApi'
import useSelectPlaceStore from '@src/stores/selectPlaceStore'

const RecommendContainer = () => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [shouldRender, setShouldRender] = useState<boolean>(false)
  const reportRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // isSubmit 상태가 변경될 때마다 shouldRender도 업데이트
    if (isSubmit) {
      setShouldRender(true)
    }
  }, [isSubmit])

  // Report 이외의 부분을 누르면 해당 컴포넌트 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        reportRef.current &&
        !reportRef.current.contains(event.target as Node)
      ) {
        setIsSubmit(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleAnimationEnd = () => {
    // 애니메이션이 끝나면 shouldRender 상태를 false로 설정하여 컴포넌트를 제거
    if (!isSubmit) {
      setShouldRender(false)
    }
  }

  const [isOpen, setIsOpen] = useState<boolean>(true)

  // store에 저장된 구, 동 코드 값 가져올 store
  const { selectedGoo, selectedDong } = useSelectPlaceStore(state => ({
    selectedGoo: state.selectedGoo,
    selectedDong: state.selectedDong,
  }))

  const [submitData, setSubmitData] = useState({
    districtCode: 0,
    administrationCode: 0,
  })

  useEffect(() => {
    setSubmitData({
      // districtCode: selectedGoo.code,
      districtCode: 11710,
      administrationCode: 0,
    })
  }, [selectedDong.code, selectedGoo.code])

  const { data, isLoading } = useQuery({
    queryKey: ['recommendCommercial'],
    queryFn: () => recommendCommercial(submitData),
    enabled: isSubmit,
  })
  // 11710
  // 11710610
  return (
    <r.Container>
      <r.MapDiv>
        <KakaoMap />
      </r.MapDiv>
      <r.SearchDiv>
        {/* 서치바 */}
        <r.Search>
          <SearchBar
            setIsSubmit={setIsSubmit}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            selectedGoo={selectedGoo}
          />
        </r.Search>
        <r.ReduceButton>
          <ReduceButton isOpen={isOpen} setIsOpen={setIsOpen} />
        </r.ReduceButton>
      </r.SearchDiv>
      {shouldRender && data && !isLoading && (
        <r.Report
          ref={reportRef}
          $isSubmit={isSubmit}
          onAnimationEnd={handleAnimationEnd} // 애니메이션 종료 이벤트 핸들러 추가
        >
          <RecommendReport setIsSubmit={setIsSubmit} data={data.dataBody} />
        </r.Report>
      )}
    </r.Container>
  )
}

export default RecommendContainer
