import * as s from '@src/components/styles/community/CommunityDetailStyle'
import { useNavigate } from 'react-router-dom'
import useCommunityStore from '@src/stores/communityStore'
import { PopularType } from '@src/types/ChattingType'

type SubContentPropsType = {
  title: string
  data: PopularType[]
}

const SubContent = (props: SubContentPropsType) => {
  const { title, data } = props
  const categories = useCommunityStore(state => state.categories)
  const navigate = useNavigate()

  // 커뮤니티 상세에서 상세로 이동하면 갱신이 되지 않아서 새로고침 로직 및 스크롤 위로 이동 추가
  const handleCardClick = (communityId: number) => {
    navigate(`/community/${communityId}`) // 새 페이지로 이동
    window.scrollTo({ top: 0, behavior: 'instant' })
    window.location.reload()
  }

  return (
    <s.Container>
      <s.SameCategoryList>
        <s.TabName>{title}</s.TabName>
        {data?.slice(0, 3).map(article => {
          // 카테고리 이미지를 find 함수를 사용해 category name 과 일치하는 이미지 불러오기
          const matchedCategory = categories.find(
            category => category.value === article.category,
          )

          const iconSrc = matchedCategory ? matchedCategory.iconInactive : ''
          return (
            <s.AnotherCard
              key={article.communityId}
              onClick={() => handleCardClick(article.communityId)}
            >
              <s.ProfileDiv>
                <s.UserProfileImg src={article.profileImage} />
                <s.Div>
                  <s.UserName>{article.writerNickname}</s.UserName>
                  <s.SubContent>
                    <s.Icon src={iconSrc} />
                    {matchedCategory?.name}
                  </s.SubContent>
                </s.Div>
              </s.ProfileDiv>
              <s.SubCardContent>
                <s.SubCardTitle>{article.title}</s.SubCardTitle>
                <s.SubCardDetail>{article.content}</s.SubCardDetail>
                <s.GotoCard>게시글 보러가기 -{'>'}</s.GotoCard>
              </s.SubCardContent>
            </s.AnotherCard>
          )
        })}
      </s.SameCategoryList>
    </s.Container>
  )
}

export default SubContent
