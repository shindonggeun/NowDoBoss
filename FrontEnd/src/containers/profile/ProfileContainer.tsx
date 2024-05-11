import { Outlet } from 'react-router-dom'
import Profile from '@src/components/profile/Profile'
import SideBar from '@src/components/profile/SideBar'
import * as p from '@src/containers/profile/ProfileContainerStyle'
import { getMemberInfoData } from '@src/api/profileApi'
import { useQuery } from '@tanstack/react-query'

const ProfileContainer = () => {
  const { data: MemberInfoData, isSuccess } = useQuery({
    queryKey: ['GetMemberInfoData'],
    queryFn: () => getMemberInfoData(),
  })

  return (
    <p.Container>
      <p.LeftWrap>
        {isSuccess && <Profile MemberInfoData={MemberInfoData.dataBody} />}
        <SideBar />
      </p.LeftWrap>
      <p.RightWrap>
        <Outlet />
      </p.RightWrap>
    </p.Container>
  )
}

export default ProfileContainer
