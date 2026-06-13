---
title: "Prompt Engineering"
level: ai-engineering
category: llm
tags: [python, prompts, llm, gpt, claude, prompt-engineering]
duration: 60min
prerequisites: [llms-openai]
---

# Prompt Engineering para AI Engineers

## 🎯 ¿Qué es Prompt Engineering?

**El arte de escribir prompts efectivos** para LLMs:
- 80% del resultado viene del prompt
- No es magia, es técnica aprendible
- Critical para production AI apps

## 📝 Principios Básicos

### 1. Sea Específico

```python
# ❌ MAL
prompt = "Escribe código"

# ✅ BIEN
prompt = """Escribe una función en Python que:
- Se llame calculate_average
- Reciba una lista de números
- Retorne el promedio
- Maneje lista vacía (retornar 0)
- Incluya docstring
- Incluya type hints"""
```

### 2. Proporcione Contexto

```python
# ❌ MAL
prompt = "¿Es esto correcto?"

# ✅ BIEN
prompt = f"""Eres un code reviewer experto en Python.
Revisa este código y di si tiene bugs:

```python
{code}
```

Enfócate en:
- Manejo de errores
- Edge cases
- Performance"""
```

### 3. Use Ejemplos (Few-Shot)

```python
# ❌ Zero-shot (sin ejemplos)
prompt = "Clasifica el sentimiento del texto"

# ✅ Few-shot (con ejemplos)
prompt = """Clasifica el sentimiento (positivo/negativo/neutral):

Texto: "Me encantó el producto"
Sentimiento: positivo

Texto: "No funcionó como esperaba"
Sentimiento: negativo

Texto: "El envío fue normal"
Sentimiento: neutral

Texto: "{user_text}"
Sentimiento:"""
```

## 🎨 Técnicas Avanzadas

### Chain of Thought (CoT)

```python
prompt = """Resuelve este problema paso a paso:

Problema: Si un tren viaja a 80 km/h y debe llegar en 2.5 horas, ¿qué distancia recorrerá?

Piensa paso a paso:
1. Identifica los datos
2. Identifica la fórmula
3. Calcula el resultado
4. Verifica que tenga sentido

Solución:"""

# El LLM ahora razona mejor
```

### ReAct (Reasoning + Acting)

```python
prompt = f"""Eres un agente que puede usar herramientas.

Herramientas disponibles:
- search_web(query): Busca en internet
- calculate(expression): Evalúa matemáticas
- get_weather(city): Obtiene clima

Formato de respuesta:
Thought: [tu razonamiento]
Action: [nombre_herramienta]
Action Input: [argumentos]
Observation: [resultado de la herramienta]
... (repite Thought/Action/Observation si necesario)
Thought: Ya tengo la respuesta final
Final Answer: [tu respuesta]

Pregunta: ¿Cuánto es 234 * 567 y qué clima hace en Madrid?

Thought:"""
```

### Self-Consistency

```python
# Genera múltiples respuestas y vota
responses = []

for i in range(5):
    prompt = f"""Resuelve: {problem}
    
    Solución (intento {i+1}):"""
    
    response = llm.invoke(prompt, temperature=0.7)
    responses.append(response)

# Seleccionar respuesta más común
from collections import Counter
most_common = Counter(responses).most_common(1)[0][0]
```

## 💡 Prompts para Production

### System Prompts Robustos

```python
SYSTEM_PROMPT = """Eres un asistente de customer support para {company_name}.

REGLAS ESTRICTAS:
- NUNCA inventes información sobre precios o productos
- Si no sabes algo, di "Déjame verificar eso con mi equipo"
- Sé amable pero profesional
- Si el usuario está frustrado, empatiza primero
- No hagas promesas sobre refunds sin aprobar con supervisor

CAPACIDADES:
- Puedes buscar en la knowledge base
- Puedes crear tickets de soporte
- Puedes consultar estados de pedidos

LIMITACIONES:
- NO puedes procesar refunds
- NO puedes modificar pedidos ya enviados
- NO puedes acceder a info de tarjetas de crédito

TONO:
Profesional, amigable, conciso. Usa bullet points cuando sea apropiado."""
```

### Structured Output

```python
prompt = """Extrae información de esta reseña:

Reseña: "{review_text}"

Retorna en este formato JSON:
{
  "sentiment": "positive" | "negative" | "neutral",
  "rating_implied": 1-5,
  "main_topics": ["topic1", "topic2"],
  "actionable": true | false,
  "priority": "low" | "medium" | "high"
}

JSON:"""

# Parsea con json.loads()
import json
result = json.loads(llm_response)
```

### Function Calling Prompts

```python
# Mejor con función JSON Schema
tools = [{
    "type": "function",
    "function": {
        "name": "create_ticket",
        "description": "Crea un ticket de soporte técnico",
        "parameters": {
            "type": "object",
            "properties": {
                "title": {
                    "type": "string",
                    "description": "Título corto del problema"
                },
                "priority": {
                    "type": "string",
                    "enum": ["low", "medium", "high", "critical"]
                },
                "category": {
                    "type": "string",
                    "enum": ["bug", "feature", "question", "other"]
                },
                "description": {
                    "type": "string",
                    "description": "Descripción detallada"
                }
            },
            "required": ["title", "priority", "category"]
        }
    }
}]

response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": user_message}],
    tools=tools
)
```

## 🎯 Prompts por Use Case

### Code Generation

