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
```
###2. Backend Setup (FastAPI)
```bash
Copy code
cd backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```
Start the backend:

```bash
Copy code
uvicorn app.main:app --reload
API will be available at 👉 http://localhost:8000/docs
```
###3. Frontend Setup (React)
```bash
Copy code
cd frontend
npm install
npm start
```
Frontend will run at 👉 http://localhost:3000

🔑 Authentication & Roles
Users register with a username + password

Default role = student

Teachers can be created with role="teacher"

Login returns a JWT token which is required for accessing protected routes

📸 Screenshots

Login page
<img width="1260" height="271" alt="Screenshot 2025-09-10 172157" src="https://github.com/user-attachments/assets/5aa60557-b456-4ad8-854b-fe0942c2f1c8" />

Student quiz attempt
<img width="1286" height="783" alt="Screenshot 2025-09-10 172607" src="https://github.com/user-attachments/assets/19c4787c-5e1a-421b-a294-b8a7c78d9ac7" />

Fastapi Swagger
<img width="1572" height="833" alt="Screenshot 2025-09-10 175546" src="https://github.com/user-attachments/assets/e25b6f55-c23f-4c90-a6da-1603023bbd31" />

📂 Project Structure
```bash
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
```
💡 Future Improvements
📊 Quiz results & leaderboard

📝 Multiple quiz categories

🌐 Deployment on AWS/GCP/Heroku

🎨 Better UI/UX with Material UI or TailwindCSS

🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss.

📜 License
This project is licensed under the MIT License.
