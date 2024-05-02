import CategoryTitleCard from '@src/components/analysis/CategoryTitleCard'
import TransChart from '@src/components/analysis/facilities/TransChart'
import EduChart from '@src/components/analysis/facilities/EduChart'
import * as f from '@src/components/styles/analysis/FacilitiesAnalysisStyle'

const FacilitiesAnalysis = () => {
  return (
    <>
      <CategoryTitleCard title="집객시설" />
      <f.FirstLowContainer>
        <TransChart />
        <EduChart />
      </f.FirstLowContainer>
    </>
  )
}

export default FacilitiesAnalysis
