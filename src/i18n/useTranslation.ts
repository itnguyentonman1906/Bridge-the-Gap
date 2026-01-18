import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { t, i18n } = useTranslation();

  const language = i18n.language as 'en' | 'vi';

  const setLanguage = (lang: 'en' | 'vi') => {
    i18n.changeLanguage(lang);
  };

  return {
    language,
    setLanguage,
    t
  };
};
