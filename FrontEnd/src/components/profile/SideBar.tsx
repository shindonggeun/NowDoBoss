import * as s from '@src/components/styles/profile/SideBarStyle'

const SideBar = () => {
  return (
    <s.Container>
      <s.MenuItem>북마크</s.MenuItem>
      <s.Divider />
      <s.MenuItem>개인 정보 설정</s.MenuItem>
      <s.MenuItem>비밀번호 변경</s.MenuItem>
      <s.MenuItem>로그아웃</s.MenuItem>
      <s.MenuItem>회원탈퇴</s.MenuItem>
    </s.Container>
  )
}

export default SideBar
