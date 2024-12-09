# Playwright Cucumber End to End Framework

## Prequisites
* Windows Pro 11
* Node.js installed (minimum version 22). Download from Node.js [official website](https://nodejs.org/en).
* Git installed for version control. Download from Git [official website](https://git-scm.com/downloads/win).

## Initialize the project
1. Open a terminal (Command Prompt, PowerShell, or Windows Terminal).
2. Create a new project folder and initialize it:
    ```
    mkdir scrambler-ui-test
    cd scrambler-ui-test
    npm init -y
    ```

## Install required dependencies
* Playwright: End-to-end testing framework.
* Cucumber.js: For BDD Gherkin support.
* Playwright Cucumber Adapter: Bridges Playwright and Cucumber.
* Other Utilities: Required libraries for handling JSON, reporting, etc.
    ```
    npm install
    ```

## Install Playwright browsers
Playwright requires browsers to be installed explicitly. Run the following command to install them:
```
npx playwright install
```
This command will download and install Chromium, Firefox, and WebKit browsers, which are required for cross-browser testing.

## Project structure
```
scrambler-ui-test/
├── features/
│   ├── image_creation.feature
├── src/
│   ├── base/
│   │   ├── base_page.ts
│   ├── pages/
│   │   ├── homepage.ts
│   │   ├── create_page.ts
│   │   ├── submit_page.ts
│   ├── steps/
│   │   ├── step_definitions.ts
├── test-data/
│   ├── input.json
├── reports/
├── playwright.config.ts
├── cucumber.js
├── README.md
```

## To run
```
npm run test:debug
```

## Image downloads
The images will be downloaded to the downloaded folders and will be over-written if a file with the same name exists

## To be worked on
* Have helper folder which will contain utilities
* Have a fixtures file
* Better error handling and messaging e.g. image generation takes more than 60 secs.
* Downloaded images can have date and time in its name
* Ability to download multiple images
* Hook up to to CI/ CD pipelines
* Have reporting along with video and screenshots enabled