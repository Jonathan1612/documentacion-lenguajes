---
title: "Variables y Tipos de Datos"
level: basico
category: fundamentos
tags: [python, variables, tipos, int, float, str, bool, type]
duration: 30min
prerequisites: [introduccion]
---

# Variables y Tipos de Datos en Python

## 📋 ¿Qué son las Variables?

Una **variable** es un nombre que referencia a un valor en memoria. En Python, las variables son **tipado dinámico**: no necesitas declarar el tipo, Python lo infiere automáticamente.

```python
# Python (tipado dinámico)
nombre = "Ana"      # Python sabe que es string
edad = 25           # Python sabe que es int

# vs Java (tipado estático)
String nombre = "Ana";
int edad = 25;
```

## 🎯 Tipos de Datos Básicos

### 1. Enteros (int)

Números sin decimales, **tamaño ilimitado** en Python 3:

```python
edad = 25
poblacion = 7_800_000_000  # Guiones bajos para legibilidad
grande = 10**100  # 1 seguido de 100 ceros (¡Sin límite!)

print(type(edad))  # <class 'int'>
```

### 2. Flotantes (float)

Números con decimales:

```python
altura = 1.75
pi = 3.14159
temperatura = -15.5
cientifico = 2.5e6  # 2.5 × 10^6 = 2,500,000

print(type(pi))  # <class 'float'>
```

⚠️ **Precisión limitada**:
```python
print(0.1 + 0.2)  # 0.30000000000000004 (no es 0.3 exacto)
# Esto es normal en todos los lenguajes por representación binaria
```

### 3. Strings (str)

Texto, inmutables:

```python
nombre = "Ana"
mensaje = 'Hola'  # Comillas simples o dobles
multilinea = """Este es un
texto de varias
líneas"""

print(type(nombre))  # <class 'str'>
```

**Operaciones básicas:**
```python
# Concatenación
saludo = "Hola" + " " + "Mundo"  # "Hola Mundo"

# Repetición
risas = "ja" * 3  # "jajaja"

# Longitud
len("Python")  # 6

# Indexación (empieza en 0)
palabra = "Python"
print(palabra[0])   # 'P'
print(palabra[-1])  # 'n' (último)

# No se pueden modificar (inmutables)
# palabra[0] = 'J'  # ❌ TypeError
```

### 4. Booleanos (bool)

Solo dos valores: `True` o `False`

```python
activo = True
mayor_edad = False

print(type(activo))  # <class 'bool'>

# Valores que son False
print(bool(0))        # False
print(bool(""))       # False (string vacío)
print(bool([]))       # False (lista vacía)
print(bool(None))     # False

# Todo lo demás es True
print(bool(1))        # True
print(bool("Hola"))   # True
print(bool([1, 2]))   # True
```

### 5. None

Representa la **ausencia de valor**:

```python
resultado = None
print(type(resultado))  # <class 'NoneType'>

# Uso común
def buscar_usuario(id):
    # Si no encuentra usuario
    return None

usuario = buscar_usuario(999)
if usuario is None:  # Usar 'is' para None, no '=='
    print("Usuario no encontrado")
```

## 🔄 Conversiones de Tipo (Type Casting)

### Conversión Explícita

```python
# String a número
edad_str = "25"
edad_int = int(edad_str)      # 25
altura_str = "1.75"
altura_float = float(altura_str)  # 1.75

# Número a string
numero = 42
texto = str(numero)  # "42"

# Float a int (trunca, no redondea)
pi = 3.14
entero = int(pi)  # 3 (no 3.14)

# String a bool (¡cuidado!)
print(bool("False"))  # True (cualquier string no vacío es True)
print(bool(""))       # False (solo string vacío es False)
```

### Conversión Implícita

```python
# Python convierte automáticamente cuando es necesario
resultado = 5 + 2.3  # int + float = float
print(resultado)     # 7.3 (float)
print(type(resultado))  # <class 'float'>
```

## 📝 Declaración de Variables

### Asignación Simple

```python
nombre = "Ana"
edad = 25
altura = 1.65
```

### Asignación Múltiple

```python
# Varias variables a la vez
x, y, z = 10, 20, 30

# Intercambiar valores (¡genial!)
a, b = 5, 10
a, b = b, a  # Ahora a=10, b=5

# Desempaquetar
coordenadas = (100, 200)
x, y = coordenadas  # x=100, y=200
```

### Mismo Valor a Varias Variables

```python
a = b = c = 0
print(a, b, c)  # 0 0 0
```

## 🎨 Nombres de Variables

### Reglas

✅ **Permitido**:
- Letras, números y guión bajo `_`
- Empezar con letra o `_`
- Case sensitive (`nombre` ≠ `Nombre`)

❌ **No permitido**:
- Empezar con número
- Palabras reservadas (`if`, `for`, `class`)
- Espacios o caracteres especiales

```python
# ✅ Buenos nombres
nombre = "Ana"
edad_usuario = 25
_privado = "interno"
usuario1 = "Juan"

# ❌ Nombres inválidos
# 1usuario = "error"  # SyntaxError
# for = 10  # SyntaxError (palabra reservada)
# mi-nombre = "error"  # SyntaxError (guion medio)
```

### Convenciones (PEP 8)

```python
# snake_case para variables y funciones
primer_nombre = "Ana"
calcular_promedio()

# MAYUSCULAS para constantes
PI = 3.14159
MAX_USUARIOS = 100

# PascalCase para clases (lo veremos después)
class MiClase:
    pass
```

