---
title: "Programación Funcional"
level: intermedio
category: paradigmas
tags: [python, funcional, lambda, map, filter, reduce]
duration: 30min
prerequisites: [funciones]
---

# Programación Funcional en Python

## 🔧 Funciones Lambda

Funciones anónimas de una línea:

```python
# Función normal
def cuadrado(x):
    return x ** 2

# Lambda equivalente
cuadrado = lambda x: x ** 2

print(cuadrado(5))  # 25

# Comúnmente usadas inline
numeros = [1, 2, 3, 4, 5]
cuadrados = list(map(lambda x: x**2, numeros))
print(cuadrados)  # [1, 4, 9, 16, 25]
```

## 🗺️ map()

Aplica función a cada elemento:

```python
numeros = [1, 2, 3, 4, 5]

# map con función
cuadrados = list(map(lambda x: x**2, numeros))
print(cuadrados)  # [1, 4, 9, 16, 25]

# Múltiples iterables
nums1 = [1, 2, 3]
nums2 = [10, 20, 30]
sumas = list(map(lambda x, y: x + y, nums1, nums2))
print(sumas)  # [11, 22, 33]
```

## 🔍 filter()

Filtra elementos que cumplen condición:

```python
numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Filtrar pares
pares = list(filter(lambda x: x % 2 == 0, numeros))
print(pares)  # [2, 4, 6, 8, 10]

# Filtrar positivos
numeros = [-5, -3, 0, 2, 4, -1]
positivos = list(filter(lambda x: x > 0, numeros))
print(positivos)  # [2, 4]
```

## 📉 reduce()

Reduce secuencia a un valor:

```python
from functools import reduce

numeros = [1, 2, 3, 4, 5]

# Sumar todos
total = reduce(lambda acc, x: acc + x, numeros)
print(total)  # 15

# Multiplicar todos
producto = reduce(lambda acc, x: acc * x, numeros)
print(producto)  # 120

# Con valor inicial
total = reduce(lambda acc, x: acc + x, numeros, 10)
print(total)  # 25 (10 + 1 + 2 + 3 + 4 + 5)
```

## 🎯 Funciones de Orden Superior

Funciones que reciben o retornan funciones:

```python
def aplicar_dos_veces(func, valor):
    return func(func(valor))

def incrementar(x):
    return x + 1

resultado = aplicar_dos_veces(incrementar, 5)
print(resultado)  # 7

# Retornar función
def crear_multiplicador(factor):
    return lambda x: x * factor

multiplicar_por_3 = crear_multiplicador(3)
print(multiplicar_por_3(10))  # 30
```

## 🔄 zip()

Combina múltiples iterables:

```python
nombres = ["Ana", "Juan", "Pedro"]
edades = [25, 30, 28]
ciudades = ["Madrid", "Barcelona", "Valencia"]

# Combinar
for nombre, edad, ciudad in zip(nombres, edades, ciudades):
    print(f"{nombre}, {edad} años, {ciudad}")

# A diccionario
personas = dict(zip(nombres, edades))
print(personas)  # {'Ana': 25, 'Juan': 30, 'Pedro': 28}
```

## 📊 all() y any()

```python
numeros = [2, 4, 6, 8]

# all() - todos True
print(all(x % 2 == 0 for x in numeros))  # True (todos pares)

# any() - alguno True
numeros = [1, 3, 5, 6]
print(any(x % 2 == 0 for x in numeros))  # True (6 es par)

# Validación
datos = ["", "texto", "otro"]
print(all(datos))  # False (primer string vacío)
```

## 💡 Ejemplo Completo: Procesamiento de Datos

```python
from functools import reduce

# Datos de ventas
ventas = [
    {"producto": "Laptop", "precio": 999, "cantidad": 2},
    {"producto": "Mouse", "precio": 25, "cantidad": 5},
    {"producto": "Teclado", "precio": 75, "cantidad": 3},
    {"producto": "Monitor", "precio": 300, "cantidad": 1},
]

# 1. Calcular total por venta
totales = list(map(lambda v: v["precio"] * v["cantidad"], ventas))
print("Totales:", totales)  # [1998, 125, 225, 300]

# 2. Filtrar ventas > 200
ventas_grandes = list(filter(lambda v: v["precio"] * v["cantidad"] > 200, ventas))
print("Ventas grandes:", len(ventas_grandes))  # 3

# 3. Total general
total_general = reduce(lambda acc, v: acc + v["precio"] * v["cantidad"], ventas, 0)
print(f"Total general: ${total_general}")  # $2648

# 4. Nombres de productos caros (precio > 50)
productos_caros = list(map(
    lambda v: v["producto"],
    filter(lambda v: v["precio"] > 50, ventas)
))
print("Productos caros:", productos_caros)  # ['Laptop', 'Teclado', 'Monitor']
```

## 🔧 sorted() con key

```python
personas = [
    {"nombre": "Ana", "edad": 25},
    {"nombre": "Juan", "edad": 30},
    {"nombre": "Pedro", "edad": 20},
]

# Ordenar por edad
ordenadas = sorted(personas, key=lambda p: p["edad"])
print([p["nombre"] for p in ordenadas])  # ['Pedro', 'Ana', 'Juan']

# Ordenar por nombre
ordenadas = sorted(personas, key=lambda p: p["nombre"])
print([p["nombre"] for p in ordenadas])  # ['Ana', 'Juan', 'Pedro']
```

## 💪 Ejercicios

### Ejercicio: Pipeline de Transformación

```python
numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
# 1. Filtrar pares
# 2. Elevar al cuadrado
# 3. Sumar todos
```

<details>
<summary>✅ Solución</summary>

```python
from functools import reduce

numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

resultado = reduce(
    lambda acc, x: acc + x,
    map(lambda x: x**2,
        filter(lambda x: x % 2 == 0, numeros))
)
print(resultado)  # 220 (4+16+36+64+100)

# O más legible:
pares = filter(lambda x: x % 2 == 0, numeros)
cuadrados = map(lambda x: x**2, pares)
total = reduce(lambda acc, x: acc + x, cuadrados)
print(total)  # 220
```
</details>

## 🔗 Temas Relacionados

- [Funciones](../basico/funciones)
- [Comprehensions](./comprehensions)
- [Iteradores](./iteradores-generadores)

## 📚 Recursos Adicionales

- [Functional Programming](https://docs.python.org/3/howto/functional.html)
- [functools](https://docs.python.org/3/library/functools.html)

---

> 💡 **Tip**: List comprehensions suelen ser más legibles que map/filter en Python.
