# FastAPI + React Quiz App 🎓

An interactive full-stack quiz application built with **FastAPI (backend)** and **React (frontend)**.  
The app includes **JWT authentication**, **role-based access control (student/teacher)**, and a **PostgreSQL database**.

---

## ✨ Features
- 🔐 **User Authentication** with JWT (JSON Web Tokens)
- 👩‍🏫 **Role-based Access**  
  - Students → Take quizzes  
  - Teachers → Create and manage quizzes
- 🗄 **PostgreSQL Database** for persistent data storage
- ⚡ **FastAPI Backend** with CRUD endpoints
- 🎨 **React Frontend** with a clean UI
- 🧪 API tested with FastAPI interactive docs (`/docs`)

---

## 🛠 Tech Stack
**Frontend:** React, Fetch API, TailwindCSS (optional)  
**Backend:** FastAPI, SQLAlchemy, Pydantic  
**Database:** PostgreSQL  
**Auth:** JWT (python-jose, passlib)

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/fastapi-react-quiz.git
cd fastapi-react-quiz
2. Backend Setup (FastAPI)
bash
Copy code
cd backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
Start the backend:

bash
Copy code
uvicorn app.main:app --reload
API will be available at 👉 http://localhost:8000/docs

3. Frontend Setup (React)
bash
Copy code
cd frontend
npm install
npm start
Frontend will run at 👉 http://localhost:3000

🔑 Authentication & Roles
Users register with a username + password

Default role = student

Teachers can be created with role="teacher"

Login returns a JWT token which is required for accessing protected routes

📸 Screenshots
👉 (Add screenshots here once UI is finalized)

Login page

Teacher question creation form

Student quiz attempt

📂 Project Structure
bash
Copy code
fastapi-react-quiz/
│── backend/            # FastAPI backend
│   ├── app/
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── crud.py
│   │   ├── routers/
│   │   │   ├── auth.py
│   │   │   ├── questions.py
│   │   └── database.py
│── frontend/           # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
💡 Future Improvements
📊 Quiz results & leaderboard

📝 Multiple quiz categories

🌐 Deployment on AWS/GCP/Heroku

🎨 Better UI/UX with Material UI or TailwindCSS

🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss.

📜 License
This project is licensed under the MIT License.
