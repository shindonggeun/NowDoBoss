import { CookiesProvider } from 'react-cookie'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from '@src/common/Header.tsx'
import MainPage from '@src/pages/MainPage.tsx'
import SignUpPage from '@src/pages/SignUpPage.tsx'
import AnalysisPage from '@src/pages/AnalysisPage.tsx'
import CommunityPage from '@src/pages/CommunityPage'

function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/community" element={<CommunityPage />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  )
}

export default App
