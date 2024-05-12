import * as a from '@src/components/styles/community/CommunityStyle'
import useCommunityStore from '@src/stores/communityStore'
import { useNavigate } from 'react-router-dom'
import { CommunityListData } from '@src/types/CommunityType'

export type ArticleListPropsType = {
  articleList: CommunityListData
}

const ArticleList = (props: ArticleListPropsType) => {
  const { articleList } = props
  const { categories } = useCommunityStore(state => ({
    categories: state.categories,
  }))
  const navigate = useNavigate()

  return (
    <a.Container>
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
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'instant' })
                    navigate(`/community/${article.communityId}`)
                  }}
                >
                  <a.Header>
                    <a.Profile>
                      <a.ProfileImg
                        src={
                          article.profileImage
                            ? article.profileImage
                            : undefined
                        }
                      />
                      <a.ProfileContent>
                        <a.Name>{article.writerNickname}</a.Name>
                        <a.Category>
                          <a.Icon src={iconSrc} />
                          {categoryKorean}
                        </a.Category>
                      </a.ProfileContent>
                    </a.Profile>

                    <a.CardSubContent>
                      조회수 {article.readCount} ∙ 댓글 {article.commentCount}
                    </a.CardSubContent>
                  </a.Header>
                  <a.Body>
                    <a.BodyContent>
                      <a.CardTitle>{article.title}</a.CardTitle>
                      <a.CardContent>{article.content}</a.CardContent>
                    </a.BodyContent>
                    {article.image ? <a.Img src={article.image} /> : ''}
                  </a.Body>
                </a.ArticleContainer>
              )
            })
          : []}
      </a.ArticlesContainer>
    </a.Container>
  )
}

export default ArticleList
