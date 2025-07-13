import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import ScenariosPage from './components/ScenariosPage';
import IoTDashboard from './components/IoTDashboard';
import PredictiveAnalytics from './components/PredictiveAnalytics';
import CoolingAdvisor from './components/CoolingAdvisor';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const handleLogin = (loginStatus: boolean, selectedLanguage: 'en' | 'ar') => {
    setIsLoggedIn(loginStatus);
    setLanguage(selectedLanguage);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLanguage('en');
  };

  const handleLanguageChange = (newLanguage: 'en' | 'ar') => {
    setLanguage(newLanguage);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className={`app ${language === 'ar' ? 'rtl' : ''}`}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage language={language} onLogout={handleLogout} />} />
          <Route path="/scenarios" element={<ScenariosPage language={language} onLanguageChange={handleLanguageChange} />} />
          <Route path="/iot-dashboard" element={<IoTDashboard language={language} />} />
          <Route path="/predictive-analytics" element={<PredictiveAnalytics language={language} />} />
          <Route path="/cooling-advisor" element={<CoolingAdvisor language={language} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
