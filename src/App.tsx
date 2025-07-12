import { useState } from 'react'
import './App.css'
import GLBViewer from './components/GLBViewer'
import LoginPage from './components/LoginPage'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsLoggedIn(true)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Digital Command Center</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>
      
      <main className="app-main">
        <GLBViewer 
          modelUrl="/models/data_center_model.glb"
          width="100%" 
          height="80vh"
        />
      </main>
    </div>
  )
}

export default App
