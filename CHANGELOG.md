# Changelog

All future Codex work must update this changelog after each completed task.

## 2026-07-02 - Field Photos New Tab Launcher

### Change Summary

- Replaced the Workbench Field Photos iframe with a new-tab launcher page.
- Kept the configurable Photo Transfer URL and Save URL control.
- Added a simple workflow panel explaining how to open, sign in, upload, and download photo folders.

### Files Changed

- `public/index.html`
- `public/app.js`
- `public/styles.css`
- `CHANGELOG.md`

### Notes

- This avoids iframe login and third-party cookie issues.
- Existing Workbench navigation and the Photo Transfer app login remain preserved.
- JavaScript syntax validation passed for `public/app.js` and `server.mjs`.

### Status

- Complete

## 2026-07-02 - Photo Transfer Embedded Login Cookie Fix

### Change Summary

- Updated the fresh Photo Transfer Tool session cookie settings for Workbench iframe login.
- Added notes for embedded Workbench use.

### Files Changed

- `photo-transfer-tool-fresh/app.py`
- `photo-transfer-tool-fresh/README.md`
- `CHANGELOG.md`

### Notes

- Session cookies now use `SameSite=None` and `Secure=True` for HTTPS iframe use.
- If a browser blocks third-party cookies completely, users can still open the Photo Transfer app in a new tab.

### Status

- Complete

## 2026-07-02 - Photo Transfer Folder Creation Fix

### Change Summary

- Added a `Create Folder` button to the fresh Photo Transfer Tool.
- Added a folder creation API so folders can be created before uploading photos.
- Updated upload logic to use the typed folder/address or selected folder and refresh the gallery after upload.
- Made login password comparison ignore accidental leading/trailing spaces.

### Files Changed

- `photo-transfer-tool-fresh/app.py`
- `photo-transfer-tool-fresh/templates/index.html`
- `photo-transfer-tool-fresh/static/app.js`
- `CHANGELOG.md`

### Notes

- Uploading photos still automatically creates the folder if needed.
- Python and JavaScript syntax validation passed.

### Status

- Complete

## 2026-07-02 - Photo Transfer Python Runtime Pin

### Change Summary

- Pinned the fresh Photo Transfer Tool to Python 3.11.9 for Render deployment.
- Added `PYTHON_VERSION` to the Render configuration.

### Files Changed

- `photo-transfer-tool-fresh/runtime.txt`
- `photo-transfer-tool-fresh/render.yaml`
- `CHANGELOG.md`

### Notes

- This resolves Render configuration warnings about dependencies requiring Python 3.8 or newer.
- Start command remains `python app.py`.

### Status

- Complete

## 2026-07-02 - Fresh Photo Transfer Tool

### Change Summary

- Created a fresh Render-ready Photo Transfer Tool in a new folder.
- Removed Gunicorn from the fresh deployment path and set Render to run `python app.py`.
- Added password login, multi-photo upload, folder-based gallery, ZIP download, and delete controls.

### Files Changed

- `photo-transfer-tool-fresh/app.py`
- `photo-transfer-tool-fresh/requirements.txt`
- `photo-transfer-tool-fresh/render.yaml`
- `photo-transfer-tool-fresh/README.md`
- `photo-transfer-tool-fresh/templates/login.html`
- `photo-transfer-tool-fresh/templates/index.html`
- `photo-transfer-tool-fresh/static/app.js`
- `photo-transfer-tool-fresh/static/styles.css`
- `CHANGELOG.md`

### Notes

- The fresh version deploys with `startCommand: python app.py`.
- Python and JavaScript syntax validation passed.

### Status

- Complete

## 2026-07-02 - Photo Transfer Render Start Command

### Change Summary

- Added a Render configuration file for the Photo Transfer Tool.
- Set the Render start command to run Gunicorn through Python module execution.

### Files Changed

- `photo-transfer-tool/render.yaml`
- `CHANGELOG.md`

### Notes

- The configured start command is `python -m gunicorn app:app --bind 0.0.0.0:$PORT`.
- This avoids Render failures where `gunicorn` is not found on the shell path.

### Status

- Complete

## 2026-07-02 - Workbench Field Photos Page

### Change Summary

- Added a `Field Photos` section to Appraisal Workbench.
- Embedded the private Photo Transfer Tool in the Workbench using a configurable URL.
- Added a saved Photo Transfer URL field using local storage.
- Added the `/field-photos` app route.

### Files Changed

- `public/index.html`
- `public/app.js`
- `public/styles.css`
- `server.mjs`
- `CHANGELOG.md`

### Notes

- Default embedded URL is `https://appraisal-photo-transfer.onrender.com`.
- Existing map, market, sketch, billing, and order manager functions were preserved.
- JavaScript syntax validation passed for `public/app.js` and `server.mjs`.

### Status

- Complete

## 2026-07-02 - Photo Transfer Render Gunicorn Dependency

### Change Summary

- Added `gunicorn` to the Photo Transfer Tool dependencies for Render deployment.

### Files Changed

- `photo-transfer-tool/requirements.txt`
- `CHANGELOG.md`

### Notes

- Render start command `gunicorn app:app` requires this package to be installed during build.

### Status

- Complete

## 2026-07-02 - Sketch Label Tab Commit

### Change Summary

- Updated Building Footprint Sketch label editors so `Tab` confirms edits the same way as `Enter`.
- Applied the same key behavior to the floor plan label editor for consistency.
- Updated the Building Footprint script version query to avoid stale browser cache.

### Files Changed

- `public/building-footprint.js`
- `public/index.html`
- `CHANGELOG.md`

### Notes

- Existing sketch drawing, label editing, export, copy, and download logic were preserved.
- `building-footprint.js` and `app.js` passed JavaScript syntax validation.

### Status

- Complete

## 2026-07-02 - Private Appraisal Photo Transfer Tool

### Change Summary

