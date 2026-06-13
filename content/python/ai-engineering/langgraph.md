---
title: "LangGraph - Multi-Agent Orchestration"
level: ai-engineering
category: agents
tags: [python, langgraph, agents, state-machines, workflows, multi-agent]
duration: 90min
prerequisites: [langchain, asyncio]
---

# LangGraph - Multi-Agent Orchestration

## 🎯 ¿Qué es LangGraph?

**Framework** para construir **agentes con estado** y **multi-agent systems**:
- State graphs con nodos y edges
- Control de flujo complejo (loops, conditionals)
- Multi-agent orchestration
- Human-in-the-loop
- Persistence de estado

```bash
pip install langgraph langchain-openai
```

## 🔄 Conceptos Básicos

```python
from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, END
from langchain_openai import ChatOpenAI

# 1. Definir State
class AgentState(TypedDict):
    messages: list[str]
    count: int
    result: str

# 2. Definir Nodes (funciones que procesan el estado)
def node_a(state: AgentState) -> AgentState:
    """Primer nodo"""
    print("Ejecutando Node A")
    state["messages"].append("Pasé por A")
    state["count"] += 1
    return state

def node_b(state: AgentState) -> AgentState:
    """Segundo nodo"""
    print("Ejecutando Node B")
    state["messages"].append("Pasé por B")
    state["result"] = f"Completado con {state['count']} pasos"
    return state

# 3. Crear Graph
workflow = StateGraph(AgentState)

# Agregar nodos
workflow.add_node("node_a", node_a)
workflow.add_node("node_b", node_b)

# Definir edges
workflow.set_entry_point("node_a")
workflow.add_edge("node_a", "node_b")
workflow.add_edge("node_b", END)

# Compilar
app = workflow.compile()

# Ejecutar
initial_state = {
    "messages": [],
    "count": 0,
    "result": ""
}

final_state = app.invoke(initial_state)
print(final_state)
```

## 🎯 Conditional Edges

```python
from langgraph.graph import StateGraph, END

class WorkflowState(TypedDict):
    input: str
    classification: str
    response: str

def classify_input(state: WorkflowState) -> WorkflowState:
    """Clasifica el input"""
    text = state["input"].lower()
    
    if "precio" in text or "costo" in text:
        state["classification"] = "pricing"
    elif "ayuda" in text or "problema" in text:
        state["classification"] = "support"
    else:
        state["classification"] = "general"
    
    return state

def handle_pricing(state: WorkflowState) -> WorkflowState:
    state["response"] = "Te contacto con ventas..."
    return state

def handle_support(state: WorkflowState) -> WorkflowState:
    state["response"] = "Creando ticket de soporte..."
    return state

def handle_general(state: WorkflowState) -> WorkflowState:
    state["response"] = "Respuesta general..."
    return state

# Router function
def route_by_classification(state: WorkflowState) -> str:
    """Decide qué nodo ejecutar basado en classification"""
    return state["classification"]

# Build graph
workflow = StateGraph(WorkflowState)

workflow.add_node("classify", classify_input)
workflow.add_node("pricing", handle_pricing)
workflow.add_node("support", handle_support)
workflow.add_node("general", handle_general)

workflow.set_entry_point("classify")

# Conditional edge
workflow.add_conditional_edges(
    "classify",
    route_by_classification,
    {
        "pricing": "pricing",
        "support": "support",
        "general": "general"
    }
)

# Todos terminan
workflow.add_edge("pricing", END)
workflow.add_edge("support", END)
workflow.add_edge("general", END)

app = workflow.compile()

# Test
result = app.invoke({"input": "¿Cuánto cuesta?", "classification": "", "response": ""})
print(result["response"])  # "Te contacto con ventas..."
```

## 💡 Ejemplo: Agente Researcher

