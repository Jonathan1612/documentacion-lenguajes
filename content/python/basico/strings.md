---
title: "Strings (Cadenas de Texto)"
level: basico
category: fundamentos
tags: [python, strings, str, format, fstring, slicing]
duration: 25min
prerequisites: [listas-tuplas]
---

# Strings en Python

## 📋 ¿Qué son los Strings?

Los **strings** (`str`) son secuencias inmutables de caracteres para representar texto.

```python
# Crear strings
simple = 'Hola'
dobles = "Mundo"
triple_simple = '''Texto
multilínea'''
triple_doble = """También
multilínea"""

# Escape
con_comillas = "Él dijo: \"Hola\""
con_salto = "Línea 1\nLínea 2"
con_tab = "Col1\tCol2"
```

## 🔤 Operaciones Básicas

### Concatenación y Repetición

```python
# Concatenación
nombre = "Ana"
apellido = "García"
completo = nombre + " " + apellido  # "Ana García"

# Repetición
guiones = "-" * 20  # "--------------------"
```

### Longitud e Índices

```python
texto = "Python"

# Longitud
print(len(texto))  # 6

# Acceso por índice
print(texto[0])    # "P"
print(texto[-1])   # "n"

# Slicing
print(texto[0:3])  # "Pyt"
print(texto[2:])   # "thon"
print(texto[::-1]) # "nohtyP" (invertir)

# Inmutabilidad
# texto[0] = "J"  # TypeError: 'str' object does not support item assignment
```

## 🔧 Métodos de String

### Cambiar Caso

```python
texto = "Hola Mundo"

print(texto.upper())       # "HOLA MUNDO"
print(texto.lower())       # "hola mundo"
print(texto.capitalize())  # "Hola mundo"
print(texto.title())       # "Hola Mundo"
print(texto.swapcase())    # "hOLA mUNDO"
```

### Buscar y Verificar

```python
texto = "Python es genial"

# Buscar
print(texto.find("es"))      # 7 (índice)
print(texto.find("xyz"))     # -1 (no encontrado)
print(texto.index("es"))     # 7
# print(texto.index("xyz"))  # ValueError

# Contar
print(texto.count("e"))      # 2

# Verificar
print(texto.startswith("Py"))  # True
print(texto.endswith("al"))    # True
print("Python" in texto)       # True
```

### Limpiar y Dividir

```python
# strip() - eliminar espacios
texto = "  Hola  "
print(texto.strip())   # "Hola"
print(texto.lstrip())  # "Hola  " (izquierda)
print(texto.rstrip())  # "  Hola" (derecha)

# split() - dividir en lista
frase = "Python es genial"
palabras = frase.split()  # ["Python", "es", "genial"]
csv = "a,b,c,d"
lista = csv.split(",")    # ["a", "b", "c", "d"]

# join() - unir lista
palabras = ["Python", "es", "genial"]
frase = " ".join(palabras)  # "Python es genial"
```

### Reemplazar

```python
texto = "Hola mundo, mundo"

# replace()
nuevo = texto.replace("mundo", "Python")
print(nuevo)  # "Hola Python, Python"

# Limitar reemplazos
nuevo = texto.replace("mundo", "Python", 1)
print(nuevo)  # "Hola Python, mundo"
```

### Validación

```python
# isalpha() - solo letras
print("Python".isalpha())    # True
print("Python3".isalpha())   # False

# isdigit() - solo dígitos
print("123".isdigit())       # True
print("12.3".isdigit())      # False

# isalnum() - letras o dígitos
print("Python3".isalnum())   # True
print("Python 3".isalnum())  # False

# isspace() - solo espacios
print("   ".isspace())       # True

# islower(), isupper()
print("python".islower())    # True
print("PYTHON".isupper())    # True
```

## 🎨 Formateo de Strings

### f-strings (Python 3.6+) - Recomendado

```python
nombre = "Ana"
edad = 25

# Básico
mensaje = f"Hola, soy {nombre} y tengo {edad} años"

# Con expresiones
print(f"En 5 años tendré {edad + 5} años")

# Formateo de números
pi = 3.14159
print(f"Pi: {pi:.2f}")  # "Pi: 3.14" (2 decimales)

numero = 1234567
print(f"Número: {numero:,}")  # "Número: 1,234,567"

# Alineación
print(f"{'Izquierda':<20}|")   # "Izquierda          |"
print(f"{'Centrado':^20}|")    # "     Centrado      |"
print(f"{'Derecha':>20}|")     # "            Derecha|"
```

### format()

```python
# Básico
mensaje = "Hola, soy {} y tengo {} años".format("Ana", 25)

# Con índices
mensaje = "{0} {1}, {1} {0}".format("Hola", "Mundo")
# "Hola Mundo, Mundo Hola"

# Con nombres
mensaje = "{nombre} tiene {edad} años".format(nombre="Ana", edad=25)
```

### % (Antiguo - Evitar)

```python
nombre = "Ana"
edad = 25
mensaje = "Hola, soy %s y tengo %d años" % (nombre, edad)
```

## 🔍 Búsqueda y Validación

### Métodos find y index

