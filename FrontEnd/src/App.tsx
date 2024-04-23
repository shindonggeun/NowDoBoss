import { CookiesProvider } from 'react-cookie'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from '@src/common/Header.tsx'
import MainPage from '@src/pages/MainPage.tsx'
import SignUpPage from '@src/pages/SignUpPage.tsx'
import StatusPage from '@src/pages/StatusPage.tsx'
import CommunityPage from '@src/pages/CommunityPage'
import LoginPage from '@src/pages/LoginPage'

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
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  )
}

export default App
