import React from 'react';
import { Activity, Users, Clock, Play } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="bg-blue-600 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <Activity className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            BHV Triage Spel
          </h1>
          <p className="text-lg font-semibold text-blue-600">
            Shock & Flauwte
          </p>
        </div>
        
        <div className="space-y-4 mb-8 text-left">
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="text-gray-700">Speel met 3 personen per apparaat</span>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="text-gray-700">Speeltijd: 10-15 minuten</span>
          </div>
          <div className="flex items-center space-x-3">
            <Activity className="w-5 h-5 text-blue-600" />
            <span className="text-gray-700">Leer onderscheid shock vs flauwte</span>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-6 text-sm text-gray-700">
          <p className="font-semibold mb-2">Spelregels:</p>
          <ul className="space-y-1 text-left">
            <li>• Sleep kaarten naar de juiste categorie</li>
            <li>• Eerst keuze: Shock of Flauwte</li>
            <li>• Daarna: Oorzaak, Verschijnsel of Eerste Hulp</li>
            <li>• Foute kaarten komen terug</li>
          </ul>
        </div>
        
        <button
          onClick={onStart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Play className="w-6 h-6" />
          <span>Start het Spel</span>
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;