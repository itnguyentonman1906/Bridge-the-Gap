import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'vi' : 'en');
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleLanguage}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
        title={t('language')}
      >
        <Globe className="w-5 h-5" />
        <span className="hidden md:inline">
          {language === 'en' ? t('vietnamese') : t('english')}
        </span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
