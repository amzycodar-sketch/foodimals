from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from typing import List
import os

from .database import engine, get_db, Base
from .models import User, UnlockedFoodimal
from .schemas import (
    UserCreate, 
    UserResponse, 
    UnlockFoodimalRequest,
    AddXPRequest,
    AddCoinsRequest,
    LeaderboardEntry
)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Foodimals API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {"status": "healthy"}

@app.post("/api/users", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    db_user = User(username=user.username)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    unlocked_ids = [uf.foodimal_id for uf in db_user.unlocked_foodimals]
    return UserResponse(
        id=db_user.id,
        username=db_user.username,
        level=db_user.level,
        xp=db_user.xp,
        coins=db_user.coins,
        unlocked_foodimals=unlocked_ids
    )

@app.get("/api/users/{username}", response_model=UserResponse)
def get_user(username: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    unlocked_ids = [uf.foodimal_id for uf in user.unlocked_foodimals]
    return UserResponse(
        id=user.id,
        username=user.username,
        level=user.level,
        xp=user.xp,
        coins=user.coins,
        unlocked_foodimals=unlocked_ids
    )

@app.post("/api/users/{username}/unlock")
def unlock_foodimal(username: str, request: UnlockFoodimalRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    existing = db.query(UnlockedFoodimal).filter(
        UnlockedFoodimal.user_id == user.id,
        UnlockedFoodimal.foodimal_id == request.foodimal_id
    ).first()
    
    if existing:
        return {"message": "Already unlocked"}
    
    unlock = UnlockedFoodimal(user_id=user.id, foodimal_id=request.foodimal_id)
    db.add(unlock)
    db.commit()
    
    return {"message": "Unlocked successfully"}

@app.post("/api/users/{username}/xp")
def add_xp(username: str, request: AddXPRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.xp += request.amount
    
    while user.xp >= user.level * 100:
        user.xp -= user.level * 100
        user.level += 1
        user.coins += 20
    
    db.commit()
    db.refresh(user)
    
    unlocked_ids = [uf.foodimal_id for uf in user.unlocked_foodimals]
    return UserResponse(
        id=user.id,
        username=user.username,
        level=user.level,
        xp=user.xp,
        coins=user.coins,
        unlocked_foodimals=unlocked_ids
    )

@app.post("/api/users/{username}/coins")
def add_coins(username: str, request: AddCoinsRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.coins += request.amount
    db.commit()
    db.refresh(user)
    
    return {"coins": user.coins}

@app.get("/api/leaderboard", response_model=List[LeaderboardEntry])
def get_leaderboard(limit: int = 100, db: Session = Depends(get_db)):
    users = db.query(User).order_by(User.xp.desc()).limit(limit).all()
    
    return [
        LeaderboardEntry(
            username=user.username,
            level=user.level,
            xp=user.xp,
            rank=idx + 1
        )
        for idx, user in enumerate(users)
    ]

if os.path.exists("dist/public"):
    app.mount("/", StaticFiles(directory="dist/public", html=True), name="static")
