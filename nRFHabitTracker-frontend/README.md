# nRF- Habit- Frontend

This is the frontend part of our habit tracker project. It includes a log in, sign up and a sensor display page. After a sign up or a log in it fetches data from an AWS api gateway displaying device_id, uptime and timestamp from an nRF9160 chip provided by Nordic Semiconductor 

## Features

List of the project's main features.

- **Log In Page**: Includes real-time client-side validation to enhance user experience and data integrity.
- **Sign Up Page**: Features comprehensive input validation ensuring user data meets security and format standards.
- **Connect to Device Page**: Planned feature for future development to allow users to connect to devices
- **Sensor Data Page**: Fetches and displays sensor data from an AWS API Gateway


## Technologies

List the technologies, frameworks, and libraries used in the project.

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [React Router](https://reactrouter.com/) - Declarative routing for React applications.
- [Shadcn UI](https://shadcn.github.io/ui/) - A React UI component library for faster and easier web development.
- [Zod](https://github.com/colinhacks/zod) - For schema definition and validation, ensuring data integrity throughout the app.
- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** version 14 or higher
- **npm** version 6 or higher

### Installation

After ensuring you have the correct versions of Node.js and npm installed, follow these steps to install the project dependencies:

1. **Clone the repository** (if you haven't already done so):
**git clone https://github.com/IT2901Nordic2024/frontend.git**
**cd nRF-habit-frontend**

1. **Install dependencies** by running:
**npm install**

### Running the Application 

To run the application in development mode, execute the following command:

**npm run dev**
This command starts a local development server, typically accessible via `http://localhost:5173/`.