from fastapi import APIRouter, Depends, HTTPException, status, Response, Request
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.schemas.auth import LoginRequest, UserResponse, MessageResponse
from app.services.auth_service import authenticate_user, ensure_demo_user
from app.core.security import create_access_token
from app.core.config import settings
from app.core.deps import get_current_user
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login", response_model=UserResponse)
def login(
    login_data: LoginRequest,
    response: Response,
    db: Session = Depends(get_db)
):
    # Ensure demo account exists upon first login attempt
    ensure_demo_user(db)

    user = authenticate_user(db, username=login_data.username, password=login_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )

    # Create JWT session token
    access_token = create_access_token(subject=user.id)

    # Set HTTP-only secure cookie
    response.set_cookie(
        key=settings.COOKIE_NAME,
        value=access_token,
        httponly=True,
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        expires=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        samesite="lax",
        secure=False,  # Suitable for local development on http://localhost
    )

    return user

@router.post("/logout", response_model=MessageResponse)
def logout(response: Response):
    response.delete_cookie(
        key=settings.COOKIE_NAME,
        httponly=True,
        samesite="lax",
        secure=False,
    )
    return {"message": "Successfully logged out"}

@router.get("/me", response_model=UserResponse)
def get_current_authenticated_user(
    current_user: User = Depends(get_current_user)
):
    return current_user
