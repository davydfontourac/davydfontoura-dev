import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'pt' ? 'en' : 'pt';
    i18n.changeLanguage(nextLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-lg text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle language"
      title={i18n.language === 'pt' ? 'Mudar para Inglês' : 'Switch to Portuguese'}
    >
      <div className="flex items-center gap-2">
        <Languages size={20} />
        <span className="text-sm uppercase font-semibold">
          {i18n.language}
        </span>
      </div>
    </button>
  );
};

export default LanguageToggle;
