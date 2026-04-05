@echo off
title Mimir Labs - Contract Builder
cd /d "%~dp0"

:: Check for Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo  Node.js is not installed.
    echo  Download it from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

:: Install dependencies if needed
if not exist "node_modules" (
    echo  Installing dependencies...
    call npm install --production --silent
    echo.
)

:: Start the server
echo.
echo  Starting Contract Builder...
echo  Browser will open automatically.
echo  Press Ctrl+C to stop.
echo.
node src/server.js
