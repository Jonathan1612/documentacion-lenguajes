---
title: "Errores y Debugging"
level: basico
category: debugging
tags: [python, errores, excepciones, debugging, traceback]
duration: 45min
prerequisites: [introduccion, funciones]
---

# Errores y Debugging en Python

## 📋 Tipos de Errores

### 1. Errores de Sintaxis (SyntaxError)

Ocurren cuando Python no puede interpretar el código:

```python
# ❌ Falta dos puntos
if True
    print("Hola")
# SyntaxError: invalid syntax

# ❌ Paréntesis sin cerrar
print("Hola"
# SyntaxError: '(' was never closed

# ❌ Indentación incorrecta
def saludar():
print("Hola")
# IndentationError: expected an indented block
```

### 2. Errores de Ejecución (Runtime Errors)

Ocurren durante la ejecución del programa:

```python
# NameError - variable no definida
print(variable_inexistente)
# NameError: name 'variable_inexistente' is not defined

# TypeError - operación inválida
numero = 5
texto = "Hola"
resultado = numero + texto
# TypeError: unsupported operand type(s) for +: 'int' and 'str'

# ZeroDivisionError
resultado = 10 / 0
# ZeroDivisionError: division by zero
```

### 3. Errores Lógicos

El código se ejecuta pero produce resultados incorrectos:

```python
# ❌ Lógica incorrecta
def calcular_promedio(numeros):
    return sum(numeros) / len(numeros) + 1  # +1 es incorrecto
    
# ✅ Lógica correcta
def calcular_promedio(numeros):
    return sum(numeros) / len(numeros)
```

## 🔍 Anatomía del Traceback

```python
def dividir(a, b):
    return a / b

def calcular():
    resultado = dividir(10, 0)
    return resultado

calcular()
```

**Traceback:**
```
Traceback (most recent call last):
  File "programa.py", line 7, in <module>
    calcular()
  File "programa.py", line 5, in calcular
    resultado = dividir(10, 0)
  File "programa.py", line 2, in dividir
    return a / b
ZeroDivisionError: division by zero
```

**Lectura:**
1. ⬇️ Lee de **arriba hacia abajo** para seguir el flujo
2. 🔴 **Última línea**: Tipo de error y mensaje
3. 📝 **Líneas intermedias**: Cadena de llamadas (stack)
4. 📍 **File "..."**: Archivo y número de línea

## ⚠️ Errores Comunes en Python

### 1. NameError

Variable o función no definida:

```python
# ❌ Error
print(nombre)
# NameError: name 'nombre' is not defined

# ✅ Solución
nombre = "Ana"
print(nombre)

# ❌ Error común con typo
nombre = "Ana"
print(nomber)  # Typo
# NameError: name 'nomber' is not defined
```

### 2. TypeError

Operación inválida para el tipo:

```python
# ❌ Sumar tipos incompatibles
numero = 5
texto = "10"
print(numero + texto)
# TypeError: unsupported operand type(s) for +: 'int' and 'str'

# ✅ Solución: convertir tipos
print(numero + int(texto))  # 15
print(str(numero) + texto)  # "510"

# ❌ Llamar no-callable
lista = [1, 2, 3]
lista()
# TypeError: 'list' object is not callable

# ❌ Argumentos incorrectos
def saludar(nombre):
    print(f"Hola, {nombre}")

saludar()  # Falta argumento
# TypeError: saludar() missing 1 required positional argument: 'nombre'
```

### 3. IndexError

Índice fuera de rango:

```python
# ❌ Error
lista = [1, 2, 3]
print(lista[5])
# IndexError: list index out of range

# ✅ Solución: verificar longitud
if len(lista) > 5:
    print(lista[5])
else:
    print("Índice fuera de rango")

# ✅ Usar get() con diccionarios
diccionario = {"a": 1, "b": 2}
# diccionario["c"]  # KeyError
valor = diccionario.get("c", "default")  # "default"
```

### 4. KeyError

Clave no existe en diccionario:

```python
# ❌ Error
persona = {"nombre": "Ana", "edad": 25}
print(persona["telefono"])
# KeyError: 'telefono'

# ✅ Soluciones
# 1. Verificar existencia
if "telefono" in persona:
    print(persona["telefono"])

# 2. Usar get()
telefono = persona.get("telefono", "No disponible")

# 3. Usar setdefault()
telefono = persona.setdefault("telefono", "Sin número")
```

### 5. AttributeError

Atributo o método no existe:

```python
# ❌ Error
lista = [1, 2, 3]
lista.append(4)  # ✅ Existe
lista.push(5)     # ❌ No existe
# AttributeError: 'list' object has no attribute 'push'

# ❌ Typo en método
texto = "Hola"
print(texto.uper())  # Debería ser upper()
# AttributeError: 'str' object has no attribute 'uper'

# ✅ Verificar con hasattr()
if hasattr(texto, "upper"):
    print(texto.upper())
```

