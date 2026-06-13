---
title: "Deployment - Producción"
level: ai-engineering
category: devops
tags: [python, deployment, docker, railway, render, production]
duration: 75min
prerequisites: [fastapi, sql-python]
---

# Deployment de AI Applications

## 🎯 ¿Por qué Deployment es Diferente para AI?

**Retos únicos**:
- APIs externas (OpenAI, Anthropic) con rate limits
- Costos variables por uso
- Vector DBs (Pinecone, Weaviate)
- Background tasks largos
- Websockets para streaming
- State management

## 🐳 Docker Basics

### Dockerfile para FastAPI + AI

```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .

# Install Python packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy app
COPY . .

# Expose port
EXPOSE 8000

# Run
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### requirements.txt

```txt
fastapi==0.109.0
uvicorn[standard]==0.27.0
openai==1.10.0
anthropic==0.8.1
langchain==0.1.0
chromadb==0.4.22
sqlalchemy==2.0.25
pydantic==2.5.0
python-dotenv==1.0.0
httpx==0.26.0
redis==5.0.1
celery==5.3.4
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
      - REDIS_URL=redis://redis:6379/0
    depends_on:
      - db
      - redis
    volumes:
      - ./storage:/app/storage
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=appdb
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
  
  celery_worker:
    build: .
    command: celery -A tasks worker --loglevel=info
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - REDIS_URL=redis://redis:6379/0
    depends_on:
      - redis

volumes:
  postgres_data:
```

## 🚀 Railway Deployment

### 1. Preparar App

```python
# main.py
from fastapi import FastAPI
import os

app = FastAPI()

# Get port from environment (Railway sets PORT)
PORT = int(os.getenv("PORT", 8000))

@app.get("/")
def root():
    return {"status": "running"}

@app.get("/health")
def health():
    return {"healthy": True}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=PORT)
```

### 2. railway.toml

```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "uvicorn main:app --host 0.0.0.0 --port $PORT"
healthcheckPath = "/health"
healthcheckTimeout = 300
restartPolicyType = "ON_FAILURE"
```

### 3. Deploy

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize
railway init

# Deploy
railway up

# Ver logs
railway logs

# Add environment variables
railway variables set OPENAI_API_KEY=sk-...
```

## 🎨 Render Deployment

### render.yaml

```yaml
services:
  - type: web
    name: ai-api
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn main:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: PYTHON_VERSION
        value: 3.11
      - key: OPENAI_API_KEY
        sync: false
    healthCheckPath: /health
    
  - type: worker
    name: celery-worker
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: celery -A tasks worker --loglevel=info
    envVars:
      - key: REDIS_URL
        fromService:
          name: redis
          type: redis
          property: connectionString
  
databases:
  - name: postgres
    databaseName: appdb
    user: user
  
  - name: redis
    plan: starter
```

## 💾 Database Migrations (Alembic)

```bash
pip install alembic
alembic init alembic
```

### alembic/env.py

```python
from alembic import context
from sqlalchemy import engine_from_config, pool
from models import Base  # Tus modelos

target_metadata = Base.metadata

def run_migrations_online():
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)
        with context.begin_transaction():
            context.run_migrations()
```

### Create Migration

```bash
# Auto-generate migration
alembic revision --autogenerate -m "initial"

# Run migration
alembic upgrade head

# En producción (en Dockerfile)
CMD alembic upgrade head && uvicorn main:app --host 0.0.0.0
```

## 🔄 Background Tasks con Celery

```python
# tasks.py
from celery import Celery
import os

redis_url = os.getenv("REDIS_URL", "redis://localhost:6379/0")
celery = Celery("tasks", broker=redis_url, backend=redis_url)

@celery.task
def process_document(doc_id: str):
    """Procesa documento en background"""
    from openai import OpenAI
    
    client = OpenAI()
    
    # 1. Fetch document
    doc = fetch_document(doc_id)
    
    # 2. Generate embedding
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=doc.content
    )
    embedding = response.data[0].embedding
    
    # 3. Store in vector DB
    store_embedding(doc_id, embedding)
    
    return {"status": "completed", "doc_id": doc_id}

# En tu FastAPI
from fastapi import FastAPI, BackgroundTasks

@app.post("/documents/")
async def upload_document(file: UploadFile):
    # Guardar archivo
    doc_id = save_file(file)
    
    # Queue background task
    process_document.delay(doc_id)
    
    return {"doc_id": doc_id, "status": "processing"}
```

## 📊 Monitoring y Logging

### Structured Logging

```python
import logging
import json
from datetime import datetime

class JSONFormatter(logging.Formatter):
    def format(self, record):
        log_data = {
            "timestamp": datetime.utcnow().isoformat(),
            "level": record.levelname,
            "message": record.getMessage(),
            "module": record.module,
            "function": record.funcName,
        }
        
        if hasattr(record, "user_id"):
            log_data["user_id"] = record.user_id
        
        if record.exc_info:
            log_data["exception"] = self.formatException(record.exc_info)
        
        return json.dumps(log_data)

# Setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
handler = logging.StreamHandler()
handler.setFormatter(JSONFormatter())
logger.addHandler(handler)

# Uso
logger.info("User query", extra={"user_id": "123", "query": "Hello"})
```

