import * as s from '@src/components/styles/community/CommunityDetailStyle'
import { useNavigate } from 'react-router-dom'
import useCommunityStore from '@src/stores/communityStore'

const SubContent = () => {
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
      userImg: '',
      userName: '대박나자',
    },
    {
      id: 2,
      // badge: '커뮤니티',
      title: '강동구에 창업하신 사장님들께 질문드립니다..',
      content:
        '사장님들 안녕하신가요, 저는 강동구에 창업하기 위해 준비중인 예비창업자입니다. 요즘 고민이 있는데요, 자금이 넉넉치 못해 월세가 저렴하면서 폐업률이 낮은 상권이 어디가 있을까요..? 그리고...',
      category: '창업고민',
      userImg: '',
      userName: '강동사장',
    },
  ]
  return (
    <s.Container>
      <s.SameCategoryList>
        <s.TabName>비슷한 게시글</s.TabName>
        {ArticleDatas.map(article => {
          // 카테고리 이미지를 find 함수를 사용해 category name 과 일치하는 이미지 불러오기
          const matchedCategory = categories.find(
            category => category.name === article.category,
          )

          const iconSrc = matchedCategory ? matchedCategory.iconInactive : ''
          return (
            <s.AnotherCard
              key={article.id}
              onClick={() => navigate(`/community/${article.id}`)}
            >
              <s.ProfileDiv>
                <s.UserProfileImg />
                <s.UserName>{article.userName}</s.UserName>
                <s.SubContent>
                  ∙ <s.Icon src={iconSrc} />
                  {article.category}
                </s.SubContent>
              </s.ProfileDiv>
              <s.SubCardContent>
                <s.SubCardTitle>{article.title}</s.SubCardTitle>
                <s.GotoCard>게시글 보러가기 -{'>'}</s.GotoCard>
              </s.SubCardContent>
            </s.AnotherCard>
          )
        })}
      </s.SameCategoryList>

      {/* 인기 게시글 Top3 */}
      <s.SameCategoryList>
        <s.TabName>인기 게시글 Top 3</s.TabName>
        {ArticleDatas.map(article => {
          // 카테고리 이미지를 find 함수를 사용해 category name 과 일치하는 이미지 불러오기
          const matchedCategory = categories.find(
            category => category.name === article.category,
          )

          const iconSrc = matchedCategory ? matchedCategory.iconInactive : ''
          return (
            <s.AnotherCard
              key={article.id}
              onClick={() => navigate(`/community/${article.id}`)}
            >
              <s.ProfileDiv>
                <s.UserProfileImg />
                <s.UserName>{article.userName}</s.UserName>
                <s.SubContent>
                  ∙ <s.Icon src={iconSrc} />
                  {article.category}
                </s.SubContent>
              </s.ProfileDiv>
              <s.SubCardContent>
                <s.SubCardTitle>{article.title}</s.SubCardTitle>
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
