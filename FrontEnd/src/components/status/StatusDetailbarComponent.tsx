import * as c from '@src/components/styles/status/StatusDetailbarStyle'
import DetailPopulationComponent from '@src/components/status/DetailPopulationComponent'
import DetailStoreNumberComponent from '@src/components/status/DetailStoreNumberComponent'
import DetailAnalysisComponent from '@src/components/status/DetailAnalysisComponent'
import DetailCommercialComponent from '@src/components/status/DetailCommercialComponent'
import DetailOpenCloseComponent from '@src/components/status/DetailOpenCloseComponent'
// import DetailSummaryComponent from '@src/components/status/DetailSummaryComponent'
import Xmark from 'src/assets/xmark_solid_nomal.svg'
import bookmark from 'src/assets/bookmark.svg'
import { useRef, useState, useEffect, useMemo } from 'react'
import useStateStore from '@src/stores/statusStore'
import useTabObserver from '@src/hooks/useTabObserver'

const StatusDetailbarComponent = () => {
  const { selectedRegion, setSelectedRegion } = useStateStore()
  const scrollRef = useRef<HTMLDivElement[]>([])
  const detailbarRef = useRef<HTMLDivElement>(null)

  const [navNumber, setNavNumber] = useState(0)

  const categories = useMemo(
    () => [
      { id: 0, name: '유동인구', component: DetailPopulationComponent },
      { id: 1, name: '점포수', component: DetailStoreNumberComponent },
      { id: 2, name: '개업률/폐업률', component: DetailOpenCloseComponent },
      { id: 4, name: '매출분석', component: DetailAnalysisComponent },
      { id: 5, name: '핵심요약', component: DetailCommercialComponent },
      // { id: 5, name: 'delete', component: DetailSummaryComponent },
    ],
    [],
  )

  // 사이드바 바깥 클릭 시 닫힘
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        detailbarRef.current &&
        !detailbarRef.current.contains(event.target as Node)
      ) {
        setSelectedRegion(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setSelectedRegion])

  return (
    <c.Container ref={detailbarRef}>
      <c.FixedCategoryBar>
        <c.BarTopHeader>
          <c.BookMarkIcon src={bookmark} alt="bookmark" />
          <c.BarTopTitle>{selectedRegion}</c.BarTopTitle>
          <c.BarTopSubtitle>분석 리포트</c.BarTopSubtitle>
          <c.BarTopSeason>(2023 3분기 기준)</c.BarTopSeason>
          <c.CloseIcon
            src={Xmark}
            alt="close"
            onClick={() => setSelectedRegion(null)}
          />
        </c.BarTopHeader>
        <c.BarInnerContainer>
          {categories.map((category, index) => (
            <c.BarInnerText
              key={index}
              onClick={() => {
                setNavNumber(category.id)
                scrollRef.current[index]?.scrollIntoView({
                  behavior: 'smooth',
                })
              }}
              $isActive={category.id === navNumber}
            >
              {category.name}
            </c.BarInnerText>
          ))}
        </c.BarInnerContainer>
      </c.FixedCategoryBar>

      <>
        {categories.map((category, index) => (
          <div key={index}>
            <c.SeparateLine
              ref={el => {
                if (el) scrollRef.current[index] = el
              }}
            />
            <c.TabBarContainer ref={useTabObserver(setNavNumber, category.id)}>
              <category.component />
            </c.TabBarContainer>
          </div>
        ))}
      </>
    </c.Container>
  )
}

export default StatusDetailbarComponent
