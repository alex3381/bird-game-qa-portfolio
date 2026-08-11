# Bird Game Playwright Automation - Final Verified Status

## Jira task

**BG-29 - Automate Core Regression Tests for Bird Game v1 using Playwright** is **Done** as of 11 August 2026.

## Final verified execution

| Execution | Result |
|---|---|
| Chromium full regression | 24 Passed / 0 Failed |
| Firefox compatibility smoke | Passed |
| Google Chrome compatibility smoke | Passed |
| Microsoft Edge compatibility smoke | Passed |
| Cross-browser smoke total | 3 Passed / 0 Failed |
| Final automation executions | 27 Passed / 0 Failed |

The full Chromium suite covers BR-FR-001 through BR-FR-024 plus BR-NFR-001 and BR-NFR-002 coverage relevant to the Chromium run. BR-NFR-001 was separately verified in Firefox, Google Chrome and Microsoft Edge.

## Suite structure

- 22 spec files
- 24 Chromium automated test cases
- serial execution (`workers: 1`) because the application is animation/timing-sensitive
- HTML reporter
- screenshot on failure
- video on failure
- trace retained on failure

## Preserved evidence

The final machine-generated reports are retained and should not be overwritten:

- `automation-evidence/playwright-report-chromium-24-pass/index.html`
- `automation-evidence/playwright-report-browser-compatibility/index.html`

The working `playwright-report` and `test-results` directories are deliberately excluded from the final GitHub-ready package because they are reproducible and ignored by Git.

## Running the suite

Install dependencies:

```bash
npm install
```

Install Playwright-managed browsers as needed:

```bash
npx playwright install chromium firefox
```

Run Chromium regression:

```bash
npm run test:chromium
```

Run local supported-browser compatibility smoke:

```bash
npm run test:compatibility
```

Windows final runner:

```cmd
.\run_final_suite.cmd
```

## BG-30 known issue

BG-30 remains separately open. The baseline application uses per-frame movement values inside `requestAnimationFrame`, so movement speed can vary with rendering frame rate. The final automation does not alter `scripts.js` to conceal this concern.

For some requirement-focused animation tests, deterministic in-page setup is used to isolate the behaviour under test. Those temporary test-page changes do not modify the application source on disk.
