---
title: "Operadores en Python"
level: basico
category: fundamentos
tags: [python, operadores, aritmeticos, logicos, comparacion]
duration: 25min
prerequisites: [variables]
---

# Operadores en Python

## 📋 ¿Qué son los Operadores?

Los **operadores** son símbolos especiales que realizan operaciones sobre valores y variables. Python ofrece operadores aritméticos, de comparación, lógicos, de asignación, y más.

## 🔢 Operadores Aritméticos

```python
a, b = 10, 3

print(a + b)   # 13  - Suma
print(a - b)   # 7   - Resta
print(a * b)   # 30  - Multiplicación
print(a / b)   # 3.333... - División (siempre retorna float)
print(a // b)  # 3   - División entera (floor division)
print(a % b)   # 1   - Módulo (resto)
print(a ** b)  # 1000 - Potencia (10³)
```

### División en Python

```python
# División normal (/)
print(10 / 3)   # 3.3333333333333335 (float)
print(10 / 2)   # 5.0 (float, aunque sea exacta)

# División entera (//)
print(10 // 3)  # 3 (trunca hacia abajo)
print(-10 // 3) # -4 (no -3, trunca hacia -∞)

# Módulo (%)
print(10 % 3)   # 1 (resto de 10 ÷ 3)
print(-10 % 3)  # 2 (el signo sigue al divisor)
```

### Potencia

```python
# Operador **
print(2 ** 3)    # 8 (2³)
print(2 ** 0.5)  # 1.414... (raíz cuadrada)
print(2 ** -1)   # 0.5 (2⁻¹ = 1/2)

# Alternativa: pow()
print(pow(2, 3))      # 8
print(pow(2, 3, 5))   # 3 (2³ % 5 - útil en criptografía)
```

## 🔗 Operadores de Asignación

```python
x = 10

# Operadores compuestos
x += 5   # x = x + 5  → 15
x -= 3   # x = x - 3  → 12
x *= 2   # x = x * 2  → 24
x /= 4   # x = x / 4  → 6.0
x //= 2  # x = x // 2 → 3.0
x %= 2   # x = x % 2  → 1.0
x **= 3  # x = x ** 3 → 1.0

# Asignación múltiple
a, b = 10, 20
a, b = b, a  # Intercambio elegante
```

## ⚖️ Operadores de Comparación

Retornan `True` o `False`:

```python
a, b = 10, 5

print(a == b)   # False - Igual a
print(a != b)   # True  - Diferente de
print(a > b)    # True  - Mayor que
print(a < b)    # False - Menor que
print(a >= b)   # True  - Mayor o igual
print(a <= b)   # False - Menor o igual

# Comparaciones encadenadas (¡Python es único!)
x = 15
print(0 < x < 20)      # True (x está entre 0 y 20)
print(10 <= x <= 20)   # True

# En otros lenguajes necesitarías:
# (x > 0) and (x < 20)
```

### Comparación de Strings

```python
# Orden lexicográfico (alfabético)
print("a" < "b")      # True
print("apple" < "banana")  # True
print("A" < "a")      # True (mayúsculas < minúsculas en ASCII)

# Case insensitive
nombre1 = "Ana"
nombre2 = "ana"
print(nombre1.lower() == nombre2.lower())  # True
```

## 🧠 Operadores Lógicos

Operan sobre booleanos: `and`, `or`, `not`

```python
# AND - Ambos deben ser True
print(True and True)    # True
print(True and False)   # False
print(False and False)  # False

# OR - Al menos uno debe ser True
print(True or False)    # True
print(False or False)   # False

# NOT - Invierte el valor
print(not True)         # False
print(not False)        # True

# Ejemplo práctico
edad = 20
tiene_licencia = True

puede_conducir = edad >= 18 and tiene_licencia
print(puede_conducir)  # True
```

### Cortocircuito (Short-circuit)

```python
# AND: Si el primero es False, no evalúa el segundo
def funcion_cara():
    print("Ejecutando función cara...")
    return True

resultado = False and funcion_cara()  # No imprime nada
resultado = True and funcion_cara()   # Sí imprime

# OR: Si el primero es True, no evalúa el segundo
resultado = True or funcion_cara()   # No imprime
resultado = False or funcion_cara()  # Sí imprime
```

