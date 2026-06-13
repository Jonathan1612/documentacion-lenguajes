---
title: "Threads y Multithreading"
level: avanzado
category: concurrencia
tags: [java, threads, multithreading, concurrencia, parallelism]
duration: 45min
prerequisites: [poo-clases, interfaces, excepciones]
---

# Threads y Multithreading

## 📋 ¿Qué es un Thread?

Un **thread** (hilo) es la unidad más pequeña de ejecución dentro de un proceso. Java permite la **programación concurrente** mediante threads, ejecutando múltiples tareas simultáneamente para aprovechar procesadores multinúcleo.

## 🎯 ¿Para qué sirve?

- **Mejorar el rendimiento**: Ejecutar tareas en paralelo
- **Aplicaciones responsivas**: UI que no se congela durante operaciones largas
- **Procesamiento paralelo**: Dividir trabajo en subtareas independientes
- **Operaciones asíncronas**: Downloads, uploads, cálculos en segundo plano

## 🔑 Conceptos Clave

| Concepto | Descripción |
|----------|-------------|
| **Thread** | Hilo de ejecución independiente |
| **Main Thread** | Hilo principal que ejecuta main() |
| **Runnable** | Interfaz funcional para definir tareas |
| **Thread State** | NEW, RUNNABLE, BLOCKED, WAITING, TERMINATED |
| **Context Switch** | Cambio entre threads por el scheduler del OS |

> 💡 **Importante**: Cada aplicación Java comienza con un thread principal (main thread) que ejecuta el método main().

## 💡 Sintaxis y Creación

### Método 1: Extender Thread

```java
public class MiThread extends Thread {
    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(Thread.currentThread().getName() + ": " + i);
            try {
                Thread.sleep(500); // Pausar 500ms
            } catch (InterruptedException e) {
                System.err.println("Thread interrumpido");
            }
        }
    }
}

// Uso
MiThread t1 = new MiThread();
t1.start(); // ¡NO llamar run() directamente!
```

### Método 2: Implementar Runnable (Recomendado)

```java
public class TareaDescarga implements Runnable {
    private String archivo;
    
    public TareaDescarga(String archivo) {
        this.archivo = archivo;
    }
    
    @Override
    public void run() {
        System.out.println("Descargando " + archivo + "...");
        try {
            Thread.sleep(2000); // Simular descarga
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        System.out.println(archivo + " descargado!");
    }
}

// Uso
Thread t1 = new Thread(new TareaDescarga("video.mp4"));
Thread t2 = new Thread(new TareaDescarga("documento.pdf"));
t1.start();
t2.start();
```

### Método 3: Lambda (Java 8+)

```java
Thread t = new Thread(() -> {
    System.out.println("Ejecutando en: " + Thread.currentThread().getName());
    // Tu código aquí
});
t.start();
```

## 📊 Ejemplo Completo: Sistema de Procesamiento Paralelo

```java
import java.util.concurrent.atomic.AtomicInteger;

public class SistemaProcesamiento {
    private static AtomicInteger contadorProcesados = new AtomicInteger(0);
    
    static class ProcesadorDatos implements Runnable {
        private int id;
        private int[] datos;
        
        public ProcesadorDatos(int id, int[] datos) {
            this.id = id;
            this.datos = datos;
        }
        
        @Override
        public void run() {
            System.out.println("Procesador " + id + " iniciado");
            
            // Procesar datos
            long suma = 0;
            for (int dato : datos) {
                suma += dato;
                try {
                    Thread.sleep(10); // Simular procesamiento
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    return;
                }
            }
            
            contadorProcesados.incrementAndGet();
            System.out.println("Procesador " + id + " terminó. Suma: " + suma);
        }
    }
    
    public static void main(String[] args) throws InterruptedException {
        int numProcesadores = 4;
        Thread[] threads = new Thread[numProcesadores];
        
        // Crear y lanzar threads
        for (int i = 0; i < numProcesadores; i++) {
            int[] datos = generarDatos(1000);
            threads[i] = new Thread(new ProcesadorDatos(i + 1, datos));
            threads[i].start();
        }
        
        // Esperar a que todos terminen
        for (Thread thread : threads) {
            thread.join(); // Bloquea hasta que el thread termine
        }
        
        System.out.println("\n✅ Todos los procesadores terminaron");
        System.out.println("Total procesados: " + contadorProcesados.get());
    }
    
    private static int[] generarDatos(int cantidad) {
        int[] datos = new int[cantidad];
        for (int i = 0; i < cantidad; i++) {
            datos[i] = (int) (Math.random() * 100);
        }
        return datos;
    }
}
```

