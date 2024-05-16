import { forwardRef, Ref, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import selectPlaceStore from '@src/stores/selectPlaceStore'
import analysisStore from '@src/stores/analysisStore'
import { getResidentPopulationData } from '@src/api/analysisApi'
import CategoryTitleCard from '@src/components/analysis/CategoryTitleCard'
import AgeChart from '@src/components/analysis/residentPopulation/AgeChart'
import GenderChart from '@src/components/analysis/residentPopulation/GenderChart'
import * as r from '@src/components/styles/analysis/ResidentPopulationAnalysisStyle'

const ResidentPopulationAnalysisContainer = forwardRef(
  (_, ref: Ref<HTMLDivElement>) => {
    const selectedCommercial = selectPlaceStore(
      state => state.selectedCommercial,
    )
    const setResidentPopulationDataBody = analysisStore(
      state => state.setResidentPopulationDataBody,
    )
    const [periodCode, setPeriodCode] = useState('20233') // 분기 코드
    const [errMsg, setErrMsg] = useState('')

    // 상주인구
    const { data: ResidentPopulationData, status: residentPopulationStatus } =
      useQuery({
        queryKey: [
          'GetResidentPopulationData',
          selectedCommercial.code,
          periodCode,
        ],
        queryFn: () =>
          getResidentPopulationData(String(selectedCommercial.code)),
        enabled: selectedCommercial.code !== 0, // 상권 코드가 0일때는 보내지 않는 조건
      })

    useEffect(() => {
      // 호출 성공
      if (
        residentPopulationStatus === 'success' &&
        ResidentPopulationData?.dataHeader.successCode === 0
      ) {
        setResidentPopulationDataBody(ResidentPopulationData.dataBody)
        setErrMsg('')
      }
      // 호출 실패
      else if (
        residentPopulationStatus === 'success' &&
        ResidentPopulationData?.dataHeader.successCode === 1
      ) {
        setErrMsg(ResidentPopulationData.dataHeader.resultMessage)
      }
    }, [residentPopulationStatus, ResidentPopulationData]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <div ref={ref}>
        <CategoryTitleCard
          src="/images/resident_population.png"
          title="상주인구"
          setPeriodCode={setPeriodCode}
        />
        {errMsg ? (
          <r.ErrBox>
            해당 분기의 선택 상권 상주인구 데이터를 제공하지 않습니다.
          </r.ErrBox>
        ) : (
          <r.FirstLowContainer>
            <GenderChart />
            <AgeChart />
          </r.FirstLowContainer>
        )}
      </div>
    )
  },
)

ResidentPopulationAnalysisContainer.displayName =
  'ResidentPopulationAnalysisContainer' // eslint 에 위반되는 조건 해결
export default ResidentPopulationAnalysisContainer
