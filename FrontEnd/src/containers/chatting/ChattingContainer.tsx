import * as c from '@src/containers/community/CommunityContainerStyle'
import * as d from '@src/containers/chatting/ChattingContainerStyle'

import { Outlet } from 'react-router-dom'
import ChattingNavbar from '@src/components/chatting/ChattingNavbar'

const ChattingContainer = () => {
  return (
    <c.Container>
      <d.SideBar>
        <ChattingNavbar />
      </d.SideBar>
      <c.MarginLeft>
        <c.Context>
          {/* 하위 페이지 */}
          <Outlet />
        </c.Context>
      </c.MarginLeft>
    </c.Container>
  )
}

export default ChattingContainer
