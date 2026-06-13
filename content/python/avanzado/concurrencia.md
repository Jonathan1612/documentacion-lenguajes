---
title: "Concurrencia"
level: avanzado
category: performance
tags: [python, threading, multiprocessing, concurrent, GIL]
duration: 40min
prerequisites: [clases, modulos]
---

# Concurrencia en Python

## 🔀 Threading vs Multiprocessing

```python
# Threading: Múltiples threads, un proceso
# - Mejor para I/O (red, archivos, BD)
# - Limitado por el GIL
# - Comparte memoria

# Multiprocessing: Múltiples procesos
# - Mejor para CPU (cálculos intensivos)
# - Sin limitación del GIL
# - Memoria separada
```

## 🧵 Threading Básico

```python
import threading
import time

def tarea(nombre, duracion):
    print(f"{nombre}: Iniciando")
    time.sleep(duracion)
    print(f"{nombre}: Completado")

# Crear threads
t1 = threading.Thread(target=tarea, args=("Thread-1", 2))
t2 = threading.Thread(target=tarea, args=("Thread-2", 1))

# Iniciar
t1.start()
t2.start()

# Esperar a que terminen
t1.join()
t2.join()

print("Todos los threads terminados")
```

## 💡 Ejemplo: Descargar URLs

```python
import threading
import time

def descargar_url(url):
    """Simula descarga de URL"""
    print(f"Descargando: {url}")
    time.sleep(2)  # Simula delay de red
    print(f"Completado: {url}")

urls = [
    "https://site1.com",
    "https://site2.com",
    "https://site3.com",
]

# Sin threads: ~6 segundos
inicio = time.time()
for url in urls:
    descargar_url(url)
print(f"Secuencial: {time.time() - inicio:.2f}s")

# Con threads: ~2 segundos
inicio = time.time()
threads = []
for url in urls:
    t = threading.Thread(target=descargar_url, args=(url,))
    t.start()
    threads.append(t)

for t in threads:
    t.join()

print(f"Con threads: {time.time() - inicio:.2f}s")
```

## 🔒 Thread Safety y Locks

```python
import threading

# ❌ Problema: Race condition
contador = 0

def incrementar():
    global contador
    for _ in range(100000):
        contador += 1

threads = [threading.Thread(target=incrementar) for _ in range(5)]
for t in threads:
    t.start()
for t in threads:
    t.join()

print(contador)  # ¿500000? No garantizado

# ✅ Solución: Lock
contador = 0
lock = threading.Lock()

def incrementar_seguro():
    global contador
    for _ in range(100000):
        with lock:
            contador += 1

threads = [threading.Thread(target=incrementar_seguro) for _ in range(5)]
for t in threads:
    t.start()
for t in threads:
    t.join()

print(contador)  # 500000 garantizado
```

## 🚀 Multiprocessing

```python
from multiprocessing import Process
import time

def tarea_cpu(nombre):
    """Tarea intensiva en CPU"""
    print(f"{nombre}: Calculando...")
    resultado = sum(i*i for i in range(10000000))
    print(f"{nombre}: Resultado = {resultado}")

# Crear procesos
p1 = Process(target=tarea_cpu, args=("Proceso-1",))
p2 = Process(target=tarea_cpu, args=("Proceso-2",))

# Iniciar
p1.start()
p2.start()

# Esperar
p1.join()
p2.join()

print("Todos los procesos terminados")
```

## 💪 Ejemplo: Factorial Paralelo

```python
from multiprocessing import Pool
import time

def factorial(n):
    """Calcula factorial de n"""
    resultado = 1
    for i in range(1, n + 1):
        resultado *= i
    return resultado

numeros = [5000, 6000, 7000, 8000]

# Secuencial
inicio = time.time()
resultados = [factorial(n) for n in numeros]
print(f"Secuencial: {time.time() - inicio:.2f}s")

# Paralelo con Pool
inicio = time.time()
with Pool(processes=4) as pool:
    resultados = pool.map(factorial, numeros)
print(f"Paralelo: {time.time() - inicio:.2f}s")
```

## 🎯 concurrent.futures

### ThreadPoolExecutor

