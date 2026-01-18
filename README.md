# 📝 MERN To-Do App

A full-stack MERN (MongoDB, Express, React, Node.js) To-Do application featuring secure JWT authentication, task prioritization, and a modern dark-themed user interface. This project demonstrates real-world CRUD functionality with clean frontend and backend integration.

---

## 🚀 Features

- 🔐 User Registration & Login using JWT
- 📝 Create, Read, Update, Delete Todos
- ✅ Mark tasks as complete or incomplete
- 🎯 Priority levels (Low, Medium, High)
- 📅 Due date support
- 🔍 Filter todos by status
- 🎨 Modern dark theme UI
- 📱 Fully responsive design

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Context API
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)

---

## 📁 Project Structure

mern-todo-app/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── services/
    │   └── App.jsx
    └── main.jsx

---

## ⚙️ Installation & Setup

### Clone the Repository
git clone https://github.com/your-username/To-Do-App.git
cd To-Do-App

---

### Backend Setup
cd backend
npm install

Create a .env file:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

Start backend server:
npm start

---

### Frontend Setup
cd ../frontend
npm install
npm run dev

---

## 🌐 API Endpoints

POST   /api/auth/register  → Register user  
POST   /api/auth/login     → Login user  
GET    /api/todos          → Get all todos  
POST   /api/todos          → Create todo  
PUT    /api/todos/:id      → Update todo  
DELETE /api/todos/:id      → Delete todo  

---

## 🔐 Environment Variables

All sensitive information is managed using environment variables.  
The .env file is excluded from version control using .gitignore to maintain security.

---

## 📌 Future Enhancements

- 🏷 Todo categories
- 🔔 Notifications & reminders
- 🌍 Cloud deployment

---

## 👩‍💻 Author

Sakshi Jadhav  
Computer Science & Engineering Student

---

⭐ If you like this project, feel free to star the repository!
