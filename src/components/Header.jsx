import { Star, Trophy, Flame } from 'lucide-react';
import { storage } from '../utils/storage';
import { useEffect, useState } from 'react';

export default function Header() {
  const [progress, setProgress] = useState(storage.getProgress());

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(storage.getProgress());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const starsInLevel = progress.stars % 10;
  const starsNeeded = 10 - starsInLevel;

  return (
    <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-4 px-6 shadow-2xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="text-4xl animate-bounce-slow">🇫🇷</div>
          <div>
            <h1 className="text-3xl font-bold">Charlie's Französisch</h1>
            <p className="text-sm opacity-90">Lerne spielend Französisch!</p>
          </div>
        </div>

        <div className="flex gap-6 items-center">
          {/* Level */}
          <div className="card bg-white/20 backdrop-blur-lg border-white/30 px-4 py-2 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-300" />
            <div>
              <div className="text-xs opacity-80">Level</div>
              <div className="text-2xl font-bold">{progress.level}</div>
            </div>
          </div>

          {/* Stars */}
          <div className="card bg-white/20 backdrop-blur-lg border-white/30 px-4 py-2 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
            <div>
              <div className="text-xs opacity-80">Sterne</div>
              <div className="text-2xl font-bold">{progress.stars}</div>
              <div className="text-xs opacity-70">Noch {starsNeeded} bis Level {progress.level + 1}</div>
            </div>
          </div>

          {/* Streak */}
          <div className="card bg-white/20 backdrop-blur-lg border-white/30 px-4 py-2 flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-300" />
            <div>
              <div className="text-xs opacity-80">Serie</div>
              <div className="text-2xl font-bold">{progress.streak}</div>
              <div className="text-xs opacity-70">Tage</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
