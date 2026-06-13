---
title: "Funciones en Python"
level: basico
category: fundamentos
tags: [python, funciones, def, return, parametros, args, kwargs, docstring]
duration: 30min
prerequisites: [control-flujo]
---

# Funciones en Python

## 📋 ¿Qué son las Funciones?

Una **función** es un bloque de código reutilizable que realiza una tarea específica. Las funciones ayudan a organizar el código, evitar repetición y hacerlo más legible.

```python
# Sin funciones (repetitivo)
nombre1 = "Ana"
print(f"Hola, {nombre1}!")

nombre2 = "Juan"
print(f"Hola, {nombre2}!")

# Con funciones (reutilizable)
def saludar(nombre):
    print(f"Hola, {nombre}!")

saludar("Ana")
saludar("Juan")
```

## 🔧 Definir una Función

Sintaxis básica:

```python
def nombre_funcion(parametros):
    """Docstring: descripción de la función"""
    # Código
    return valor  # Opcional
```

### Función Simple

```python
def saludar():
    print("¡Hola, Mundo!")

# Llamar la función
saludar()  # ¡Hola, Mundo!
```

### Función con Parámetros

```python
def saludar(nombre):
    print(f"¡Hola, {nombre}!")

saludar("Ana")    # ¡Hola, Ana!
saludar("Carlos") # ¡Hola, Carlos!
```

### Función con Return

```python
def sumar(a, b):
    resultado = a + b
    return resultado

total = sumar(5, 3)
print(total)  # 8

# Uso directo
print(sumar(10, 20))  # 30
```

## 📥 Parámetros

### Parámetros Posicionales

```python
def presentar(nombre, edad, ciudad):
    print(f"{nombre}, {edad} años, vive en {ciudad}")

presentar("Ana", 25, "Madrid")
# Ana, 25 años, vive en Madrid
```

### Parámetros con Nombre (Keyword Arguments)

```python
presentar(nombre="Juan", ciudad="Barcelona", edad=30)
# Juan, 30 años, vive en Barcelona

# Mezclar posicionales y con nombre
presentar("Pedro", edad=28, ciudad="Valencia")
```

### Parámetros por Defecto

```python
def saludar(nombre, saludo="Hola"):
    print(f"{saludo}, {nombre}!")

saludar("Ana")              # Hola, Ana!
saludar("Juan", "Buenos días")  # Buenos días, Juan!
```

⚠️ **Valor por defecto mutable (cuidado)**:

```python
# ❌ Error común
def agregar_item(item, lista=[]):
    lista.append(item)
    return lista

print(agregar_item(1))  # [1]
print(agregar_item(2))  # [1, 2] ¡No [2]!

# ✅ Correcto
def agregar_item(item, lista=None):
    if lista is None:
        lista = []
    lista.append(item)
    return lista
```

## 🌟 *args y **kwargs

### *args - Argumentos Variables (Tupla)

```python
def sumar_todos(*numeros):
    """Suma cantidad variable de números"""
    total = 0
    for num in numeros:
        total += num
    return total

print(sumar_todos(1, 2, 3))        # 6
print(sumar_todos(10, 20, 30, 40)) # 100
print(sumar_todos(5))              # 5
```

### **kwargs - Argumentos con Nombre Variables (Diccionario)

```python
def mostrar_info(**datos):
    """Recibe datos variables con nombre"""
    for clave, valor in datos.items():
        print(f"{clave}: {valor}")

mostrar_info(nombre="Ana", edad=25, ciudad="Madrid")
# nombre: Ana
# edad: 25
# ciudad: Madrid
```

### Combinar Todo

```python
def funcion_completa(a, b, *args, opcion="default", **kwargs):
    print(f"Posicionales: {a}, {b}")
    print(f"Args: {args}")
    print(f"Opción: {opcion}")
    print(f"Kwargs: {kwargs}")

funcion_completa(1, 2, 3, 4, opcion="custom", x=10, y=20)
# Posicionales: 1, 2
# Args: (3, 4)
# Opción: custom
# Kwargs: {'x': 10, 'y': 20}
```

