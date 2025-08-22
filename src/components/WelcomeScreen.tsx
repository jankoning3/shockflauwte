import React from 'react';
import { Users, Clock, Play } from 'lucide-react';
import { getTranslation } from '../utils/translations';

interface WelcomeScreenProps {
  onStart: () => void;
  language: 'nl' | 'en';
  onLanguageToggle: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, language, onLanguageToggle }) => {
  const t = getTranslation(language);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#009fe3]/10 to-[#52bbb5]/10 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center relative">
        {/* Language Toggle */}
        <button
          onClick={onLanguageToggle}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#009fe3]/10 hover:bg-[#009fe3]/20 flex items-center justify-center transition-colors border border-[#009fe3]/20"
          title={language === 'nl' ? 'Switch to English' : 'Schakel naar Nederlands'}
        >
          <span className="text-lg font-semibold text-[#009fe3]">
            {language === 'nl' ? '🇬🇧' : '🇳🇱'}
          </span>
        </button>

        <div className="mb-4">
          <div className="w-70 h-18 mx-auto mb-3 flex items-center justify-center">
            <img 
              src="/soliede_logo_RGB.jpg" 
              alt="Soliede Logo" 
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {t.welcomeTitle}
          </h1>
          <p className="text-lg font-semibold text-[#009fe3]">
            {t.welcomeSubtitle}
          </p>
        </div>
        
        <div className="space-y-3 mb-6 text-left">
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-[#009fe3]" />
            <span className="text-gray-700">{t.playWith3People}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-[#009fe3]" />
            <span className="text-gray-700">{t.playTime}</span>
          </div>
        </div>
        
        <div className="bg-[#52bbb5]/10 rounded-lg p-4 mb-6 text-sm text-gray-700 border border-[#52bbb5]/20">
          <p className="font-semibold mb-2 text-[#006072]">{t.gameRules}</p>
          <div className="space-y-1 text-left">
            <p>{t.gameRulesStep1}</p>
            <p>{t.gameRulesStep2}</p>
            <p>{t.gameRulesStep3}</p>
          </div>
        </div>
        
        <button
          onClick={onStart}
          className="w-full bg-[#009fe3] hover:bg-[#006072] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-[#009fe3] hover:border-[#006072]"
        >
          <Play className="w-6 h-6" />
          <span>{t.startGame}</span>
        </button>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            {t.poweredBy} <span className="text-[#009fe3] font-semibold">Soliede</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;