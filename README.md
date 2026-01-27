# 🇫🇷 Charlie's Französisch Lern-App

Eine interaktive, kinderfreundliche App zum Französisch lernen mit Spracheingabe, Quiz und Belohnungssystem!

## ✨ Features

### 🗣️ Übersetzer
- **Spracheingabe**: Sprich Deutsch und lass es automatisch übersetzen
- **Text-to-Speech**: Höre die französische Aussprache
- **Bidirektional**: Deutsch → Französisch oder Französisch → Deutsch
- **Favoriten**: Speichere deine Lieblingswörter

### 🎯 Quiz
- **Multiple-Choice Fragen**: Teste dein Wissen
- **Adaptive Schwierigkeit**: Level-basierte Fragen
- **Sofortige Rückmeldung**: Sehe sofort, ob deine Antwort richtig war
- **Französische Aussprache**: Höre das Wort bei richtiger Antwort

### 🏆 Belohnungssystem
- **Sterne sammeln**: Verdiene 2 Sterne pro richtiger Antwort
- **Level aufsteigen**: Alle 10 Sterne = neues Level
- **Streak-System**: Behalte deine tägliche Lernstreak
- **Fortschritt-Tracking**: Sieh deinen Fortschritt im Header

### 💝 Favoriten
- Speichere Wörter für später
- Höre die Aussprache jederzeit
- Verwalte deine Sammlung

## 🚀 Installation & Start

### Option 1: Doppelklick (Einfachste Methode)
1. Doppelklick auf `START.bat`
2. Warte, bis sich der Browser öffnet
3. Fertig! 🎉

### Option 2: Terminal
```bash
cd "c:\Charlie´s app\french-app"
npm run dev
```

Die App öffnet sich automatisch im Browser unter: **http://localhost:5173**

## 🎮 Verwendung

1. **Übersetzen**
   - Klicke auf das Mikrofon 🎤 und sprich ein deutsches Wort
   - ODER: Tippe ein Wort ein und klicke auf "Übersetzen"
   - Klicke auf 🔊 um die französische Aussprache zu hören
   - Klicke auf ❤️ um das Wort zu deinen Favoriten hinzuzufügen

2. **Quiz spielen**
   - Wechsle zum Quiz-Tab
   - Beantworte die Multiple-Choice Fragen
   - Sammle Sterne für richtige Antworten!
   - Am Ende siehst du dein Ergebnis

3. **Favoriten verwalten**
   - Wechsle zum Favoriten-Tab
   - Höre die Aussprache deiner gespeicherten Wörter
   - Entferne Wörter, wenn du sie nicht mehr brauchst

## 🛠️ Technologie-Stack

- **React 18**: Moderne UI-Framework
- **Vite**: Blitzschneller Build-Tool
- **Tailwind CSS**: Kinderfreundliches, buntes Design
- **Web Speech API**: Spracheingabe und Text-to-Speech
- **localStorage**: Speicherung von Favoriten und Fortschritt
- **Lucide React**: Schöne Icons

## 📁 Projektstruktur

```
french-app/
├── src/
│   ├── components/
│   │   ├── Header.jsx         # Kopfzeile mit Belohnungen
│   │   ├── Translator.jsx     # Übersetzungs-Komponente
│   │   ├── Quiz.jsx           # Quiz-System
│   │   └── Favorites.jsx      # Favoriten-Verwaltung
│   ├── utils/
│   │   ├── storage.js         # localStorage Utilities
│   │   └── translate.js       # Übersetzungs-Logik & Speech
│   ├── data/
│   │   └── quizData.js        # Quiz-Fragen
│   ├── App.jsx                # Haupt-App
│   └── index.css              # Tailwind Styles
├── START.bat                   # Einfacher Start
└── package.json               # Dependencies
```

## 🎨 Features im Detail

### Spracheingabe
Die App nutzt die Web Speech API für Spracherkennung. Einfach auf das Mikrofon klicken und sprechen!

### Text-to-Speech
Französische Wörter werden mit einer natürlichen französischen Stimme ausgesprochen (wenn verfügbar).

### Belohnungssystem
- **Sterne**: Für jede richtige Antwort im Quiz
- **Level**: Steigt automatisch mit gesammelten Sternen
- **Streak**: Zählt die Tage, an denen du spielst

### Fortschritt-Speicherung
Alle Daten werden lokal im Browser gespeichert:
- Favoriten
- Sterne & Level
- Streak
- Quiz-Statistiken

## 🔧 Entwicklung

### Dependencies installieren
```bash
npm install
```

### Development Server starten
```bash
npm run dev
```

### Production Build erstellen
```bash
npm run build
```

## 🌐 Browser-Kompatibilität

- **Chrome/Edge**: ✅ Volle Unterstützung
- **Firefox**: ✅ Volle Unterstützung (eingeschränkte Speech API)
- **Safari**: ⚠️ Eingeschränkte Spracheingabe

## 💡 Tipps

1. **Mikrofon-Berechtigung**: Beim ersten Mal musst du dem Browser die Mikrofon-Nutzung erlauben
2. **Lautsprecher**: Stelle sicher, dass dein Sound an ist für Text-to-Speech
3. **Täglich spielen**: Behalte deine Streak bei! 🔥
4. **Favoriten nutzen**: Speichere schwierige Wörter zum späteren Üben

## 🎯 Lernziele

- **Grundwortschatz**: Die wichtigsten französischen Wörter
- **Aussprache**: Höre und lerne die korrekte Aussprache
- **Vokabeln**: Baue deinen Wortschatz spielerisch auf
- **Wiederholung**: Nutze das Quiz zum Festigen

## 🆘 Probleme?

### App startet nicht?
```bash
# Dependencies neu installieren
cd "c:\Charlie´s app\french-app"
npm install
npm run dev
```

### Mikrofon funktioniert nicht?
- Überprüfe Browser-Berechtigungen
- Nutze Chrome/Edge für beste Ergebnisse

### Keine Sounds?
- Überprüfe Lautsprecher-Einstellungen
- Stelle sicher, dass der Browser Sound abspielen darf

## 🚀 Deployment

Die App ist bereit für Vercel Deployment!

**Schnellstart:**
1. Code zu GitHub pushen
2. Mit Vercel verbinden
3. Deploy klicken
4. Fertig! 🎉

Detaillierte Anleitung: Siehe [DEPLOYMENT.md](DEPLOYMENT.md)

**Live Demo URL:** Nach dem Deployment bekommst du eine URL wie:
`https://french-app-xyz.vercel.app`

## 📦 Production Build

```bash
# Build erstellen
npm run build

# Build lokal testen
npm run preview
```

Build-Ausgabe in `dist/` Ordner (bereits getestet ✅)

## 🎉 Viel Spaß beim Lernen!

Made with ❤️ for Charlie

---

**Technologie:**
- React 19 + Vite
- Tailwind CSS v3
- MyMemory Translation API
- Web Speech API
- localStorage für Fortschritt
