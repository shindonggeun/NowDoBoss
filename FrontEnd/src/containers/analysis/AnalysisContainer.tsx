import { useEffect, useRef, useState } from 'react'
import SelectContainer from '@src/containers/analysis/SelectContainer'
import ResultIntroContainer from '@src/containers/analysis/ResultIntroContainer'
import ResultContainer from '@src/containers/analysis/ResultContainer'
import NotLogin from '@src/common/swal/NotLogin'
import { useNavigate } from 'react-router-dom'
// import selectPlaceStore from '@src/stores/selectPlaceStore'
// import analysisStore from '@src/stores/analysisStore'

const AnalysisContainer = () => {
  const [isReady, setIsReady] = useState(false)
  const resultIntroContainerRef = useRef<HTMLDivElement>(null)
  const userLoggedIn = localStorage.getItem('isLogIn') === 'true'
  // const setSelectedGoo = selectPlaceStore(state => state.setSelectedGoo)
  // const setSelectedDong = selectPlaceStore(state => state.setSelectedDong)
  // const setSelectedCommercial = selectPlaceStore(
  //   state => state.setSelectedCommercial,
  // )
  // const setSelectedService = analysisStore(state => state.setSelectedService)
  // const setSelectedServiceType = analysisStore(
  //   state => state.setSelectedServiceType,
  // )

  const navigate = useNavigate()
  // const location = useLocation()
  // const { selectedGoo, selectedDong, selectedCommercial, selectedService } =
  //   location.state || {}
  //
  // // location에서 받은 데이터가 유효한지 확인하는 상태
  // const hasValidLocationData =
  //   selectedGoo && selectedDong && selectedCommercial && selectedService

  const handleResultButtonClick = () => {
    if (!userLoggedIn) {
      NotLogin(navigate)
    } else {
      setIsReady(true)
    }
  }

  // useEffect(() => {
  //   if (hasValidLocationData) {
  //     setSelectedGoo(selectedGoo)
  //     setSelectedDong(selectedDong)
  //     setSelectedCommercial(selectedCommercial)
  //     setSelectedServiceType(selectedService.serviceType)
  //     setSelectedService(selectedService)
  //     handleResultButtonClick()
  //     setIsReady(true)
  //   }
  // }, [
  //   selectedGoo,
  //   selectedDong,
  //   selectedCommercial,
  //   selectedService,
  //   hasValidLocationData,
  //   handleResultButtonClick,
  // ])

  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => {
        resultIntroContainerRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }, 100) // 100ms 정도의 지연을 줌

      return () => clearTimeout(timer) // 컴포넌트 언마운트 시 타이머 클리어 -> 메모리 누수 방지
    }

    // isReady가 false일 경우 명시적으로 undefined 반환
    return undefined
  }, [isReady])

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <SelectContainer
        setIsReady={setIsReady}
        handleResultButtonClick={handleResultButtonClick}
      />
      {isReady && (
        <>
          <ResultIntroContainer ref={resultIntroContainerRef} />
          <ResultContainer />
        </>
      )}
    </div>
  )
}

export default AnalysisContainer
