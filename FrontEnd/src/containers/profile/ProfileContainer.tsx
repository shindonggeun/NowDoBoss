import { Outlet } from 'react-router-dom'
import Profile from '@src/components/profile/Profile'
import SideBar from '@src/components/profile/SideBar'
import * as p from '@src/containers/profile/ProfileContainerStyle'
import { getMemberInfoData } from '@src/api/profileApi'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

const ProfileContainer = () => {
  const { data: MemberInfoData, isSuccess } = useQuery({
    queryKey: ['GetMemberInfoData'],
    queryFn: () => getMemberInfoData(),
  })

  useEffect(() => {
    if (isSuccess && MemberInfoData) {
      // 프로필 가져오기 API 성공시, Local Storage의 'memberInfo' 업데이트
      localStorage.setItem(
        'memberInfo',
        JSON.stringify(MemberInfoData.dataBody),
      )
    }
  }, [isSuccess, MemberInfoData])

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
