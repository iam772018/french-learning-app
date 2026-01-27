import { useState, useEffect } from 'react';
import { Heart, Trash2, Volume2 } from 'lucide-react';
import { storage } from '../utils/storage';
import { speakFrench } from '../utils/translate';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    setFavorites(storage.getFavorites());
  };

  const handleRemove = (id) => {
    storage.removeFavorite(id);
    loadFavorites();
  };

  const handleSpeak = (text) => {
    speakFrench(text);
  };

  if (favorites.length === 0) {
    return (
      <div className="card max-w-4xl mx-auto text-center">
        <div className="text-8xl mb-6">💝</div>
        <h2 className="text-3xl font-bold text-purple-600 mb-4">Keine Favoriten</h2>
        <p className="text-xl text-gray-600">
          Füge deine Lieblingswörter beim Übersetzen hinzu!
        </p>
      </div>
    );
  }

  return (
    <div className="card max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-purple-600 flex items-center gap-2">
          <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
          Meine Favoriten
        </h2>
        <div className="text-lg text-gray-600">
          {favorites.length} {favorites.length === 1 ? 'Wort' : 'Wörter'}
        </div>
      </div>

      <div className="space-y-3">
        {favorites.map((favorite) => (
          <div
            key={favorite.id}
            className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-4 border-3 border-pink-200 hover:border-pink-400 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-gray-700">
                    {favorite.word}
                  </div>
                  <div className="text-gray-400 text-xl">→</div>
                  <div className="text-2xl font-bold text-purple-600">
                    {favorite.translation}
                  </div>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Hinzugefügt: {new Date(favorite.createdAt).toLocaleDateString('de-DE')}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleSpeak(favorite.translation)}
                  className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transform hover:scale-110 transition-all"
                  title="Aussprechen"
                >
                  <Volume2 className="w-5 h-5" />
                </button>

                <button
                  onClick={() => handleRemove(favorite.id)}
                  className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transform hover:scale-110 transition-all"
                  title="Entfernen"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {favorites.length >= 10 && (
        <div className="mt-6 text-center p-4 bg-yellow-100 rounded-2xl border-3 border-yellow-300">
          <div className="text-2xl mb-2">🎉</div>
          <div className="text-lg font-bold text-yellow-800">
            Wow! Du hast schon {favorites.length} Wörter gespeichert!
          </div>
          <div className="text-sm text-yellow-700">
            Du machst großartige Fortschritte! 🌟
          </div>
        </div>
      )}
    </div>
  );
}
