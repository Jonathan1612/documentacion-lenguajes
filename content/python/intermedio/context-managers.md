---
title: "Context Managers"
level: intermedio
category: avanzado
tags: [python, with, context manager, recursos]
duration: 25min
prerequisites: [archivos, clases]
---

# Context Managers en Python

## 📋 ¿Qué son los Context Managers?

Los **context managers** gestionan recursos automáticamente (archivos, conexiones, locks).

```python
# ❌ Sin context manager (arriesgado)
archivo = open("datos.txt")
contenido = archivo.read()
archivo.close()  # ¿Y si hay error antes?

# ✅ Con context manager (seguro)
with open("datos.txt") as archivo:
    contenido = archivo.read()
# Archivo se cierra automáticamente al salir del bloque
```

## 🔧 Sintaxis del with

```python
with EXPRESSION as VARIABLE:
    # Código que usa VARIABLE
    # Al salir, se ejecuta __exit__ automáticamente
```

## 📂 Ejemplo: Manejo de Archivos

```python
# Lectura
with open("datos.txt", "r") as archivo:
    contenido = archivo.read()
    print(contenido)
# archivo.close() se llama automáticamente

# Escritura
with open("salida.txt", "w") as archivo:
    archivo.write("Hola mundo\n")
    archivo.write("Segunda línea\n")

# Múltiples archivos
with open("entrada.txt", "r") as entrada, \
     open("salida.txt", "w") as salida:
    for linea in entrada:
        salida.write(linea.upper())
```

## 🎯 Crear Context Manager con Clase

```python
class MiArchivo:
    def __init__(self, nombre, modo):
        self.nombre = nombre
        self.modo = modo
        self.archivo = None
    
    def __enter__(self):
        """Se ejecuta al entrar al bloque with"""
        print(f"Abriendo {self.nombre}")
        self.archivo = open(self.nombre, self.modo)
        return self.archivo
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        """Se ejecuta al salir del bloque with"""
        print(f"Cerrando {self.nombre}")
        if self.archivo:
            self.archivo.close()
        # Si retorna True, suprime excepciones
        return False

# Uso
with MiArchivo("test.txt", "w") as f:
    f.write("Hola mundo")
# Abriendo test.txt
# Cerrando test.txt
```

## 💡 Ejemplo: Timer Context Manager

```python
import time

class Timer:
    def __enter__(self):
        self.inicio = time.time()
        return self
    
    def __exit__(self, *args):
        self.fin = time.time()
        self.duracion = self.fin - self.inicio
        print(f"Tiempo: {self.duracion:.4f} segundos")
        return False

# Uso
with Timer():
    # Código a medir
    suma = sum(range(1000000))
    time.sleep(0.5)
# Tiempo: 0.5234 segundos
```

## 🔒 Ejemplo: Lock para Threading

```python
import threading

class Lock:
    def __init__(self):
        self.lock = threading.Lock()
    
    def __enter__(self):
        self.lock.acquire()
        print("Lock adquirido")
        return self
    
    def __exit__(self, *args):
        self.lock.release()
        print("Lock liberado")
        return False

# Uso
mi_lock = Lock()

with mi_lock:
    # Código crítico (solo un thread a la vez)
    print("Sección crítica")
```

## 🎨 Context Manager con contextlib

```python
from contextlib import contextmanager

@contextmanager
def mi_context_manager():
    # Setup
    print("Entrando")
    recurso = "Mi recurso"
    
    try:
        yield recurso  # Retorna valor al bloque with
    finally:
        # Cleanup (siempre se ejecuta)
        print("Saliendo")

# Uso
with mi_context_manager() as recurso:
    print(f"Usando: {recurso}")
# Entrando
# Usando: Mi recurso
# Saliendo
```

## 💡 Ejemplo: Conexión a Base de Datos

```python
from contextlib import contextmanager
import sqlite3

@contextmanager
def conexion_db(nombre_db):
    """Context manager para conexión SQLite"""
    conn = sqlite3.connect(nombre_db)
    print(f"Conectado a {nombre_db}")
    
    try:
        yield conn
    finally:
        conn.close()
        print(f"Desconectado de {nombre_db}")

# Uso
with conexion_db("mi_bd.db") as conn:
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM usuarios")
    resultados = cursor.fetchall()
```

