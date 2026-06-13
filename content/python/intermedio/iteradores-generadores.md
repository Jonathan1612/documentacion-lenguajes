---
title: "Iteradores y Generadores"
level: intermedio
category: avanzado
tags: [python, iteradores, generadores, yield, iterator]
duration: 35min
prerequisites: [funciones, clases]
---

# Iteradores y Generadores

## 🔄 Iteradores

Un **iterador** es un objeto que implementa `__iter__()` y `__next__()`.

```python
# Lista es iterable
lista = [1, 2, 3]
iterador = iter(lista)  # Obtener iterador

print(next(iterador))  # 1
print(next(iterador))  # 2
print(next(iterador))  # 3
# print(next(iterador))  # StopIteration
```

### Crear Iterador Personalizado

```python
class Contador:
    def __init__(self, inicio, fin):
        self.actual = inicio
        self.fin = fin
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.actual >= self.fin:
            raise StopIteration
        valor = self.actual
        self.actual += 1
        return valor

# Uso
for num in Contador(1, 5):
    print(num)  # 1, 2, 3, 4
```

## ⚡ Generadores con yield

Los **generadores** son una forma más simple de crear iteradores.

```python
def contador(inicio, fin):
    while inicio < fin:
        yield inicio  # Pausa y retorna valor
        inicio += 1

# Uso
for num in contador(1, 5):
    print(num)  # 1, 2, 3, 4

# El generador es lazy (no calcula todo de inmediato)
gen = contador(1, 1000000)  # No usa memoria para 1M de números
print(next(gen))  # 1
print(next(gen))  # 2
```

### Ventajas de Generadores

```python
# ❌ Lista: usa mucha memoria
def numeros_lista(n):
    return [i**2 for i in range(n)]

lista = numeros_lista(1000000)  # Ocupa ~8MB

# ✅ Generador: eficiente en memoria
def numeros_generador(n):
    for i in range(n):
        yield i**2

gen = numeros_generador(1000000)  # Casi sin memoria
```

## 🎯 Expresiones Generadoras

```python
# List comprehension
cuadrados_lista = [x**2 for x in range(10)]

# Generator expression (usa paréntesis)
cuadrados_gen = (x**2 for x in range(10))

print(type(cuadrados_lista))  # <class 'list'>
print(type(cuadrados_gen))    # <class 'generator'>

# Uso
for cuadrado in cuadrados_gen:
    print(cuadrado)
```

## 💡 Ejemplo: Leer Archivo Grande

```python
def leer_lineas_grandes(archivo):
    """Generador para archivos grandes"""
    with open(archivo, 'r') as f:
        for linea in f:
            # Procesar línea
            linea = linea.strip()
            if linea:
                yield linea

# Uso eficiente (no carga todo el archivo en memoria)
for linea in leer_lineas_grandes("archivo_grande.txt"):
    print(linea)
```

## 🔗 yield from

```python
def generador1():
    yield 1
    yield 2

def generador2():
    yield 3
    yield 4

def combinado():
    yield from generador1()  # Delega al generador
    yield from generador2()

for num in combinado():
    print(num)  # 1, 2, 3, 4
```

## 🎨 Generador de Fibonacci

```python
def fibonacci(limite):
    a, b = 0, 1
    while a < limite:
        yield a
        a, b = b, a + b

# Primeros números de Fibonacci menores que 100
for num in fibonacci(100):
    print(num, end=" ")
# 0 1 1 2 3 5 8 13 21 34 55 89
```

## 📊 send() y Comunicación Bidireccional

```python
def acumulador():
    total = 0
    while True:
        valor = yield total  # Recibe y envía
        if valor is None:
            break
        total += valor

gen = acumulador()
next(gen)  # Inicializar

print(gen.send(10))  # 10
print(gen.send(20))  # 30
print(gen.send(5))   # 35
gen.send(None)  # Terminar
```

## 💪 Ejercicios

### Ejercicio 1: Generador de Primos

```python
def primos(limite):
    """Genera números primos hasta limite"""
    # Tu código aquí
    pass

for p in primos(20):
    print(p)  # 2, 3, 5, 7, 11, 13, 17, 19
```

<details>
<summary>✅ Solución</summary>

```python
def primos(limite):
    def es_primo(n):
        if n < 2:
            return False
        for i in range(2, int(n**0.5) + 1):
            if n % i == 0:
                return False
        return True
    
    for num in range(2, limite):
        if es_primo(num):
            yield num

for p in primos(20):
    print(p)
```
</details>

## 🔗 Temas Relacionados

- [Funciones](../basico/funciones)
- [Comprehensions](./comprehensions)
- [Async/Await](../avanzado/asyncio)

## 📚 Recursos Adicionales

- [Iterators](https://docs.python.org/3/tutorial/classes.html#iterators)
- [Generators](https://docs.python.org/3/tutorial/classes.html#generators)

---

> 💡 **Tip**: Usa generadores para procesar grandes volúmenes de datos sin cargar todo en memoria.
