import CategoryTitleCard from '@src/components/analysis/CategoryTitleCard'
import * as f from '@src/components/styles/analysis/FacilitiesAnalysisStyle'

const FacilitiesAnalysis = () => {
  return (
    <>
      <CategoryTitleCard title="집객시설" />
      <f.FirstLowContainer>
        <f.TransChart>집객시설 - 교통수단</f.TransChart>
        <f.EduChart>집객시설 - 교육시설</f.EduChart>
      </f.FirstLowContainer>
    </>
  )
}

export default FacilitiesAnalysis
