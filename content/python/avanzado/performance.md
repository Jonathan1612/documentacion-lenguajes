---
title: "Optimización y Performance"
level: avanzado
category: performance
tags: [python, performance, profiling, optimization, timeit]
duration: 40min
prerequisites: [funciones, clases]
---

# Optimización y Performance en Python

## ⏱️ timeit - Medir Tiempo

```python
import timeit

# Medir expresión simple
tiempo = timeit.timeit("sum(range(100))", number=10000)
print(f"Tiempo: {tiempo:.4f} segundos")

# Medir función
def mi_funcion():
    return sum(range(100))

tiempo = timeit.timeit(mi_funcion, number=10000)
print(f"Tiempo: {tiempo:.4f} segundos")

# Comparar alternativas
t1 = timeit.timeit("'-'.join(str(i) for i in range(100))", number=10000)
t2 = timeit.timeit("'-'.join([str(i) for i in range(100)])", number=10000)
t3 = timeit.timeit("'-'.join(map(str, range(100)))", number=10000)

print(f"Generator: {t1:.4f}")
print(f"List comp: {t2:.4f}")
print(f"Map:       {t3:.4f}")
```

## 📊 cProfile - Profiling Detallado

```python
import cProfile
import pstats

def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

def calcular():
    for i in range(20):
        fibonacci(i)

# Profiling
cProfile.run('calcular()', 'stats.prof')

# Ver resultados
stats = pstats.Stats('stats.prof')
stats.sort_stats('cumulative')
stats.print_stats(10)  # Top 10 funciones
```

```bash
# Desde terminal
python -m cProfile -o stats.prof script.py

# Ver resultados
python -m pstats stats.prof
>>> sort cumtime
>>> stats 10
```

## 💡 Decorador de Timing

```python
import time
from functools import wraps

def timing(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        inicio = time.time()
        resultado = func(*args, **kwargs)
        fin = time.time()
        print(f"{func.__name__} tomó {fin - inicio:.4f}s")
        return resultado
    return wrapper

@timing
def proceso_lento():
    time.sleep(1)
    return sum(range(1000000))

proceso_lento()  # proceso_lento tomó 1.0234s
```

## 🚀 List Comprehensions vs Loops

```python
import timeit

# Loop tradicional
def con_loop():
    resultado = []
    for i in range(1000):
        resultado.append(i * 2)
    return resultado

# List comprehension
def con_comprehension():
    return [i * 2 for i in range(1000)]

t1 = timeit.timeit(con_loop, number=10000)
t2 = timeit.timeit(con_comprehension, number=10000)

print(f"Loop:          {t1:.4f}s")
print(f"Comprehension: {t2:.4f}s")
# Comprehension es ~2x más rápido
```

## 🎯 Generadores vs Listas

```python
import sys

# Lista - Todo en memoria
lista = [i for i in range(1000000)]
print(f"Lista: {sys.getsizeof(lista):,} bytes")

# Generador - Lazy evaluation
generador = (i for i in range(1000000))
print(f"Generador: {sys.getsizeof(generador):,} bytes")

# Lista: 8,697,464 bytes
# Generador: 104 bytes
```

## 📈 Memory Profiler

```bash
# Instalar
pip install memory-profiler

# Usar en código
from memory_profiler import profile

@profile
def mi_funcion():
    lista1 = [i for i in range(100000)]
    lista2 = [i * 2 for i in range(100000)]
    return sum(lista1) + sum(lista2)

mi_funcion()
```

```bash
# Desde terminal
python -m memory_profiler script.py
```

## 💪 Optimizaciones Comunes

### 1. Usar Sets para Búsquedas

```python
import timeit

# Lista (O(n))
def buscar_en_lista():
    lista = list(range(10000))
    return 9999 in lista

# Set (O(1))
def buscar_en_set():
    conjunto = set(range(10000))
    return 9999 in conjunto

t1 = timeit.timeit(buscar_en_lista, number=10000)
t2 = timeit.timeit(buscar_en_set, number=10000)

print(f"Lista: {t1:.4f}s")
print(f"Set:   {t2:.4f}s")
# Set es ~1000x más rápido
```

### 2. String Concatenation

```python
import timeit

# ❌ Lento - Strings son inmutables
def concatenar_lento():
    resultado = ""
    for i in range(1000):
        resultado += str(i)
    return resultado

# ✅ Rápido - join()
def concatenar_rapido():
    return "".join(str(i) for i in range(1000))

t1 = timeit.timeit(concatenar_lento, number=1000)
t2 = timeit.timeit(concatenar_rapido, number=1000)

print(f"+=:   {t1:.4f}s")
print(f"join: {t2:.4f}s")
# join es ~10x más rápido
```

### 3. Local vs Global Variables

