---
title: "LangChain - Framework de Agentes"
level: ai-engineering
category: agents
tags: [python, langchain, agents, chains, tools, memory]
duration: 75min
prerequisites: [llms-openai, rag-systems]
---

# LangChain - Framework de Agentes

## 🎯 ¿Qué es LangChain?

**Framework** para construir aplicaciones con LLMs:
- Chains: Cadenas de operaciones
- Agents: Agentes que usan tools
- Memory: Historial de conversaciones
- Retrieval: Integración RAG

```bash
pip install langchain langchain-openai
```

## 🔗 Chains Básicas

```python
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.schema.output_parser import StrOutputParser

# LLM
llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.7)

# Prompt Template
prompt = ChatPromptTemplate.from_messages([
    ("system", "Eres un {role}"),
    ("user", "{input}")
])

# Chain
chain = prompt | llm | StrOutputParser()

# Ejecutar
response = chain.invoke({
    "role": "experto en Python",
    "input": "¿Qué son los decoradores?"
})

print(response)
```

## 🛠️ Tools y Agents

```python
from langchain.agents import tool, AgentExecutor, create_openai_functions_agent
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder

# Definir tools
@tool
def calculate(expression: str) -> str:
    """Evalúa expresiones matemáticas. Ejemplo: '2 + 2' o '10 * 5'"""
    try:
        result = eval(expression)
        return str(result)
    except Exception as e:
        return f"Error: {str(e)}"

@tool
def get_weather(city: str) -> str:
    """Obtiene el clima de una ciudad"""
    # En producción, llamarías a una API real
    return f"El clima en {city} es soleado, 22°C"

@tool
def search_web(query: str) -> str:
    """Busca información en la web"""
    # En producción, usarías Google Search API o similar
    return f"Resultados para '{query}': [Resultado 1, Resultado 2]"

# Crear agent
tools = [calculate, get_weather, search_web]

prompt = ChatPromptTemplate.from_messages([
    ("system", "Eres un asistente útil con acceso a herramientas."),
    ("human", "{input}"),
    MessagesPlaceholder(variable_name="agent_scratchpad"),
])

llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)

agent = create_openai_functions_agent(llm, tools, prompt)
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

# Ejecutar
response = agent_executor.invoke({
    "input": "¿Cuánto es 25 * 4 + 10? Y luego dime el clima en Madrid"
})

print(response["output"])
```

## 💭 Memory Systems

```python
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain

# Memory
memory = ConversationBufferMemory()

# Conversation Chain
conversation = ConversationChain(
    llm=ChatOpenAI(temperature=0.7),
    memory=memory,
    verbose=True
)

# Chat
print(conversation.predict(input="Hola, me llamo Juan"))
# "¡Hola Juan! ¿En qué puedo ayudarte?"

print(conversation.predict(input="¿Cuál es mi nombre?"))
# "Tu nombre es Juan"

# Ver historial
print(memory.load_memory_variables({}))
```

### Tipos de Memory

```python
# 1. Buffer Memory (guarda todo)
from langchain.memory import ConversationBufferMemory
memory = ConversationBufferMemory()

# 2. Window Memory (últimas K mensajes)
from langchain.memory import ConversationBufferWindowMemory
memory = ConversationBufferWindowMemory(k=5)

# 3. Summary Memory (resume conversaciones largas)
from langchain.memory import ConversationSummaryMemory
memory = ConversationSummaryMemory(llm=ChatOpenAI())

# 4. Entity Memory (recuerda entidades mencionadas)
from langchain.memory import ConversationEntityMemory
memory = ConversationEntityMemory(llm=ChatOpenAI())
```

## 🔍 RAG con LangChain

```python
from langchain_openai import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQA
from langchain.document_loaders import TextLoader

# 1. Cargar documentos
loader = TextLoader("docs.txt")
documents = loader.load()

# 2. Chunking
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50
)
chunks = text_splitter.split_documents(documents)

# 3. Crear vector store
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory="./chroma_db"
)

# 4. Retrieval QA Chain
qa_chain = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(model="gpt-3.5-turbo"),
    retriever=vectorstore.as_retriever(search_kwargs={"k": 3}),
    return_source_documents=True
)

# Query
result = qa_chain({"query": "¿Qué es Python?"})
print(f"Respuesta: {result['result']}")
print(f"Fuentes: {result['source_documents']}")
```

## 💡 Ejemplo: Custom Agent con Context

