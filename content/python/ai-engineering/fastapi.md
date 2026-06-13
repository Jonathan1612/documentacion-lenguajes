---
title: "FastAPI - Framework Web Moderno"
level: ai-engineering
category: backend
tags: [python, fastapi, api, async, pydantic, swagger]
duration: 90min
prerequisites: [clases, type-hints, asyncio]
---

# FastAPI para AI Engineering

## 🎯 ¿Por qué FastAPI?

**El framework perfecto para APIs de agentes AI**:
- ⚡ Async/await nativo
- 🔒 Validación automática con Pydantic
- 📚 Documentación auto-generada (Swagger)
- 🚀 Performance similar a Node.js/Go
- 💡 Type hints = autocompletado perfecto

## 🚀 Quick Start

```bash
pip install fastapi uvicorn[standard]
```

### Hello World

```python
# main.py
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id}
```

```bash
# Correr servidor
uvicorn main:app --reload

# Abre http://localhost:8000/docs para Swagger UI
```

## 📝 Pydantic Models

```python
from pydantic import BaseModel, Field
from typing import Optional

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000)
    session_id: Optional[str] = None
    model: str = "gpt-3.5-turbo"
    temperature: float = Field(0.7, ge=0, le=2)

class ChatResponse(BaseModel):
    response: str
    tokens_used: int
    model: str

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    # Validación automática de request
    # FastAPI convierte JSON → ChatRequest
    
    response_text = f"Echo: {request.message}"
    
    return ChatResponse(
        response=response_text,
        tokens_used=len(request.message.split()),
        model=request.model
    )
```

## 💡 Ejemplo: RAG API

```python
from fastapi import FastAPI, HTTPException, UploadFile, File
from pydantic import BaseModel
import openai
import os

app = FastAPI(title="RAG API", version="1.0")

openai.api_key = os.getenv("OPENAI_API_KEY")

# In-memory document store (usa DB en producción)
documents = []

class Document(BaseModel):
    content: str
    filename: str

class QueryRequest(BaseModel):
    question: str
    top_k: int = 3

class QueryResponse(BaseModel):
    answer: str
    sources: list[str]

@app.post("/documents/upload")
async def upload_document(file: UploadFile = File(...)):
    """Upload y procesa documentos"""
    content = await file.read()
    text = content.decode('utf-8')
    
    # Chunk the document (simplificado)
    chunks = [text[i:i+500] for i in range(0, len(text), 500)]
    
    for chunk in chunks:
        documents.append({
            'content': chunk,
            'filename': file.filename
        })
    
    return {"message": f"Uploaded {file.filename}", "chunks": len(chunks)}

@app.post("/query", response_model=QueryResponse)
async def query_documents(request: QueryRequest):
    """Query RAG system"""
    if not documents:
        raise HTTPException(status_code=404, detail="No documents uploaded")
    
    # Simple keyword search (usa embeddings en producción)
    relevant_docs = [
        doc for doc in documents 
        if any(word.lower() in doc['content'].lower() 
               for word in request.question.split())
    ][:request.top_k]
    
    if not relevant_docs:
        raise HTTPException(status_code=404, detail="No relevant documents found")
    
    # Build context
    context = "\n\n".join([doc['content'] for doc in relevant_docs])
    
    # LLM call
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Answer based on the context provided."},
            {"role": "user", "content": f"Context:\n{context}\n\nQuestion: {request.question}"}
        ]
    )
    
    answer = response.choices[0].message.content
    sources = list(set([doc['filename'] for doc in relevant_docs]))
    
    return QueryResponse(answer=answer, sources=sources)

@app.get("/documents/count")
async def get_document_count():
    """Get total documents"""
    return {"total_documents": len(documents)}

@app.delete("/documents")
async def delete_all_documents():
    """Clear document store"""
    documents.clear()
    return {"message": "All documents deleted"}
```

## 🔐 Dependency Injection

