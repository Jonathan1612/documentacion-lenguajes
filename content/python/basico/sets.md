---
title: "Sets (Conjuntos)"
level: basico
category: estructuras-datos
tags: [python, sets, set, conjuntos, union, intersection]
duration: 20min
prerequisites: [diccionarios]
---

# Sets en Python

## 📋 ¿Qué son los Sets?

Los **sets** (`set`) son colecciones desordenadas de elementos **únicos** (sin duplicados) y mutables.

```python
# Crear sets
vacio = set()  # ⚠️ {} crea un dict, no un set
numeros = {1, 2, 3, 4, 5}
frutas = {"manzana", "banana", "naranja"}

# Desde lista (elimina duplicados)
lista = [1, 2, 2, 3, 3, 3]
conjunto = set(lista)  # {1, 2, 3}
```

## 🔧 Características

### Sin Duplicados

```python
# Duplicados se eliminan automáticamente
numeros = {1, 2, 2, 3, 3, 3}
print(numeros)  # {1, 2, 3}

# Convertir lista con duplicados
lista = [1, 2, 2, 3, 4, 4, 5]
sin_duplicados = list(set(lista))
print(sin_duplicados)  # [1, 2, 3, 4, 5]
```

### Sin Orden

```python
# El orden no está garantizado
conjunto = {3, 1, 4, 1, 5, 9}
print(conjunto)  # Puede ser {1, 3, 4, 5, 9} u otro orden

# No se puede acceder por índice
# print(conjunto[0])  # TypeError: 'set' object is not subscriptable
```

### Elementos Inmutables

```python
# Solo elementos hashables (inmutables)
valido = {1, "texto", 3.14, (1, 2)}  # ✅

# ❌ No permitido
# invalido = {[1, 2], {3, 4}}  # TypeError: unhashable type
```

## 📥 Operaciones Básicas

### Agregar y Eliminar

```python
frutas = {"manzana", "banana"}

# add() - agregar un elemento
frutas.add("naranja")
frutas.add("manzana")  # No duplica

# update() - agregar varios
frutas.update(["uva", "pera"])
frutas.update({"kiwi"})

# remove() - elimina (KeyError si no existe)
frutas.remove("banana")
# frutas.remove("xyz")  # KeyError

# discard() - elimina (sin error si no existe)
frutas.discard("uva")
frutas.discard("xyz")  # No error

# pop() - elimina y retorna elemento aleatorio
fruta = frutas.pop()

# clear() - vaciar
frutas.clear()
```

### Verificar Pertenencia

```python
frutas = {"manzana", "banana", "naranja"}

print("manzana" in frutas)      # True
print("uva" not in frutas)      # True

# Longitud
print(len(frutas))  # 3
```

## 🔀 Operaciones de Conjuntos

### Unión (union / |)

Todos los elementos de ambos sets:

```python
A = {1, 2, 3}
B = {3, 4, 5}

# Método
print(A.union(B))  # {1, 2, 3, 4, 5}

# Operador |
print(A | B)  # {1, 2, 3, 4, 5}

# Múltiples sets
C = {5, 6, 7}
print(A | B | C)  # {1, 2, 3, 4, 5, 6, 7}
```

### Intersección (intersection / &)

Elementos comunes:

```python
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

# Método
print(A.intersection(B))  # {3, 4}

# Operador &
print(A & B)  # {3, 4}
```

### Diferencia (difference / -)

Elementos en A pero no en B:

```python
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

# A - B
print(A.difference(B))  # {1, 2}
print(A - B)            # {1, 2}

# B - A
print(B.difference(A))  # {5, 6}
print(B - A)            # {5, 6}
```

### Diferencia Simétrica (symmetric_difference / ^)

Elementos en A o B, pero no en ambos:

```python
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

# Método
print(A.symmetric_difference(B))  # {1, 2, 5, 6}

# Operador ^
print(A ^ B)  # {1, 2, 5, 6}
```

## 🔍 Verificación de Subconjuntos

```python
A = {1, 2, 3}
B = {1, 2, 3, 4, 5}

# issubset() - A está contenido en B
print(A.issubset(B))  # True
print(A <= B)         # True

# issuperset() - A contiene a B
print(B.issuperset(A))  # True
print(B >= A)           # True

# isdisjoint() - sin elementos comunes
C = {6, 7, 8}
print(A.isdisjoint(C))  # True
```

## 📊 Set Comprehensions

```python
# Sintaxis: {expresion for item in iterable if condicion}

# Cuadrados
cuadrados = {x**2 for x in range(10)}
# {0, 1, 4, 9, 16, 25, 36, 49, 64, 81}

# Filtrar
pares = {x for x in range(20) if x % 2 == 0}
# {0, 2, 4, 6, 8, 10, 12, 14, 16, 18}

# Desde string (letras únicas)
texto = "programming"
letras_unicas = {letra for letra in texto}
print(letras_unicas)  # {'a', 'g', 'i', 'm', 'n', 'o', 'p', 'r'}
```

## 🔄 Métodos Mutadores

Modifican el set original:

```python
A = {1, 2, 3}
B = {3, 4, 5}

# update() - union in-place
A.update(B)
print(A)  # {1, 2, 3, 4, 5}

A = {1, 2, 3}
# intersection_update() - intersection in-place
A.intersection_update(B)
print(A)  # {3}

A = {1, 2, 3}
# difference_update() - difference in-place
A.difference_update(B)
print(A)  # {1, 2}

A = {1, 2, 3}
# symmetric_difference_update() - symmetric_difference in-place
A.symmetric_difference_update(B)
print(A)  # {1, 2, 4, 5}
```

