import { useEffect, useRef, useState } from 'react'
import * as r from '@src/containers/recommend/RecommendContainerStyle'
import KakaoMap from '@src/common/KakaoMap'
import SearchBar from '@src/components/recommend/SearchBar'
import RecommendReport from '@src/components/recommend/RecommendReport'

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

  return (
    <r.Container>
      <r.Map>
        <KakaoMap />
      </r.Map>
      <r.Search>
        <SearchBar setIsSubmit={setIsSubmit} />
      </r.Search>
      {shouldRender && (
        <r.Report
          ref={reportRef}
          $isSubmit={isSubmit}
          onAnimationEnd={handleAnimationEnd} // 애니메이션 종료 이벤트 핸들러 추가
        >
          <RecommendReport setIsSubmit={setIsSubmit} />
        </r.Report>
      )}
    </r.Container>
  )
}

export default RecommendContainer