- Created a standalone private photo transfer web app for appraisal field photos.
- Added mobile-friendly bulk photo upload with progress bar.
- Added desktop gallery management by property folder/address.
- Added ZIP download for all photos in a folder.
- Added individual photo delete and full folder delete support.
- Added password-protected admin login and CSRF protection for write actions.

### Files Changed

- `photo-transfer-tool/app.py`
- `photo-transfer-tool/requirements.txt`
- `photo-transfer-tool/README.md`
- `photo-transfer-tool/templates/login.html`
- `photo-transfer-tool/templates/index.html`
- `photo-transfer-tool/static/app.js`
- `photo-transfer-tool/static/styles.css`
- `CHANGELOG.md`

### Notes

- Photos are stored privately under `photo-transfer-tool/instance/uploads` when the app runs.
- The recommended first architecture is Python Flask with local disk storage for low cost and simple private use.
- Python syntax validation passed using the bundled Codex Python runtime.

### Status

- Complete

## 2026-07-02 - Appraisal Dashboard Font Size Increase

### Change Summary

- Increased the Appraisal Dashboard base font size by 2px for better readability.

### Files Changed

- `appraisal-management-dashboard.html`
- `CHANGELOG.md`

### Notes

- Existing dashboard layout, data, filters, calculations, and storage behavior were preserved.

### Status

- Complete

## 2026-07-02 - Order Manager Client Field and Filter

### Change Summary

- Added a `Client` field to each Order Manager job.
- Added client autocomplete based on saved job clients.
- Added a `Client` filter to the Work List so reports can show one client's orders only.
- Applied the same client filter to the Calendar view.
- Added client display to the Work List and job detail modal.

### Files Changed

- `appraisal-management-dashboard.html`
- `CHANGELOG.md`

### Notes

- Existing saved jobs remain compatible and show `Not set` for Client until updated.
- Existing file number, address, status, fee, GST, commission, sorting, calendar, and local storage behavior were preserved.

### Status

- Complete

## 2026-07-02 - Order Manager File Number Field

### Change Summary

- Added a `File Number` field to the Order Manager job form.
- Added optional automatic file number generation using an `AW-YYYYMM-###` format.
- Added click-to-edit behavior for automatically generated file numbers.
- Added file number display to the work list and job detail modal.

### Files Changed

- `appraisal-management-dashboard.html`
- `CHANGELOG.md`

### Notes

- Existing saved jobs remain compatible and show `Not set` until a file number is added.
- Existing address, status, fee, GST, commission, calendar, and local storage behavior were preserved.

### Status

- Complete

## 2026-07-02 - Order Manager Commission Calculation

### Change Summary

- Added `Commission (%)` to the Order Manager job form.
- Added automatic commission amount calculation based on fee amount.
- Added commission display to the work list and job detail modal.

### Files Changed

- `appraisal-management-dashboard.html`
- `CHANGELOG.md`

### Notes

- Existing Fee, GST, Total, local storage, table, and calendar behavior were preserved.
- Existing saved jobs safely default to 0% commission until edited.

### Status

- Complete

## 2026-07-02 - Billing Navigation Placement

### Change Summary

- Moved the `Billing` navigation button next to `Logout`.
- Kept all existing billing route and logout behavior unchanged.

### Files Changed

- `public/index.html`
- `CHANGELOG.md`

### Notes

- Button order is now `Order Manager`, `Billing`, `Logout` at the end of the top navigation.

### Status

- Complete

## 2026-07-02 - Order Manager Readability Restyle

### Change Summary

- Restyled the Order Manager dashboard for a cleaner professional look.
- Increased font sizes across the page, form fields, table, calendar, buttons, and summary cards.
- Improved visual contrast, card spacing, shadows, and status readability.

### Files Changed

- `appraisal-management-dashboard.html`
- `CHANGELOG.md`

### Notes

- Existing local storage, job form, calendar, sorting, GST calculation, and status logic were preserved.

### Status

- Complete

## 2026-07-02 - Order Manager Overdue Red Highlight

### Change Summary

- Updated overdue jobs to display with stronger red highlighting in the work list.
- Added red overdue styling for calendar event badges.

### Files Changed

- `appraisal-management-dashboard.html`
- `CHANGELOG.md`

### Notes

- Existing due date and urgency logic was preserved.

### Status

- Complete

## 2026-07-02 - Order Manager Address Autocomplete

### Change Summary

- Added address autocomplete support to the Order Manager `File / Address` field.
- Saved job addresses now appear as reusable autocomplete suggestions.

### Files Changed

- `appraisal-management-dashboard.html`
- `CHANGELOG.md`

### Notes

- This uses local saved job addresses and does not require a third-party geocoding API.
- Existing local storage, GST, status, table, and calendar behavior were preserved.

### Status

- Complete

## 2026-07-02 - Order Manager Appointment Status

### Change Summary

- Added `Appointment` as a selectable status in the Order Manager dashboard.
- Added a distinct appointment status badge style for the work list.

### Files Changed

- `appraisal-management-dashboard.html`
- `CHANGELOG.md`

### Notes

- Existing job storage, GST calculation, calendar, and table logic were preserved.

### Status

- Complete

## 2026-07-02 - Order Manager Dashboard App Connection

### Change Summary

- Connected the standalone Real Estate Appraisal Management Dashboard to the main Appraisal Workbench app.
- Added an `Order Manager` button to the main top navigation.
- Added an `/order-manager` app route and embedded the dashboard inside the app through a full-width iframe.
- Copied the dashboard into the app public folder as `public/appraisal-management-dashboard.html`.

### Files Changed

- `public/index.html`
- `public/app.js`
- `public/styles.css`
- `server.mjs`
- `public/appraisal-management-dashboard.html`
- `CHANGELOG.md`

### Notes

- Existing map, sketch, market trend, billing, and AI logic were not changed.
- Updated files were synchronized to the clean final folder.
- `public/app.js` and `server.mjs` passed JavaScript syntax validation.

### Status

- Complete

## 2026-07-02 - Real Estate Appraisal Management Dashboard SPA

### Change Summary

