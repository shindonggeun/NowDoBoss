import * as a from '@src/components/styles/community/CommunityStyle'
import useCommunityStore from '@src/stores/communityStore'
import { useNavigate } from 'react-router-dom'
import { CommunityListData } from '@src/types/CommunityType'
import { useEffect, useRef, useState } from 'react'
import { fetchCommunityList } from '@src/api/communityApi'

export type ArticleListPropsType = {
  initialArticleList: CommunityListData
}

const ArticleList = (props: ArticleListPropsType) => {
  const { initialArticleList } = props
  const { categories, category } = useCommunityStore(state => ({
    categories: state.categories,
    category: state.selectedCategory,
  }))
  const navigate = useNavigate()

  const lastCardRef = useRef(null)
  const [articleList, setArticleList] = useState(initialArticleList)
  const [hasMoreData, setHasMoreData] = useState(true)

  useEffect(() => {
    const currentRef = lastCardRef.current

    const observer = new IntersectionObserver(
      async entries => {
        if (entries[0].isIntersecting && hasMoreData) {
          const lastId = articleList[articleList.length - 1].communityId
          const newArticles = await fetchCommunityList(category.value, lastId)
          if (!newArticles.dataBody[0]) {
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
  }, [lastCardRef, articleList, hasMoreData, category.value])

  useEffect(() => {
    // If the fetched articleList is empty, set hasMoreData to false
    if (articleList.length === 0) {
      setHasMoreData(false)
    }
  }, [articleList])

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

            const isLastElement = index === articleList.length - 1

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
                    <a.ProfileImg
                      src={
                        article.profileImage ? article.profileImage : undefined
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
        ) : (
          <div>더 이상 불러올 데이터가 없습니다.</div>
        )}
      </a.ArticlesContainer>
    </a.Container>
  )
}

export default ArticleList
