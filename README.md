# CRUD Table

A large-scale, full-featured **CRUD Table Application** built with **React, Vite, TypeScript, Redux, TailwindCSS, and Shadcn UI**, designed for high-performance server-side filtering, sorting, and pagination of datasets with more than **10,000+ records**. Includes a **Node.js + Express mock API server**, clean architecture, Docker support, and full CRUD operations.

## Demo

Check out the live demo: [CRUD Table Demo](https://crud-table-owrm.vercel.app/)

## ✨ Features

- 🔄 **Server-side pagination, sorting, and filtering**
- 📦 **LocalStorage-based data caching and persistence**
- 🧠 **Redux + Redux Toolkit for global state management**
- 🎛️ **Advanced filtering:**
  - Date range selector
  - Price slider + inputs
  - Category dropdown
  - Title and Description search input
- ✍️ **CRUD operations** with form validation
- 💡 **Optimized rendering** & clean architecture (SOLID principles)
- 🌙 **Dark / Light / System theme support**
- 🐳 **Dockerized** for easy setup
- 📱 **Responsive** and modern UI with TailwindCSS and Shadcn UI

---

## 🗂️ Project Structure

```
crud-table/
├── crud-app/             # Frontend (Vite + React + TypeScript + Redux)
│   ├── src/
│   ├── public/
│   ├── vite.config.ts
│   └── package.json
│
├── mock-api-server/      # Backend (Node + Express)
│   ├── src/
│   ├── .env
│   └── package.json
│
├── .gitignore
├── docker-compose.yml    # Fullstack containerized setup
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js >= 18.x
- Docker & Docker Compose (optional, for containerized setup)

---

## 🔧 Setup Instructions

### Option 1: Local Development

#### 1. Clone the repository

```bash
git clone https://github.com/mohammadoftadeh/crud-table.git
cd crud-table
```

#### 2. Start the mock API server

```bash
cd mock-api-server
yarn install or npm install
yarn start or npm start
```

> The server will run on `http://localhost:8000` by default.

#### 3. Start the frontend app

```bash
cd ../crud-app
yarn install or npm install
yarn dev or npm run dev
```

> The app will be available at `http://localhost:5173`.

---

### Option 2: Run with Docker

```bash
docker-compose up --build
```

> - Frontend: http://localhost:5173
> - API Server: http://localhost:8000

---

## 📊 Core Functionality

| Feature            | Description                             |
| ------------------ | --------------------------------------- |
| Pagination         | Server-side, supports large datasets    |
| Sorting            | Toggle ascending/descending per column  |
| Filtering          | Date, Price, Category, Search           |
| CRUD               | Full Create, Read, Update, Delete       |
| Form Validation    | Client-side input validation            |
| State Management   | Redux Toolkit                           |
| Caching            | Uses `localStorage` to cache responses  |
| Theme Support      | Dark / Light / System                   |
| Responsive         | Fully responsive design                 |
| Clean Architecture | Follows SOLID and clean code principles |

---

## 🧪 Technologies Used

- **Frontend:**
  - React + Vite
  - TypeScript
  - Redux Toolkit
  - TailwindCSS
  - Shadcn UI
  - Framer Motion
- **Backend:**
  - Node.js
  - Express.js
- **DevOps:**
  - Docker & Docker Compose

---

## 🧑‍💻 Author

- **Mohammad Oftadeh**  
  [LinkedIn](https://www.linkedin.com/in/mohammad-oftadeh/) | [GitHub](https://github.com/mohammadoftadeh/)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---
