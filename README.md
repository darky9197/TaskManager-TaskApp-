# Pro-Level Task Management & Collaboration System

A sophisticated full-stack application built to handle complex task workflows, team collaboration, and secure data management. This project demonstrates a production-ready architecture using **Spring Boot** for the backend and **React** for the frontend.

## 🛠️ Technical Architecture

### Backend (Spring Boot)
* **Spring Security & JWT:** Implemented stateless authentication for secure API access.
* **Relational Mapping:** Configured a robust **One-to-Many** relationship between Users and Tasks.
* **Data Integrity:** Utilized **UUIDs** (Universally Unique Identifiers) for primary keys to enhance security and scalability across distributed systems.
* **Optimization:** Employed **DTOs (Data Transfer Objects)** to resolve infinite recursion issues during JSON serialization and ensure clean API responses.
* **Persistence:** Integration with PostgreSQL/MySQL via **Spring Data JPA**.

### Frontend (React)
* **Component-Based UI:** Built with reusable React components for a modular dashboard.
* **State Management:** (Mention if using Redux/Context API) for handling user sessions and task states.
* **REST Integration:** Seamless communication with the Spring Boot API using Axios.

## ✨ Key Features

* **Secure Authentication:** Role-based access control with JWT.
* **Advanced Task Management:** Create, assign, and track tasks with persistent UUID referencing.
* **Dynamic Dashboard:** Real-time updates on task status and priority levels.
* **Clean API Design:** Optimized payloads for fast performance and mobile-friendly data structures.

## 📂 Project Structure

```text
├── task-manager-backend/    # Spring Boot Application
│   ├── src/main/java/       # Entities (User, Task), DTOs, Controllers, Security
│   └── src/main/resources/  # Application properties & Security config
├── task-manager-frontend/   # ReactJS Application
│   ├── src/components/      # UI Components
│   └── src/services/        # API Service layers
└── README.md
```

## ⚙️ Installation & Setup

### Backend Setup
1.  Navigate to the backend directory.
2.  Configure your database credentials in `src/main/resources/application.properties`.
3.  Run the application:
    ```bash
    ./mvnw spring-boot:run
    ```

### Frontend Setup
1.  Navigate to the frontend directory.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm start
    ```

## 🚀 Future Roadmap
* [ ] Real-time notifications using Spring WebFlux/WebSockets.
* [ ] Deployment via Docker and Kubernetes.
* [ ] Integration of Deepfake detection for user profile verification (Project-specific expansion).

## API Endpoints Overview

Following the implementation of your **DTOs** and **UUID-based** relationships, here is the documented API structure for your system.

### Authentication & User Management
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Registers a new user and generates a unique UUID. |
| `POST` | `/api/auth/login` | Authenticates user and returns a JWT. |
| `GET` | `/api/users/me` | Retrieves current user profile using Security Context. |

### Task Management
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/tasks` | Creates a new task linked to the authenticated User's UUID. |
| `GET` | `/api/tasks` | Fetches all tasks for the logged-in user (filtered via DTO). |
| `GET` | `/api/tasks/{id}` | Retrieves specific task details by its UUID. |
| `PUT` | `/api/tasks/{id}` | Updates task status, priority, or description. |
| `DELETE` | `/api/tasks/{id}` | Removes a task from the database. |

---

## 🔧 Database Schema & Relationships

The project utilizes a **One-to-Many** relationship between the `User` and `Task` entities. By using **UUIDs** instead of auto-incrementing integers, we ensure that IDs are non-predictable and easier to manage across different environments.

* **User Entity:** Acts as the "One" side. Contains a `@OneToMany` collection of Tasks.
* **Task Entity:** Acts as the "Many" side. Contains a `@ManyToOne` join column referencing the User’s UUID.
* **JSON Recursion Fix:** `@JsonManagedReference` and `@JsonBackReference` (or specialized DTOs) are used to prevent the API from entering an infinite loop when fetching related data.

---

## 🛠️ Tech Highlights for the Hackathon

Since you've been preparing for a high-pressure environment like the **HCL Hackathon**, this project showcases your ability to:
1.  **Handle Security:** Proper implementation of `WebSecurityConfigurerAdapter` (or `SecurityFilterChain`) with JWT filters.
2.  **State Management:** Managing complex UI states in React that sync with a relational backend.
3.  **Clean Code:** Using DTOs to separate the persistence layer from the presentation layer—a critical skill for "Pro-Level" development.

---

## 📄 License
This project is open-source and available under the MIT License.