## 🆔 Operadores de Identidad

Comparan si dos variables apuntan al **mismo objeto** en memoria:

```python
# is vs ==
a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(a == b)   # True (mismo contenido)
print(a is b)   # False (objetos diferentes)
print(a is c)   # True (mismo objeto)

# Con None SIEMPRE usar 'is'
valor = None
print(valor is None)   # ✅ Correcto
print(valor == None)   # ⚠️ Funciona pero no recomendado

# Pequeños enteros y strings se cachean
x = 256
y = 256
print(x is y)  # True (Python cachea -5 a 256)

x = 257
y = 257
print(x is y)  # False (fuera del rango de caché)
```

## 📦 Operadores de Pertenencia

`in` y `not in` verifican si un elemento está en una secuencia:

```python
# Con listas
frutas = ["manzana", "banana", "naranja"]
print("banana" in frutas)      # True
print("uva" not in frutas)     # True

# Con strings
texto = "Python es genial"
print("Python" in texto)       # True
print("Java" not in texto)     # True

# Con diccionarios (verifica claves)
persona = {"nombre": "Ana", "edad": 25}
print("nombre" in persona)     # True
print("altura" not in persona) # True
```

## 🎯 Operador Ternario

Expresión condicional en una línea:

```python
# Sintaxis: valor_si_true if condicion else valor_si_false
edad = 20
estado = "Mayor" if edad >= 18 else "Menor"
print(estado)  # "Mayor"

# Equivalente con if normal:
if edad >= 18:
    estado = "Mayor"
else:
    estado = "Menor"

# Casos de uso
numero = 10
print("Par" if numero % 2 == 0 else "Impar")  # "Par"

# Anidado (menos legible, usar con cuidado)
nota = 85
resultado = "A" if nota >= 90 else "B" if nota >= 80 else "C"
```

## 🔢 Operadores de Bits

Para manipulación a nivel de bits:

```python
a = 60  # 0011 1100
b = 13  # 0000 1101

print(a & b)   # 12  - AND  (0000 1100)
print(a | b)   # 61  - OR   (0011 1101)
print(a ^ b)   # 49  - XOR  (0011 0001)
print(~a)      # -61 - NOT  (complemento)
print(a << 2)  # 240 - Shift izquierda (multiplicar por 2²)
print(a >> 2)  # 15  - Shift derecha (dividir por 2²)

# Uso práctico: verificar si número es par
numero = 10
es_par = (numero & 1) == 0  # True (bit menos significativo es 0)
```

## 📊 Precedencia de Operadores

Del más alto al más bajo:

```python
# 1. Paréntesis
resultado = (2 + 3) * 4  # 20

# 2. Potencia
print(2 ** 3 ** 2)  # 512 (no 64) - se evalúa de derecha a izquierda
print((2 ** 3) ** 2)  # 64

# 3. Unarios: +x, -x, ~x
print(-2 ** 2)  # -4 (no 4, potencia primero)
print((-2) ** 2)  # 4

# 4. *, /, //, %
print(10 + 5 * 2)  # 20 (no 30)

# 5. +, -
print(10 - 5 + 2)  # 7 (izquierda a derecha)

# 6. Comparación
# 7. not
# 8. and
# 9. or

# Ejemplo complejo
resultado = 5 + 3 * 2 > 10 and not False or True
# 5 + 6 > 10 and True or True
# 11 > 10 and True or True
# True and True or True
# True or True
# True
```

## 💡 Ejemplo Completo: Validador de Contraseña

```python
"""
Valida una contraseña según criterios:
- Longitud >= 8
- Tiene mayúscula
- Tiene minúscula
- Tiene número
"""

contraseña = input("Ingresa una contraseña: ")

# Verificaciones
longitud_ok = len(contraseña) >= 8
tiene_mayuscula = any(c.isupper() for c in contraseña)
tiene_minuscula = any(c.islower() for c in contraseña)
tiene_numero = any(c.isdigit() for c in contraseña)

# Validación
es_valida = (
    longitud_ok and
    tiene_mayuscula and
    tiene_minuscula and
    tiene_numero
)

# Resultado
print("\n=== Validación de Contraseña ===")
print(f"✓ Longitud >= 8: {'Sí' if longitud_ok else 'No'}")
print(f"✓ Mayúscula: {'Sí' if tiene_mayuscula else 'No'}")
print(f"✓ Minúscula: {'Sí' if tiene_minuscula else 'No'}")
print(f"✓ Número: {'Sí' if tiene_numero else 'No'}")
print(f"\n{'✅ Contraseña válida' if es_valida else '❌ Contraseña inválida'}")
```

