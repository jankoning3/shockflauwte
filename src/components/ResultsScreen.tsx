import React from 'react';
import { Card } from '../types';
import { Trophy, RotateCcw, CheckCircle, XCircle, Play, Heart, AlertTriangle } from 'lucide-react';
import { calculateScore, getScoreMessage } from '../utils/gameUtils';
import { categoryLabels } from '../data/gameData';

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

  // Group cards by condition and category
  const groupCardsByCategory = (cards: Card[]) => {
    const grouped: Record<string, Card[]> = {};
    cards.forEach(card => {
      const key = `${card.condition}-${card.category}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(card);
    });
    return grouped;
  };

  const correctGrouped = groupCardsByCategory(correctCards);
  const incorrectGrouped = groupCardsByCategory(incorrectCards);

  const getCategoryIcon = (condition: 'shock' | 'flauwte', category: string) => {
    if (condition === 'shock') {
      return <AlertTriangle className="w-4 h-4 text-red-600" />;
    } else {
      return <Heart className="w-4 h-4 text-teal-600" />;
    }
  };

  const getCategoryColor = (condition: 'shock' | 'flauwte', category: string) => {
    const baseColors = {
      oorzaken: condition === 'shock' ? 'bg-red-50 border-red-200' : 'bg-teal-50 border-teal-200',
      verschijnselen: condition === 'shock' ? 'bg-orange-50 border-orange-200' : 'bg-blue-50 border-blue-200',
      eerste_hulp: condition === 'shock' ? 'bg-purple-50 border-purple-200' : 'bg-green-50 border-green-200'
    };
    return baseColors[category as keyof typeof baseColors] || 'bg-gray-50 border-gray-200';
  };

  const allCategories = [
    { condition: 'shock', category: 'oorzaken' },
    { condition: 'shock', category: 'verschijnselen' },
    { condition: 'shock', category: 'eerste_hulp' },
    { condition: 'flauwte', category: 'oorzaken' },
    { condition: 'flauwte', category: 'verschijnselen' },
    { condition: 'flauwte', category: 'eerste_hulp' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with score */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="text-center">
            <div className="bg-blue-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {score}%
            </h1>
            
            <p className="text-gray-700 mb-4">
              {message}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-green-50 rounded-lg p-3">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="font-semibold text-green-800 text-sm">Correct</span>
                </div>
                <p className="text-xl font-bold text-green-600">
                  {correctCards.length}
                </p>
              </div>
              
              <div className="bg-red-50 rounded-lg p-3">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <XCircle className="w-4 h-4 text-red-600" />
                  <span className="font-semibold text-red-800 text-sm">Fout</span>
                </div>
                <p className="text-xl font-bold text-red-600">
                  {incorrectCards.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed results by category */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">
            Resultaten per Categorie
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allCategories.map(({ condition, category }) => {
              const key = `${condition}-${category}`;
              const correct = correctGrouped[key] || [];
              const incorrect = incorrectGrouped[key] || [];
              const total = correct.length + incorrect.length;
              
              if (total === 0) return null;
              
              return (
                <div key={key} className={`rounded-lg border-2 p-4 ${getCategoryColor(condition, category)}`}>
                  <div className="flex items-center space-x-2 mb-3">
                    {getCategoryIcon(condition, category)}
                    <h3 className="font-semibold text-gray-800 text-sm">
                      {condition.toUpperCase()} - {categoryLabels[category as keyof typeof categoryLabels]}
                    </h3>
                  </div>
                  
                  <div className="space-y-2">
                    {correct.map((card, index) => (
                      <div key={`correct-${index}`} className="flex items-start space-x-2 text-xs">
                        <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 leading-tight">{card.text}</span>
                      </div>
                    ))}
                    
                    {incorrect.map((card, index) => (
                      <div key={`incorrect-${index}`} className="flex items-start space-x-2 text-xs">
                        <XCircle className="w-3 h-3 text-red-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 leading-tight">{card.text}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-2 text-xs font-semibold text-gray-600">
                    {correct.length}/{total} correct
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action buttons */}
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
          <div className="mt-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-4 text-center">
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