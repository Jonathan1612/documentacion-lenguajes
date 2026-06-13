---
title: "Async/Await (asyncio)"
level: avanzado
category: asincronía
tags: [python, async, await, asyncio, coroutines]
duration: 40min
prerequisites: [funciones, concurrencia]
---

# Programación Asíncrona con asyncio

## 🔄 ¿Qué es asyncio?

Permite ejecutar código asíncrono de manera cooperativa (sin threads).

```python
import asyncio

async def saludar():
    print("Hola")
    await asyncio.sleep(1)  # Pausa asíncrona
    print("Mundo")

# Ejecutar
asyncio.run(saludar())
```

## 📋 Sintaxis Básica

```python
import asyncio

# async def - Define coroutine
async def mi_coroutine():
    print("Inicio")
    await asyncio.sleep(1)  # await suspende la ejecución
    print("Fin")
    return "Resultado"

# asyncio.run() - Ejecuta coroutine principal
resultado = asyncio.run(mi_coroutine())
print(resultado)  # "Resultado"
```

## 🚀 Múltiples Coroutines

```python
import asyncio
import time

async def tarea(nombre, duracion):
    print(f"{nombre}: Iniciando")
    await asyncio.sleep(duracion)
    print(f"{nombre}: Completado")
    return f"Resultado de {nombre}"

async def main():
    # Secuencial: ~5 segundos
    inicio = time.time()
    await tarea("Tarea-1", 2)
    await tarea("Tarea-2", 3)
    print(f"Secuencial: {time.time() - inicio:.2f}s")
    
    # Concurrente: ~3 segundos
    inicio = time.time()
    await asyncio.gather(
        tarea("Tarea-A", 2),
        tarea("Tarea-B", 3),
    )
    print(f"Concurrente: {time.time() - inicio:.2f}s")

asyncio.run(main())
```

## 💡 asyncio.gather() - Ejecutar Múltiples

```python
import asyncio

async def fetch_data(id):
    print(f"Descargando {id}...")
    await asyncio.sleep(1)
    return f"Datos {id}"

async def main():
    # Ejecutar todas en paralelo
    resultados = await asyncio.gather(
        fetch_data(1),
        fetch_data(2),
        fetch_data(3),
    )
    print(resultados)  # ['Datos 1', 'Datos 2', 'Datos 3']

asyncio.run(main())
```

## 🎯 asyncio.create_task()

```python
import asyncio

async def tarea(nombre, duracion):
    await asyncio.sleep(duracion)
    print(f"{nombre} completada")
    return nombre

async def main():
    # Crear tasks (empiezan inmediatamente)
    task1 = asyncio.create_task(tarea("Task-1", 2))
    task2 = asyncio.create_task(tarea("Task-2", 1))
    
    # Hacer otra cosa mientras corren
    print("Trabajando en otra cosa...")
    await asyncio.sleep(0.5)
    
    # Esperar resultados
    resultado1 = await task1
    resultado2 = await task2
    
    print(f"Resultados: {resultado1}, {resultado2}")

asyncio.run(main())
```

## 📊 Ejemplo: Cliente HTTP Asíncrono

```python
import asyncio
import time

async def fetch_url(url):
    """Simula petición HTTP"""
    print(f"Descargando: {url}")
    await asyncio.sleep(2)  # Simula latencia de red
    return f"Contenido de {url}"

async def main():
    urls = [
        "https://site1.com",
        "https://site2.com",
        "https://site3.com",
        "https://site4.com",
        "https://site5.com",
    ]
    
    inicio = time.time()
    
    # Todas en paralelo
    resultados = await asyncio.gather(*[fetch_url(url) for url in urls])
    
    print(f"Tiempo: {time.time() - inicio:.2f}s")  # ~2s (no 10s)
    
    for resultado in resultados:
        print(resultado)

asyncio.run(main())
```

## 🔄 Generadores Asíncronos

```python
import asyncio

async def contador_async(maximo):
    """Generador asíncrono"""
    for i in range(maximo):
        await asyncio.sleep(0.5)
        yield i

async def main():
    async for numero in contador_async(5):
        print(numero)
    # 0, 1, 2, 3, 4 (con pausa de 0.5s entre cada uno)

asyncio.run(main())
```

## 🎨 Context Manager Asíncrono

```python
import asyncio

class AsyncContextManager:
    async def __aenter__(self):
        print("Entrando al contexto")
        await asyncio.sleep(0.5)
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        print("Saliendo del contexto")
        await asyncio.sleep(0.5)

async def main():
    async with AsyncContextManager() as cm:
        print("Dentro del contexto")

asyncio.run(main())
```

