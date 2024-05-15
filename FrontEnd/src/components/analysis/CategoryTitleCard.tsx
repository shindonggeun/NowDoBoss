import React, { useState } from 'react'
import { CategoryTitleCardProps } from '@src/types/AnalysisType'
import * as c from '@src/components/styles/analysis/CategoryTitleCardStyle'

const CategoryTitleCard = (props: CategoryTitleCardProps) => {
  const { src, title, setPeriodCode } = props
  const [selectedYear, setSelectedYear] = useState('2023')
  const [selectedQuarter, setSelectedQuarter] = useState('3')
  // console.log(selectedYear, selectedQuarter)

  let years
  if (title === '집객시설') {
    years = ['2020', '2021', '2022', '2023']
  } else {
    years = ['2019', '2020', '2021', '2022', '2023']
  }

  let quarters
  if (selectedYear === '2023') {
    quarters = ['1', '2', '3']
  } else if (title === '상주인구' && selectedYear === '2019') {
    quarters = ['4']
  } else if (title === '집객시설' && selectedYear === '2020') {
    quarters = ['4']
  } else {
    quarters = ['1', '2', '3', '4']
  }

  // 년도 선택 핸들러
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
          {years.map((year, index) => (
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