```python
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from typing import TypedDict, List

class ResearchState(TypedDict):
    topic: str
    queries: List[str]
    results: List[str]
    report: str
    iterations: int

llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)

def generate_queries(state: ResearchState) -> ResearchState:
    """Genera queries de búsqueda"""
    prompt = ChatPromptTemplate.from_template(
        "Genera 3 búsquedas para investigar sobre: {topic}\n"
        "Formato: una por línea"
    )
    
    response = llm.invoke(prompt.format_messages(topic=state["topic"]))
    queries = response.content.strip().split('\n')
    
    state["queries"] = [q.strip('- ') for q in queries if q.strip()]
    state["iterations"] += 1
    return state

def search_web(state: ResearchState) -> ResearchState:
    """Simula búsquedas web"""
    results = []
    
    for query in state["queries"]:
        # En producción: usa Google Search API, Serper, etc.
        result = f"Resultado para '{query}': [Info simulada sobre {query}]"
        results.append(result)
    
    state["results"] = results
    return state

def write_report(state: ResearchState) -> ResearchState:
    """Genera reporte final"""
    prompt = ChatPromptTemplate.from_template(
        "Basándote en estos resultados, escribe un reporte sobre {topic}:\n\n"
        "{results}\n\n"
        "Reporte:"
    )
    
    results_text = "\n".join(state["results"])
    response = llm.invoke(prompt.format_messages(
        topic=state["topic"],
        results=results_text
    ))
    
    state["report"] = response.content
    return state

def should_continue(state: ResearchState) -> str:
    """Decide si continuar investigando"""
    if state["iterations"] >= 2:
        return "write_report"
    return "search_web"

# Build graph
workflow = StateGraph(ResearchState)

workflow.add_node("generate_queries", generate_queries)
workflow.add_node("search_web", search_web)
workflow.add_node("write_report", write_report)

workflow.set_entry_point("generate_queries")
workflow.add_edge("generate_queries", "search_web")

workflow.add_conditional_edges(
    "search_web",
    should_continue,
    {
        "search_web": "generate_queries",  # Loop
        "write_report": "write_report"
    }
)

workflow.add_edge("write_report", END)

app = workflow.compile()

# Ejecutar
result = app.invoke({
    "topic": "RAG Systems",
    "queries": [],
    "results": [],
    "report": "",
    "iterations": 0
})

print(result["report"])
```

## 👥 Multi-Agent System

```python
from langgraph.graph import StateGraph, END
from typing import TypedDict, Literal

class MultiAgentState(TypedDict):
    task: str
    research: str
    code: str
    review: str
    approved: bool
    iterations: int

def researcher_agent(state: MultiAgentState) -> MultiAgentState:
    """Agente que investiga"""
    prompt = f"Investiga y resume: {state['task']}"
    response = llm.invoke(prompt)
    
    state["research"] = response.content
    state["iterations"] += 1
    print(f"[Researcher] {response.content[:100]}...")
    return state

def coder_agent(state: MultiAgentState) -> MultiAgentState:
    """Agente que escribe código"""
    prompt = f"Basado en esta investigación:\n{state['research']}\n\nEscribe código Python:"
    response = llm.invoke(prompt)
    
    state["code"] = response.content
    print(f"[Coder] Código generado ({len(response.content)} chars)")
    return state

def reviewer_agent(state: MultiAgentState) -> MultiAgentState:
    """Agente que revisa"""
    prompt = f"Revisa este código:\n{state['code']}\n\n¿Está correcto? (Sí/No)"
    response = llm.invoke(prompt)
    
    state["review"] = response.content
    state["approved"] = "sí" in response.content.lower()
    print(f"[Reviewer] {response.content[:100]}...")
    return state

def route_after_review(state: MultiAgentState) -> Literal["end", "retry"]:
    """Decide si aprobar o reintentar"""
    if state["approved"] or state["iterations"] >= 3:
        return "end"
    return "retry"

# Build graph
workflow = StateGraph(MultiAgentState)

workflow.add_node("researcher", researcher_agent)
workflow.add_node("coder", coder_agent)
workflow.add_node("reviewer", reviewer_agent)

workflow.set_entry_point("researcher")
workflow.add_edge("researcher", "coder")
workflow.add_edge("coder", "reviewer")

workflow.add_conditional_edges(
    "reviewer",
    route_after_review,
    {
        "end": END,
        "retry": "researcher"  # Loop back
    }
)

app = workflow.compile()

# Ejecutar
result = app.invoke({
    "task": "Implementar binary search en Python",
    "research": "",
    "code": "",
    "review": "",
    "approved": False,
    "iterations": 0
})

print("\n=== CÓDIGO FINAL ===")
print(result["code"])
```

## 🧑‍💻 Human-in-the-Loop

