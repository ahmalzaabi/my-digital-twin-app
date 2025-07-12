import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import LoginPage from './components/LoginPage'
import MainPage from './components/MainPage'
import ScenariosPage from './components/ScenariosPage'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [language, setLanguage] = useState<'en' | 'ar'>('en')

  const handleLogin = (success: boolean, selectedLanguage?: 'en' | 'ar') => {
    if (success) {
      setIsLoggedIn(true)
      if (selectedLanguage) {
        setLanguage(selectedLanguage)
      }
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  const handleLanguageChange = (newLanguage: 'en' | 'ar') => {
    setLanguage(newLanguage)
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <Router>
      <div className={`app ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <Routes>
          <Route 
            path="/" 
            element={
              <MainPage 
                language={language} 
                onLogout={handleLogout}
                onLanguageChange={handleLanguageChange}
              />
            } 
          />
          <Route 
            path="/scenarios" 
            element={
              <ScenariosPage 
                language={language}
                onLanguageChange={handleLanguageChange}
              />
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
