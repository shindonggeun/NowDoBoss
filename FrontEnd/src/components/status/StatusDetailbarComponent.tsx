import * as c from '@src/components/styles/status/StatusDetailbarStyle'
import DetailPopulationComponent from '@src/components/status/DetailPopulationComponent'
import DetailStoreNumberComponent from '@src/components/status/DetailStoreNumberComponent'
import DetailOpenRateComponent from '@src/components/status/DetailOpenRateComponent'
import DetailCloseRateComponent from '@src/components/status/DetailCloseRateComponent'
import DetailAnalysisComponent from '@src/components/status/DetailAnalysisComponent'
import DetailCommercialComponent from '@src/components/status/DetailCommercialComponent'
import { useRef, useState } from 'react'

interface StatusDetailbarProps {
  selectedRegion: string | null
  regionCode: number | null
}

const StatusDetailbarComponent = ({
  selectedRegion,
  regionCode,
}: StatusDetailbarProps) => {
  console.log(`선택한 지역구 코드: ${regionCode}`)
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement[]>([])

  const categories = [
    { name: '유동인구', component: DetailPopulationComponent },
    { name: '점포수', component: DetailStoreNumberComponent },
    { name: '개업률', component: DetailOpenRateComponent },
    { name: '폐업률', component: DetailCloseRateComponent },
    { name: '매출분석', component: DetailAnalysisComponent },
    { name: '상권변화', component: DetailCommercialComponent },
  ]

  const onClickActiveTab = (tab: string) => {
    setActiveTab(tab)
  }

  const handleScrollView = event => {
    const name = event.target.innerText
    const index = categories.findIndex(category => category.name === name)
    if (index !== -1) {
      scrollRef.current[index].scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <c.Container>
      <c.FixedCategoryBar onClick={handleScrollView}>
        <c.BarTopHeader>
          <c.BarTopTitle>{selectedRegion}</c.BarTopTitle>
          <c.BarTopSubtitle>분석 리포트</c.BarTopSubtitle>
          <c.BarTopSeason>(2023 3분기 기준)</c.BarTopSeason>
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
            <category.component />
          </c.TabBarContainer>
        </div>
      ))}
    </c.Container>
  )
}

export default StatusDetailbarComponent
