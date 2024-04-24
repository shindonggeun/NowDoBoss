import * as c from '@src/components/styles/status/StatusDetailbarStyle'
// import NavScroll from '@src/common/NavScroll'
import { useRef } from 'react'
import DetailPopulationComponent from '@src/components/status/DetailPopulationComponent.tsx'
import DetailStoreNumberComponent from '@src/components/status/DetailStoreNumberComponent.tsx'
import DetailOpenRateComponent from '@src/components/status/DetailOpenRateComponent.tsx'
import DetailCloseRateConponent from '@src/components/status/DetailCloseRateComponent.tsx'
import DetailAnalysisComponent from '@src/components/status/DetailAnalysisComponent.tsx'
import DetailCommercialComponent from '@src/components/status/DetailCommercialComponent.tsx'

// const DetailPopulation = forwardRef(function DetailPopulation(props, ref) {
//   return (
//     // <section ref={populationRef => (ref.current[0] = populationRef)}>
//     <section ref={ref}>
//       <h1>유동인구 페이지</h1>
//       <p>유동인구 어쩌고 저쩌고</p>
//       <p>유동인구 어쩌고 저쩌고</p>
//     </section>
//   )
// })

interface StatusDetailbarProps {
  selectedRegion: string | null
  regionCode: number | null
}

const StatusDetailbarComponent = ({
  selectedRegion,
  regionCode,
}: StatusDetailbarProps) => {
  console.log(`선택한 지역구 코드: ${regionCode}`)
  const scrollRef = useRef<HTMLDivElement[]>([])

  const categories: string[] = [
    '유동인구',
    '점포수',
    '개업률',
    '폐업률',
    '매출분석',
    '상권변화',
  ]

  const handleScrollView = event => {
    const name = event.target.innerText
    scrollRef.current[categories.indexOf(name)].scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <c.Container>
      {/* <NavScroll scrollRef={scrollRef} /> */}
      <c.FixedCategoryBar onClick={handleScrollView}>
        {categories.map((category, index) => (
          <c.BarInnerText key={index}>{category}</c.BarInnerText>
        ))}
      </c.FixedCategoryBar>

      <h1>{selectedRegion} 사이드바 테스트</h1>
      <p>선택한 지역구 코드: {regionCode} </p>
      {/* <DetailPopulation ref={scrollRef} /> */}
      <c.SeparateLine />

      <c.TabBarContainer
        ref={el => {
          if (el) scrollRef.current[0] = el
        }}
      >
        {/* 유동인구 */}
        <DetailPopulationComponent />
      </c.TabBarContainer>
      <c.SeparateLine />

      <c.TabBarContainer
        ref={el => {
          if (el) scrollRef.current[1] = el
        }}
      >
        {/* 점포수 */}
        <DetailStoreNumberComponent />
      </c.TabBarContainer>
      <c.SeparateLine />

      <c.TabBarContainer
        ref={el => {
          if (el) scrollRef.current[2] = el
        }}
      >
        {/* 개업률 */}
        <DetailOpenRateComponent />
      </c.TabBarContainer>
      <c.SeparateLine />

      <c.TabBarContainer
        ref={el => {
          if (el) scrollRef.current[3] = el
        }}
      >
        {/* 폐업률 */}
        <DetailCloseRateConponent />
      </c.TabBarContainer>
      <c.SeparateLine />

      <c.TabBarContainer
        ref={el => {
          if (el) scrollRef.current[4] = el
        }}
      >
        {/* 매출분석 */}
        <DetailAnalysisComponent />
      </c.TabBarContainer>
      <c.SeparateLine />

      <c.TabBarContainer
        ref={el => {
          if (el) scrollRef.current[5] = el
        }}
      >
        {/* 상권변화 */}
        <DetailCommercialComponent />
      </c.TabBarContainer>
    </c.Container>
  )
}

export default StatusDetailbarComponent
