import Title from '@src/components/profile/Title'
import TabBar from '@src/components/profile/TabBar'
import { Outlet } from 'react-router-dom'

const BookmarksContainer = () => {
  const tabs = [
    // { label: '전체', path: '/profile/bookmarks' },
    { label: '상권분석', path: '/profile/bookmarks/analysis' },
    { label: '상권추천', path: '/profile/bookmarks/recommend' },
    { label: '창업시뮬레이션', path: '/profile/bookmarks/simulation' },
  ]

  return (
    <div>
      <Title title="북마크" />
      <TabBar tabs={tabs} />
      <Outlet />
    </div>
  )
}

export default BookmarksContainer