```python
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Verifica API token"""
    token = credentials.credentials
    
    # Verifica contra tu DB o servicio
    if token != os.getenv("API_TOKEN"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
    return token

@app.post("/protected")
async def protected_route(token: str = Depends(verify_token)):
    return {"message": "Access granted", "token": token[:10] + "..."}
```

## 🎨 Background Tasks

```python
from fastapi import BackgroundTasks
import time

def send_email_notification(email: str, message: str):
    """Simula envío de email"""
    time.sleep(5)  # Simula delay
    print(f"Email sent to {email}: {message}")

@app.post("/send-notification")
async def send_notification(
    email: str,
    message: str,
    background_tasks: BackgroundTasks
):
    background_tasks.add_task(send_email_notification, email, message)
    return {"message": "Notification will be sent in background"}
```

## 🌊 Streaming Responses

```python
from fastapi.responses import StreamingResponse
import asyncio

async def generate_llm_stream(prompt: str):
    """Simula streaming de LLM"""
    words = prompt.split()
    
    for word in words:
        yield f"data: {word}\n\n"
        await asyncio.sleep(0.1)
    
    yield "data: [DONE]\n\n"

@app.get("/stream")
async def stream_response(prompt: str):
    return StreamingResponse(
        generate_llm_stream(prompt),
        media_type="text/event-stream"
    )
```

## 🔄 Middleware

```python
from fastapi import Request
import time

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response
```

## 🎯 Exception Handling

```python
from fastapi import HTTPException
from fastapi.responses import JSONResponse

class RateLimitException(Exception):
    def __init__(self, detail: str):
        self.detail = detail

@app.exception_handler(RateLimitException)
async def rate_limit_exception_handler(request: Request, exc: RateLimitException):
    return JSONResponse(
        status_code=429,
        content={"error": "rate_limit_exceeded", "detail": exc.detail}
    )

@app.get("/limited")
async def limited_endpoint():
    # Tu lógica de rate limiting
    if rate_limit_exceeded:
        raise RateLimitException("Too many requests")
    
    return {"message": "Success"}
```

## 🗄️ Database Integration

```python
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

DATABASE_URL = "sqlite:///./app.db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    name = Column(String)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/users/{user_id}")
async def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
```

## 🧪 Testing

```python
# test_main.py
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}

def test_chat_endpoint():
    response = client.post(
        "/chat",
        json={
            "message": "Hello",
            "model": "gpt-3.5-turbo",
            "temperature": 0.7
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "response" in data
    assert "tokens_used" in data
```

```bash
# Instala pytest
pip install pytest

# Corre tests
pytest test_main.py
```

## 🚀 Deployment

### Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - DATABASE_URL=postgresql://user:pass@db:5432/appdb
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=appdb
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## 💪 Best Practices

```python
# 1. Estructura de proyecto
"""
my_api/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── models.py       # Pydantic models
│   ├── database.py     # DB config
│   ├── routers/
│   │   ├── chat.py
│   │   └── documents.py
│   └── services/
│       ├── llm.py
│       └── rag.py
├── tests/
├── requirements.txt
└── Dockerfile
"""

# 2. Usa APIRouter para modularizar
from fastapi import APIRouter

router = APIRouter(prefix="/chat", tags=["chat"])

@router.post("/")
async def chat_endpoint():
    return {"message": "Chat response"}

app.include_router(router)

# 3. Environment variables
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    openai_api_key: str
    database_url: str
    
    class Config:
        env_file = ".env"

settings = Settings()

# 4. CORS para frontends
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 🔗 Temas Relacionados

- [APIs REST](./apis-rest) - Consumir APIs
- [SQL con Python](./sql-python) - Database integration
- [Deployment](./deployment) - Producción

## 📚 Recursos

- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Pydantic Docs](https://docs.pydantic.dev/)
- [Full Stack FastAPI Template](https://github.com/tiangolo/full-stack-fastapi-postgresql)

---

> 💡 **Tip**: La documentación auto-generada en /docs es perfecta para que el frontend sepa cómo consumir tu API.
