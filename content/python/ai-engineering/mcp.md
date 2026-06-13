---
title: "MCP - Model Context Protocol"
level: ai-engineering
category: agents
tags: [python, mcp, claude, tools, context-protocol]
duration: 60min
prerequisites: [fastapi, langchain]
---

# MCP - Model Context Protocol

## 🎯 ¿Qué es MCP?

**Model Context Protocol** (Anthropic):
- Protocolo estándar para **herramientas de LLM**
- Conectar Claude (y otros LLMs) con **cualquier sistema**
- Servidores MCP = backends que exponen tools
- Clientes MCP = apps que usan esos tools

```
Claude Desktop ←→ MCP Server ←→ Your Database/API/Files
```

## 📦 Installation

```bash
pip install mcp
```

## 🚀 Tu Primer MCP Server

```python
# server.py
from mcp.server import Server, Tool
from mcp.types import TextContent
import mcp.server.stdio
import json

# Crear servidor
server = Server("mi-server")

# Definir tools
@server.list_tools()
async def list_tools() -> list[Tool]:
    """Lista de tools disponibles"""
    return [
        Tool(
            name="calculate",
            description="Evalúa expresiones matemáticas",
            inputSchema={
                "type": "object",
                "properties": {
                    "expression": {
                        "type": "string",
                        "description": "Expresión matemática (ej: '2+2')"
                    }
                },
                "required": ["expression"]
            }
        ),
        Tool(
            name="get_weather",
            description="Obtiene el clima de una ciudad",
            inputSchema={
                "type": "object",
                "properties": {
                    "city": {"type": "string"}
                },
                "required": ["city"]
            }
        )
    ]

@server.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    """Ejecutar tool"""
    
    if name == "calculate":
        expression = arguments["expression"]
        try:
            result = eval(expression)
            return [TextContent(
                type="text",
                text=f"Resultado: {result}"
            )]
        except Exception as e:
            return [TextContent(
                type="text",
                text=f"Error: {e}"
            )]
    
    elif name == "get_weather":
        city = arguments["city"]
        # Simular API call
        return [TextContent(
            type="text",
            text=f"El clima en {city} es soleado, 22°C"
        )]
    
    else:
        return [TextContent(
            type="text",
            text=f"Tool desconocido: {name}"
        )]

# Correr servidor
if __name__ == "__main__":
    mcp.server.stdio.run(server)
```

## ⚙️ Configurar en Claude Desktop

```json
// ~/Library/Application Support/Claude/claude_desktop_config.json (Mac)
// %APPDATA%\Claude\claude_desktop_config.json (Windows)

{
  "mcpServers": {
    "mi-server": {
      "command": "python",
      "args": ["C:/path/to/server.py"]
    }
  }
}
```

Reinicia Claude Desktop. Ahora Claude puede usar tus tools.

## 💡 Ejemplo: File System MCP Server

```python
# filesystem_server.py
from mcp.server import Server, Tool
from mcp.types import TextContent
import mcp.server.stdio
import os

server = Server("filesystem")

@server.list_tools()
async def list_tools():
    return [
        Tool(
            name="read_file",
            description="Lee el contenido de un archivo",
            inputSchema={
                "type": "object",
                "properties": {
                    "path": {"type": "string", "description": "Ruta del archivo"}
                },
                "required": ["path"]
            }
        ),
        Tool(
            name="list_directory",
            description="Lista archivos en un directorio",
            inputSchema={
                "type": "object",
                "properties": {
                    "path": {"type": "string", "description": "Ruta del directorio"}
                },
                "required": ["path"]
            }
        ),
        Tool(
            name="write_file",
            description="Escribe contenido a un archivo",
            inputSchema={
                "type": "object",
                "properties": {
                    "path": {"type": "string"},
                    "content": {"type": "string"}
                },
                "required": ["path", "content"]
            }
        )
    ]

@server.call_tool()
async def call_tool(name: str, arguments: dict):
    if name == "read_file":
        path = arguments["path"]
        try:
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            return [TextContent(type="text", text=content)]
        except Exception as e:
            return [TextContent(type="text", text=f"Error: {e}")]
    
    elif name == "list_directory":
        path = arguments["path"]
        try:
            files = os.listdir(path)
            result = "\n".join(files)
            return [TextContent(type="text", text=result)]
        except Exception as e:
            return [TextContent(type="text", text=f"Error: {e}")]
    
    elif name == "write_file":
        path = arguments["path"]
        content = arguments["content"]
        try:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
            return [TextContent(type="text", text=f"Archivo guardado: {path}")]
        except Exception as e:
            return [TextContent(type="text", text=f"Error: {e}")]

if __name__ == "__main__":
    mcp.server.stdio.run(server)
```

