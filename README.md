1. Student Result Management System

A role-based web application built with the MERN Stack (MongoDB, Express, React, Node.js) that allows teachers to manage student results and students to view their marks securely.
# Features

i) Teacher
- Register / Login (JWT Auth)
- View all students
- Add, Edit, or Delete student results
- Search and filter students
- Manage results in real time

ii) Student
- Register / Login (JWT Auth)
- View personal results
- Google login supported
- 
# Tech Stack

 Frontend: ReactJS, Tailwind CSS 
 Backend: Node.js, Express.js 
 Database: MongoDB (Mongoose) 
 Authentication: JWT (JSON Web Token) 

2. Install Dependencies
i) Backend setup
cd backend
npm install

ii) Frontend setup
cd ../frontend
npm install

3. Configure Environment Variables

Create a .env file inside the backend folder

PORT=5000
MONGO_URI=mongodb+srv://sharafatali75999_db_user:bwCrDuVTgZniOLAa@cluster0.va1dwgm.mongodb.net/lms-lab?retryWrites=true&w=majority
JWT_SECRET=mySuperSecretKey

4. Run the Application
i) Start backend (default: localhost:5000)
cd backend
npm run dev

ii) Start frontend (default: localhost:5173)
cd ../frontend
npm run dev

5. Folder Structure
LMS/
│
├── backend/
│    ─ controllers/
│    ─ models/
│    ─ routes/
│    ─ middleware/
│    ─ server.js
│
├── frontend/
│    ─ src/
│        ─ pages/
│        ─ components/
│        ─ context/
│     ─ package.json
│
└── README.md
