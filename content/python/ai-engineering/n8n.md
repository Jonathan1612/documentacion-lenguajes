---
title: "n8n - Workflow Automation"
level: ai-engineering
category: automation
tags: [n8n, automation, workflows, no-code, integration]
duration: 60min
prerequisites: [apis-rest, fastapi]
---

# n8n - Workflow Automation

## 🎯 ¿Qué es n8n?

**Plataforma de automatización** (open-source):
- Visual workflow builder (no-code/low-code)
- 400+ integraciones (APIs, DBs, LLMs)
- Self-hosted o cloud
- AI nodes nativos (OpenAI, Claude, etc.)
- Triggers, actions, webhooks

## 🚀 Installation

### Docker (Recomendado)

```bash
# docker-compose.yml
version: '3.8'

services:
  n8n:
    image: n8nio/n8n
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=admin123
      - WEBHOOK_URL=http://localhost:5678/
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    volumes:
      - n8n_data:/home/node/.n8n

volumes:
  n8n_data:
```

```bash
docker-compose up -d
# Accede a http://localhost:5678
```

### npm

```bash
npm install n8n -g
n8n start
```

## 💡 Conceptos Básicos

### Workflow Structure

```
Trigger → Node 1 → Node 2 → Node 3 → Output
```

**Trigger**: Inicia el workflow
- Manual trigger
- Webhook
- Schedule (cron)
- Email received
- New row in DB

**Nodes**: Operaciones
- HTTP Request
- OpenAI
- Database
- Email
- If/Switch
- Code (JavaScript/Python)

## 🎯 Ejemplo 1: Email → AI → CRM

**Workflow**: Cuando llega un email, analizarlo con IA y crear lead en CRM

```yaml
Workflow:
  1. Email Trigger (Gmail)
     - Trigger on new email in "leads" folder
  
  2. OpenAI Node
     - Input: {{ $json.body }}
     - Prompt: "Extract name, email, company from this email"
     - Output: JSON
  
  3. If Node
     - Condition: Has valid email?
  
  4a. HTTP Request → CRM API
     - Method: POST
     - URL: https://crm.com/api/leads
     - Body: {{ $json }}
  
  4b. Send Email (rejection)
     - To: {{ $json.from }}
     - Subject: "Info incompleta"
```

## 🤖 Ejemplo 2: Chatbot con RAG

**API Webhook + OpenAI + ChromaDB**

```yaml
Workflow:
  1. Webhook Trigger
     - Method: POST
     - Path: /chat
     - Input: { "message": "..." }
  
  2. Code Node (Search ChromaDB)
     ```javascript
     const chromadb = require('chromadb');
     const client = new chromadb.Client();
     
     const collection = client.getCollection('docs');
     const results = await collection.query({
       queryTexts: [$json.message],
       nResults: 3
     });
     
     return {
       context: results.documents[0].join('\n\n'),
       question: $json.message
     };
     ```
  
  3. OpenAI Chat Node
     - Model: gpt-3.5-turbo
     - System: "Responde basándote en el contexto"
     - User: "Context: {{ $json.context }}\n\nQuestion: {{ $json.question }}"
  
  4. Respond to Webhook
     - Body: { "response": "{{ $json.choices[0].message.content }}" }
```

## 📊 Ejemplo 3: Document Processing Pipeline

```yaml
Workflow: PDF Upload → Extract Text → Embed → Store
  
  1. Webhook Trigger
     - Receives PDF file upload
  
  2. Code Node (Extract PDF Text)
     ```python
     import PyPDF2
     import io
     
     pdf_file = io.BytesIO($binary.data)
     reader = PyPDF2.PdfReader(pdf_file)
     
     text = ""
     for page in reader.pages:
         text += page.extract_text()
     
     return {"text": text, "filename": $json.filename}
     ```
  
  3. Code Node (Chunk Text)
     ```javascript
     const text = $json.text;
     const chunkSize = 500;
     const overlap = 50;
     
     const chunks = [];
     for (let i = 0; i < text.length; i += chunkSize - overlap) {
       chunks.push(text.slice(i, i + chunkSize));
     }
     
     return { chunks, filename: $json.filename };
     ```
  
  4. Loop Node
     - Iterate over chunks
  
  5. OpenAI Embeddings Node
     - Model: text-embedding-3-small
     - Input: {{ $json.chunk }}
  
  6. HTTP Request → Vector DB
     - POST to Pinecone/Weaviate
     - Body: { embedding, metadata: { filename, chunk_index } }
  
  7. Send Notification
     - Slack/Email: "Documento {{ $json.filename }} procesado"
```

## 🔄 Ejemplo 4: Multi-Agent System

```yaml
Workflow: Research → Write → Review → Publish
  
  1. Manual Trigger
     - Input: Topic
  
  2. OpenAI Node (Researcher)
     - System: "Eres un investigador experto"
     - User: "Investiga sobre: {{ $json.topic }}"
     - Output: research
  
  3. OpenAI Node (Writer)
     - System: "Eres un escritor técnico"
     - User: "Escribe artículo basado en:\n{{ $('OpenAI Researcher').json.choices[0].message.content }}"
     - Output: article
  
  4. OpenAI Node (Reviewer)
     - System: "Eres un editor crítico"
     - User: "Revisa:\n{{ $('OpenAI Writer').json.choices[0].message.content }}"
     - Output: feedback
  
  5. If Node
     - {{ $json.choices[0].message.content.includes('APPROVED') }}
  
  6a. HTTP Request → WordPress API
     - Publish article
  
  6b. Loop back to Writer
     - With feedback for revision
```

