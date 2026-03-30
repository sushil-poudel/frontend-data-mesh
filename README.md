# Data Mesh Contracts Platform — Thesis Landing Page

This is the public-facing landing page for my thesis project: **Building a Real-World Data Mesh Contracts Platform in 4 Months**. The project involves designing and implementing a production-grade platform where domain teams can register governed data products, publish events through Apache Kafka, and expose datasets via a contracts API, CLI, and MCP tooling — making enterprise data discoverable and AI-ready. This landing page documents the active build, showcasing the platform's architecture, the eight domain producers already wired (MediaWiki, Jira, GitHub, Kimai, Paperless, Vtiger, Dovecot, and a generic OIDC producer), a live 4-month roadmap tracker, and links to the main repository. Built with plain HTML, CSS, and JavaScript — no frameworks, no build step.

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
