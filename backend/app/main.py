from fastapi import FastAPI
from sqlalchemy import text

from app.database import engine
from app.models.base import Base
from app.models.user import User
from app.routers.auth import router as auth_router


# Create database tables
Base.metadata.create_all(bind=engine)


# Create FastAPI application
app = FastAPI(
    title="DS Learning LMS",
    version="1.0.0"
)


# Register authentication routes
app.include_router(auth_router)


# Root endpoint
@app.get("/")
def root():
    return {
        "message": "DS Learning LMS Backend is running"
    }


# Database connection test
@app.get("/db-test")
def database_test():
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))

        return {
            "database": "connected",
            "result": result.scalar()
        }