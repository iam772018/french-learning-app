// Translation using MyMemory API

export async function translateWithClaude(text, fromLang = 'de', toLang = 'fr') {
  // Try MyMemory Translation API first
  try {
    const langpair = `${fromLang}|${toLang}`;
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langpair}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.responseStatus === 200 && data.responseData.translatedText) {
      const translation = data.responseData.translatedText;

      return {
        translation: translation,
        pronunciation: getPronunciation(translation),
        example: `Beispiel: ${translation}`
      };
    }
  } catch (error) {
    console.error('MyMemory API error:', error);
    // Fall back to static dictionary
  }

  // Fallback: Static dictionary for common words/phrases
  const mockTranslations = {
    // Greetings
    'hallo': 'bonjour',
    'tschüss': 'au revoir',
    'guten morgen': 'bonjour',
    'guten tag': 'bonjour',
    'gute nacht': 'bonne nuit',
    'auf wiedersehen': 'au revoir',

    // Politeness
    'danke': 'merci',
    'bitte': 's\'il vous plaît',
    'entschuldigung': 'pardon',
    'ja': 'oui',
    'nein': 'non',

    // Common phrases
    'ich liebe dich': 'je t\'aime',
    'wie geht es dir': 'comment ça va',
    'wie heißt du': 'comment t\'appelles-tu',
    'ich heiße': 'je m\'appelle',

    // Animals
    'hund': 'chien',
    'katze': 'chat',
    'vogel': 'oiseau',
    'pferd': 'cheval',
    'fisch': 'poisson',
    'maus': 'souris',

    // Objects & Transportation
    'auto': 'voiture',
    'fahrrad': 'vélo',
    'bus': 'bus',
    'zug': 'train',
    'flugzeug': 'avion',
    'schiff': 'bateau',
    'haus': 'maison',
    'baum': 'arbre',
    'buch': 'livre',
    'tisch': 'table',
    'stuhl': 'chaise',
    'tür': 'porte',
    'fenster': 'fenêtre',
    'telefon': 'téléphone',
    'computer': 'ordinateur',
    'bleistift': 'crayon',
    'kugelschreiber': 'stylo',
    'tasche': 'sac',
    'uhr': 'montre',
    'schlüssel': 'clé',

    // Food
    'brot': 'pain',
    'wasser': 'eau',
    'apfel': 'pomme',
    'käse': 'fromage',
    'milch': 'lait',
    'ei': 'œuf',
    'fleisch': 'viande',

    // Places
    'schule': 'école',
    'laden': 'magasin',
    'restaurant': 'restaurant',
    'park': 'parc',

    // Colors
    'rot': 'rouge',
    'blau': 'bleu',
    'grün': 'vert',
    'gelb': 'jaune',
    'schwarz': 'noir',
    'weiß': 'blanc',

    // Numbers
    'eins': 'un',
    'zwei': 'deux',
    'drei': 'trois',
    'vier': 'quatre',
    'fünf': 'cinq',
    'sechs': 'six',
    'sieben': 'sept',
    'acht': 'huit',
    'neun': 'neuf',
    'zehn': 'dix',

    // Family
    'mutter': 'mère',
    'vater': 'père',
    'bruder': 'frère',
    'schwester': 'sœur',
    'kind': 'enfant',
    'baby': 'bébé',
    'oma': 'grand-mère',
    'opa': 'grand-père',
    'familie': 'famille',

    // Body
    'kopf': 'tête',
    'auge': 'œil',
    'augen': 'yeux',
    'nase': 'nez',
    'mund': 'bouche',
    'hand': 'main',
    'fuß': 'pied',
    'arm': 'bras',
    'bein': 'jambe',

    // Nature
    'sonne': 'soleil',
    'mond': 'lune',
    'stern': 'étoile',
    'himmel': 'ciel',
    'regen': 'pluie',
    'schnee': 'neige',
    'blume': 'fleur',
    'gras': 'herbe',

    // Common verbs
    'ich bin': 'je suis',
    'du bist': 'tu es',
    'ich habe': 'j\'ai',
    'ich möchte': 'je voudrais',
    'ich liebe': 'j\'aime',

    // Time
    'tag': 'jour',
    'nacht': 'nuit',
    'heute': 'aujourd\'hui',
    'morgen': 'demain',
    'gestern': 'hier',
    'woche': 'semaine',
    'monat': 'mois',
    'jahr': 'année',
  };

  let lowerText = text.toLowerCase().trim();

  // Extract word from sentences like "Was heißt X auf Französisch?"
  const patterns = [
    /was heißt (.*?) auf französisch/i,
    /wie sagt man (.*?) auf französisch/i,
    /übersetze (.*)/i,
    /was ist (.*?) auf französisch/i,
  ];

  for (const pattern of patterns) {
    const match = lowerText.match(pattern);
    if (match && match[1]) {
      lowerText = match[1].trim();
      break;
    }
  }

  // Check if we have a mock translation
  if (mockTranslations[lowerText]) {
    return {
      translation: mockTranslations[lowerText],
      pronunciation: getPronunciation(mockTranslations[lowerText]),
      example: getExample(mockTranslations[lowerText])
    };
  }

  // For demo: reverse lookup
  const reverseLookup = Object.entries(mockTranslations).find(
    ([_, fr]) => fr === lowerText
  );

  if (reverseLookup && toLang === 'de') {
    return {
      translation: reverseLookup[0],
      pronunciation: reverseLookup[0],
      example: getExample(reverseLookup[0])
    };
  }

  // Fallback: Try to find partial match
  for (const [de, fr] of Object.entries(mockTranslations)) {
    if (lowerText.includes(de)) {
      return {
        translation: fr,
        pronunciation: getPronunciation(fr),
        example: getExample(fr)
      };
    }
  }

  // Last fallback: Show message
  return {
    translation: `Noch nicht im Wörterbuch 😊`,
    pronunciation: `[Tipp: Probiere: Hund, Katze, Auto, Haus, ...]`,
    example: `Ich kenne viele Wörter! Versuche einfache Wörter wie Tiere, Farben oder Objekte.`
  };
}

