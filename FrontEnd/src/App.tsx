import { CookiesProvider } from 'react-cookie'
import {BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "@src/pages/MainPage.tsx";

function App() {
  return (
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
  )
}

export default App
