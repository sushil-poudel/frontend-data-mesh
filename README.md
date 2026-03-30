# Landing Page

Static thesis landing page (HTML/CSS/JS) for the Data Mesh project.

## Files
- `index.html`
- `styles.css`
- `base.css`
- `script.js`

## Local preview
Open `landing_page/index.html` directly in a browser.

## Personalization
Edit the `profile`, `thesisWindow`, and `milestones` objects at the top of `landing_page/script.js`.

## GitHub Pages deployment
A workflow is included at `.github/workflows/deploy-landing-page.yml`.

Trigger rules:
- Automatic on pushes to `main` when `landing_page/**` changes
- Manual run via GitHub Actions `workflow_dispatch`

The workflow publishes the `landing_page/` folder as the GitHub Pages artifact.
