---
title: "APIs REST con Python"
level: ai-engineering
category: integration
tags: [python, apis, rest, requests, httpx, authentication]
duration: 45min
prerequisites: [funciones, excepciones, clases]
---

# APIs REST con Python

## 🎯 ¿Por qué APIs en AI Engineering?

Los agentes necesitan **conectar con el mundo**:
- Llamar a LLMs (OpenAI, Anthropic)
- Integrar servicios externos (CRMs, emails, etc.)
- Webhooks para automatizaciones
- Datos en tiempo real

## 📦 requests - La Librería Estándar

```bash
pip install requests
```

### GET Request Básico

```python
import requests

# GET simple
response = requests.get('https://api.github.com/users/octocat')

# Check status
print(response.status_code)  # 200

# Parse JSON
data = response.json()
print(data['name'])  # The Octocat
print(data['public_repos'])

# Access headers
print(response.headers['content-type'])
```

### POST Request con Datos

```python
# POST con JSON
payload = {
    'title': 'Nuevo ticket',
    'description': 'Problema con API',
    'priority': 'high'
}

response = requests.post(
    'https://api.example.com/tickets',
    json=payload,
    headers={'Authorization': 'Bearer YOUR_TOKEN'}
)

if response.status_code == 201:
    print("Ticket creado:", response.json()['id'])
else:
    print(f"Error: {response.status_code}")
    print(response.text)
```

## 🔐 Autenticación

### API Keys

```python
import os

API_KEY = os.getenv('API_KEY')

headers = {
    'Authorization': f'Bearer {API_KEY}',
    'Content-Type': 'application/json'
}

response = requests.get(
    'https://api.example.com/data',
    headers=headers
)
```

### OAuth 2.0

```python
from requests_oauthlib import OAuth2Session

client_id = 'YOUR_CLIENT_ID'
client_secret = 'YOUR_CLIENT_SECRET'
redirect_uri = 'http://localhost:8000/callback'

oauth = OAuth2Session(client_id, redirect_uri=redirect_uri)

# Authorization URL
authorization_url, state = oauth.authorization_url(
    'https://provider.com/oauth/authorize'
)
print(f'Please visit: {authorization_url}')

# After callback, get token
token = oauth.fetch_token(
    'https://provider.com/oauth/token',
    authorization_response=callback_url,
    client_secret=client_secret
)

# Use token
response = oauth.get('https://api.provider.com/user')
```

## ⚡ httpx - Async HTTP Client

```bash
pip install httpx
```

### Sync y Async

```python
import httpx

# Sync
response = httpx.get('https://api.example.com/data')
print(response.json())

# Async
import asyncio

async def fetch_data():
    async with httpx.AsyncClient() as client:
        response = await client.get('https://api.example.com/data')
        return response.json()

data = asyncio.run(fetch_data())
```

### Parallel Requests

```python
import httpx
import asyncio

async def fetch_multiple():
    urls = [
        'https://api.example.com/users/1',
        'https://api.example.com/users/2',
        'https://api.example.com/users/3',
    ]
    
    async with httpx.AsyncClient() as client:
        tasks = [client.get(url) for url in urls]
        responses = await asyncio.gather(*tasks)
        
        return [r.json() for r in responses]

results = asyncio.run(fetch_multiple())
```

## 💡 Ejemplo: OpenAI Client

```python
import os
import requests

class OpenAIClient:
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.getenv('OPENAI_API_KEY')
        self.base_url = 'https://api.openai.com/v1'
        self.headers = {
            'Authorization': f'Bearer {self.api_key}',
            'Content-Type': 'application/json'
        }
    
    def chat_completion(self, messages: list, model: str = 'gpt-3.5-turbo'):
        """Llamada a Chat Completions API"""
        payload = {
            'model': model,
            'messages': messages
        }
        
        response = requests.post(
            f'{self.base_url}/chat/completions',
            headers=self.headers,
            json=payload,
            timeout=30
        )
        
        response.raise_for_status()
        return response.json()
    
    def create_embedding(self, text: str):
        """Generar embedding"""
        payload = {
            'model': 'text-embedding-3-small',
            'input': text
        }
        
        response = requests.post(
            f'{self.base_url}/embeddings',
            headers=self.headers,
            json=payload
        )
        
        response.raise_for_status()
        data = response.json()
        return data['data'][0]['embedding']

# Uso
client = OpenAIClient()

messages = [
    {"role": "user", "content": "¿Qué es Python?"}
]

result = client.chat_completion(messages)
print(result['choices'][0]['message']['content'])
```

