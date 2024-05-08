import { DetailDataBody } from '@src/types/StatusType'
import * as c from '@src/components/styles/status/DeatilComponentStyle'

interface DetailAnalysisProps {
  props: DetailDataBody
}
const DetailAnalysisComponent = ({ props }: DetailAnalysisProps) => {
  console.log(props)
  return (
    <>
      <c.AnalysisTitle>매출 분석</c.AnalysisTitle>
      <c.AnalysisSubTitle>
        가장 많은 매출이 높은 동네는 신촌동 이며, 매출 높은 업종은 커피, 음료
        입니다.
        <c.AnalysiEemphasis>{}</c.AnalysiEemphasis>
      </c.AnalysisSubTitle>

      <c.MixConatiner>
        <c.MixInnerConatiner>
          <div>
            <div>매출 높은 동네 Top 5</div>
          </div>
        </c.MixInnerConatiner>
        <c.MixInnerConatiner>
          <div>
            <div>매출 높은 업종 Top 5</div>
          </div>
        </c.MixInnerConatiner>
      </c.MixConatiner>
    </>
  )
}

export default DetailAnalysisComponent
