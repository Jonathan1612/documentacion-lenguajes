---
title: "Diccionarios"
level: basico
category: estructuras-datos
tags: [python, diccionarios, dict, key, value, hash]
duration: 30min
prerequisites: [listas-tuplas]
---

# Diccionarios en Python

## 📋 ¿Qué son los Diccionarios?

Los **diccionarios** (`dict`) son colecciones de pares **clave-valor** desordenadas (desde Python 3.7+ mantienen el orden de inserción) y mutables.

```python
# Sintaxis
diccionario = {
    "clave1": "valor1",
    "clave2": "valor2",
    "clave3": "valor3"
}
```

## 🔧 Crear Diccionarios

### Diferentes Formas

```python
# Vacío
vacio = {}
vacio2 = dict()

# Con datos
persona = {
    "nombre": "Ana",
    "edad": 25,
    "ciudad": "Madrid"
}

# Con dict()
persona2 = dict(nombre="Juan", edad=30, ciudad="Barcelona")

# Desde listas de tuplas
pares = [("a", 1), ("b", 2), ("c", 3)]
diccionario = dict(pares)  # {"a": 1, "b": 2, "c": 3}

# Con dict.fromkeys()
claves = ["x", "y", "z"]
diccionario = dict.fromkeys(claves, 0)  # {"x": 0, "y": 0, "z": 0}
```

### Claves Válidas

```python
# Claves: deben ser inmutables (str, int, float, tuple)
valido = {
    "nombre": "Ana",              # str ✅
    42: "respuesta",              # int ✅
    3.14: "pi",                   # float ✅
    (1, 2): "coordenada"          # tuple ✅
}

# ❌ No permitido
# invalido = {[1, 2]: "lista"}  # TypeError: unhashable type: 'list'
```

## 📥 Acceder a Valores

### Usando Corchetes

```python
persona = {"nombre": "Ana", "edad": 25, "ciudad": "Madrid"}

# Acceso con []
print(persona["nombre"])  # "Ana"
print(persona["edad"])    # 25

# KeyError si no existe
# print(persona["telefono"])  # KeyError: 'telefono'
```

### Usando get()

```python
# Método get() - más seguro
print(persona.get("nombre"))      # "Ana"
print(persona.get("telefono"))    # None (no KeyError)
print(persona.get("telefono", "No disponible"))  # Valor por defecto
```

## ✏️ Modificar Diccionarios

### Agregar/Actualizar

```python
persona = {"nombre": "Ana", "edad": 25}

# Agregar nueva clave
persona["ciudad"] = "Madrid"

# Actualizar existente
persona["edad"] = 26

# Actualizar múltiples con update()
persona.update({"telefono": "123456", "email": "ana@mail.com"})
persona.update(edad=27, ciudad="Barcelona")  # Con keyword args

print(persona)
```

### Eliminar

```python
persona = {
    "nombre": "Ana",
    "edad": 25,
    "ciudad": "Madrid",
    "telefono": "123456"
}

# del - elimina clave
del persona["telefono"]

# pop() - elimina y retorna valor
edad = persona.pop("edad")
print(edad)  # 25

# pop() con valor por defecto
telefono = persona.pop("telefono", "Sin teléfono")

# popitem() - elimina y retorna último par (desde 3.7+)
ultimo = persona.popitem()
print(ultimo)  # ("ciudad", "Madrid")

# clear() - vaciar diccionario
persona.clear()
```

## 🔍 Métodos de Diccionario

### keys(), values(), items()

```python
notas = {"matematicas": 85, "fisica": 90, "quimica": 88}

# keys() - solo claves
print(notas.keys())    # dict_keys(['matematicas', 'fisica', 'quimica'])
print(list(notas.keys()))  # ['matematicas', 'fisica', 'quimica']

# values() - solo valores
print(notas.values())  # dict_values([85, 90, 88])

# items() - pares clave-valor
print(notas.items())   # dict_items([('matematicas', 85), ...])

# Iterar
for materia, nota in notas.items():
    print(f"{materia}: {nota}")
```