## 📊 Ejemplo: Cambiar Directorio Temporal

```python
import os
from contextlib import contextmanager

@contextmanager
def cambiar_dir(nuevo_dir):
    """Cambia temporalmente de directorio"""
    directorio_anterior = os.getcwd()
    os.chdir(nuevo_dir)
    print(f"Cambiado a: {nuevo_dir}")
    
    try:
        yield
    finally:
        os.chdir(directorio_anterior)
        print(f"Vuelto a: {directorio_anterior}")

# Uso
print(f"Directorio actual: {os.getcwd()}")

with cambiar_dir("/tmp"):
    print(f"Ahora en: {os.getcwd()}")
    # Hacer operaciones en /tmp

print(f"De vuelta en: {os.getcwd()}")
```

## 🛡️ Suprimir Excepciones

```python
from contextlib import suppress

# Sin suppress
try:
    os.remove("archivo_inexistente.txt")
except FileNotFoundError:
    pass

# Con suppress (más limpio)
with suppress(FileNotFoundError):
    os.remove("archivo_inexistente.txt")

# Múltiples excepciones
with suppress(FileNotFoundError, PermissionError):
    os.remove("archivo.txt")
```

## 🎯 redirect_stdout y redirect_stderr

```python
from contextlib import redirect_stdout, redirect_stderr
import io

# Capturar print()
salida = io.StringIO()

with redirect_stdout(salida):
    print("Hola mundo")
    print("Segunda línea")

print(salida.getvalue())  # "Hola mundo\nSegunda línea\n"

# Capturar errores
errores = io.StringIO()

with redirect_stderr(errores):
    import sys
    sys.stderr.write("Error simulado\n")

print(errores.getvalue())  # "Error simulado\n"
```

## 💡 Ejemplo: Logger Context Manager

```python
from contextlib import contextmanager
import time

@contextmanager
def log_operacion(nombre):
    """Registra inicio, fin y duración de operación"""
    print(f"[LOG] Iniciando: {nombre}")
    inicio = time.time()
    
    try:
        yield
    except Exception as e:
        print(f"[ERROR] {nombre} falló: {e}")
        raise
    finally:
        duracion = time.time() - inicio
        print(f"[LOG] Finalizó: {nombre} ({duracion:.2f}s)")

# Uso
with log_operacion("Procesamiento de datos"):
    # Simular trabajo
    time.sleep(1)
    suma = sum(range(1000000))
```

## 🔄 Anidar Context Managers

```python
# Forma tradicional
with open("entrada.txt", "r") as entrada:
    with open("salida.txt", "w") as salida:
        for linea in entrada:
            salida.write(linea.upper())

# Forma compacta (Python 3.1+)
with open("entrada.txt", "r") as entrada, \
     open("salida.txt", "w") as salida:
    for linea in entrada:
        salida.write(linea.upper())
```

## 💪 Ejercicio

```python
# Crea un context manager que cuente líneas procesadas
@contextmanager
def contador_lineas():
    # Tu código aquí
    pass

# Uso esperado:
with contador_lineas() as contador:
    for linea in open("archivo.txt"):
        contador.incrementar()
# Debería imprimir: "Procesadas X líneas"
```

<details>
<summary>✅ Solución</summary>

```python
from contextlib import contextmanager

@contextmanager
def contador_lineas():
    class Contador:
        def __init__(self):
            self.lineas = 0
        
        def incrementar(self):
            self.lineas += 1
    
    contador = Contador()
    
    try:
        yield contador
    finally:
        print(f"Procesadas {contador.lineas} líneas")

# Uso
with contador_lineas() as contador:
    for i in range(5):
        contador.incrementar()
# Procesadas 5 líneas
```
</details>

## 🔗 Temas Relacionados

- [Archivos](./archivos)
- [Clases](./clases)
- [Decoradores](./decoradores)

## 📚 Recursos Adicionales

- [Context Managers](https://docs.python.org/3/library/contextlib.html)
- [PEP 343](https://www.python.org/dev/peps/pep-0343/)

---

> 💡 **Tip**: Usa `with` siempre que manejes recursos que necesiten limpieza (archivos, conexiones, locks).
