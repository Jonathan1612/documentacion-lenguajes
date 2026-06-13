---
title: "Métodos Especiales (Dunder)"
level: intermedio
category: poo
tags: [python, dunder, magic-methods, __str__, __repr__]
duration: 30min
prerequisites: [clases]
---

# Métodos Especiales en Python

## 📋 ¿Qué son los Métodos Especiales?

Los **métodos especiales** (o "dunder methods" por **d**ouble **under**score) permiten que tus objetos se comporten como tipos nativos de Python.

```python
class Punto:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __str__(self):
        return f"Punto({self.x}, {self.y})"
    
    def __add__(self, otro):
        return Punto(self.x + otro.x, self.y + otro.y)

p1 = Punto(1, 2)
p2 = Punto(3, 4)
p3 = p1 + p2  # Usa __add__
print(p3)     # Usa __str__ -> "Punto(4, 6)"
```

## 🎨 Representación de Objetos

### `__str__` y `__repr__`

```python
class Producto:
    def __init__(self, nombre, precio):
        self.nombre = nombre
        self.precio = precio
    
    def __str__(self):
        """Para usuarios (print, str())"""
        return f"{self.nombre}: ${self.precio}"
    
    def __repr__(self):
        """Para desarrolladores (repr(), consola)"""
        return f"Producto('{self.nombre}', {self.precio})"

p = Producto("Laptop", 999.99)
print(p)        # Laptop: $999.99 (usa __str__)
print(repr(p))  # Producto('Laptop', 999.99) (usa __repr__)
```

## ➕ Operadores Aritméticos

```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __add__(self, otro):
        return Vector(self.x + otro.x, self.y + otro.y)
    
    def __sub__(self, otro):
        return Vector(self.x - otro.x, self.y - otro.y)
    
    def __mul__(self, escalar):
        return Vector(self.x * escalar, self.y * escalar)
    
    def __str__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(1, 2)
v2 = Vector(3, 4)

print(v1 + v2)  # Vector(4, 6)
print(v1 - v2)  # Vector(-2, -2)
print(v1 * 3)   # Vector(3, 6)
```

## 🔍 Comparación

```python
class Persona:
    def __init__(self, nombre, edad):
        self.nombre = nombre
        self.edad = edad
    
    def __eq__(self, otro):
        return self.edad == otro.edad
    
    def __lt__(self, otro):
        return self.edad < otro.edad
    
    def __le__(self, otro):
        return self.edad <= otro.edad
    
    def __gt__(self, otro):
        return self.edad > otro.edad
    
    def __ge__(self, otro):
        return self.edad >= otro.edad

p1 = Persona("Ana", 25)
p2 = Persona("Juan", 30)

print(p1 == p2)  # False
print(p1 < p2)   # True
print(sorted([p2, p1], key=lambda p: p.edad))  # [Ana, Juan]
```

## 📦 Contenedores

```python
class MiLista:
    def __init__(self):
        self.items = []
    
    def __len__(self):
        return len(self.items)
    
    def __getitem__(self, indice):
        return self.items[indice]
    
    def __setitem__(self, indice, valor):
        self.items[indice] = valor
    
    def __contains__(self, item):
        return item in self.items
    
    def append(self, item):
        self.items.append(item)

lista = MiLista()
lista.append(1)
lista.append(2)
lista.append(3)

print(len(lista))     # 3 (usa __len__)
print(lista[0])       # 1 (usa __getitem__)
lista[0] = 10         # Usa __setitem__
print(2 in lista)     # True (usa __contains__)
```

## 🔄 Iteración

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
        self.actual += 1
        return self.actual - 1

# Uso en for
for num in Contador(0, 5):
    print(num)  # 0, 1, 2, 3, 4
```

## 🎯 Context Managers

```python
class Archivo:
    def __init__(self, nombre, modo):
        self.nombre = nombre
        self.modo = modo
        self.archivo = None
    
    def __enter__(self):
        self.archivo = open(self.nombre, self.modo)
        return self.archivo
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.archivo:
            self.archivo.close()
        return False

# Uso con 'with'
with Archivo("datos.txt", "w") as f:
    f.write("Hola")
