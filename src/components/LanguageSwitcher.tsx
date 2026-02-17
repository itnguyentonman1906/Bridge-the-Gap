import { useLanguage } from '../i18n';
import { Globe, ChevronDown } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex items-center group">
        <Globe className="w-5 h-5 absolute left-2 text-gray-700 pointer-events-none group-hover:text-gray-900 transition-colors" />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as 'en' | 'vi')}
          className="pl-9 pr-8 py-2 bg-transparent text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none cursor-pointer rounded-md border border-transparent hover:border-gray-200 transition-all appearance-none"
        >
          <option value="en">English</option>
          <option value="vi">Tiếng Việt</option>
        </select>
        <ChevronDown className="w-4 h-4 absolute right-2 text-gray-500 pointer-events-none group-hover:text-gray-700 transition-colors" />
      </div>
    </div>
  );
};

export default LanguageSwitcher;