```python
from concurrent.futures import ThreadPoolExecutor
import time

def tarea(n):
    time.sleep(1)
    return n * n

numeros = [1, 2, 3, 4, 5]

# Con ThreadPoolExecutor
with ThreadPoolExecutor(max_workers=3) as executor:
    # submit() - Tarea individual
    futuro = executor.submit(tarea, 10)
    print(futuro.result())  # 100
    
    # map() - Múltiples tareas
    resultados = executor.map(tarea, numeros)
    print(list(resultados))  # [1, 4, 9, 16, 25]
```

### ProcessPoolExecutor

```python
from concurrent.futures import ProcessPoolExecutor

def proceso_pesado(n):
    return sum(i*i for i in range(n))

numeros = [1000000, 2000000, 3000000]

with ProcessPoolExecutor(max_workers=4) as executor:
    resultados = executor.map(proceso_pesado, numeros)
    print(list(resultados))
```

## 📊 Ejemplo: Web Scraper Paralelo

```python
from concurrent.futures import ThreadPoolExecutor
import time

def scrape_page(url):
    """Simula scraping de página"""
    print(f"Scraping: {url}")
    time.sleep(2)  # Simula delay de red
    return f"Datos de {url}"

urls = [f"https://site{i}.com" for i in range(10)]

# Secuencial: ~20 segundos
inicio = time.time()
resultados = [scrape_page(url) for url in urls]
print(f"Secuencial: {time.time() - inicio:.2f}s")

# Paralelo: ~4 segundos (con 5 workers)
inicio = time.time()
with ThreadPoolExecutor(max_workers=5) as executor:
    resultados = list(executor.map(scrape_page, urls))
print(f"Paralelo: {time.time() - inicio:.2f}s")
```

## 🔄 Queue para Comunicación

```python
from queue import Queue
import threading
import time

def productor(queue):
    for i in range(5):
        print(f"Produciendo: {i}")
        queue.put(i)
        time.sleep(0.5)
    queue.put(None)  # Señal de fin

def consumidor(queue):
    while True:
        item = queue.get()
        if item is None:
            break
        print(f"Consumiendo: {item}")
        time.sleep(1)

q = Queue()

t1 = threading.Thread(target=productor, args=(q,))
t2 = threading.Thread(target=consumidor, args=(q,))

t1.start()
t2.start()

t1.join()
t2.join()
```

## 🛡️ Thread Local Storage

```python
import threading

# Datos específicos de cada thread
local = threading.local()

def tarea(nombre):
    local.valor = nombre  # Único para este thread
    print(f"Thread {threading.current_thread().name}: {local.valor}")

threads = [
    threading.Thread(target=tarea, args=("A",)),
    threading.Thread(target=tarea, args=("B",)),
]

for t in threads:
    t.start()
for t in threads:
    t.join()
```

## 💪 Ejercicio: Procesador de Imágenes

```python
# Procesa múltiples imágenes en paralelo
def procesar_imagen(ruta):
    # Simula procesamiento
    time.sleep(2)
    return f"Procesada: {ruta}"

imagenes = [f"img{i}.jpg" for i in range(10)]
# Usa ThreadPoolExecutor para procesar en paralelo
```

<details>
<summary>✅ Solución</summary>

```python
from concurrent.futures import ThreadPoolExecutor
import time

def procesar_imagen(ruta):
    print(f"Procesando: {ruta}")
    time.sleep(2)
    return f"Procesada: {ruta}"

imagenes = [f"img{i}.jpg" for i in range(10)]

inicio = time.time()

with ThreadPoolExecutor(max_workers=5) as executor:
    resultados = list(executor.map(procesar_imagen, imagenes))

print(f"Tiempo total: {time.time() - inicio:.2f}s")
for resultado in resultados:
    print(resultado)
```
</details>

## 🔗 Temas Relacionados

- [Asyncio](./asyncio)
- [Performance](./performance)

## 📚 Recursos Adicionales

- [threading](https://docs.python.org/3/library/threading.html)
- [multiprocessing](https://docs.python.org/3/library/multiprocessing.html)
- [concurrent.futures](https://docs.python.org/3/library/concurrent.futures.html)

---

> 💡 **Tip**: Usa threading para I/O, multiprocessing para CPU. El GIL limita threading en tareas CPU-bound.