## ⚙️ Funcionamiento Interno

### Ciclo de Vida de un Thread

```
NEW → RUNNABLE → RUNNING → TERMINATED
         ↓           ↓
      BLOCKED    WAITING
```

1. **NEW**: Thread creado pero no iniciado (`new Thread()`)
2. **RUNNABLE**: Thread listo para ejecutar (`start()` llamado)
3. **RUNNING**: Thread ejecutándose actualmente
4. **BLOCKED/WAITING**: Thread esperando recurso o notificación
5. **TERMINATED**: Thread finalizó su ejecución

### Stack de cada Thread

Cada thread tiene su propia **call stack** independiente:

```java
Main Thread Stack          Thread-1 Stack
┌──────────────┐          ┌──────────────┐
│ main()       │          │ run()        │
│ metodo1()    │          │ procesar()   │
│ metodo2()    │          │ calcular()   │
└──────────────┘          └──────────────┘
```

> ⚠️ **Advertencia**: Los threads comparten el **heap** (memoria de objetos), lo que puede causar problemas de concurrencia.

## 📋 Métodos Importantes de Thread

| Método | Descripción |
|--------|-------------|
| `start()` | Inicia la ejecución del thread |
| `run()` | Método que contiene el código a ejecutar |
| `sleep(ms)` | Pausa el thread por N milisegundos |
| `join()` | Espera a que el thread termine |
| `interrupt()` | Interrumpe un thread en espera |
| `isAlive()` | Verifica si el thread está vivo |
| `getName()` / `setName()` | Obtener/establecer nombre del thread |
| `getPriority()` / `setPriority()` | Prioridad (1-10, default 5) |

## ⚠️ Errores Comunes

> ❌ **Error Fatal**: Llamar `run()` en vez de `start()`

```java
// ❌ INCORRECTO - Ejecuta en el thread actual
Thread t = new Thread(() -> System.out.println("Hola"));
t.run(); // ¡No crea nuevo thread!

// ✅ CORRECTO
t.start(); // Crea y ejecuta en nuevo thread
```

> ⚠️ **Race Condition**: Múltiples threads modificando la misma variable

```java
// ❌ PELIGROSO - No thread-safe
private int contador = 0;

public void incrementar() {
    contador++; // Operación NO atómica
}

// ✅ SOLUCIÓN 1: synchronized
public synchronized void incrementar() {
    contador++;
}

// ✅ SOLUCIÓN 2: AtomicInteger
private AtomicInteger contador = new AtomicInteger(0);
contador.incrementAndGet();
```

> ⚠️ **Advertencia**: No ignorar `InterruptedException`, siempre restaurar el estado de interrupción

```java
try {
    Thread.sleep(1000);
} catch (InterruptedException e) {
    // ✅ Restaurar estado
    Thread.currentThread().interrupt();
    // Manejar la interrupción
}
```

## 💪 Ejercicios Prácticos

### Ejercicio 1: Contador Paralelo
**Dificultad**: Media

Crea 3 threads que cuenten de 1 a 10 simultáneamente. Cada thread debe tener un retraso diferente (100ms, 200ms, 300ms).

