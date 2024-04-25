import * as a from '@src/components/styles/community/CommunityStyle'
import useCommunityStore from '@src/stores/communityStore'
import { useNavigate } from 'react-router-dom'
import { CommunityListData } from '@src/types/CommunityType'

export type ArticleListPropsType = {
  articleList: CommunityListData
}

const ArticleList = (props: ArticleListPropsType) => {
  const { articleList } = props
  const categories = useCommunityStore(state => state.categories)
  const navigate = useNavigate()

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
        {Array.isArray(articleList)
          ? articleList.map(article => {
              // 카테고리 이미지를 find 함수를 사용해 category name 과 일치하는 이미지 불러오기
              const matchedCategory = categories.find(
                category => category.value === article.category,
              )
              const iconSrc = matchedCategory
                ? matchedCategory.iconInactive
                : ''
              const categoryKorean = matchedCategory ? matchedCategory.name : ''
              return (
                <a.ArticleContainer
                  key={article.communityId}
                  onClick={() => navigate(`/community/${article.communityId}`)}
                >
                  <a.CategoryBadge>커뮤니티</a.CategoryBadge>
                  <a.CardTitle>{article.title}</a.CardTitle>
                  <a.CardContent>{article.content}</a.CardContent>
                  <a.CardCategory>
                    <a.Icon src={iconSrc} />
                    {categoryKorean}
                  </a.CardCategory>
                  <a.CardSubContent>
                    조회수 {article.readCount} ∙ 댓글 {article.commentCount}
                  </a.CardSubContent>
                </a.ArticleContainer>
              )
            })
          : []}
      </a.ArticlesContainer>
    </a.Container>
  )
}

export default ArticleList
