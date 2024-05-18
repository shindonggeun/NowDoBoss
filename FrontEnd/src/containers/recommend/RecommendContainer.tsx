import { useEffect, useRef, useState } from 'react'
import * as r from '@src/containers/recommend/RecommendContainerStyle'
import KakaoMap from '@src/common/KakaoMap'
import SearchBar from '@src/components/recommend/SearchBar'
import ReduceButton from '@src/common/ReduceButton'
import { useQuery } from '@tanstack/react-query'
import { recommendCommercial } from '@src/api/recommendApi'
import RecommendHeader from '@src/components/recommend/RecommendHeader'
import RecommendBody from '@src/components/recommend/RecommendBody'
import RecommendBanner from '@src/components/recommend/RecommendBanner'
import RecommendBlueOcean from '@src/components/recommend/RecommendBlueOcean'
import LoadingComponent from '@src/components/recommend/LoadingComponent'
import { RecommendCommercialType } from '@src/types/MapType'
import useSelectPlaceStore from '@src/stores/selectPlaceStore'
import Banner from '@src/common/Banner'

const RecommendContainer = () => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [shouldRender, setShouldRender] = useState<boolean>(false)
  const reportRef = useRef<HTMLDivElement | null>(null)
  const [selectedTab, setSelectedTab] = useState<string>('')
  const [selectedData, setSelectedData] = useState<RecommendCommercialType>({
    commercialCode: 0,
    commercialCodeName: '',
    salesCommercialInfo: {
      mySales: 0,
      administrationSales: 0,
      otherSales: 0,
    },
    footTrafficCommercialInfo: {
      myFootTraffic: 0,
      administrationFootTraffic: 0,
      otherFootTraffic: 0,
    },
    storeCommercialInfo: {
      myStores: 0,
      administrationStores: 0,
      otherStores: 0,
    },
    closedRateCommercialInfo: {
      myClosedRate: 0,
      administrationClosedRate: 0,
      otherClosedRate: 0,
    },
    blueOceanInfo: { string: 0 },
  })

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
      setSelectedData({
        commercialCode: 0,
        commercialCodeName: '',
        salesCommercialInfo: {
          mySales: 0,
          administrationSales: 0,
          otherSales: 0,
        },
        footTrafficCommercialInfo: {
          myFootTraffic: 0,
          administrationFootTraffic: 0,
          otherFootTraffic: 0,
        },
        storeCommercialInfo: {
          myStores: 0,
          administrationStores: 0,
          otherStores: 0,
        },
        closedRateCommercialInfo: {
          myClosedRate: 0,
          administrationClosedRate: 0,
          otherClosedRate: 0,
        },
        blueOceanInfo: { string: 0 },
      })
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
      districtCode: selectedGoo.code,
      administrationCode: selectedDong.code,

      // districtCode: 11710,
      // administrationCode: 0,
    })
  }, [selectedDong.code, selectedGoo.code])

  const { data, isLoading } = useQuery({
    queryKey: ['recommendCommercial'],
    queryFn: () => recommendCommercial(submitData),
    enabled: isSubmit,
    staleTime: 0,
    gcTime: 0,
  })
  // 11710
  // 11710610

  useEffect(() => {
    if (data?.dataBody) {
      setShouldRender(true)
      setSelectedData(data.dataBody[0])
    }
  }, [data])

  const handleTabClick = (name: string) => {
    setSelectedTab(name)
    const tab = data.dataBody.find(
      (commercial: RecommendCommercialType) =>
        commercial.commercialCodeName === name,
    )
    if (tab) {
      setSelectedData(tab)
    }
  }

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
          <r.Banner>
            <Banner />
          </r.Banner>
        </r.Search>
        <r.ReduceButton>
          <ReduceButton isOpen={isOpen} setIsOpen={setIsOpen} />
        </r.ReduceButton>
      </r.SearchDiv>
      {shouldRender && (
        <r.Report
          ref={reportRef}
          $isSubmit={isSubmit}
          onAnimationEnd={handleAnimationEnd} // 애니메이션 종료 이벤트 핸들러 추가
        >
          <r.ReportContainer>
            {shouldRender &&
            data &&
            !isLoading &&
            selectedData.commercialCode !== 0 ? (
              <r.Div>
                <RecommendHeader
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  handleTabClick={handleTabClick}
                  setIsSubmit={setIsSubmit}
                  data={data.dataBody}
                />
                <RecommendBody selectedData={selectedData} />
                <RecommendBanner selectedData={selectedData} />
                <RecommendBlueOcean selectedData={selectedData} />
              </r.Div>
            ) : (
              <r.Div>
                <LoadingComponent setIsSubmit={setIsSubmit} />
              </r.Div>
            )}
          </r.ReportContainer>
        </r.Report>
      )}
    </r.Container>
  )
}

export default RecommendContainer
