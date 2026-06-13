---
title: "Streams y Lambdas"
level: intermedio
category: colecciones
tags: [java, streams, lambda, map, filter, collect, functional]
duration: 25min
prerequisites: [collections, lambdas]
---

# Streams y Lambdas en Java

## 📋 ¿Qué son los Streams?

Los **Streams** son una característica introducida en Java 8 que permite procesar colecciones de datos de forma **funcional** y **declarativa**. No son estructuras de datos, sino una **secuencia de elementos** sobre la que podemos aplicar operaciones.

## 🎯 ¿Para qué sirven?

- **Filtrar** elementos de una colección
- **Transformar** datos (mapear)
- **Reducir** colecciones a un solo valor
- **Buscar** elementos específicos
- **Ordenar** de forma eficiente
- Código más **legible** y **conciso**

## 🔑 Operaciones Principales

### Operaciones Intermedias (lazy)
- `.filter()` - Filtra elementos
- `.map()` - Transforma elementos
- `.sorted()` - Ordena elementos
- `.distinct()` - Elimina duplicados
- `.limit()` - Limita cantidad de elementos

### Operaciones Terminales (eager)
- `.collect()` - Recolecta en una colección
- `.forEach()` - Itera cada elemento
- `.count()` - Cuenta elementos
- `.reduce()` - Reduce a un valor
- `.findFirst()` - Encuentra el primero
- `.anyMatch()` - Verifica si alguno cumple

## 💡 Sintaxis Básica

```java
List<String> lista = Arrays.asList("Juan", "Ana", "Pedro");

// Forma tradicional
for (String nombre : lista) {
    if (nombre.length() > 3) {
        System.out.println(nombre.toUpperCase());
    }
}

// Con Streams y Lambda
lista.stream()
     .filter(nombre -> nombre.length() > 3)
     .map(String::toUpperCase)
     .forEach(System.out::println);
```

## 📝 Ejemplos Prácticos

### Ejemplo 1: Filter - Filtrar Números Pares

```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class EjemploFilter {
    public static void main(String[] args) {
        List<Integer> numeros = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        // Filtrar solo números pares
        List<Integer> pares = numeros.stream()
                                     .filter(n -> n % 2 == 0)
                                     .collect(Collectors.toList());
        
        System.out.println("Números pares: " + pares);
    }
}
```

**Salida**:
```
Números pares: [2, 4, 6, 8, 10]
```

### Ejemplo 2: Map - Transformar Elementos

```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class EjemploMap {
    public static void main(String[] args) {
        List<String> nombres = Arrays.asList("juan", "ana", "pedro");
        
        // Convertir a mayúsculas
        List<String> mayusculas = nombres.stream()
                                        .map(String::toUpperCase)
                                        .collect(Collectors.toList());
        
        System.out.println("Mayúsculas: " + mayusculas);
        
        // Obtener longitudes
        List<Integer> longitudes = nombres.stream()
                                         .map(String::length)
                                         .collect(Collectors.toList());
        
        System.out.println("Longitudes: " + longitudes);
    }
}
```

**Salida**:
```
Mayúsculas: [JUAN, ANA, PEDRO]
Longitudes: [4, 3, 5]
```

### Ejemplo 3: Combinación de Operaciones

```java
import java.util.Arrays;
import java.util.List;

public class StreamComplejo {
    public static void main(String[] args) {
        List<String> palabras = Arrays.asList(
            "java", "python", "javascript", "go", "rust", "c"
        );
        
        // Filtrar palabras con más de 3 letras,
        // convertir a mayúsculas y ordenar
        List<String> resultado = palabras.stream()
            .filter(p -> p.length() > 3)
            .map(String::toUpperCase)
            .sorted()
            .collect(Collectors.toList());
        
        System.out.println("Resultado: " + resultado);
    }
}
```

**Salida**:
```
Resultado: [JAVA, JAVASCRIPT, PYTHON, RUST]
```

### Ejemplo 4: Trabajar con Objetos

