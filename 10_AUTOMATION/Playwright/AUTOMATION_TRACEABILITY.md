# Bird Game Automation Traceability

| Requirement | Jira | Automated coverage |
|---|---|---|
| BR-FR-001 | BG-8 | TC-START-001_initial-state.spec.js |
| BR-FR-002 | BG-9 | TC-START-002_idle-state.spec.js |
| BR-FR-003 | BG-10 | TC-START-006_mouse-click-start.spec.js plus keyboard/on-screen start tests |
| BR-FR-004 | BG-11 | TC-MOVE-001_up-arrow-movement.spec.js |
| BR-FR-005 | BG-11 | TC-MOVE-002_down-arrow-movement.spec.js |
| BR-FR-006 | BG-12 | BR-FR-006_space-jump.spec.js |
| BR-FR-007 | BG-12 | BR-FR-007_mouse-click-jump.spec.js |
| BR-FR-008 | BG-11 | BR-FR-008_on-screen-controls.spec.js |
| BR-FR-009 | BG-13 | BR-FR-009_gravity.spec.js |
| BR-FR-010 | BG-14 | BR-FR-010_obstacle-movement.spec.js |
| BR-FR-011 | BG-14 | BR-FR-011_obstacle-reset.spec.js |
| BR-FR-012 | BG-15 | BR-FR-012_random-gap-on-reset.spec.js |
| BR-FR-013 | BG-15 | BR-FR-013_gap-size-and-boundaries.spec.js |
| BR-FR-014 | BG-16 | BR-FR-014_017_score-initial-visible.spec.js |
| BR-FR-015 | BG-17 | BR-FR-015_016_scoring.spec.js |
| BR-FR-016 | BG-17 | BR-FR-015_016_scoring.spec.js |
| BR-FR-017 | BG-16 | BR-FR-014_017_score-initial-visible.spec.js |
| BR-FR-018 | BG-18 | BR-FR-018_019_collision-game-over.spec.js |
| BR-FR-019 | BG-18 | BR-FR-018_019_collision-game-over.spec.js |
| BR-FR-020 | BG-18 | BR-FR-020_safe-gap-passage.spec.js |
| BR-FR-021 | BG-19 | BR-FR-021_game-over-state.spec.js |
| BR-FR-022 | BG-20 | BR-FR-022_restart-button.spec.js |
| BR-FR-023 | BG-21 | BR-FR-023_024_restart-reset-idle.spec.js |
| BR-FR-024 | BG-21 | BR-FR-023_024_restart-reset-idle.spec.js |
| BR-NFR-001 | BG-22 | BR-NFR-001_browser-compatibility.spec.js; run in Firefox, Chrome and Edge |
| BR-NFR-002 | BG-23 | BR-NFR-002_small-screen-controls.spec.js |

## Test design note

Where normal gameplay could terminate too early because of the open BG-30 timing defect, requirement-focused tests use deterministic in-page setup to place the Bird Game into the exact state required for the assertion. This setup is temporary to the Playwright page and does not edit the application source files.

## Final execution status

- Chromium full regression: **24 Passed, 0 Failed**
- Firefox compatibility smoke: **Passed**
- Google Chrome compatibility smoke: **Passed**
- Microsoft Edge compatibility smoke: **Passed**
- Final automation executions: **27 Passed, 0 Failed**
- Jira automation task BG-29: **Done**

Evidence:

- `automation-evidence/playwright-report-chromium-24-pass/index.html`
- `automation-evidence/playwright-report-browser-compatibility/index.html`

BG-30 remains open as a separate known issue and is not represented as resolved by these execution results.