```python
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import StateGraph, END
from langgraph.types import interrupt

class ApprovalState(TypedDict):
    draft: str
    approved: bool
    feedback: str

def create_draft(state: ApprovalState) -> ApprovalState:
    """Crea un draft"""
    state["draft"] = "Este es un draft generado por IA..."
    return state

def human_approval(state: ApprovalState) -> ApprovalState:
    """Espera aprobación humana"""
    print(f"Draft:\n{state['draft']}\n")
    
    # Interrupt: pausa ejecución hasta que el humano responda
    response = interrupt("¿Aprobar? (yes/no/feedback)")
    
    if response == "yes":
        state["approved"] = True
    elif response.startswith("no"):
        state["approved"] = False
        state["feedback"] = response[3:].strip()  # "no porque..."
    
    return state

def revise_draft(state: ApprovalState) -> ApprovalState:
    """Revisa basándose en feedback"""
    prompt = f"Revisa esto:\n{state['draft']}\n\nFeedback: {state['feedback']}"
    response = llm.invoke(prompt)
    state["draft"] = response.content
    return state

# Build graph con checkpointer
checkpointer = MemorySaver()

workflow = StateGraph(ApprovalState)
workflow.add_node("create_draft", create_draft)
workflow.add_node("human_approval", human_approval)
workflow.add_node("revise", revise_draft)

workflow.set_entry_point("create_draft")
workflow.add_edge("create_draft", "human_approval")

workflow.add_conditional_edges(
    "human_approval",
    lambda s: "end" if s["approved"] else "revise",
    {"end": END, "revise": "revise"}
)

workflow.add_edge("revise", "human_approval")

app = workflow.compile(checkpointer=checkpointer)

# Ejecutar con thread
config = {"configurable": {"thread_id": "1"}}

for event in app.stream({
    "draft": "",
    "approved": False,
    "feedback": ""
}, config):
    print(event)
```

## 💾 Persistence

```python
from langgraph.checkpoint.sqlite import SqliteSaver

# Checkpoint con SQLite
checkpointer = SqliteSaver.from_conn_string("checkpoints.db")

app = workflow.compile(checkpointer=checkpointer)

# Primera ejecución
config = {"configurable": {"thread_id": "conversation_1"}}
result = app.invoke(initial_state, config)

# Continuar después (desde el último checkpoint)
continued = app.invoke(None, config)  # None = continuar
```

## 🎨 Streaming

```python
# Stream events
for event in app.stream(initial_state):
    print(f"Evento: {event}")

# Stream con updates
for event in app.stream(initial_state, stream_mode="updates"):
    for node, output in event.items():
        print(f"[{node}]: {output}")
```

## 💪 Best Practices

```python
# 1. Type hints siempre
from typing import TypedDict, Annotated

class MyState(TypedDict):
    messages: Annotated[list, "Lista de mensajes"]
    count: Annotated[int, "Contador"]

# 2. Error handling en nodos
def safe_node(state: MyState) -> MyState:
    try:
        # Tu lógica
        pass
    except Exception as e:
        state["error"] = str(e)
    return state

# 3. Logging
import logging
logging.basicConfig(level=logging.INFO)

def logged_node(state: MyState) -> MyState:
    logging.info(f"Ejecutando con state: {state}")
    # ...
    return state

# 4. Timeouts
import signal

def timeout_handler(signum, frame):
    raise TimeoutError("Node timeout")

def timed_node(state: MyState) -> MyState:
    signal.signal(signal.SIGALRM, timeout_handler)
    signal.alarm(30)  # 30 segundos
    try:
        # Tu lógica
        pass
    finally:
        signal.alarm(0)  # Cancel alarm
    return state
```

## 🔗 Temas Relacionados

- [LangChain](./langchain) - Base de LangGraph
- [MCP](./mcp) - Model Context Protocol
- [Deployment](./deployment) - Desplegar agentes

## 📚 Recursos

- [LangGraph Docs](https://langchain-ai.github.io/langgraph/)
- [LangGraph Examples](https://github.com/langchain-ai/langgraph/tree/main/examples)
- [Multi-Agent Tutorial](https://langchain-ai.github.io/langgraph/tutorials/multi_agent/)

---

> 💡 **Tip**: LangGraph es ideal para agentes complejos con estado. Para casos simples, usa LangChain.