### setdefault()

```python
diccionario = {"a": 1, "b": 2}

# setdefault() - retorna valor, si no existe lo crea
print(diccionario.setdefault("a", 10))  # 1 (ya existe)
print(diccionario.setdefault("c", 3))   # 3 (crea "c")
print(diccionario)  # {"a": 1, "b": 2, "c": 3}
```

### Copiar

```python
original = {"a": 1, "b": 2}

# ❌ Asignación (referencia)
copia = original
copia["c"] = 3
print(original)  # {"a": 1, "b": 2, "c": 3} ¡Modificado!

# ✅ Copia superficial
copia = original.copy()
copia["d"] = 4
print(original)  # {"a": 1, "b": 2} (no afectado)

# Para copia profunda (diccionarios anidados)
import copy
copia_profunda = copy.deepcopy(original)
```

## 🔁 Iterar Diccionarios

```python
persona = {"nombre": "Ana", "edad": 25, "ciudad": "Madrid"}

# Iterar claves (por defecto)
for clave in persona:
    print(clave)

# Iterar valores
for valor in persona.values():
    print(valor)

# Iterar clave-valor
for clave, valor in persona.items():
    print(f"{clave} = {valor}")

# Verificar existencia
if "edad" in persona:
    print(f"Edad: {persona['edad']}")
```

## 📊 Dictionary Comprehensions

```python
# Sintaxis: {key_expr: value_expr for item in iterable if condicion}

# Cuadrados
cuadrados = {x: x**2 for x in range(1, 6)}
# {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Filtrar
numeros = {"a": 1, "b": 2, "c": 3, "d": 4}
pares = {k: v for k, v in numeros.items() if v % 2 == 0}
# {"b": 2, "d": 4}

# Transformar
nombres = ["Ana", "Juan", "Pedro"]
longitudes = {nombre: len(nombre) for nombre in nombres}
# {"Ana": 3, "Juan": 4, "Pedro": 5}

# Invertir diccionario
original = {"a": 1, "b": 2, "c": 3}
invertido = {v: k for k, v in original.items()}
# {1: "a", 2: "b", 3: "c"}
```

## 🔗 Diccionarios Anidados

```python
estudiantes = {
    "est1": {
        "nombre": "Ana",
        "notas": [85, 90, 88],
        "ciudad": "Madrid"
    },
    "est2": {
        "nombre": "Juan",
        "notas": [78, 85, 92],
        "ciudad": "Barcelona"
    }
}

# Acceder
print(estudiantes["est1"]["nombre"])  # "Ana"
print(estudiantes["est2"]["notas"][0])  # 78

# Agregar estudiante
estudiantes["est3"] = {
    "nombre": "Pedro",
    "notas": [90, 95, 89],
    "ciudad": "Valencia"
}
```

## 💡 Ejemplo Completo: Contador de Palabras

```python
def contar_palabras(texto):
    """Cuenta la frecuencia de cada palabra"""
    # Limpiar y convertir a minúsculas
    palabras = texto.lower().split()
    
    # Contar con diccionario
    contador = {}
    for palabra in palabras:
        # Limpiar puntuación
        palabra = palabra.strip(".,;:!?")
        if palabra:
            contador[palabra] = contador.get(palabra, 0) + 1
    
    return contador

def palabras_mas_comunes(contador, n=5):
    """Retorna las n palabras más comunes"""
    # Ordenar por frecuencia (descendente)
    ordenado = sorted(contador.items(), key=lambda x: x[1], reverse=True)
    return ordenado[:n]

# Uso
texto = """Python es un lenguaje de programación.
Python es fácil de aprender.
Python es muy popular."""

contador = contar_palabras(texto)
print("Frecuencia de palabras:")
for palabra, frecuencia in contador.items():
    print(f"  {palabra}: {frecuencia}")

print("\nPalabras más comunes:")
for palabra, frecuencia in palabras_mas_comunes(contador, 3):
    print(f"  {palabra}: {frecuencia}")
```

