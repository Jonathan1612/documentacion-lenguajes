---
title: "Control de Flujo"
level: basico
category: fundamentos
tags: [python, if, elif, else, for, while, break, continue]
duration: 25min
prerequisites: [operadores]
---

# Control de Flujo en Python

## 📋 ¿Qué es el Control de Flujo?

El **control de flujo** determina el orden en que se ejecutan las instrucciones. Python ofrece estructuras para tomar decisiones (`if`) y repetir código (`for`, `while`).

> 💡 **Importante**: Python usa **indentación** (espacios) para definir bloques de código, no llaves `{}`.

## 🔀 Condicionales: if, elif, else

### if simple

```python
edad = 20

if edad >= 18:
    print("Eres mayor de edad")
    print("Puedes votar")

# Ejecuta solo si la condición es True
```

### if-else

```python
temperatura = 30

if temperatura > 25:
    print("Hace calor")
else:
    print("Clima fresco")
```

### if-elif-else

```python
nota = 85

if nota >= 90:
    calificacion = "A"
elif nota >= 80:
    calificacion = "B"
elif nota >= 70:
    calificacion = "C"
elif nota >= 60:
    calificacion = "D"
else:
    calificacion = "F"

print(f"Calificación: {calificacion}")
```

### Condiciones Anidadas

```python
edad = 25
tiene_licencia = True

if edad >= 18:
    if tiene_licencia:
        print("Puedes conducir")
    else:
        print("Necesitas obtener licencia")
else:
    print("Eres menor de edad")
```

### Condiciones en una Línea

```python
# Operador ternario
edad = 20
estado = "Mayor" if edad >= 18 else "Menor"

# if de una línea (sin else)
if edad >= 18: print("Mayor de edad")
```

## 🔁 Bucle for

Itera sobre secuencias (listas, strings, rangos):

### for con range()

```python
# range(n): 0 hasta n-1
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# range(inicio, fin): inicio hasta fin-1
for i in range(2, 6):
    print(i)  # 2, 3, 4, 5

# range(inicio, fin, paso)
for i in range(0, 10, 2):
    print(i)  # 0, 2, 4, 6, 8

# Rango descendente
for i in range(5, 0, -1):
    print(i)  # 5, 4, 3, 2, 1
```

### for con Listas

```python
frutas = ["manzana", "banana", "naranja"]

# Iterar elementos
for fruta in frutas:
    print(fruta)

# Con índice: enumerate()
for i, fruta in enumerate(frutas):
    print(f"{i}: {fruta}")
# 0: manzana
# 1: banana
# 2: naranja

# Desde índice específico
for i, fruta in enumerate(frutas, start=1):
    print(f"{i}. {fruta}")
```

### for con Strings

```python
palabra = "Python"

for letra in palabra:
    print(letra)  # P, y, t, h, o, n

# Contar vocales
vocales = 0
for letra in palabra.lower():
    if letra in "aeiou":
        vocales += 1
print(f"Vocales: {vocales}")
```

### for con Diccionarios

```python
persona = {"nombre": "Ana", "edad": 25, "ciudad": "Madrid"}

# Iterar claves
for clave in persona:
    print(clave)  # nombre, edad, ciudad

# Iterar valores
for valor in persona.values():
    print(valor)  # Ana, 25, Madrid

# Iterar clave-valor
for clave, valor in persona.items():
    print(f"{clave}: {valor}")
```

## 🔄 Bucle while

Ejecuta mientras la condición sea True:

### while básico

```python
contador = 0

while contador < 5:
    print(contador)
    contador += 1
# 0, 1, 2, 3, 4
```

### while con Condición Compleja

```python
saldo = 1000
retiro = 0

while saldo > 0 and retiro < 500:
    cantidad = 100
    saldo -= cantidad
    retiro += cantidad
    print(f"Saldo: ${saldo}, Retirado: ${retiro}")
```

### Bucle Infinito (Controlado)

```python
while True:
    opcion = input("Escribe 'salir' para terminar: ")
    if opcion.lower() == "salir":
        break
    print(f"Escribiste: {opcion}")
```

## 🛑 break - Salir del Bucle

Termina el bucle inmediatamente:

```python
# Buscar un número
numeros = [3, 7, 1, 9, 2, 5]
objetivo = 9

for num in numeros:
    if num == objetivo:
        print(f"¡Encontrado! {num}")
        break
    print(f"Revisando: {num}")
# Revisando: 3
# Revisando: 7
# Revisando: 1
# ¡Encontrado! 9
```

## ⏭️ continue - Saltar Iteración

Salta a la siguiente iteración:

```python
# Imprimir solo números impares
for i in range(10):
    if i % 2 == 0:  # Si es par
        continue    # Salta a la siguiente iteración
    print(i)  # Solo imprime impares: 1, 3, 5, 7, 9
```

## 🚫 pass - Placeholder

No hace nada (útil como marcador):

```python
# Para código que implementarás después
for i in range(5):
    if i == 3:
        pass  # TODO: Implementar lógica especial
    else:
        print(i)

# En funciones vacías
def funcion_futura():
    pass  # Sin esto, daría SyntaxError

# En clases vacías
class MiClase:
    pass
```

## 🔚 else en Bucles

Python permite `else` después de bucles (ejecuta si NO se usó `break`):

```python
# Buscar número primo
numero = 17
es_primo = True

for i in range(2, numero):
    if numero % i == 0:
        es_primo = False
        break
else:
    # Se ejecuta si NO se hizo break
    print(f"{numero} es primo")
```