```python
import timeit

# Global
VALOR = 10

def con_global():
    for _ in range(10000):
        x = VALOR * 2

# Local
def con_local():
    valor = 10
    for _ in range(10000):
        x = valor * 2

t1 = timeit.timeit(con_global, number=1000)
t2 = timeit.timeit(con_local, number=1000)

print(f"Global: {t1:.4f}s")
print(f"Local:  {t2:.4f}s")
# Local es ~20% más rápido
```

### 4. dict.get() vs try/except

```python
import timeit

datos = {i: i for i in range(1000)}

# Con get()
def con_get():
    for i in range(2000):
        valor = datos.get(i, None)

# Con try/except (si la clave suele existir)
def con_try():
    for i in range(2000):
        try:
            valor = datos[i]
        except KeyError:
            valor = None

t1 = timeit.timeit(con_get, number=1000)
t2 = timeit.timeit(con_try, number=1000)

print(f"get():      {t1:.4f}s")
print(f"try/except: {t2:.4f}s")
```

## 🔧 __slots__ - Reducir Memoria

```python
import sys

# Sin __slots__
class PersonaNormal:
    def __init__(self, nombre, edad):
        self.nombre = nombre
        self.edad = edad

# Con __slots__
class PersonaOptimizada:
    __slots__ = ['nombre', 'edad']
    
    def __init__(self, nombre, edad):
        self.nombre = nombre
        self.edad = edad

p1 = PersonaNormal("Ana", 25)
p2 = PersonaOptimizada("Ana", 25)

print(f"Sin slots: {sys.getsizeof(p1.__dict__)} bytes")
print(f"Con slots: {sys.getsizeof(p2)} bytes")
# ~50% menos memoria
```

## 💡 Ejemplo: Fibonacci Optimizado

```python
import timeit
from functools import lru_cache

# ❌ Lento - O(2^n)
def fib_lento(n):
    if n < 2:
        return n
    return fib_lento(n-1) + fib_lento(n-2)

# ✅ Rápido - O(n) con cache
@lru_cache(maxsize=None)
def fib_rapido(n):
    if n < 2:
        return n
    return fib_rapido(n-1) + fib_rapido(n-2)

# ✅ Más rápido - Iterativo O(n)
def fib_iterativo(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

t1 = timeit.timeit(lambda: fib_lento(20), number=10)
t2 = timeit.timeit(lambda: fib_rapido(20), number=10)
t3 = timeit.timeit(lambda: fib_iterativo(20), number=10)

print(f"Recursivo:  {t1:.4f}s")
print(f"Con cache:  {t2:.4f}s")
print(f"Iterativo:  {t3:.4f}s")
```

## 📊 NumPy para Operaciones Numéricas

```python
import timeit
import numpy as np

# Python puro
def suma_python():
    lista = list(range(100000))
    return [x * 2 for x in lista]

# NumPy
def suma_numpy():
    array = np.arange(100000)
    return array * 2

t1 = timeit.timeit(suma_python, number=100)
t2 = timeit.timeit(suma_numpy, number=100)

print(f"Python: {t1:.4f}s")
print(f"NumPy:  {t2:.4f}s")
# NumPy es ~10-100x más rápido para arrays grandes
```

## 🎯 Reglas de Oro

1. **Mide antes de optimizar** - "Premature optimization is the root of all evil"
2. **Usa estructuras correctas** - Sets para búsquedas, deque para colas
3. **Evita copias innecesarias** - Usa generadores cuando puedas
4. **Cache resultados costosos** - `@lru_cache` es tu amigo
5. **Elige el algoritmo correcto** - O(n²) vs O(n log n) importa

## 💪 Ejercicio: Optimizar Código

```python
# Optimiza esta función para encontrar números primos
def es_primo_lento(n):
    if n < 2:
        return False
    for i in range(2, n):
        if n % i == 0:
            return False
    return True

# Encuentra primos hasta 10000
primos = [n for n in range(10000) if es_primo_lento(n)]
```

<details>
<summary>✅ Solución</summary>

```python
import math

def es_primo_rapido(n):
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    
    # Solo revisar hasta √n
    # Solo revisar números impares
    for i in range(3, int(math.sqrt(n)) + 1, 2):
        if n % i == 0:
            return False
    return True

# Mucho más rápido
primos = [n for n in range(10000) if es_primo_rapido(n)]

# Mejoras:
# 1. Revisar solo hasta √n (en vez de n)
# 2. Saltar números pares (excepto 2)
# 3. Resultado: ~100x más rápido
```
</details>

## 🔗 Temas Relacionados

- [Funciones](../basico/funciones)
- [Comprehensions](../intermedio/comprehensions)
- [Concurrencia](./concurrencia)

## 📚 Recursos Adicionales

- [timeit](https://docs.python.org/3/library/timeit.html)
- [cProfile](https://docs.python.org/3/library/profile.html)
- [Performance Tips](https://wiki.python.org/moin/PythonSpeed/PerformanceTips)

---

> 💡 **Tip**: Primero haz que funcione, luego hazlo correcto, finalmente hazlo rápido.
