import * as c from '@src/components/styles/status/StatusDetailbarStyle'
import DetailPopulationComponent from '@src/components/status/DetailPopulationComponent'
import DetailStoreNumberComponent from '@src/components/status/DetailStoreNumberComponent'
import DetailOpenRateComponent from '@src/components/status/DetailOpenRateComponent'
import DetailCloseRateComponent from '@src/components/status/DetailCloseRateComponent'
import DetailAnalysisComponent from '@src/components/status/DetailAnalysisComponent'
import DetailCommercialComponent from '@src/components/status/DetailCommercialComponent'
import Xmark from 'src/assets/xmark_solid_nomal.svg'
import bookmark from 'src/assets/bookmark.svg'
import { useRef, useState, useEffect } from 'react'

interface StatusDetailbarProps {
  selectedRegion: string | null
  onClickRegionHandler: any
  regionCode: number | null
}

const StatusDetailbarComponent = ({
  selectedRegion,
  onClickRegionHandler,
  regionCode,
}: StatusDetailbarProps) => {
  // console.log(`선택한 지역구 코드: ${regionCode}`)
  const [activeTab, setActiveTab] = useState<string>('유동인구')
  const scrollRef = useRef<HTMLDivElement[]>([])

  const categories = [
    { name: '유동인구', component: DetailPopulationComponent, props: {} },
    { name: '점포수', component: DetailStoreNumberComponent, props: {} },
    { name: '개업률', component: DetailOpenRateComponent, props: {} },
    { name: '폐업률', component: DetailCloseRateComponent, props: {} },
    { name: '매출분석', component: DetailAnalysisComponent, props: {} },
    { name: '상권변화', component: DetailCommercialComponent, props: {} },
  ]

  const onClickActiveTab = (tab: string) => {
    setActiveTab(tab)
  }

  const handleScrollView = event => {
    const name = event.target.innerText
    const index = categories.findIndex(category => category.name === name)
    scrollRef.current[index].scrollIntoView({ behavior: 'smooth' })
  }

  // <Todo> : useRef 정복해서 스크롤 이동시에도 탭 상태 변화시키기!
  useEffect(() => {
    console.log('------------------------')
    console.log(scrollRef.current)
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY + window.innerHeight / 2
      console.log('///////////////////////')
      console.log(scrollRef.current)
      const activeIndex = scrollRef.current.findIndex((ref, idx) => {
        const nextRef = scrollRef.current[idx + 1]
        return (
          ref.offsetTop <= currentScrollPosition &&
          (!nextRef || nextRef.offsetTop > currentScrollPosition)
        )
      })

      if (activeIndex !== -1 && categories[activeIndex]) {
        setActiveTab(categories[activeIndex].name)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [activeTab, scrollRef]) // 의존성 배열에 scrollRef 추가

  return (
    <c.Container>
      <c.FixedCategoryBar onClick={handleScrollView}>
        <c.BarTopHeader>
          <c.BookMarkIcon src={bookmark} alt="bookmark" />
          <c.BarTopTitle>{selectedRegion}</c.BarTopTitle>
          <c.BarTopSubtitle>분석 리포트</c.BarTopSubtitle>
          <c.BarTopSeason>(2023 3분기 기준)</c.BarTopSeason>
          <c.CloseIcon
            src={Xmark}
            alt="close"
            onClick={() => onClickRegionHandler(null)}
          />
        </c.BarTopHeader>
        <c.BarInnerContainer>
          {categories.map((category, index) => (
            <c.BarInnerText
              key={index}
              onClick={() => onClickActiveTab(category.name)}
              isActive={category.name === activeTab}
            >
              {category.name}
            </c.BarInnerText>
          ))}
        </c.BarInnerContainer>
      </c.FixedCategoryBar>

      <p>선택한 지역구 코드: {regionCode} </p>

      {categories.map((category, index) => (
        <div key={index}>
          <c.SeparateLine />
          <c.TabBarContainer
            ref={el => {
              if (el) scrollRef.current[index] = el
            }}
          >
            {/* <category.component props={category.props} /> */}
            <category.component />
          </c.TabBarContainer>
        </div>
      ))}
    </c.Container>
  )
}

export default StatusDetailbarComponent