```python
CODE_GEN_PROMPT = """Genera código Python que cumpla esta especificación:

Requisitos:
{requirements}

Restricciones:
- Usa type hints
- Incluye docstrings (Google style)
- Maneja errores con try/except
- Incluye tests unitarios
- Sigue PEP 8

Estructura de respuesta:
1. Código principal
2. Tests
3. Ejemplo de uso

Código:"""
```

### Content Moderation

```python
MODERATION_PROMPT = """Analiza si este contenido viola políticas:

Contenido: "{content}"

Políticas:
- No spam
- No hate speech
- No información personal (emails, teléfonos, etc.)
- No contenido sexual explícito
- No scams/phishing

Responde en formato:
{
  "violates_policy": true/false,
  "violations": ["policy1", "policy2"],
  "severity": "low" | "medium" | "high",
  "action": "allow" | "flag" | "block",
  "explanation": "breve explicación"
}

Análisis:"""
```

### Summarization

```python
SUMMARY_PROMPT = """Resume este texto siguiendo estas reglas:

Texto:
{long_text}

Reglas:
- Máximo {max_words} palabras
- Mantén los puntos clave
- Usa bullet points
- Enfócate en insights accionables
- Mantén tono {tone}

Resumen:"""
```

### Translation with Context

```python
TRANSLATION_PROMPT = """Traduce al {target_lang} manteniendo:

Contexto: {context}
Audiencia: {audience}
Tono: {tone}

Texto original ({source_lang}):
{text}

Consideraciones especiales:
- Adapta modismos culturalmente
- Mantén términos técnicos en inglés si es apropiado
- Si hay ambigüedad, elige la interpretación más común

Traducción ({target_lang}):"""
```

## 💪 Best Practices

### 1. Template Management

```python
from string import Template

class PromptTemplates:
    CHAT_TEMPLATE = Template("""
    System: $system_prompt
    
    Conversación previa:
    $history
    
    Usuario: $user_message
    
    Asistente:""")
    
    RAG_TEMPLATE = Template("""
    Responde basándote en el siguiente contexto:
    
    Contexto:
    $context
    
    Pregunta: $question
    
    Si el contexto no contiene la respuesta, di "$fallback_message"
    
    Respuesta:""")
    
    @staticmethod
    def render_chat(system_prompt, history, user_message):
        return PromptTemplates.CHAT_TEMPLATE.substitute(
            system_prompt=system_prompt,
            history=history,
            user_message=user_message
        )
```

### 2. Prompt Versioning

```python
class PromptVersion:
    V1 = "You are a helpful assistant"
    V2 = """You are a helpful assistant that:
    - Answers concisely
    - Provides examples
    - Admits when unsure"""
    
    CURRENT = V2

# En producción, trackea qué versión usó cada request
def get_response(user_input: str, version: str = PromptVersion.CURRENT):
    response = llm.invoke(
        f"{version}\n\nUser: {user_input}"
    )
    
    # Log version usado
    log_interaction(prompt_version=version, response=response)
    
    return response
```

### 3. A/B Testing de Prompts

```python
import random

PROMPTS = {
    "v1": "You are a helpful assistant",
    "v2": "You are a concise, helpful assistant",
    "v3": "You are a detailed, helpful assistant"
}

def get_prompt_variant(user_id: str) -> str:
    """Asigna consistentemente una variante por usuario"""
    variants = list(PROMPTS.keys())
    index = hash(user_id) % len(variants)
    return variants[index]

# Track resultados
def track_satisfaction(user_id: str, satisfied: bool):
    variant = get_prompt_variant(user_id)
    analytics.track("prompt_satisfaction", {
        "variant": variant,
        "satisfied": satisfied
    })
```

### 4. Cost Optimization

```python
def optimize_prompt(prompt: str, max_tokens: int = 2000) -> str:
    """Reduce tamaño de prompt manteniendo info clave"""
    
    # Eliminar whitespace excesivo
    prompt = " ".join(prompt.split())
    
    # Si es muy largo, usa summarization
    if len(prompt.split()) > max_tokens:
        summary_prompt = f"Resume en {max_tokens} palabras: {prompt}"
        prompt = llm.invoke(summary_prompt)
    
    return prompt

# Count tokens antes de enviar
import tiktoken

def count_tokens(text: str, model: str = "gpt-3.5-turbo") -> int:
    encoding = tiktoken.encoding_for_model(model)
    return len(encoding.encode(text))
```

## 🔍 Debugging Prompts

```python
def debug_prompt(prompt: str, response: str):
    """Analiza por qué un prompt no funciona"""
    
    analysis_prompt = f"""Analiza este prompt e identifica problemas:

Prompt usado:
{prompt}

Respuesta obtenida:
{response}

Problemas potenciales:
1. ¿Es ambiguo?
2. ¿Falta contexto?
3. ¿Las instrucciones son claras?
4. ¿Tiene ejemplos suficientes?
5. ¿El formato de salida está especificado?

Sugerencias de mejora:"""
    
    suggestions = llm.invoke(analysis_prompt)
    return suggestions
```

## 🔗 Temas Relacionados

- [LLMs y OpenAI](./llms-openai) - API implementation
- [RAG Systems](./rag-systems) - Prompts con contexto
- [LangChain](./langchain) - Prompt templates

## 📚 Recursos

- [OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [Anthropic Prompt Library](https://docs.anthropic.com/claude/prompt-library)
- [Learn Prompting](https://learnprompting.org/)

---

> 💡 **Tip**: El mejor prompt es el que funciona. Itera basándote en resultados reales, no en teoría.
