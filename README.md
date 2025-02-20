# Simple Task Manager

## Project Overview

The **Simple Task Manager** is a task management application developed for the **EliteFit.AI FSD/SDE Screening Test**. The project aims to provide core task management functionality with a user-friendly interface. Users can add, edit, delete, search, and filter tasks based on priority levels and completion status.

### Core Features:

- **Dashboard**: Displays tasks categorized as upcoming, overdue, and completed.
- **Task Management**: Add, edit, and delete tasks with a title, description, due date, and priority level.
- **Priority Levels**: Tasks can have three priority levels (High, Medium, Low).
- **Search and Filter**: Allows users to search tasks by title and filter them based on priority and completion status.

### Technical Requirements:

- **Frontend**: React.js and Tailwind CSS for styling.
- **Local Storage**: Utilizes browser storage (localStorage) to store task data.

## Live Demo

You can view the live demo of the application here: [Simple Task Manager Demo](https://elitefit-asgn.netlify.app)

## Setup Instructions

1. Clone the repository:
```
git clone git@github.com:akashtripathi1/simple-task-manager.git
cd simple-task-manager
```
2. Install dependencies:
 ```
npm install
  ```
3. Start the development server:

  ```
  npm run dev
  ```

4. Open the application in your browser at http://localhost:5173.

## Technical Questions
1. How long did you spend on the coding test?

    **Answer:** I spent around 5-6 hours to build this project

2. What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.

    **Answer:**
    In React Router v7, createBrowserRouter provides a structured way to define routes. I like this approach because it keeps routing logic separate, making the code cleaner and easier to scale.

    Example
    ```javascript
    import { createBrowserRouter, RouterProvider } from "react-router-dom";
    import UserProfile from "./UserProfile";
    import UserError from "./UserError";

    const router = createBrowserRouter([
      {
        path: "/users/:id",
        element: <UserProfile />,
        errorElement: <UserError />,
      },
    ]);

    const App = () => <RouterProvider router={router} />;

    export default App;
    ```

    - Routes are well-organized in an array.
    - Built-in error handling with errorElement.
    - Keeps App minimal, just returning the router.
    This makes routing more readable and scalable

3. How would you track down a performance issue in production? Have you ever had to do this?

    **Answer:** To track down a performance issue in production, I would start by analyzing performance logs using tools like Chrome DevTools, Lighthouse. Also i need to check for unnecessary re-renders using React DevTools and the Redux DevTools extension. 

4. If you had more time, what additional features or improvements would you consider adding to the task management application?

    **Answer:** Currently, the app is frontend-only. I would add a backend to store tasks, implement authentication so users can log in and access tasks across devices, and improve the UI design for better responsiveness and usability.