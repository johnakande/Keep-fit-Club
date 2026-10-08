@echo off
title KeepFit site - close this window to stop it
cd /d "%~dp0"

if not exist node_modules (
  echo Installing packages. First run only, this takes a minute...
  call npm install
  if errorlevel 1 goto failed
)

echo Building the site...
call npm run build
if errorlevel 1 goto failed

echo.
echo The site will open at http://localhost:3100
echo Keep this window open while you look at it. Close it to stop the site.
echo.
rem Preview mode: forms show their success screens but nothing is emailed.
set FORMS_PREVIEW=1
start "" cmd /c "timeout /t 4 >nul & start http://localhost:3100"
call npx next start -p 3100
goto end

:failed
echo.
echo Something went wrong. Copy the messages above and send them over.
pause

:end
