import * as r from '@src/components/styles/recommend/RecommendReportStyle'
import report from '@src/assets/report.svg'
import SaveIcon from '@src/assets/saveMark.svg'
import Xmark from '@src/assets/xmark_solid_nomal.svg'
import LoadingSpinner from '@src/common/LoadingSpinner'

type RecommendReportPropsType = {
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>
}

const LoadingComponent = (props: RecommendReportPropsType) => {
  const { setIsSubmit } = props
  return (
    <r.LoadingContainer>
      <r.FixedHeader>
        <r.Header>
          <r.HeaderContainer>
            <r.Icon src={report} />
            <r.Content>
              <r.HeaderTitle>상권 추천 결과</r.HeaderTitle>
            </r.Content>
          </r.HeaderContainer>
          <r.RightHeader>
            <r.HeaderIcon $isLoading>
              <r.SaveIcon src={SaveIcon} alt="save" />
              저장하기
            </r.HeaderIcon>

            <r.CloseIcon
              src={Xmark}
              alt="close"
              onClick={() => setIsSubmit && setIsSubmit(false)}
            />
          </r.RightHeader>
        </r.Header>
      </r.FixedHeader>
      <r.LoadingContent>
        <LoadingSpinner />
      </r.LoadingContent>
    </r.LoadingContainer>
  )
}

export default LoadingComponent
