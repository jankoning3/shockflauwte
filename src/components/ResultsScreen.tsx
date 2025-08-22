import React from 'react';
import { Card } from '../types';
import { RotateCcw, CheckCircle, XCircle, Play, Minus } from 'lucide-react';
import { getTranslation } from '../utils/translations';

interface ResultsScreenProps {
  practicedCards: Card[];
  onRestart: () => void;
  onRetryIncorrect: () => void;
  language: 'nl' | 'en';
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ 
  practicedCards,
  onRestart, 
  onRetryIncorrect,
  language 
}) => {
  const t = getTranslation(language);

  // Calculate statistics from practiced cards
  const correctCards = practicedCards.filter(card => card.status === 'correct');
  const incorrectCards = practicedCards.filter(card => card.status === 'incorrect');
  const totalCards = practicedCards.length;
  
  const calculateScore = (correct: number, total: number): number => {
    if (total === 0) return 0;
    return Math.round((correct / total) * 100);
  };
  
  const getScoreMessage = (score: number): string => {
    if (score === 100) return t.excellent;
    if (score >= 80) return t.veryGood;
    if (score >= 60) return t.goodJob;
    return t.keepPracticing;
  };
  
  const score = calculateScore(correctCards.length, totalCards);
  const message = getScoreMessage(score);

  // Group cards by user's answer (where they placed it), not by correct answer
  const groupCardsByUserAnswer = (cards: Card[]) => {
    const grouped: Record<string, Record<string, Card[]>> = {
      shock: { oorzaken: [], verschijnselen: [], eerste_hulp: [] },
      flauwte: { oorzaken: [], verschijnselen: [], eerste_hulp: [] }
    };
    
    cards.forEach(card => {
      // Use user's answer for grouping, fallback to correct answer if no user answer
      const condition = card.userCondition || card.condition;
      const category = card.userCategory || card.category;
      
      if (grouped[condition] && grouped[condition][category]) {
        grouped[condition][category].push(card);
      }
    });
    
    return grouped;
  };

  const practicedCardsGrouped = groupCardsByUserAnswer(practicedCards);

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

  const getStatusIcon = (card: Card) => {
    if (card.status === 'correct') {
      return <CheckCircle className="w-4 h-4 text-[#52bbb5] mt-0.5 flex-shrink-0" />;
    } else {
      return <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch(category) {
      case 'oorzaken': return t.causes;
      case 'verschijnselen': return t.symptoms;
      case 'eerste_hulp': return t.firstAid;
      default: return category;
    }
  };

  const renderConditionSection = (condition: 'shock' | 'flauwte') => {
    const conditionColor = condition === 'shock' ? '#009fe3' : '#601f63';
    const conditionLabel = condition === 'shock' ? t.shock : t.fainting;
    const categories = ['oorzaken', 'verschijnselen', 'eerste_hulp'];
    
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-[#52bbb5]/20">
        <div className="text-center mb-6">
          <div 
            className="inline-block px-6 py-3 rounded-xl text-white font-bold text-lg mb-4"
            style={{ backgroundColor: conditionColor }}
          >
            {conditionLabel}
          </div>
        </div>
        
        <div className="space-y-4">
          {categories.map(category => {
            const categoryCards = practicedCardsGrouped[condition][category] || [];
            const correct = categoryCards.filter(card => card.status === 'correct');
            const incorrect = categoryCards.filter(card => card.status === 'incorrect');
            const total = categoryCards.length;
            
            if (total === 0) return null;
            
            return (
              <div key={category} className="border border-[#52bbb5]/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`${getCategoryColor(category)} text-white px-3 py-1 rounded-lg font-semibold text-sm`}>
                    {getCategoryLabel(category)}
                  </div>
                  <div className="text-sm font-semibold text-[#006072]">
                    {correct.length}/{total}
                  </div>
                </div>
                
                <div className="space-y-2">
                  {categoryCards.map((card, index) => (
                    <div key={`card-${index}`} className="flex items-start space-x-2 text-sm">
                      {getStatusIcon(card)}
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
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-[#52bbb5]/10 rounded-lg p-4 border border-[#52bbb5]/20">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-[#52bbb5]" />
                  <span className="font-semibold text-[#006072]">{t.correct}</span>
                </div>
                <p className="text-2xl font-bold text-[#52bbb5]">
                  {correctCards.length}
                </p>
              </div>
              
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <span className="font-semibold text-red-700">{t.incorrect}</span>
                </div>
                <p className="text-2xl font-bold text-red-500">
                  {incorrectCards.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Results per condition - only show if there are practiced cards */}
        {totalCards > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {renderConditionSection('shock')}
            {renderConditionSection('flauwte')}
          </div>
        )}

        {/* Action buttons */}
        <div className="space-y-3">
          {incorrectCards.length > 0 && (
            <button
              onClick={onRetryIncorrect}
              className="w-full bg-[#009fe3] hover:bg-[#006072] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
            >
              <RotateCcw className="w-5 h-5" />
              <span>{t.practiceIncorrect} ({incorrectCards.length})</span>
            </button>
          )}
          
          <button
            onClick={onRestart}
            className="w-full bg-[#52bbb5] hover:bg-[#009fe3] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
          >
            <Play className="w-5 h-5" />
            <span>{t.startNewGame}</span>
          </button>
        </div>

        {score === 100 && totalCards > 0 && (
          <div className="mt-6 bg-gradient-to-r from-[#52bbb5]/10 to-[#009fe3]/10 rounded-lg p-4 text-center border border-[#52bbb5]/20">
            <p className="text-[#006072] font-medium">
              {t.perfectMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsScreen;