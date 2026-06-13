---
title: "Decoradores"
level: intermedio
category: avanzado
tags: [python, decoradores, decorators, wrapper, decorator-syntax]
duration: 35min
prerequisites: [funciones, iteradores-generadores]
---

# Decoradores en Python

## 📋 ¿Qué son los Decoradores?

Los **decoradores** son funciones que modifican el comportamiento de otras funciones.

```python
def mi_decorador(func):
    def wrapper():
        print("Antes de la función")
        func()
        print("Después de la función")
    return wrapper

@mi_decorador
def saludar():
    print("¡Hola!")

saludar()
# Antes de la función
# ¡Hola!
# Después de la función

# Equivalente a:
# saludar = mi_decorador(saludar)
```

## 🔧 Decoradores con Argumentos

```python
def mi_decorador(func):
    def wrapper(*args, **kwargs):  # Acepta cualquier argumento
        print(f"Llamando a {func.__name__}")
        resultado = func(*args, **kwargs)
        print(f"Resultado: {resultado}")
        return resultado
    return wrapper

@mi_decorador
def sumar(a, b):
    return a + b

sumar(5, 3)
# Llamando a sumar
# Resultado: 8
```

## ⏱️ Decorador de Tiempo

```python
import time

def medir_tiempo(func):
    def wrapper(*args, **kwargs):
        inicio = time.time()
        resultado = func(*args, **kwargs)
        fin = time.time()
        print(f"{func.__name__} tomó {fin - inicio:.4f} segundos")
        return resultado
    return wrapper

@medir_tiempo
def proceso_lento():
    time.sleep(1)
    return "Completado"

proceso_lento()  # proceso_lento tomó 1.0012 segundos
```

## 📝 Decorador de Logging

```python
def log(func):
    def wrapper(*args, **kwargs):
        print(f"[LOG] Ejecutando: {func.__name__}")
        print(f"[LOG] Args: {args}, Kwargs: {kwargs}")
        resultado = func(*args, **kwargs)
        print(f"[LOG] Retornó: {resultado}")
        return resultado
    return wrapper

@log
def multiplicar(a, b):
    return a * b

multiplicar(5, 3)
# [LOG] Ejecutando: multiplicar
# [LOG] Args: (5, 3), Kwargs: {}
# [LOG] Retornó: 15
```

## 🎯 Decoradores con Parámetros

```python
def repetir(veces):
    def decorador(func):
        def wrapper(*args, **kwargs):
            for _ in range(veces):
                func(*args, **kwargs)
        return wrapper
    return decorador

@repetir(3)
def saludar(nombre):
    print(f"Hola, {nombre}!")

saludar("Ana")
# Hola, Ana!
# Hola, Ana!
# Hola, Ana!
```

## 🔄 Múltiples Decoradores

```python
@decorador1
@decorador2
@decorador3
def funcion():
    pass

# Equivalente a:
# funcion = decorador1(decorador2(decorador3(funcion)))
```

## 💡 Decoradores de Clase

```python
def singleton(cls):
    """Asegura una sola instancia de la clase"""
    instancias = {}
    
    def get_instancia(*args, **kwargs):
        if cls not in instancias:
            instancias[cls] = cls(*args, **kwargs)
        return instancias[cls]
    
    return get_instancia

@singleton
class BaseDatos:
    def __init__(self):
        print("Conectando a BD...")

db1 = BaseDatos()  # Conectando a BD...
db2 = BaseDatos()  # No imprime (misma instancia)
print(db1 is db2)  # True
```

## 🛡️ functools.wraps

```python
from functools import wraps

def mi_decorador(func):
    @wraps(func)  # Preserva metadata de func
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@mi_decorador
def suma(a, b):
    """Suma dos números"""
    return a + b

print(suma.__name__)  # "suma" (sin @wraps sería "wrapper")
print(suma.__doc__)   # "Suma dos números"
```

## 📊 Decoradores Built-in

### @property

```python
class Persona:
    def __init__(self, nombre):
        self._nombre = nombre
    
    @property
    def nombre(self):
        return self._nombre
    
    @nombre.setter
    def nombre(self, valor):
        self._nombre = valor.strip().title()

p = Persona("ana")
print(p.nombre)  # "Ana"
p.nombre = "  juan  "
print(p.nombre)  # "Juan"
```

### @staticmethod y @classmethod

```python
class Matematicas:
    @staticmethod
    def sumar(a, b):
        return a + b
    
    @classmethod
    def desde_string(cls, operacion):
        # cls se refiere a la clase
        a, op, b = operacion.split()
        return int(a) + int(b)

print(Matematicas.sumar(5, 3))  # 8
print(Matematicas.desde_string("5 + 3"))  # 8
```

## 💪 Ejercicio: Cache Decorator

```python
# Crea un decorador que cachee resultados
@cache
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

<details>
<summary>✅ Solución</summary>

```python
def cache(func):
    almacenados = {}
    
    @wraps(func)
    def wrapper(*args):
        if args not in almacenados:
            almacenados[args] = func(*args)
        return almacenados[args]
    
    return wrapper

@cache
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(100))  # Rápido gracias al cache
```
</details>

## 🔗 Temas Relacionados

- [Funciones](../basico/funciones)
- [Clases](./clases)
- [Context Managers](./context-managers)

## 📚 Recursos Adicionales

- [Decorators](https://docs.python.org/3/glossary.html#term-decorator)
- [functools](https://docs.python.org/3/library/functools.html)

---

> 💡 **Tip**: Usa `@wraps` para preservar metadata de la función original.
