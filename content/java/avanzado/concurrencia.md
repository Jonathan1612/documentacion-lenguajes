---
title: "Concurrencia Avanzada"
level: avanzado
category: concurrencia
tags: [java, concurrencia, executorservice, locks, semaphore, atomic]
duration: 60min
prerequisites: [threads, collections, lambdas]
---

# Concurrencia Avanzada

## 📋 ¿Qué es?

La **concurrencia avanzada** en Java se refiere al uso del **Java Concurrency Framework** (`java.util.concurrent`) introducido en Java 5, que proporciona abstracciones de alto nivel para manejar threads de manera más segura y eficiente que el API básico de Thread.

## 🎯 ¿Para qué sirve?

- **Gestión automática de threads**: Thread pools que reutilizan threads
- **Sincronización avanzada**: Locks flexibles, barreras, semáforos
- **Colecciones thread-safe**: Sin necesidad de sincronización manual
- **Operaciones asíncronas**: CompletableFuture para programación reactiva
- **Evitar errores comunes**: Deadlocks, race conditions, memory visibility

## 🔑 Componentes Principales

| Componente | Descripción |
|------------|-------------|
| **ExecutorService** | Pool de threads reutilizables |
| **Lock / ReentrantLock** | Alternativa flexible a synchronized |
| **Semaphore** | Control de acceso a recursos limitados |
| **CountDownLatch** | Esperar a que N operaciones terminen |
| **CyclicBarrier** | Sincronizar threads en un punto |
| **Atomic Classes** | Operaciones atómicas sin locks |
| **CompletableFuture** | Composición de operaciones asíncronas |

## 💡 ExecutorService: Thread Pools

### Fixed Thread Pool

```java
import java.util.concurrent.*;

public class EjemploExecutor {
    public static void main(String[] args) {
        // Pool de 3 threads reutilizables
        ExecutorService executor = Executors.newFixedThreadPool(3);
        
        // Enviar 10 tareas
        for (int i = 1; i <= 10; i++) {
            final int taskId = i;
            executor.submit(() -> {
                System.out.println("Tarea " + taskId + " en " + 
                    Thread.currentThread().getName());
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            });
        }
        
        executor.shutdown(); // No acepta más tareas
        try {
            executor.awaitTermination(1, TimeUnit.MINUTES);
        } catch (InterruptedException e) {
            executor.shutdownNow();
        }
        
        System.out.println("Todas las tareas completadas");
    }
}
```

### Tipos de Thread Pools

```java
// Pool fijo de N threads
ExecutorService fixed = Executors.newFixedThreadPool(4);

// Pool que crece según demanda
ExecutorService cached = Executors.newCachedThreadPool();

// Un solo thread para tareas secuenciales
ExecutorService single = Executors.newSingleThreadExecutor();

// Pool para tareas programadas/recurrentes
ScheduledExecutorService scheduled = Executors.newScheduledThreadPool(2);
```

## 🔒 Locks y Sincronización

### ReentrantLock vs synchronized

```java
import java.util.concurrent.locks.*;

public class ContadorConLock {
    private int contador = 0;
    private final Lock lock = new ReentrantLock();
    
    // Con Lock - Más flexible
    public void incrementarConLock() {
        lock.lock();
        try {
            contador++;
        } finally {
            lock.unlock(); // ¡Siempre en finally!
        }
    }
    
    // Con synchronized - Más simple
    public synchronized void incrementarSyncronized() {
        contador++;
    }
    
    // tryLock - Intenta adquirir sin bloquear
    public boolean intentarIncrementar() {
        if (lock.tryLock()) {
            try {
                contador++;
                return true;
            } finally {
                lock.unlock();
            }
        }
        return false; // No pudo adquirir el lock
    }
    
    public int getContador() {
        return contador;
    }
}
```

### ReadWriteLock - Múltiples lectores

```java
import java.util.concurrent.locks.*;

public class Cache {
    private final Map<String, String> datos = new HashMap<>();
    private final ReadWriteLock rwLock = new ReentrantReadWriteLock();
    private final Lock readLock = rwLock.readLock();
    private final Lock writeLock = rwLock.writeLock();
    
    // Múltiples threads pueden leer simultáneamente
    public String leer(String clave) {
        readLock.lock();
        try {
            return datos.get(clave);
        } finally {
            readLock.unlock();
        }
    }
    
    // Solo un thread puede escribir
    public void escribir(String clave, String valor) {
        writeLock.lock();
        try {
            datos.put(clave, valor);
        } finally {
            writeLock.unlock();
        }
    }
}
```