### 6. ValueError

Valor incorrecto aunque el tipo es correcto:

```python
# ❌ Convertir string no-numérico
numero = int("abc")
# ValueError: invalid literal for int() with base 10: 'abc'

# ✅ Solución
try:
    numero = int(input("Número: "))
except ValueError:
    print("Por favor ingresa un número válido")

# ❌ index() sin encontrar
lista = [1, 2, 3]
indice = lista.index(10)
# ValueError: 10 is not in list

# ✅ Verificar primero
if 10 in lista:
    indice = lista.index(10)
```

### 7. IndentationError

Indentación incorrecta:

```python
# ❌ Error
def saludar():
print("Hola")
# IndentationError: expected an indented block

# ❌ Mezclar tabs y espacios
def funcion():
    print("Línea 1")  # 4 espacios
	print("Línea 2")  # 1 tab
# IndentationError: unexpected indent

# ✅ Solución: usa siempre 4 espacios
def saludar():
    print("Hola")
```

### 8. ImportError / ModuleNotFoundError

Módulo no encontrado:

```python
# ❌ Error
import modulo_inexistente
# ModuleNotFoundError: No module named 'modulo_inexistente'

# ❌ Nombre incorrecto
from math import sqr  # Debería ser sqrt
# ImportError: cannot import name 'sqr' from 'math'

# ✅ Solución
from math import sqrt
print(sqrt(16))  # 4.0
```

### 9. FileNotFoundError

Archivo no encontrado:

```python
# ❌ Error
with open("archivo_inexistente.txt") as f:
    contenido = f.read()
# FileNotFoundError: [Errno 2] No such file or directory

# ✅ Solución: verificar existencia
import os
ruta = "archivo.txt"

if os.path.exists(ruta):
    with open(ruta) as f:
        contenido = f.read()
else:
    print(f"Archivo {ruta} no encontrado")
```

## 🛠️ Técnicas de Debugging

### 1. Print Debugging

Método simple pero efectivo:

```python
def calcular_precio_final(precio, descuento, impuesto):
    print(f"DEBUG: precio={precio}")  # 🔍
    
    precio_con_descuento = precio * (1 - descuento)
    print(f"DEBUG: precio_con_descuento={precio_con_descuento}")  # 🔍
    
    precio_final = precio_con_descuento * (1 + impuesto)
    print(f"DEBUG: precio_final={precio_final}")  # 🔍
    
    return precio_final

resultado = calcular_precio_final(100, 0.2, 0.16)
```

### 2. Usar assert

Verificar suposiciones durante desarrollo:

```python
def dividir(a, b):
    assert b != 0, "El divisor no puede ser cero"
    return a / b

# dividir(10, 0)  # AssertionError: El divisor no puede ser cero

def calcular_promedio(numeros):
    assert len(numeros) > 0, "La lista no puede estar vacía"
    return sum(numeros) / len(numeros)
```

### 3. Try-Except (Manejo de Excepciones)

```python
# Básico
try:
    numero = int(input("Número: "))
    resultado = 10 / numero
    print(f"Resultado: {resultado}")
except ValueError:
    print("Error: Ingresa un número válido")
except ZeroDivisionError:
    print("Error: No se puede dividir por cero")

# Con else y finally
try:
    archivo = open("datos.txt", "r")
    contenido = archivo.read()
except FileNotFoundError:
    print("Archivo no encontrado")
else:
    # Se ejecuta si NO hay excepción
    print("Archivo leído correctamente")
finally:
    # SIEMPRE se ejecuta
    if 'archivo' in locals():
        archivo.close()
        print("Archivo cerrado")
```

### 4. Debugger de Python (pdb)

```python
import pdb

def calcular(a, b, c):
    pdb.set_trace()  # Breakpoint
    resultado = a * b + c
    return resultado

# Comandos del debugger:
# l - listar código
# n - siguiente línea
# s - step into (entrar a función)
# c - continuar hasta próximo breakpoint
# p variable - imprimir variable
# q - quit
```

### 5. Logging

Mejor que print para aplicaciones en producción:

```python
import logging

# Configurar logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

def procesar_datos(datos):
    logging.debug(f"Procesando {len(datos)} elementos")
    
    if not datos:
        logging.warning("Lista vacía recibida")
        return []
    
    try:
        resultado = [x * 2 for x in datos]
        logging.info("Procesamiento exitoso")
        return resultado
    except Exception as e:
        logging.error(f"Error: {e}")
        raise

# Niveles: DEBUG < INFO < WARNING < ERROR < CRITICAL
```

## 💡 Estrategias de Debugging

### 1. Divide y Vencerás

