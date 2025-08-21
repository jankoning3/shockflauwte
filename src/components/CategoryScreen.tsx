import React, { useState } from 'react';
import { Card } from '../types';
import GameCard from './GameCard';
import DropZone from './DropZone';
import { categoryLabels } from '../data/gameData';
import { ArrowLeft, CheckCircle } from 'lucide-react';

interface CategoryScreenProps {
  card: Card;
  selectedCondition: 'shock' | 'flauwte';
  onSelection: (category: 'oorzaken' | 'verschijnselen' | 'eerste_hulp') => void;
  onBack: () => void;
  progress: { current: number; total: number };
  correctCards: Card[];
}

const CategoryScreen: React.FC<CategoryScreenProps> = ({ 
  card, 
  selectedCondition, 
  onSelection, 
  onBack,
  progress,
  correctCards
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleDragStart = (clientX: number, clientY: number, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const offsetY = clientY - rect.top;
    
    setDragOffset({ x: offsetX, y: offsetY });
    setDragPosition({ x: clientX - offsetX, y: clientY - offsetY });
    setIsDragging(true);
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    setDragPosition({ 
      x: clientX - dragOffset.x, 
      y: clientY - dragOffset.y 
    });
  };

  const handleDragEnd = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    
    const element = document.elementFromPoint(clientX, clientY);
    const dropZone = element?.closest('[data-drop-zone]');
    
    if (dropZone) {
      const zoneId = dropZone.getAttribute('data-drop-zone');
      if (zoneId === 'oorzaken' || zoneId === 'verschijnselen' || zoneId === 'eerste_hulp') {
        onSelection(zoneId);
        return;
      }
    }
    
    setIsDragging(false);
    setDragPosition({ x: 0, y: 0 });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleDragStart(touch.clientX, touch.clientY, e.currentTarget as HTMLElement);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleDragMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.changedTouches[0];
    handleDragEnd(touch.clientX, touch.clientY);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX, e.clientY, e.currentTarget as HTMLElement);
    
    const handleMouseMove = (e: MouseEvent) => {
      handleDragMove(e.clientX, e.clientY);
    };
    
    const handleMouseUp = (e: MouseEvent) => {
      handleDragEnd(e.clientX, e.clientY);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const cardStyle = isDragging ? {
    position: 'fixed' as const,
    left: dragPosition.x,
    top: dragPosition.y,
    zIndex: 1000,
    pointerEvents: 'none' as const
  } : {};

  const conditionColor = selectedCondition === 'shock' ? '#009fe3' : '#52bbb5';
  const conditionColorFlauwte = selectedCondition === 'flauwte' ? '#601f63' : conditionColor;
  const conditionLabel = selectedCondition.toUpperCase();

  // Group correct cards by category for this condition
  const correctCardsByCategory = correctCards
    .filter(c => c.condition === selectedCondition)
    .reduce((acc, card) => {
      if (!acc[card.category]) acc[card.category] = [];
      acc[card.category].push(card);
      return acc;
    }, {} as Record<string, Card[]>);

  const getDropZoneColor = (category: string) => {
    if (selectedCondition === 'shock') {
      return category === 'oorzaken' ? 'blue' : category === 'verschijnselen' ? 'orange' : 'green';
    } else {
      return category === 'oorzaken' ? 'teal' : category === 'verschijnselen' ? 'blue' : 'green';
    }
  };

  return (
    <div className={`min-h-screen p-4 ${
      selectedCondition === 'shock' 
        ? 'bg-gradient-to-br from-[#009fe3]/10 to-[#006072]/10' 
        : 'bg-gradient-to-br from-[#52bbb5]/10 to-[#009fe3]/10'
    }`}>
      <div className="max-w-lg mx-auto h-screen flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-[#006072] hover:text-[#009fe3] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Terug</span>
          </button>
          <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-[#52bbb5]/20">
            <span className="text-sm font-semibold text-[#006072]">
              {progress.current} van {progress.total}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-4 mb-4 flex-shrink-0 border border-[#52bbb5]/10">
          <div className="text-center mb-3">
            <span className={`inline-block px-4 py-2 rounded-full text-white font-semibold text-sm`}
                  style={{ backgroundColor: selectedCondition === 'flauwte' ? '#601f63' : conditionColor }}>
              {conditionLabel}
            </span>
          </div>
                   
          <div className={isDragging ? 'opacity-30' : ''}>
            <GameCard
              card={card}
              isDragging={false}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
            />
          </div>
          
          {isDragging && (
            <div style={cardStyle}>
              <GameCard
                card={card}
                isDragging={true}
                onTouchStart={() => {}}
                onTouchMove={() => {}}
                onTouchEnd={() => {}}
                onMouseDown={() => {}}
              />
            </div>
          )}
        </div>

        <div className="flex-1 space-y-3">
          <DropZone
            id="oorzaken"
            label={categoryLabels.oorzaken}
            isActive={false}
            color={getDropZoneColor('oorzaken')}
          >
            {correctCardsByCategory.oorzaken && correctCardsByCategory.oorzaken.slice(0, 2).map((card, index) => (
              <div key={index} className="flex items-center space-x-2 mb-1">
                <CheckCircle className="w-3 h-3 text-[#52bbb5] flex-shrink-0" />
                <span className="text-xs text-[#006072] truncate">{card.text}</span>
              </div>
            ))}
          </DropZone>
          
          <DropZone
            id="verschijnselen"
            label={categoryLabels.verschijnselen}
            isActive={false}
            color={getDropZoneColor('verschijnselen')}
          >
            {correctCardsByCategory.verschijnselen && correctCardsByCategory.verschijnselen.slice(0, 2).map((card, index) => (
              <div key={index} className="flex items-center space-x-2 mb-1">
                <CheckCircle className="w-3 h-3 text-[#52bbb5] flex-shrink-0" />
                <span className="text-xs text-[#006072] truncate">{card.text}</span>
              </div>
            ))}
          </DropZone>
          
          <DropZone
            id="eerste_hulp"
            label={categoryLabels.eerste_hulp}
            isActive={false}
            color={getDropZoneColor('eerste_hulp')}
          >
            {correctCardsByCategory.eerste_hulp && correctCardsByCategory.eerste_hulp.slice(0, 2).map((card, index) => (
              <div key={index} className="flex items-center space-x-2 mb-1">
                <CheckCircle className="w-3 h-3 text-[#52bbb5] flex-shrink-0" />
                <span className="text-xs text-[#006072] truncate">{card.text}</span>
              </div>
            ))}
          </DropZone>
        </div>
      </div>
    </div>
  );
};

export default CategoryScreen;