# Archivo cerrado automáticamente
```

## 📞 Callable

```python
class Multiplicador:
    def __init__(self, factor):
        self.factor = factor
    
    def __call__(self, x):
        return x * self.factor

multiplicar_por_2 = Multiplicador(2)
print(multiplicar_por_2(5))  # 10 (objeto llamable)
print(multiplicar_por_2(10)) # 20
```

## 💡 Ejemplo Completo: Clase Dinero

```python
class Dinero:
    def __init__(self, cantidad, moneda="USD"):
        self.cantidad = cantidad
        self.moneda = moneda
    
    def __str__(self):
        return f"{self.moneda} {self.cantidad:.2f}"
    
    def __repr__(self):
        return f"Dinero({self.cantidad}, '{self.moneda}')"
    
    def __add__(self, otro):
        if self.moneda != otro.moneda:
            raise ValueError("No se pueden sumar monedas diferentes")
        return Dinero(self.cantidad + otro.cantidad, self.moneda)
    
    def __sub__(self, otro):
        if self.moneda != otro.moneda:
            raise ValueError("No se pueden restar monedas diferentes")
        return Dinero(self.cantidad - otro.cantidad, self.moneda)
    
    def __mul__(self, factor):
        return Dinero(self.cantidad * factor, self.moneda)
    
    def __eq__(self, otro):
        return self.cantidad == otro.cantidad and self.moneda == otro.moneda
    
    def __lt__(self, otro):
        if self.moneda != otro.moneda:
            raise ValueError("No se pueden comparar monedas diferentes")
        return self.cantidad < otro.cantidad

# Uso
d1 = Dinero(100, "USD")
d2 = Dinero(50, "USD")

print(d1 + d2)  # USD 150.00
print(d1 - d2)  # USD 50.00
print(d1 * 2)   # USD 200.00
print(d1 > d2)  # True
```

## 📊 Métodos Especiales Comunes

| Método | Descripción | Ejemplo |
|--------|-------------|---------|
| `__init__` | Constructor | `obj = Clase()` |
| `__str__` | String para usuarios | `str(obj)` |
| `__repr__` | String para desarrolladores | `repr(obj)` |
| `__len__` | Longitud | `len(obj)` |
| `__getitem__` | Acceso por índice | `obj[key]` |
| `__setitem__` | Asignación por índice | `obj[key] = val` |
| `__contains__` | Pertenencia | `x in obj` |
| `__iter__` | Iterable | `for x in obj` |
| `__next__` | Siguiente elemento | `next(obj)` |
| `__call__` | Objeto llamable | `obj()` |
| `__add__` | Suma | `obj1 + obj2` |
| `__eq__` | Igualdad | `obj1 == obj2` |
| `__lt__` | Menor que | `obj1 < obj2` |

## 💪 Ejercicio

```python
# Crea una clase Fraccion con:
# - __init__(numerador, denominador)
# - __str__ -> "3/4"
# - __add__ para sumar fracciones
# - __eq__ para comparar
```

<details>
<summary>✅ Solución</summary>

```python
from math import gcd

class Fraccion:
    def __init__(self, numerador, denominador):
        if denominador == 0:
            raise ValueError("Denominador no puede ser 0")
        # Simplificar
        mcd = gcd(numerador, denominador)
        self.numerador = numerador // mcd
        self.denominador = denominador // mcd
    
    def __str__(self):
        return f"{self.numerador}/{self.denominador}"
    
    def __add__(self, otra):
        num = self.numerador * otra.denominador + otra.numerador * self.denominador
        den = self.denominador * otra.denominador
        return Fraccion(num, den)
    
    def __eq__(self, otra):
        return (self.numerador == otra.numerador and 
                self.denominador == otra.denominador)

f1 = Fraccion(1, 2)
f2 = Fraccion(1, 4)
print(f1 + f2)  # 3/4
```
</details>

## 🔗 Temas Relacionados

- [Clases](./clases)
- [Iteradores](./iteradores-generadores)
- [Context Managers](./context-managers)

## 📚 Recursos Adicionales

- [Data Model](https://docs.python.org/3/reference/datamodel.html)
- [Magic Methods](https://rszalski.github.io/magicmethods/)

---

> 💡 **Tip**: Implementa `__repr__` para debugging y `__str__` para mostrar al usuario.
