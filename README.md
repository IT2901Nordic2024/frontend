# nRFHabitTracker-frontend

This is the frontend part of our habit tracker project. It is a web interface made for displaying the data gathered by the nRF9160 chip provided by Nordic Semiconductor.

## Table of Contents

- [Features](#features)
- [Folder Structure](#folder-structure)
- [Technologies](#technologies)
- [Future Work](#future-work)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [E2E-tests](#e2e-tests)
  - [Prerequisites](#prerequisites-1)
  - [Opening Cypress Test Runner](#opening-cypress-test-runner)
  - [Running Cypress Tests Headlessly](#running-cypress-tests-headlessly)
  - [Running Specific Test Files](#running-specific-test-files)

## Features

List of the project's main features (pages).

- **Log In Page**: Includes real-time client-side validation to enhance user experience and data integrity. This is the page the user enters when they enter the web interface.
- **Sign Up Page**: Features comprehensive input validation ensuring user data meets security and format standards.
- **Verification Page**: Page for verification after signing up. The user must write in a valid verification code sent to thei email to be able to log in.
- **Device Page**: Allows users to see information about their device and which habit is connected to which side.
- **Add Goal Page**: This page makes it possible to add a new goal for a habit. The user has to type in a question, the target, unit and frequency wished for. These fields are validated, and the goal is added on the analytics page if valid.
- **Edit Goal Page**: Page for editing an existing goal for a habit, using the same methods as the add goal page.
- **Add Habit Page**: Page for the user to add new habits to their system. The user must choose a name, side and type for the tracking, which are validated as needed. This data will then display on the main page (My Habits Page).
- **Analytics Page**: Page that displays all analytics needed to see about a habit. You reach this page by clicking on a habit card on the main page. A history card will show a chart usefull for the tracking type. The goal card will show the user specified goal for this habit, if set. A user can have one goal for each habit. There is also a Calender with active days marked and a small summary section.
- **My Habits Page**: This is the main page for users once they have logged in. Fetches and displays the user's habits from an AWS API Gateway.
- **Edit Habit Page**: This is the page for editing a habit, which you can reach by clicking "Edit Habit" inside the analytics page connencted to a habit. The user must fill in one of the fields to be able to save changes, where no changes are made if nothing is filled in. The new data will then display on the main page (My Habits Page).
- **Account Page [UNUSED]**: This is the page for editing user information. Since this feature was not supported in the backend by the end of the project, it is currently not used.
- **Connect Device Page [UNUSED]**: This is the page for connecting to a device. Since the user would only be able to connect a device when signing up as of now, it is currently not used.

## Folder Structure

- **src**: The root directory of the source code.
  - **Api**: Contains the API configuration and endpoints for interacting with backend services.
  - **App**: Contains the main entry point of the application.
  - **Components**: Holds reusable UI components used throughout the application.
    - **calender**: Components related to calender functionality, used on the analytics page
    - **charts**: Components related to charting functionality.
    - **deviceSVG**: Component for rendering a DOD figure with text inside.
    - **footer**: Component for displaying a footer.
    - **habitCard**: Component for displaying habit cards.
    - **loadingSpinner**: Component for graphics when something loads.
    - **navBar**: Component for displaying a navigation bar.
    - **shadcnComponents**: Components provided by the Shadcn UI library.
      - **button**: Displays a button or a component that looks like a button.
      - **button2**: Button used by shadcn calender component.
      - **card**: Displays a card with header, content, and footer.
      - **CoolCard**: functional component that shows text in a visualy appealing way
      - **form**: Building forms with React Hook Form and Zod.
      - **input**: Displays a form input field or a component that looks like an input field.
      - **label**: Renders an accessible label associated with controls.
      - **select**: Displays a list of options for the user to pick from—triggered by a button.
      - **tabs**: A set of layered sections of content—known as tab panels—that are displayed one at a time.
      - **toast**, **toaster** and **use-toast**: A succinct message that is displayed temporarily.
    - **utils**: Connected to the shadcn components.
  - **Pages**: Contains the pages listed above under _Features_.

## Technologies

List the technologies, frameworks, and libraries used in the project.

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [React Router](https://reactrouter.com/) - Declarative routing for React applications.
- [Shadcn UI](https://shadcn.github.io/ui/) - A React UI component library for faster and easier web development.
- [Zod](https://github.com/colinhacks/zod) - For schema definition and validation, ensuring data integrity throughout the app.
- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs.
- [ApexCharts](https://apexcharts.com/) - A modern charting library for interactive visualizations of data.
- [Cypress](https://www.cypress.io/) - Comprehensive e2e testing framework
- [Jest](https://jestjs.io/) - Javascript testing framwork, used to test components
- [React Icons](https://react-icons.github.io/react-icons/) - Library for customizable SVG icons
- [useHooks](https://usehooks-ts.com/) - A React hooks library that provides a set of hooks that enables you to build your React applications faster
- [js-cookie](https://github.com/js-cookie/js-cookie) - A JavaScript API for handling cookies

## Future Work

This being a student project over a limited amount of time, there still are some areas of improvement by the end of this project.

- **Enhanced User Experience**: Continuously improve the user interface and experience based on user feedback and usability testing. This involved aspects such as refining existing features, optimising page loading times, or adding animations for a more engaging experience.
- **Goals**: This is one of the last features the group managed to finish. Functionality for deleting an exisiting goal is missing. There is also no indications whether or not the goal is reached as of now. For future work it would be possible to both have visual feedback in the frontend as well as audiatory feedback from the device when a goal is reached.
- **Security**: As of now the user login utilises cookies to store user IDs for maintaining a login session for 1 day. In order to enhance security and make sure that user data is prodected, there are some areas that should be improved:
  - **Access Tokens**: Instead of solely relying on cookies for session management, there should be used access tokens sent from the backend instead of the user ID. This was not implemented due to access tokens not being supported by our current backend system. This approach provides better security by avoiding the vulnerabilities associated with storing sensitive information in cookies.
  - **Input Validation**: Implement robust input validation to prevent common security vulnerabilities such as SQL injection.
  - **Rate Limiting and IP Whitelisting**: Implement rate limiting and IP whitelisting mechanisms to protect against brute force attacks and unauthorised access attempts. This helps prevent repeatedly attempting to guess user credentials or exploit vulnerabilities in the system.
  - **Session Expiry and Refresh Tokens**: Implement session expiry policies to automatically invalidate user sessions after a certain period of inactivity, reducing the risk of session hijacking. Additionally, consider implementing refresh tokens to enable session renewal without requiring users to re-enter their credentials frequently.
- **Performance Optimisation**: Optimise the performance of the application by identifying and addressing bottlenecks in code, reducing unnecessary network requests, and implementing lazy loading for resources. Improving performance can lead to faster load times and a smoother user experience.
- **Accessibility Improvements**: Ensure that the application complies with accessibility standards to make it usable for users with disabilities. This can involve implementing features such as keyboard navigation (this is somewhat implemented already, but not fully), screen reader compatibility, and proper semantic markup.

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