## 🗄️ MCP Server con Database

```python
# database_server.py
from mcp.server import Server, Tool
from mcp.types import TextContent
import mcp.server.stdio
import sqlite3
import json

server = Server("database")

DB_PATH = "app.db"

# Inicializar DB
conn = sqlite3.connect(DB_PATH)
conn.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        name TEXT,
        email TEXT
    )
''')
conn.close()

@server.list_tools()
async def list_tools():
    return [
        Tool(
            name="query_users",
            description="Query users table",
            inputSchema={
                "type": "object",
                "properties": {
                    "filter": {"type": "string", "description": "WHERE clause (opcional)"}
                }
            }
        ),
        Tool(
            name="add_user",
            description="Agregar nuevo usuario",
            inputSchema={
                "type": "object",
                "properties": {
                    "name": {"type": "string"},
                    "email": {"type": "string"}
                },
                "required": ["name", "email"]
            }
        )
    ]

@server.call_tool()
async def call_tool(name: str, arguments: dict):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    try:
        if name == "query_users":
            where_clause = arguments.get("filter", "")
            query = f"SELECT * FROM users"
            if where_clause:
                query += f" WHERE {where_clause}"
            
            cursor.execute(query)
            rows = cursor.fetchall()
            
            result = json.dumps(rows, indent=2)
            return [TextContent(type="text", text=result)]
        
        elif name == "add_user":
            name_val = arguments["name"]
            email_val = arguments["email"]
            
            cursor.execute(
                "INSERT INTO users (name, email) VALUES (?, ?)",
                (name_val, email_val)
            )
            conn.commit()
            
            return [TextContent(type="text", text=f"Usuario agregado: {name_val}")]
    
    except Exception as e:
        return [TextContent(type="text", text=f"Error: {e}")]
    
    finally:
        conn.close()

if __name__ == "__main__":
    mcp.server.stdio.run(server)
```

## 🌐 MCP Server con API Integration

```python
# api_server.py
from mcp.server import Server, Tool
from mcp.types import TextContent
import mcp.server.stdio
import requests
import os

server = Server("api-integration")

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

@server.list_tools()
async def list_tools():
    return [
        Tool(
            name="github_get_repo",
            description="Get GitHub repository info",
            inputSchema={
                "type": "object",
                "properties": {
                    "owner": {"type": "string"},
                    "repo": {"type": "string"}
                },
                "required": ["owner", "repo"]
            }
        ),
        Tool(
            name="github_create_issue",
            description="Create GitHub issue",
            inputSchema={
                "type": "object",
                "properties": {
                    "owner": {"type": "string"},
                    "repo": {"type": "string"},
                    "title": {"type": "string"},
                    "body": {"type": "string"}
                },
                "required": ["owner", "repo", "title"]
            }
        )
    ]

@server.call_tool()
async def call_tool(name: str, arguments: dict):
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json"
    }
    
    if name == "github_get_repo":
        owner = arguments["owner"]
        repo = arguments["repo"]
        
        url = f"https://api.github.com/repos/{owner}/{repo}"
        response = requests.get(url, headers=headers)
        
        if response.status_code == 200:
            data = response.json()
            result = f"Repo: {data['full_name']}\n"
            result += f"Stars: {data['stargazers_count']}\n"
            result += f"Description: {data['description']}"
            return [TextContent(type="text", text=result)]
        else:
            return [TextContent(type="text", text=f"Error: {response.status_code}")]
    
    elif name == "github_create_issue":
        owner = arguments["owner"]
        repo = arguments["repo"]
        title = arguments["title"]
        body = arguments.get("body", "")
        
        url = f"https://api.github.com/repos/{owner}/{repo}/issues"
        payload = {"title": title, "body": body}
        
        response = requests.post(url, headers=headers, json=payload)
        
        if response.status_code == 201:
            data = response.json()
            return [TextContent(type="text", text=f"Issue creado: {data['html_url']}")]
        else:
            return [TextContent(type="text", text=f"Error: {response.status_code}")]

if __name__ == "__main__":
    mcp.server.stdio.run(server)
```

## 🎨 MCP Client (Usar desde Python)

