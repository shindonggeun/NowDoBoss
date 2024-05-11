import Title from '@src/components/profile/Title'
import TabBar from '@src/components/profile/TabBar'

const BookmarksContainer = () => {
  const tabs = [
    { label: '전체', path: '/profile/bookmarks' },
    { label: '상권분석', path: '/profile/bookmarks' },
    { label: '상권추천', path: '/profile/bookmarks' },
    { label: '창업시뮬레이션', path: '/profile/bookmarks' },
  ]

  return (
    <div>
      <Title title="북마크" />
      <TabBar tabs={tabs} />
    </div>
  )
}

export default BookmarksContainer