## 🎨 Custom Code Nodes

### JavaScript Example

```javascript
// Code Node
const items = $input.all();

const results = items.map(item => {
  const score = calculateScore(item.json);
  return {
    json: {
      ...item.json,
      score,
      category: score > 0.8 ? 'high' : 'low'
    }
  };
});

function calculateScore(data) {
  // Tu lógica
  return Math.random();
}

return results;
```

### Python Example (con n8n-python-node)

```python
# Python Code Node
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer

items = $input.all()

texts = [item['json']['text'] for item in items]

vectorizer = TfidfVectorizer(max_features=10)
vectors = vectorizer.fit_transform(texts)

results = []
for i, item in enumerate(items):
    results.append({
        'json': {
            **item['json'],
            'tfidf_vector': vectors[i].toarray()[0].tolist()
        }
    })

return results
```

## 🔌 Integrar con tu FastAPI

### n8n → FastAPI

```yaml
# En n8n: HTTP Request Node
HTTP Request:
  Method: POST
  URL: http://localhost:8000/api/process
  Headers:
    Content-Type: application/json
    Authorization: Bearer {{ $env.API_TOKEN }}
  Body:
    {
      "data": "{{ $json }}",
      "workflow_id": "{{ $workflow.id }}"
    }
```

### FastAPI → n8n Webhook

```python
# FastAPI
from fastapi import FastAPI
import httpx

app = FastAPI()

N8N_WEBHOOK_URL = "http://localhost:5678/webhook/my-workflow"

@app.post("/trigger-workflow")
async def trigger_workflow(data: dict):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            N8N_WEBHOOK_URL,
            json=data
        )
    return {"status": "triggered", "response": response.json()}
```

## 📅 Scheduling

```yaml
Schedule Trigger:
  Mode: Every X
  Value: 1
  Unit: Hours
  
  → Run workflow every hour
```

```yaml
Cron Expression:
  Expression: "0 9 * * 1-5"
  → Every weekday at 9 AM
```

## 🎯 Error Handling

```yaml
Workflow with Error Handling:
  
  1. Try Node
     - Your risky operation
  
  2. On Error → Error Handler
     - Log to database
     - Send alert to Slack
     - Retry with backoff
  
  3. If Node (Check retry count)
     - If < 3: Loop back
     - Else: Send to dead letter queue
```

## 💾 Database Integrations

```yaml
PostgreSQL Node:
  Operation: Insert
  Table: leads
  Columns:
    - name: {{ $json.name }}
    - email: {{ $json.email }}
    - created_at: {{ $now }}

MongoDB Node:
  Operation: Find
  Collection: users
  Query: { "status": "active" }
  
MySQL Node:
  Operation: Execute Query
  Query: |
    SELECT * FROM orders 
    WHERE created_at > DATE_SUB(NOW(), INTERVAL 1 DAY)
```

## 🔐 Credentials Management

```javascript
// Usar credentials en Code Node
const apiKey = $credentials.openaiApi.apiKey;
const dbPassword = $credentials.postgres.password;

// En HTTP Request Node
// n8n maneja automáticamente con "Credential Name"
```

## 💡 Production Tips

```yaml
Best Practices:
  
  1. Use Error Workflows
     - Global error handler
     - Log all errors to monitoring
  
  2. Implement Retry Logic
     - Max 3 retries
     - Exponential backoff
  
  3. Monitor Execution
     - Execution logs
     - Success/failure metrics
  
  4. Use Queue Mode
     - For high-volume workflows
     - Redis-backed queue
  
  5. Environment Variables
     - Don't hardcode secrets
     - Use $env.VAR_NAME
```

## 🚀 Deployment

### Self-Hosted (Railway/Render)

```bash
# railway.json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "n8n start",
    "healthcheckPath": "/healthz"
  }
}
```

### docker-compose Production

```yaml
version: '3.8'

services:
  n8n:
    image: n8nio/n8n
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_PROTOCOL=https
      - N8N_HOST=n8n.tudominio.com
      - N8N_PORT=5678
      - WEBHOOK_URL=https://n8n.tudominio.com/
      - EXECUTIONS_MODE=queue
      - QUEUE_BULL_REDIS_HOST=redis
    volumes:
      - n8n_data:/home/node/.n8n
    depends_on:
      - redis
  
  redis:
    image: redis:7-alpine
    restart: always
    volumes:
      - redis_data:/data

volumes:
  n8n_data:
  redis_data:
```

## 🔗 Temas Relacionados

- [FastAPI](./fastapi) - Integración con APIs
- [LLMs y OpenAI](./llms-openai) - AI Nodes
- [Deployment](./deployment) - Producción

## 📚 Recursos

- [n8n Documentation](https://docs.n8n.io/)
- [n8n Community Workflows](https://n8n.io/workflows/)
- [n8n Forum](https://community.n8n.io/)

---

> 💡 **Tip**: n8n es perfecto para automatizar tareas repetitivas con IA. Empieza con workflows simples y escala.
