import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '@src/api/userApi'
import Swal from 'sweetalert2'

const LogoutContainer = () => {
  const navigate = useNavigate()

  // 로그아웃
  const { mutate: LogoutUser } = useMutation({
    mutationKey: ['logoutUser'],
    mutationFn: logoutUser,
    onSuccess: () => {
      // 로컬 스토리지에서 memberInfo 및 로그인 여부 삭제
      localStorage.removeItem('memberInfo')
      localStorage.removeItem('isLogIn')

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: toast => {
          const toastElement = toast
          toastElement.onmouseenter = Swal.stopTimer
          toastElement.onmouseleave = Swal.resumeTimer
        },
      })

      Toast.fire({
        icon: 'success',
        title: '성공적으로 로그아웃되었습니다.',
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