## 🚦 Semaphore: Control de Recursos

```java
import java.util.concurrent.Semaphore;

public class PoolConexiones {
    private final Semaphore permisos;
    private final List<Conexion> conexiones;
    
    public PoolConexiones(int maxConexiones) {
        permisos = new Semaphore(maxConexiones);
        conexiones = new ArrayList<>();
        for (int i = 0; i < maxConexiones; i++) {
            conexiones.add(new Conexion(i));
        }
    }
    
    public Conexion obtenerConexion() throws InterruptedException {
        permisos.acquire(); // Espera si no hay permisos disponibles
        return obtenerConexionDisponible();
    }
    
    public void liberarConexion(Conexion conexion) {
        devolverConexion(conexion);
        permisos.release(); // Libera un permiso
    }
    
    // Uso
    public static void main(String[] args) {
        PoolConexiones pool = new PoolConexiones(3); // Máximo 3 conexiones
        
        for (int i = 0; i < 10; i++) {
            new Thread(() -> {
                try {
                    Conexion conn = pool.obtenerConexion();
                    System.out.println("Usando: " + conn);
                    Thread.sleep(2000);
                    pool.liberarConexion(conn);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }).start();
        }
    }
}
```

## ⚛️ Clases Atómicas

```java
import java.util.concurrent.atomic.*;

public class ContadoresAtomicos {
    // Variables atómicas - operaciones thread-safe sin locks
    private AtomicInteger contador = new AtomicInteger(0);
    private AtomicLong visitas = new AtomicLong(0);
    private AtomicBoolean activo = new AtomicBoolean(true);
    private AtomicReference<String> mensaje = new AtomicReference<>("Hola");
    
    public void ejemplosOperaciones() {
        // Operaciones atómicas
        int valor = contador.incrementAndGet(); // ++i
        int anterior = contador.getAndIncrement(); // i++
        
        contador.addAndGet(5); // += 5
        contador.compareAndSet(10, 20); // CAS: si es 10, cambiar a 20
        
        // AtomicLong
        visitas.incrementAndGet();
        
        // AtomicBoolean
        if (activo.compareAndSet(true, false)) {
            System.out.println("Desactivado");
        }
        
        // AtomicReference
        mensaje.set("Nuevo mensaje");
        mensaje.updateAndGet(s -> s.toUpperCase());
    }
}
```

## 📊 Ejemplo Completo: Sistema de Tareas Asíncronas

```java
import java.util.concurrent.*;
import java.util.*;

public class SistemaTareas {
    
    static class Tarea implements Callable<ResultadoTarea> {
        private int id;
        private int duracion;
        
        public Tarea(int id, int duracion) {
            this.id = id;
            this.duracion = duracion;
        }
        
        @Override
        public ResultadoTarea call() throws Exception {
            System.out.println("Iniciando tarea " + id);
            Thread.sleep(duracion);
            
            // Simular éxito/fallo aleatorio
            boolean exito = Math.random() > 0.2;
            
            return new ResultadoTarea(id, exito, 
                exito ? "Completada" : "Error");
        }
    }
    
    static class ResultadoTarea {
        int id;
        boolean exito;
        String mensaje;
        
        public ResultadoTarea(int id, boolean exito, String mensaje) {
            this.id = id;
            this.exito = exito;
            this.mensaje = mensaje;
        }
    }
    
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(5);
        List<Future<ResultadoTarea>> futuros = new ArrayList<>();
        
        // Enviar 20 tareas
        for (int i = 1; i <= 20; i++) {
            int duracion = (int) (Math.random() * 2000) + 500;
            Future<ResultadoTarea> futuro = executor.submit(
                new Tarea(i, duracion));
            futuros.add(futuro);
        }
        
        // Procesar resultados
        int exitosas = 0, fallidas = 0;
        for (Future<ResultadoTarea> futuro : futuros) {
            try {
                ResultadoTarea resultado = futuro.get(); // Bloquea hasta obtener resultado
                if (resultado.exito) {
                    exitosas++;
                } else {
                    fallidas++;
                }
                System.out.println("Tarea " + resultado.id + ": " + resultado.mensaje);
            } catch (InterruptedException | ExecutionException e) {
                fallidas++;
                System.err.println("Error: " + e.getMessage());
            }
        }
        
        System.out.println("\n📊 Resumen:");
        System.out.println("✅ Exitosas: " + exitosas);
        System.out.println("❌ Fallidas: " + fallidas);
        
        executor.shutdown();
    }
}
```

