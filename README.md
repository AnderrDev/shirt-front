# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Project Structure

The project structure is as follows:

```
/Users/ander/Documents/shirt-front
├── public
│   ├── index.html
│   ├── manifest.json
│   ├── robots.txt
│   └── ...
├── src
│   ├── components
│   │   ├── auth
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   ├── dashboard
│   │   │   ├── ActionButtons.tsx
│   │   │   ├── CamisetaList.tsx
│   │   │   ├── CamisetaModal.tsx
│   │   │   ├── CamisetaSVG.tsx
│   │   │   └── Dashboard.tsx
│   │   └── PrivateRoute.tsx
│   ├── hooks
│   │   └── useCamisetas.ts
│   ├── utils
│   │   └── axiosConfig.ts
│   ├── App.css
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   └── setupTests.ts
├── .dockerignore
├── .firebaserc
├── .gitignore
├── Dockerfile
├── firebase.json
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/shirt-front.git
   cd shirt-front
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run the application:**
   ```sh
   npm start
   ```

4. **Build the application for production:**
   ```sh
   npm run build
   ```

## Firebase Hosting

This project uses Firebase Hosting. To deploy the application to Firebase, follow these steps:

1. **Install Firebase CLI:**
   ```sh
   npm install -g firebase-tools
   ```

2. **Login to Firebase:**
   ```sh
   firebase login
   ```

3. **Initialize Firebase in your project:**
   ```sh
   firebase init
   ```

4. **Deploy to Firebase:**
   ```sh
   firebase deploy
   ```

## Docker

This project includes a Dockerfile for containerization. To build and run the Docker container, follow these steps:

1. **Build the Docker image:**
   ```sh
   docker build -t shirt-front .
   ```

2. **Run the Docker container:**
   ```sh
   docker run -p 80:80 shirt-front
   ```

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

For more information on Firebase Hosting, visit the [Firebase Hosting documentation](https://firebase.google.com/docs/hosting).

For more information on Docker, visit the [Docker documentation](https://docs.docker.com/).
