import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
// import userStore from '@src/stores/userStore'
import { logoutUser } from '@src/api/userApi'

const LogoutContainer = () => {
  const [, , removeCookie] = useCookies(['accessToken'])
  const navigate = useNavigate()

  // 로그아웃
  const { mutate: LogoutUser } = useMutation({
    mutationKey: ['logoutUser'],
    mutationFn: logoutUser,
    onSuccess: () => {
      // 쿠키에서 accessToken 삭제
      removeCookie('accessToken')

      // 로컬 스토리지에서 memberInfo 삭제
      localStorage.removeItem('memberInfo')

      console.log('로그아웃성공! 메인페이지로 리다이렉트합니다.')

      // 메인페이지로 리다이렉트
      navigate('/')
    },
  })

  const handleLogoutUser = () => {
    LogoutUser()
  }

  return <div onClick={handleLogoutUser}>로그아웃 버튼</div>
}

export default LogoutContainer
