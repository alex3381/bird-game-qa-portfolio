\
@echo off
setlocal

echo.
echo ============================================================
echo Bird Game - Final Playwright Automation Verification
echo ============================================================
echo.

if not exist "e2e" (
  echo ERROR: e2e folder not found.
  exit /b 1
)

if not exist "playwright.config.js" (
  echo ERROR: playwright.config.js not found.
  exit /b 1
)

if not exist "..\..\12_APPLICATION_UNDER_TEST\source\scripts.js" (
  echo ERROR: application source scripts.js not found.
  exit /b 1
)

echo [1/4] JavaScript syntax checks...
node --check "..\..\12_APPLICATION_UNDER_TEST\source\scripts.js"
if errorlevel 1 exit /b 1

for %%F in (e2e\*.spec.js) do (
  node --check "%%F"
  if errorlevel 1 exit /b 1
)

echo Syntax checks: PASS
echo.

echo [2/4] Full Chromium regression suite...
call npm run test:chromium
if errorlevel 1 (
  echo.
  echo Chromium suite: FAILED
  echo Open the HTML report with: npx playwright show-report
  exit /b 1
)

echo Chromium suite: PASS
echo.

echo [3/4] Supported-browser compatibility smoke...
call npm run test:compatibility
if errorlevel 1 (
  echo.
  echo Browser compatibility smoke: FAILED
  echo Confirm Playwright Firefox and local Google Chrome / Microsoft Edge are installed.
  exit /b 1
)

echo Browser compatibility smoke: PASS
echo.

echo [4/4] Final status...
echo.
echo FINAL AUTOMATION VERIFICATION: PASS
echo Full Chromium suite passed.
echo Firefox / Chrome / Edge compatibility smoke passed.
echo.
echo Preserved evidence remains under automation-evidence.
echo.
exit /b 0