```python
# ❌ Función compleja con error
def procesar_complejo(datos):
    # 50 líneas de código...
    # ¿Dónde está el error?
    pass

# ✅ Dividir en funciones pequeñas
def validar_datos(datos):
    # 5 líneas
    pass

def transformar_datos(datos):
    # 5 líneas
    pass

def calcular_resultado(datos):
    # 5 líneas
    pass

def procesar_complejo(datos):
    datos = validar_datos(datos)
    datos = transformar_datos(datos)
    return calcular_resultado(datos)
```

### 2. Rubber Duck Debugging

Explica tu código línea por línea a un patito de goma (o cualquier objeto):

1. "Esta función recibe una lista..."
2. "Primero verifico si está vacía..."
3. "Luego itero cada elemento... ¡Ah! Aquí está el error"

### 3. Leer el Traceback Completo

```python
# No solo leas el tipo de error, lee TODO el traceback
def funcion_a():
    return funcion_b()

def funcion_b():
    return funcion_c()

def funcion_c():
    return 1 / 0  # Error aquí

# El traceback mostrará la cadena completa
funcion_a()
```

### 4. Simplificar el Problema

```python
# Si no encuentras el error, simplifica:

# Paso 1: ¿Funciona con datos simples?
resultado = funcion([1, 2, 3])

# Paso 2: ¿Funciona con datos vacíos?
resultado = funcion([])

# Paso 3: ¿Funciona con datos extremos?
resultado = funcion([1000000])
```

## 📊 Errores por Categoría

### Errores de Sintaxis
- `SyntaxError` - Sintaxis inválida
- `IndentationError` - Indentación incorrecta
- `TabError` - Mezcla de tabs y espacios

### Errores de Nombre/Tipo
- `NameError` - Nombre no definido
- `TypeError` - Tipo incorrecto
- `AttributeError` - Atributo inexistente

### Errores de Valor/Índice
- `ValueError` - Valor inválido
- `IndexError` - Índice fuera de rango
- `KeyError` - Clave no existe

### Errores de Sistema
- `FileNotFoundError` - Archivo no encontrado
- `PermissionError` - Sin permisos
- `ImportError` - Módulo no encontrado
- `MemoryError` - Sin memoria

## 💪 Ejercicios Prácticos

### Ejercicio 1: Identificar el Error

```python
# ¿Qué error tiene este código?
def calcular_promedio(numeros):
    total = 0
    for numero in numeros:
        total += numero
    return total / len(numero)  # Error aquí

# Corrígelo
```

<details>
<summary>✅ Solución</summary>

```python
# Error: NameError - 'numero' en vez de 'numeros'
def calcular_promedio(numeros):
    total = 0
    for numero in numeros:
        total += numero
    return total / len(numeros)  # Corregido

# Mejor aún:
def calcular_promedio(numeros):
    if not numeros:
        return 0
    return sum(numeros) / len(numeros)
```
</details>

### Ejercicio 2: Manejo de Excepciones

```python
# Crea una función segura que convierta string a int
def convertir_a_entero(texto):
    # Tu código aquí
    pass

# Debe manejar:
print(convertir_a_entero("123"))    # 123
print(convertir_a_entero("abc"))    # None o mensaje de error
print(convertir_a_entero("12.5"))   # None o mensaje de error
```

<details>
<summary>✅ Solución</summary>

```python
def convertir_a_entero(texto):
    try:
        return int(texto)
    except ValueError:
        print(f"Error: '{texto}' no es un entero válido")
        return None

print(convertir_a_entero("123"))    # 123
print(convertir_a_entero("abc"))    # None
print(convertir_a_entero("12.5"))   # None
```
</details>

## 🎯 Checklist de Debugging

Al enfrentar un error:

- [ ] ¿Leí el mensaje de error completo?
- [ ] ¿Identifiqué el número de línea exacto?
- [ ] ¿Verifiqué los valores de las variables involucradas?
- [ ] ¿Probé con datos más simples?
- [ ] ¿Busqué el error en Google/Stack Overflow?
- [ ] ¿Usé print() para rastrear el flujo?
- [ ] ¿Verifiqué la documentación de las funciones usadas?
- [ ] ¿Revisé cambios recientes en el código?

## 🔗 Temas Relacionados

- [Introducción](./introduccion)
- [Funciones](./funciones)
- [Try-Except](../intermedio/archivos)
- [Logging](../intermedio/modulos)

## 📚 Recursos Adicionales

- [Built-in Exceptions](https://docs.python.org/3/library/exceptions.html)
- [Debugging Strategies](https://realpython.com/python-debugging-pdb/)
- [Python Debugger](https://docs.python.org/3/library/pdb.html)

---

> 💡 **Recuerda**: Los errores son oportunidades de aprendizaje. No te frustres, ¡es parte del proceso!
