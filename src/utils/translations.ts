import { Translation } from '../types';

export const translations: Record<'nl' | 'en', Translation> = {
  nl: {
    // Welcome Screen
    welcomeTitle: 'BHV Triage Spel',
    welcomeSubtitle: 'Shock & Flauwte',
    playWith3People: 'Speel met 3 personen',
    playTime: 'Speeltijd: 5-10 minuten',
    gameRules: 'Spelregels:',
    gameRulesStep1: 'Sleep kaarten naar juiste plek',
    gameRulesStep2: 'Stap 1: Shock of Flauwte',
    gameRulesStep3: 'Stap 2: Oorzaak, verschijnsel of hulp',
    startGame: 'Start het Spel',
    poweredBy: 'Powered by',
    
    // Game Screens
    back: 'Terug',
    dragToCorrectCondition: 'Sleep de kaart naar de juiste conditie',
    shock: 'SHOCK',
    fainting: 'FLAUWTE',
    
    // Categories
    causes: 'Oorzaken',
    symptoms: 'Verschijnselen',
    firstAid: 'Eerste Hulp',
    
    // Results Screen
    excellent: 'Uitstekend! Perfect resultaat! 🎉',
    veryGood: 'Heel goed! Bijna alles correct! 👍',
    goodJob: 'Goed bezig! Nog even oefenen! 💪',
    keepPracticing: 'Ga vooral door met oefenen! 📚',
    correct: 'Correct',
    incorrect: 'Fout',
    notPracticed: 'Niet geoefend',
    practiceIncorrect: 'Oefen foute kaarten',
    startNewGame: 'Nieuw Spel Starten',
    perfectMessage: 'Perfect! Je beheerst het onderscheid tussen shock en flauwte volledig!',
    
    // Progress
    of: 'van'
  },
  en: {
    // Welcome Screen
    welcomeTitle: 'First Aid Triage Game',
    welcomeSubtitle: 'Shock & Fainting',
    playWith3People: 'Play with 3 people',
    playTime: 'Play time: 5-10 minutes',
    gameRules: 'Game rules:',
    gameRulesStep1: 'Drag cards to correct place',
    gameRulesStep2: 'Step 1: Shock or Fainting',
    gameRulesStep3: 'Step 2: Cause, symptom or aid',
    startGame: 'Start the Game',
    poweredBy: 'Powered by',
    
    // Game Screens
    back: 'Back',
    dragToCorrectCondition: 'Drag the card to the correct condition',
    shock: 'SHOCK',
    fainting: 'FAINTING',
    
    // Categories
    causes: 'Causes',
    symptoms: 'Symptoms',
    firstAid: 'First Aid',
    
    // Results Screen
    excellent: 'Excellent! Perfect result! 🎉',
    veryGood: 'Very good! Almost everything correct! 👍',
    goodJob: 'Good job! Keep practicing! 💪',
    keepPracticing: 'Keep practicing! 📚',
    correct: 'Correct',
    incorrect: 'Incorrect',
    notPracticed: 'Not practiced',
    practiceIncorrect: 'Practice incorrect cards',
    startNewGame: 'Start New Game',
    perfectMessage: 'Perfect! You have mastered the distinction between shock and fainting completely!',
    
    // Progress
    of: 'of'
  }
};

export const getTranslation = (language: 'nl' | 'en'): Translation => {
  return translations[language];
};