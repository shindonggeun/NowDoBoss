import { CookiesProvider } from 'react-cookie'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from '@src/common/Header'
import MainPage from '@src/pages/MainPage'
import SignUpPage from '@src/pages/SignUpPage'
import LoginPage from '@src/pages/LoginPage'
import SocialLoadingPage from '@src/pages/SocialLoadingPage'
import ProfilePage from '@src/pages/ProfilePage'
import BookmarksPage from '@src/pages/BookmarksPage'
import SettingsPage from '@src/pages/SettingsPage'
import EditProfilePage from '@src/pages/EditProfilePage'
import ChangePasswordPage from '@src/pages/ChangePasswordPage'
import WithdrawPage from '@src/pages/WithdrawPage'
import CommunityPage from '@src/pages/CommunityPage'
import CommunityRegisterPage from '@src/pages/CommunityRegisterPage'
import CommunityDetailPage from '@src/pages/CommunityDetailPage'
import StatusPage from '@src/pages/StatusPage'
import AnalysisPage from '@src/pages/AnalysisPage'
import RecommendPage from '@src/pages/RecommendPage'
import SimulationPage from '@src/pages/SimulationPage'
import SimulationReportPage from '@src/pages/SimulationReportPage'
import ChattingPage from '@src/pages/ChattingPage'
import CommunityListPage from '@src/pages/CommunityListPage'
import { useEffect } from 'react'

function App() {
  function setScreenSize() {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  useEffect(() => {
    setScreenSize()
  })

  return (
    <CookiesProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* 회원 */}
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/member/loading/:provider"
            element={<SocialLoadingPage />}
          />
          <Route path="/profile/*" element={<ProfilePage />}>
            <Route path="bookmarks" element={<BookmarksPage />} />
            <Route path="settings/*" element={<SettingsPage />}>
              <Route path="edit" element={<EditProfilePage />} />
              <Route path="change-password" element={<ChangePasswordPage />} />
              <Route path="withdraw" element={<WithdrawPage />} />
            </Route>
          </Route>
          {/* 상권 */}
          <Route path="/status" element={<StatusPage />} />
          <Route path="/analysis" element={<AnalysisPage />}>
            <Route path="simulation" element={<SimulationPage />} />
            <Route
              path="simulation/report"
              element={<SimulationReportPage />}
            />
          </Route>
          <Route path="/recommend" element={<RecommendPage />} />
          <Route path="/simulation" element={<SimulationPage />} />
          <Route path="/simulation/report" element={<SimulationReportPage />} />
          {/* 커뮤니티 */}
          <Route path="/community/*" element={<CommunityPage />}>
            <Route path="list" element={<CommunityListPage />} />
            <Route path="register" element={<CommunityRegisterPage />} />
            <Route path=":communityId" element={<CommunityDetailPage />} />
            <Route path="chatting/:roomId" element={<ChattingPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  )
}

export default App
