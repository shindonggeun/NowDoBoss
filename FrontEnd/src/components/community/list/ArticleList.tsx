import * as a from '@src/components/styles/community/CommunityStyle'
import useCommunityStore from '@src/stores/communityStore'
import { useNavigate } from 'react-router-dom'

const ArticleList = () => {
  const categories = useCommunityStore(state => state.categories)
  const navigate = useNavigate()
  const ArticleDatas = [
    {
      id: 1,
      // badge: '커뮤니티',
      title: '강동구에 창업하신 사장님들께 질문드립니다..',
      content:
        '사장님들 안녕하신가요, 저는 강동구에 창업하기 위해 준비중인 예비창업자입니다. 요즘 고민이 있는데요, 자금이 넉넉치 못해 월세가 저렴하면서 폐업률이 낮은 상권이 어디가 있을까요..? 그리고...',
      category: '창업고민',
      count: 12,
      comment: 2,
    },
    {
      id: 2,
      // badge: '커뮤니티',
      title: '강동구에 창업하신 사장님들께 질문드립니다..',
      content:
        '사장님들 안녕하신가요, 저는 강동구에 창업하기 위해 준비중인 예비창업자입니다. 요즘 고민이 있는데요, 자금이 넉넉치 못해 월세가 저렴하면서 폐업률이 낮은 상권이 어디가 있을까요..? 그리고...',
      category: '창업고민',
      count: 12,
      comment: 2,
    },
  ]

  return (
    <a.Container>
      {/* 상단 */}
      <a.Context>
        <a.LeftGrid>
          <a.Title>커뮤니티 목록</a.Title>
          <a.CreateButton onClick={() => navigate('/community/register')}>
            게시글 작성하기
          </a.CreateButton>
        </a.LeftGrid>
        <a.Sub>다양한 목적의 게시글을 올릴 수 있어요.</a.Sub>
      </a.Context>
      {/*  게시글 목록 */}
      <a.ArticlesContainer>
        {ArticleDatas.map(article => {
          // 카테고리 이미지를 find 함수를 사용해 category name 과 일치하는 이미지 불러오기
          const matchedCategory = categories.find(
            category => category.name === article.category,
          )
          const iconSrc = matchedCategory ? matchedCategory.iconInactive : ''

          return (
            <a.ArticleContainer
              key={article.id}
              onClick={() => navigate(`/community/${article.id}`)}
            >
              <a.CategoryBadge>커뮤니티</a.CategoryBadge>
              <a.CardTitle>{article.title}</a.CardTitle>
              <a.CardContent>{article.content}</a.CardContent>
              <a.CardCategory>
                <a.Icon src={iconSrc} />
                {article.category}
              </a.CardCategory>
              <a.CardSubContent>
                조회수 {article.count} ∙ 댓글 {article.comment}
              </a.CardSubContent>
            </a.ArticleContainer>
          )
        })}
      </a.ArticlesContainer>
    </a.Container>
  )
}

export default ArticleList
