from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
# inside app/main.py
from . import models, database, questions
from .questions import QuestionUpdate

from .database import engine, get_db, Base

from .questions import QuestionCreate, QuestionOut
from fastapi import status
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth


# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Quiz API")

app.include_router(auth.router)

# Routes
@app.get("/questions/", response_model=list[QuestionOut])
def read_questions(db: Session = Depends(get_db)):
    return questions.get_questions(db)

@app.get("/questions/{question_id}", response_model=QuestionOut)
def read_question(question_id: int, db: Session = Depends(get_db)):
    db_question = questions.get_question(db, question_id)
    if not db_question:
        raise HTTPException(status_code=404, detail="Question not found")
    return db_question

@app.post("/questions/", response_model=QuestionOut)
def create_question_route(question: QuestionCreate, db: Session = Depends(get_db)):
    return questions.create_question(db, question)

@app.delete("/questions/{question_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_question_route(question_id: int, db: Session = Depends(get_db)):
    success = questions.delete_question(db, question_id)
    if not success:
        raise HTTPException(status_code=404, detail="Question not found")
    return None  # 204 No Content does not return a body

@app.put("/questions/{question_id}", response_model=QuestionOut)
def update_question_route(question_id: int, question: QuestionUpdate, db: Session = Depends(get_db)):
    db_question = questions.update_question(db, question_id, question)
    if not db_question:
        raise HTTPException(status_code=404, detail="Question not found")
    return db_question



app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)