from typing import Optional
from sqlalchemy.orm import Session
from app.models.user import User
from app.core.security import verify_password, get_password_hash
from app.core.config import settings

def get_user_by_username(db: Session, username: str) -> Optional[User]:
    return db.query(User).filter(User.username == username).first()

def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
    return db.query(User).filter(User.id == user_id).first()

def authenticate_user(db: Session, username: str, password: str) -> Optional[User]:
    user = get_user_by_username(db, username=username)
    if not user:
        return None
    if not verify_password(password, user.password_hash):
        return None
    return user

def ensure_demo_user(db: Session) -> User:
    """Ensure the predictable development demo user exists in SQLite."""
    user = get_user_by_username(db, username=settings.AUTH_USERNAME)
    if not user:
        user = User(
            username=settings.AUTH_USERNAME,
            email=settings.AUTH_EMAIL,
            password_hash=get_password_hash(settings.AUTH_PASSWORD),
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    return user
