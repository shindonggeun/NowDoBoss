import { forwardRef, Ref } from 'react'
import CategoryTitleCard from '@src/components/analysis/CategoryTitleCard'
import ExpectChart from '@src/components/analysis/sales/ExpectChart'
import AgeChart from '@src/components/analysis/sales/AgeChart'
import TodaySalesChart from '@src/components/analysis/sales/TodaySalesChart'
import TodayNumberChart from '@src/components/analysis/sales/TodayNumberChart'
import WeekSalesChart from '@src/components/analysis/sales/WeekSalesChart'
import WeekNumberChart from '@src/components/analysis/sales/WeekNumberChart'
import * as s from '@src/components/styles/analysis/SalesAnalysisStyle'

const SalesAnalysis = forwardRef((_, ref: Ref<HTMLDivElement>) => {
  return (
    <div ref={ref}>
      <CategoryTitleCard src="/images/sales.png" title="매출분석" />
      <s.FirstLowContainer>
        <ExpectChart />
        <AgeChart />
      </s.FirstLowContainer>
      <s.SecondLowContainer>
        <TodaySalesChart />
        <TodayNumberChart />
      </s.SecondLowContainer>
      <s.ThirdLowContainer>
        <WeekSalesChart />
        <WeekNumberChart />
      </s.ThirdLowContainer>
    </div>
  )
})

SalesAnalysis.displayName = 'SalesAnalysis'
export default SalesAnalysis