## 📤 Return

### Return Simple

```python
def cuadrado(n):
    return n ** 2

resultado = cuadrado(5)
print(resultado)  # 25
```

### Return Múltiple

```python
def operaciones(a, b):
    suma = a + b
    resta = a - b
    producto = a * b
    return suma, resta, producto  # Retorna tupla

s, r, p = operaciones(10, 3)
print(f"Suma: {s}, Resta: {r}, Producto: {p}")
# Suma: 13, Resta: 7, Producto: 30
```

### Return Temprano

```python
def es_par(numero):
    if numero % 2 == 0:
        return True
    return False

# Más simple:
def es_par(numero):
    return numero % 2 == 0
```

### Sin Return (Retorna None)

```python
def imprimir_mensaje(texto):
    print(texto)
    # No hay return

resultado = imprimir_mensaje("Hola")
print(resultado)  # None
```

## 📝 Docstrings

Documentación de la función:

```python
def calcular_area_circulo(radio):
    """
    Calcula el área de un círculo.
    
    Args:
        radio (float): Radio del círculo
        
    Returns:
        float: Área del círculo
        
    Example:
        >>> calcular_area_circulo(5)
        78.53981633974483
    """
    import math
    return math.pi * radio ** 2

# Acceder al docstring
print(calcular_area_circulo.__doc__)
help(calcular_area_circulo)
```

## 🎯 Scope (Ámbito)

### Variables Locales vs Globales

```python
# Variable global
x = 10

def funcion():
    # Variable local
    y = 5
    print(f"Dentro: x={x}, y={y}")

funcion()
# print(y)  # NameError: y no existe fuera de la función
```

### Modificar Variable Global

```python
contador = 0

def incrementar():
    global contador  # Declarar como global
    contador += 1

incrementar()
incrementar()
print(contador)  # 2
```

⚠️ **Evita usar `global` cuando sea posible**:

```python
# ✅ Mejor: retornar el valor
def incrementar(valor):
    return valor + 1

contador = 0
contador = incrementar(contador)
contador = incrementar(contador)
print(contador)  # 2
```

## 💡 Ejemplo Completo: Sistema de Notas

```python
def calcular_promedio(*notas):
    """Calcula el promedio de las notas"""
    if not notas:
        return 0
    return sum(notas) / len(notas)

def obtener_calificacion(promedio):
    """Retorna la letra de calificación"""
    if promedio >= 90:
        return "A"
    elif promedio >= 80:
        return "B"
    elif promedio >= 70:
        return "C"
    elif promedio >= 60:
        return "D"
    else:
        return "F"

def procesar_estudiante(nombre, *notas):
    """Procesa información del estudiante"""
    promedio = calcular_promedio(*notas)
    calificacion = obtener_calificacion(promedio)
    
    print(f"\n--- Reporte de {nombre} ---")
    print(f"Notas: {notas}")
    print(f"Promedio: {promedio:.2f}")
    print(f"Calificación: {calificacion}")
    
    return promedio, calificacion

# Uso
procesar_estudiante("Ana", 85, 90, 88, 92)
procesar_estudiante("Juan", 75, 70, 80)
```

## 🔄 Funciones como Objetos

En Python, las funciones son objetos de primera clase:

```python
# Asignar función a variable
def saludar(nombre):
    return f"Hola, {nombre}"

mi_funcion = saludar
print(mi_funcion("Ana"))  # Hola, Ana

# Función como argumento
def aplicar_operacion(func, a, b):
    return func(a, b)

def sumar(x, y):
    return x + y

def multiplicar(x, y):
    return x * y

print(aplicar_operacion(sumar, 5, 3))       # 8
print(aplicar_operacion(multiplicar, 5, 3)) # 15
```

## 🔁 Recursividad

Función que se llama a sí misma:

