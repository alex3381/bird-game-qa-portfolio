# Bird Game QA Portfolio

A complete software testing portfolio project covering requirements analysis, test planning, manual test design and execution, defect management, Jira workflow, browser compatibility, exploratory testing, traceability, and Playwright automation.

## Final project position - 11 August 2026

| Area | Final position |
|---|---|
| Functional requirements | BR-FR-001 to BR-FR-024 covered |
| Non-functional requirements | BR-NFR-001 and BR-NFR-002 covered |
| Manual test cycle | 41/41 planned tests executed |
| Manual initial result | 38 Pass, 2 Fail, 1 Blocked |
| Manual closure | 40 confirmed Pass + 1 closed Not Reproducible observation; 0 open Fail; 0 Blocked |
| Playwright Chromium regression | 24/24 Passed |
| Cross-browser automation smoke | Firefox, Google Chrome and Microsoft Edge: 3/3 Passed |
| Final automation executions | 27 Passed, 0 Failed |
| Automation Jira task | BG-29 Done |
| Known issue | BG-30 remains open: frame-rate-dependent movement calculations |

The portfolio is **complete for presentation and GitHub use, with BG-30 deliberately retained as a transparent known issue** rather than being hidden by changing the application solely to make automation pass.

## Project structure

- `00_PROJECT_MANAGEMENT` - Jira evidence, project notes, elicitation and specification records
- `01_REQUIREMENTS` - requirements traceability
- `02_TEST_PLAN` - approved test planning documents
- `03_TEST_SCENARIOS` - test scenarios
- `04_TEST_CASES` - detailed manual test cases
- `05_TEST_DATA` - test data
- `06_EXPLORATORY_TESTING` - exploratory charters
- `07_DEFECT_MANAGEMENT` - defect logs, final defect status and evidence
- `08_BROWSER_COMPATIBILITY` - manual browser compatibility matrix
- `09_TEST_EXECUTION` - manual execution results and evidence
- `10_AUTOMATION` - Playwright regression suite and preserved HTML reports
- `11_TEST_SUMMARY` - manual-cycle and final-project summary reports
- `12_APPLICATION_UNDER_TEST` - Bird Game source under test
- `13_SCREENSHOTS` - portfolio screenshots where applicable

## Manual QA highlights

The manual cycle executed all 41 planned tests. BG-27 (first obstacle not visible) was fixed and passed retest. BG-28 (mouse-click start) was closed as Not Reproducible after controlled repeat testing passed 20/20; no BG-28-specific application change was made.

Historical manual-cycle closure records dated 10 August 2026 remain preserved unchanged. The later automation phase discovered BG-30, so the final project-level defect position is recorded separately under `07_DEFECT_MANAGEMENT`.

## Playwright automation

Automation is under:

`10_AUTOMATION/Playwright`

Final verified execution:

- Full Chromium regression: **24 passed, 0 failed**
- Compatibility smoke: **Firefox PASS, Google Chrome PASS, Microsoft Edge PASS**
- Total final executions: **27 passed, 0 failed**

Preserved machine-generated reports:

- `10_AUTOMATION/Playwright/automation-evidence/playwright-report-chromium-24-pass/index.html`
- `10_AUTOMATION/Playwright/automation-evidence/playwright-report-browser-compatibility/index.html`

### Run locally

From `10_AUTOMATION/Playwright`:

```bash
npm install
npx playwright install chromium firefox
npm run test:chromium
npm run test:compatibility
```

On Windows, the final verification runner is:

```cmd
.\run_final_suite.cmd
```

## Traceability

The project maps requirements to Jira stories and test coverage. Automation traceability is maintained in:

`10_AUTOMATION/Playwright/AUTOMATION_TRACEABILITY.md`

The manual requirements traceability matrix remains in:

`01_REQUIREMENTS/Requirement-Traceability/Bird_Game_Requirements_Traceability_Matrix_v1.0_FINAL_CLOSED_2026-08-10.xlsx`

## Defect position

- **BG-27 - Done / Fixed:** first obstacle visibility issue; targeted retest passed.
- **BG-28 - Done / Not Reproducible:** mouse-click start observation; 20/20 controlled Chromium executions passed.
- **BG-30 - Open known issue:** original frame-based movement values are applied per `requestAnimationFrame`, so real-world movement speed can vary with rendering frame rate. This issue is retained as an explicit technical risk.

See `07_DEFECT_MANAGEMENT/Defect-Reports/Bird_Game_Final_Defect_Status_Summary_2026-08-11.xlsx` and the accompanying Markdown summary.

## Portfolio talking point

This project demonstrates the full testing lifecycle: requirement analysis, risk-based planning, systematic manual test design, evidence-led defect handling, retest and regression, Jira workflow, traceability, browser coverage, automation design, deterministic test setup for animation-sensitive behaviour, and transparent management of a known technical limitation.
