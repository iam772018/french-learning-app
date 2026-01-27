@echo off
echo.
echo ========================================
echo  Charlie's Franzosisch Lern-App
echo ========================================
echo.
echo Starte den Development Server...
echo.
echo Die App wird automatisch im Browser geoffnet!
echo Adresse: http://localhost:5173
echo.
echo Zum Beenden: Druecke STRG+C
echo.

cd /d "%~dp0"
npm run dev

pause
