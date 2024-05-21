import { matchPath, useLocation } from 'react-router-dom'
import Header from '@src/containers/header/HeaderContainer'

// 헤더 사용하지 않는 페이지 예외 적용
const ConditionalHeader = () => {
  const location = useLocation()
  const currentPathname = location.pathname

  if (
    matchPath('/login', currentPathname) ||
    matchPath('/register', currentPathname) ||
    matchPath('/register/general', currentPathname) ||
    matchPath('/account-deleted', currentPathname)
  ) {
    return null
  }
  return <Header />
}

export default ConditionalHeader
