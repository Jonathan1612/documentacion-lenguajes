---
title: "Manejo de Archivos"
level: intermedio
category: archivos-io
tags: [python, archivos, files, io, read, write, with]
duration: 30min
prerequisites: [funciones, errores-debugging]
---

# Manejo de Archivos en Python

## 📋 Abrir y Cerrar Archivos

```python
# Abrir archivo
archivo = open("datos.txt", "r")  # r = read (lectura)
contenido = archivo.read()
archivo.close()  # ⚠️ Importante cerrar

# ✅ Mejor: usar 'with' (cierra automáticamente)
with open("datos.txt", "r") as archivo:
    contenido = archivo.read()
# Archivo cerrado automáticamente
```

## 📂 Modos de Apertura

| Modo | Descripción | Crea si no existe |
|------|-------------|-------------------|
| `'r'` | Lectura (predeterminado) | ❌ FileNotFoundError |
| `'w'` | Escritura (sobrescribe) | ✅ |
| `'a'` | Append (agregar al final) | ✅ |
| `'x'` | Creación exclusiva | ❌ FileExistsError si existe |
| `'r+'` | Lectura + escritura | ❌ |
| `'w+'` | Escritura + lectura | ✅ |
| `'a+'` | Append + lectura | ✅ |
| `'b'` | Modo binario (agregar a cualquiera) | - |

## 📖 Leer Archivos

### read() - Leer Todo

```python
with open("datos.txt", "r") as f:
    contenido = f.read()  # String con todo el contenido
    print(contenido)

# Leer n caracteres
with open("datos.txt", "r") as f:
    primeros_10 = f.read(10)
```

### readline() - Leer Línea por Línea

```python
with open("datos.txt", "r") as f:
    linea1 = f.readline()  # Primera línea
    linea2 = f.readline()  # Segunda línea
```

### readlines() - Lista de Líneas

```python
with open("datos.txt", "r") as f:
    lineas = f.readlines()  # ['línea1\n', 'línea2\n', ...]
    
for linea in lineas:
    print(linea.strip())  # Eliminar \n
```

### Iterar Directamente (Recomendado)

```python
# Más eficiente para archivos grandes
with open("datos.txt", "r") as f:
    for linea in f:
        print(linea.strip())
```

## ✏️ Escribir Archivos

### write() - Escribir String

```python
# Modo 'w' - sobrescribe
with open("salida.txt", "w") as f:
    f.write("Línea 1\n")
    f.write("Línea 2\n")

# Modo 'a' - append
with open("salida.txt", "a") as f:
    f.write("Línea 3\n")
```

### writelines() - Escribir Lista

```python
lineas = ["Primera línea\n", "Segunda línea\n", "Tercera línea\n"]

with open("salida.txt", "w") as f:
    f.writelines(lineas)
```

## 💡 Ejemplo Completo: Sistema de Logs

```python
from datetime import datetime

class Logger:
    def __init__(self, archivo="app.log"):
        self.archivo = archivo
    
    def log(self, nivel, mensaje):
        """Registra mensaje con timestamp"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        linea = f"[{timestamp}] {nivel}: {mensaje}\n"
        
        with open(self.archivo, "a", encoding="utf-8") as f:
            f.write(linea)
    
    def info(self, mensaje):
        self.log("INFO", mensaje)
    
    def warning(self, mensaje):
        self.log("WARNING", mensaje)
    
    def error(self, mensaje):
        self.log("ERROR", mensaje)
    
    def leer_logs(self):
        """Lee todos los logs"""
        try:
            with open(self.archivo, "r", encoding="utf-8") as f:
                return f.read()
        except FileNotFoundError:
            return "No hay logs registrados"

# Uso
logger = Logger()
logger.info("Aplicación iniciada")
logger.warning("Bajo espacio en disco")
logger.error("Conexión fallida")

print(logger.leer_logs())
```

## 📦 Archivos CSV

```python
import csv

# Escribir CSV
datos = [
    ["Nombre", "Edad", "Ciudad"],
    ["Ana", 25, "Madrid"],
    ["Juan", 30, "Barcelona"],
    ["Pedro", 28, "Valencia"]
]

with open("personas.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerows(datos)

# Leer CSV
with open("personas.csv", "r", encoding="utf-8") as f:
    reader = csv.reader(f)
    for fila in reader:
        print(fila)  # ['Ana', '25', 'Madrid']

# Con diccionarios
with open("personas.csv", "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for fila in reader:
        print(fila["Nombre"], fila["Edad"])
```

