---
title: "Type Hints (Tipado)"
level: avanzado
category: tipado
tags: [python, type hints, typing, annotations, mypy]
duration: 35min
prerequisites: [funciones, clases]
---

# Type Hints en Python

## 📋 ¿Qué son Type Hints?

Anotaciones opcionales que indican tipos esperados (Python 3.5+).

```python
# Sin type hints
def sumar(a, b):
    return a + b

# Con type hints
def sumar(a: int, b: int) -> int:
    return a + b

# Python sigue siendo dinámico
resultado = sumar(5, 3)  # OK
resultado = sumar("Hola", " Mundo")  # También funciona (type hints son opcionales)
```

## 🔧 Tipos Básicos

```python
# Tipos primitivos
edad: int = 25
precio: float = 19.99
nombre: str = "Ana"
activo: bool = True

# Funciones con tipos
def saludar(nombre: str) -> str:
    return f"Hola, {nombre}"

def calcular(a: int, b: int) -> int:
    return a + b

# Sin retorno
def imprimir(mensaje: str) -> None:
    print(mensaje)
```

## 📦 Módulo typing

```python
from typing import List, Dict, Tuple, Set, Optional, Union, Any

# Colecciones
numeros: List[int] = [1, 2, 3, 4, 5]
persona: Dict[str, str] = {"nombre": "Ana", "ciudad": "Madrid"}
coordenadas: Tuple[float, float] = (40.4168, -3.7038)
tags: Set[str] = {"python", "programming", "code"}

# Funciones con colecciones
def procesar_nombres(nombres: List[str]) -> List[str]:
    return [n.upper() for n in nombres]

def contar_letras(texto: str) -> Dict[str, int]:
    return {letra: texto.count(letra) for letra in set(texto)}
```

## 🎯 Optional y Union

```python
from typing import Optional, Union

# Optional[T] = Union[T, None]
def buscar_usuario(id: int) -> Optional[str]:
    # Puede retornar str o None
    if id == 1:
        return "Ana"
    return None

resultado = buscar_usuario(1)  # Optional[str]

# Union - Múltiples tipos
def procesar(valor: Union[int, str]) -> str:
    if isinstance(valor, int):
        return f"Número: {valor}"
    return f"Texto: {valor}"

procesar(42)      # OK
procesar("Hola")  # OK
```

## 💡 Any y Type Aliases

```python
from typing import Any

# Any - Cualquier tipo
def procesar_dato(dato: Any) -> None:
    print(dato)

procesar_dato(42)
procesar_dato("texto")
procesar_dato([1, 2, 3])

# Type Aliases - Nombres más descriptivos
from typing import List, Tuple

Vector = List[float]
Point = Tuple[float, float]
Persona = Dict[str, Union[str, int]]

def calcular_distancia(p1: Point, p2: Point) -> float:
    return ((p2[0] - p1[0])**2 + (p2[1] - p1[1])**2) ** 0.5

def procesar_personas(personas: List[Persona]) -> None:
    for persona in personas:
        print(persona["nombre"])
```

## 🔄 Callable - Funciones como Parámetros

```python
from typing import Callable

# Callable[[arg_types], return_type]
def aplicar_operacion(
    a: int,
    b: int,
    operacion: Callable[[int, int], int]
) -> int:
    return operacion(a, b)

def sumar(x: int, y: int) -> int:
    return x + y

def multiplicar(x: int, y: int) -> int:
    return x * y

print(aplicar_operacion(5, 3, sumar))        # 8
print(aplicar_operacion(5, 3, multiplicar))  # 15
```

## 📊 TypedDict - Diccionarios Tipados

```python
from typing import TypedDict

class Persona(TypedDict):
    nombre: str
    edad: int
    ciudad: str

def crear_persona(nombre: str, edad: int, ciudad: str) -> Persona:
    return {
        "nombre": nombre,
        "edad": edad,
        "ciudad": ciudad,
    }

persona = crear_persona("Ana", 25, "Madrid")
print(persona["nombre"])  # Type checker sabe que existe

# TypedDict con campos opcionales
class PersonaOpcional(TypedDict, total=False):
    nombre: str
    edad: int
    email: str  # Opcional
```

## 🎨 Generics - Tipos Genéricos

```python
from typing import TypeVar, Generic, List

T = TypeVar('T')

class Pila(Generic[T]):
    def __init__(self) -> None:
        self.items: List[T] = []
    
    def push(self, item: T) -> None:
        self.items.append(item)
    
    def pop(self) -> T:
        return self.items.pop()
    
    def vacia(self) -> bool:
        return len(self.items) == 0

# Uso
pila_int: Pila[int] = Pila()
pila_int.push(1)
pila_int.push(2)
print(pila_int.pop())  # 2

pila_str: Pila[str] = Pila()
pila_str.push("hola")
pila_str.push("mundo")
```