## ⚠️ Errores Comunes

### 1. Confundir = con ==

```python
# ❌ Error
if x = 10:  # SyntaxError: invalid syntax
    print("Diez")

# ✅ Correcto
if x == 10:
    print("Diez")
```

### 2. División por cero

```python
# ❌ Error
resultado = 10 / 0  # ZeroDivisionError

# ✅ Verificar primero
divisor = 0
if divisor != 0:
    resultado = 10 / divisor
else:
    print("No se puede dividir por cero")
```

### 3. Usar 'is' para comparar valores

```python
# ❌ Mal uso
x = 1000
y = 1000
if x is y:  # Puede ser False (depende del intérprete)
    print("Iguales")

# ✅ Correcto
if x == y:  # Compara valores, no identidad
    print("Iguales")
```

## 💪 Ejercicios Prácticos

### Ejercicio 1: Calculadora Completa

```python
# Crea una calculadora que soporte +, -, *, /, //, %, **
num1 = float(input("Primer número: "))
operador = input("Operador (+, -, *, /, //, %, **): ")
num2 = float(input("Segundo número: "))
# Tu código aquí
```

<details>
<summary>✅ Solución</summary>

```python
num1 = float(input("Primer número: "))
operador = input("Operador (+, -, *, /, //, %, **): ")
num2 = float(input("Segundo número: "))

if operador == "+":
    resultado = num1 + num2
elif operador == "-":
    resultado = num1 - num2
elif operador == "*":
    resultado = num1 * num2
elif operador == "/":
    resultado = num1 / num2 if num2 != 0 else "Error: división por cero"
elif operador == "//":
    resultado = num1 // num2 if num2 != 0 else "Error: división por cero"
elif operador == "%":
    resultado = num1 % num2 if num2 != 0 else "Error: división por cero"
elif operador == "**":
    resultado = num1 ** num2
else:
    resultado = "Operador inválido"

print(f"{num1} {operador} {num2} = {resultado}")
```
</details>

### Ejercicio 2: Verificador de Año Bisiesto

```python
# Un año es bisiesto si:
# - Es divisible por 4 Y
# - NO es divisible por 100, EXCEPTO si es divisible por 400
# Ejemplos: 2000 (sí), 1900 (no), 2024 (sí)
```

<details>
<summary>✅ Solución</summary>

```python
año = int(input("Año: "))

es_bisiesto = (año % 4 == 0 and año % 100 != 0) or (año % 400 == 0)

print(f"{año} {'es' if es_bisiesto else 'no es'} bisiesto")
```
</details>

## 📊 Tabla Resumen

| Categoría | Operadores | Ejemplo |
|-----------|------------|---------|
| Aritméticos | `+`, `-`, `*`, `/`, `//`, `%`, `**` | `10 + 3` |
| Comparación | `==`, `!=`, `>`, `<`, `>=`, `<=` | `x > 5` |
| Lógicos | `and`, `or`, `not` | `a and b` |
| Asignación | `=`, `+=`, `-=`, `*=`, `/=` | `x += 5` |
| Identidad | `is`, `is not` | `x is None` |
| Pertenencia | `in`, `not in` | `"a" in "hola"` |
| Bits | `&`, `|`, `^`, `~`, `<<`, `>>` | `5 & 3` |

## 🔗 Temas Relacionados

- [Variables](./variables)
- [Control de Flujo](./control-flujo)
- [Funciones](./funciones)

## 📚 Recursos Adicionales

- [Python Operators](https://docs.python.org/3/library/operator.html)
- [Operator Precedence](https://docs.python.org/3/reference/expressions.html#operator-precedence)

---

> 💡 **Consejo**: Usa paréntesis cuando tengas dudas sobre precedencia. La legibilidad es más importante que ahorrar caracteres.