```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

class Persona {
    String nombre;
    int edad;
    
    Persona(String nombre, int edad) {
        this.nombre = nombre;
        this.edad = edad;
    }
    
    public String getNombre() { return nombre; }
    public int getEdad() { return edad; }
}

public class StreamPersonas {
    public static void main(String[] args) {
        List<Persona> personas = Arrays.asList(
            new Persona("Ana", 25),
            new Persona("Luis", 17),
            new Persona("María", 30),
            new Persona("Pedro", 16)
        );
        
        // Filtrar mayores de edad y obtener sus nombres
        List<String> mayoresDeEdad = personas.stream()
            .filter(p -> p.getEdad() >= 18)
            .map(Persona::getNombre)
            .collect(Collectors.toList());
        
        System.out.println("Mayores de edad: " + mayoresDeEdad);
        
        // Calcular edad promedio
        double edadPromedio = personas.stream()
            .mapToInt(Persona::getEdad)
            .average()
            .orElse(0.0);
        
        System.out.println("Edad promedio: " + edadPromedio);
    }
}
```

**Salida**:
```
Mayores de edad: [Ana, María]
Edad promedio: 22.0
```

### Ejemplo 5: Reduce - Sumar Todos los Elementos

```java
import java.util.Arrays;
import java.util.List;

public class EjemploReduce {
    public static void main(String[] args) {
        List<Integer> numeros = Arrays.asList(1, 2, 3, 4, 5);
        
        // Sumar todos los números
        int suma = numeros.stream()
                         .reduce(0, (a, b) -> a + b);
        
        // Forma alternativa
        int suma2 = numeros.stream()
                          .reduce(0, Integer::sum);
        
        System.out.println("Suma: " + suma);
        System.out.println("Suma2: " + suma2);
        
        // Encontrar el máximo
        int maximo = numeros.stream()
                           .reduce(Integer.MIN_VALUE, Integer::max);
        
        System.out.println("Máximo: " + maximo);
    }
}
```

## 🎨 Métodos de Collectors

```java
import java.util.stream.Collectors;

List<String> lista = Arrays.asList("a", "b", "c");

// A Lista
List<String> lista2 = stream.collect(Collectors.toList());

// A Set (elimina duplicados)
Set<String> set = stream.collect(Collectors.toSet());

// Unir con separador
String unido = stream.collect(Collectors.joining(", ")); // "a, b, c"

// Contar
long cantidad = stream.collect(Collectors.counting());

// Agrupar por criterio
Map<Integer, List<String>> porLongitud = stream
    .collect(Collectors.groupingBy(String::length));
```

## ⚠️ Errores Comunes

1. **Reutilizar un Stream**
   ```java
   Stream<String> stream = lista.stream();
   stream.forEach(System.out::println);
   stream.forEach(System.out::println); // ❌ Error: stream has already been operated upon
   ```

2. **Modificar la colección original durante el stream**
   ```java
   lista.stream()
        .forEach(s -> lista.add("nuevo")); // ❌ ConcurrentModificationException
   ```

3. **Olvidar la operación terminal**
   ```java
   lista.stream()
        .filter(s -> s.length() > 3)
        .map(String::toUpperCase); // ❌ No hace nada sin operación terminal
   ```

## ⚙️ Funcionamiento Interno de Streams

### 🔍 ¿Cómo Funcionan los Streams Internamente?

Los streams utilizan una arquitectura de **pipeline** con dos conceptos clave:

#### 1️⃣ Evaluación Perezosa (Lazy Evaluation)

Las operaciones intermedias **NO se ejecutan** hasta que hay una operación terminal.

```java
List<Integer> numeros = Arrays.asList(1, 2, 3, 4, 5);

// Nada se ejecuta todavía
Stream<Integer> stream = numeros.stream()
    .filter(n -> {
        System.out.println("Filtrando: " + n);
        return n % 2 == 0;
    })
    .map(n -> {
        System.out.println("Mapeando: " + n);
        return n * 2;
    });

System.out.println("Stream creado, pero nada ejecutado aún");

// AHORA se ejecuta todo
List<Integer> resultado = stream.collect(Collectors.toList());
```

**Salida**:
```
Stream creado, pero nada ejecutado aún
Filtrando: 1
Filtrando: 2
Mapeando: 2
Filtrando: 3
Filtrando: 4
Mapeando: 4
Filtrando: 5
[4, 8]
```

