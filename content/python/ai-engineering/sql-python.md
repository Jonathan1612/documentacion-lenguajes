---
title: "SQL con Python"
level: ai-engineering
category: databases
tags: [python, sql, sqlite3, sqlalchemy, orm, postgresql]
duration: 60min
prerequisites: [clases, context-managers]
---

# SQL con Python para AI Engineering

## 🎯 ¿Por qué SQL en AI Engineering?

Los agentes necesitan **persistencia**:
- Historial de conversaciones
- Embeddings y metadata
- Configuraciones de usuarios
- Logs de operaciones
- Cache de resultados

## 📦 sqlite3 - Built-in Database

```python
import sqlite3

# Conectar (crea archivo si no existe)
conn = sqlite3.connect('mi_db.db')
cursor = conn.cursor()

# Crear tabla
cursor.execute('''
    CREATE TABLE IF NOT EXISTS conversaciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        mensaje TEXT NOT NULL,
        respuesta TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
''')

# Insertar datos
cursor.execute('''
    INSERT INTO conversaciones (user_id, mensaje, respuesta)
    VALUES (?, ?, ?)
''', ('user123', '¿Qué es Python?', 'Python es un lenguaje...'))

conn.commit()

# Consultar
cursor.execute('SELECT * FROM conversaciones WHERE user_id = ?', ('user123',))
resultados = cursor.fetchall()

for row in resultados:
    print(row)

conn.close()
```

## 🎨 Context Manager para DB

```python
from contextlib import contextmanager
import sqlite3

@contextmanager
def get_db_connection(db_path='app.db'):
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row  # Acceso por nombre de columna
    try:
        yield conn
    finally:
        conn.close()

# Uso
with get_db_connection() as conn:
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM conversaciones')
    rows = cursor.fetchall()
    
    for row in rows:
        print(f"User: {row['user_id']}, Mensaje: {row['mensaje']}")
```

## 🚀 SQLAlchemy - ORM Profesional

```bash
pip install sqlalchemy
```

### Definir Modelos

```python
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

Base = declarative_base()

class Conversacion(Base):
    __tablename__ = 'conversaciones'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(String(100), nullable=False, index=True)
    mensaje = Column(Text, nullable=False)
    respuesta = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    modelo = Column(String(50), default='gpt-3.5-turbo')
    tokens_usados = Column(Integer, default=0)
    
    def __repr__(self):
        return f"<Conversacion(user={self.user_id}, timestamp={self.timestamp})>"

# Crear engine y tablas
engine = create_engine('sqlite:///ai_agent.db')
Base.metadata.create_all(engine)

# Crear sesión
Session = sessionmaker(bind=engine)
session = Session()
```

### CRUD Operations

```python
# CREATE
nueva_conv = Conversacion(
    user_id='user123',
    mensaje='¿Cómo funciona RAG?',
    respuesta='RAG combina retrieval con generation...',
    tokens_usados=150
)
session.add(nueva_conv)
session.commit()

# READ
# Todas las conversaciones de un usuario
conversaciones = session.query(Conversacion)\
    .filter(Conversacion.user_id == 'user123')\
    .order_by(Conversacion.timestamp.desc())\
    .all()

# Últimas 5 conversaciones
ultimas = session.query(Conversacion)\
    .order_by(Conversacion.timestamp.desc())\
    .limit(5)\
    .all()

# UPDATE
conv = session.query(Conversacion).filter_by(id=1).first()
conv.tokens_usados = 200
session.commit()

# DELETE
session.query(Conversacion).filter(Conversacion.id == 1).delete()
session.commit()
```

## 💡 Ejemplo: Sistema de Memoria para Agente