- Added a standalone single page application for managing real estate appraisal jobs.
- Added localStorage persistence, data entry form, automatic GST calculation, days elapsed logic, sortable work list, urgent row highlighting, monthly calendar view, and editable job modal.
- Kept the UI and all labels/data in English.

### Files Changed

- `appraisal-management-dashboard.html`
- `CHANGELOG.md`

### Notes

- This is a standalone HTML/CSS/JavaScript SPA and does not modify the existing Appraisal Workbench app code.
- Data is stored locally in the browser under `realEstateAppraisalDashboardJobs`.

### Status

- Complete

## 2026-07-01 - Personal Plan Billing Foundation

### Change Summary

- Added the first Appraisal Workbench subscription foundation for a single Personal Plan.
- Added Pricing, Billing Success, and Subscription & Usage screens.
- Added Stripe Checkout session endpoint for a 30-day trial subscription using `STRIPE_PERSONAL_PRICE_ID`.
- Added Stripe webhook endpoint with signature verification and subscription status updates.
- Added account-level monthly usage counters for Comparable Maps, Sketches, and Report Reviews with 50 / 50 / 50 Personal Plan limits.
- Added final-action usage hooks for map export, sketch save/export/copy, dimension page export/copy, and successful AI Grid Review completion.
- Added Stripe environment variable examples and ignored `billing-store.json`.

### Files Changed

- `server.mjs`
- `public/index.html`
- `public/app.js`
- `public/building-footprint.js`
- `public/billing.js`
- `public/styles.css`
- `.env.local.example`
- `.gitignore`
- `CHANGELOG.md`

### Notes

- Stripe secret values are not hardcoded. Configure `STRIPE_SECRET_KEY`, `STRIPE_PERSONAL_PRICE_ID`, `STRIPE_WEBHOOK_SECRET`, and `APP_URL` in the deployment environment.
- When Stripe billing is not configured, checkout returns a setup message and usage tracking does not block existing tools.
- Updated files were synchronized to the clean final folder.

### Status

- Complete

## 2026-07-01 - Intro Page Redesign

### Change Summary

- Redesigned the intro page with a cleaner white/teal appraisal workspace layout.
- Simplified the landing navigation to focus on Features and Workflow.
- Updated hero copy to emphasize comparable maps, market trend support, time adjustments, sketches, and cautious report wording.
- Reworked the hero tool cards into Map / Analyze / Report workflow cards.
- Refined the floating preview cards and feature rail styling for a quieter professional first impression.

### Files Changed

- `public/index.html`
- `public/styles.css`
- `CHANGELOG.md`

### Notes

- No app feature logic was changed.
- Updated files were synchronized to the clean final folder.
- The intro page was verified in the local browser at `http://localhost:4173/`.

### Status

- Complete

## 2026-07-01 - Narrative Assistant UI Simplification

### Change Summary

- Simplified the Narrative Assistant page so the main screen focuses on the prompt textarea, Generate button, and generated output.
- Moved Quick Examples, Options, Recent Prompts, and Favorites into compact expandable sections to reduce visual clutter.
- Shortened the primary action label from "Generate Report Wording" to "Generate".
- Kept the existing AI API generation flow, copy buttons, recent prompts, and favorites behavior intact.

### Files Changed

- `public/index.html`
- `public/styles.css`
- `public/narrative-assistant.js`
- `CHANGELOG.md`

### Notes

- The appraisal wording remains AI-generated through the existing `/api/generate-narrative` endpoint.
- Updated files were synchronized to the clean final folder.
- `public/narrative-assistant.js` passed JavaScript syntax validation with the bundled Node.js runtime.

### Status

- Complete

## 2026-07-01 - Narrative Assistant Redesign

### Change Summary

- Redesigned the Narrative Assistant as a professional report wording builder with a header card and two-column desktop layout.
- Added writing type pills, quick example chips, report section/tone/output length selectors, clear button, loading state, and disabled generate state for empty input.
- Moved examples out of the textarea and renamed Recent Searches to Recent Prompts.
- Updated generated output into structured cards for Professional Report Wording, Short Version, Cautious / Assumption Wording, and Notes for Appraiser.
- Preserved recent prompt storage, favorites, copy buttons, and local Canadian appraisal-style wording generation.

### Files Changed

- `public/index.html`
- `public/narrative-assistant.js`
- `public/styles.css`
- `CHANGELOG.md`

### Notes

- Existing Narrative Assistant route/init behavior and local storage keys were preserved.
- `narrative-assistant.js` and `app.js` passed JavaScript syntax validation with the bundled Node.js runtime.

### Status

- Complete

## 2026-07-01 - Map Label Tail Transparency

### Change Summary

- Reduced the map label tapered tail opacity so label pointers appear slightly translucent and less heavy on the map.
- Matched the selected-area export rendering so copied/downloaded map images preserve the softer tail appearance.

### Files Changed

- `public/app.js`
- `public/index.html`
- `CHANGELOG.md`

### Notes

- Existing map labels, markers, dragging, selection export, copy, and download behavior were preserved.
- `app.js` passed JavaScript syntax validation with the bundled Node.js runtime.

### Status

- Complete

## 2026-07-01 - Map Export Copy Download Feedback

### Change Summary

- Added a centered progress/status overlay for Map Export `Copy Selected Area` and `Download Selected Area`.
- Shows active rendering/copy/download status, success confirmation, warning when the map is not ready, and error feedback if the action fails.
- Hides the feedback overlay during map capture/print modes so it does not appear in exported images.

### Files Changed

- `public/index.html`
- `public/app.js`
- `public/styles.css`
- `CHANGELOG.md`

### Notes

- Existing map export rendering, selection bounds, copy, download, manual resize, markers, and labels were preserved.
- `app.js` passed JavaScript syntax validation with the bundled Node.js runtime.

### Status

- Complete

## 2026-07-01 - Map Export Default Label Bounds

### Change Summary

- Improved Map Export default auto-fit selection so visible marker labels/callouts are included more reliably.
- Included all four corners of callout/label boxes and visible leader-tail SVG elements in export bounds.
- Reduced right-panel reservation during marker/label auto-fit so labels near the right side are not cut off by the default selection rectangle.

