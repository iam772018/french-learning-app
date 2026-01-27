// localStorage utilities for favorites, progress, and rewards

export const storage = {
  // Favorites
  getFavorites: () => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  },

  addFavorite: (word, translation) => {
    const favorites = storage.getFavorites();
    const newFavorite = {
      id: Date.now(),
      word,
      translation,
      createdAt: new Date().toISOString()
    };
    favorites.unshift(newFavorite);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    return newFavorite;
  },

  removeFavorite: (id) => {
    const favorites = storage.getFavorites();
    const filtered = favorites.filter(f => f.id !== id);
    localStorage.setItem('favorites', JSON.stringify(filtered));
  },

  // Progress & Rewards
  getProgress: () => {
    const progress = localStorage.getItem('progress');
    return progress ? JSON.parse(progress) : {
      level: 1,
      stars: 0,
      streak: 0,
      lastPlayDate: null,
      totalQuizzes: 0,
      correctAnswers: 0
    };
  },

  updateProgress: (updates) => {
    const progress = storage.getProgress();
    const updated = { ...progress, ...updates };
    localStorage.setItem('progress', JSON.stringify(updated));
    return updated;
  },

  addStars: (count) => {
    const progress = storage.getProgress();
    const newStars = progress.stars + count;
    const newLevel = Math.floor(newStars / 10) + 1;

    return storage.updateProgress({
      stars: newStars,
      level: newLevel
    });
  },

  updateStreak: () => {
    const progress = storage.getProgress();
    const today = new Date().toDateString();
    const lastDate = progress.lastPlayDate;

    let newStreak = progress.streak;

    if (lastDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (lastDate === yesterday.toDateString()) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }
    }

    return storage.updateProgress({
      streak: newStreak,
      lastPlayDate: today
    });
  },

  incrementQuizStats: (wasCorrect) => {
    const progress = storage.getProgress();
    return storage.updateProgress({
      totalQuizzes: progress.totalQuizzes + 1,
      correctAnswers: progress.correctAnswers + (wasCorrect ? 1 : 0)
    });
  }
};
