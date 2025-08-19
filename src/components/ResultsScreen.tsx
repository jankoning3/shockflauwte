import React from 'react';
import { Card } from '../types';
import { Trophy, RotateCcw, CheckCircle, XCircle, Play } from 'lucide-react';
import { calculateScore, getScoreMessage } from '../utils/gameUtils';

interface ResultsScreenProps {
  correctCards: Card[];
  incorrectCards: Card[];
  totalCards: number;
  onRestart: () => void;
  onRetryIncorrect: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ 
  correctCards, 
  incorrectCards, 
  totalCards, 
  onRestart, 
  onRetryIncorrect 
}) => {
  const score = calculateScore(correctCards.length, totalCards);
  const message = getScoreMessage(score);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="bg-blue-600 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {score}%
          </h1>
          
          <p className="text-lg text-gray-700 mb-4">
            {message}
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">Correct</span>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {correctCards.length}
              </p>
            </div>
            
            <div className="bg-red-50 rounded-lg p-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <span className="font-semibold text-red-800">Fout</span>
              </div>
              <p className="text-2xl font-bold text-red-600">
                {incorrectCards.length}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {incorrectCards.length > 0 && (
            <button
              onClick={onRetryIncorrect}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Oefen foute kaarten ({incorrectCards.length})</span>
            </button>
          )}
          
          <button
            onClick={onRestart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Play className="w-5 h-5" />
            <span>Nieuw Spel Starten</span>
          </button>
        </div>

        {score === 100 && (
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-700 font-medium">
              🎯 Perfect! Je beheerst het onderscheid tussen shock en flauwte volledig!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsScreen;