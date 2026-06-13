---
title: "LLMs y OpenAI API"
level: ai-engineering
category: llm
tags: [python, llm, openai, gpt, claude, anthropic, prompts]
duration: 90min
prerequisites: [apis-rest, asyncio, type-hints]
---

# LLMs y OpenAI API

## 🎯 ¿Qué son los LLMs?

**Large Language Models** - Modelos de IA que entienden y generan texto:
- GPT-4 (OpenAI)
- Claude 3 (Anthropic)
- Gemini (Google)
- Llama 2 (Meta, open-source)

## 🚀 OpenAI SDK

```bash
pip install openai
```

### Chat Completions - La Base

```python
from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "Eres un asistente útil."},
        {"role": "user", "content": "¿Qué es Python?"}
    ]
)

print(response.choices[0].message.content)
print(f"Tokens usados: {response.usage.total_tokens}")
```

## 💬 Conversaciones con Memoria

```python
class ChatBot:
    def __init__(self, system_prompt: str = "Eres un asistente útil"):
        self.client = OpenAI()
        self.messages = [
            {"role": "system", "content": system_prompt}
        ]
    
    def chat(self, user_message: str) -> str:
        # Agregar mensaje del usuario
        self.messages.append({"role": "user", "content": user_message})
        
        # Llamar a OpenAI
        response = self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=self.messages
        )
        
        # Guardar respuesta del asistente
        assistant_message = response.choices[0].message.content
        self.messages.append({"role": "assistant", "content": assistant_message})
        
        return assistant_message
    
    def clear_history(self):
        """Limpiar historial (mantiene system prompt)"""
        system_msg = self.messages[0]
        self.messages = [system_msg]

# Uso
bot = ChatBot(system_prompt="Eres un experto en Python")

print(bot.chat("¿Qué es una lista?"))
# Respuesta sobre listas

print(bot.chat("Dame un ejemplo"))
# El LLM recuerda que hablamos de listas
```

## 🌊 Streaming de Respuestas

```python
def stream_chat(prompt: str):
    """Stream respuestas en tiempo real"""
    client = OpenAI()
    
    stream = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        stream=True
    )
    
    full_response = ""
    for chunk in stream:
        if chunk.choices[0].delta.content is not None:
            content = chunk.choices[0].delta.content
            print(content, end="", flush=True)
            full_response += content
    
    print()  # Newline al final
    return full_response

stream_chat("Explica qué es un API en 3 párrafos")
```

## 🛠️ Function Calling (Tools)

```python
import json

tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Obtiene el clima de una ciudad",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "description": "Nombre de la ciudad"
                    },
                    "unit": {
                        "type": "string",
                        "enum": ["celsius", "fahrenheit"]
                    }
                },
                "required": ["city"]
            }
        }
    }
]

def get_weather(city: str, unit: str = "celsius"):
    """Función real que obtiene clima (simulado)"""
    return {
        "city": city,
        "temperature": 22,
        "unit": unit,
        "condition": "sunny"
    }

# Llamada con function calling
response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": "¿Qué clima hace en Madrid?"}],
    tools=tools,
    tool_choice="auto"
)

message = response.choices[0].message

# Si el LLM quiere llamar una función
if message.tool_calls:
    tool_call = message.tool_calls[0]
    function_name = tool_call.function.name
    arguments = json.loads(tool_call.function.arguments)
    
    print(f"LLM quiere llamar: {function_name}({arguments})")
    
    # Ejecutar la función
    if function_name == "get_weather":
        result = get_weather(**arguments)
        
        # Enviar resultado al LLM
        messages = [
            {"role": "user", "content": "¿Qué clima hace en Madrid?"},
            message,
            {
                "role": "tool",
                "tool_call_id": tool_call.id,
                "content": json.dumps(result)
            }
        ]
        
        final_response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages
        )
        
        print(final_response.choices[0].message.content)
        # "En Madrid hace 22°C y está soleado"
```

## 💡 Ejemplo: Agente con Tools

```python
class Agent:
    def __init__(self):
        self.client = OpenAI()
        self.tools = {
            "calculate": self.calculate,
            "search_web": self.search_web,
            "send_email": self.send_email
        }
        
        self.tool_definitions = [
            {
                "type": "function",
                "function": {
                    "name": "calculate",
                    "description": "Evalúa expresiones matemáticas",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "expression": {"type": "string"}
                        },
                        "required": ["expression"]
                    }
                }
            },
            # ... más tools
        ]
    
    def calculate(self, expression: str):
        """Evalúa expresión matemática"""
        try:
            result = eval(expression)
            return {"result": result}
        except Exception as e:
            return {"error": str(e)}
    
    def search_web(self, query: str):
        """Simula búsqueda web"""
        return {"results": ["Resultado 1", "Resultado 2"]}
    
    def send_email(self, to: str, subject: str, body: str):
        """Simula envío de email"""
        print(f"Enviando email a {to}: {subject}")
        return {"status": "sent"}
    
    def run(self, user_input: str):
        """Ejecuta el agente"""
        messages = [{"role": "user", "content": user_input}]
        
        for _ in range(5):  # Máximo 5 iteraciones
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=messages,
                tools=self.tool_definitions
            )
            
            message = response.choices[0].message
            messages.append(message)
            
            # Si no hay tool calls, terminamos
            if not message.tool_calls:
                return message.content
            
            # Ejecutar cada tool call
            for tool_call in message.tool_calls:
                function_name = tool_call.function.name
                arguments = json.loads(tool_call.function.arguments)
                
                print(f"🔧 Ejecutando: {function_name}({arguments})")
                
                # Llamar función
                result = self.tools[function_name](**arguments)
                
                # Agregar resultado
                messages.append({
                    "role": "tool",
                    "tool_call_id": tool_call.id,
                    "content": json.dumps(result)
                })
        
        return "Max iterations reached"

# Uso
agent = Agent()
response = agent.run("Calcula 25 * 4 + 10")
print(response)
```

## 📊 Embeddings

```python
def get_embedding(text: str) -> list[float]:
    """Generar embedding de texto"""
    client = OpenAI()
    
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    
    return response.data[0].embedding

# Uso
embedding = get_embedding("¿Qué es Python?")
print(f"Dimensiones: {len(embedding)}")  # 1536
print(f"Primeros 5 valores: {embedding[:5]}")

# Similarity search
from numpy import dot
from numpy.linalg import norm

def cosine_similarity(a, b):
    return dot(a, b) / (norm(a) * norm(b))

emb1 = get_embedding("Python es un lenguaje de programación")
emb2 = get_embedding("Java es un lenguaje de programación")
emb3 = get_embedding("Me gusta la pizza")

print(f"Python vs Java: {cosine_similarity(emb1, emb2):.3f}")  # ~0.85
print(f"Python vs Pizza: {cosine_similarity(emb1, emb3):.3f}")  # ~0.45
```

## 🎨 Anthropic Claude

```bash
pip install anthropic
```

```python
from anthropic import Anthropic

client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

response = client.messages.create(
    model="claude-3-sonnet-20240229",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "¿Qué es Python?"}
    ]
)

print(response.content[0].text)
```

## 💰 Cost Management

```python
class CostTracker:
    # Precios por 1K tokens (Marzo 2024)
    PRICES = {
        "gpt-3.5-turbo": {"input": 0.0005, "output": 0.0015},
        "gpt-4": {"input": 0.03, "output": 0.06},
        "gpt-4-turbo": {"input": 0.01, "output": 0.03},
    }
    
    def __init__(self):
        self.total_input_tokens = 0
        self.total_output_tokens = 0
        self.model_usage = {}
    
    def track(self, response, model: str):
        """Track tokens de una respuesta"""
        input_tokens = response.usage.prompt_tokens
        output_tokens = response.usage.completion_tokens
        
        self.total_input_tokens += input_tokens
        self.total_output_tokens += output_tokens
        
        if model not in self.model_usage:
            self.model_usage[model] = {"input": 0, "output": 0}
        
        self.model_usage[model]["input"] += input_tokens
        self.model_usage[model]["output"] += output_tokens
    
    def get_cost(self) -> dict:
        """Calcular costo total"""
        total_cost = 0
        
        for model, usage in self.model_usage.items():
            prices = self.PRICES.get(model, {"input": 0, "output": 0})
            
            input_cost = (usage["input"] / 1000) * prices["input"]
            output_cost = (usage["output"] / 1000) * prices["output"]
            
            total_cost += input_cost + output_cost
        
        return {
            "total_cost": total_cost,
            "total_tokens": self.total_input_tokens + self.total_output_tokens,
            "by_model": self.model_usage
        }

# Uso
tracker = CostTracker()

response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": "Hello"}]
)

tracker.track(response, "gpt-3.5-turbo")
print(tracker.get_cost())
```

## ⚠️ Best Practices

```python
# 1. Rate limiting
import time
from functools import wraps

def rate_limit(calls_per_minute=3):
    min_interval = 60.0 / calls_per_minute
    last_called = [0.0]
    
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            elapsed = time.time() - last_called[0]
            left_to_wait = min_interval - elapsed
            if left_to_wait > 0:
                time.sleep(left_to_wait)
            ret = func(*args, **kwargs)
            last_called[0] = time.time()
            return ret
        return wrapper
    return decorator

@rate_limit(calls_per_minute=3)
def call_openai(prompt):
    # Tu llamada a OpenAI
    pass

# 2. Error handling y retries
from openai import OpenAI, RateLimitError, APIError
import backoff

@backoff.on_exception(backoff.expo, RateLimitError, max_tries=3)
def robust_completion(prompt: str):
    client = OpenAI()
    try:
        return client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )
    except RateLimitError:
        print("Rate limited, retrying...")
        raise
    except APIError as e:
        print(f"API error: {e}")
        return None

# 3. Caching
from functools import lru_cache

@lru_cache(maxsize=100)
def cached_embedding(text: str):
    return get_embedding(text)
```

## 🔗 Temas Relacionados

- [Prompt Engineering](./prompt-engineering) - Mejores prompts
- [RAG Systems](./rag-systems) - Retrieval + LLMs
- [LangChain](./langchain) - Framework de agentes

## 📚 Recursos

- [OpenAI Cookbook](https://cookbook.openai.com/)
- [Anthropic Claude Docs](https://docs.anthropic.com/)
- [OpenAI Platform Docs](https://platform.openai.com/docs)

---

> 💡 **Tip**: gpt-3.5-turbo para prototipado/desarrollo. gpt-4 solo cuando realmente lo necesites.