## 🎯 Error Handling

```python
import requests
from requests.exceptions import RequestException, Timeout, HTTPError

def safe_api_call(url: str, max_retries: int = 3):
    """API call con retry logic"""
    for attempt in range(max_retries):
        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()  # Raise para 4xx/5xx
            return response.json()
            
        except Timeout:
            print(f"Timeout (intento {attempt + 1}/{max_retries})")
            if attempt == max_retries - 1:
                raise
                
        except HTTPError as e:
            if e.response.status_code == 429:  # Rate limit
                wait_time = int(e.response.headers.get('Retry-After', 5))
                print(f"Rate limited. Esperando {wait_time}s...")
                time.sleep(wait_time)
            else:
                raise
                
        except RequestException as e:
            print(f"Error: {e}")
            raise

# Uso
try:
    data = safe_api_call('https://api.example.com/data')
    print(data)
except RequestException as e:
    print(f"Failed después de retries: {e}")
```

## ⏱️ Rate Limiting

```python
import time
from datetime import datetime, timedelta

class RateLimiter:
    def __init__(self, calls_per_minute: int = 60):
        self.calls_per_minute = calls_per_minute
        self.calls = []
    
    def wait_if_needed(self):
        """Espera si excede rate limit"""
        now = datetime.now()
        # Eliminar calls de hace más de 1 minuto
        self.calls = [c for c in self.calls if now - c < timedelta(minutes=1)]
        
        if len(self.calls) >= self.calls_per_minute:
            oldest_call = min(self.calls)
            wait_until = oldest_call + timedelta(minutes=1)
            wait_seconds = (wait_until - now).total_seconds()
            
            if wait_seconds > 0:
                print(f"Rate limit alcanzado. Esperando {wait_seconds:.1f}s...")
                time.sleep(wait_seconds)
        
        self.calls.append(now)

# Uso
limiter = RateLimiter(calls_per_minute=10)

for i in range(20):
    limiter.wait_if_needed()
    response = requests.get('https://api.example.com/data')
    print(f"Request {i+1}: {response.status_code}")
```

## 📊 Streaming de Respuestas

```python
import requests

def stream_llm_response(prompt: str):
    """Stream de respuesta de LLM"""
    response = requests.post(
        'https://api.openai.com/v1/chat/completions',
        headers={'Authorization': f'Bearer {API_KEY}'},
        json={
            'model': 'gpt-3.5-turbo',
            'messages': [{'role': 'user', 'content': prompt}],
            'stream': True
        },
        stream=True
    )
    
    for line in response.iter_lines():
        if line:
            line = line.decode('utf-8')
            if line.startswith('data: '):
                data = line[6:]  # Remove 'data: '
                if data == '[DONE]':
                    break
                
                import json
                chunk = json.loads(data)
                content = chunk['choices'][0]['delta'].get('content', '')
                if content:
                    print(content, end='', flush=True)

stream_llm_response("Explica qué es un agente AI")
```

## 💪 Best Practices

```python
# 1. Usa variables de entorno para secrets
import os
API_KEY = os.getenv('API_KEY')
if not API_KEY:
    raise ValueError("API_KEY no configurada")

# 2. Timeout siempre
response = requests.get(url, timeout=10)  # 10 segundos

# 3. Session para múltiples requests
session = requests.Session()
session.headers.update({'Authorization': f'Bearer {API_KEY}'})

# Reutiliza la misma sesión
response1 = session.get('https://api.example.com/users')
response2 = session.get('https://api.example.com/posts')

# 4. Usa context managers con httpx
async with httpx.AsyncClient() as client:
    response = await client.get(url)

# 5. Log de requests para debugging
import logging
logging.basicConfig(level=logging.DEBUG)
```

## 🔗 Temas Relacionados

- [FastAPI](./fastapi) - Crear tus propias APIs
- [LLMs y OpenAI](./llms-openai) - Integración con LLMs
- [Async/Await](../avanzado/asyncio) - Requests asíncronos

## 📚 Recursos

- [requests Documentation](https://docs.python-requests.org/)
- [httpx Documentation](https://www.python-httpx.org/)
- [REST API Best Practices](https://restfulapi.net/)

---

> 💡 **Tip**: httpx es mejor que requests para apps async (FastAPI, agents modernos).