**¿Por qué es importante?**
- **Eficiencia**: Solo procesa lo necesario
- **Short-circuiting**: Puede detenerse antes si encuentra lo que busca

#### 2️⃣ Pipeline de Procesamiento

Cada elemento pasa por **todas las operaciones** antes de procesar el siguiente.

```java
// NO funciona así (procesar todos con filter, luego todos con map):
// ❌ [1,2,3,4,5] -> filter todos -> [2,4] -> map todos -> [4,8]

// Funciona así (cada elemento atraviesa el pipeline completo):
// ✅ 1 -> filter(NO) -> descartado
//    2 -> filter(SÍ) -> map(4) -> collect
//    3 -> filter(NO) -> descartado
//    4 -> filter(SÍ) -> map(8) -> collect
//    5 -> filter(NO) -> descartado
```

### 📊 Ejemplo de Pipeline Completo

```java
import java.util.*;
import java.util.stream.Collectors;

public class StreamPipeline {
    public static void main(String[] args) {
        List<String> palabras = Arrays.asList("java", "python", "javascript", "go", "rust");
        
        List<String> resultado = palabras.stream()
            // Operación intermedia 1
            .filter(p -> {
                System.out.println("1️⃣ Filter: " + p);
                return p.length() > 3;
            })
            // Operación intermedia 2
            .map(p -> {
                System.out.println("2️⃣ Map: " + p);
                return p.toUpperCase();
            })
            // Operación intermedia 3
            .sorted((a, b) -> {
                System.out.println("3️⃣ Sorted: comparando " + a + " con " + b);
                return a.compareTo(b);
            })
            // Operación terminal
            .collect(Collectors.toList());
        
        System.out.println("\n✅ Resultado: " + resultado);
    }
}
```

**Salida**:
```
1️⃣ Filter: java
2️⃣ Map: java
1️⃣ Filter: python
2️⃣ Map: python
1️⃣ Filter: javascript
2️⃣ Map: javascript
1️⃣ Filter: go
1️⃣ Filter: rust
2️⃣ Map: rust
3️⃣ Sorted: comparando PYTHON con JAVA
3️⃣ Sorted: comparando JAVASCRIPT con JAVA
3️⃣ Sorted: comparando JAVASCRIPT con PYTHON
3️⃣ Sorted: comparando RUST con PYTHON

✅ Resultado: [JAVA, JAVASCRIPT, PYTHON, RUST]
```

### ⚡ Short-Circuit Operations

Operaciones que pueden detenerse antes de procesar todos los elementos:

```java
List<Integer> numeros = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// findFirst se detiene en el primer match
Optional<Integer> primero = numeros.stream()
    .filter(n -> {
        System.out.println("Verificando: " + n);
        return n > 5;
    })
    .findFirst();

System.out.println("Encontrado: " + primero.get());
```

**Salida**:
```
Verificando: 1
Verificando: 2
Verificando: 3
Verificando: 4
Verificando: 5
Verificando: 6
Encontrado: 6
```

Solo verifica hasta encontrar el primero que cumple. **No procesa 7, 8, 9, 10**.

### 🔄 Diferencia: Operaciones Intermedias vs Terminales

```java
// Operaciones INTERMEDIAS (lazy - retornan Stream)
stream.filter(...)    // Retorna Stream<T>
      .map(...)       // Retorna Stream<R>
      .sorted()       // Retorna Stream<T>
      .distinct()     // Retorna Stream<T>
      .limit(5)       // Retorna Stream<T>

// Operaciones TERMINALES (eager - ejecutan pipeline)
stream.collect(...)   // Retorna Collection
      .forEach(...)   // Retorna void
      .count()        // Retorna long
      .reduce(...)    // Retorna Optional<T> o T
      .findFirst()    // Retorna Optional<T>
```

### 🎯 Ejemplo: Diferencia de Rendimiento

