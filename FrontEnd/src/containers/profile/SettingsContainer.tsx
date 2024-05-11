import Title from '@src/components/profile/Title'
import TabBar from '@src/components/profile/TabBar'
import { Outlet } from 'react-router-dom'

const SettingsContainer = () => {
  const tabs = [
    { label: '회원 정보 수정', path: '/profile/settings/edit' },
    { label: '비밀번호 변경', path: '/profile/settings/change-password' },
    { label: '회원 탈퇴', path: '/profile/settings/withdraw' },
  ]

  return (
    <div>
      <Title title="개인 정보 설정" />
      <TabBar tabs={tabs} />
      <Outlet />
    </div>
  )
}

export default SettingsContainer
