
import React from 'react';
import { Users, Clock, Play } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#009fe3]/10 to-[#52bbb5]/10 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
        <div className="mb-6">
          <div className="w-40 h-40 mx-auto mb-6 flex items-center justify-center">
            <img 
              src="/soliede_logo_pay-off_RGB.jpg" 
              alt="Soliede Logo" 
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            BHV Triage Spel
          </h1>
          <p className="text-xl font-semibold text-[#009fe3]">
            Shock & Flauwte
          </p>
        </div>
        
        <div className="space-y-4 mb-8 text-left">
          <div className="flex items-center space-x-3">
            <Users className="w-6 h-6 text-[#009fe3]" />
            <span className="text-gray-700 text-lg">Speel met 3 personen per apparaat</span>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="w-6 h-6 text-[#009fe3]" />
            <span className="text-gray-700 text-lg">Speeltijd: 5-10 minuten</span>
          </div>
        </div>
        
        <div className="bg-[#52bbb5]/10 rounded-lg p-6 mb-8 text-base text-gray-700 border border-[#52bbb5]/20">
          <p className="font-semibold mb-3 text-[#006072]">Spelregels:</p>
          <ul className="space-y-2 text-left">
            <li>• Sleep kaarten naar juiste categorie</li>
            <li>• Kies eerst: Shock of Flauwte</li>
            <li>• Dan: Oorzaak, Verschijnsel of Hulp</li>
            <li>• Elke kaart telt maar één keer</li>
          </ul>
        </div>
        
        <button
          onClick={onStart}
          className="w-full bg-[#009fe3] hover:bg-[#006072] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-[#009fe3] hover:border-[#006072]"
        >
          <Play className="w-6 h-6" />
          <span>Start het Spel</span>
        </button>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Powered by <span className="text-[#009fe3] font-semibold">Soliede</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;