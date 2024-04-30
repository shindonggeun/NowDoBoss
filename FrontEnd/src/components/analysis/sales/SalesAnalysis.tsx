import CategoryTitleCard from '@src/components/analysis/CategoryTitleCard'
import * as s from '@src/components/styles/analysis/SalesAnalysisStyle'

const SalesAnalysis = () => {
  return (
    <>
      <CategoryTitleCard title="매출분석" />
      <s.FirstLowContainer>
        <s.ExpectChart>추정 매출액</s.ExpectChart>
        <s.AgeChart>연령별 매출액</s.AgeChart>
      </s.FirstLowContainer>
      <s.SecondLowContainer>
        <s.TodaySalesChart>일일 평균 매출액</s.TodaySalesChart>
        <s.TodayNumberChart>일일 평균 매출 건수</s.TodayNumberChart>
      </s.SecondLowContainer>
      <s.ThirdLowContainer>
        <s.WeekSalesChart>요일별 매출액</s.WeekSalesChart>
        <s.WeekSalesChart>요일별 매출건수</s.WeekSalesChart>
      </s.ThirdLowContainer>
    </>
  )
}

export default SalesAnalysis
