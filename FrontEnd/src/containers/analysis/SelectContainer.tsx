import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import selectPlaceStore from '@src/stores/selectPlaceStore'
import analysisStore from '@src/stores/analysisStore'
import { getServiceData } from '@src/api/analysisApi'
import { SelectContainerPropsType } from '@src/types/AnalysisType'
import KakaoMap from '@src/common/KakaoMap'
import SearchSection from '@src/components/analysis/SearchSection'
import SimulSelction from '@src/components/simulation/SimulSelction'
import * as a from '@src/containers/analysis/SelectContainerStyle'
import up_arrow from '@src/assets/arrow_up.svg'
import down_arrow from '@src/assets/arrow_down.svg'

const SelectContainer = (props: SelectContainerPropsType) => {
  const { setIsReady, handleResultButtonClick } = props
  const [isOpen, setIsOpen] = useState<boolean>(true) // 사이드바 접는 버튼 여부
  const selectedCommercial = selectPlaceStore(state => state.selectedCommercial)
  const setServiceDataBody = analysisStore(state => state.setServiceDataBody)
  const selectedService = analysisStore(state => state.selectedService)

  const [isModal, setIsModal] = useState(false) // 창업 시뮬레이션 모달 여부
  const onClickClose = () => setIsModal(false)

  // 업종 선택
  const { data: ServiceData, status: serviceStatus } = useQuery({
    queryKey: ['GetServiceData', selectedCommercial.code],
    queryFn: () => getServiceData(String(selectedCommercial.code)),
  })

  useEffect(() => {
    if (
      serviceStatus === 'success' &&
      ServiceData?.dataHeader.successCode === 0
    ) {
      setServiceDataBody(ServiceData.dataBody)
    }
  }, [serviceStatus, ServiceData]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setIsReady(false)
  }, [setIsReady, selectedCommercial.code, selectedService.serviceCode])

  return (
    <a.Container>
      <a.MapDiv>
        <KakaoMap />
      </a.MapDiv>
      <a.SearchDiv>
        <a.Search>
          <SearchSection
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            handleResultButtonClick={handleResultButtonClick}
          />
        </a.Search>
        <a.ReduceBtnWrap>
          <a.ReduceBtn onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <a.BtnImg src={up_arrow} />
            ) : (
              <a.BtnImg src={down_arrow} />
            )}
          </a.ReduceBtn>
        </a.ReduceBtnWrap>
        <a.SimulationBtnWrap>
          <a.SimulationBtn onClick={() => setIsModal(!isModal)}>
            창업 시뮬레이션 바로가기
          </a.SimulationBtn>
        </a.SimulationBtnWrap>
      </a.SearchDiv>
      {isModal && <SimulSelction open={isModal} onClose={onClickClose} />}
    </a.Container>
  )
}

export default SelectContainer
