---
title: "Comprehensions"
level: intermedio
category: sintaxis
tags: [python, comprehensions, list, dict, set]
duration: 25min
prerequisites: [listas-tuplas, diccionarios]
---

# Comprehensions en Python

## 📋 List Comprehensions

Forma concisa de crear listas:

```python
# Forma tradicional
cuadrados = []
for x in range(10):
    cuadrados.append(x**2)

# List comprehension
cuadrados = [x**2 for x in range(10)]
print(cuadrados)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# Con condición
pares = [x for x in range(20) if x % 2 == 0]
print(pares)  # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# Con transformación y filtro
numeros = [1, 2, 3, 4, 5]
dobles_pares = [x * 2 for x in numeros if x % 2 == 0]
print(dobles_pares)  # [4, 8]
```

## 🗺️ Dict Comprehensions

```python
# Crear diccionario
cuadrados = {x: x**2 for x in range(6)}
print(cuadrados)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Invertir diccionario
original = {"a": 1, "b": 2, "c": 3}
invertido = {v: k for k, v in original.items()}
print(invertido)  # {1: 'a', 2: 'b', 3: 'c'}

# Filtrar
numeros = {"a": 1, "b": 2, "c": 3, "d": 4}
pares = {k: v for k, v in numeros.items() if v % 2 == 0}
print(pares)  # {'b': 2, 'd': 4}

# Transformar valores
precios = {"laptop": 1000, "mouse": 25, "teclado": 75}
con_impuesto = {k: v * 1.16 for k, v in precios.items()}
print(con_impuesto)  # {'laptop': 1160.0, 'mouse': 29.0, 'teclado': 87.0}
```

## 🎯 Set Comprehensions

```python
# Crear set
cuadrados = {x**2 for x in range(10)}
print(cuadrados)  # {0, 1, 4, 9, 16, 25, 36, 49, 64, 81}

# Letras únicas
texto = "programming"
letras = {letra for letra in texto}
print(letras)  # {'a', 'g', 'i', 'm', 'n', 'o', 'p', 'r'}

# Filtrar
numeros = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
impares = {x for x in numeros if x % 2 != 0}
print(impares)  # {1, 3, 5, 7, 9}
```

## 🔄 Comprehensions Anidadas

```python
# Matriz
matriz = [[i * j for j in range(1, 4)] for i in range(1, 4)]
print(matriz)
# [[1, 2, 3],
#  [2, 4, 6],
#  [3, 6, 9]]

# Aplanar lista de listas
lista_anidada = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
aplanada = [item for sublista in lista_anidada for item in sublista]
print(aplanada)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Combinaciones
colores = ["rojo", "verde"]
objetos = ["casa", "coche"]
combinaciones = [f"{color} {objeto}" for color in colores for objeto in objetos]
print(combinaciones)
# ['rojo casa', 'rojo coche', 'verde casa', 'verde coche']
```

## 💡 Ejemplo: Procesamiento de Datos

```python
# Datos de estudiantes
estudiantes = [
    {"nombre": "Ana", "notas": [85, 90, 88]},
    {"nombre": "Juan", "notas": [75, 80, 72]},
    {"nombre": "Pedro", "notas": [90, 95, 92]},
    {"nombre": "María", "notas": [65, 70, 68]},
]

# Calcular promedios
promedios = {
    est["nombre"]: sum(est["notas"]) / len(est["notas"])
    for est in estudiantes
}
print(promedios)
# {'Ana': 87.67, 'Juan': 75.67, 'Pedro': 92.33, 'María': 67.67}

# Filtrar aprobados (promedio >= 80)
aprobados = [
    est["nombre"]
    for est in estudiantes
    if sum(est["notas"]) / len(est["notas"]) >= 80
]
print(aprobados)  # ['Ana', 'Pedro']

# Mejores notas por estudiante
mejores_notas = {
    est["nombre"]: max(est["notas"])
    for est in estudiantes
}
print(mejores_notas)
# {'Ana': 90, 'Juan': 80, 'Pedro': 95, 'María': 70}
```

## 🎨 Expresiones Condicionales

```python
# if-else en comprehension
numeros = [1, 2, 3, 4, 5]
resultado = ["par" if x % 2 == 0 else "impar" for x in numeros]
print(resultado)  # ['impar', 'par', 'impar', 'par', 'impar']

# Solo filtro (sin else)
pares = [x for x in numeros if x % 2 == 0]

# Transformación con condición
valores = [10, -5, 3, -8, 15]
absolutos_positivos = [abs(x) for x in valores if x < 0]
print(absolutos_positivos)  # [5, 8]
```

## 📊 Casos de Uso Comunes

### 1. Filtrar y Transformar

```python
# Convertir a mayúsculas solo palabras largas
palabras = ["hola", "mundo", "python", "es", "genial"]
mayusculas = [p.upper() for p in palabras if len(p) > 4]
print(mayusculas)  # ['MUNDO', 'PYTHON', 'GENIAL']
```

### 2. Extraer Datos

```python
# Extraer emails de usuarios
usuarios = [
    {"nombre": "Ana", "email": "ana@mail.com", "activo": True},
    {"nombre": "Juan", "email": "juan@mail.com", "activo": False},
    {"nombre": "Pedro", "email": "pedro@mail.com", "activo": True},
]

emails_activos = [u["email"] for u in usuarios if u["activo"]]
print(emails_activos)  # ['ana@mail.com', 'pedro@mail.com']
```

### 3. Crear Lookup Table

```python
# Diccionario de búsqueda rápida
productos = [
    {"id": 1, "nombre": "Laptop", "precio": 999},
    {"id": 2, "nombre": "Mouse", "precio": 25},
    {"id": 3, "nombre": "Teclado", "precio": 75},
]

lookup = {p["id"]: p for p in productos}
print(lookup[2])  # {'id': 2, 'nombre': 'Mouse', 'precio': 25}
```

## ⚠️ Cuándo NO Usar Comprehensions

```python
# ❌ Demasiado complejo
resultado = [
    x * y
    for x in range(10) if x % 2 == 0
    for y in range(10) if y % 3 == 0
    if (x + y) % 2 == 0
]

# ✅ Mejor con bucles normales
resultado = []
for x in range(10):
    if x % 2 == 0:
        for y in range(10):
            if y % 3 == 0 and (x + y) % 2 == 0:
                resultado.append(x * y)
```

## 💪 Ejercicios

### Ejercicio: Palabras Únicas

```python
texto = "el sol es una estrella el sol brilla"
# Crea un set con palabras únicas de 3+ letras
```

<details>
<summary>✅ Solución</summary>

```python
texto = "el sol es una estrella el sol brilla"
palabras_unicas = {palabra for palabra in texto.split() if len(palabra) >= 3}
print(palabras_unicas)  # {'sol', 'una', 'estrella', 'brilla'}
```
</details>

## 🔗 Temas Relacionados

- [Listas](../basico/listas-tuplas)
- [Diccionarios](../basico/diccionarios)
- [Funcional](./funcional)

## 📚 Recursos Adicionales

- [List Comprehensions](https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions)
- [PEP 202](https://www.python.org/dev/peps/pep-0202/)

---

> 💡 **Tip**: Usa comprehensions para operaciones simples. Si es complejo, usa bucles normales.
