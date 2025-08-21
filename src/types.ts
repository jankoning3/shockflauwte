export interface Card {
  id: string;
  text: string;
  condition: 'shock' | 'flauwte';
  category: 'oorzaken' | 'verschijnselen' | 'eerste_hulp';
  status?: 'correct' | 'incorrect' | 'not_practiced';
}

export interface GameState {
  currentScreen: 'welcome' | 'condition' | 'category' | 'results';
  currentCard: Card | null;
  remainingCards: Card[];
  correctCards: Card[];
  incorrectCards: Card[];
  selectedCondition: 'shock' | 'flauwte' | null;
  gameStarted: boolean;
  allCards: Card[];
}

export interface DragState {
  isDragging: boolean;
  draggedCard: Card | null;
  dropZone: string | null;
}