```python
def factorial(n):
    """Calcula n! usando recursividad"""
    if n == 0 or n == 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))  # 120

# Fibonacci
def fibonacci(n):
    """Retorna el n-ésimo número de Fibonacci"""
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print([fibonacci(i) for i in range(10)])
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

## ⚠️ Errores Comunes

### 1. Olvidar Return

```python
# ❌ Error
def sumar(a, b):
    resultado = a + b  # Falta return

print(sumar(5, 3))  # None

# ✅ Correcto
def sumar(a, b):
    return a + b
```

### 2. Modificar Lista Mutable sin Querer

```python
def duplicar_lista(lista):
    lista.append(100)  # Modifica la original
    return lista

original = [1, 2, 3]
nueva = duplicar_lista(original)
print(original)  # [1, 2, 3, 100] ¡Modificada!

# ✅ Crear copia
def duplicar_lista(lista):
    nueva_lista = lista.copy()
    nueva_lista.append(100)
    return nueva_lista
```

### 3. Parámetros en Orden Incorrecto

```python
def dividir(dividendo, divisor):
    return dividendo / divisor

# ❌ Confuso
print(dividir(2, 10))  # 0.2 (quería 5.0)

# ✅ Usar nombres
print(dividir(dividendo=10, divisor=2))  # 5.0
```

## 💪 Ejercicios Prácticos

### Ejercicio 1: Validador de Contraseña

```python
def es_contraseña_valida(contraseña):
    """
    Valida contraseña:
    - Longitud >= 8
    - Al menos 1 mayúscula
    - Al menos 1 minúscula
    - Al menos 1 número
    """
    # Tu código aquí
```

<details>
<summary>✅ Solución</summary>

```python
def es_contraseña_valida(contraseña):
    if len(contraseña) < 8:
        return False
    
    tiene_mayuscula = any(c.isupper() for c in contraseña)
    tiene_minuscula = any(c.islower() for c in contraseña)
    tiene_numero = any(c.isdigit() for c in contraseña)
    
    return tiene_mayuscula and tiene_minuscula and tiene_numero

print(es_contraseña_valida("Abc12345"))  # True
print(es_contraseña_valida("abc12345"))  # False (sin mayúscula)
```
</details>

### Ejercicio 2: Calculadora Flexible

```python
def calculadora(operacion, *numeros):
    """
    Realiza operación sobre n números
    operacion: 'suma', 'promedio', 'max', 'min'
    """
    # Tu código aquí
```

<details>
<summary>✅ Solución</summary>

```python
def calculadora(operacion, *numeros):
    if not numeros:
        return None
    
    if operacion == "suma":
        return sum(numeros)
    elif operacion == "promedio":
        return sum(numeros) / len(numeros)
    elif operacion == "max":
        return max(numeros)
    elif operacion == "min":
        return min(numeros)
    else:
        return "Operación inválida"

print(calculadora("suma", 1, 2, 3, 4, 5))      # 15
print(calculadora("promedio", 10, 20, 30))     # 20.0
print(calculadora("max", 5, 2, 9, 1))          # 9
```
</details>

## 📊 Buenas Prácticas

| ✅ Hacer | ❌ Evitar |
|----------|-----------|
| Nombres descriptivos | Nombres de 1 letra (excepto en loops) |
| Una responsabilidad | Funciones que hacen mucho |
| Docstrings | Código sin documentar |
| Return explícito | Modificar globales |
| Parámetros claros | Muchos parámetros (>5) |

## 🔗 Temas Relacionados

- [Control de Flujo](./control-flujo)
- [Listas y Tuplas](./listas-tuplas)
- [Lambdas](../intermedio/funcional)
- [Decoradores](../intermedio/decoradores)

## 📚 Recursos Adicionales

- [Defining Functions](https://docs.python.org/3/tutorial/controlflow.html#defining-functions)
- [Default Arguments](https://docs.python.org/3/tutorial/controlflow.html#default-argument-values)
- [*args and **kwargs](https://realpython.com/python-kwargs-and-args/)

---

> 💡 **Principio DRY**: Don't Repeat Yourself. Si copias código 3 veces, crea una función.
