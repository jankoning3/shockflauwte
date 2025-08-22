export interface Card {
  id: string;
  text: string;
  condition: 'shock' | 'flauwte';
  category: 'oorzaken' | 'verschijnselen' | 'eerste_hulp';
  status?: 'correct' | 'incorrect' | 'not_practiced';
  userCondition?: 'shock' | 'flauwte';
  userCategory?: 'oorzaken' | 'verschijnselen' | 'eerste_hulp';
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
  practicedCards: Card[]; // All cards that have been practiced during the entire game
  language: 'nl' | 'en';
}

export interface DragState {
  isDragging: boolean;
  draggedCard: Card | null;
  dropZone: string | null;
}

export interface Translation {
  // Welcome Screen
  welcomeTitle: string;
  welcomeSubtitle: string;
  playWith3People: string;
  playTime: string;
  gameRules: string;
  gameRulesStep1: string;
  gameRulesStep2: string;
  gameRulesStep3: string;
  startGame: string;
  poweredBy: string;
  
  // Game Screens
  back: string;
  dragToCorrectCondition: string;
  shock: string;
  fainting: string;
  
  // Categories
  causes: string;
  symptoms: string;
  firstAid: string;
  
  // Results Screen
  excellent: string;
  veryGood: string;
  goodJob: string;
  keepPracticing: string;
  correct: string;
  incorrect: string;
  notPracticed: string;
  practiceIncorrect: string;
  startNewGame: string;
  perfectMessage: string;
  
  // Progress
  of: string;
}