## 💪 Ejemplo: Rate Limiter

```python
import asyncio
import time

class RateLimiter:
    def __init__(self, max_calls, period):
        self.max_calls = max_calls
        self.period = period
        self.calls = []
    
    async def __aenter__(self):
        while len(self.calls) >= self.max_calls:
            # Esperar hasta que la primera llamada expire
            tiempo_espera = self.period - (time.time() - self.calls[0])
            if tiempo_espera > 0:
                await asyncio.sleep(tiempo_espera)
            self.calls.pop(0)
        
        self.calls.append(time.time())
        return self
    
    async def __aexit__(self, *args):
        pass

async def api_call(id, limiter):
    """Simula llamada a API"""
    async with limiter:
        print(f"[{time.strftime('%H:%M:%S')}] API call {id}")
        await asyncio.sleep(0.1)

async def main():
    limiter = RateLimiter(max_calls=3, period=2)  # Máx 3 llamadas por 2 segundos
    
    tasks = [api_call(i, limiter) for i in range(10)]
    await asyncio.gather(*tasks)

asyncio.run(main())
```

## 🔧 asyncio.wait() - Control Fino

```python
import asyncio

async def tarea(nombre, duracion):
    await asyncio.sleep(duracion)
    return nombre

async def main():
    tasks = [
        asyncio.create_task(tarea("A", 1)),
        asyncio.create_task(tarea("B", 2)),
        asyncio.create_task(tarea("C", 3)),
    ]
    
    # Esperar a que termine la primera
    done, pending = await asyncio.wait(tasks, return_when=asyncio.FIRST_COMPLETED)
    
    print(f"Primera completada: {done.pop().result()}")
    print(f"Pendientes: {len(pending)}")
    
    # Cancelar las pendientes
    for task in pending:
        task.cancel()

asyncio.run(main())
```

## ⏱️ Timeouts

```python
import asyncio

async def tarea_lenta():
    await asyncio.sleep(5)
    return "Completado"

async def main():
    try:
        # Timeout de 2 segundos
        resultado = await asyncio.wait_for(tarea_lenta(), timeout=2.0)
        print(resultado)
    except asyncio.TimeoutError:
        print("¡Timeout! Tarea demoró mucho")

asyncio.run(main())
```

## 🔄 Event Loop Manual

```python
import asyncio

async def tarea1():
    print("Tarea 1")
    await asyncio.sleep(1)
    return "Resultado 1"

async def tarea2():
    print("Tarea 2")
    await asyncio.sleep(1)
    return "Resultado 2"

# Control manual del event loop
async def main():
    loop = asyncio.get_running_loop()
    
    # Ejecutar en background
    task1 = loop.create_task(tarea1())
    task2 = loop.create_task(tarea2())
    
    # Hacer otra cosa
    await asyncio.sleep(0.5)
    print("Trabajando...")
    
    # Esperar resultados
    r1 = await task1
    r2 = await task2
    
    print(r1, r2)

asyncio.run(main())
```

## 💪 Ejercicio: Descargador Concurrente

```python
# Simula descargar múltiples archivos con límite de concurrencia
async def descargar_archivo(url):
    await asyncio.sleep(2)
    return f"Descargado: {url}"

# Máximo 3 descargas simultáneas para 10 URLs
urls = [f"https://file{i}.com" for i in range(10)]
```

<details>
<summary>✅ Solución</summary>

```python
import asyncio

async def descargar_archivo(url, semaphore):
    async with semaphore:  # Solo 3 a la vez
        print(f"Descargando: {url}")
        await asyncio.sleep(2)
        print(f"Completado: {url}")
        return f"Descargado: {url}"

async def main():
    urls = [f"https://file{i}.com" for i in range(10)]
    semaphore = asyncio.Semaphore(3)  # Límite de 3
    
    tasks = [descargar_archivo(url, semaphore) for url in urls]
    resultados = await asyncio.gather(*tasks)
    
    for resultado in resultados:
        print(resultado)

asyncio.run(main())
```
</details>

## 🔗 Temas Relacionados

- [Concurrencia](./concurrencia)
- [Context Managers](../intermedio/context-managers)

## 📚 Recursos Adicionales

- [asyncio](https://docs.python.org/3/library/asyncio.html)
- [Async IO in Python](https://realpython.com/async-io-python/)

---

> 💡 **Tip**: asyncio es ideal para I/O-bound tasks (red, archivos). No mejora CPU-bound tasks.