### Files Changed

- `public/app.js`
- `public/index.html`
- `CHANGELOG.md`

### Notes

- Existing map marker, label dragging, copy/download, export rendering, and manual selection resize behavior were preserved.
- `app.js` passed JavaScript syntax validation with the bundled Node.js runtime.

### Status

- Complete

## 2026-07-01 - Building Footprint Dimension Label Font

### Change Summary

- Increased Building Footprint Sketch dimension label text from 15px to 16px.
- Matched the export SVG dimension label style so copy/download output uses the same larger label size.

### Files Changed

- `public/building-footprint.js`
- `public/styles.css`
- `public/index.html`
- `CHANGELOG.md`

### Notes

- Existing sketch drawing, label editing, save, copy, download, and grid toggle behavior were preserved.
- `building-footprint.js` passed JavaScript syntax validation with the bundled Node.js runtime.

### Status

- Complete

## 2026-07-01 - Building Footprint Save Help Hover

### Change Summary

- Changed the Building Footprint Sketch save/page help note so it is hidden by default.
- The note now appears only when hovering/focusing the Save Sketch button or the right-side sketch action controls.
- Increased the note text size and width for better readability.

### Files Changed

- `public/index.html`
- `public/styles.css`
- `CHANGELOG.md`

### Notes

- Existing sketch drawing, save, copy, download, grid toggle, and dimension page logic were preserved.

### Status

- Complete

## 2026-07-01 - Building Footprint Sketch Grid Toggle

### Change Summary

- Added a grid on/off icon button to the right-side sketch field action controls.
- The button toggles the Building Footprint Sketch grid background without changing drawing, label, save, copy, or download behavior.
- Copy/download exports preserve the current grid visibility state.

### Files Changed

- `public/index.html`
- `public/building-footprint.js`
- `public/styles.css`
- `CHANGELOG.md`

### Notes

- Existing sketch drawing, label editing, saved sketch workflow, copy/download, and dimension page export logic were preserved.
- `building-footprint.js` passed JavaScript syntax validation with the bundled Node.js runtime.
- Local `git` was not available in PATH, so diff output was verified by targeted file inspection instead.

### Status

- Complete

## 2026-07-01 - Building Footprint Add-to-Page Icon Modal

### Change Summary

- Removed the visible Save Sketch, Add to Page, and Export Page text buttons from the Building Footprint Sketch top bar.
- Added a single add-to-page icon button at the upper-right of the sketch canvas.
- Clicking the add-to-page icon now automatically saves the current sketch, adds it to the portrait dimension page, and opens a Dimension Page Preview modal.
- Moved Copy Page and Download Page controls into the Dimension Page Preview modal.
- Updated the portrait page layout to support one sketch full page, two sketches split top/bottom, and three sketches split into thirds.

### Files Changed

- `public/index.html`
- `public/building-footprint.js`
- `public/styles.css`
- `CHANGELOG.md`

### Notes

- Existing Building Footprint drawing, AI import, copy sketch, download sketch, undo/redo, label editing, and dimension input logic were preserved.
- `building-footprint.js` passed JavaScript syntax validation with the bundled Node.js runtime.

### Status

- Complete

## 2026-07-01 - Building Footprint Saved Sketch Page Workflow

### Change Summary

- Added Save Sketch, Add to Page / Add to Same Page, and Export Page controls directly to the Building Footprint Sketch page.
- Added saved footprint sketch management so each footprint remains separate from the editing canvas.
- Added a Dimension Page Preview card that supports one large sketch or two vertically stacked sketches on one portrait page.
- Added Edit Sketch and Remove from Page actions for saved footprint sketches.
- Added a portrait PNG export path for the composed footprint dimension page.

### Files Changed

- `public/index.html`
- `public/building-footprint.js`
- `public/styles.css`
- `CHANGELOG.md`

### Notes

- Existing Building Footprint drawing, AI import, label editing, feet/inches entry, copy sketch, download sketch, undo/redo, and export logic were preserved.
- `building-footprint.js` passed JavaScript syntax validation with the bundled Node.js runtime.

### Status

- Complete

## 2026-07-01 - Floor Dimension Page Buttons Visibility

### Change Summary

- Moved Save Sketch, Add to Page, and Export Page from the far-right Floor Plan toolbar group into the top header action area.
- Reduced the Floor Plan toolbar back to four groups so buttons do not get pushed off screen on narrower browser widths.
- Added a stronger primary style to Save Sketch so the workflow is easier to find.
- Updated asset cache versions for `index.html` references.

### Files Changed

- `public/index.html`
- `public/styles.css`
- `CHANGELOG.md`

### Notes

- Existing Floor Dimension drawing, saved sketch management, page preview, and export logic were preserved.
- `floor-plan.js` syntax validation still passes.

### Status

- Complete

## 2026-07-01 - Final Modified Files Folder

### Change Summary

- Created a small final modified-files folder for the Floor Dimension saved sketch page workflow.
- Included only the files changed for this task, instead of copying the full project or older backup folders.

### Files Changed

- `CHANGELOG.md`

### Notes

- Final folder contents are limited to `public/index.html`, `public/floor-plan.js`, `public/styles.css`, and `CHANGELOG.md`.

### Status

- Complete

## 2026-07-01 - Floor Dimension Saved Sketch Page Workflow

### Change Summary

- Added Save Sketch, Add to Page / Add to Same Page, and Export Page controls to the Floor Plan workflow.
- Added saved sketch management so each floor sketch remains separate from the editing canvas.
- Added a Dimension Page Preview that composes one saved sketch large and centered, or two saved sketches vertically on one portrait page.
- Added a two-sketch limit message path and Remove from Page / Edit Sketch actions.
- Added a portrait PNG export path for the composed dimension page without changing the existing single-sketch PNG export.

### Files Changed

- `public/index.html`
- `public/floor-plan.js`
- `public/styles.css`
- `CHANGELOG.md`

