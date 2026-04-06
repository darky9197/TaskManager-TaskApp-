# TaskManager-TaskApp (Pro-Level Collaboration System)

A sophisticated full-stack task management and team collaboration platform. This system is designed for organizational workflows, allowing Managers to oversee team members, assign tasks, and track real-time progress through a secure, scalable architecture.

## 🏗️ Technical Architecture

### Backend (Spring Boot)
* **Security:** Implements **JWT (JSON Web Token)** for stateless authentication and authorization.
* **Data Integrity:** Uses **UUIDs** (Universally Unique Identifiers) for all primary keys (Users and Tasks) to ensure non-predictable, secure IDs.
* **API Optimization:** Utilizes **DTOs** (`UserDTO`, `TaskDTO`) to prevent infinite recursion during JSON serialization and to expose only necessary data to the frontend.
* **Persistence:** Built with **Spring Data JPA** and **MySQL** for robust data management.

### Frontend (React + Vite)
* **Framework:** Built with **React 18** and **Vite** for a modern, responsive user experience.
* **State Management:** Uses **Context API** (`AuthContext`) for centralized authentication and session management.
* **Styling:** Custom UI implementation using **Tailwind CSS** and **Material UI** icons.
* **Routing:** Secure client-side navigation using `react-router-dom` with a custom `ProtectedRoute` component.

## 🚀 Key Features

* **Role-Based Access Control (RBAC):** Distinct workflows for **Managers** and **Employees**.
* **Manager Dashboard:** View team lists, monitor task status, and assign new responsibilities to employees.
* **Employee Workspace:** Personal task board to view and manage assigned work.
* **Task Editor:** Dynamic modal-based interface for creating and editing task details.
* **Secure Authentication:** Full Sign-In and Sign-Up flows with password encryption and token-based sessions.

## 📂 Project Structure

```text
├── backend/
│   ├── src/main/java/com/example/backend/
│   │   ├── configuration/   # Security, JWT, and CORS configs
│   │   ├── controller/      # REST Endpoints (User, Task, Manager, Employee)
│   │   ├── model/           # Entities (Users, Task) and DTOs
│   │   └── service/         # Business logic and JWT services
│   └── src/main/resources/  # MySQL and environment properties
└── frontend/
    ├── src/components/      # UI: Auth, Manage, TaskEditor, Navbar
    ├── src/context/         # AuthContext for session management
    ├── src/pages/           # Layouts: Home, Manage, Tasks, Auth
    └── axios/               # Centralized API configuration (api.js)
```

## ⚙️ Installation & Setup

### Backend Setup
1.  Configure your MySQL database in `backend/src/main/resources/application.properties`.
2.  Set your JWT Secret Key (or use the provided `GenerateKeyTest` to create one).
3.  Run the application using Maven:
    ```bash
    ./mvnw spring-boot:run
    ```

### Frontend Setup
1.  Navigate to the `frontend` directory.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the Vite development server:
    ```bash
    npm run dev
    ```

## 🚦 API Endpoints (Samples)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/user/register` | User registration. |
| `POST` | `/api/user/login` | Authentication and JWT issuance. |
| `GET` | `/api/manager/employees`| Fetch team members (Manager only). |
| `POST` | `/api/tasks/add` | Create a new task. |
| `GET` | `/api/employee/tasks` | Fetch tasks assigned to the current employee. |

---
*This project was developed by Pugazhendhi-siva as a high-level demonstration of Full-Stack CRUD and Security principles.*