```java
import java.util.stream.IntStream;

public class StreamPerformance {
    public static void main(String[] args) {
        // Procesar 1 millón de números
        long inicio = System.currentTimeMillis();
        
        // Con streams y short-circuit
        boolean existeMayorQue50 = IntStream.range(1, 1_000_000)
            .anyMatch(n -> n > 50);
        
        long fin = System.currentTimeMillis();
        System.out.println("Tiempo: " + (fin - inicio) + " ms");
        System.out.println("Existe: " + existeMayorQue50);
        
        // ⚡ anyMatch se detiene en el primer match (n=51)
        // NO procesa los 999,949 números restantes
    }
}
```

### 🧠 Conceptos Clave

| Concepto | Explicación |
|----------|-------------|
| **Lazy Evaluation** | Operaciones intermedias no se ejecutan hasta que hay una terminal |
| **Pipeline** | Cada elemento atraviesa todas las operaciones secuencialmente |
| **Short-circuit** | `findFirst()`, `anyMatch()`, `limit()` pueden detenerse antes |
| **Stateless** | `filter()`, `map()` no mantienen estado entre elementos |
| **Stateful** | `sorted()`, `distinct()` necesitan ver todos los elementos |

### 🎯 ¿Cuándo Usar Streams vs Loops?

**Usa Streams cuando:**
✅ Necesitas operaciones de alto nivel (filter, map, reduce)  
✅ Trabajas con colecciones grandes  
✅ Quieres código más legible y declarativo  
✅ Necesitas paralelización fácil (`.parallelStream()`)

**Usa Loops cuando:**
✅ Lógica compleja con múltiples condiciones  
✅ Necesitas break/continue avanzado  
✅ Modificas variables externas (side effects)  
✅ El rendimiento es crítico en operaciones simples

## 💪 Ejercicios Prácticos

### Ejercicio 1: Filtrar y Contar
**Dificultad**: Fácil

Dada una lista de números, cuenta cuántos son mayores que 5.

<details>
<summary>💡 Pista</summary>
Usa `.filter()` para filtrar y `.count()` para contar.
</details>

<details>
<summary>✅ Solución</summary>

```java
import java.util.Arrays;
import java.util.List;

public class Ejercicio1 {
    public static void main(String[] args) {
        List<Integer> numeros = Arrays.asList(1, 8, 3, 10, 5, 12, 2);
        
        long cantidad = numeros.stream()
                              .filter(n -> n > 5)
                              .count();
        
        System.out.println("Números mayores que 5: " + cantidad);
        // Resultado: 3
    }
}
```
</details>

### Ejercicio 2: Duplicar y Sumar
**Dificultad**: Medio

Duplica todos los números de una lista y luego suma el resultado.

<details>
<summary>✅ Solución</summary>

```java
import java.util.Arrays;
import java.util.List;

public class Ejercicio2 {
    public static void main(String[] args) {
        List<Integer> numeros = Arrays.asList(1, 2, 3, 4, 5);
        
        int suma = numeros.stream()
                         .map(n -> n * 2)
                         .reduce(0, Integer::sum);
        
        System.out.println("Suma de números duplicados: " + suma);
        // [2, 4, 6, 8, 10] -> suma = 30
    }
}
```
</details>

### Ejercicio 3: Nombres con A
**Dificultad**: Medio

Filtra nombres que empiezan con "A" y conviértelos a mayúsculas.

<details>
<summary>✅ Solución</summary>

```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Ejercicio3 {
    public static void main(String[] args) {
        List<String> nombres = Arrays.asList(
            "Ana", "Pedro", "Alberto", "María", "Antonio"
        );
        
        List<String> nombresConA = nombres.stream()
            .filter(n -> n.startsWith("A"))
            .map(String::toUpperCase)
            .collect(Collectors.toList());
        
        System.out.println("Nombres con A: " + nombresConA);
        // Resultado: [ANA, ALBERTO, ANTONIO]
    }
}
```
</details>

## 🔗 Temas Relacionados

- [Collections Framework](./collections)
- [Lambdas y Functional Interfaces](./lambdas)
- [Optional](./optional)

## 📚 Recursos Adicionales

- [Stream API - Oracle](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html)
- [Java 8 Streams Tutorial](https://www.baeldung.com/java-8-streams)
