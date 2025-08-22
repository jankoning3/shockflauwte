import React, { useState, useEffect } from 'react';
import { GameState, Card, DragState } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import ConditionScreen from './components/ConditionScreen';
import CategoryScreen from './components/CategoryScreen';
import ResultsScreen from './components/ResultsScreen';
import { selectRandomCards } from './utils/gameUtils';
import { getGameCards } from './data/gameData';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentScreen: 'welcome',
    currentCard: null,
    remainingCards: [],
    correctCards: [],
    incorrectCards: [],
    selectedCondition: null,
    gameStarted: false,
    allCards: getGameCards('nl').map(card => ({ ...card, status: 'not_practiced' as const })),
    practicedCards: [],
    language: 'nl'
  });

  const initializeGame = (cards?: Card[]) => {
    const gameCards = cards || selectRandomCards(24, gameState.language);
    setGameState(prev => ({
      ...prev,
      currentScreen: 'condition',
      currentCard: gameCards[0],
      remainingCards: gameCards.slice(1),
      correctCards: [],
      incorrectCards: [],
      selectedCondition: null,
      gameStarted: true
    }));
  };

  const handleStart = () => {
    // Reset practiced cards when starting a completely new game
    setGameState(prev => ({
      ...prev,
      allCards: getGameCards(prev.language).map(card => ({ ...card, status: 'not_practiced' as const })),
      practicedCards: []
    }));
    initializeGame();
  };

  const handleLanguageToggle = () => {
    setGameState(prev => ({
      ...prev,
      language: prev.language === 'nl' ? 'en' : 'nl',
      allCards: getGameCards(prev.language === 'nl' ? 'en' : 'nl').map(card => ({ ...card, status: 'not_practiced' as const })),
      practicedCards: []
    }));
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

    // Create updated card with user's answer
    const updatedCard = {
      ...gameState.currentCard,
      status: isCorrect ? 'correct' as const : 'incorrect' as const,
      userCondition: gameState.selectedCondition,
      userCategory: category
    };

    // Update practiced cards - replace if exists, add if new
    const updatedPracticedCards = gameState.practicedCards.filter(card => card.id !== updatedCard.id);
    updatedPracticedCards.push(updatedCard);

    if (isCorrect) {
      // Correct answer - add to correct pile
      const newCorrectCards = [...gameState.correctCards, updatedCard];
      
      if (gameState.remainingCards.length > 0) {
        // Move to next card
        setGameState(prev => ({
          ...prev,
          correctCards: newCorrectCards,
          currentCard: prev.remainingCards[0],
          remainingCards: prev.remainingCards.slice(1),
          selectedCondition: null,
          currentScreen: 'condition',
          practicedCards: updatedPracticedCards
        }));
      } else {
        // No more cards - show results
        setGameState(prev => ({
          ...prev,
          correctCards: newCorrectCards,
          currentCard: null,
          currentScreen: 'results',
          practicedCards: updatedPracticedCards
        }));
      }
    } else {
      // Incorrect answer - add to incorrect pile and continue
      const newIncorrectCards = [...gameState.incorrectCards, updatedCard];
      
      if (gameState.remainingCards.length > 0) {
        // Move to next card
        setGameState(prev => ({
          ...prev,
          incorrectCards: newIncorrectCards,
          currentCard: prev.remainingCards[0],
          remainingCards: prev.remainingCards.slice(1),
          selectedCondition: null,
          currentScreen: 'condition',
          practicedCards: updatedPracticedCards
        }));
      } else {
        // No more cards - show results
        setGameState(prev => ({
          ...prev,
          incorrectCards: newIncorrectCards,
          currentCard: null,
          currentScreen: 'results',
          practicedCards: updatedPracticedCards
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
      setGameState(prev => ({
        ...prev,
        currentScreen: 'welcome',
        currentCard: null,
        remainingCards: [],
        correctCards: [],
        incorrectCards: [],
        selectedCondition: null,
        gameStarted: false
      }));
    }
  };

  const handleRestart = () => {
    setGameState(prev => ({
      ...prev,
      currentScreen: 'welcome',
      currentCard: null,
      remainingCards: [],
      correctCards: [],
      incorrectCards: [],
      selectedCondition: null,
      gameStarted: false,
      allCards: getGameCards(prev.language).map(card => ({ ...card, status: 'not_practiced' as const })),
      practicedCards: []
    }));
  };

  const handleRetryIncorrect = () => {
    // Get cards that are marked as incorrect from practiced cards
    const incorrectCards = gameState.practicedCards.filter(card => card.status === 'incorrect');
    if (incorrectCards.length > 0) {
      // Reset user answers for retry
      const cardsToRetry = incorrectCards.map(card => ({
        ...card,
        userCondition: undefined,
        userCategory: undefined
      }));
      initializeGame(cardsToRetry);
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

  // Update page title based on current screen and language
  useEffect(() => {
    const titles = {
      nl: {
        welcome: 'BHV Triage Spel - Shock & Flauwte',
        condition: 'Conditie Selectie - BHV Triage',
        category: 'Categorie Selectie - BHV Triage',
        results: 'Resultaten - BHV Triage'
      },
      en: {
        welcome: 'First Aid Triage Game - Shock & Fainting',
        condition: 'Condition Selection - First Aid Triage',
        category: 'Category Selection - First Aid Triage',
        results: 'Results - First Aid Triage'
      }
    };
    
    document.title = titles[gameState.language][gameState.currentScreen] || 'BHV Triage Spel';
  }, [gameState.currentScreen, gameState.language]);

  switch (gameState.currentScreen) {
    case 'welcome':
      return (
        <WelcomeScreen 
          onStart={handleStart} 
          language={gameState.language}
          onLanguageToggle={handleLanguageToggle}
        />
      );
    
    case 'condition':
      return gameState.currentCard ? (
        <ConditionScreen
          card={gameState.currentCard}
          onSelection={handleConditionSelection}
          onBack={handleBack}
          progress={getCurrentProgress()}
          language={gameState.language}
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
          language={gameState.language}
        />
      ) : null;
    
    case 'results':
      return (
        <ResultsScreen
          practicedCards={gameState.practicedCards}
          onRestart={handleRestart}
          onRetryIncorrect={handleRetryIncorrect}
          language={gameState.language}
        />
      );
    
    default:
      return (
        <WelcomeScreen 
          onStart={handleStart} 
          language={gameState.language}
          onLanguageToggle={handleLanguageToggle}
        />
      );
  }
}

export default App;