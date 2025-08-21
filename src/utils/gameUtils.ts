import { Card } from '../types';
import { gameCards } from '../data/gameData';

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const selectRandomCards = (totalCards: number = 24): Card[] => {
  // Groepeer kaarten per conditie en categorie
  const shockOorzaken = gameCards.filter(card => card.condition === 'shock' && card.category === 'oorzaken');
  const shockVerschijnselen = gameCards.filter(card => card.condition === 'shock' && card.category === 'verschijnselen');
  const shockEersteHulp = gameCards.filter(card => card.condition === 'shock' && card.category === 'eerste_hulp');
  
  const flauwteOorzaken = gameCards.filter(card => card.condition === 'flauwte' && card.category === 'oorzaken');
  const flauwteVerschijnselen = gameCards.filter(card => card.condition === 'flauwte' && card.category === 'verschijnselen');
  const flauwteEersteHulp = gameCards.filter(card => card.condition === 'flauwte' && card.category === 'eerste_hulp');
  
  // Bereken hoeveel kaarten per categorie (24 kaarten / 6 categorieën = 4 per categorie)
  const cardsPerCategory = Math.floor(totalCards / 6);
  
  // Selecteer willekeurig uit elke categorie
  const selectedCards = [
    ...shuffleArray(shockOorzaken).slice(0, cardsPerCategory),
    ...shuffleArray(shockVerschijnselen).slice(0, cardsPerCategory),
    ...shuffleArray(shockEersteHulp).slice(0, cardsPerCategory),
    ...shuffleArray(flauwteOorzaken).slice(0, cardsPerCategory),
    ...shuffleArray(flauwteVerschijnselen).slice(0, cardsPerCategory),
    ...shuffleArray(flauwteEersteHulp).slice(0, cardsPerCategory)
  ];
  
  // Shuffle de finale selectie
  return shuffleArray(selectedCards);
};