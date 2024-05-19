import * as c from '@src/components/styles/chatting/ChattingNavbarStyle'
import { useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchMyRooms } from '@src/api/chattingApi'
import { useDebounce } from 'use-debounce'
import { useNavigate, useParams } from 'react-router-dom'

const ChatSearchBar = () => {
  const navigate = useNavigate()
  const { roomId } = useParams()
  const [userId, setUserId] = useState(0)
  // 마지막 카드의 아이디값
  const [lastId, setLastId] = useState<number>(0)
  const [searchContent, setSearchContent] = useState<string>('')
  const [debouncedSearchContent] = useDebounce(searchContent, 500)
  const inputRef = useRef<HTMLInputElement>(null)
  // 화면 크기 제한을 위한 상태관리
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const modalRef = useRef<HTMLDivElement | null>(null)

  const updateMedia = () => {
    setIsMobile(window.innerWidth <= 992)
  }

  useEffect(() => {
    window.addEventListener('resize', updateMedia)
    return () => window.removeEventListener('resize', updateMedia)
  }, [])

  useEffect(() => {
    const userInfo = window.localStorage.getItem('memberInfo')
    if (userInfo) {
      const user = JSON.parse(userInfo)
      setUserId(user.id)
    }
  }, [])

  const lastCardRef = useRef(null)
  const [hasMoreData, setHasMoreData] = useState(true)
  const [articleList, setArticleList] = useState<
    { id: number; name: string }[]
  >([])

  // 내 채팅방 목록 불러오는 로직
  const { data } = useQuery({
    queryKey: ['fetchMyRooms', lastId, debouncedSearchContent],
    queryFn: () =>
      fetchMyRooms({ lastId, searchContent: debouncedSearchContent }),
    enabled: !!userId || hasMoreData,
  })

  useEffect(() => {
    if (data && inputRef.current !== null) {
      inputRef.current.focus()
    }
  }, [data])

  // 가져온 값으로 채우기
  useEffect(() => {
    if (data?.dataBody) {
      setArticleList([])
      setArticleList(prevArticleList => [...prevArticleList, ...data.dataBody])
    }
  }, [data])

  useEffect(() => {
    const currentRef = lastCardRef.current
    const observer = new IntersectionObserver(
      async entries => {
        // ref가 존재하는지 (배열이 존재하는지) + 가져온 데이터가 빈 배열인지
        if (entries[0].isIntersecting && hasMoreData) {
          setLastId(articleList[articleList.length - 1].id)
          const newArticles = await fetchMyRooms({ lastId, searchContent })

          if (!newArticles.dataBody.length) {
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
  }, [articleList, hasMoreData, lastCardRef, lastId, searchContent])

  // 카드 목록 반복하는 로직 재사용을 위한 분리
  const renderChatCards = () =>
    articleList.map((chatCard: { id: number; name: string }, index: number) => {
      const isLastElement =
        index === articleList.length - 1 && articleList.length >= 8
      return (
        <c.ChatCard
          ref={isLastElement ? lastCardRef : null}
          key={chatCard.id}
          $isChoice={roomId === chatCard.id.toString()}
          onClick={() => {
            setIsOpen(false)
            navigate(`/chatting/${chatCard.id}`)
          }}
        >
          <c.Text>{chatCard.name}</c.Text>
        </c.ChatCard>
      )
    })

  // 작은 화면일 때 모달 이외의 부분을 누르면 해당 컴포넌트 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <c.Div>
      <c.RowDiv>
        <c.Group>
          <c.InputIcon viewBox="0 0 24 24">
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
          </c.InputIcon>
          <c.Input
            ref={inputRef}
            placeholder="채팅방 검색하기"
            type="search"
            value={searchContent}
            onClick={() => setIsOpen(!isOpen)}
            onChange={e => setSearchContent(e.target.value)}
          />
        </c.Group>
        {Array.isArray(articleList) &&
          articleList.length > 0 &&
          (isMobile ? (
            isOpen && (
              <c.ChatListDiv ref={modalRef}>{renderChatCards()}</c.ChatListDiv>
            )
          ) : (
            <c.ChatListColDiv>{renderChatCards()}</c.ChatListColDiv>
          ))}
      </c.RowDiv>
    </c.Div>
  )
}
export default ChatSearchBar
