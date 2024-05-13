import * as c from '@src/components/styles/simulation/ReportDetailStyle'
import dat from '@src/assets/dotIcon.svg'

const ReportWarning = () => {
  return (
    <c.WarningContainer>
      <c.WarningTextContainer>
        <c.WarningImg src={dat} />
        <div>
          다만 이는 일반적인 추정치이며, 실제 창업 시 상황에 따라 비용이 달라질
          수 있습니다.
        </div>
      </c.WarningTextContainer>
      <c.WarningTextContainer>
        <c.WarningImg src={dat} />

        <div>
          프랜차이즈 예상 창업비용은 실제와 다를 수 있습니다. 각 프랜차이즈와의
          별도의 문의를 통해 정확한 견적비용을 받으시는걸 추천드립니다.
        </div>
      </c.WarningTextContainer>
      <c.WarningTextContainer>
        <c.WarningImg src={dat} />
        <div>
          실제 비용은 다양한 요인에 따라 달라질 수 있으므로, 최종 예산 계획 시
          이 점을 고려해 주시기 바랍니다.
        </div>
      </c.WarningTextContainer>
    </c.WarningContainer>
  )
}

export default ReportWarning
