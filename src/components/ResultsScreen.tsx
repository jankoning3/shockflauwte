import React from 'react';
import { Card } from '../types';
import { RotateCcw, CheckCircle, XCircle, Play, Minus } from 'lucide-react';
import { categoryLabels } from '../data/gameData';

interface ResultsScreenProps {
  allCards: Card[];
  onRestart: () => void;
  onRetryIncorrect: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ 
  allCards,
  onRestart, 
  onRetryIncorrect 
}) => {
  // Calculate statistics from all cards
  const correctCards = allCards.filter(card => card.status === 'correct');
  const incorrectCards = allCards.filter(card => card.status === 'incorrect');
  const notPracticedCards = allCards.filter(card => card.status === 'not_practiced');
  const totalCards = allCards.length;
  
  const calculateScore = (correct: number, total: number): number => {
    return Math.round((correct / total) * 100);
  };
  
  const getScoreMessage = (score: number): string => {
    if (score === 100) return 'Uitstekend! Perfect resultaat! 🎉';
    if (score >= 80) return 'Heel goed! Bijna alles correct! 👍';
    if (score >= 60) return 'Goed bezig! Nog even oefenen! 💪';
    return 'Ga vooral door met oefenen! 📚';
  };
  
  const score = calculateScore(correctCards.length, totalCards);
  const message = getScoreMessage(score);

  // Group cards by condition and category
  const groupCardsByConditionAndCategory = (cards: Card[]) => {
    const grouped: Record<string, Record<string, Card[]>> = {
      shock: { oorzaken: [], verschijnselen: [], eerste_hulp: [] },
      flauwte: { oorzaken: [], verschijnselen: [], eerste_hulp: [] }
    };
    
    cards.forEach(card => {
      if (grouped[card.condition] && grouped[card.condition][card.category]) {
        grouped[card.condition][card.category].push(card);
      }
    });
    
    return grouped;
  };

  const allCardsGrouped = groupCardsByConditionAndCategory(allCards);

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'oorzaken':
        return 'bg-[#006072]';
      case 'verschijnselen':
        return 'bg-[#52bbb5]';
      case 'eerste_hulp':
        return 'bg-[#d5ac48]';
      default:
        return 'bg-[#009fe3]';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'correct':
        return <CheckCircle className="w-4 h-4 text-[#52bbb5] mt-0.5 flex-shrink-0" />;
      case 'incorrect':
        return <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />;
      case 'not_practiced':
        return <Minus className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />;
    }
  };
  
  const renderConditionSection = (condition: 'shock' | 'flauwte') => {
    const conditionColor = condition === 'shock' ? '#009fe3' : '#601f63';
    const categories = ['oorzaken', 'verschijnselen', 'eerste_hulp'];
    
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-[#52bbb5]/20">
        <div className="text-center mb-6">
          <div 
            className="inline-block px-6 py-3 rounded-xl text-white font-bold text-lg mb-4"
            style={{ backgroundColor: conditionColor }}
          >
            {condition.toUpperCase()}
          </div>
        </div>
        
        <div className="space-y-4">
          {categories.map(category => {
            const categoryCards = allCardsGrouped[condition][category] || [];
            const correct = categoryCards.filter(card => card.status === 'correct');
            const incorrect = categoryCards.filter(card => card.status === 'incorrect');
            const notPracticed = categoryCards.filter(card => card.status === 'not_practiced');
            const total = categoryCards.length;
            
            if (total === 0) return null;
            
            return (
              <div key={category} className="border border-[#52bbb5]/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`${getCategoryColor(category)} text-white px-3 py-1 rounded-lg font-semibold text-sm`}>
                    {categoryLabels[category as keyof typeof categoryLabels]}
                  </div>
                  <div className="text-sm font-semibold text-[#006072]">
                    {correct.length}/{total}
                  </div>
                </div>
                
                <div className="space-y-2">
                  {categoryCards.map((card, index) => (
                    <div key={`card-${index}`} className="flex items-start space-x-2 text-sm">
                      {getStatusIcon(card.status || 'not_practiced')}
                      <span className="text-[#006072] leading-tight">{card.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#009fe3]/10 to-[#52bbb5]/10 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with score */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-[#52bbb5]/20">
          <div className="text-center">
            <div className="w-70 h-18 mx-auto mb-3 flex items-center justify-center">
              <img 
                src="/soliede_logo_RGB.jpg" 
                alt="Soliede Logo" 
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            
            <h1 className="text-3xl font-bold text-[#006072] mb-2">
              {score}%
            </h1>
            
            <p className="text-[#006072] mb-6 text-lg">
              {message}
            </p>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-[#52bbb5]/10 rounded-lg p-4 border border-[#52bbb5]/20">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-[#52bbb5]" />
                  <span className="font-semibold text-[#006072]">Correct</span>
                </div>
                <p className="text-2xl font-bold text-[#52bbb5]">
                  {correctCards.length}
                </p>
              </div>
              
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <span className="font-semibold text-red-700">Fout</span>
                </div>
                <p className="text-2xl font-bold text-red-500">
                  {incorrectCards.length}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Minus className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold text-gray-600">Niet geoefend</span>
                </div>
                <p className="text-2xl font-bold text-gray-400">
                  {notPracticedCards.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Results per condition */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {renderConditionSection('shock')}
          {renderConditionSection('flauwte')}
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          {incorrectCards.length > 0 && (
            <button
              onClick={onRetryIncorrect}
              className="w-full bg-[#009fe3] hover:bg-[#006072] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Oefen foute kaarten ({incorrectCards.length})</span>
            </button>
          )}
          
          <button
            onClick={onRestart}
            className="w-full bg-[#52bbb5] hover:bg-[#009fe3] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
          >
            <Play className="w-5 h-5" />
            <span>Nieuw Spel Starten</span>
          </button>
        </div>

        {score === 100 && (
          <div className="mt-6 bg-gradient-to-r from-[#52bbb5]/10 to-[#009fe3]/10 rounded-lg p-4 text-center border border-[#52bbb5]/20">
            <p className="text-[#006072] font-medium">
              Perfect! Je beheerst het onderscheid tussen shock en flauwte volledig!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsScreen;