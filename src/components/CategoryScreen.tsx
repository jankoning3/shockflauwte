import React, { useState } from 'react';
import { Card } from '../types';
import GameCard from './GameCard';
import DropZone from './DropZone';
import { categoryLabels } from '../data/gameData';
import { ArrowLeft } from 'lucide-react';

interface CategoryScreenProps {
  card: Card;
  selectedCondition: 'shock' | 'flauwte';
  onSelection: (category: 'oorzaken' | 'verschijnselen' | 'eerste_hulp') => void;
  onBack: () => void;
  progress: { current: number; total: number };
}

const CategoryScreen: React.FC<CategoryScreenProps> = ({ 
  card, 
  selectedCondition, 
  onSelection, 
  onBack,
  progress 
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

  const conditionColor = selectedCondition === 'shock' ? 'blue' : 'teal';
  const conditionLabel = selectedCondition.toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-4">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Terug</span>
          </button>
          <div className="bg-white px-4 py-2 rounded-full shadow-sm">
            <span className="text-sm font-semibold text-gray-700">
              {progress.current} van {progress.total}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="text-center mb-4">
            <span className={`inline-block px-4 py-2 rounded-full text-white font-semibold text-sm ${
              selectedCondition === 'shock' ? 'bg-blue-600' : 'bg-teal-600'
            }`}>
              {conditionLabel}
            </span>
          </div>
          
          <h2 className="text-xl font-bold text-center mb-6 text-gray-900">
            Tot welke categorie behoort deze kaart?
          </h2>
          
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

        <div className="space-y-4">
          <DropZone
            id="oorzaken"
            label={categoryLabels.oorzaken}
            isActive={false}
            color="blue"
          />
          
          <DropZone
            id="verschijnselen"
            label={categoryLabels.verschijnselen}
            isActive={false}
            color="orange"
          />
          
          <DropZone
            id="eerste_hulp"
            label={categoryLabels.eerste_hulp}
            isActive={false}
            color="teal"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryScreen;