$ErrorActionPreference = 'Stop'

$playwrightRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $playwrightRoot

Write-Host 'Bird Game automation baseline verification'
Write-Host '------------------------------------------'

$requiredFiles = @(
    '.\e2e\TC-START-001_initial-state.spec.js',
    '.\e2e\TC-START-002_idle-state.spec.js',
    '.\e2e\TC-START-006_mouse-click-start.spec.js',
    '.\e2e\TC-MOVE-001_up-arrow-movement.spec.js',
    '.\e2e\TC-MOVE-002_down-arrow-movement.spec.js',
    '.\e2e\BR-FR-006_space-jump.spec.js',
    '..\..\12_APPLICATION_UNDER_TEST\source\index.html',
    '..\..\12_APPLICATION_UNDER_TEST\source\game.css',
    '..\..\12_APPLICATION_UNDER_TEST\source\scripts.js'
)

foreach ($file in $requiredFiles) {
    if (-not (Test-Path $file)) {
        throw "Missing required file: $file"
    }
}

Write-Host 'Required files: OK'
Write-Host 'Running Chromium baseline suite...'

npx playwright test e2e --project=chromium --headed
