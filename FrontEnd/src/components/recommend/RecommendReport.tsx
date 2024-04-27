import * as r from '@src/components/styles/recommend/RecommendReportStyle'
import SidebarHeader from '@src/common/SidebarHeader'

type RecommendReportPropsType = {
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>
}

const RecommendReport = (props: RecommendReportPropsType) => {
  const { setIsSubmit } = props
  return (
    <r.Container>
      <SidebarHeader
        title="상권 추천 결과"
        subTitle=""
        close
        setOpen={setIsSubmit}
      />
    </r.Container>
  )
}

export default RecommendReport
