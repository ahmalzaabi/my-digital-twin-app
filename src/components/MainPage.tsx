import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GLBViewer from './GLBViewer';

interface MainPageProps {
  language: string;
  onLogout: () => void;
  onLanguageChange: (newLanguage: 'en' | 'ar') => void;
}

const MainPage: React.FC<MainPageProps> = ({ language, onLogout, onLanguageChange }) => {
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const content = {
    en: {
      title: "Digital Twin Control Center",
      scenarios: "🎯 Scenarios",
      futureFeature1: "📊 Analytics",
      futureFeature2: "🔧 Maintenance",
      futureFeature3: "📈 Reports",
      logout: "Logout"
    },
    ar: {
      title: "مركز التحكم بالتوأم الرقمي",
      scenarios: "🎯 السيناريوهات",
      futureFeature1: "📊 التحليلات",
      futureFeature2: "🔧 الصيانة",
      futureFeature3: "📈 التقارير",
      logout: "تسجيل الخروج"
    }
  };

  const texts = content[language as keyof typeof content];

  const toggleLanguage = (lang: 'en' | 'ar') => {
    onLanguageChange(lang);
    setShowLanguageMenu(false);
  };

  return (
    <div className={`main-page ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="page-header">
        <div className="language-switcher">
          <button 
            className="lang-button"
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
          >
            {language.toUpperCase()}
          </button>
          {showLanguageMenu && (
            <div className="language-menu">
              <button 
                className={`lang-option ${language === 'en' ? 'active' : ''}`}
                onClick={() => toggleLanguage('en')}
              >
                EN
              </button>
              <button 
                className={`lang-option ${language === 'ar' ? 'active' : ''}`}
                onClick={() => toggleLanguage('ar')}
              >
                AR
              </button>
            </div>
          )}
        </div>
        
        <button className="logout-btn" onClick={onLogout}>
          {texts.logout}
        </button>
      </div>
      
      <div className="viewer-container">
        <GLBViewer modelUrl="/models/data_center_model.glb" />
      </div>
      
      <div className="main-controls">
        <h2 className="main-title">{texts.title}</h2>
        
        <div className="feature-buttons">
          <Link to="/scenarios" className="feature-btn active">
            {texts.scenarios}
          </Link>
          
          <button className="feature-btn disabled" disabled>
            {texts.futureFeature1}
          </button>
          
          <button className="feature-btn disabled" disabled>
            {texts.futureFeature2}
          </button>
          
          <button className="feature-btn disabled" disabled>
            {texts.futureFeature3}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage; 