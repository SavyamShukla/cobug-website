@echo off
echo ========================================================
echo       Deploying COBUG Landing Page to Vercel
echo ========================================================
echo.
cd /d "%~dp0"
echo Running Vercel CLI...
npx vercel --prod
echo.
pause
