import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Star, Trophy } from 'lucide-react';
import { getRandomQuestions } from '../data/quizData';
import { storage } from '../utils/storage';
import { speakFrench } from '../utils/translate';

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [progress, setProgress] = useState(storage.getProgress());

  useEffect(() => {
    startNewQuiz();
  }, []);

  const startNewQuiz = () => {
    const userLevel = storage.getProgress().level;
    const quizQuestions = getRandomQuestions(userLevel, 5);
    setQuestions(quizQuestions);
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
    setSelectedAnswer(null);

    // Update streak
    storage.updateStreak();
  };

  const handleAnswer = (index) => {
    if (answered) return;

    setSelectedAnswer(index);
    setAnswered(true);

    const isCorrect = index === questions[currentIndex].correct;

    if (isCorrect) {
      setScore(score + 1);
      // Add stars for correct answer
      const newProgress = storage.addStars(2);
      setProgress(newProgress);
      // Speak the French word
      speakFrench(questions[currentIndex].frenchWord);
    }

    // Update quiz stats
    storage.incrementQuizStats(isCorrect);

    // Move to next question after delay
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
        setAnswered(false);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  const getButtonClass = (index) => {
    if (!answered) {
      return 'bg-white hover:bg-purple-100 border-purple-300 text-purple-800';
    }

    if (index === questions[currentIndex].correct) {
      return 'bg-green-500 text-white border-green-600';
    }

    if (index === selectedAnswer) {
      return 'bg-red-500 text-white border-red-600';
    }

    return 'bg-gray-200 text-gray-500 border-gray-300';
  };

  if (questions.length === 0) {
    return (
      <div className="card max-w-4xl mx-auto text-center">
        <div className="text-6xl mb-4">📚</div>
        <div className="text-2xl font-bold text-purple-600">Quiz wird geladen...</div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    const earnedStars = score * 2;

    return (
      <div className="card max-w-4xl mx-auto text-center">
        <div className="text-8xl mb-6">
          {percentage >= 80 ? '🎉' : percentage >= 60 ? '😊' : '💪'}
        </div>

        <h2 className="text-4xl font-bold text-purple-600 mb-4">Quiz beendet!</h2>

        <div className="text-6xl font-bold text-pink-500 mb-6">
          {score} / {questions.length}
        </div>

        <div className="text-2xl text-gray-700 mb-6">
          {percentage}% richtig!
        </div>

        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 mb-6 border-4 border-yellow-300">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
            <span className="text-3xl font-bold text-orange-600">+{earnedStars} Sterne!</span>
          </div>
          <div className="text-lg text-gray-600">
            Du bist jetzt Level {progress.level}!
            {progress.streak > 0 && ` 🔥 ${progress.streak} Tage Serie!`}
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={startNewQuiz}
            className="btn-primary w-full text-xl"
          >
            🔄 Neues Quiz starten
          </button>

          {percentage < 100 && (
            <div className="text-sm text-gray-600">
              Tipp: Übe weiter, um alle Fragen richtig zu beantworten! 💪
            </div>
          )}
        </div>
      </div>
    );
  }

  const question = questions[currentIndex];

  return (
    <div className="card max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-purple-600 flex items-center gap-2">
          🎯 Quiz
        </h2>

        <div className="flex items-center gap-4">
          <div className="text-xl font-bold text-pink-500">
            {currentIndex + 1} / {questions.length}
          </div>
          <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full border-2 border-yellow-300">
            <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" />
            <span className="font-bold text-yellow-700">{score * 2}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500 rounded-full"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 mb-6 border-4 border-purple-300">
        <div className="text-3xl font-bold text-center text-purple-800 mb-2">
          {question.question}
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={answered}
            className={`p-6 rounded-2xl border-4 font-bold text-xl transition-all transform hover:scale-105 disabled:transform-none ${getButtonClass(
              index
            )}`}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {answered && index === question.correct && (
                <CheckCircle className="w-6 h-6" />
              )}
              {answered && index === selectedAnswer && index !== question.correct && (
                <XCircle className="w-6 h-6" />
              )}
            </div>
          </button>
        ))}
      </div>

      {answered && (
        <div className="mt-6 text-center">
          {selectedAnswer === question.correct ? (
            <div className="text-2xl font-bold text-green-600 animate-bounce">
              🎉 Super! +2 Sterne!
            </div>
          ) : (
            <div className="text-xl font-bold text-orange-600">
              💪 Weiter so! Die richtige Antwort war: {question.options[question.correct]}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
