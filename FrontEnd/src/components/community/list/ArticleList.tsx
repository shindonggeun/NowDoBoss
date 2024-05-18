import * as a from '@src/components/styles/community/CommunityStyle'
import useCommunityStore from '@src/stores/communityStore'
import { useNavigate } from 'react-router-dom'
import { CommunityListData } from '@src/types/CommunityType'
import { useEffect, useRef, useState } from 'react'
import { fetchCommunityList } from '@src/api/communityApi'
import { Avatar } from '@mui/joy'

export type ArticleListPropsType = {
  initialArticleList: CommunityListData
  hasMoreData: boolean
  setHasMoreData: React.Dispatch<React.SetStateAction<boolean>>
}

const ArticleList = (props: ArticleListPropsType) => {
  const { initialArticleList, hasMoreData, setHasMoreData } = props
  const { categories, category } = useCommunityStore(state => ({
    categories: state.categories,
    category: state.selectedCategory,
  }))
  const navigate = useNavigate()

  const lastCardRef = useRef(null)
  const [articleList, setArticleList] = useState<CommunityListData>([])

  // 가져온 값으로 채우기
  useEffect(() => {
    setArticleList([])
    setArticleList(prevArticleList => [
      ...prevArticleList,
      ...initialArticleList,
    ])
  }, [initialArticleList])

  useEffect(() => {
    const currentRef = lastCardRef.current
    const observer = new IntersectionObserver(
      async entries => {
        // ref가 존재하는지 (배열이 존재하는지) + 가져온 데이터가 빈 배열인지
        if (entries[0].isIntersecting && hasMoreData) {
          const lastId = articleList[articleList.length - 1].communityId
          const newArticles = await fetchCommunityList(category.value, lastId)

          if (!articleList || !newArticles.dataBody[0]) {
            setHasMoreData(false)
          } else {
            setArticleList(prevArticleList => [
              ...prevArticleList,
              ...newArticles.dataBody,
            ])
          }
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1,
      },
    )

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [lastCardRef, articleList, hasMoreData, category.value, setHasMoreData])

  return (
    <a.Container>
      <a.ArticlesContainer>
        {Array.isArray(articleList) && articleList.length > 0 ? (
          articleList.map((article, index) => {
            // 카테고리 이미지를 find 함수를 사용해 category name 과 일치하는 이미지 불러오기
            const matchedCategory = categories.find(
              findCategory => findCategory.value === article.category,
            )
            const iconSrc = matchedCategory ? matchedCategory.iconInactive : ''
            const categoryKorean = matchedCategory ? matchedCategory.name : ''

            const isLastElement =
              index === articleList.length - 1 && articleList.length >= 5
            return (
              <a.ArticleContainer
                ref={isLastElement ? lastCardRef : null}
                key={article.communityId}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'instant' })
                  navigate(`/community/${article.communityId}`)
                }}
              >
                <a.Header>
                  <a.Profile>
                    {article.profileImage ? (
                      <a.ProfileImg src={article.profileImage} />
                    ) : (
                      <a.AvatarDiv>
                        <Avatar />
                      </a.AvatarDiv>
                    )}
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
        ) : (
          <div />
        )}
      </a.ArticlesContainer>
    </a.Container>
  )
}

export default ArticleList
