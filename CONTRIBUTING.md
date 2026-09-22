# Team contribution workflow

## Branches

- main: stable production demonstration.
- develop: integration and combined feature testing.
- Create each work branch from the latest develop.

## Branch naming

- feature/MSD426GC3-<number>-short-description
- chore/MSD426GC3-<number>-short-description
- docs/MSD426GC3-<number>-short-description
- fix/MSD426GC3-<number>-short-description

## Commits

Each team member commits their own work using their GitHub identity.
Start commit messages with the Jira key.
Keep changes focused on the assigned issue.

## Review and merging

Open work-item pull requests into develop.
Include the Jira link, a change summary and testing evidence.
Obtain at least one teammate approval and resolve review comments.
Run linting, the production build and applicable tests before merging.
Release reviewed and tested work from develop into main through a PR.

## Protected branches

Direct commits, force pushes and deletion of main and develop
are prohibited. Repository administrators follow the same review rules.

## Evidence

Attach the pull-request link and testing evidence to Jira.
Mark the issue Done after its acceptance criteria pass and the PR is merged.
