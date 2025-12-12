# Task Manager Frontend

A responsive and user-friendly frontend application built with React and Vite. This interface connects to the Task Manager API and provides a seamless experience for user authentication and task management. Designed with modern React principles, reusable components, and clean UI architecture.

## Features

### User Interface
- Mobile-friendly and responsive layout
- Clean and intuitive design
- Reusable components (Navbar, Forms, Task Items)

### Authentication
- User registration and login pages
- Secure authentication flow using JWT stored in browser memory
- Protected routes for logged-in users only

### Task Management
- Create, view, update, and delete tasks
- Real-time UI updates
- User-specific task display

### Architecture & Code Quality
- Organized file structure using `components/`, `pages/`, and `assets/`
- React functional components and hooks
- Centralized styling using CSS modules and global styles
- API service integration for clean code separation

## Tech Stack

**Frontend:** React (Vite), JSX  
**Styling:** CSS  
**Build Tool:** Vite  
**Other:** Fetch API, React Hooks, Environment Variables  

## Project Structure

```
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Tasks.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.jsx
│   ├── index.css
│   ├── main.jsx
│   └── styles.css
├── package.json
└── vite.config.js
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/task-manager-frontend.git
cd task-manager-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```
VITE_API_URL=http://localhost:5000/api
```

Update the value if your backend is deployed.

### 4. Run the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

## Pages Overview

- **Home** – Overview of the app  
- **Register** – Create a new user  
- **Login** – Authenticate and access tasks  
- **Tasks** – Full CRUD task management interface  

## Future Improvements

- Dark mode theme  
- Global state management (Redux or Zustand)  
- Toast notifications  
- Form validation improvements  
- Deployment with CI/CD pipeline  

## License

MIT License.