## 🗂️ Archivos JSON

```python
import json

# Escribir JSON
datos = {
    "nombre": "Ana",
    "edad": 25,
    "ciudad": "Madrid",
    "hobbies": ["lectura", "programación"]
}

with open("persona.json", "w", encoding="utf-8") as f:
    json.dump(datos, f, indent=2, ensure_ascii=False)

# Leer JSON
with open("persona.json", "r", encoding="utf-8") as f:
    persona = json.load(f)
    print(persona["nombre"])  # "Ana"

# String a JSON
json_string = '{"nombre": "Juan", "edad": 30}'
datos = json.loads(json_string)

# Objeto a string JSON
json_string = json.dumps(datos, indent=2)
```

## 📁 Manejo de Rutas con pathlib

```python
from pathlib import Path

# Crear ruta
ruta = Path("datos/archivos/documento.txt")

# Propiedades
print(ruta.name)        # documento.txt
print(ruta.stem)        # documento
print(ruta.suffix)      # .txt
print(ruta.parent)      # datos/archivos

# Verificar existencia
if ruta.exists():
    print("El archivo existe")

# Crear directorio
ruta_dir = Path("nueva_carpeta")
ruta_dir.mkdir(exist_ok=True)  # Crear si no existe

# Listar archivos
for archivo in Path(".").glob("*.txt"):
    print(archivo)

# Leer/Escribir
ruta = Path("datos.txt")
ruta.write_text("Contenido", encoding="utf-8")
contenido = ruta.read_text(encoding="utf-8")
```

## 🛡️ Manejo de Errores

```python
import os

def leer_archivo_seguro(nombre):
    """Lee archivo con manejo de errores"""
    try:
        with open(nombre, "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        print(f"❌ Archivo '{nombre}' no encontrado")
        return None
    except PermissionError:
        print(f"❌ Sin permisos para leer '{nombre}'")
        return None
    except UnicodeDecodeError:
        print(f"❌ Error de codificación en '{nombre}'")
        return None

# Verificar antes de abrir
if os.path.exists("datos.txt"):
    with open("datos.txt", "r") as f:
        contenido = f.read()
```

## 💪 Ejercicios Prácticos

### Ejercicio 1: Contador de Palabras

```python
def contar_palabras_archivo(nombre):
    """Cuenta palabras únicas en un archivo"""
    # Tu código aquí
    pass
```

<details>
<summary>✅ Solución</summary>

```python
def contar_palabras_archivo(nombre):
    try:
        with open(nombre, "r", encoding="utf-8") as f:
            texto = f.read().lower()
            palabras = texto.split()
            return len(set(palabras))
    except FileNotFoundError:
        return 0
```
</details>

### Ejercicio 2: Filtrar Líneas

```python
def filtrar_lineas(entrada, salida, palabra_clave):
    """Copia solo líneas que contienen palabra_clave"""
    # Tu código aquí
    pass
```

<details>
<summary>✅ Solución</summary>

```python
def filtrar_lineas(entrada, salida, palabra_clave):
    with open(entrada, "r", encoding="utf-8") as f_in:
        with open(salida, "w", encoding="utf-8") as f_out:
            for linea in f_in:
                if palabra_clave in linea:
                    f_out.write(linea)
```
</details>

## ⚠️ Errores Comunes

```python
# 1. No cerrar archivo
# ❌ archivo = open("datos.txt")
# ✅ with open("datos.txt") as archivo:

# 2. Olvidar encoding
# ❌ open("datos.txt")  # Puede dar error con acentos
# ✅ open("datos.txt", encoding="utf-8")

# 3. Modo incorrecto
# ❌ open("datos.txt", "w").read()  # Modo w no permite lectura
# ✅ open("datos.txt", "r").read()
```

## 🔗 Temas Relacionados

- [Errores y Debugging](../basico/errores-debugging)
- [Context Managers](./context-managers)
- [Pathlib](./modulos)

## 📚 Recursos Adicionales

- [File I/O](https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files)
- [pathlib](https://docs.python.org/3/library/pathlib.html)

---

> 💡 **Tip**: Siempre usa `with` para manejar archivos. Garantiza que se cierren correctamente.