## 💪 Ejemplo Completo: Sistema de Usuarios

```python
from typing import List, Optional, Dict, TypedDict
from datetime import datetime

class Usuario(TypedDict):
    id: int
    nombre: str
    email: str
    creado: datetime
    activo: bool

class BaseDatos:
    def __init__(self) -> None:
        self.usuarios: Dict[int, Usuario] = {}
        self.next_id: int = 1
    
    def crear_usuario(self, nombre: str, email: str) -> Usuario:
        usuario: Usuario = {
            "id": self.next_id,
            "nombre": nombre,
            "email": email,
            "creado": datetime.now(),
            "activo": True,
        }
        self.usuarios[self.next_id] = usuario
        self.next_id += 1
        return usuario
    
    def buscar_usuario(self, id: int) -> Optional[Usuario]:
        return self.usuarios.get(id)
    
    def listar_usuarios_activos(self) -> List[Usuario]:
        return [u for u in self.usuarios.values() if u["activo"]]
    
    def actualizar_email(self, id: int, email: str) -> bool:
        usuario = self.buscar_usuario(id)
        if usuario:
            usuario["email"] = email
            return True
        return False

# Uso
db = BaseDatos()
usuario1 = db.crear_usuario("Ana", "ana@mail.com")
usuario2 = db.crear_usuario("Juan", "juan@mail.com")

print(db.listar_usuarios_activos())
```

## 🔍 Protocol - Duck Typing Explícito

```python
from typing import Protocol

class Dibujable(Protocol):
    """Cualquier clase con método dibujar()"""
    def dibujar(self) -> None:
        ...

class Circulo:
    def dibujar(self) -> None:
        print("Dibujando círculo")

class Rectangulo:
    def dibujar(self) -> None:
        print("Dibujando rectángulo")

def renderizar(forma: Dibujable) -> None:
    forma.dibujar()

# Ambas funcionan (duck typing)
renderizar(Circulo())
renderizar(Rectangulo())
```

## 🛠️ Literal - Valores Específicos

```python
from typing import Literal

Direccion = Literal["norte", "sur", "este", "oeste"]

def mover(direccion: Direccion) -> None:
    print(f"Moviendo hacia {direccion}")

mover("norte")  # OK
mover("arriba")  # Type error (mypy lo detecta)
```

## 📦 Final - Variables Constantes

```python
from typing import Final

MAX_INTENTOS: Final = 3
PI: Final[float] = 3.14159

# MAX_INTENTOS = 5  # Error en type checker

class Config:
    MAX_USUARIOS: Final = 100
```

## ✅ Validación con mypy

```python
# Instalar: pip install mypy
# Ejecutar: mypy archivo.py

def sumar(a: int, b: int) -> int:
    return a + b

# mypy detecta errores
resultado = sumar(5, "3")  # Error: Expected int, got str
resultado = sumar(5, 3.5)  # Error: Expected int, got float
```

## 💪 Ejercicio

```python
# Define tipos para un sistema de biblioteca
class Libro:
    pass

def buscar_libro(titulo: str) -> ???:
    pass

def prestar_libro(libro: ???, usuario: ???) -> ???:
    pass
```

<details>
<summary>✅ Solución</summary>

```python
from typing import Optional, List, TypedDict
from datetime import datetime

class LibroDict(TypedDict):
    id: int
    titulo: str
    autor: str
    disponible: bool

class UsuarioDict(TypedDict):
    id: int
    nombre: str
    libros_prestados: List[int]

def buscar_libro(titulo: str) -> Optional[LibroDict]:
    # Busca libro por título
    pass

def prestar_libro(libro: LibroDict, usuario: UsuarioDict) -> bool:
    # Presta libro a usuario
    if libro["disponible"]:
        libro["disponible"] = False
        usuario["libros_prestados"].append(libro["id"])
        return True
    return False
```
</details>

## 🔗 Temas Relacionados

- [Funciones](../basico/funciones)
- [Clases](../intermedio/clases)

## 📚 Recursos Adicionales

- [typing module](https://docs.python.org/3/library/typing.html)
- [mypy](http://mypy-lang.org/)
- [PEP 484](https://www.python.org/dev/peps/pep-0484/)

---

> 💡 **Tip**: Type hints son opcionales pero mejoran legibilidad y ayudan a detectar errores con herramientas como mypy.