## 💡 Ejemplo Completo: Análisis de Visitantes

```python
"""Sistema de análisis de visitantes a un sitio web"""

visitantes_lunes = {"Ana", "Juan", "Pedro", "María"}
visitantes_martes = {"Juan", "Pedro", "Carlos", "Sofía"}
visitantes_miercoles = {"Ana", "Carlos", "Sofía", "Luis"}

# Total de visitantes únicos
todos = visitantes_lunes | visitantes_martes | visitantes_miercoles
print(f"Total visitantes únicos: {len(todos)}")
print(f"Nombres: {todos}\n")

# Visitantes recurrentes (todos los días)
recurrentes = visitantes_lunes & visitantes_martes & visitantes_miercoles
print(f"Visitantes todos los días: {recurrentes}\n")

# Visitantes solo del lunes
solo_lunes = visitantes_lunes - visitantes_martes - visitantes_miercoles
print(f"Solo lunes: {solo_lunes}\n")

# Visitantes que estuvieron lunes o martes, pero no miércoles
lunes_o_martes = (visitantes_lunes | visitantes_martes) - visitantes_miercoles
print(f"Lunes o martes (no miércoles): {lunes_o_martes}\n")

# Visitantes que NO estuvieron todos los días
no_todos_dias = todos - recurrentes
print(f"No todos los días: {no_todos_dias}")
```

## 🆚 frozen_set - Set Inmutable

```python
# frozenset - no se puede modificar
inmutable = frozenset([1, 2, 3, 4])

# ❌ No permitido
# inmutable.add(5)  # AttributeError

# ✅ Se puede usar como clave de diccionario
diccionario = {
    frozenset([1, 2]): "valor1",
    frozenset([3, 4]): "valor2"
}

# Operaciones de conjuntos funcionan
A = frozenset([1, 2, 3])
B = frozenset([3, 4, 5])
print(A | B)  # frozenset({1, 2, 3, 4, 5})
```

## 📊 Comparación de Estructuras

| Característica | Set | List | Tuple | Dict |
|----------------|-----|------|-------|------|
| Ordenado | ❌ | ✅ | ✅ | ✅ (3.7+) |
| Mutable | ✅ | ✅ | ❌ | ✅ |
| Duplicados | ❌ | ✅ | ✅ | Claves ❌ |
| Indexable | ❌ | ✅ | ✅ | Por clave |
| Búsqueda O(1) | ✅ | ❌ | ❌ | ✅ |

## 💪 Ejercicios Prácticos

### Ejercicio 1: Eliminar Duplicados

```python
numeros = [1, 2, 2, 3, 4, 4, 5, 6, 6]
# Elimina duplicados y ordena
```

<details>
<summary>✅ Solución</summary>

```python
numeros = [1, 2, 2, 3, 4, 4, 5, 6, 6]
unicos = sorted(set(numeros))
print(unicos)  # [1, 2, 3, 4, 5, 6]
```
</details>

### Ejercicio 2: Palabras Únicas

```python
texto = "python es genial python es fácil"
# Cuenta cuántas palabras únicas hay
```

<details>
<summary>✅ Solución</summary>

```python
texto = "python es genial python es fácil"
palabras = texto.split()
unicas = set(palabras)
print(f"Palabras únicas: {len(unicas)}")  # 4
print(unicas)  # {'python', 'es', 'genial', 'fácil'}
```
</details>

### Ejercicio 3: Amigos en Común

```python
amigos_ana = {"Juan", "Pedro", "María", "Carlos"}
amigos_luis = {"Pedro", "María", "Sofía", "Ana"}
# Encuentra amigos en común
```

<details>
<summary>✅ Solución</summary>

```python
amigos_ana = {"Juan", "Pedro", "María", "Carlos"}
amigos_luis = {"Pedro", "María", "Sofía", "Ana"}

en_comun = amigos_ana & amigos_luis
print(f"Amigos en común: {en_comun}")  # {'Pedro', 'María'}
```
</details>

## ⚠️ Errores Comunes

```python
# 1. Usar {} para set vacío
# ❌ vacio = {}  # Esto es dict!
# ✅ vacio = set()

# 2. Intentar agregar lista
conjunto = {1, 2, 3}
# ❌ conjunto.add([4, 5])  # TypeError: unhashable
# ✅ conjunto.add((4, 5))  # Tupla sí

# 3. Acceder por índice
conjunto = {1, 2, 3}
# ❌ print(conjunto[0])  # TypeError
# ✅ for elemento in conjunto: print(elemento)
```

## 🎯 Cuándo Usar Sets

| Usar Set | Usar List |
|----------|-----------|
| Eliminar duplicados | Orden importa |
| Verificar pertenencia rápida | Duplicados permitidos |
| Operaciones matemáticas | Acceso por índice |
| Elementos únicos | Modificar por posición |

## 🔗 Temas Relacionados

- [Listas](./listas-tuplas)
- [Diccionarios](./diccionarios)
- [Comprehensions](../intermedio/comprehensions)

## 📚 Recursos Adicionales

- [Set Types](https://docs.python.org/3/library/stdtypes.html#set-types-set-frozenset)
- [Sets Tutorial](https://realpython.com/python-sets/)

---

> 💡 **Tip**: Usa sets para verificar pertenencia de forma eficiente (O(1)) en vez de listas (O(n)).