### Notes

- Existing draw, select/move, zoom, fit, level, area summary, single PNG export, copy PNG, JSON, and text export functions were preserved.
- `floor-plan.js` passed JavaScript syntax validation with the bundled Node.js runtime.

### Status

- Complete

## 2026-07-01 - Modularization Guardrails

### Change Summary

- Added project rules to avoid placing new large features directly into `app.js` or `styles.css`.
- Added Phase 1.5 roadmap items for gradual Comparable Map modularization.
- Documented a safe extraction path for sidebar, import, labels, export, markers, shared map utilities, and future CSS split.

### Files Changed

- `PROJECT_RULES.md`
- `ROADMAP.md`
- `CHANGELOG.md`

### Notes

- Documentation/control files only; no app runtime code was modified.

### Status

- Complete

## 2026-07-01 - Sidebar Slide and Click Hitbox

### Change Summary

- Smoothed the Comparable Map sidebar collapse/expand animation so the sidebar and menu contents slide in and out.
- Expanded the sidebar collapse handle hit area so clicking anywhere on the button works reliably.
- Prevented Leaflet map pointer events from stealing sidebar toggle clicks.
- Added a second map resize sync after the transition completes.

### Files Changed

- `public/index.html`
- `public/app.js`
- `public/styles.css`
- `CHANGELOG.md`

### Notes

- Existing map, marker, label, export, copy, and download logic were preserved.

### Status

- Complete

## 2026-07-01 - Clean Final Folder Created

### Change Summary

- Created a clean final folder that excludes old changed-files folders, previous final folders, local logs, and private environment files.
- Kept only the current app runtime/deploy files, public assets, documentation, and project control files.

### Files Changed

- `CHANGELOG.md`

### Notes

- The earlier full-copy final folder was left untouched for safety.

### Status

- Complete

## 2026-07-01 - Screenshot Import Progress Overlay

### Change Summary

- Added a centered modal-style progress overlay for screenshot upload/paste import.
- Shows step-by-step states for screenshot loaded, reading screenshot, addresses found, mapping addresses, and mapping complete.
- Added warning/error states for no addresses found, partial detection, and unreadable screenshots.
- Added dimmed backdrop, spinner, success/warning/error indicators, progress bar, and `aria-live` status text.

### Files Changed

- `public/index.html`
- `public/app.js`
- `public/styles.css`
- `CHANGELOG.md`

### Notes

- Existing screenshot paste/upload, AI extraction, address mapping, marker, label, copy, and download logic were preserved.

### Status

- Complete

## 2026-07-01 - Comparable Map Logo and Sidebar Handle

### Change Summary

- Moved the Appraisal Map Pro logo from the map canvas into the main top navigation as a compact horizontal brand.
- Removed the floating map logo card from the Comparable Map area.
- Replaced the large sidebar pill button with a slim chevron-only collapse handle attached to the sidebar/map divider.
- Added accessible `aria-label`, hover tooltip text, and smooth sidebar collapse/expand transitions.
- Adjusted mobile layout so the sidebar behaves like a slide-out drawer over the map.

### Files Changed

- `public/index.html`
- `public/app.js`
- `public/styles.css`
- `CHANGELOG.md`

### Notes

- Existing map, import, marker, label, export, copy, and download logic were preserved.

### Status

- Complete

## 2026-07-01 - Backup Created

### Change Summary

- Created a fresh backup of the current final version folder.
- Preserved the latest import paste box upload behavior and sidebar map expansion updates.

### Files Changed

- `CHANGELOG.md`

### Notes

- Backup folder created outside the active workspace for safekeeping.

### Status

- Complete

## 2026-07-01 - Import Paste Box Upload Trigger

### Change Summary

- Hid the visible `Choose File` control in the ACI grid import panel.
- Kept the screenshot paste box visible.
- Added double-click file upload behavior to the paste box while preserving Ctrl+V paste import.
- Updated cache versions for the changed app script and stylesheet.

### Files Changed

- `public/index.html`
- `public/app.js`
- `public/styles.css`
- `CHANGELOG.md`

### Notes

- Existing paste, preview, AI extraction, and Map Addresses logic were preserved.
- Sidebar hide/show behavior still expands the map to full width when the sidebar is collapsed.

### Status

- Complete

## 2026-07-01 - Map Sidebar Toggle

### Change Summary

- Added a Hide/Show sidebar button on the map.
- Collapsing the sidebar expands the map to the full workspace width.
- Recalculates the Leaflet/Google map size after toggling so map tiles and export selection stay aligned.
- Hides the sidebar toggle button during map capture/export/print.

### Files Changed

- `public/index.html`
- `public/app.js`
- `public/styles.css`
- `CHANGELOG.md`

### Notes

- Existing sidebar inputs, imports, labels, markers, map controls, and export logic were preserved.

### Status

- Complete

## 2026-07-01 - Map Logo and Hidden Sale Date

### Change Summary

- Removed the large logo card from the Comparable Map sidebar.
- Added a compact Appraisal Map Pro logo badge at the top-left of the map.
- Removed the visible Sale Date field from comparable rows while preserving the hidden sale date value for imports, shared data, and time adjustment workflows.
- Updated cache versions for the changed CSS and app script.

### Files Changed

- `public/index.html`
- `public/app.js`
- `public/styles.css`
- `CHANGELOG.md`

### Notes

- Existing comparable import, sale date extraction, Market Trend & Time Adjustment data flow, and map behavior were preserved.

### Status

- Complete

## 2026-07-01 - Compact Map Sidebar

### Change Summary

- Redesigned the Comparable Map sidebar into a compact layout so the main import and property controls fit in one view with less scrolling.
- Reduced the logo card height, section spacing, input heights, paste preview height, status card height, and comparable row spacing.
- Scoped the compact styling to `#mapWorkspace` so other app pages are not affected.

### Files Changed

- `public/index.html`
- `public/styles.css`
- `CHANGELOG.md`

### Notes

