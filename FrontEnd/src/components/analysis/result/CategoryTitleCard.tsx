import React, { useEffect, useState } from 'react'
import { CategoryTitleCardProps } from '@src/types/AnalysisType'
import * as c from '@src/components/styles/analysis/result/CategoryTitleCardStyle'

const CategoryTitleCard = (props: CategoryTitleCardProps) => {
  const { src, title, setPeriodCode } = props
  const [selectedYear, setSelectedYear] = useState('2023')
  const [selectedQuarter, setSelectedQuarter] = useState('3')

  let quarters
  if (selectedYear === '2023') {
    quarters = ['1', '2', '3']
  } else {
    quarters = ['1', '2', '3', '4']
  }

  const [availableYears, setAvailableYears] = useState([
    '2020',
    '2021',
    '2022',
    '2023',
  ])

  useEffect(() => {
    // 4분기가 선택되면 2023년을 사용할 수 없게 함
    if (selectedQuarter === '4') {
      setAvailableYears(['2019', '2020', '2021', '2022'])
      // 현재 선택된 년도가 2023년이면 자동으로 2022년으로 변경
      if (selectedYear === '2023') {
        setSelectedYear('2022')
        setPeriodCode('20224') // 예: 2022년 4분기로 설정
      }
    } else {
      // 4분기가 아닌 다른 분기를 선택하면 모든 년도를 사용할 수 있게 함
      setAvailableYears(
        title === '집객시설'
          ? ['2020', '2021', '2022', '2023']
          : ['2019', '2020', '2021', '2022', '2023'],
      )
    }
  }, [selectedQuarter, selectedYear, setPeriodCode, title])

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = e.target.value
    setSelectedYear(newYear) // 년도 상태 업데이트
    setPeriodCode(`${newYear}${selectedQuarter}`)
  }

  // 분기 선택 핸들러
  const handleQuarterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuarter = e.target.value
    setSelectedQuarter(newQuarter) // 분기 상태 업데이트
    setPeriodCode(`${selectedYear}${newQuarter}`)
  }

  return (
    <c.CardContainer>
      <c.IconImg src={src} alt={title} />
      <c.Title>{title}</c.Title>
      <c.DropdownContainer>
        <c.Dropdown onChange={handleYearChange} value={selectedYear}>
          {availableYears.map((year, index) => (
            <option key={index} value={year}>
              {year}년
            </option>
          ))}
        </c.Dropdown>
        <c.Dropdown onChange={handleQuarterChange} value={selectedQuarter}>
          {quarters.map((quarter, index) => (
            <option key={index} value={quarter}>
              {quarter}분기
            </option>
          ))}
        </c.Dropdown>
      </c.DropdownContainer>
    </c.CardContainer>
  )
}

export default CategoryTitleCard
