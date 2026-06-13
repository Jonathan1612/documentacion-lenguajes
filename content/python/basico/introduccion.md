---
title: "Introducción a Python"
level: basico
category: fundamentos
tags: [python, introduccion, hola-mundo, instalacion, repl]
duration: 20min
prerequisites: []
---

# Introducción a Python

## 📋 ¿Qué es Python?

**Python** es un lenguaje de programación interpretado, de alto nivel, de tipado dinámico y propósito general. Creado por Guido van Rossum en 1991, Python enfatiza la legibilidad del código con su sintaxis clara y expresiva.

> 💡 **Filosofía**: "Simple es mejor que complejo" - The Zen of Python

## 🎯 ¿Por qué Python?

| Ventaja | Descripción |
|---------|-------------|
| **Sintaxis simple** | Código legible que parece pseudocódigo |
| **Versátil** | Web, ciencia de datos, ML, automatización, scripting |
| **Comunidad enorme** | Millones de desarrolladores y recursos |
| **Bibliotecas extensas** | PyPI con 400,000+ paquetes |
| **Multiplataforma** | Windows, macOS, Linux |
| **Productividad** | Escribir menos código para hacer más |

## 🔧 Instalación

### Windows
```bash
# Descarga desde python.org
# Opción 1: Instalador oficial
https://python.org/downloads

# Opción 2: Microsoft Store
winget install Python.Python.3.12

# Verificar instalación
python --version
# Python 3.12.0
```

### macOS
```bash
# Con Homebrew
brew install python3

# Verificar
python3 --version
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install python3 python3-pip

# Verificar
python3 --version
```

## 💻 Tu Primer Programa

### Hola Mundo

```python
# hola.py
print("¡Hola, Mundo!")
```

**Ejecutar:**
```bash
python hola.py
# ¡Hola, Mundo!
```

> 💡 **Comparación con Java**:
> ```java
> // Java necesita 5 líneas
> public class HolaMundo {
>     public static void main(String[] args) {
>         System.out.println("¡Hola, Mundo!");
>     }
> }
> ```
> Python necesita solo 1 línea 🎉

### Programa Interactivo

```python
nombre = input("¿Cómo te llamas? ")
print(f"¡Hola, {nombre}!")
print(f"Tu nombre tiene {len(nombre)} letras")
```

**Ejecución:**
```
¿Cómo te llamas? Ana
¡Hola, Ana!
Tu nombre tiene 3 letras
```

## 🔍 REPL Interactivo

**REPL** = Read-Eval-Print Loop (Leer-Evaluar-Imprimir-Repetir)

```bash
$ python
Python 3.12.0 (main, Oct 2023)
>>> 2 + 2
4
>>> "Hola" * 3
'HolaHolaHola'
>>> nombre = "Python"
>>> print(f"Me gusta {nombre}")
Me gusta Python
>>> exit()  # o Ctrl+D
```

> 💡 **Consejo**: El REPL es perfecto para experimentar y probar código rápidamente

## 📊 Sintaxis Básica

### Indentación (¡MUY IMPORTANTE!)

Python usa **indentación** (espacios) en lugar de llaves `{}`:

```python
# ✅ Correcto
if True:
    print("Este código está indentado")
    print("4 espacios o 1 tab")

# ❌ Error: IndentationError
if True:
print("Sin indentación causa error")
```

### Comentarios

```python
# Comentario de una línea

"""
Comentario
de múltiples
líneas (docstring)
"""

x = 10  # Comentario al final de línea
```

### Variables y Asignación

```python
# No necesitas declarar el tipo
nombre = "Ana"      # string
edad = 25           # int
altura = 1.65       # float
activo = True       # bool

# Asignación múltiple
x, y, z = 1, 2, 3

# Mismo valor a varias variables
a = b = c = 0
```

### Case Sensitivity

```python
nombre = "Ana"
Nombre = "Juan"
NOMBRE = "Pedro"

print(nombre)  # Ana (¡son variables diferentes!)
```

## 💡 Ejemplo Completo: Calculadora Simple

