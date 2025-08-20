import React from 'react';
import { Users, Clock, Play } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center">
            <img 
              src="/soliede_logo_pay-off_RGB.jpg" 
              alt="Soliede Logo" 
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            BHV Triage Spel
          </h1>
          <p className="text-lg font-semibold text-orange-600">
            Shock & Flauwte
          </p>
        </div>
        
        <div className="space-y-4 mb-8 text-left">
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-orange-600" />
            <span className="text-gray-700">Speel met 3 personen per apparaat</span>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-orange-600" />
            <span className="text-gray-700">Speeltijd: 5-10 minuten</span>
          </div>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-6 mb-6 text-sm text-gray-700">
          <p className="font-semibold mb-2">Spelregels:</p>
          <ul className="space-y-2 text-left">
            <li>• Sleep kaarten naar juiste categorie</li>
            <li>• Kies eerst: Shock of Flauwte</li>
            <li>• Dan: Oorzaak, Verschijnsel of Hulp</li>
            <li>• Elke kaart telt maar één keer</li>
          </ul>
        </div>
        
        <button
          onClick={onStart}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Play className="w-6 h-6" />
          <span>Start het Spel</span>
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;