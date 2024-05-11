import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import userStore from '@src/stores/userStore'
import { logoutUser } from '@src/api/userApi'

const LogoutContainer = () => {
  const setMemberInfo = userStore(state => state.setMemberInfo)
  const [, , removeCookie] = useCookies(['accessToken'])
  const navigate = useNavigate()

  // 로그아웃
  const { mutate: LogoutUser } = useMutation({
    mutationKey: ['logoutUser'],
    mutationFn: logoutUser,
    onSuccess: () => {
      // 쿠키에서 accessToken 삭제
      removeCookie('accessToken')

      // 로컬 스토리지에서 memberInfo 및 로그인 여부 삭제
      localStorage.removeItem('memberInfo')
      localStorage.removeItem('isLogIn')

      // 회원정보 상태관리 초기화
      setMemberInfo({
        id: null,
        name: '',
        nickname: '',
        email: '',
        profileImage: null,
        provider: null,
        role: '',
      })

      // 메인페이지로 리다이렉트
      navigate('/')
    },
  })

  const handleLogoutUser = () => {
    LogoutUser()
  }

  return <p onClick={handleLogoutUser}>로그아웃</p>
}

export default LogoutContainer