```python
"""
Calculadora básica en Python
Suma dos números ingresados por el usuario
"""

print("=== Calculadora Simple ===")

# Solicitar números al usuario
num1 = float(input("Ingresa el primer número: "))
num2 = float(input("Ingresa el segundo número: "))

# Realizar operaciones
suma = num1 + num2
resta = num1 - num2
multiplicacion = num1 * num2
division = num1 / num2 if num2 != 0 else "No se puede dividir por cero"

# Mostrar resultados
print(f"\nResultados:")
print(f"{num1} + {num2} = {suma}")
print(f"{num1} - {num2} = {resta}")
print(f"{num1} × {num2} = {multiplicacion}")
print(f"{num1} ÷ {num2} = {division}")
```

**Ejecución:**
```
=== Calculadora Simple ===
Ingresa el primer número: 10
Ingresa el segundo número: 3

Resultados:
10.0 + 3.0 = 13.0
10.0 - 3.0 = 7.0
10.0 × 3.0 = 30.0
10.0 ÷ 3.0 = 3.3333333333333335
```

## 🎨 The Zen of Python

Escribe `import this` en el REPL:

```python
>>> import this
```

Principios clave:
- **Simple es mejor que complejo**
- **Legible cuenta**
- **Los errores nunca deben pasar silenciosamente**
- **Debería haber una -y preferiblemente solo una- forma obvia de hacerlo**

## 🛠️ Herramientas Recomendadas

### Editores/IDEs

| Herramienta | Nivel | Descripción |
|-------------|-------|-------------|
| **VS Code** | Todos | Editor ligero con extensiones Python |
| **PyCharm** | Intermedio/Avanzado | IDE completo para Python |
| **Jupyter** | Data Science | Notebooks interactivos |
| **Sublime Text** | Principiante | Editor rápido y simple |

### Extensiones VS Code

- **Python** (Microsoft)
- **Pylance** (Language server)
- **Python Indent**
- **Better Comments**

## ⚠️ Errores Comunes

### 1. IndentationError

```python
# ❌ Error
if True:
print("Mal indentado")

# ✅ Correcto
if True:
    print("Bien indentado")
```

### 2. Olvidar los dos puntos

```python
# ❌ Error
if x > 0
    print("Positivo")

# ✅ Correcto
if x > 0:
    print("Positivo")
```

### 3. Mezclar tabs y espacios

```python
# ❌ Error: Algunos editores mezclan tabs y espacios
if True:
→   print("Tab")
    print("Espacios")

# ✅ Usa SOLO espacios (PEP 8 recomienda 4 espacios)
```

## 💪 Ejercicio Práctico

Crea un programa que:
1. Pida tu nombre y edad
2. Calcule en qué año naciste
3. Diga cuántos años tendrás en 2030

<details>
<summary>✅ Solución</summary>

```python
from datetime import datetime

# Obtener datos
nombre = input("¿Cómo te llamas? ")
edad = int(input("¿Cuántos años tienes? "))

# Cálculos
anio_actual = datetime.now().year
anio_nacimiento = anio_actual - edad
edad_en_2030 = 2030 - anio_nacimiento

# Resultados
print(f"\n👋 Hola {nombre}!")
print(f"📅 Naciste aproximadamente en {anio_nacimiento}")
print(f"🎂 En 2030 tendrás {edad_en_2030} años")
```
</details>

## 📊 Python vs Otros Lenguajes

```python
# Python - Simple y directo
numeros = [1, 2, 3, 4, 5]
cuadrados = [n**2 for n in numeros]
print(cuadrados)  # [1, 4, 9, 16, 25]
```

```java
// Java - Más verboso
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numeros = Arrays.asList(1, 2, 3, 4, 5);
        List<Integer> cuadrados = numeros.stream()
            .map(n -> n * n)
            .collect(Collectors.toList());
        System.out.println(cuadrados);
    }
}
```

## 🔗 Próximos Pasos

1. [Variables y Tipos de Datos](./variables)
2. [Operadores](./operadores)
3. [Control de Flujo](./control-flujo)

## 📚 Recursos Adicionales

- [Python.org Official Tutorial](https://docs.python.org/3/tutorial/)
- [Real Python](https://realpython.com/)
- [Python Tutor](https://pythontutor.com/) - Visualiza ejecución de código
- [PEP 8](https://pep8.org/) - Guía de estilo

---

> 🐍 **¡Bienvenido a Python!** Un lenguaje donde el código es poesía.
