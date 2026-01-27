import { useState, useEffect } from 'react';
import Header from './components/Header';
import Translator from './components/Translator';
import Quiz from './components/Quiz';
import Favorites from './components/Favorites';
import { Languages, Brain, Heart } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('translator');

  // Load voices for speech synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        speechSynthesis.getVoices();
      };
    }
  }, []);

  const tabs = [
    {
      id: 'translator',
      name: 'Übersetzer',
      icon: Languages,
      color: 'purple',
    },
    {
      id: 'quiz',
      name: 'Quiz',
      icon: Brain,
      color: 'pink',
    },
    {
      id: 'favorites',
      name: 'Favoriten',
      icon: Heart,
      color: 'red',
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-4 mb-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl scale-105'
                    : 'bg-white text-gray-600 shadow-lg hover:shadow-xl'
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'animate-bounce-slow' : ''}`} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-300">
          {activeTab === 'translator' && <Translator />}
          {activeTab === 'quiz' && <Quiz />}
          {activeTab === 'favorites' && <Favorites />}
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-600">
        <div className="text-4xl mb-3">🌟</div>
        <p className="text-lg font-bold">Viel Spaß beim Französisch lernen, Charlie!</p>
        <p className="text-sm mt-2">Jeden Tag ein bisschen besser! 💪</p>
      </footer>
    </div>
  );
}

export default App;
