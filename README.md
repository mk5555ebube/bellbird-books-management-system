# Bellbird Books Management System

A full-stack inventory and order-management application for Bellbird Books. The system manages book titles, new and second-hand stock, customers, orders and low-stock warnings.

This application is an academic prototype and must only use fictional data.

## Technology stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Supabase PostgreSQL
- Vitest and React Testing Library
- Playwright
- GitHub Actions
- Vercel

## Prerequisites

Install the following before setting up the project:

- Node.js 24 recommended
- npm
- Git
- Visual Studio Code or another code editor
- Access to the project’s GitHub repository
- Access to the team Supabase project

Confirm the installations:

```bash
node --version
npm --version
git --version
```

## Clone the repository

```bash
git clone https://github.com/mk5555ebube/bellbird-books-management-system.git
cd bellbird-books-management-system
```

## Install dependencies

Use `npm ci` to install the exact dependency versions recorded in `package-lock.json`:

```bash
npm ci
```

## Environment configuration

Create a local environment file from the supplied example:

```bash
cp .env.example .env.local
```

Add the following values to `.env.local`:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_SECRET_KEY=your_supabase_secret_key
```

The actual values must be obtained privately from the project configuration lead.

Security requirements:

- Never commit `.env.local`.
- Never paste credentials into Jira, Confluence or pull requests.
- Never expose `SUPABASE_SECRET_KEY` in browser-side code.
- Supabase operations using the secret key must remain server-side.
- Only fictional test data may be used.

## Verify the Supabase connection

```bash
npm run check:supabase
```

A successful connection displays the configured Supabase project URL without displaying the secret key.

## Run the application locally

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Quality and testing commands

Run code-quality checks:

```bash
npm run lint
npm run format:check
```

Run unit and component tests:

```bash
npm run test
```

Run tests continuously during development:

```bash
npm run test:watch
```

Install the Playwright Chromium browser when setting up the project for the first time:

```bash
npx playwright install chromium
```

Run end-to-end tests:

```bash
npm run test:e2e
```

Create a production build:

```bash
npm run build
```

Before opening a pull request, the following commands should pass:

```bash
npm run lint
npm run test
npm run test:e2e
npm run build
```

## Branch workflow

- `main` contains the stable production version.
- `develop` contains integrated team changes.
- Feature, chore, fix and documentation branches are created from `develop`.
- Changes are returned to `develop` through pull requests.
- Approved releases are merged from `develop` into `main`.

Branch-name examples:

```text
feature/MSD426GC3-19-add-book
chore/MSD426GC3-12-testing-ci
docs/MSD426GC3-17-local-setup
fix/MSD426GC3-00-short-description
```

Commit-message example:

```text
MSD426GC3-17: document local setup and environment configuration
```

Additional contribution rules are available in `CONTRIBUTING.md`.

## Database migrations

Database migration files are stored in:

```text
supabase/migrations/
```

Database changes must:

- Match the approved database design.
- Be linked to a Jira issue.
- Be tested before integration.
- Avoid deleting shared data without team approval.
- Never contain passwords or environment credentials.

## Continuous integration

GitHub Actions runs the following checks for relevant pull requests and branch updates:

```bash
npm ci
npm run lint
npm run test
npm run build
```

Changes should not be merged when required automated checks fail.

## Deployment

Vercel provides preview deployments for pull requests and production deployment from `main`.

Production application:

https://bellbird-books-management-system.vercel.app

## Project documentation

Project requirements, architecture, database design, testing evidence and sprint records are maintained in the team Confluence space.

Development work, assignments and story progress are managed through Jira.

## Known limitations

- Staff authentication is outside the initial release.
- The application must not store real customer data.
- Payment processing is not included.
- Supplier ordering is not automated.
- Email and SMS notifications are not included.
- Low-stock warnings notify staff but do not automatically reorder books.