## 🔍 Ver Tipo de Variable

```python
edad = 25
print(type(edad))  # <class 'int'>

nombre = "Ana"
print(type(nombre))  # <class 'str'>

# Verificar tipo
print(isinstance(edad, int))     # True
print(isinstance(nombre, str))   # True
print(isinstance(edad, str))     # False
```

## 💡 Ejemplo Completo: Calculadora de IMC

```python
"""
Calculadora de Índice de Masa Corporal (IMC)
IMC = peso (kg) / altura (m)²
"""

print("=== Calculadora de IMC ===\n")

# Entrada de datos
nombre = input("Nombre: ")
peso = float(input("Peso en kg: "))
altura = float(input("Altura en metros: "))

# Cálculo
imc = peso / (altura ** 2)

# Clasificación
if imc < 18.5:
    categoria = "Bajo peso"
elif imc < 25:
    categoria = "Normal"
elif imc < 30:
    categoria = "Sobrepeso"
else:
    categoria = "Obesidad"

# Resultado
print(f"\n--- Resultado para {nombre} ---")
print(f"IMC: {imc:.2f}")  # 2 decimales
print(f"Categoría: {categoria}")
```

**Ejecución:**
```
=== Calculadora de IMC ===

Nombre: Carlos
Peso en kg: 75
Altura en metros: 1.75

--- Resultado para Carlos ---
IMC: 24.49
Categoría: Normal
```

## 📊 Operaciones por Tipo

### Con Números

```python
# Enteros
a, b = 10, 3
print(a + b)   # 13
print(a - b)   # 7
print(a * b)   # 30
print(a / b)   # 3.3333... (división float)
print(a // b)  # 3 (división entera)
print(a % b)   # 1 (módulo/resto)
print(a ** b)  # 1000 (potencia)
```

### Con Strings

```python
# Concatenación
nombre = "Ana"
apellido = "García"
completo = nombre + " " + apellido  # "Ana García"

# Repetición
separador = "-" * 20  # "--------------------"

# Métodos comunes
texto = "Python"
print(texto.upper())      # "PYTHON"
print(texto.lower())      # "python"
print(texto.capitalize()) # "Python"
print(texto.replace("P", "J"))  # "Jython"
```

## ⚠️ Errores Comunes

### 1. TypeError: No se pueden mezclar tipos incompatibles

```python
# ❌ Error
edad = 25
mensaje = "Tengo " + edad + " años"  # TypeError

# ✅ Correcto
mensaje = "Tengo " + str(edad) + " años"
# o mejor aún:
mensaje = f"Tengo {edad} años"  # f-string
```

### 2. ValueError: Conversión inválida

```python
# ❌ Error
numero = int("abc")  # ValueError: invalid literal

# ✅ Manejar con try-except
try:
    numero = int(input("Ingresa un número: "))
except ValueError:
    print("Eso no es un número válido")
```

### 3. Variable no definida

```python
# ❌ Error
print(variable_inexistente)  # NameError

# ✅ Asegúrate de definir primero
variable = 10
print(variable)
```

## 💪 Ejercicios Prácticos

### Ejercicio 1: Intercambio

```python
# Intercambia los valores de a y b sin variable temporal
a = 10
b = 20
# Tu código aquí
```

<details>
<summary>✅ Solución</summary>

```python
a, b = 10, 20
a, b = b, a
print(f"a = {a}, b = {b}")  # a = 20, b = 10
```
</details>

### Ejercicio 2: Convertidor de Temperatura

```python
# Convierte Celsius a Fahrenheit y Kelvin
# Fórmulas:
# F = C × 9/5 + 32
# K = C + 273.15
```

<details>
<summary>✅ Solución</summary>

```python
celsius = float(input("Temperatura en Celsius: "))

fahrenheit = celsius * 9/5 + 32
kelvin = celsius + 273.15

print(f"{celsius}°C equivale a:")
print(f"  {fahrenheit:.2f}°F")
print(f"  {kelvin:.2f}K")
```
</details>

### Ejercicio 3: Validador de Tipos

```python
# Crea un programa que pida un valor y muestre su tipo
valor = input("Ingresa algo: ")
# ¿Cómo determinar si es número, float o texto?
```

<details>
<summary>✅ Solución</summary>

```python
valor = input("Ingresa algo: ")

# Intentar conversiones
try:
    num_int = int(valor)
    print(f"'{valor}' es un entero")
except ValueError:
    try:
        num_float = float(valor)
        print(f"'{valor}' es un float")
    except ValueError:
        print(f"'{valor}' es un string")
```
</details>

## 📊 Tabla Resumen de Tipos

| Tipo | Ejemplo | Mutable | Conversión |
|------|---------|---------|------------|
| `int` | `42` | No | `int("42")` |
| `float` | `3.14` | No | `float("3.14")` |
| `str` | `"Hola"` | No | `str(42)` |
| `bool` | `True` | No | `bool(1)` |
| `None` | `None` | No | - |

## 🔗 Temas Relacionados

- [Introducción](./introduccion)
- [Operadores](./operadores)
- [Strings](./strings)

## 📚 Recursos Adicionales

- [Built-in Types](https://docs.python.org/3/library/stdtypes.html)
- [PEP 8 Naming Conventions](https://pep8.org/#naming-conventions)
- [Python Type System](https://docs.python.org/3/library/typing.html)

---

> 💡 **Recuerda**: Python es de tipado dinámico, pero eso no significa que puedas ignorar los tipos. Conocerlos te evitará muchos errores.
