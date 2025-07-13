import React from 'react';
import { useNavigate } from 'react-router-dom';
import GLBViewer from './GLBViewer';

interface MainPageProps {
  language: 'en' | 'ar';
  onLogout: () => void;
}

const MainPage: React.FC<MainPageProps> = ({ language, onLogout }) => {
  const navigate = useNavigate();

  const translations = {
    en: {
      title: 'Data Center Digital Twin',
      subtitle: 'Advanced Monitoring & Control System',
      scenarios: 'Scenarios',
      iotCommand: 'IoT Command Center',
      analytics: 'Analytics',
      coolingAdvisor: 'Cooling Advisor',
      maintenance: 'Maintenance',
      scenariosDesc: 'Simulate emergency scenarios and test response protocols',
      iotDesc: 'Real-time monitoring of sensors, equipment, and security systems',
      analyticsDesc: 'AI-powered predictive analytics and equipment failure forecasting',
      coolingAdvisorDesc: 'AI-powered cooling optimization and energy management system',
      maintenanceDesc: 'Equipment maintenance scheduling and tracking (Coming Soon)',
      logout: 'Logout'
    },
    ar: {
      title: 'التوأم الرقمي لمركز البيانات',
      subtitle: 'نظام المراقبة والتحكم المتقدم',
      scenarios: 'السيناريوهات',
      iotCommand: 'مركز قيادة إنترنت الأشياء',
      analytics: 'التحليلات',
      coolingAdvisor: 'مستشار التبريد الذكي',
      maintenance: 'الصيانة',
      scenariosDesc: 'محاكاة سيناريوهات الطوارئ واختبار بروتوكولات الاستجابة',
      iotDesc: 'المراقبة الفورية للمستشعرات والمعدات وأنظمة الأمان',
      analyticsDesc: 'التحليلات التنبؤية المدعومة بالذكاء الاصطناعي وتوقع أعطال المعدات',
      coolingAdvisorDesc: 'نظام تحسين التبريد الذكي وإدارة الطاقة المدعوم بالذكاء الاصطناعي',
      maintenanceDesc: 'جدولة وتتبع صيانة المعدات (قريباً)',
      logout: 'تسجيل الخروج'
    }
  };

  const t = translations[language];

  const handleScenariosClick = () => {
    navigate('/scenarios');
  };

  const handleIoTClick = () => {
    navigate('/iot-dashboard');
  };

  const handleAnalyticsClick = () => {
    navigate('/predictive-analytics');
  };

  const handleCoolingAdvisorClick = () => {
    navigate('/cooling-advisor');
  };

  return (
    <div className="main-page" style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
      <div className="app-header">
        <h1>{t.title}</h1>
        <button className="logout-btn" onClick={onLogout}>
          {t.logout}
        </button>
      </div>

      <div className="app-main">
        <div className="viewer-container">
          <GLBViewer modelUrl="/models/data_center_model.glb" activeScenario={null} />
        </div>
        
        <div className="main-controls">
          <div className="main-title">
            <h2>{t.subtitle}</h2>
          </div>
          
          <div className="feature-buttons">
            <button 
              className="feature-btn"
              onClick={handleScenariosClick}
            >
              <div className="feature-content">
                <h3>{t.scenarios}</h3>
                <p>{t.scenariosDesc}</p>
              </div>
            </button>

            <button 
              className="feature-btn"
              onClick={handleIoTClick}
            >
              <div className="feature-content">
                <h3>{t.iotCommand}</h3>
                <p>{t.iotDesc}</p>
              </div>
            </button>

            <button 
              className="feature-btn"
              onClick={handleAnalyticsClick}
            >
              <div className="feature-content">
                <h3>{t.analytics}</h3>
                <p>{t.analyticsDesc}</p>
              </div>
            </button>

            <button 
              className="feature-btn"
              onClick={handleCoolingAdvisorClick}
            >
              <div className="feature-content">
                <h3>{t.coolingAdvisor}</h3>
                <p>{t.coolingAdvisorDesc}</p>
              </div>
            </button>

            <button 
              className="feature-btn disabled"
            >
              <div className="feature-content">
                <h3>{t.maintenance}</h3>
                <p>{t.maintenanceDesc}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage; 