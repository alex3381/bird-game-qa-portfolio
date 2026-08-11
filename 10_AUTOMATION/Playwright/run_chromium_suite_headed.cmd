@echo off
setlocal
echo Bird Game - Full Chromium Automation Suite
call npx playwright test e2e --project=chromium --headed
exit /b %errorlevel%
