# 🚀 Vercel Deployment Anleitung

## Charlie's Französisch Lern-App auf Vercel deployen

### Voraussetzungen
- GitHub Account
- Vercel Account (kostenlos auf [vercel.com](https://vercel.com))

### Schritt-für-Schritt Anleitung

#### 1. GitHub Repository erstellen
1. Gehe zu [github.com](https://github.com) und erstelle ein neues Repository
2. Name: z.B. `french-learning-app`
3. Setze es auf **Public** oder **Private** (beides funktioniert)
4. **NICHT** "Initialize with README" anklicken

#### 2. Code zu GitHub pushen
```bash
cd "c:\Charlie´s app\french-app"

# Git initialisieren (falls noch nicht geschehen)
git init

# Alle Dateien hinzufügen
git add .

# Ersten Commit erstellen
git commit -m "Initial commit: Charlie's French Learning App"

# Remote Repository hinzufügen (ersetze USERNAME und REPO)
git remote add origin https://github.com/USERNAME/REPO.git

# Zu GitHub pushen
git branch -M main
git push -u origin main
```

#### 3. Auf Vercel deployen
1. Gehe zu [vercel.com](https://vercel.com) und melde dich an
2. Klicke auf **"Add New Project"**
3. Importiere dein GitHub Repository
4. Vercel erkennt automatisch dass es ein Vite Projekt ist
5. **Build Settings sind bereits konfiguriert** (durch vercel.json):
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Klicke auf **"Deploy"**

#### 4. Fertig! 🎉
- Die App wird automatisch deployed
- Du bekommst eine URL wie: `https://french-app-xyz.vercel.app`
- Bei jedem Git Push wird automatisch neu deployed

### Lokaler Production Build Test
```bash
# Build erstellen
npm run build

# Build lokal testen
npm run preview
```

### Environment Variables (falls benötigt)
Falls du später eigene API Keys hinzufügen willst:
1. Gehe zu deinem Vercel Projekt
2. Settings → Environment Variables
3. Füge Variablen hinzu (z.B. `VITE_API_KEY`)

### Wichtige Dateien
- `vercel.json` - Vercel Konfiguration
- `.vercelignore` - Dateien die nicht deployed werden
- `package.json` - Dependencies und Build Scripts

### Troubleshooting

**Build schlägt fehl?**
- Prüfe ob `npm run build` lokal funktioniert
- Schaue in die Vercel Build Logs

**App lädt nicht?**
- Prüfe Browser Console auf Fehler
- Stelle sicher dass alle Assets korrekt geladen werden

**API funktioniert nicht?**
- MyMemory API benötigt keine Authentifizierung
- Prüfe Network Tab im Browser

### Updates deployen
```bash
# Änderungen machen
git add .
git commit -m "Deine Änderung beschreiben"
git push

# Vercel deployed automatisch!
```

### Kosten
- Vercel ist **100% kostenlos** für persönliche Projekte
- Unbegrenzte Deployments
- Automatische HTTPS
- Global CDN

## Support
Bei Fragen: [Vercel Docs](https://vercel.com/docs)
