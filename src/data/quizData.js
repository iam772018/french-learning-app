// Quiz questions for French learning

export const quizQuestions = [
  {
    id: 1,
    question: 'Was bedeutet "Bonjour"?',
    options: ['Guten Tag', 'Gute Nacht', 'Tschüss', 'Danke'],
    correct: 0,
    frenchWord: 'Bonjour',
    level: 1
  },
  {
    id: 2,
    question: 'Wie sagt man "Danke" auf Französisch?',
    options: ['S\'il vous plaît', 'Merci', 'Pardon', 'Oui'],
    correct: 1,
    frenchWord: 'Merci',
    level: 1
  },
  {
    id: 3,
    question: 'Was bedeutet "Chat"?',
    options: ['Hund', 'Katze', 'Vogel', 'Fisch'],
    correct: 1,
    frenchWord: 'Chat',
    level: 1
  },
  {
    id: 4,
    question: 'Wie sagt man "Ja" auf Französisch?',
    options: ['Non', 'Oui', 'Si', 'Peut-être'],
    correct: 1,
    frenchWord: 'Oui',
    level: 1
  },
  {
    id: 5,
    question: 'Was bedeutet "Maison"?',
    options: ['Auto', 'Haus', 'Schule', 'Park'],
    correct: 1,
    frenchWord: 'Maison',
    level: 1
  },
  {
    id: 6,
    question: 'Wie sagt man "Hund" auf Französisch?',
    options: ['Chat', 'Chien', 'Oiseau', 'Lapin'],
    correct: 1,
    frenchWord: 'Chien',
    level: 2
  },
  {
    id: 7,
    question: 'Was bedeutet "Eau"?',
    options: ['Feuer', 'Luft', 'Wasser', 'Erde'],
    correct: 2,
    frenchWord: 'Eau',
    level: 2
  },
  {
    id: 8,
    question: 'Wie sagt man "Gute Nacht" auf Französisch?',
    options: ['Bon matin', 'Bon après-midi', 'Bonne nuit', 'Bonne journée'],
    correct: 2,
    frenchWord: 'Bonne nuit',
    level: 2
  },
  {
    id: 9,
    question: 'Was bedeutet "Arbre"?',
    options: ['Blume', 'Baum', 'Gras', 'Strauch'],
    correct: 1,
    frenchWord: 'Arbre',
    level: 2
  },
  {
    id: 10,
    question: 'Wie sagt man "Ich liebe dich" auf Französisch?',
    options: ['Je t\'aime', 'Je t\'adore', 'Je suis', 'Tu es'],
    correct: 0,
    frenchWord: 'Je t\'aime',
    level: 2
  },
  {
    id: 11,
    question: 'Was bedeutet "Pomme"?',
    options: ['Birne', 'Apfel', 'Orange', 'Banane'],
    correct: 1,
    frenchWord: 'Pomme',
    level: 3
  },
  {
    id: 12,
    question: 'Wie sagt man "Bitte" (als Antwort auf Danke)?',
    options: ['S\'il vous plaît', 'De rien', 'Pardon', 'Excusez-moi'],
    correct: 1,
    frenchWord: 'De rien',
    level: 3
  }
];

export function getQuestionsByLevel(level) {
  return quizQuestions.filter(q => q.level <= level);
}

export function getRandomQuestions(level, count = 5) {
  const questions = getQuestionsByLevel(level);
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
