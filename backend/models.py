from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import ARRAY
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    level = Column(Integer, default=1)
    xp = Column(Integer, default=0)
    coins = Column(Integer, default=50)
    created_at = Column(DateTime, default=datetime.utcnow)
    last_daily_challenge = Column(DateTime, nullable=True)
    
    unlocked_foodimals = relationship("UnlockedFoodimal", back_populates="user")

class UnlockedFoodimal(Base):
    __tablename__ = "unlocked_foodimals"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    foodimal_id = Column(String, nullable=False)
    unlocked_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="unlocked_foodimals")
