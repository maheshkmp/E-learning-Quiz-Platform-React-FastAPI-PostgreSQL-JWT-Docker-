from sqlalchemy.orm import Session
from . import models, schemas
from passlib.hash import bcrypt
from fastapi import HTTPException

# Create user (default role "student")
def create_user(db: Session, user: schemas.UserCreate, role: str = "student"):
    """
    Create a new user in the database.
    Default role is 'student'. Can pass role='teacher' if needed.
    """
    hashed_password = bcrypt.hash(user.password)
    db_user = models.User(
        username=user.username,
        password =hashed_password,  # make sure your models.User uses password_hash
        role=role
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Get user by username
def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

# Verify login credentials
def verify_user(db: Session, username: str, password: str):
    user = get_user_by_username(db, username)
    if not user:
        return None
    if not bcrypt.verify(password, user.password):  # use password_hash
        return None
    return user

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def delete_user(db: Session, user_id: int):
    user = get_user(db, user_id)
    if user:
        db.delete(user)
        db.commit()
        return True
    return False
def update_user(db: Session, user_id: int, user_update: schemas.UserCreate): 
    user = get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.username = user_update.username
    if user_update.password:
        user.password = bcrypt.hash(user_update.password)
    if user_update.role:
        user.role = user_update.role
    
    db.commit()
    db.refresh(user)
    return user
