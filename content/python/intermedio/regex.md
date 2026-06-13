---
title: "Expresiones Regulares (regex)"
level: intermedio
category: texto
tags: [python, regex, re, patrones, búsqueda]
duration: 35min
prerequisites: [strings]
---

# Expresiones Regulares en Python

## 🔍 El Módulo re

```python
import re

# Buscar patrón
texto = "Mi email es ana@mail.com"
patron = r"[\w.-]+@[\w.-]+\.\w+"
match = re.search(patron, texto)

if match:
    print(match.group())  # ana@mail.com
```

## 📋 Funciones Principales

### search() - Primera Coincidencia

```python
import re

texto = "Tengo 25 años y gano 5000 al mes"

# Buscar número
match = re.search(r"\d+", texto)
if match:
    print(match.group())  # "25" (primero que encuentra)
    print(match.start())  # 6 (posición inicio)
    print(match.end())    # 8 (posición fin)
```

### findall() - Todas las Coincidencias

```python
texto = "Tengo 25 años y gano 5000 al mes"
numeros = re.findall(r"\d+", texto)
print(numeros)  # ['25', '5000']

# Extraer emails
texto = "Contactos: ana@mail.com, juan@test.com"
emails = re.findall(r"[\w.-]+@[\w.-]+\.\w+", texto)
print(emails)  # ['ana@mail.com', 'juan@test.com']
```

### match() - Coincidencia al Inicio

```python
# Solo coincide si el patrón está al inicio
texto1 = "123abc"
texto2 = "abc123"

print(re.match(r"\d+", texto1))  # Match (empieza con dígitos)
print(re.match(r"\d+", texto2))  # None (no empieza con dígitos)
```

### sub() - Reemplazar

```python
texto = "Mi número es 555-1234"
# Reemplazar números por X
resultado = re.sub(r"\d", "X", texto)
print(resultado)  # "Mi número es XXX-XXXX"

# Censurar emails
texto = "Contacto: ana@mail.com y juan@test.com"
censurado = re.sub(r"[\w.-]+@[\w.-]+\.\w+", "[EMAIL]", texto)
print(censurado)  # "Contacto: [EMAIL] y [EMAIL]"
```

## 🎯 Patrones Comunes

```python
# \d - Dígito (0-9)
# \w - Letra, dígito o _ ([a-zA-Z0-9_])
# \s - Espacio en blanco
# \D - NO dígito
# \W - NO letra/dígito/_
# \S - NO espacio

# . - Cualquier carácter (excepto salto de línea)
# ^ - Inicio de string
# $ - Fin de string

# * - 0 o más repeticiones
# + - 1 o más repeticiones
# ? - 0 o 1 repetición
# {n} - Exactamente n repeticiones
# {n,m} - Entre n y m repeticiones

# [] - Conjunto de caracteres
# () - Grupo de captura
# | - OR lógico
```

## 📧 Ejemplo: Validar Email

```python
import re

def validar_email(email):
    patron = r"^[\w.-]+@[\w.-]+\.\w{2,}$"
    return re.match(patron, email) is not None

# Pruebas
emails = [
    "ana@mail.com",      # ✓
    "juan.perez@test.co", # ✓
    "invalid@",          # ✗
    "@invalid.com",      # ✗
    "no-arroba.com",     # ✗
]

for email in emails:
    valido = validar_email(email)
    print(f"{email}: {'✓' if valido else '✗'}")
```

## 🔢 Grupos de Captura

```python
import re

# Capturar partes específicas
texto = "Fecha: 06/06/2026"
match = re.search(r"(\d{2})/(\d{2})/(\d{4})", texto)

if match:
    dia = match.group(1)   # "06"
    mes = match.group(2)   # "06"
    año = match.group(3)   # "2026"
    print(f"Día: {dia}, Mes: {mes}, Año: {año}")

# Nombres de grupos
patron = r"(?P<dia>\d{2})/(?P<mes>\d{2})/(?P<año>\d{4})"
match = re.search(patron, texto)

if match:
    print(match.group("dia"))  # "06"
    print(match.groupdict())   # {'dia': '06', 'mes': '06', 'año': '2026'}
```

## 📱 Ejemplo: Validar Teléfono

```python
import re

def validar_telefono(telefono):
    """
    Acepta formatos:
    - 555-1234
    - (555) 1234
    - 555 1234
    - 5551234
    """
    patron = r"^\(?\d{3}\)?[\s-]?\d{4}$"
    return re.match(patron, telefono) is not None

telefonos = [
    "555-1234",    # ✓
    "(555) 1234",  # ✓
    "555 1234",    # ✓
    "5551234",     # ✓
    "123",         # ✗
    "abc-defg",    # ✗
]

for tel in telefonos:
    print(f"{tel}: {'✓' if validar_telefono(tel) else '✗'}")
```

