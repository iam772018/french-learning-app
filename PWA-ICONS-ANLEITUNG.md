# PWA Icons Generierung

## Option 1: Online Tool (Einfachste Methode)

1. Öffne [realfavicongenerator.net](https://realfavicongenerator.net/)
2. Lade `public/app-icon.svg` hoch
3. Generiere alle benötigten Icons
4. Lade das Paket herunter
5. Entpacke die Icons in `public/`

## Option 2: Mit Sharp (Node.js)

```bash
npm install --save-dev sharp-cli

# Icons generieren
npx sharp -i public/app-icon.svg -o public/icon-72x72.png resize 72 72
npx sharp -i public/app-icon.svg -o public/icon-96x96.png resize 96 96
npx sharp -i public/app-icon.svg -o public/icon-128x128.png resize 128 128
npx sharp -i public/app-icon.svg -o public/icon-144x144.png resize 144 144
npx sharp -i public/app-icon.svg -o public/icon-152x152.png resize 152 152
npx sharp -i public/app-icon.svg -o public/icon-192x192.png resize 192 192
npx sharp -i public/app-icon.svg -o public/icon-384x384.png resize 384 384
npx sharp -i public/app-icon.svg -o public/icon-512x512.png resize 512 512
```

## Option 3: Vite PWA Plugin (Automatisch)

```bash
npm install -D vite-plugin-pwa
```

Dann in `vite.config.js` konfigurieren (siehe unten).

## Benötigte Icon-Größen

- 72x72px - Kleinere Geräte
- 96x96px - Standard mobile
- 128x128px - Standard mobile
- 144x144px - Hohe Auflösung mobile
- 152x152px - iPad
- 192x192px - Android (erforderlich)
- 384x384px - Hohe Auflösung
- 512x512px - Splash Screens (erforderlich)

## Maskable Icons

Für Android 13+ sollten die 192x192 und 512x512 Icons auch als "maskable" funktionieren.
Das bedeutet: Wichtiger Content sollte in der sicheren Zone (80% des Icons) sein.
