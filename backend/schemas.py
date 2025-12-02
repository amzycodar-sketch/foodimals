from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class UserCreate(BaseModel):
    username: str

class UserResponse(BaseModel):
    id: int
    username: str
    level: int
    xp: int
    coins: int
    unlocked_foodimals: List[str]
    
    class Config:
        from_attributes = True

class UnlockFoodimalRequest(BaseModel):
    foodimal_id: str

class AddXPRequest(BaseModel):
    amount: int

class AddCoinsRequest(BaseModel):
    amount: int

class LeaderboardEntry(BaseModel):
    username: str
    level: int
    xp: int
    rank: int
    
    class Config:
        from_attributes = True
