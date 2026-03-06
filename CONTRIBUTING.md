# Contributing to webext-command-palette

Thanks for your interest in contributing. This guide covers the basics.


GETTING STARTED

1. Fork the repo on GitHub
2. Clone your fork locally
3. Install dependencies with `npm install`
4. Create a branch for your change


DEVELOPMENT WORKFLOW

Build the project:

```
npm run build
```

Run the tests:

```
npm test
```

Make sure the build passes and tests are green before opening a pull request.


PULL REQUESTS

- Keep changes focused. One feature or fix per PR.
- Write clear commit messages that explain what changed and why.
- If your change adds new API surface, update the README.
- All PRs run through CI. Fix any failures before requesting review.


REPORTING BUGS

Open an issue using the bug report template. Include steps to reproduce, expected behavior, and actual behavior. Browser and extension context details help a lot.


REQUESTING FEATURES

Open an issue using the feature request template. Describe the problem you are solving and why the current API does not cover it.


CODE STYLE

- TypeScript strict mode is on
- Keep things simple and readable
- No external runtime dependencies


LICENSE

By contributing, you agree that your contributions will be licensed under the MIT License.
