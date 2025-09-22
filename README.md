---

# 🎫 Ticket Support

A full-stack ticket support system built with **React (Vite + TypeScript)** for the frontend and **Node.js + Express + MongoDB** for the backend.
This application allows users to create, view, and manage support tickets.

---

## 🚀 Features

* **Frontend (React + Vite + TS)**

  * User-friendly ticket submission form
  * Dashboard to view and manage tickets
  * Pagination and navigation components
  * Error handling with custom error page
  * Theming support

* **Backend (Node.js + Express + MongoDB)**

  * RESTful API for ticket management
  * Ticket model with Mongoose
  * Controller for handling CRUD operations
  * Routes for ticket operations
  * Environment variables for configuration

---

## 📂 Project Structure

```
client/                # Frontend
 ├── src/
 │   ├── components/   # Reusable UI components
 │   │    ├── buttons/ # Button components
 │   │    ├── Navbar   # Navigation bar
 │   │    └── etc...
 │   ├── pages/        # Application pages (Home, TicketForm, TicketDetail, etc.)
 │   ├── store/        # State management
 │   ├── App.tsx       # Main App entry
 │   ├── main.tsx      # Vite entry point
 │   └── index.css     # Global styles
 └── vite.config.ts    # Vite config

server/                # Backend
 ├── controllers/      # Ticket controllers
 ├── models/           # Mongoose models
 ├── routers/          # Express routes
 └── .env              # Environment variables
```

---

## ⚙️ Tech Stack

### **Frontend**

* React 18
* Vite + TypeScript
* Tailwind css
* State management (custom store)

### **Backend**

* Node.js
* Express.js
* MongoDB + Mongoose
* dotenv (for environment variables)

---

## 🔑 Environment Variables

Create a `.env` file in the **server** directory with:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

## 🛠️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/ritik-raj-mehta/Ticket-Support.git
cd ticket-support
```

### 2. Install Dependencies

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 3. Run the Application

```bash
# Start backend server
cd server
npm start

# Start frontend
cd ../client
npm run dev
```

The app will run at:

* **Frontend:** `http://localhost:5173`
* **Backend:** `http://localhost:5000`

---

## 📌 API Endpoints (Backend)

| Method | Endpoint          | Description         |
| ------ | ----------------- | ------------------- |
| GET    | /api/tickets      | Get all tickets     |
| GET    | /api/tickets/\:id | Get single ticket   |
| POST   | /api/tickets      | Create a new ticket |
| PUT    | /api/tickets/\:id | Update a ticket     |
| DELETE | /api/tickets/\:id | Delete a ticket     |

---
