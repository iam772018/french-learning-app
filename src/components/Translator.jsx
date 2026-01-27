import { useState } from 'react';
import { Mic, Volume2, Heart, ArrowLeftRight } from 'lucide-react';
import { translateWithClaude, speakFrench, startSpeechRecognition } from '../utils/translate';
import { storage } from '../utils/storage';

export default function Translator() {
  const [inputText, setInputText] = useState('');
  const [translation, setTranslation] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [direction, setDirection] = useState('de-fr'); // de-fr or fr-de

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setIsTranslating(true);

    try {
      const [fromLang, toLang] = direction.split('-');
      const result = await translateWithClaude(inputText, fromLang, toLang);
      setTranslation(result);
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSpeech = () => {
    setIsListening(true);

    startSpeechRecognition(
      (transcript) => {
        setInputText(transcript);
        setIsListening(false);
      },
      (error) => {
        console.error(error);
        setIsListening(false);
      }
    );
  };

  const handleSpeak = () => {
    if (translation?.translation) {
      speakFrench(translation.translation);
    }
  };

  const handleAddFavorite = () => {
    if (translation) {
      storage.addFavorite(inputText, translation.translation);
      alert('Zu Favoriten hinzugefügt! ⭐');
    }
  };

  const toggleDirection = () => {
    setDirection(prev => prev === 'de-fr' ? 'fr-de' : 'de-fr');
    setInputText('');
    setTranslation(null);
  };

  return (
    <div className="card max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-purple-600 flex items-center gap-2">
          🗣️ Übersetzer
        </h2>

        <button
          onClick={toggleDirection}
          className="btn-secondary flex items-center gap-2 text-sm"
        >
          <ArrowLeftRight className="w-4 h-4" />
          {direction === 'de-fr' ? 'Deutsch → Französisch' : 'Französisch → Deutsch'}
        </button>
      </div>

      {/* Input Area */}
      <div className="space-y-4 mb-6">
        <div className="relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleTranslate()}
            placeholder={direction === 'de-fr' ? 'Deutsches Wort eingeben...' : 'Mot français...'}
            className="input-field pr-16"
          />

          <button
            onClick={handleSpeech}
            disabled={isListening}
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all ${
              isListening
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-purple-500 text-white hover:bg-purple-600'
            }`}
          >
            <Mic className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={handleTranslate}
          disabled={!inputText.trim() || isTranslating}
          className="btn-primary w-full text-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isTranslating ? '🔄 Übersetze...' : '✨ Übersetzen!'}
        </button>
      </div>

      {/* Translation Result */}
      {translation && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 space-y-4 border-4 border-purple-200">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-sm text-gray-600 mb-1">Übersetzung:</div>
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {translation.translation}
              </div>
              <div className="text-sm text-gray-500">
                Aussprache: [{translation.pronunciation}]
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSpeak}
                className="p-4 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transform hover:scale-110 transition-all"
                title="Aussprechen"
              >
                <Volume2 className="w-6 h-6" />
              </button>

              <button
                onClick={handleAddFavorite}
                className="p-4 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg transform hover:scale-110 transition-all"
                title="Zu Favoriten"
              >
                <Heart className="w-6 h-6" />
              </button>
            </div>
          </div>

          {translation.example && (
            <div className="bg-white rounded-xl p-4 border-2 border-purple-200">
              <div className="text-xs text-gray-600 mb-1">Beispiel:</div>
              <div className="text-lg text-gray-800">{translation.example}</div>
            </div>
          )}
        </div>
      )}

      {isListening && (
        <div className="text-center py-4">
          <div className="text-2xl mb-2">🎤</div>
          <div className="text-purple-600 font-bold">Ich höre zu...</div>
        </div>
      )}
    </div>
  );
}
