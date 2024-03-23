# nRFHabitTracker-frontend

This is the frontend part of our habit tracker project. It is a web interface made for displaying the data gathered by the nRF9160 chip provided by Nordic Semiconductor.

## Features

List of the project's main features.

- **Log In Page**: Includes real-time client-side validation to enhance user experience and data integrity. This is the page the user enters when they enter the web interface.
- **Sign Up Page**: Features comprehensive input validation ensuring user data meets security and format standards.
- **Connect to Device Page**: Planned feature for future development to allow users to connect to devices
- **Add Goal Page**: This page makes it possible to add a new goal for a habit. The user has to type in a question, the target, unit and frequency wished for. These fields are validated, and the goal is added on the analytics page if valid.
- **Add Habit Page**: Page for the user to add new habits to their system. The user must choose a name, side and type for the tracking, which are validated as needed. This data will then display on the main page (My Habits Page).
- **Analytics Page**: Page that displays all analytics needed to see about a habit. You reach this page by clicking on a habit card on the main page. A history card will show a chart usefull for the tracking type. The goal card will show the user specified goal for this habit, if set. A user can have one goal for each habit.
- **My Habits Page**: This is the main page for users once they have logged in. Fetches and displays the user's habits from an AWS API Gateway.

## Folder Structure
- **src**: The root directory of the source code.
    - **Api**: Contains the API configuration and endpoints for interacting with backend services.
    - **App**: Contains the main entry point of the application.
    - **Components**: Holds reusable UI components used throughout the application.
        - **charts**: Components related to charting functionality.
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