```python
# client.py
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
import asyncio

async def use_mcp_server():
    # Conectar a MCP server
    server_params = StdioServerParameters(
        command="python",
        args=["server.py"]
    )
    
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            # Inicializar
            await session.initialize()
            
            # Listar tools
            tools = await session.list_tools()
            print("Tools disponibles:")
            for tool in tools:
                print(f"  - {tool.name}: {tool.description}")
            
            # Llamar tool
            result = await session.call_tool(
                "calculate",
                {"expression": "10 * 5 + 3"}
            )
            
            print(f"\nResultado: {result.content[0].text}")

# Ejecutar
asyncio.run(use_mcp_server())
```

## 💡 Ejemplo: RAG MCP Server

```python
# rag_server.py
from mcp.server import Server, Tool
from mcp.types import TextContent
import mcp.server.stdio
from openai import OpenAI
import chromadb

server = Server("rag-system")

# Setup
openai_client = OpenAI()
chroma_client = chromadb.Client()
collection = chroma_client.get_or_create_collection("docs")

@server.list_tools()
async def list_tools():
    return [
        Tool(
            name="index_document",
            description="Indexa un documento en el RAG system",
            inputSchema={
                "type": "object",
                "properties": {
                    "text": {"type": "string"},
                    "metadata": {"type": "object"}
                },
                "required": ["text"]
            }
        ),
        Tool(
            name="query_rag",
            description="Query RAG system",
            inputSchema={
                "type": "object",
                "properties": {
                    "question": {"type": "string"}
                },
                "required": ["question"]
            }
        )
    ]

@server.call_tool()
async def call_tool(name: str, arguments: dict):
    if name == "index_document":
        text = arguments["text"]
        metadata = arguments.get("metadata", {})
        
        # Generate embedding
        response = openai_client.embeddings.create(
            model="text-embedding-3-small",
            input=text
        )
        embedding = response.data[0].embedding
        
        # Add to ChromaDB
        collection.add(
            documents=[text],
            embeddings=[embedding],
            metadatas=[metadata],
            ids=[str(hash(text))]
        )
        
        return [TextContent(type="text", text="Documento indexado")]
    
    elif name == "query_rag":
        question = arguments["question"]
        
        # Get embedding
        response = openai_client.embeddings.create(
            model="text-embedding-3-small",
            input=question
        )
        query_embedding = response.data[0].embedding
        
        # Search
        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=3
        )
        
        contexts = results['documents'][0]
        context_text = "\n\n".join(contexts)
        
        # LLM
        llm_response = openai_client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Responde basándote en el contexto."},
                {"role": "user", "content": f"Contexto:\n{context_text}\n\nPregunta: {question}"}
            ]
        )
        
        answer = llm_response.choices[0].message.content
        return [TextContent(type="text", text=answer)]

if __name__ == "__main__":
    mcp.server.stdio.run(server)
```

## 💪 Best Practices

```python
# 1. Error handling robusto
@server.call_tool()
async def call_tool(name: str, arguments: dict):
    try:
        # Tu lógica
        pass
    except Exception as e:
        return [TextContent(
            type="text",
            text=f"Error: {str(e)}"
        )]

# 2. Logging
import logging
logging.basicConfig(level=logging.INFO)

@server.call_tool()
async def call_tool(name: str, arguments: dict):
    logging.info(f"Tool called: {name} with {arguments}")
    # ...

# 3. Validación de inputs
def validate_path(path: str) -> bool:
    """Valida que path sea seguro"""
    # No permitir ../ (directory traversal)
    if ".." in path:
        return False
    return True

# 4. Rate limiting
from functools import lru_cache
import time

call_times = []

def rate_limit(max_calls_per_minute: int = 60):
    global call_times
    now = time.time()
    call_times = [t for t in call_times if now - t < 60]
    
    if len(call_times) >= max_calls_per_minute:
        raise Exception("Rate limit exceeded")
    
    call_times.append(now)
```

## 🔗 Temas Relacionados

- [LangGraph](./langgraph) - Orquestación de agentes
- [FastAPI](./fastapi) - APIs REST
- [RAG Systems](./rag-systems) - RAG con MCP

## 📚 Recursos

- [MCP Documentation](https://modelcontextprotocol.io/)
- [MCP Python SDK](https://github.com/modelcontextprotocol/python-sdk)
- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers)

---

> 💡 **Tip**: MCP permite que Claude (y otros) accedan a CUALQUIER sistema. Es el futuro de la integración de agentes.
