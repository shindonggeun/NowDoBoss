import Swal from 'sweetalert2'
import { NavigateFunction } from 'react-router-dom'

// navigate 보내면 됩니다.
// 함수 내부에서 const 불가능
const NotLogin = async (navigate: NavigateFunction) => {
  await Swal.fire({
    title: '로그인 후 사용하실 수 있습니다.',
    text: '로그인하여 다양한 서비스를 이용하세요.',
    icon: 'warning',
    confirmButtonText: '확인',
  })
  navigate('/login')
}

export default NotLogin
