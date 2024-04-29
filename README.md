# nRFHabitTracker-frontend

This is the frontend part of our habit tracker project. It is a web interface made for displaying the data gathered by the nRF9160 chip provided by Nordic Semiconductor.

## Features

List of the project's main features.

- **Log In Page**: Includes real-time client-side validation to enhance user experience and data integrity. This is the page the user enters when they enter the web interface.
- **Sign Up Page**: Features comprehensive input validation ensuring user data meets security and format standards.
- **Connect to Device Page [not fully implemented]**: Allows users to connect to devices.
- **Device Page**: Allows users to see information about their device and which habit is connected to which side.
- **Add Goal Page**: This page makes it possible to add a new goal for a habit. The user has to type in a question, the target, unit and frequency wished for. These fields are validated, and the goal is added on the analytics page if valid. As of now charting the goal is not fully implemented as we are waiting for implementation from the backend. But if a goal is added, sample data showing the visuals are shown.
- **Add Habit Page**: Page for the user to add new habits to their system. The user must choose a name, side and type for the tracking, which are validated as needed. This data will then display on the main page (My Habits Page).
- **Analytics Page**: Page that displays all analytics needed to see about a habit. You reach this page by clicking on a habit card on the main page. A history card will show a chart usefull for the tracking type. The goal card will show the user specified goal for this habit, if set. A user can have one goal for each habit. There is also a Calender with active days marked and a small summary section.
- **My Habits Page**: This is the main page for users once they have logged in. Fetches and displays the user's habits from an AWS API Gateway.
- **Edit Habit Page**: This is the page for editing a habit, which you can reach by clicking "Edit Habit" inside the analytics page connencted to a habit. The user must fill in one of the fields to be able to save changes, where no changes are made if nothing is filled in. The new data will then display on the main page (My Habits Page).
- **Account Page**: This is the page for editing user information, reachable by clicking on the profile icon in the footer or account in the navbar.

## Folder Structure

- **src**: The root directory of the source code.
  - **Api**: Contains the API configuration and endpoints for interacting with backend services.
  - **App**: Contains the main entry point of the application.
  - **Components**: Holds reusable UI components used throughout the application.
    - **charts**: Components related to charting functionality.
    - **deviceSVG**: Component for rendering a DOD figure with text inside.
    - **footer**: Component for displaying footers.
    - **habitCard**: Component for displaying habit cards.
    - **loadingSpinner**: Component for graphics when something loads.
    - **navBar**: Component for displaying navigation bars.
    - **shadcnComponents**: Components provided by the Shadcn UI library.
  - **Pages**: Contains the pages listed above.

## Technologies

List the technologies, frameworks, and libraries used in the project.

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [React Router](https://reactrouter.com/) - Declarative routing for React applications.
- [Shadcn UI](https://shadcn.github.io/ui/) - A React UI component library for faster and easier web development.
- [Zod](https://github.com/colinhacks/zod) - For schema definition and validation, ensuring data integrity throughout the app.
- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs.
- [ApexCharts] (https://apexcharts.com/) - A modern charting library for interactive visualizations of data.
- [Cypress] (https://www.cypress.io/)- Comprehensive e2e testing framework
- [Jest] (https://jestjs.io/)- Javascript testing framwork, used to test components

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** version 14 or higher
- **npm** version 6 or higher

### Installation

After ensuring you have the correct versions of Node.js and npm installed, follow these steps to install the project dependencies:

1. **Clone the repository** (if you haven't already done so):
   **git clone https://github.com/IT2901Nordic2024/frontend.git**
   **cd nRFHabitTracker-frontend**

1. **Install dependencies** by running:
   **npm install**

### Running the Application

To run the application in development mode, execute the following command:

**npm run dev**
This command starts a local development server, typically accessible via `http://localhost:5174/`.

<!-- ## Testing
To run automated tests, use the following command:
**npm test** -->

## E2E-tests

For the nRFHabitTracker-frontend project, we use Cypress, a powerful and easy-to-use E2E testing framework that allows us to simulate real user interactions with the application.

### Prerequisites

Before you can run Cypress tests, you need to have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Opening Cypress Test Runner

To open the Cypress Test Runner, which provides a graphical interface for running your tests interactively, use the following command:

`npx cypress open`

The Test Runner will open in a new window, listing all the test files. You can click on any test file to run it interactively within the Cypress environment.

### Running Cypress Tests Headlessly

To run Cypress tests headlessly, use the following command:

`npx cypress run`

This command runs all your tests in headless mode and outputs the results to your terminal.

### Running Specific Test Files

If you wish to run a specific test file instead of all tests, you can use the `--spec` flag followed by the path to the test file:

`npx cypress run --spec "cypress/e2e/test_file.spec.ts"`