## 📊 Métodos Principales

| Método | Descripción | Ejemplo |
|--------|-------------|---------|
| `get(key, default)` | Obtener valor seguro | `d.get("x", 0)` |
| `keys()` | Todas las claves | `d.keys()` |
| `values()` | Todos los valores | `d.values()` |
| `items()` | Pares clave-valor | `d.items()` |
| `pop(key, default)` | Eliminar y retornar | `d.pop("x")` |
| `popitem()` | Eliminar último par | `d.popitem()` |
| `update(other)` | Actualizar múltiples | `d.update({"a": 1})` |
| `setdefault(key, default)` | Crear si no existe | `d.setdefault("x", 0)` |
| `clear()` | Vaciar | `d.clear()` |
| `copy()` | Copia superficial | `d.copy()` |

## 💪 Ejercicios Prácticos

### Ejercicio 1: Agrupar por Categoría

```python
productos = [
    {"nombre": "Manzana", "categoria": "frutas"},
    {"nombre": "Lechuga", "categoria": "verduras"},
    {"nombre": "Banana", "categoria": "frutas"},
    {"nombre": "Zanahoria", "categoria": "verduras"},
]
# Agrupa productos por categoría
# Resultado: {"frutas": ["Manzana", "Banana"], "verduras": [...]}
```

<details>
<summary>✅ Solución</summary>

```python
agrupados = {}
for producto in productos:
    categoria = producto["categoria"]
    nombre = producto["nombre"]
    
    if categoria not in agrupados:
        agrupados[categoria] = []
    
    agrupados[categoria].append(nombre)

print(agrupados)
# {"frutas": ["Manzana", "Banana"], "verduras": ["Lechuga", "Zanahoria"]}
```
</details>

### Ejercicio 2: Merge Diccionarios

```python
dict1 = {"a": 1, "b": 2}
dict2 = {"b": 3, "c": 4}
# Combina, dict2 sobrescribe dict1
# Resultado: {"a": 1, "b": 3, "c": 4}
```

<details>
<summary>✅ Solución</summary>

```python
# Opción 1: update()
resultado = dict1.copy()
resultado.update(dict2)

# Opción 2: | (Python 3.9+)
resultado = dict1 | dict2

# Opción 3: {**dict1, **dict2}
resultado = {**dict1, **dict2}

print(resultado)  # {"a": 1, "b": 3, "c": 4}
```
</details>

## ⚠️ Errores Comunes

```python
# 1. KeyError
persona = {"nombre": "Ana"}
# ❌ print(persona["edad"])  # KeyError
# ✅ print(persona.get("edad", "No disponible"))

# 2. Modificar durante iteración
diccionario = {"a": 1, "b": 2, "c": 3}
# ❌ RuntimeError
# for k in diccionario:
#     del diccionario[k]

# ✅ Crear lista de claves
for k in list(diccionario.keys()):
    del diccionario[k]

# 3. Clave mutable
# ❌ TypeError
# diccionario = {[1, 2]: "valor"}  # unhashable type: 'list'
# ✅ Usar tupla
diccionario = {(1, 2): "valor"}
```

## 🔗 Temas Relacionados

- [Listas y Tuplas](./listas-tuplas)
- [Sets](./sets)
- [Comprehensions](../intermedio/comprehensions)
- [Counter](../intermedio/modulos)

## 📚 Recursos Adicionales

- [Dict Methods](https://docs.python.org/3/library/stdtypes.html#mapping-types-dict)
- [Dictionary Comprehensions](https://realpython.com/iterate-through-dictionary-python/)

---

> 💡 **Tip**: Usa `get()` en vez de `[]` cuando no estés seguro de que la clave existe.