<details>
<summary>💡 Pista</summary>
Usa `Thread.sleep()` dentro de un bucle for. Crea una clase que implemente Runnable con el retraso como parámetro.
</details>

<details>
<summary>✅ Solución</summary>

```java
public class ContadorParalelo {
    static class Contador implements Runnable {
        private String nombre;
        private int retraso;
        
        public Contador(String nombre, int retraso) {
            this.nombre = nombre;
            this.retraso = retraso;
        }
        
        @Override
        public void run() {
            for (int i = 1; i <= 10; i++) {
                System.out.println(nombre + ": " + i);
                try {
                    Thread.sleep(retraso);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    return;
                }
            }
        }
    }
    
    public static void main(String[] args) {
        Thread t1 = new Thread(new Contador("Thread-A", 100));
        Thread t2 = new Thread(new Contador("Thread-B", 200));
        Thread t3 = new Thread(new Contador("Thread-C", 300));
        
        t1.start();
        t2.start();
        t3.start();
    }
}
```
</details>

### Ejercicio 2: Productor-Consumidor Básico
**Dificultad**: Alta

Crea un thread "Productor" que genere números aleatorios y un "Consumidor" que los procese. Usa una lista compartida.

<details>
<summary>✅ Solución</summary>

```java
import java.util.LinkedList;
import java.util.Queue;

public class ProductorConsumidor {
    private static Queue<Integer> buffer = new LinkedList<>();
    private static final int CAPACIDAD = 5;
    
    static class Productor implements Runnable {
        @Override
        public void run() {
            int valor = 0;
            while (true) {
                synchronized (buffer) {
                    while (buffer.size() == CAPACIDAD) {
                        try {
                            buffer.wait(); // Esperar si está lleno
                        } catch (InterruptedException e) {
                            return;
                        }
                    }
                    
                    System.out.println("Producido: " + valor);
                    buffer.add(valor++);
                    buffer.notify(); // Notificar al consumidor
                    
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        return;
                    }
                }
            }
        }
    }
    
    static class Consumidor implements Runnable {
        @Override
        public void run() {
            while (true) {
                synchronized (buffer) {
                    while (buffer.isEmpty()) {
                        try {
                            buffer.wait(); // Esperar si está vacío
                        } catch (InterruptedException e) {
                            return;
                        }
                    }
                    
                    int valor = buffer.poll();
                    System.out.println("Consumido: " + valor);
                    buffer.notify(); // Notificar al productor
                    
                    try {
                        Thread.sleep(1500);
                    } catch (InterruptedException e) {
                        return;
                    }
                }
            }
        }
    }
    
    public static void main(String[] args) {
        Thread productor = new Thread(new Productor());
        Thread consumidor = new Thread(new Consumidor());
        
        productor.start();
        consumidor.start();
    }
}
```
</details>

## 🎯 Cuándo Usar Threads

| ✅ Usar cuando | ❌ Evitar cuando |
|---------------|-----------------|
| Tareas largas que bloquean la UI | Operaciones simples y rápidas |
| Procesamiento paralelo de datos | No hay beneficio de paralelismo |
| Operaciones I/O (red, archivos) | Complejidad no justifica beneficio |
| Aprovechar múltiples cores | Un solo core disponible |

> 💡 **Consejo Moderno**: Para aplicaciones modernas, considera usar el **Java Concurrency Framework** (ExecutorService, CompletableFuture) en lugar de threads manuales.

## 🔗 Temas Relacionados

- [Concurrencia Avanzada](./concurrencia) - ExecutorService, Locks, etc.
- [Collections Thread-Safe](../intermedio/collections) - ConcurrentHashMap, etc.
- [Streams Paralelos](../intermedio/streams) - parallelStream()

## 📚 Recursos Adicionales

- [Java Concurrency Tutorial](https://docs.oracle.com/javase/tutorial/essential/concurrency/)
- [Java Thread API](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Thread.html)
- Libro: "Java Concurrency in Practice" por Brian Goetz
