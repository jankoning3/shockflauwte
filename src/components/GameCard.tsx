import React from 'react';
import { Card } from '../types';

interface GameCardProps {
  card: Card;
  isDragging: boolean;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
  onMouseDown: (e: React.MouseEvent) => void;
}

const GameCard: React.FC<GameCardProps> = ({
  card,
  isDragging,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onMouseDown
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-md border-2 border-gray-200 p-6 cursor-move select-none transition-all duration-200 ${
        isDragging 
          ? 'shadow-xl border-blue-400 scale-105 z-70' 
          : 'hover:shadow-lg hover:border-gray-300'
      }`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      style={{
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none'
      }}
    >
      <p className="text-gray-800 text-center font-medium leading-relaxed">
        {card.text}
      </p>
    </div>
  );
};

export default GameCard;