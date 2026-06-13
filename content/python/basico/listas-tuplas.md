---
title: "Listas y Tuplas"
level: basico
category: estructuras-datos
tags: [python, listas, tuplas, list, tuple, slicing, comprehension]
duration: 30min
prerequisites: [funciones]
---

# Listas y Tuplas en Python

## 📋 Listas (list)

Las **listas** son colecciones ordenadas y **mutables** (se pueden modificar) de elementos.

### Crear Listas

```python
# Lista vacía
vacia = []
vacia2 = list()

# Con elementos
numeros = [1, 2, 3, 4, 5]
frutas = ["manzana", "banana", "naranja"]
mixta = [1, "texto", 3.14, True]  # Tipos mezclados

# Lista de listas (matriz)
matriz = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
```

### Acceder a Elementos

```python
frutas = ["manzana", "banana", "naranja", "uva"]

# Índices positivos (desde 0)
print(frutas[0])   # "manzana"
print(frutas[2])   # "naranja"

# Índices negativos (desde el final)
print(frutas[-1])  # "uva" (último)
print(frutas[-2])  # "naranja" (penúltimo)

# IndexError
# print(frutas[10])  # IndexError: list index out of range
```

### Slicing (Rebanadas)

```python
numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# [inicio:fin] - fin NO incluido
print(numeros[2:5])    # [2, 3, 4]
print(numeros[:3])     # [0, 1, 2] (desde el inicio)
print(numeros[7:])     # [7, 8, 9] (hasta el final)
print(numeros[:])      # [0, 1, ..., 9] (copia)

# [inicio:fin:paso]
print(numeros[::2])    # [0, 2, 4, 6, 8] (cada 2)
print(numeros[1::2])   # [1, 3, 5, 7, 9] (impares)
print(numeros[::-1])   # [9, 8, ..., 0] (invertir)
```

### Modificar Listas

```python
frutas = ["manzana", "banana", "naranja"]

# Cambiar elemento
frutas[1] = "pera"
print(frutas)  # ["manzana", "pera", "naranja"]

# Agregar elementos
frutas.append("uva")          # Agregar al final
frutas.insert(1, "kiwi")      # Insertar en posición
frutas.extend(["mango", "sandía"])  # Agregar varios

# Eliminar elementos
frutas.remove("kiwi")         # Eliminar por valor
ultimo = frutas.pop()         # Eliminar y retornar último
segundo = frutas.pop(1)       # Eliminar por índice
del frutas[0]                 # Eliminar por índice
frutas.clear()                # Vaciar lista
```

### Métodos de Lista

```python
numeros = [3, 1, 4, 1, 5, 9, 2, 6]

# Ordenar
numeros.sort()               # Modificar en sitio
print(numeros)               # [1, 1, 2, 3, 4, 5, 6, 9]

ordenada = sorted(numeros)   # Nueva lista ordenada
numeros.sort(reverse=True)   # Orden descendente

# Buscar
print(numeros.index(5))      # 3 (índice del 5)
print(numeros.count(1))      # 2 (apariciones del 1)

# Invertir
numeros.reverse()            # Modificar en sitio

# Longitud
print(len(numeros))          # 8
```

### List Comprehensions

Crear listas de forma concisa:

```python
# Sintaxis: [expresion for item in iterable if condicion]

# Cuadrados del 1 al 10
cuadrados = [x**2 for x in range(1, 11)]
# [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# Solo pares
pares = [x for x in range(20) if x % 2 == 0]
# [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# Con strings
nombres = ["ana", "juan", "pedro"]
mayusculas = [n.upper() for n in nombres]
# ["ANA", "JUAN", "PEDRO"]

# Anidadas (matriz)
matriz = [[i*j for j in range(1, 4)] for i in range(1, 4)]
# [[1, 2, 3], [2, 4, 6], [3, 6, 9]]
```

### Operaciones con Listas

```python
# Concatenación
lista1 = [1, 2, 3]
lista2 = [4, 5, 6]
combinada = lista1 + lista2  # [1, 2, 3, 4, 5, 6]

# Repetición
repetida = [0] * 5  # [0, 0, 0, 0, 0]

# Pertenencia
print(2 in lista1)      # True
print(10 not in lista1) # True

# Min, Max, Sum
numeros = [5, 2, 8, 1, 9]
print(min(numeros))  # 1
print(max(numeros))  # 9
print(sum(numeros))  # 25
```

## 📦 Tuplas (tuple)

Las **tuplas** son colecciones ordenadas e **inmutables** (no se pueden modificar).

### Crear Tuplas

```python
# Tupla vacía
vacia = ()
vacia2 = tuple()

# Con elementos
coordenadas = (10, 20)
persona = ("Ana", 25, "Madrid")

# Tupla de un elemento (necesita coma)
un_elemento = (42,)  # Con coma
no_tupla = (42)      # Sin coma es int

# Sin paréntesis (tuple packing)
punto = 10, 20, 30
print(type(punto))  # <class 'tuple'>
```

### Acceder a Elementos