- Existing upload, paste, preview, Map Addresses, subject, comparable, and map functionality was not changed.

### Status

- Complete

## 2026-07-01 - Import Help Above Map

### Change Summary

- Fixed the large ACI import help image popover appearing behind the map.
- Raised the import help popover and its parent panel above the map only while the help is open.
- Kept the larger readable image size and existing hover/tap behavior.

### Files Changed

- `public/index.html`
- `public/styles.css`
- `CHANGELOG.md`

### Notes

- Existing upload, paste, preview, and Map Addresses behavior was not changed.

### Status

- Complete

## 2026-07-01 - Larger ACI Import Help Image

### Change Summary

- Enlarged the ACI import help image popover so the guide text is readable.
- Allowed the popover to extend wider over the map while keeping it above the map layer.
- Updated the stylesheet cache version so the larger guide loads immediately.

### Files Changed

- `public/index.html`
- `public/styles.css`
- `CHANGELOG.md`

### Notes

- Existing upload, paste, preview, and Map Addresses behavior was not changed.

### Status

- Complete

## 2026-07-01 - Map Toggle Hover Labels

### Change Summary

- Updated the bottom-right map display toggle icons so they expand on hover/focus.
- Revealed each toggle's text label while keeping the compact icon-only default view.
- Updated the stylesheet cache version so the new styling loads immediately.

### Files Changed

- `public/index.html`
- `public/styles.css`
- `CHANGELOG.md`

### Notes

- Existing Distance, Address Label, Contours, Floodplain, and ALR toggle behavior was not changed.

### Status

- Complete

## 2026-07-01 - Overlay Clarity Control

### Change Summary

- Added an overlay clarity slider on the right-middle side of the map.
- The control appears only when a visible overlay layer is active.
- Connected the slider to Contours, ALR, Floodplain, and configured BC extra overlay layer opacity while preserving each layer's default visual balance.
- Hid the control during map capture/export/print so exported images remain clean.

### Files Changed

- `public/index.html`
- `public/app.js`
- `public/styles.css`
- `CHANGELOG.md`

### Notes

- Existing map layers, export rendering, marker labels, and map controls were not changed.

### Status

- Complete

## 2026-07-01 - ACI Import Help Image

### Change Summary

- Replaced the ACI import help popover text/cards with the provided visual guide image.
- Kept the existing hover, focus, tap, outside-click, and Escape popover behavior unchanged.
- Added the guide image to the app assets and updated the stylesheet cache version.

### Files Changed

- `public/index.html`
- `public/styles.css`
- `public/assets/aci-import-help-guide.png`
- `CHANGELOG.md`

### Notes

- Existing upload, paste, preview, and Map Addresses logic was not changed.

### Status

- Complete

## 2026-07-01 - Import Help Popover Contained

### Change Summary

- Constrained the ACI import help popover to the left import panel so it no longer sits behind the map.
- Stacked the help steps vertically in the narrow import card for readability.
- Updated the stylesheet cache version so the fix loads immediately.

### Files Changed

- `public/styles.css`
- `public/index.html`
- `CHANGELOG.md`

### Notes

- Existing upload, paste, preview, and Map Addresses behavior was not changed.

### Status

- Complete

## 2026-07-01 - Map Toggle Bar Inside Map

### Change Summary

- Moved the horizontal map display toggle bar into the map shell so it anchors to the actual bottom of the map.
- Preserved the existing Distance, Address Label, Contours, Floodplain, ALR, export mode, and quality controls.

### Files Changed

- `public/app.js`
- `public/index.html`
- `CHANGELOG.md`

### Notes

- This keeps existing DOM IDs and event wiring intact while changing the positioning reference from the outer map area to the map frame.

### Status

- Complete

## 2026-07-01 - Horizontal Map Toggle Icons

### Change Summary

- Moved the map display toggle controls to the bottom-right of the map.
- Changed the Distance, Address Label, Contours, Floodplain, and ALR toggles from text badges to simple SVG pictorial icons.
- Kept the existing checkbox IDs and map display logic unchanged.

### Files Changed

- `public/index.html`
- `public/styles.css`
- `CHANGELOG.md`

### Notes

- Export and print hiding behavior remains unchanged through the existing `.map-display-bar` selectors.

### Status

- Complete

## 2026-07-01 - ACI Import Help Popover

### Change Summary

- Added a compact "How to import" help popover beside the ACI grid screenshot label.
- Included upload/paste guidance, Windows and Mac screenshot shortcuts, preview check guidance, and Map Addresses instructions.
- Added hover, focus, tap/click, outside-click, and Escape close behavior without changing import or mapping logic.

### Files Changed

- `public/index.html`
- `public/styles.css`
- `public/app.js`
- `CHANGELOG.md`

### Notes

- The popover uses real HTML/CSS text and keeps the existing file input, paste zone, preview image, and Map Addresses button behavior intact.

### Status

- Complete

## 2026-07-01 - Map Style Bottom Dock

### Change Summary

- Moved the map style selector out of the display icon panel and docked it at the bottom of the map.
- Kept the Distance, Address Label, Contours, Floodplain, and ALR controls as compact side icons.
- Preserved the existing `mapStyleSelect` ID and map style change logic.

### Files Changed

- `public/index.html`
- `public/styles.css`
- `CHANGELOG.md`

### Notes

- The style dock is hidden during capture and print modes so map export output remains clean.

### Status

- Complete

## 2026-07-01 - Map Display Icon Controls

### Change Summary

- Converted the map display controls into a compact floating icon panel on the map.
- Removed the bottom display-control strip from the map layout so the map has more usable height.
- Preserved the existing Distance, Address Label, Contours, Floodplain, ALR, and Style control wiring.

### Files Changed

- `public/styles.css`
- `public/index.html`
- `CHANGELOG.md`

### Notes

- Functionality remains backed by the original inputs, so existing map rendering, overlays, and export hiding behavior are preserved.

### Status

- Complete

## 2026-07-01 - Wide Map and Drag Pin Adjustment

### Change Summary