```python
texto = "Python es genial"

# find() - retorna -1 si no encuentra
print(texto.find("es"))      # 7
print(texto.find("xyz"))     # -1
print(texto.rfind("e"))      # 14 (desde la derecha)

# index() - lanza ValueError si no encuentra
print(texto.index("es"))     # 7
# print(texto.index("xyz"))  # ValueError
```

## 📝 Caracteres Especiales

```python
# Escape
print("Él dijo: \"Hola\"")        # Comillas
print("C:\\Users\\Desktop")       # Barra invertida
print("Línea 1\nLínea 2")         # Salto de línea
print("Nombre:\tAna")             # Tabulación

# Raw strings (r"")
ruta = r"C:\Users\Desktop"  # Sin escape
print(ruta)  # C:\Users\Desktop

# Unicode
print("\u03B1")  # α
print("\u2665")  # ♥
```

## 💡 Ejemplo Completo: Validador de Email

```python
def validar_email(email):
    """Valida formato básico de email"""
    email = email.strip().lower()
    
    # Verificaciones básicas
    if email.count("@") != 1:
        return False, "Debe tener exactamente un @"
    
    partes = email.split("@")
    usuario, dominio = partes[0], partes[1]
    
    # Validar usuario
    if not usuario or not usuario[0].isalnum():
        return False, "Usuario inválido"
    
    # Validar dominio
    if "." not in dominio:
        return False, "Dominio debe contener un punto"
    
    if dominio.startswith(".") or dominio.endswith("."):
        return False, "Dominio inválido"
    
    return True, "Email válido"

# Pruebas
emails = [
    "ana@example.com",
    "invalido@",
    "@invalido.com",
    "valido.nombre@dominio.com.mx"
]

for email in emails:
    valido, mensaje = validar_email(email)
    print(f"{email:<30} {'✅' if valido else '❌'} {mensaje}")
```

## 📊 Métodos Principales

| Método | Descripción | Ejemplo |
|--------|-------------|---------|
| `upper()`, `lower()` | Cambiar caso | `"Hola".upper()` |
| `strip()` | Eliminar espacios | `" a ".strip()` |
| `split()` | Dividir en lista | `"a b".split()` |
| `join()` | Unir lista | `"-".join(["a","b"])` |
| `replace(old, new)` | Reemplazar | `"ab".replace("a","x")` |
| `find(sub)` | Buscar substring | `"abc".find("b")` |
| `startswith()`, `endswith()` | Verificar inicio/fin | `"abc".startswith("a")` |
| `isdigit()`, `isalpha()` | Validar tipo | `"123".isdigit()` |
| `format()` | Formatear | `"{} {}".format("a","b")` |

## 💪 Ejercicios Prácticos

### Ejercicio 1: Contar Vocales

```python
def contar_vocales(texto):
    """Cuenta las vocales en un texto"""
    # Tu código aquí
    pass

print(contar_vocales("Hola Mundo"))  # 4
```

<details>
<summary>✅ Solución</summary>

```python
def contar_vocales(texto):
    vocales = "aeiouAEIOU"
    return sum(1 for letra in texto if letra in vocales)

print(contar_vocales("Hola Mundo"))  # 4
```
</details>

### Ejercicio 2: Invertir Palabras

```python
def invertir_palabras(frase):
    """Invierte cada palabra manteniendo el orden"""
    # "Hola Mundo" -> "aloH odnuM"
    pass
```

<details>
<summary>✅ Solución</summary>

```python
def invertir_palabras(frase):
    palabras = frase.split()
    invertidas = [palabra[::-1] for palabra in palabras]
    return " ".join(invertidas)

print(invertir_palabras("Hola Mundo"))  # "aloH odnuM"
```
</details>

### Ejercicio 3: Es Palíndromo

```python
def es_palindromo(texto):
    """Verifica si es palíndromo (ignora espacios y mayúsculas)"""
    # "Anita lava la tina" -> True
    pass
```

<details>
<summary>✅ Solución</summary>

```python
def es_palindromo(texto):
    limpio = texto.replace(" ", "").lower()
    return limpio == limpio[::-1]

print(es_palindromo("Anita lava la tina"))  # True
print(es_palindromo("Python"))              # False
```
</details>

## ⚠️ Errores Comunes

```python
# 1. Modificar string directamente
texto = "Hola"
# ❌ texto[0] = "J"  # TypeError
# ✅ Crear nuevo string
texto = "J" + texto[1:]

# 2. Confundir find() con in
texto = "Python"
# ❌ if texto.find("x"):  # 0 es False!
# ✅ if texto.find("x") != -1:
# ✅ Mejor: if "x" in texto:

# 3. Olvidar que strings son inmutables
texto = "hola"
texto.upper()  # ❌ No modifica texto
texto = texto.upper()  # ✅ Asignar resultado
```

## 🔗 Temas Relacionados

- [Variables](./variables)
- [Listas](./listas-tuplas)
- [Expresiones Regulares](../intermedio/regex)

## 📚 Recursos Adicionales

- [String Methods](https://docs.python.org/3/library/stdtypes.html#string-methods)
- [f-strings Guide](https://realpython.com/python-f-strings/)

---

> 💡 **Tip**: Usa f-strings para formateo moderno y legible: `f"Hola {nombre}"`
