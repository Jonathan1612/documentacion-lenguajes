---
title: "RAG - Retrieval Augmented Generation"
level: ai-engineering
category: llm
tags: [python, rag, vector-db, embeddings, chromadb, pinecone]
duration: 90min
prerequisites: [llms-openai, sql-python]
---

# RAG Systems - Retrieval Augmented Generation

## 🎯 ¿Qué es RAG?

**Problema**: Los LLMs no conocen tus datos privados y tienen conocimiento limitado.

**Solución RAG**:
1. **Retrieval**: Buscar información relevante en tu base de datos
2. **Augmented**: Agregar esa info al contexto del LLM
3. **Generation**: El LLM genera respuesta basada en tus datos

## 📊 Arquitectura RAG

```
┌─────────────┐
│  Usuario    │
│  "¿Precio   │
│   del X?"   │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│  1. Embedding   │  text-embedding-3
│  de la pregunta │
└────────┬────────┘
         │
         ▼
┌──────────────────┐
│ 2. Vector Search │  ChromaDB/Pinecone
│ Top-K similares  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 3. LLM + Context │  GPT-4
│ Genera respuesta │
└────────┬─────────┘
         │
         ▼
    Respuesta
```

## 🚀 RAG con ChromaDB (Local)

```bash
pip install chromadb openai
```

### Setup Básico

```python
import chromadb
from chromadb.config import Settings
from openai import OpenAI
import os

# Inicializar ChromaDB
chroma_client = chromadb.Client(Settings(
    chroma_db_impl="duckdb+parquet",
    persist_directory="./chroma_db"
))

# Crear/obtener colección
collection = chroma_client.get_or_create_collection(
    name="documentos",
    metadata={"description": "Documentos de la empresa"}
)

# OpenAI client
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
```

### Indexar Documentos

```python
def index_document(text: str, metadata: dict = None, doc_id: str = None):
    """Agregar documento a ChromaDB"""
    
    # Generar embedding
    response = openai_client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    embedding = response.data[0].embedding
    
    # Guardar en ChromaDB
    collection.add(
        documents=[text],
        embeddings=[embedding],
        metadatas=[metadata or {}],
        ids=[doc_id or str(hash(text))]
    )

# Indexar múltiples documentos
documents = [
    {
        "text": "El producto X cuesta $100 y tiene garantía de 2 años.",
        "metadata": {"category": "productos", "product": "X"}
    },
    {
        "text": "El horario de atención es Lunes a Viernes de 9am a 6pm.",
        "metadata": {"category": "info", "topic": "horario"}
    },
    {
        "text": "Para devoluciones, contactar a soporte@empresa.com dentro de 30 días.",
        "metadata": {"category": "politicas", "topic": "devoluciones"}
    }
]

for i, doc in enumerate(documents):
    index_document(doc["text"], doc["metadata"], f"doc_{i}")

print("Documentos indexados!")
```

### Query RAG

```python
def query_rag(question: str, top_k: int = 3):
    """Query RAG system"""
    
    # 1. Generar embedding de la pregunta
    response = openai_client.embeddings.create(
        model="text-embedding-3-small",
        input=question
    )
    query_embedding = response.data[0].embedding
    
    # 2. Buscar documentos similares
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k
    )
    
    # 3. Construir contexto
    contexts = results['documents'][0]
    context_text = "\n\n".join([
        f"[Documento {i+1}]: {doc}"
        for i, doc in enumerate(contexts)
    ])
    
    # 4. Llamar LLM con contexto
    messages = [
        {
            "role": "system",
            "content": "Responde basándote SOLO en el contexto proporcionado. Si no encuentras la respuesta, di 'No tengo esa información'."
        },
        {
            "role": "user",
            "content": f"Contexto:\n{context_text}\n\nPregunta: {question}"
        }
    ]
    
    llm_response = openai_client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages,
        temperature=0  # Más determinístico
    )
    
    answer = llm_response.choices[0].message.content
    
    return {
        "answer": answer,
        "sources": contexts,
        "metadatas": results['metadatas'][0]
    }

# Uso
result = query_rag("¿Cuánto cuesta el producto X?")
print(f"Respuesta: {result['answer']}")
print(f"\nFuentes: {result['sources']}")
```

## 📄 RAG con PDFs

