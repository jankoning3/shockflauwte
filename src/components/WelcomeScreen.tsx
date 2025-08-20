import React from 'react';
import { Users, Clock, Play, Zap, Shield, Brain } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#009fe3] rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-[#52bbb5] rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#d5ac48] rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center border border-gray-700/50 relative z-10">
        {/* Glowing border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#009fe3]/20 via-[#52bbb5]/20 to-[#d5ac48]/20 rounded-3xl blur-sm"></div>
        
        <div className="relative z-10">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-[#009fe3] to-[#52bbb5] rounded-2xl p-1">
              <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                <img 
                  src="/soliede_logo_RGB.jpg" 
                  alt="Soliede Logo" 
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                BHV Triage Spel
              </h1>
              <p className="text-xl font-semibold bg-gradient-to-r from-[#009fe3] to-[#52bbb5] bg-clip-text text-transparent">
                Shock & Flauwte
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-[#009fe3] to-[#52bbb5] rounded-full mx-auto"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div className="flex items-center space-x-3 bg-gray-700/30 rounded-xl p-3 border border-gray-600/30">
              <div className="w-8 h-8 bg-[#009fe3] rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-200 font-medium">3 personen per apparaat</span>
            </div>
            
            <div className="flex items-center space-x-3 bg-gray-700/30 rounded-xl p-3 border border-gray-600/30">
              <div className="w-8 h-8 bg-[#52bbb5] rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-200 font-medium">5-10 minuten speeltijd</span>
            </div>
          </div>
          
          <div className="bg-gray-700/20 rounded-2xl p-5 mb-6 border border-gray-600/30 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-3">
              <Brain className="w-5 h-5 text-[#d5ac48]" />
              <p className="font-bold text-[#d5ac48]">Spelregels</p>
            </div>
            <div className="space-y-2 text-left text-gray-300 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-[#009fe3] rounded-full"></div>
                <p>Sleep kaarten naar juiste categorie</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-[#52bbb5] rounded-full"></div>
                <p>Kies eerst: Shock of Flauwte</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-[#d5ac48] rounded-full"></div>
                <p>Dan: Oorzaak, Verschijnsel of Hulp</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                <p>Elke kaart telt maar één keer</p>
              </div>
            </div>
          </div>
          
          <button
            onClick={onStart}
            className="group w-full bg-gradient-to-r from-[#009fe3] to-[#52bbb5] hover:from-[#52bbb5] hover:to-[#009fe3] text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 text-lg shadow-2xl hover:shadow-[#009fe3]/25 transform hover:scale-105 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
            <Zap className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            <span className="relative z-10">Start het Spel</span>
            <Shield className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          </button>
          
          <div className="mt-6 pt-4 border-t border-gray-600/30">
            <p className="text-xs text-gray-400">
              Powered by <span className="text-[#009fe3] font-bold">Soliede</span>
              <span className="mx-2 text-gray-600">•</span>
              <span className="text-gray-500">Advanced Training Platform</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;