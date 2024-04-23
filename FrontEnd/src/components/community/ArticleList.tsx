import * as a from '@src/components/styles/community/CommunityStyle'

const ArticleList = () => {
  return (
    <a.Container>
      {/* 상단 */}
      <a.Context>
        <a.LeftGrid>
          <a.Title>커뮤니티 목록</a.Title>
          <a.Sub>다양한 목적의 게시글을 올릴 수 있어요.</a.Sub>
        </a.LeftGrid>
        <a.CreateButton>게시글 작성하기</a.CreateButton>
      </a.Context>
      {/*  게시글 목록 */}
      <a.ArticleContainer>
        <a.CategoryBadge>커뮤니티</a.CategoryBadge>
        <a.CardTitle>강동구에 창업하신 사장님들께 질문드립니다..</a.CardTitle>
        <a.CardContent>
          사장님들 안녕하신가요, 저는 강동구에 창업하기 위해 준비중인 예비
          창업자입니다. 요즘 고민이 있는데요, 자금이 넉넉치 못해 월세가
          저렴하면서 폐업률이 낮은 상권이 어디가 있을까요..? 그리고...
        </a.CardContent>
        <a.CardCategory>
          <a.Icon src="src/assets/three_line.svg" />
          창업고민
        </a.CardCategory>
        <a.CardSubContent>조회수 12 ∙ 댓글 1</a.CardSubContent>
      </a.ArticleContainer>
      <a.ArticleContainer>
        <a.CategoryBadge>커뮤니티</a.CategoryBadge>
        <a.CardTitle>강동구에 창업하신 사장님들께 질문드립니다..</a.CardTitle>
        <a.CardContent>
          사장님들 안녕하신가요, 저는 강동구에 창업하기 위해 준비중인 예비
          창업자입니다. 요즘 고민이 있는데요, 자금이 넉넉치 못해 월세가
          저렴하면서 폐업률이 낮은 상권이 어디가 있을까요..? 그리고...
        </a.CardContent>
        <a.CardCategory>
          <a.Icon src="src/assets/three_line.svg" />
          창업고민
        </a.CardCategory>
        <a.CardSubContent>조회수 12 ∙ 댓글 1</a.CardSubContent>
      </a.ArticleContainer>
    </a.Container>
  )
}

export default ArticleList