## 🔄 CompletableFuture: Programación Asíncrona

```java
import java.util.concurrent.CompletableFuture;

public class EjemploCompletableFuture {
    
    public static void main(String[] args) {
        // Operación asíncrona simple
        CompletableFuture<String> futuro = CompletableFuture.supplyAsync(() -> {
            System.out.println("Descargando datos...");
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            return "Datos descargados";
        });
        
        // Encadenar operaciones
        futuro
            .thenApply(datos -> {
                System.out.println("Procesando: " + datos);
                return datos.toUpperCase();
            })
            .thenApply(datos -> {
                System.out.println("Guardando: " + datos);
                return datos + " - GUARDADO";
            })
            .thenAccept(resultado -> {
                System.out.println("✅ Resultado final: " + resultado);
            })
            .exceptionally(ex -> {
                System.err.println("❌ Error: " + ex.getMessage());
                return null;
            });
        
        // Combinar múltiples futuros
        CompletableFuture<String> futuro1 = CompletableFuture.supplyAsync(() -> "Usuario");
        CompletableFuture<String> futuro2 = CompletableFuture.supplyAsync(() -> "Datos");
        
        CompletableFuture<String> combinado = futuro1.thenCombine(futuro2, 
            (u, d) -> u + " tiene " + d);
        
        combinado.thenAccept(System.out::println);
        
        // Esperar completación
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

## ⚠️ Errores Comunes

> ❌ **No cerrar ExecutorService**

```java
// ❌ INCORRECTO - Los threads no terminan
ExecutorService executor = Executors.newFixedThreadPool(5);
executor.submit(() -> System.out.println("Tarea"));
// Falta shutdown()

// ✅ CORRECTO
ExecutorService executor = Executors.newFixedThreadPool(5);
try {
    executor.submit(() -> System.out.println("Tarea"));
} finally {
    executor.shutdown();
}
```

> ⚠️ **Olvidar unlock() en finally**

```java
// ❌ PELIGROSO
Lock lock = new ReentrantLock();
lock.lock();
// Si hay excepción aquí, nunca se libera
lock.unlock();

// ✅ CORRECTO
lock.lock();
try {
    // Código crítico
} finally {
    lock.unlock();
}
```

## 💪 Ejercicios Prácticos

### Ejercicio 1: Descargador Paralelo
**Dificultad**: Media

Crea un sistema que descargue 10 archivos en paralelo usando ExecutorService. Imprime el progreso y el tiempo total.

<details>
<summary>✅ Solución</summary>

```java
import java.util.concurrent.*;

public class DescargadorParalelo {
    
    static class Descarga implements Callable<String> {
        private String archivo;
        
        public Descarga(String archivo) {
            this.archivo = archivo;
        }
        
        @Override
        public String call() throws Exception {
            System.out.println("⬇️ Descargando " + archivo);
            Thread.sleep((long) (Math.random() * 3000) + 1000);
            return archivo + " ✅";
        }
    }
    
    public static void main(String[] args) {
        long inicio = System.currentTimeMillis();
        ExecutorService executor = Executors.newFixedThreadPool(5);
        
        List<Future<String>> futuros = new ArrayList<>();
        for (int i = 1; i <= 10; i++) {
            futuros.add(executor.submit(new Descarga("archivo" + i + ".zip")));
        }
        
        for (Future<String> futuro : futuros) {
            try {
                System.out.println(futuro.get());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        
        executor.shutdown();
        long duracion = System.currentTimeMillis() - inicio;
        System.out.println("\n⏱️ Tiempo total: " + duracion + "ms");
    }
}
```
</details>

## 🎯 Cuándo Usar Cada Herramienta

| Herramienta | Usar cuando |
|-------------|-------------|
| **ExecutorService** | Necesitas gestionar múltiples tareas |
| **ReentrantLock** | Necesitas tryLock, lockInterruptibly |
| **Semaphore** | Limitar acceso a N recursos |
| **AtomicInteger** | Contador simple thread-safe |
| **CompletableFuture** | Operaciones asíncronas encadenadas |
| **CountDownLatch** | Esperar a que N tareas terminen |

## 🔗 Temas Relacionados

- [Threads Básicos](./threads)
- [Collections Thread-Safe](../intermedio/collections)
- [Lambdas](../intermedio/lambdas)

## 📚 Recursos Adicionales

- [Java Concurrency API](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/package-summary.html)
- Libro: "Java Concurrency in Practice"
