
# Fans CRM Assessment

This repository contains the Fans CRM Assessment project. It provides a backend service for managing fan-related data. You can run this project using Docker for a quick setup or run it locally for development and testing.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Yarn](https://yarnpkg.com/) (if running locally)

## Running the Backend

### Option 1: Using Docker Compose (Recommended)

To quickly set up and run the backend with Docker, use the following command:

```bash
docker-compose up -d
```

This command will start the backend service in detached mode. The application and its dependencies, such as the database, will be set up and started automatically. 

### Option 2: Running Locally

If you prefer to run the backend locally without Docker, you can clone the backend repository and start it manually. Follow these steps:

1. **Clone the Backend Repository**

   ```bash
   git clone https://github.com/echaoeoen/fans-crm-assesment-backend.git
   cd fans-crm-assesment-backend
   ```

2. **Install Dependencies**

   ```bash
   yarn install
   ```

3. **Run the Backend**

   ```bash
   yarn start
   ```

   The backend should now be running at [http://localhost:3000](http://localhost:3000).

4. **Login User**
   You can use this user: `admin@mail.com` with password: `password123` to test the application

## Available Scripts

In the project directory, you can run the following scripts:

### `yarn start`

Starts the application in development mode.Open [http://localhost:3001](http://localhost:3001) to view it in your browser.

The app will automatically reload if you make changes to the source files, and you will see any lint errors in the console.

### `yarn test`

Launches the test runner in interactive watch mode.Refer to the [running tests](https://facebook.github.io/create-react-app/docs/running-tests) section in the Create React App documentation for more information.

### `yarn build`

Builds the app for production, outputting files to the `build` folder.It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and filenames include hashes for cache busting.Your app is now ready for deployment!

Refer to the [deployment](https://facebook.github.io/create-react-app/docs/deployment) section in the Create React App documentation for more details.

### `yarn eject`

**Note:** This is a one-way operation. Once you `eject`, you cannot undo this action.

If you need full control over the build and configuration tools (webpack, Babel, ESLint, etc.), you can `eject` the app. This command will copy all configuration files and dependencies into your project, allowing you to customize them. Use this only when you need to customize the build process.

## Learn More

To learn more about using Create React App and React, refer to the following resources:

- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React Documentation](https://reactjs.org/)
