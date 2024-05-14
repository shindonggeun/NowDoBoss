import { forwardRef, Ref, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import selectPlaceStore from '@src/stores/selectPlaceStore'
import analysisStore from '@src/stores/analysisStore'
import {
  getExpenditureData,
  getTotalExpenditureData,
} from '@src/api/analysisApi'
import CategoryTitleCard from '@src/components/analysis/CategoryTitleCard'
import TotalCard from '@src/components/analysis/expenditure/TotalCard'
import CategoryCard from '@src/components/analysis/expenditure/CategoryCard'
import * as e from '@src/components/styles/analysis/ExpenditureAnalysisStyle'

const ExpenditureAnalysisContainer = forwardRef(
  (_, ref: Ref<HTMLDivElement>) => {
    const selectedGoo = selectPlaceStore(state => state.selectedGoo)
    const selectedDong = selectPlaceStore(state => state.selectedDong)
    const selectedCommercial = selectPlaceStore(
      state => state.selectedCommercial,
    )
    const setExpenditureDataBody = analysisStore(
      state => state.setExpenditureDataBody,
    )
    const setTotalExpenditureDataBody = analysisStore(
      state => state.setTotalExpenditureDataBody,
    )
    const [expenditureErr, setExpenditureErr] = useState('') // 지출내역 에러 메세지
    const [totalExpenditureErr, setTotalExpenditureErr] = useState('') // 지출내역 (총 지출 금액) 에러 메세지

    // 지출내역
    const { data: ExpenditureData, status: expenditureStatus } = useQuery({
      queryKey: ['GetExpenditureData', selectedCommercial.code],
      queryFn: () => getExpenditureData(String(selectedCommercial.code)),
      enabled: selectedCommercial.code !== 0, // 상권 코드가 0일때는 보내지 않는 조건
    })

    useEffect(() => {
      // 호출 성공
      if (
        expenditureStatus === 'success' &&
        ExpenditureData?.dataHeader.successCode === 0
      ) {
        setExpenditureDataBody(ExpenditureData.dataBody)
        setExpenditureErr('')
      }
      // 호출 실패
      else if (
        expenditureStatus === 'success' &&
        ExpenditureData?.dataHeader.successCode === 1
      ) {
        setExpenditureErr(ExpenditureData.dataHeader.resultMessage)
      }
    }, [expenditureStatus, ExpenditureData]) // eslint-disable-line react-hooks/exhaustive-deps

    // 지출내역 (총 지출 금액)
    const { data: TotalExpenditureData, status: totalExpenditureStatus } =
      useQuery({
        queryKey: ['GetTotalExpenditureData', selectedCommercial.code],
        queryFn: () =>
          getTotalExpenditureData(
            String(selectedGoo.code),
            String(selectedDong.code),
            String(selectedCommercial.code),
          ),
        enabled: selectedCommercial.code !== 0, // 상권 코드가 0일때는 보내지 않는 조건
      })

    useEffect(() => {
      // 호출 성공
      if (
        totalExpenditureStatus === 'success' &&
        TotalExpenditureData?.dataHeader.successCode === 0
      ) {
        setTotalExpenditureDataBody(TotalExpenditureData.dataBody)
        setTotalExpenditureErr('')
      }
      // 호출 실패
      else if (
        totalExpenditureStatus === 'success' &&
        TotalExpenditureData?.dataHeader.successCode === 1
      ) {
        setTotalExpenditureErr(TotalExpenditureData.dataHeader.resultMessage)
      }
    }, [totalExpenditureStatus, TotalExpenditureData]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <div ref={ref}>
        <CategoryTitleCard src="/images/expenditure.png" title="지출내역" />
        {totalExpenditureErr || expenditureErr ? (
          <e.ErrBox>
            해당 분기에 해당하는 지출내역 데이터가 존재하지 않습니다.
          </e.ErrBox>
        ) : (
          <e.FirstLowContainer>
            <TotalCard />
            <CategoryCard />
          </e.FirstLowContainer>
        )}
      </div>
    )
  },
)

ExpenditureAnalysisContainer.displayName = 'ExpenditureAnalysisContainer'
export default ExpenditureAnalysisContainer
