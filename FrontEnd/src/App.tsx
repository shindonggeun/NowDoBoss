import { CookiesProvider } from 'react-cookie'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from '@src/common/Header'
import MainPage from '@src/pages/MainPage'
import SignUpPage from '@src/pages/SignUpPage'

function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  )
}

export default App
