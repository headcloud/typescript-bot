# typescript-bot
POC for manageable unit tests with typescript

Starting point for node project written in TypeScript with several goals achieved:
---
* configuration to generate ESNext modules
* experimental decorators enabled to configure DI declaratively
* tests are in separate folder
* ts-node configured to compile tests in memory without trashing the project
* mocha test runner enalbed and configured for tests in separate folder
  * `npm test` to run all tests
  * `npm run single-test <path-to-test-file>` for single test
* vscode launch configurations for debugging:
  * all tests
  * single test from active editor tab

Not resolved:
---
* integration with vscode extensions for better DX
* coverage collection
