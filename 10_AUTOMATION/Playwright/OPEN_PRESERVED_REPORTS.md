# Opening the Preserved Playwright Reports

The simplest method is to open the saved `index.html` files directly in a browser:

- `automation-evidence/playwright-report-chromium-24-pass/index.html`
- `automation-evidence/playwright-report-browser-compatibility/index.html`

If using Playwright's report server and the default port is already occupied, use a different port:

```powershell
npx playwright show-report ".\automation-evidence\playwright-report-chromium-24-pass" --port 9324
```

```powershell
npx playwright show-report ".\automation-evidence\playwright-report-browser-compatibility" --port 9325
```

Do not paste previous PowerShell error output back into the command prompt.
