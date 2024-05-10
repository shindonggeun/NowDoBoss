import { Outlet } from 'react-router-dom'
import Profile from '@src/components/profile/Profile'
import SideBar from '@src/components/profile/SideBar'
import * as p from '@src/containers/profile/ProfileContainerStyle'

const ProfileContainer = () => {
  return (
    <p.Container>
      <p.LeftWrap>
        <Profile />
        <SideBar />
      </p.LeftWrap>
      <p.RightWrap>
        <Outlet />
      </p.RightWrap>
    </p.Container>
  )
}

export default ProfileContainer