```bash
pip install pypdf2
```

```python
from PyPDF2 import PdfReader
import re

def extract_text_from_pdf(pdf_path: str) -> list[dict]:
    """Extraer y chunkear PDF"""
    reader = PdfReader(pdf_path)
    chunks = []
    
    for page_num, page in enumerate(reader.pages):
        text = page.extract_text()
        
        # Chunk por párrafos (simple)
        paragraphs = text.split('\n\n')
        
        for para in paragraphs:
            if len(para.strip()) > 50:  # Ignorar chunks muy cortos
                chunks.append({
                    "text": para.strip(),
                    "metadata": {
                        "source": pdf_path,
                        "page": page_num + 1
                    }
                })
    
    return chunks

def index_pdf(pdf_path: str):
    """Indexar un PDF completo"""
    chunks = extract_text_from_pdf(pdf_path)
    
    for i, chunk in enumerate(chunks):
        index_document(
            chunk["text"],
            chunk["metadata"],
            f"{pdf_path}_chunk_{i}"
        )
    
    print(f"Indexados {len(chunks)} chunks de {pdf_path}")

# Uso
index_pdf("manual_producto.pdf")
```

## 🎯 Chunking Strategies

```python
def smart_chunk_text(text: str, chunk_size: int = 500, overlap: int = 50):
    """Chunking con overlap para mantener contexto"""
    chunks = []
    start = 0
    
    while start < len(text):
        end = start + chunk_size
        
        # Buscar fin de oración
        if end < len(text):
            # Buscar último punto en el chunk
            last_period = text.rfind('.', start, end)
            if last_period != -1:
                end = last_period + 1
        
        chunk = text[start:end].strip()
        if chunk:
            chunks.append(chunk)
        
        start = end - overlap  # Overlap
    
    return chunks

# Ejemplo
text = """Python es un lenguaje de programación. Es muy popular.
Se usa para IA y web. Fue creado por Guido van Rossum."""

chunks = smart_chunk_text(text, chunk_size=50, overlap=10)
for i, chunk in enumerate(chunks):
    print(f"Chunk {i+1}: {chunk}")
```

## 🚀 RAG con Pinecone (Producción)

```bash
pip install pinecone-client
```

```python
from pinecone import Pinecone, ServerlessSpec

# Inicializar Pinecone
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

# Crear índice (solo primera vez)
if "documentos" not in pc.list_indexes().names():
    pc.create_index(
        name="documentos",
        dimension=1536,  # text-embedding-3-small
        metric="cosine",
        spec=ServerlessSpec(
            cloud="aws",
            region="us-east-1"
        )
    )

index = pc.Index("documentos")

def index_to_pinecone(text: str, metadata: dict, doc_id: str):
    """Indexar en Pinecone"""
    # Generar embedding
    response = openai_client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    embedding = response.data[0].embedding
    
    # Upsert a Pinecone
    index.upsert(vectors=[{
        "id": doc_id,
        "values": embedding,
        "metadata": {"text": text, **metadata}
    }])

def query_pinecone(question: str, top_k: int = 3):
    """Query Pinecone"""
    # Embedding de pregunta
    response = openai_client.embeddings.create(
        model="text-embedding-3-small",
        input=question
    )
    query_embedding = response.data[0].embedding
    
    # Query Pinecone
    results = index.query(
        vector=query_embedding,
        top_k=top_k,
        include_metadata=True
    )
    
    # Construir contexto
    contexts = [match['metadata']['text'] for match in results['matches']]
    context_text = "\n\n".join(contexts)
    
    # LLM
    messages = [
        {"role": "system", "content": "Responde basándote en el contexto."},
        {"role": "user", "content": f"Contexto:\n{context_text}\n\nPregunta: {question}"}
    ]
    
    llm_response = openai_client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages
    )
    
    return llm_response.choices[0].message.content
```

## 💡 Ejemplo: RAG System Completo

