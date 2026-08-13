from typing import List, Union
from pydantic_settings import BaseSettings
from pydantic import field_validator
import json

class Settings(BaseSettings):
    PROJECT_NAME: str = "AWS Route53 Clone API"
    API_PREFIX: str = "/api"
    DATABASE_URL: str = "sqlite:///./route53.db"
    CORS_ORIGINS: Union[List[str], str] = ["http://localhost:3000"]
    
    # Auth configuration
    SECRET_KEY: str = "dev-secret-key-route53-clone-change-in-production-38491823"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    COOKIE_NAME: str = "route53_session"
    
    # Default development demo credentials
    AUTH_USERNAME: str = "admin"
    AUTH_PASSWORD: str = "admin123"
    AUTH_EMAIL: str = "admin@route53.aws"

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str):
            if v.startswith("[") and v.endswith("]"):
                return json.loads(v)
            return [i.strip() for i in v.split(",") if i.strip()]
        elif isinstance(v, list):
            return v
        return ["http://localhost:3000"]

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
