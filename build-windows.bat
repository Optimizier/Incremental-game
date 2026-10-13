@echo off
setlocal
cd /d "%~dp0"
echo Installing project dependencies...
call npm install
if errorlevel 1 goto failed
echo Building the Windows installer...
call npm run dist:installer
if errorlevel 1 goto failed
echo.
echo Done. Look for the installer in the dist folder.
pause
exit /b 0
:failed
echo.
echo Build failed. Check the error messages above.
pause
exit /b 1