## 🚩 Flags (Modificadores)

```python
import re

texto = "Python es GENIAL"

# re.IGNORECASE - Ignorar mayúsculas/minúsculas
print(re.search(r"python", texto, re.IGNORECASE))  # Match

# re.MULTILINE - ^ y $ coinciden con inicio/fin de línea
texto_multilinea = """linea 1
linea 2
linea 3"""
print(re.findall(r"^linea", texto_multilinea, re.MULTILINE))
# ['linea', 'linea', 'linea']

# re.DOTALL - . coincide con saltos de línea
texto = "Hola\nMundo"
print(re.search(r"Hola.Mundo", texto, re.DOTALL))  # Match
```

## 💡 Ejemplo: Extraer URLs

```python
import re

texto = """
Visita https://python.org y http://github.com
También www.google.com
"""

# Patrón para URLs
patron = r"https?://[\w.-]+\.\w+"
urls = re.findall(patron, texto)
print(urls)
# ['https://python.org', 'http://github.com']

# Más completo (con www)
patron = r"(?:https?://|www\.)[\w.-]+\.\w+"
urls = re.findall(patron, texto)
print(urls)
# ['https://python.org', 'http://github.com', 'www.google.com']
```

## 🔧 split() - Dividir String

```python
import re

# Split por múltiples delimitadores
texto = "ana,juan;pedro:maria"
nombres = re.split(r"[,;:]", texto)
print(nombres)  # ['ana', 'juan', 'pedro', 'maria']

# Split por espacios múltiples
texto = "uno  dos    tres     cuatro"
palabras = re.split(r"\s+", texto)
print(palabras)  # ['uno', 'dos', 'tres', 'cuatro']
```

## 📊 Ejemplo: Limpiar Texto

```python
import re

def limpiar_texto(texto):
    """Normaliza espacios y elimina caracteres especiales"""
    # Eliminar caracteres especiales (mantener letras, números, espacios)
    texto = re.sub(r"[^\w\s]", "", texto)
    
    # Normalizar espacios múltiples a uno solo
    texto = re.sub(r"\s+", " ", texto)
    
    # Eliminar espacios al inicio/fin
    texto = texto.strip()
    
    return texto

original = "  Hola!!!   Mundo...   Python  2026  "
limpio = limpiar_texto(original)
print(limpio)  # "Hola Mundo Python 2026"
```

## 🎨 Ejemplo: Formatear Números

```python
import re

def formatear_numero_telefono(numero):
    """Convierte cualquier formato a (555) 1234-5678"""
    # Extraer solo dígitos
    digitos = re.sub(r"\D", "", numero)
    
    if len(digitos) == 10:
        return f"({digitos[:3]}) {digitos[3:6]}-{digitos[6:]}"
    return "Formato inválido"

numeros = [
    "5551234567",
    "555-123-4567",
    "(555) 123-4567",
    "555 123 4567",
]

for num in numeros:
    print(f"{num} → {formatear_numero_telefono(num)}")
```

## ⚠️ Escapar Caracteres Especiales

```python
import re

# . tiene significado especial (cualquier carácter)
texto = "archivo.txt"
print(re.search(r".", texto))  # Match (cualquier carácter)
print(re.search(r"\.", texto))  # Match (punto literal)

# Escapar múltiples caracteres
patron = re.escape("$100.00")  # Escapa automáticamente
print(patron)  # \$100\.00
```

## 💪 Ejercicios

### Ejercicio: Extraer Hashtags

```python
texto = "Me encanta #Python y #Programming! #100DaysOfCode"
# Extrae todos los hashtags (palabras que empiezan con #)
```

<details>
<summary>✅ Solución</summary>

```python
import re

texto = "Me encanta #Python y #Programming! #100DaysOfCode"
hashtags = re.findall(r"#\w+", texto)
print(hashtags)  # ['#Python', '#Programming', '#100DaysOfCode']

# Sin el símbolo #
hashtags = re.findall(r"#(\w+)", texto)
print(hashtags)  # ['Python', 'Programming', '100DaysOfCode']
```
</details>

## 🔗 Temas Relacionados

- [Strings](../basico/strings)
- [Archivos](./archivos)

## 📚 Recursos Adicionales

- [re module](https://docs.python.org/3/library/re.html)
- [Regex101](https://regex101.com/) - Probador online
- [Regular Expressions HOWTO](https://docs.python.org/3/howto/regex.html)

---

> 💡 **Tip**: Usa r"..." (raw strings) para evitar problemas con backslashes en patrones regex.
