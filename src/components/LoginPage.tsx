import React, { useState } from 'react';
import './LoginPage.css';

interface LoginPageProps {
  onLogin: (success: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const translations = {
    en: {
      title: 'Digital Command Center',
      subtitle: 'AI-Powered Digital Twin System',
      username: 'Username',
      password: 'Password',
      login: 'Login',
      usernamePlaceholder: 'Enter username',
      passwordPlaceholder: 'Enter password',
      version: 'Advanced Military System - Version 2.1'
    },
    ar: {
      title: 'مركز القيادة الرقمي',
      subtitle: 'نظام التوأم الرقمي المدعوم بالذكاء الاصطناعي',
      username: 'اسم المستخدم',
      password: 'كلمة المرور',
      login: 'تسجيل الدخول',
      usernamePlaceholder: 'أدخل اسم المستخدم',
      passwordPlaceholder: 'أدخل كلمة المرور',
      version: 'نظام عسكري متقدم - النسخة 2.1'
    }
  };

  const t = translations[language];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'test' && password === '123456') {
      onLogin(true);
    } else {
      alert(language === 'en' ? 'Invalid credentials' : 'بيانات غير صحيحة');
    }
  };

  const toggleLanguage = (lang: 'en' | 'ar') => {
    setLanguage(lang);
    setShowLanguageMenu(false);
  };

  const ShieldIcon = () => (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M40 5L65 15V35C65 55 40 70 40 70S15 55 15 35V15L40 5Z"
        stroke="#00D4FF"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="40" cy="30" r="3" fill="#00D4FF" />
      <circle cx="30" cy="40" r="2" fill="#00D4FF" />
      <circle cx="50" cy="40" r="2" fill="#00D4FF" />
      <circle cx="40" cy="50" r="2" fill="#00D4FF" />
      <line x1="40" y1="30" x2="30" y2="40" stroke="#00D4FF" strokeWidth="1" />
      <line x1="40" y1="30" x2="50" y2="40" stroke="#00D4FF" strokeWidth="1" />
      <line x1="30" y1="40" x2="40" y2="50" stroke="#00D4FF" strokeWidth="1" />
      <line x1="50" y1="40" x2="40" y2="50" stroke="#00D4FF" strokeWidth="1" />
    </svg>
  );

  return (
    <div className={`login-container ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="login-card">
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

        <div className="logo-section">
          <ShieldIcon />
          <h1 className="title">{t.title}</h1>
          <p className="subtitle">{t.subtitle}</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label className="form-label">{t.username}</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t.usernamePlaceholder}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t.password}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.passwordPlaceholder}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="login-button">
            {t.login}
          </button>
        </form>

        <div className="version-info">
          {t.version}
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 