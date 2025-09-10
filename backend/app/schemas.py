from pydantic import BaseModel
from typing import Optional

# Input for creating user
class UserCreate(BaseModel):
    username: str
    password: str
    role: Optional[str] = "student"  # default role is student, can also be "teacher"

# Login input
class UserLogin(BaseModel):
    username: str
    password: str


# Output schema (for responses)
class UserOut(BaseModel):
    id: int
    username: str
    role: str

    class Config:
        orm_mode = True