- Hid the mapped addresses side panel so the map has more horizontal room.
- Removed the visible Adjust Pin button flow from the mapped-address list.
- Made subject and comparable map marker circles directly draggable for manual pin adjustment.

### Files Changed

- `public/styles.css`
- `public/app.js`
- `public/index.html`
- `CHANGELOG.md`

### Notes

- Dragging a marker updates the saved manual map position and re-renders through the existing map path so labels, distances, and bounds stay synchronized.

### Status

- Complete

## 2026-07-01 - New Final Folder Created

### Change Summary

- Created a fresh final project folder from the latest working app files.
- Included the current control documents with the copied project.

### Files Changed

- `CHANGELOG.md`

### Notes

- No app code was changed for this task.

### Status

- Complete

## 2026-07-01 - Download Selected Area Export Fix

### Change Summary

- Fixed Download Selected Area to use the Mapbox PNG export path when a Mapbox token is available, including during export selection mode.
- Preserved the legacy selected-area capture fallback for environments without Mapbox export support.
- Delayed object URL cleanup after triggering the download so the browser has time to start the file save.

### Files Changed

- `public/index.html`
- `public/app.js`
- `CHANGELOG.md`

### Notes

- Existing selected-area bounds, labels, markers, triangular tails, copy fallback, and export quality settings were preserved.

### Status

- Complete

## 2026-07-01 - Copy Selected Area Clipboard Fallback

### Change Summary

- Fixed Copy Selected Area so it no longer stops when `ClipboardItem` image clipboard support is unavailable.
- Added a fallback image-copy path that renders the selected PNG and copies it through a temporary selected image element.
- Kept the existing async PNG clipboard path for browsers that support it.

### Files Changed

- `public/index.html`
- `public/app.js`
- `CHANGELOG.md`

### Notes

- Map export rendering, selection bounds, labels, markers, triangular tails, and download behavior were preserved.

### Status

- Complete

## 2026-07-01 - Map Label Triangle Tail Apex Alignment

### Change Summary

- Updated map callout tails so the tapered triangle ends at a single apex on the exact property marker point.
- Applied the same nearest-edge tail origin logic to subject and comparable callouts.
- Matched screen and export rendering so copy/download output uses the same triangular tail shape.

### Files Changed

- `public/index.html`
- `public/app.js`
- `CHANGELOG.md`

### Notes

- Existing map labels, marker rendering, label dragging/editing, copy/download/export flow, and sale-price sharing behavior were preserved.

### Status

- Complete

## 2026-07-01 - Map Screenshot Sale Price Bridge to Time Adjustment

### Change Summary

- Preserved comparable sale prices when map screenshot/address import data includes them.
- Stored imported comparable sale prices in map row state without adding new visible map fields.
- Shared map comparable sale prices with Market Trend & Time Adjustment so the sale price column can populate when data is available.
- With user approval, expanded the map screenshot AI extraction prompt to read visible comparable sale prices into `salePrice`.

### Files Changed

- `server.mjs`
- `public/index.html`
- `public/app.js`
- `CHANGELOG.md`

### Notes

- Existing map UI, labels, markers, copy/download/export, and Market Trend rendering were preserved.
- Sale prices are extracted only when visible in the uploaded screenshot; missing prices are not invented.

### Status

- Complete

## 2026-07-01 - Map Copy Clipboard Activation Fix

### Change Summary

- Updated Copy Selected Area so the browser clipboard write starts immediately from the user click.
- Passed the map PNG render promise directly into `ClipboardItem` to avoid losing clipboard user-activation during async image rendering.

### Files Changed

- `public/index.html`
- `public/app.js`
- `CHANGELOG.md`

### Notes

- Download/export rendering logic remains the same.
- Existing export selection, labels, markers, tapered indicators, and copy/download UI were preserved.

### Status

- Complete

## 2026-07-01 - Map Callout Labels Converted to Plain Cards

### Change Summary

- Removed the speech-bubble tail from map callout labels.
- Kept the labels as clean closed rounded rectangle cards with the tapered marker indicator preserved.
- Updated export drawing so copied/downloaded map labels also render as plain cards.

### Files Changed

- `public/index.html`
- `public/app.js`
- `public/styles.css`
- `CHANGELOG.md`

### Notes

- Existing map markers, label dragging, title editing, tapered indicator, copy/download/export behavior, and comparable side-panel data were preserved.

### Status

- Complete

## 2026-07-01 - Map Label Tail Border Cleanup

### Change Summary

- Removed the thick bar-like line under map callout labels by replacing the screen tail styling with a smaller angled border tail.
- Preserved the triangular tail and existing tapered marker indicator behavior.

### Files Changed

- `public/index.html`
- `public/styles.css`
- `CHANGELOG.md`

### Notes

- CSS-only visual cleanup; map logic, export rendering logic, markers, label dragging, and label editing were not changed.

### Status

- Complete

## 2026-07-01 - Comparable Map Label Tapered Tail Refinement

### Change Summary

- Updated map comparable labels to keep the triangular tail while adding a filled tapered indicator beam from the label to the marker.
- Removed sale dates from visible map callout labels while preserving them in app data and non-map detail areas.
- Added a small color dot beside the callout title and softened the tapered indicator edge/shadow.

### Files Changed

- `public/index.html`
- `public/app.js`
- `public/styles.css`
- `CHANGELOG.md`

### Notes

- Existing map label dragging, title editing, markers, export/copy/download rendering, and side-panel comparable sale dates were preserved.

### Status

- Complete

## 2026-07-01 - Shared Subject/Comparable Fill and Time Screenshot Paste

### Change Summary

- Added a screenshot paste reference box to Market Trend & Time Adjustment.
- Added a shared subject/comparable data bridge so pages can pull existing map and AI Grid Review subject/comparable information into matching fields.
- Added an Apply Subject / Comparable Info action that fills Time Adjustment subject address and comparable sale date/price rows when available.

### Files Changed

- `public/index.html`
- `public/app.js`
- `public/ai-grid-review.js`
- `public/market-time-adjustment.js`
- `public/styles.css`
- `CHANGELOG.md`

