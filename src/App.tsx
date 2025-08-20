import React, { useState, useEffect } from 'react';
import { GameState, Card, DragState } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import ConditionScreen from './components/ConditionScreen';
import CategoryScreen from './components/CategoryScreen';
import ResultsScreen from './components/ResultsScreen';
import { selectRandomCards } from './utils/gameUtils';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentScreen: 'welcome',
    currentCard: null,
    remainingCards: [],
    correctCards: [],
    incorrectCards: [],
    selectedCondition: null,
    gameStarted: false
  });

  const initializeGame = (cards?: Card[]) => {
    const gameCards = cards || selectRandomCards(24);
    setGameState({
      currentScreen: 'condition',
      currentCard: gameCards[0],
      remainingCards: gameCards.slice(1),
      correctCards: [],
      incorrectCards: [],
      selectedCondition: null,
      gameStarted: true
    });
  };

  const handleStart = () => {
    initializeGame();
  };

  const handleConditionSelection = (condition: 'shock' | 'flauwte') => {
    setGameState(prev => ({
      ...prev,
      selectedCondition: condition,
      currentScreen: 'category'
    }));
  };

  const handleCategorySelection = (category: 'oorzaken' | 'verschijnselen' | 'eerste_hulp') => {
    if (!gameState.currentCard || !gameState.selectedCondition) return;

    const isConditionCorrect = gameState.currentCard.condition === gameState.selectedCondition;
    const isCategoryCorrect = gameState.currentCard.category === category;
    const isCorrect = isConditionCorrect && isCategoryCorrect;

    if (isCorrect) {
      // Correct answer
      const newCorrectCards = [...gameState.correctCards, gameState.currentCard];
      
      if (gameState.remainingCards.length > 0) {
        // More cards to go
        setGameState(prev => ({
          ...prev,
          correctCards: newCorrectCards,
          currentCard: prev.remainingCards[0],
          remainingCards: prev.remainingCards.slice(1),
          selectedCondition: null,
          currentScreen: 'condition'
        }));
      } else if (gameState.incorrectCards.length > 0) {
        // No more new cards, but we have incorrect cards to retry
        setGameState(prev => ({
          ...prev,
          correctCards: newCorrectCards,
          currentCard: prev.incorrectCards[0],
          remainingCards: prev.incorrectCards.slice(1),
          incorrectCards: [],
          selectedCondition: null,
          currentScreen: 'condition'
        }));
      } else {
        // All done!
        setGameState(prev => ({
          ...prev,
          correctCards: newCorrectCards,
          currentCard: null,
          currentScreen: 'results'
        }));
      }
    } else {
      // Incorrect answer - add to incorrect pile
      const newIncorrectCards = [...gameState.incorrectCards, gameState.currentCard];
      
      if (gameState.remainingCards.length > 0) {
        // More new cards to go
        setGameState(prev => ({
          ...prev,
          incorrectCards: newIncorrectCards,
          currentCard: prev.remainingCards[0],
          remainingCards: prev.remainingCards.slice(1),
          selectedCondition: null,
          currentScreen: 'condition'
        }));
      } else {
        // No more new cards, start with incorrect cards
        setGameState(prev => ({
          ...prev,
          currentCard: newIncorrectCards[0],
          remainingCards: newIncorrectCards.slice(1),
          incorrectCards: [],
          selectedCondition: null,
          currentScreen: 'condition'
        }));
      }
    }
  };

  const handleBack = () => {
    if (gameState.currentScreen === 'category') {
      setGameState(prev => ({
        ...prev,
        currentScreen: 'condition',
        selectedCondition: null
      }));
    } else if (gameState.currentScreen === 'condition') {
      setGameState({
        currentScreen: 'welcome',
        currentCard: null,
        remainingCards: [],
        correctCards: [],
        incorrectCards: [],
        selectedCondition: null,
        gameStarted: false
      });
    }
  };

  const handleRestart = () => {
    setGameState({
      currentScreen: 'welcome',
      currentCard: null,
      remainingCards: [],
      correctCards: [],
      incorrectCards: [],
      selectedCondition: null,
      gameStarted: false
    });
  };

  const handleRetryIncorrect = () => {
    if (gameState.incorrectCards.length > 0) {
      initializeGame(gameState.incorrectCards);
    }
  };

  const getTotalCards = () => {
    return gameState.correctCards.length + gameState.incorrectCards.length + gameState.remainingCards.length + (gameState.currentCard ? 1 : 0);
  };

  const getCurrentProgress = () => {
    const total = getTotalCards();
    const current = total - gameState.remainingCards.length - (gameState.currentCard ? 1 : 0);
    return { current: Math.max(0, current), total };
  };

  // Update page title based on current screen
  useEffect(() => {
    const titles = {
      welcome: 'BHV Triage Spel - Shock & Flauwte',
      condition: 'Conditie Selectie - BHV Triage',
      category: 'Categorie Selectie - BHV Triage',
      results: 'Resultaten - BHV Triage'
    };
    
    document.title = titles[gameState.currentScreen] || 'BHV Triage Spel';
  }, [gameState.currentScreen]);

  switch (gameState.currentScreen) {
    case 'welcome':
      return <WelcomeScreen onStart={handleStart} />;
    
    case 'condition':
      return gameState.currentCard ? (
        <ConditionScreen
          card={gameState.currentCard}
          onSelection={handleConditionSelection}
          onBack={handleBack}
          progress={getCurrentProgress()}
        />
      ) : null;
    
    case 'category':
      return gameState.currentCard && gameState.selectedCondition ? (
        <CategoryScreen
          card={gameState.currentCard}
          selectedCondition={gameState.selectedCondition}
          onSelection={handleCategorySelection}
          onBack={handleBack}
          progress={getCurrentProgress()}
          correctCards={gameState.correctCards}
        />
      ) : null;
    
    case 'results':
      return (
        <ResultsScreen
          correctCards={gameState.correctCards}
          incorrectCards={gameState.incorrectCards}
          totalCards={getTotalCards()}
          onRestart={handleRestart}
          onRetryIncorrect={handleRetryIncorrect}
        />
      );
    
    default:
      return <WelcomeScreen onStart={handleStart} />;
  }
}

export default App;