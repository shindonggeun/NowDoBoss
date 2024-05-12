import * as c from '@src/components/styles/status/StatusDetailbarStyle'
import DetailPopulationComponent from '@src/components/status/DetailPopulationComponent'
import DetailStoreNumberComponent from '@src/components/status/DetailStoreNumberComponent'
import DetailOpenRateComponent from '@src/components/status/DetailOpenRateComponent'
import DetailCloseRateComponent from '@src/components/status/DetailCloseRateComponent'
import DetailAnalysisComponent from '@src/components/status/DetailAnalysisComponent'
import DetailCommercialComponent from '@src/components/status/DetailCommercialComponent'
import Xmark from 'src/assets/xmark_solid_nomal.svg'
import bookmark from 'src/assets/bookmark.svg'
import { useRef, useState, useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchStatusDetail } from '@src/api/statusApi'
import { StatusResponse } from '@src/types/StatusType'
import CircleLoading from '@src/common/CircleLoading.tsx'
import useStateStore from '@src/stores/statusStore'

interface StatusDetailbarProps {
  regionCode: number | null
}

const StatusDetailbarComponent = ({ regionCode }: StatusDetailbarProps) => {
  const { selectedRegion, setSelectedRegion } = useStateStore()
  const scrollRef = useRef<HTMLDivElement[]>([])
  const detailbarRef = useRef<HTMLDivElement>(null)

  // API 호출
  const { data, isLoading, refetch } = useQuery<StatusResponse>({
    queryKey: ['StatusDetailAnalysis'],
    queryFn: () => fetchStatusDetail(Number(regionCode)),
    enabled: !!regionCode,
  })
  useEffect(() => {
    refetch()
  }, [refetch, regionCode])

  let DeatilData: any = null
  if (data) {
    DeatilData = data.dataBody
  }

  const categories = useMemo(
    () => [
      {
        name: '핵심요약',
        component: DetailCommercialComponent,
      },
      {
        name: '유동인구',
        component: DetailPopulationComponent,
      },
      {
        // <todo> % 비율말고 data 값 받아오기
        name: '점포수',
        component: DetailStoreNumberComponent,
      },
      {
        name: '개업률',
        component: DetailOpenRateComponent,
      },
      {
        name: '폐업률',
        component: DetailCloseRateComponent,
      },
      {
        name: '매출분석',
        component: DetailAnalysisComponent,
      },
    ],
    [],
  )

  const [activeTab, setActiveTab] = useState<string>(categories[0].name)

  const onClickActiveTab = (tab: string) => {
    setActiveTab(tab)
  }

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

  // 탭 클릭시 화면 부드럽게 내리기
  useEffect(() => {
    const index = categories.findIndex(category => category.name === activeTab)
    scrollRef.current[index]?.scrollIntoView({ behavior: 'smooth' })
  }, [activeTab, categories])

  useEffect(() => {
    const handleScroll = () => {
      console.log('스크롤중~~~')
    }

    document.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const [spinner, setSpinner] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setSpinner(false)
    }, 1100)
  }, [])

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
              onClick={() => onClickActiveTab(category.name)}
              isActive={category.name === activeTab}
            >
              {category.name}
            </c.BarInnerText>
          ))}
        </c.BarInnerContainer>
      </c.FixedCategoryBar>
      {!isLoading && data && !spinner ? (
        <>
          {/* <p>선택한 지역구 코드: {regionCode} </p> */}
          {categories.map((category, index) => (
            <div key={index}>
              <c.SeparateLine />
              <c.TabBarContainer
                ref={el => {
                  if (el) scrollRef.current[index] = el
                }}
              >
                <category.component props={DeatilData} />
                {/* <category.component /> */}
              </c.TabBarContainer>
            </div>
          ))}
        </>
      ) : (
        <c.LoadingContainer>
          <CircleLoading />
        </c.LoadingContainer>
      )}
    </c.Container>
  )
}

export default StatusDetailbarComponent
