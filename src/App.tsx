import React, { useState, useEffect } from 'react';
import { GameState, Card, DragState } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import ConditionScreen from './components/ConditionScreen';
import CategoryScreen from './components/CategoryScreen';
import ResultsScreen from './components/ResultsScreen';
import { selectRandomCards } from './utils/gameUtils';
import { gameCards } from './data/gameData';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentScreen: 'welcome',
    currentCard: null,
    remainingCards: [],
    correctCards: [],
    incorrectCards: [],
    selectedCondition: null,
    gameStarted: false,
    allCards: gameCards.map(card => ({ ...card, status: 'not_practiced' as const }))
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
      gameStarted: true,
      allCards: gameState.allCards
    });
  };

  const handleStart = () => {
    // Reset all cards to not_practiced when starting a new game
    setGameState(prev => ({
      ...prev,
      allCards: gameCards.map(card => ({ ...card, status: 'not_practiced' as const }))
    }));
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

    // Update the status of the current card in allCards
    const updatedAllCards = gameState.allCards.map(card => 
      card.id === gameState.currentCard!.id 
        ? { ...card, status: isCorrect ? 'correct' as const : 'incorrect' as const }
        : card
    );
    if (isCorrect) {
      // Correct answer - add to correct pile
      const newCorrectCards = [...gameState.correctCards, gameState.currentCard];
      
      if (gameState.remainingCards.length > 0) {
        // Move to next card
        setGameState(prev => ({
          ...prev,
          correctCards: newCorrectCards,
          currentCard: prev.remainingCards[0],
          remainingCards: prev.remainingCards.slice(1),
          selectedCondition: null,
          currentScreen: 'condition',
          allCards: updatedAllCards
        }));
      } else {
        // No more cards - show results
        setGameState(prev => ({
          ...prev,
          correctCards: newCorrectCards,
          currentCard: null,
          currentScreen: 'results',
          allCards: updatedAllCards
        }));
      }
    } else {
      // Incorrect answer - add to incorrect pile and continue
      const newIncorrectCards = [...gameState.incorrectCards, gameState.currentCard];
      
      if (gameState.remainingCards.length > 0) {
        // Move to next card
        setGameState(prev => ({
          ...prev,
          incorrectCards: newIncorrectCards,
          currentCard: prev.remainingCards[0],
          remainingCards: prev.remainingCards.slice(1),
          selectedCondition: null,
          currentScreen: 'condition',
          allCards: updatedAllCards
        }));
      } else {
        // No more cards - show results
        setGameState(prev => ({
          ...prev,
          incorrectCards: newIncorrectCards,
          currentCard: null,
          currentScreen: 'results',
          allCards: updatedAllCards
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
        gameStarted: false,
        allCards: gameState.allCards
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
      gameStarted: false,
      allCards: gameCards.map(card => ({ ...card, status: 'not_practiced' as const }))
    });
  };

  const handleRetryIncorrect = () => {
    // Get cards that are marked as incorrect from allCards
    const incorrectCards = gameState.allCards.filter(card => card.status === 'incorrect');
    if (incorrectCards.length > 0) {
      initializeGame(incorrectCards);
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
          allCards={gameState.allCards}
          onRestart={handleRestart}
          onRetryIncorrect={handleRetryIncorrect}
        />
      );
    
    default:
      return <WelcomeScreen onStart={handleStart} />;
  }
}

export default App;