```python
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime, timedelta

Base = declarative_base()

class ChatMemory(Base):
    __tablename__ = 'chat_memory'
    
    id = Column(Integer, primary_key=True)
    session_id = Column(String(100), nullable=False, index=True)
    role = Column(String(20), nullable=False)  # 'user' o 'assistant'
    content = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)
    tokens = Column(Integer, default=0)
    model = Column(String(50))

class AgentMemory:
    def __init__(self, db_path='memory.db'):
        self.engine = create_engine(f'sqlite:///{db_path}')
        Base.metadata.create_all(self.engine)
        Session = sessionmaker(bind=self.engine)
        self.session = Session()
    
    def add_message(self, session_id: str, role: str, content: str, 
                    tokens: int = 0, model: str = 'gpt-3.5-turbo'):
        """Agregar mensaje al historial"""
        msg = ChatMemory(
            session_id=session_id,
            role=role,
            content=content,
            tokens=tokens,
            model=model
        )
        self.session.add(msg)
        self.session.commit()
    
    def get_history(self, session_id: str, limit: int = 10):
        """Obtener historial reciente"""
        messages = self.session.query(ChatMemory)\
            .filter(ChatMemory.session_id == session_id)\
            .order_by(ChatMemory.timestamp.desc())\
            .limit(limit)\
            .all()
        
        return [
            {"role": msg.role, "content": msg.content}
            for msg in reversed(messages)
        ]
    
    def get_total_tokens(self, session_id: str):
        """Calcular tokens totales usados"""
        from sqlalchemy import func
        total = self.session.query(func.sum(ChatMemory.tokens))\
            .filter(ChatMemory.session_id == session_id)\
            .scalar()
        return total or 0
    
    def clear_old_sessions(self, days: int = 30):
        """Limpiar sesiones antiguas"""
        cutoff = datetime.utcnow() - timedelta(days=days)
        self.session.query(ChatMemory)\
            .filter(ChatMemory.timestamp < cutoff)\
            .delete()
        self.session.commit()

# Uso
memory = AgentMemory()

# Agregar conversación
memory.add_message('session_abc', 'user', '¿Qué es un agente?', tokens=10)
memory.add_message('session_abc', 'assistant', 'Un agente es...', tokens=50)

# Recuperar historial
history = memory.get_history('session_abc')
print(history)

# Ver tokens usados
tokens = memory.get_total_tokens('session_abc')
print(f"Total tokens: {tokens}")
```

## 🗄️ PostgreSQL para Producción

```bash
pip install psycopg2-binary
```

```python
from sqlalchemy import create_engine

# PostgreSQL connection string
DATABASE_URL = "postgresql://user:password@localhost:5432/ai_agent_db"

engine = create_engine(DATABASE_URL)
Base.metadata.create_all(engine)

# Mismo código que con SQLite
Session = sessionmaker(bind=engine)
session = Session()
```

## 🎯 Ejemplo: RAG Document Store

```python
from sqlalchemy import Column, Integer, String, Text, JSON
from datetime import datetime

class Document(Base):
    __tablename__ = 'documents'
    
    id = Column(Integer, primary_key=True)
    filename = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    embedding_id = Column(String(100))  # ID en vector DB
    metadata = Column(JSON)  # {"page": 1, "section": "intro"}
    created_at = Column(DateTime, default=datetime.utcnow)

class DocumentStore:
    def __init__(self, engine):
        self.engine = engine
        Session = sessionmaker(bind=engine)
        self.session = Session()
    
    def add_document(self, filename: str, content: str, 
                     embedding_id: str = None, metadata: dict = None):
        doc = Document(
            filename=filename,
            content=content,
            embedding_id=embedding_id,
            metadata=metadata or {}
        )
        self.session.add(doc)
        self.session.commit()
        return doc.id
    
    def search_by_filename(self, filename: str):
        return self.session.query(Document)\
            .filter(Document.filename.like(f'%{filename}%'))\
            .all()
    
    def get_by_embedding_id(self, embedding_id: str):
        return self.session.query(Document)\
            .filter(Document.embedding_id == embedding_id)\
            .first()
```

## 💪 Mejores Prácticas

```python
# 1. Siempre usa parametrized queries (evita SQL injection)
# ❌ MAL
query = f"SELECT * FROM users WHERE id = {user_id}"

# ✅ BIEN
session.query(User).filter(User.id == user_id).first()

# 2. Usa índices para búsquedas frecuentes
class Message(Base):
    __tablename__ = 'messages'
    id = Column(Integer, primary_key=True)
    user_id = Column(String(100), index=True)  # ← Índice
    timestamp = Column(DateTime, index=True)   # ← Índice

# 3. Connection pooling para producción
from sqlalchemy.pool import QueuePool

engine = create_engine(
    DATABASE_URL,
    poolclass=QueuePool,
    pool_size=5,
    max_overflow=10
)

# 4. Manejo de errores
from sqlalchemy.exc import SQLAlchemyError

try:
    session.add(obj)
    session.commit()
except SQLAlchemyError as e:
    session.rollback()
    print(f"Error: {e}")
finally:
    session.close()
```

## 🔗 Temas Relacionados

- [FastAPI](./fastapi) - APIs con bases de datos
- [RAG Systems](./rag-systems) - Document stores
- [Deployment](./deployment) - PostgreSQL en producción

## 📚 Recursos

- [SQLAlchemy Docs](https://docs.sqlalchemy.org/)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [Alembic Migrations](https://alembic.sqlalchemy.org/)

---

> 💡 **Tip**: Para agentes, SQLite es perfecto para dev/prototipado. PostgreSQL para producción.