## 💡 Ejemplo Completo: Juego de Adivinanza

```python
import random

"""
Juego: Adivina el número entre 1 y 100
Máximo 7 intentos
"""

numero_secreto = random.randint(1, 100)
intentos = 0
max_intentos = 7

print("🎮 ¡Adivina el número entre 1 y 100!")
print(f"Tienes {max_intentos} intentos\n")

while intentos < max_intentos:
    try:
        intento = int(input(f"Intento #{intentos + 1}: "))
        intentos += 1
        
        if intento < 1 or intento > 100:
            print("⚠️  Debe ser entre 1 y 100")
            continue
        
        if intento == numero_secreto:
            print(f"🎉 ¡CORRECTO! Era {numero_secreto}")
            print(f"Lo lograste en {intentos} intentos")
            break
        elif intento < numero_secreto:
            print("📈 Más alto...")
        else:
            print("📉 Más bajo...")
        
        if intentos == max_intentos:
            print(f"\n❌ Se acabaron los intentos. Era {numero_secreto}")
    
    except ValueError:
        print("⚠️  Ingresa un número válido")
```

## 📊 Patrones Comunes

### Suma de Números

```python
# Suma de 1 a 100
total = 0
for i in range(1, 101):
    total += i
print(total)  # 5050

# Más pythónico
print(sum(range(1, 101)))
```

### Factorial

```python
# 5! = 5 × 4 × 3 × 2 × 1
n = 5
factorial = 1

for i in range(1, n + 1):
    factorial *= i
print(f"{n}! = {factorial}")  # 120
```

### Tabla de Multiplicar

```python
numero = 7

for i in range(1, 11):
    print(f"{numero} × {i} = {numero * i}")
```

### Validación de Entrada

```python
# Pedir número hasta que sea válido
while True:
    try:
        edad = int(input("Tu edad: "))
        if edad < 0 or edad > 150:
            print("Edad inválida")
            continue
        break  # Salir si es válida
    except ValueError:
        print("Ingresa un número")

print(f"Edad registrada: {edad}")
```

## ⚠️ Errores Comunes

### 1. Olvidar Indentación

```python
# ❌ Error
if True:
print("Error")  # IndentationError

# ✅ Correcto
if True:
    print("Correcto")
```

### 2. Usar = en vez de ==

```python
x = 10

# ❌ Error
if x = 10:  # SyntaxError
    print("Diez")

# ✅ Correcto
if x == 10:
    print("Diez")
```

### 3. Bucle Infinito Accidental

```python
# ❌ Error (bucle infinito)
i = 0
while i < 5:
    print(i)
    # Olvidaste incrementar i

# ✅ Correcto
i = 0
while i < 5:
    print(i)
    i += 1
```

### 4. Modificar Lista Durante Iteración

```python
numeros = [1, 2, 3, 4, 5]

# ❌ Comportamiento inesperado
for num in numeros:
    if num % 2 == 0:
        numeros.remove(num)  # Modifica durante iteración

# ✅ Correcto: Crear nueva lista
numeros = [num for num in numeros if num % 2 != 0]
```

## 💪 Ejercicios Prácticos

### Ejercicio 1: FizzBuzz

```python
# Para números del 1 al 100:
# - Si es divisible por 3: imprime "Fizz"
# - Si es divisible por 5: imprime "Buzz"
# - Si es divisible por ambos: imprime "FizzBuzz"
# - Si no: imprime el número
```

<details>
<summary>✅ Solución</summary>

```python
for i in range(1, 101):
    if i % 3 == 0 and i % 5 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)
```
</details>

### Ejercicio 2: Pirámide de Asteriscos

```python
# Imprime una pirámide de altura n
# n=5:
#     *
#    ***
#   *****
#  *******
# *********
```

<details>
<summary>✅ Solución</summary>

```python
n = 5

for i in range(1, n + 1):
    espacios = " " * (n - i)
    asteriscos = "*" * (2 * i - 1)
    print(espacios + asteriscos)
```
</details>

### Ejercicio 3: Número Primo

```python
# Determina si un número es primo
numero = int(input("Número: "))
# Tu código aquí
```

<details>
<summary>✅ Solución</summary>

```python
numero = int(input("Número: "))

if numero < 2:
    print(f"{numero} no es primo")
else:
    es_primo = True
    for i in range(2, int(numero ** 0.5) + 1):
        if numero % i == 0:
            es_primo = False
            break
    
    if es_primo:
        print(f"{numero} es primo")
    else:
        print(f"{numero} no es primo")
```
</details>

## 📊 Tabla Comparativa

| Estructura | Cuándo Usar |
|------------|-------------|
| `if/elif/else` | Tomar decisiones basadas en condiciones |
| `for` | Número conocido de iteraciones |
| `while` | Iterar mientras condición sea True |
| `break` | Salir del bucle prematuramente |
| `continue` | Saltar a siguiente iteración |
| `pass` | Placeholder, no hacer nada |

## 🔗 Temas Relacionados

- [Operadores](./operadores)
- [Funciones](./funciones)
- [Listas](./listas-tuplas)

## 📚 Recursos Adicionales

- [Control Flow Tutorial](https://docs.python.org/3/tutorial/controlflow.html)
- [Python For Loops](https://realpython.com/python-for-loop/)
- [While Loops](https://realpython.com/python-while-loop/)

---

> 💡 **Recuerda**: La indentación no es solo estilo en Python, ¡es sintaxis! 4 espacios es el estándar.