```python
from langchain.agents import AgentExecutor, create_openai_functions_agent
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.memory import ConversationBufferMemory
from langchain_openai import ChatOpenAI

class CustomerSupportAgent:
    def __init__(self):
        self.llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)
        self.memory = ConversationBufferMemory(
            memory_key="chat_history",
            return_messages=True
        )
        
        # Tools
        self.tools = [
            self._create_ticket_tool(),
            self._search_kb_tool(),
            self._check_status_tool()
        ]
        
        # Prompt
        self.prompt = ChatPromptTemplate.from_messages([
            ("system", """Eres un agente de soporte técnico.
            Ayudas a usuarios con problemas técnicos.
            Usa las herramientas disponibles para resolver problemas.
            Sé amable y profesional."""),
            MessagesPlaceholder(variable_name="chat_history"),
            ("human", "{input}"),
            MessagesPlaceholder(variable_name="agent_scratchpad"),
        ])
        
        # Create agent
        agent = create_openai_functions_agent(
            llm=self.llm,
            tools=self.tools,
            prompt=self.prompt
        )
        
        self.agent_executor = AgentExecutor(
            agent=agent,
            tools=self.tools,
            memory=self.memory,
            verbose=True
        )
    
    def _create_ticket_tool(self):
        @tool
        def create_ticket(title: str, description: str) -> str:
            """Crea un ticket de soporte"""
            # En producción, guardarías en DB
            ticket_id = hash(title) % 10000
            return f"Ticket #{ticket_id} creado: {title}"
        return create_ticket
    
    def _search_kb_tool(self):
        @tool
        def search_knowledge_base(query: str) -> str:
            """Busca en la base de conocimiento"""
            # En producción, RAG real
            return f"Encontré 3 artículos sobre '{query}'"
        return search_knowledge_base
    
    def _check_status_tool(self):
        @tool
        def check_ticket_status(ticket_id: str) -> str:
            """Verifica el estado de un ticket"""
            return f"Ticket #{ticket_id}: En progreso"
        return check_ticket_status
    
    def chat(self, message: str) -> str:
        """Chat con el agente"""
        response = self.agent_executor.invoke({"input": message})
        return response["output"]

# Uso
agent = CustomerSupportAgent()

print(agent.chat("Mi aplicación no carga"))
# El agente usará search_knowledge_base

print(agent.chat("Crea un ticket para esto"))
# El agente usará create_ticket

print(agent.chat("¿Cuál era mi problema?"))
# El agente usa memory para recordar
```

## 🎨 Custom Chains

```python
from langchain.chains import LLMChain
from langchain.chains import SequentialChain

# Chain 1: Generar historia
story_chain = LLMChain(
    llm=ChatOpenAI(temperature=0.9),
    prompt=ChatPromptTemplate.from_template(
        "Escribe una historia corta sobre: {topic}"
    ),
    output_key="story"
)

# Chain 2: Traducir
translate_chain = LLMChain(
    llm=ChatOpenAI(temperature=0),
    prompt=ChatPromptTemplate.from_template(
        "Traduce al inglés:\n\n{story}"
    ),
    output_key="translation"
)

# Chain 3: Resumir
summary_chain = LLMChain(
    llm=ChatOpenAI(temperature=0),
    prompt=ChatPromptTemplate.from_template(
        "Resume en una oración:\n\n{translation}"
    ),
    output_key="summary"
)

# Sequential Chain
overall_chain = SequentialChain(
    chains=[story_chain, translate_chain, summary_chain],
    input_variables=["topic"],
    output_variables=["story", "translation", "summary"],
    verbose=True
)

# Ejecutar
result = overall_chain({"topic": "un robot que aprende a amar"})
print(result["summary"])
```

## 📊 Streaming

```python
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler

llm = ChatOpenAI(
    streaming=True,
    callbacks=[StreamingStdOutCallbackHandler()],
    temperature=0.7
)

# El output se imprime en tiempo real
llm.invoke("Escribe un poema sobre Python")
```

## 🔐 API Keys y Config

```python
import os
from langchain_openai import ChatOpenAI

# Opción 1: Variable de entorno
os.environ["OPENAI_API_KEY"] = "sk-..."

# Opción 2: Directamente
llm = ChatOpenAI(
    openai_api_key="sk-...",
    model="gpt-3.5-turbo"
)

# Opción 3: .env file
from dotenv import load_dotenv
load_dotenv()

llm = ChatOpenAI()  # Lee OPENAI_API_KEY del .env
```

## 💪 Best Practices

```python
# 1. Error handling
from langchain.callbacks import get_openai_callback

with get_openai_callback() as cb:
    try:
        response = chain.invoke({"input": "Hello"})
        print(f"Tokens: {cb.total_tokens}")
        print(f"Cost: ${cb.total_cost:.4f}")
    except Exception as e:
        print(f"Error: {e}")

# 2. Retry logic
from langchain.llms import OpenAI
from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.retry import RetryCallbackHandler

retry_callback = RetryCallbackHandler(max_retries=3)
callback_manager = CallbackManager([retry_callback])

llm = OpenAI(callback_manager=callback_manager)

# 3. Caching
from langchain.cache import InMemoryCache
import langchain

langchain.llm_cache = InMemoryCache()

# Primera llamada: hace request
llm.invoke("¿Qué es Python?")

# Segunda llamada: usa cache (instantáneo)
llm.invoke("¿Qué es Python?")
```

## 🔗 Temas Relacionados

- [LLMs y OpenAI](./llms-openai) - Base de LangChain
- [LangGraph](./langgraph) - Multi-agent orchestration
- [RAG Systems](./rag-systems) - Retrieval con LangChain

## 📚 Recursos

- [LangChain Docs](https://python.langchain.com/)
- [LangChain Academy](https://academy.langchain.com/)
- [LangChain Templates](https://github.com/langchain-ai/langchain/tree/master/templates)

---

> 💡 **Tip**: LangChain es excelente para empezar, pero para producción considera LangGraph o custom solutions.
