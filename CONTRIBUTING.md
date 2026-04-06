# Contributing to @saulpaulus17/vue-datatables-flex

First off, thank you for considering contributing to `vue-datatables-flex`! It's people like you who make the Vue ecosystem such a great place to build.

There are many ways to contribute, from writing tutorials or blog posts, improving the documentation, submitting bug reports and feature requests, or writing code which can be incorporated into the project itself.

## Table of Contents

1.  [Code of Conduct](#code-of-conduct)
2.  [How Can I Contribute?](#how-can-i-contribute)
    *   [Reporting Bugs](#reporting-bugs)
    *   [Suggesting Enhancements](#suggesting-enhancements)
    *   [Pull Requests](#pull-requests)
3.  [Development Setup](#development-setup)
4.  [Coding Standards](#coding-standards)
5.  [Commit Message Conventions](#commit-message-conventions)

## Code of Conduct

Help us keep `vue-datatables-flex` open and inclusive. Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md). (If not present, we follow the Contributor Covenant).

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues as it might be already reported. When you are creating a bug report, please include as many details as possible:

*   **Use a clear and descriptive title** for the issue to identify the problem.
*   **Describe the exact steps which reproduce the problem** in as many details as possible.
*   **Provide specific examples to demonstrate the steps**. Include links to files or GitHub projects, or copy-pasteable code snippets.
*   **Describe the behavior you observed** after following the steps and explain precisely what is wrong with that behavior.
*   **Explain which behavior you expected to see instead and why.**
*   **Include screenshots and animated GIFs** which help you demonstrate the steps or the scale of the issue.

### Suggesting Enhancements

Enhancement suggestions are tracked as [GitHub issues](https://github.com/saul-paulus/vue-datatable-flex/issues).

*   **Use a clear and descriptive title** for the issue to identify the suggestion.
*   **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
*   **Provide specific examples to demonstrate the steps**.
*   **Describe the current behavior and explain which behavior you expected to see instead** and why.
*   **Explain why this enhancement would be useful** to most users.

### Pull Requests

The process which described below should be followed to submit a pull request:

1.  Fork the repo and create your branch from `main`.
2.  If you've added code that should be tested, add tests.
3.  If you've changed APIs, update the documentation.
4.  Ensure the test suite passes (`npm run test:unit`).
5.  Make sure your code lints (`npm run lint`).
6.  Issue that pull request!

## Development Setup

### Prerequisites

*   Node.js (>= 18)
*   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/saul-paulus/vue-datatable-flex.git
    cd vue-datatable-flex
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running Locally

To start the development server with a demo page:
```bash
npm run dev
```

### Testing

We use Vitest for unit testing and Playwright for E2E testing.

*   Run unit tests:
    ```bash
    npm run test:unit
    ```
*   Run unit tests for Nuxt:
    ```bash
    npm run test:nuxt
    ```
*   Run end-to-end tests:
    ```bash
    npm run test:e2e
    ```

### Formatting and Linting

We use `oxlint` and `eslint` for linting and `oxfmt` for formatting.

*   Lint the code:
    ```bash
    npm run lint
    ```
*   Automatically fix formatting:
    ```bash
    npm run format
    ```

## Coding Standards

*   Use TypeScript for all new code.
*   Follow the existing code style (Composition API, `<script setup>`).
*   Ensure all components are responsive and follow Bootstrap 5 design principles.
*   Document new props, events, and methods in the `README.md`.

## Commit Message Conventions

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

*   `feat`: A new feature
*   `fix`: A bug fix
*   `docs`: Documentation only changes
*   `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
*   `refactor`: A code change that neither fixes a bug nor adds a feature
*   `perf`: A code change that improves performance
*   `test`: Adding missing tests or correcting existing tests
*   `build`: Changes that affect the build system or external dependencies
*   `ci`: Changes to our CI configuration files and scripts
*   `chore`: Other changes that don't modify src or test files

Example: `feat(core): add loading slot support`

---

Thank you for your contribution! ❤️
