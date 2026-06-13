---
title: "Módulos y Paquetes"
level: intermedio
category: organizacion
tags: [python, modulos, import, paquetes, __init__]
duration: 30min
prerequisites: [funciones]
---

# Módulos y Paquetes en Python

## 📦 ¿Qué son los Módulos?

Un **módulo** es un archivo `.py` con código reutilizable (funciones, clases, variables).

### Crear un Módulo

```python
# matematicas.py
def sumar(a, b):
    return a + b

def restar(a, b):
    return a - b

PI = 3.14159
```

### Importar un Módulo

```python
# main.py
import matematicas

print(matematicas.sumar(5, 3))  # 8
print(matematicas.PI)            # 3.14159
```

## 📥 Formas de Importar

```python
# 1. Importar módulo completo
import math
print(math.sqrt(16))  # 4.0

# 2. Importar con alias
import math as m
print(m.sqrt(16))

# 3. Importar elementos específicos
from math import sqrt, pi
print(sqrt(16))  # No necesita math.
print(pi)

# 4. Importar todo (❌ No recomendado)
from math import *
print(sqrt(16))  # Contamina namespace

# 5. Importar con alias
from math import sqrt as raiz_cuadrada
print(raiz_cuadrada(16))
```

## 📁 Estructura de Paquetes

Un **paquete** es una carpeta con módulos y un archivo `__init__.py`:

```
mi_proyecto/
│
├── main.py
└── paquete/
    ├── __init__.py
    ├── modulo1.py
    └── modulo2.py
```

### Crear Paquete

```python
# paquete/__init__.py
print("Inicializando paquete")

# paquete/modulo1.py
def funcion1():
    return "Función 1"

# paquete/modulo2.py
def funcion2():
    return "Función 2"
```

### Usar Paquete

```python
# main.py
import paquete.modulo1
print(paquete.modulo1.funcion1())

# O
from paquete import modulo1, modulo2
print(modulo1.funcion1())
print(modulo2.funcion2())

# O
from paquete.modulo1 import funcion1
print(funcion1())
```

## 🔧 `__name__` y `__main__`

```python
# mi_modulo.py
def funcion():
    print("Ejecutando función")

# Este código solo se ejecuta si se corre directamente
if __name__ == "__main__":
    print("Ejecutado directamente")
    funcion()
else:
    print("Importado como módulo")

# Si ejecutas: python mi_modulo.py
# Salida: "Ejecutado directamente"

# Si importas: import mi_modulo
# Salida: "Importado como módulo"
```

## 📚 Módulos de la Biblioteca Estándar

### math - Matemáticas

```python
import math

print(math.sqrt(16))      # 4.0
print(math.ceil(4.3))     # 5
print(math.floor(4.7))    # 4
print(math.pow(2, 3))     # 8.0
print(math.factorial(5))  # 120
print(math.pi)            # 3.14159...
print(math.e)             # 2.71828...
```

### random - Números Aleatorios

```python
import random

print(random.random())           # Float 0.0 - 1.0
print(random.randint(1, 10))     # Int 1 - 10
print(random.choice([1, 2, 3]))  # Elemento aleatorio

lista = [1, 2, 3, 4, 5]
random.shuffle(lista)  # Mezclar in-place
print(lista)

print(random.sample(lista, 2))   # 2 elementos únicos
```

### os - Sistema Operativo

```python
import os

print(os.getcwd())           # Directorio actual
os.chdir("/ruta/nueva")      # Cambiar directorio
print(os.listdir("."))       # Listar archivos

os.mkdir("nueva_carpeta")    # Crear carpeta
os.remove("archivo.txt")     # Eliminar archivo
os.rmdir("carpeta")          # Eliminar carpeta vacía

print(os.path.exists("archivo.txt"))  # Verificar existencia
print(os.path.isfile("archivo.txt"))  # Es archivo?
print(os.path.isdir("carpeta"))       # Es carpeta?
```

### sys - Sistema

```python
import sys

print(sys.version)        # Versión de Python
print(sys.platform)       # Plataforma (win32, linux, etc.)
print(sys.argv)           # Argumentos línea de comandos

sys.exit()                # Salir del programa
```

### datetime - Fechas y Horas

```python
from datetime import datetime, timedelta

# Fecha/hora actual
ahora = datetime.now()
print(ahora)  # 2024-01-15 14:30:00.123456

# Crear fecha específica
fecha = datetime(2024, 1, 15, 14, 30)

# Formatear
print(ahora.strftime("%Y-%m-%d"))      # 2024-01-15
print(ahora.strftime("%d/%m/%Y"))      # 15/01/2024
print(ahora.strftime("%H:%M:%S"))      # 14:30:00

# Parsear string
fecha = datetime.strptime("2024-01-15", "%Y-%m-%d")

# Aritmética
mañana = ahora + timedelta(days=1)
hace_una_semana = ahora - timedelta(weeks=1)
```

## 💡 Ejemplo: Utilidades Personalizadas

```python
# utils/validadores.py
def validar_email(email):
    return "@" in email and "." in email

def validar_telefono(telefono):
    return len(telefono) == 10 and telefono.isdigit()

# utils/formateo.py
def formatear_moneda(cantidad):
    return f"${cantidad:,.2f}"

def formatear_porcentaje(valor):
    return f"{valor:.1f}%"

# main.py
from utils.validadores import validar_email, validar_telefono
from utils.formateo import formatear_moneda

email = "user@example.com"
if validar_email(email):
    print("✅ Email válido")

print(formatear_moneda(1234.56))  # $1,234.56
```

## 📦 pip - Gestor de Paquetes

```bash
# Instalar paquete
pip install requests

# Instalar versión específica
pip install requests==2.28.0

# Actualizar
pip install --upgrade requests

# Desinstalar
pip uninstall requests

# Listar instalados
pip list

# Información del paquete
pip show requests

# Exportar dependencias
pip freeze > requirements.txt

# Instalar desde requirements.txt
pip install -r requirements.txt
```

## ⚠️ Errores Comunes

```python
# 1. ImportError
# ❌ import modulo_inexistente
# ✅ Verificar que el módulo exista

# 2. ModuleNotFoundError
# ❌ from paquete import modulo (sin __init__.py)
# ✅ Crear __init__.py en el paquete

# 3. Circular imports
# ❌ modulo_a importa modulo_b, modulo_b importa modulo_a
# ✅ Reorganizar código o importar dentro de funciones
```

## 🔗 Temas Relacionados

- [Funciones](../basico/funciones)
- [Clases](./clases)
- [Paquetes Populares](../avanzado/dependencias)

## 📚 Recursos Adicionales

- [Modules](https://docs.python.org/3/tutorial/modules.html)
- [Python Package Index (PyPI)](https://pypi.org/)

---

> 💡 **Tip**: Organiza tu código en módulos desde el principio para mantener el proyecto escalable.
