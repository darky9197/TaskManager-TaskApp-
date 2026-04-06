import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Auth from "./pages/Auth.jsx";
import Tasks from "./pages/Tasks.jsx";
import Home from "./pages/Home.jsx";
import NoMatch from "./pages/NoMatch.jsx";
import Manage from "./pages/Manage.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import EmployeeList from "./components/Manage/EmployeeList.jsx";
import TaskEditor from "./components/Manage/TaskEditor.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute allowedRoles={["EMPLOYEE", "MANAGER"]}>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/tasks",
        element: <Tasks />,
      },
      {
        element: <ProtectedRoute allowedRoles={["MANAGER"]} />,
        children: [
          {
            path: "manage",
            element: <Manage />,
            children: [
              {
                index: true,
                element: <EmployeeList />,
              },
              {
                path: ":id",
                element: <TaskEditor />,
              },
            ],
          },
        ],
      },
    ],
  },

  {
    path: "/login",
    element: <Auth />,
  },
  {
    path: "*",
    element: <NoMatch />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