```python
persona = ("Ana", 25, "Madrid")

# Igual que listas
print(persona[0])   # "Ana"
print(persona[-1])  # "Madrid"

# Slicing
print(persona[1:])  # (25, "Madrid")

# Desempaquetar (tuple unpacking)
nombre, edad, ciudad = persona
print(f"{nombre} tiene {edad} años")

# Con *
primero, *resto = (1, 2, 3, 4, 5)
print(primero)  # 1
print(resto)    # [2, 3, 4, 5] (se convierte en lista)
```

### Inmutabilidad

```python
tupla = (1, 2, 3)

# ❌ No se puede modificar
# tupla[0] = 10  # TypeError: 'tuple' object does not support item assignment
# tupla.append(4)  # AttributeError

# ✅ Convertir a lista para modificar
lista = list(tupla)
lista.append(4)
tupla = tuple(lista)
```

### ¿Cuándo Usar Tuplas?

| Usar Tupla | Usar Lista |
|------------|------------|
| Datos que no cambiarán | Datos que sí cambiarán |
| Claves de diccionario | Colecciones modificables |
| Return de múltiples valores | Agregar/eliminar elementos |
| Coordenadas (x, y) | Listas dinámicas |
| Más rápidas | Más flexibles |

## 💡 Ejemplo Completo: Gestión de Tareas

```python
# Lista de tareas
tareas = [
    {"id": 1, "titulo": "Estudiar Python", "completada": False},
    {"id": 2, "titulo": "Hacer ejercicio", "completada": True},
    {"id": 3, "titulo": "Leer libro", "completada": False},
]

def mostrar_tareas():
    print("\n=== Lista de Tareas ===")
    for tarea in tareas:
        estado = "✅" if tarea["completada"] else "❌"
        print(f"{estado} {tarea['id']}. {tarea['titulo']}")

def agregar_tarea(titulo):
    nuevo_id = max([t["id"] for t in tareas]) + 1 if tareas else 1
    tareas.append({"id": nuevo_id, "titulo": titulo, "completada": False})
    print(f"✅ Tarea '{titulo}' agregada")

def completar_tarea(id):
    for tarea in tareas:
        if tarea["id"] == id:
            tarea["completada"] = True
            print(f"✅ Tarea {id} completada")
            return
    print(f"❌ Tarea {id} no encontrada")

# Uso
mostrar_tareas()
agregar_tarea("Practicar código")
completar_tarea(1)
mostrar_tareas()
```

## 📊 Métodos Comparados

| Método | Lista | Tupla | Descripción |
|--------|-------|-------|-------------|
| `len()` | ✅ | ✅ | Longitud |
| `count()` | ✅ | ✅ | Contar elemento |
| `index()` | ✅ | ✅ | Buscar índice |
| `append()` | ✅ | ❌ | Agregar al final |
| `insert()` | ✅ | ❌ | Insertar en posición |
| `remove()` | ✅ | ❌ | Eliminar por valor |
| `pop()` | ✅ | ❌ | Eliminar por índice |
| `sort()` | ✅ | ❌ | Ordenar |
| `reverse()` | ✅ | ❌ | Invertir |

## 💪 Ejercicios Prácticos

### Ejercicio 1: Filtrar Pares

```python
numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
# Crea una lista solo con los pares usando list comprehension
```

<details>
<summary>✅ Solución</summary>

```python
numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
pares = [n for n in numeros if n % 2 == 0]
print(pares)  # [2, 4, 6, 8, 10]
```
</details>

### Ejercicio 2: Eliminar Duplicados

```python
lista = [1, 2, 2, 3, 4, 4, 5]
# Elimina duplicados manteniendo el orden
```

<details>
<summary>✅ Solución</summary>

```python
lista = [1, 2, 2, 3, 4, 4, 5]
sin_duplicados = list(dict.fromkeys(lista))
# O usando set y sorted (pero cambia orden):
# sin_duplicados = sorted(set(lista))
print(sin_duplicados)  # [1, 2, 3, 4, 5]
```
</details>

## ⚠️ Errores Comunes

```python
# 1. Modificar lista durante iteración
numeros = [1, 2, 3, 4, 5]
# ❌ Comportamiento inesperado
for num in numeros:
    if num % 2 == 0:
        numeros.remove(num)

# ✅ Crear nueva lista
numeros = [num for num in numeros if num % 2 != 0]

# 2. Copiar listas
original = [1, 2, 3]
# ❌ Referencia, no copia
copia = original
copia.append(4)
print(original)  # [1, 2, 3, 4] ¡Modificado!

# ✅ Copia real
copia = original.copy()  # o original[:]
```

## 🔗 Temas Relacionados

- [Diccionarios](./diccionarios)
- [Sets](./sets)
- [Comprehensions](../intermedio/comprehensions)
- [Iteradores](../intermedio/iteradores-generadores)

## 📚 Recursos Adicionales

- [List Tutorial](https://docs.python.org/3/tutorial/datastructures.html#more-on-lists)
- [Tuple Methods](https://docs.python.org/3/tutorial/datastructures.html#tuples-and-sequences)

---

> 💡 **Tip**: Usa tuplas para datos que no cambiarán (coordenadas, retornos), y listas para colecciones dinámicas.
