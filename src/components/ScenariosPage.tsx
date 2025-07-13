import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GLBViewer from './GLBViewer';

interface ScenariosPageProps {
  language: string;
  onLanguageChange: (newLanguage: 'en' | 'ar') => void;
}

const ScenariosPage: React.FC<ScenariosPageProps> = ({ language, onLanguageChange }) => {
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const scenarios = {
    en: {
      title: "Scenarios Simulation",
      backToMain: "Back to Main",
      overheating: "Simulate Server Overheating",
      waterLeak: "Simulate Water Leak",
      powerOutage: "Simulate Power Outage",
      vibration: "Simulate Vibration Alert",
      reset: "Reset Simulation",
      instructions: "Select a scenario to see problem indicators appear automatically on the model"
    },
    ar: {
      title: "محاكاة السيناريوهات",
      backToMain: "العودة للرئيسية",
      overheating: "محاكاة ارتفاع حرارة الخادم",
      waterLeak: "محاكاة تسريب المياه",
      powerOutage: "محاكاة انقطاع الكهرباء",
      vibration: "محاكاة تنبيه الاهتزاز",
      reset: "إعادة تعيين المحاكاة",
      instructions: "اختر سيناريو لرؤية مؤشرات المشاكل تظهر تلقائيًا على النموذج"
    }
  };

  const texts = scenarios[language as keyof typeof scenarios];

  const toggleLanguage = (lang: 'en' | 'ar') => {
    onLanguageChange(lang);
    setShowLanguageMenu(false);
  };

  const handleScenarioClick = (scenario: string) => {
    setActiveScenario(activeScenario === scenario ? null : scenario);
  };

  const getAlertMessage = () => {
    switch (activeScenario) {
      case 'overheating':
        return language === 'en' 
          ? "⚠ Critical: ServerRack1 temperature exceeding 85°C"
          : "⚠ تحذير حرج: درجة حرارة الخادم1 تتجاوز 85°م";
      case 'waterLeak':
        return language === 'en' 
          ? "⚠ Water Leak Detected"
          : "⚠ تم اكتشاف تسريب مياه";
      case 'powerOutage':
        return language === 'en' 
          ? "⚠ Warning: Power disruption detected in Zone A"
          : "⚠ تحذير: تم اكتشاف انقطاع في الكهرباء في المنطقة أ";
      case 'vibration':
        return language === 'en' 
          ? "⚠ Abnormal Vibration: Equipment instability detected"
          : "⚠ اهتزاز غير طبيعي: تم اكتشاف عدم استقرار المعدات";
      default:
        return null;
    }
  };

  return (
    <div className={`scenarios-page ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="scenarios-header">
        <Link to="/" className="back-btn">
          {texts.backToMain}
        </Link>
        <h1 className="page-title">{texts.title}</h1>
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
      </div>
      
      <div className="viewer-container">
        <GLBViewer 
          modelUrl="/models/data_center_model.glb"
          activeScenario={activeScenario} 
        />
      </div>
      
      <div className="scenarios-controls">
        <div className="scenario-buttons">
          <button 
            className={`scenario-btn ${activeScenario === 'overheating' ? 'active' : ''}`}
            onClick={() => handleScenarioClick('overheating')}
          >
            {texts.overheating}
          </button>
          
          <button 
            className={`scenario-btn ${activeScenario === 'waterLeak' ? 'active' : ''}`}
            onClick={() => handleScenarioClick('waterLeak')}
          >
            {texts.waterLeak}
          </button>
          
          <button 
            className={`scenario-btn ${activeScenario === 'powerOutage' ? 'active' : ''}`}
            onClick={() => handleScenarioClick('powerOutage')}
          >
            {texts.powerOutage}
          </button>
          
          <button 
            className={`scenario-btn ${activeScenario === 'vibration' ? 'active' : ''}`}
            onClick={() => handleScenarioClick('vibration')}
          >
            {texts.vibration}
          </button>
          
          <button 
            className="scenario-btn reset-btn"
            onClick={() => setActiveScenario(null)}
          >
            {texts.reset}
          </button>
        </div>
        
        {getAlertMessage() && (
          <div className="alert-message">
            {getAlertMessage()}
          </div>
        )}
        
        {activeScenario && (
          <div className="instructions">
            <p>{texts.instructions}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScenariosPage; 