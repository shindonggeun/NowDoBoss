import * as i from '@src/containers/main/MainIntroContainerStyle'
import { useNavigate } from 'react-router-dom'

const MainIntroContainer = () => {
  const navigate = useNavigate()
  return (
    <i.Container>
      <i.Main>
        <i.MainContent>
          서울시 상권을 한눈에!
          <br />
          상권분석의 A부터 Z 까지, 나도보스와 함께하세요.
        </i.MainContent>
        <i.ButtonDiv>
          <i.MainButton
            onClick={() => {
              navigate('/analysis')
            }}
          >
            상권 분석하기
          </i.MainButton>
          <i.MainButton>이용 가이드</i.MainButton>
        </i.ButtonDiv>
      </i.Main>
      <i.Sub>
        <i.SubContent>
          모든 상권 정보를 손끝에서 파악하고 최적의 입지를 발견하세요.
          <br />
          지금까지 없었던 직관적이고 혁신적인 상권 분석 서비스,
          <br />
          저희와 함께라면 당신의 창업 준비 과정이 변화될 것입니다.
          <br />
          상권 추천부터 창업 시뮬레이션까지, 예비 창업자의 든든한 동반자가 되어
          드립니다.
        </i.SubContent>
      </i.Sub>
    </i.Container>
  )
}
export default MainIntroContainer