```python
from dataclasses import dataclass
from typing import List

@dataclass
class Document:
    text: str
    metadata: dict
    id: str

class RAGSystem:
    def __init__(self, collection_name: str = "documents"):
        self.openai_client = OpenAI()
        self.chroma_client = chromadb.Client()
        self.collection = self.chroma_client.get_or_create_collection(
            name=collection_name
        )
    
    def add_document(self, doc: Document):
        """Agregar documento"""
        embedding = self._get_embedding(doc.text)
        
        self.collection.add(
            documents=[doc.text],
            embeddings=[embedding],
            metadatas=[doc.metadata],
            ids=[doc.id]
        )
    
    def add_documents(self, docs: List[Document]):
        """Batch add"""
        texts = [doc.text for doc in docs]
        embeddings = [self._get_embedding(text) for text in texts]
        
        self.collection.add(
            documents=texts,
            embeddings=embeddings,
            metadatas=[doc.metadata for doc in docs],
            ids=[doc.id for doc in docs]
        )
    
    def query(self, question: str, top_k: int = 3, temperature: float = 0):
        """Query con RAG"""
        # Buscar documentos relevantes
        query_embedding = self._get_embedding(question)
        
        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k
        )
        
        if not results['documents'][0]:
            return "No encontré información relevante."
        
        # Construir prompt
        contexts = results['documents'][0]
        context_text = "\n\n".join([
            f"Fuente {i+1}:\n{doc}"
            for i, doc in enumerate(contexts)
        ])
        
        # LLM
        messages = [
            {
                "role": "system",
                "content": (
                    "Eres un asistente que responde preguntas basándose en el contexto dado. "
                    "Si no encuentras la respuesta en el contexto, di 'No tengo esa información'. "
                    "Cita las fuentes cuando sea posible."
                )
            },
            {
                "role": "user",
                "content": f"Contexto:\n{context_text}\n\nPregunta: {question}"
            }
        ]
        
        response = self.openai_client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            temperature=temperature
        )
        
        return {
            "answer": response.choices[0].message.content,
            "sources": contexts,
            "metadatas": results['metadatas'][0]
        }
    
    def _get_embedding(self, text: str) -> List[float]:
        """Generar embedding"""
        response = self.openai_client.embeddings.create(
            model="text-embedding-3-small",
            input=text
        )
        return response.data[0].embedding
    
    def delete_all(self):
        """Limpiar colección"""
        self.chroma_client.delete_collection(self.collection.name)

# Uso
rag = RAGSystem("knowledge_base")

# Agregar documentos
docs = [
    Document("Python es interpretado", {"topic": "python"}, "doc1"),
    Document("FastAPI es async", {"topic": "fastapi"}, "doc2"),
]
rag.add_documents(docs)

# Query
result = rag.query("¿Qué es Python?")
print(result['answer'])
```

## 💪 Best Practices

```python
# 1. Hybrid Search (keyword + semantic)
def hybrid_search(query: str, collection, top_k: int = 5):
    # Semantic search
    semantic_results = collection.query(
        query_embeddings=[get_embedding(query)],
        n_results=top_k
    )
    
    # Keyword search (simple)
    all_docs = collection.get()
    keyword_results = [
        doc for doc in all_docs['documents']
        if any(word.lower() in doc.lower() for word in query.split())
    ]
    
    # Combine and deduplicate
    combined = semantic_results['documents'][0] + keyword_results
    return list(dict.fromkeys(combined))[:top_k]

# 2. Reranking
from sentence_transformers import CrossEncoder

reranker = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')

def rerank_results(query: str, documents: list) -> list:
    """Rerank results por relevancia"""
    pairs = [[query, doc] for doc in documents]
    scores = reranker.predict(pairs)
    
    # Sort por score
    ranked = sorted(zip(documents, scores), key=lambda x: x[1], reverse=True)
    return [doc for doc, _ in ranked]

# 3. Metadata Filtering
results = collection.query(
    query_embeddings=[embedding],
    where={"category": "productos"},  # Filter
    n_results=5
)
```

## 🔗 Temas Relacionados

- [LLMs y OpenAI](./llms-openai) - Base de RAG
- [LangChain](./langchain) - RAG con LangChain
- [FastAPI](./fastapi) - API para RAG

## 📚 Recursos

- [ChromaDB Docs](https://docs.trychroma.com/)
- [Pinecone Docs](https://docs.pinecone.io/)
- [RAG Papers](https://arxiv.org/abs/2005.11401)

---

> 💡 **Tip**: ChromaDB para desarrollo local. Pinecone/Weaviate para producción con millones de documentos.
