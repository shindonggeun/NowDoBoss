import { CookiesProvider } from 'react-cookie'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from '@src/common/Header'
import MainPage from '@src/pages/MainPage'
import SignUpPage from '@src/pages/SignUpPage'
import CommunityPage from '@src/pages/CommunityPage'
import CommunityRegisterPage from '@src/pages/CommunityRegisterPage'
import CommunityEditPage from '@src/pages/CommunityEditPage'
import CommunityDetailPage from '@src/pages/CommunityDetailPage'
import LoginPage from '@src/pages/LoginPage'
import StatusPage from '@src/pages/StatusPage'

function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route
            path="/community/register"
            element={<CommunityRegisterPage />}
          />
          <Route path="/community/edit" element={<CommunityEditPage />} />
          <Route
            path="/community/:community_id"
            element={<CommunityDetailPage />}
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  )
}

export default App