function getPronunciation(frenchWord) {
  const pronunciations = {
    'bonjour': 'bɔ̃ʒuʁ',
    'au revoir': 'o ʁəvwaʁ',
    'merci': 'mɛʁsi',
    'oui': 'wi',
    'non': 'nɔ̃',
    'chien': 'ʃjɛ̃',
    'chat': 'ʃa',
    'maison': 'mɛzɔ̃',
    'arbre': 'aʁbʁ',
    'eau': 'o',
    'voiture': 'vwatyʁ',
    'vélo': 'velo',
    'train': 'tʁɛ̃',
    'école': 'ekɔl',
    'livre': 'livʁ',
    'pomme': 'pɔm',
    'rouge': 'ʁuʒ',
    'bleu': 'blø',
    'vert': 'vɛʁ',
    'famille': 'famij',
    'mère': 'mɛʁ',
    'père': 'pɛʁ',
    'enfant': 'ɑ̃fɑ̃',
    'soleil': 'sɔlɛj',
    'lune': 'lyn',
    'fleur': 'flœʁ',
  };

  return pronunciations[frenchWord] || frenchWord;
}

function getExample(word) {
  const examples = {
    'bonjour': 'Bonjour! Comment allez-vous?',
    'merci': 'Merci beaucoup!',
    'chien': 'Le chien est mignon.',
    'chat': 'J\'ai un chat noir.',
    'maison': 'Ma maison est grande.',
    'voiture': 'C\'est une belle voiture!',
    'vélo': 'J\'aime faire du vélo.',
    'train': 'Le train arrive à la gare.',
    'école': 'Je vais à l\'école.',
    'pomme': 'J\'aime les pommes.',
    'livre': 'Je lis un livre.',
    'rouge': 'La pomme est rouge.',
    'bleu': 'Le ciel est bleu.',
    'famille': 'Ma famille est grande.',
    'mère': 'Ma mère est gentille.',
    'père': 'Mon père travaille.',
    'soleil': 'Le soleil brille.',
    'fleur': 'La fleur est belle.',
  };

  return examples[word] || `Exemple: ${word}`;
}

// Text-to-Speech for French
export function speakFrench(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.8; // Slower for learning
    utterance.pitch = 1.2; // Slightly higher for friendliness

    // Try to find a French voice
    const voices = speechSynthesis.getVoices();
    const frenchVoice = voices.find(voice =>
      voice.lang.startsWith('fr')
    );

    if (frenchVoice) {
      utterance.voice = frenchVoice;
    }

    speechSynthesis.speak(utterance);
  }
}

// Speech Recognition
export function startSpeechRecognition(onResult, onError) {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    onError('Spracherkennung wird in diesem Browser nicht unterstützt.');
    return null;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = 'de-DE';
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };

  recognition.onerror = (event) => {
    onError(`Fehler: ${event.error}`);
  };

  recognition.start();

  return recognition;
}