### Notes

- Screenshot paste is local preview/reference only and does not send appraisal content to an external AI service.
- Existing market trend calculations, map, grid review, export, and copy/download logic were preserved.

### Status

- Complete

## 2026-07-01 - Filled Map Callout Pointer

### Change Summary

- Updated map label callout pointers to use a filled tapered pointer matching the label/marker color, similar to the provided reference image.

### Files Changed

- `public/app.js`
- `public/styles.css`
- `CHANGELOG.md`

### Notes

- Targeted map label pointer rendering change only.
- Existing marker, label dragging, label editing, and export/copy/download rendering paths were preserved.

### Status

- Complete

## 2026-07-01 - Sketch Label Feet/Inches Editor

### Change Summary

- Improved Building Footprint Sketch dimension label editing so feet and inches are visibly separate input boxes on the sketch label editor.

### Files Changed

- `public/building-footprint.js`
- `public/styles.css`
- `CHANGELOG.md`

### Notes

- Targeted UI fix for dimension label editing only.
- Existing sketch geometry, area calculation, export, and edge-drag logic was preserved.

### Status

- Complete

## 2026-07-01 - Map Legend Indicator Color Match

### Change Summary

- Updated map legend indicators so they are filled with the same color used by each map marker and callout label.

### Files Changed

- `public/app.js`
- `public/styles.css`
- `CHANGELOG.md`

### Notes

- Targeted visual change only.
- Existing map marker, label, export, and callout logic was preserved.

### Status

- Complete

## 2026-07-01

### Change Summary

- Added project control documentation files to reduce accidental feature regressions and preserve existing app behavior.

### Files Changed

- `PROJECT_RULES.md`
- `ROADMAP.md`
- `CHANGELOG.md`

### Notes

- Documentation/control files only.
- No existing app code was modified.

### Status

- Complete

## 2026-07-01 - FVREB Market Data Added

- Change summary: Applied FVREB market data files to the app source and synced latest files to backup/final/deploy folders.
- Files changed: Market data JS/JSON files, app script loading, route-load guard, changelog.
- Notes: UI was not redesigned. metro-vancouver-gis-links.js was not modified.
- Status: Completed


## 2026-07-01

- Change summary: Updated Narrative Assistant so appraisal wording is generated only through the AI backend endpoint instead of frontend templates or keyword sentence logic.
- Files changed: server.mjs; public/index.html; public/narrative-assistant.js
- Notes: Added /api/generate-narrative with structured JSON output fields: professionalWording, shortVersion, cautiousAssumptionWording, appraiserNotes. Frontend now sends user input/options to the backend and shows an error instead of fake fallback wording if generation fails.
- Status: Complete

## 2026-07-01

- Change summary: Increased Building Footprint Sketch floor label title and size font by two visual steps.
- Files changed: public/styles.css
- Notes: Updated on-canvas and export floor labels together so exported sketches match the screen.
- Status: Complete

## 2026-07-01

- Change summary: Increased Building Footprint Sketch floor label title and size font by two visual steps.
- Files changed: public/styles.css
- Notes: Updated on-canvas and export floor labels together so exported sketches match the screen.
- Status: Complete

## 2026-07-01

- Change summary: Raised the ACI import help guide above the map so the map no longer covers the menu.
- Files changed: public/styles.css
- Notes: The import help popover now temporarily raises the sidebar layer and allows overflow while open.
- Status: Complete

## 2026-07-01

- Change summary: Added Neighbourhood to the Narrative Assistant Report Section selector.
- Files changed: public/index.html
- Notes: This only updates the dropdown option list; AI generation logic remains unchanged.
- Status: Complete

## 2026-07-01

- Change summary: Fixed Market Trend Summary cards to use official MLS HPI percentage changes before calculated fallbacks.
- Files changed: public/app.js; public/data/gvr-market-trends.js; public/data/gvr-market-trends.json
- Notes: 1M/3M/6M Trend Summary now uses official oneMonthPct/threeMonthPct/sixMonthPct aliases when available, falls back to HPI index calculations, and only uses rounded benchmark prices as a last fallback. Labels were renamed to HPI Change wording.
- Status: Complete

## 2026-07-01

- Change summary: Added Market Trend calculation method selector for Official Board %, HPI Index, and Benchmark Price.
- Files changed: public/index.html; public/app.js; public/styles.css
- Notes: Trend Summary percentage cards now recalculate immediately based on the selected method. Official mode uses stored board percentages with HPI and benchmark fallbacks; YTD uses HPI first because board YTD is not supplied.
- Status: Complete

## 2026-07-01

- Change summary: Completed Market Trend calculation method UI and Summary card recalculation.
- Files changed: public/index.html; public/app.js; public/styles.css
- Notes: Users can select Official Board % Change, HPI Index, or Benchmark Price. Cards update immediately and include 1M, 3M, 6M, YTD, 1Y, 3Y, 5Y, 10Y, and latest benchmark value.
- Status: Complete

## 2026-07-01

- Change summary: Set Market Trend calculation method defaults by board area and highlighted the active method.
- Files changed: public/app.js; public/styles.css
- Notes: Fraser Valley/FVREB areas default to HPI Index. Greater Vancouver areas default to Benchmark Price. Changing the market area resets the calculation method to that area's default and highlights the selected method/source note.
- Status: Complete

## 2026-07-01

- Change summary: Rebranded visible product UI from Appraisal Map Pro to Appraisal Workbench and updated the homepage to present the broader appraisal toolkit.
- Files changed: public/index.html; public/building-footprint.js; public/styles.css; public/appraisal-map-favicon.svg; public/assets/appraisal-workbench-logo.png; README.md; package.json
- Notes: Applied the new Appraisal Workbench logo from the supplied PNG to login, landing, and app navigation. Homepage now highlights Comparable Map, Market Trends, Time Adjustment, Sketch / Dimension, Narrative Assistant, and Subject Dashboard.
- Status: Complete
