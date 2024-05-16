import * as a from '@src/components/styles/community/CommunityStyle'
import * as c from '@src/components/styles/chatting/ChattingListStyle'
import useCommunityStore from '@src/stores/communityStore'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { enterChatRoom, fetchChattingList } from '@src/api/chattingApi'
import { ChatListType } from '@src/types/ChattingType'
import NotLogin from '@src/common/swal/NotLogin'
import { subscribeTopic } from '@src/api/fcmApi'
import firebase from 'firebase'
import Swal from 'sweetalert2'

// 로그인 한 사용자인지 확인
const userLoggedIn = localStorage.getItem('isLogIn') === 'true'

const ChattingList = () => {
  const { categories } = useCommunityStore(state => ({
    categories: state.categories,
  }))
  const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: ['fetchChattingList'],
    queryFn: () => fetchChattingList(0),
  })

  // 방 들어갈 때 토픽 구독 로직
  const { mutate: subscribeTopicMutation } = useMutation({
    mutationKey: ['subscribeTopic'],
    mutationFn: subscribeTopic,
  })

  const messaging = firebase.messaging()
  const firebaseMessage = async (chatRoomId: number) => {
    try {
      const permission = await Notification.requestPermission()

      if (permission === 'granted') {
        console.log('Notification permission granted.')

        // FCM 토큰을 가져옵니다.
        messaging
          .getToken()
          .then(token => {
            console.log('Token:', token)
            subscribeTopicMutation({ token, topic: String(chatRoomId) })
          })
          .catch(err => {
            console.error('Token retrieval failed:', err)
          })
      } else {
        console.log('Unable to get permission to notify.')
      }
    } catch (error) {
      console.error('Permission request failed', error)
    }
  }

  // 채팅방 입장 mutate 로직
  const { mutate: mutateEnterChatRoom } = useMutation({
    mutationFn: enterChatRoom,
    onSuccess: res => {
      // 성공이면
      if (res.dataHeader.successCode === 0) {
        navigate(`/chatting/${res.dataBody.chatRoomId}`)
      } else {
        Swal.fire({
          title: res.dataHeader.resultMessage,
          icon: 'warning',
          confirmButtonText: '확인',
        })
      }
    },
  })

  const handleClickCard = (chatRoomId: number) => {
    if (userLoggedIn) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      mutateEnterChatRoom(chatRoomId)
      firebaseMessage(chatRoomId)
      navigate(`/chatting/${chatRoomId}`)
    } else {
      NotLogin(navigate)
    }
  }

  return (
    <a.Container>
      {/*  게시글 목록 */}
      <a.ArticlesContainer>
        {data && !isLoading
          ? data.dataBody?.map((article: ChatListType) => {
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
                  key={article.chatRoomId}
                  onClick={() => {
                    handleClickCard(article.chatRoomId)
                  }}
                >
                  <a.Header>
                    <a.Profile>
                      <c.Title>{article.name}</c.Title>
                    </a.Profile>
                    <c.Div>
                      <c.Content>
                        <a.Category>
                          <a.Icon src={iconSrc} />
                          <a.VisibleName>{categoryKorean}</a.VisibleName>
                        </a.Category>
                      </c.Content>
                      <c.Content>
                        <a.VisibleName>멤버수</a.VisibleName>
                        {article.memberCount} / {article.limit}
                      </c.Content>
                    </c.Div>
                  </a.Header>
                </a.ArticleContainer>
              )
            })
          : ''}
      </a.ArticlesContainer>
    </a.Container>
  )
}

export default ChattingList