### Sentry Error Tracking

```bash
pip install sentry-sdk
```

```python
import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration

sentry_sdk.init(
    dsn=os.getenv("SENTRY_DSN"),
    integrations=[FastApiIntegration()],
    traces_sample_rate=0.1,
)

# Automáticamente captura errores
@app.get("/error")
def error_endpoint():
    raise Exception("Something went wrong")
```

## 💰 Cost Tracking

```python
from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class APIUsage(Base):
    __tablename__ = "api_usage"
    
    id = Column(Integer, primary_key=True)
    user_id = Column(String, index=True)
    endpoint = Column(String)
    model = Column(String)
    input_tokens = Column(Integer)
    output_tokens = Column(Integer)
    cost = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)

def track_usage(user_id: str, response, model: str):
    """Track OpenAI usage"""
    usage = response.usage
    
    # Calcular costo (precios de Marzo 2024)
    prices = {
        "gpt-3.5-turbo": {"input": 0.0005, "output": 0.0015},
        "gpt-4": {"input": 0.03, "output": 0.06},
    }
    
    input_cost = (usage.prompt_tokens / 1000) * prices[model]["input"]
    output_cost = (usage.completion_tokens / 1000) * prices[model]["output"]
    total_cost = input_cost + output_cost
    
    # Guardar en DB
    record = APIUsage(
        user_id=user_id,
        model=model,
        input_tokens=usage.prompt_tokens,
        output_tokens=usage.completion_tokens,
        cost=total_cost
    )
    session.add(record)
    session.commit()

# Endpoint para ver costos
@app.get("/costs/{user_id}")
def get_costs(user_id: str):
    from sqlalchemy import func
    
    total = session.query(func.sum(APIUsage.cost))\
        .filter(APIUsage.user_id == user_id)\
        .scalar()
    
    return {"user_id": user_id, "total_cost": total or 0}
```

## 🔐 Security

```python
# 1. Environment Variables
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    openai_api_key: str
    database_url: str
    secret_key: str
    
    class Config:
        env_file = ".env"

settings = Settings()

# 2. Rate Limiting
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(429, _rate_limit_exceeded_handler)

@app.get("/api/chat")
@limiter.limit("10/minute")
def chat(request: Request):
    return {"response": "..."}

# 3. API Key Authentication
from fastapi import Security, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()

def verify_api_key(credentials: HTTPAuthorizationCredentials = Security(security)):
    if credentials.credentials != settings.secret_key:
        raise HTTPException(status_code=401, detail="Invalid API key")
    return credentials.credentials

@app.get("/protected")
def protected(api_key: str = Depends(verify_api_key)):
    return {"message": "Authenticated"}
```

## 🎯 Health Checks

```python
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    checks = {
        "api": "ok",
        "database": check_database(),
        "redis": check_redis(),
        "openai": check_openai(),
    }
    
    all_ok = all(v == "ok" for v in checks.values())
    status_code = 200 if all_ok else 503
    
    return JSONResponse(
        status_code=status_code,
        content={
            "status": "healthy" if all_ok else "unhealthy",
            "checks": checks
        }
    )

def check_database() -> str:
    try:
        session.execute("SELECT 1")
        return "ok"
    except:
        return "error"

def check_redis() -> str:
    try:
        redis_client.ping()
        return "ok"
    except:
        return "error"

def check_openai() -> str:
    try:
        client = OpenAI()
        client.models.list()  # Simple API call
        return "ok"
    except:
        return "error"
```

## 🚀 Scaling

### Horizontal Scaling

```yaml
# docker-compose con réplicas
services:
  api:
    build: .
    deploy:
      replicas: 3
    
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - api
```

### Caching con Redis

```python
import redis
import json
from functools import wraps

redis_client = redis.from_url(os.getenv("REDIS_URL"))

def cache_response(ttl=300):
    """Cache decorator"""
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Generate cache key
            cache_key = f"{func.__name__}:{str(args)}:{str(kwargs)}"
            
            # Check cache
            cached = redis_client.get(cache_key)
            if cached:
                return json.loads(cached)
            
            # Call function
            result = await func(*args, **kwargs)
            
            # Store in cache
            redis_client.setex(
                cache_key,
                ttl,
                json.dumps(result)
            )
            
            return result
        return wrapper
    return decorator

@app.get("/expensive-query")
@cache_response(ttl=600)  # Cache 10 minutos
async def expensive_query(query: str):
    # Query que toma tiempo
    result = slow_operation(query)
    return result
```

## 📚 Recursos

- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)
- [Railway Docs](https://docs.railway.app/)
- [Render Docs](https://render.com/docs)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

---

> 💡 **Tip**: Empieza con Railway/Render para MVP. Migra a AWS/GCP cuando tengas tráfico significativo.
