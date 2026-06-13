---
title: "Collections Framework en Java"
level: intermedio
category: estructuras-datos
tags: [collections, list, set, map, arraylist, hashmap, filter, foreach]
duration: 45min
prerequisites: [arrays, poo, genericos]
---

# Collections Framework en Java

## 📋 ¿Qué es Collections Framework?

El **Collections Framework** es un conjunto de interfaces y clases para almacenar y manipular grupos de objetos. Proporciona estructuras de datos eficientes y algoritmos para trabajar con ellas.

### 🎯 Ventajas sobre Arrays

✅ **Tamaño dinámico**: crecen/decrecen automáticamente  
✅ **Métodos integrados**: ordenar, buscar, filtrar  
✅ **Tipos seguros**: con genéricos `<T>`  
✅ **Interfaces estándar**: código más flexible

## 🏗️ Jerarquía de Collections

```
Collection (interfaz)
├── List (interfaz)
│   ├── ArrayList
│   ├── LinkedList
│   └── Vector
├── Set (interfaz)
│   ├── HashSet
│   ├── LinkedHashSet
│   └── TreeSet
└── Queue (interfaz)
    ├── PriorityQueue
    └── LinkedList

Map (interfaz - NO extiende Collection)
├── HashMap
├── LinkedHashMap
└── TreeMap
```

## 📚 List - Listas Ordenadas

Colección **ordenada** que permite **duplicados**.

### ArrayList

Implementación basada en array redimensionable.

```java
import java.util.ArrayList;
import java.util.List;

public class ArrayListExample {
    public static void main(String[] args) {
        // Crear ArrayList
        List<String> frutas = new ArrayList<>();
        
        // Agregar elementos
        frutas.add("Manzana");
        frutas.add("Banana");
        frutas.add("Naranja");
        frutas.add("Banana"); // Duplicados permitidos
        
        System.out.println(frutas); // [Manzana, Banana, Naranja, Banana]
        
        // Acceder por índice
        String primera = frutas.get(0);
        System.out.println("Primera: " + primera); // Manzana
        
        // Modificar
        frutas.set(1, "Pera");
        
        // Eliminar
        frutas.remove("Naranja");     // Por valor
        frutas.remove(0);              // Por índice
        
        // Tamaño
        System.out.println("Tamaño: " + frutas.size());
        
        // Verificar existencia
        boolean tiene = frutas.contains("Pera");
    }
}
```

### ⚙️ Funcionamiento Interno de ArrayList

```java
/*
 * ArrayList internamente usa un array:
 * 
 * private Object[] elementData;
 * 
 * Cuando se llena, crea un nuevo array más grande (1.5x) y copia elementos:
 * 
 * int newCapacity = oldCapacity + (oldCapacity >> 1); // 1.5x
 * elementData = Arrays.copyOf(elementData, newCapacity);
 * 
 * Complejidades temporales:
 * - add(E e): O(1) amortizado (O(n) si necesita redimensionar)
 * - get(int index): O(1)
 * - remove(int index): O(n) (debe desplazar elementos)
 * - contains(Object o): O(n) (búsqueda lineal)
 */
```

### LinkedList

Implementación con lista doblemente enlazada.

```java
import java.util.LinkedList;

public class LinkedListExample {
    public static void main(String[] args) {
        LinkedList<Integer> numeros = new LinkedList<>();
        
        // Agregar al final
        numeros.add(10);
        numeros.add(20);
        
        // Agregar al inicio
        numeros.addFirst(5);
        
        // Agregar al final
        numeros.addLast(30);
        
        System.out.println(numeros); // [5, 10, 20, 30]
        
        // Obtener y remover primero/último
        int primero = numeros.getFirst();
        int ultimo = numeros.removeFirst();
    }
}
```

### ⚙️ Funcionamiento Interno de LinkedList

```java
/*
 * LinkedList usa nodos enlazados:
 * 
 * private static class Node<E> {
 *     E item;
 *     Node<E> next;
 *     Node<E> prev;
 * }
 * 
 * Cada nodo apunta al anterior y siguiente.
 * 
 * Complejidades temporales:
 * - addFirst/addLast: O(1)
 * - add(int index, E element): O(n) (debe recorrer hasta el índice)
 * - get(int index): O(n)
 * - remove(int index): O(n)
 */
```

### 🎯 ArrayList vs LinkedList

| Operación | ArrayList | LinkedList | Cuándo usar |
|-----------|-----------|------------|-------------|
| Acceso por índice `get(i)` | O(1) | O(n) | ArrayList si accedes por índice |
| Agregar al final | O(1) | O(1) | Igual |
| Agregar al inicio | O(n) | O(1) | LinkedList si insertas al inicio |
| Eliminar por índice | O(n) | O(n) | Igual |
| Memoria | Más compacta | Más overhead (nodos) | ArrayList generalmente |

**Recomendación**: **Usa ArrayList por defecto**. Solo usa LinkedList si:
- Insertas/eliminas frecuentemente al inicio
- Implementas una cola (Queue)

## 🔄 Métodos de Iteración en Collections

### 1️⃣ .forEach() - Iterar Elementos

```java
import java.util.List;

public class ForEachExample {
    public static void main(String[] args) {
        List<String> lenguajes = List.of("Java", "Python", "JavaScript");
        
        // Forma tradicional
        for (String lenguaje : lenguajes) {
            System.out.println(lenguaje);
        }
        
        // Con forEach + lambda
        lenguajes.forEach(lenguaje -> System.out.println(lenguaje));
        
        // Con method reference
        lenguajes.forEach(System.out::println);
    }
}
```

**⚙️ Funcionamiento interno:**
```java
/*
 * forEach llama al Consumer para cada elemento:
 * 
 * default void forEach(Consumer<? super T> action) {
 *     for (T t : this) {
 *         action.accept(t);
 *     }
 * }
 */
```

### 2️⃣ .stream() - Crear Stream

```java
import java.util.List;
import java.util.stream.Collectors;

public class StreamExample {
    public static void main(String[] args) {
        List<Integer> numeros = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        // Filtrar pares y duplicarlos
        List<Integer> pares = numeros.stream()
            .filter(n -> n % 2 == 0)
            .map(n -> n * 2)
            .collect(Collectors.toList());
        
        System.out.println(pares); // [4, 8, 12, 16, 20]
    }
}
```

### 3️⃣ .filter() - Filtrar Elementos

```java
import java.util.List;
import java.util.stream.Collectors;

public class FilterExample {
    public static void main(String[] args) {
        List<String> nombres = List.of("Ana", "Alberto", "Carlos", "Andrea", "Pedro");
        
        // Filtrar nombres que empiecen con 'A'
        List<String> nombresConA = nombres.stream()
            .filter(nombre -> nombre.startsWith("A"))
            .collect(Collectors.toList());
        
        System.out.println(nombresConA); // [Ana, Alberto, Andrea]
        
        // Múltiples filtros
        List<String> resultado = nombres.stream()
            .filter(n -> n.startsWith("A"))
            .filter(n -> n.length() > 3)
            .collect(Collectors.toList());
        
        System.out.println(resultado); // [Alberto, Andrea]
    }
}
```

**⚙️ Funcionamiento interno:**
```java
/*
 * filter evalúa el predicado para cada elemento:
 * 
 * Stream<T> filter(Predicate<? super T> predicate) {
 *     // Para cada elemento:
 *     if (predicate.test(element)) {
 *         // incluir en el stream resultante
 *     }
 * }
 * 
 * Los streams son LAZY: filter no ejecuta nada hasta que se llama
 * una operación terminal como collect(), forEach(), etc.
 */
```

### 4️⃣ .map() - Transformar Elementos

```java
import java.util.List;
import java.util.stream.Collectors;

public class MapExample {
    public static void main(String[] args) {
        List<String> palabras = List.of("java", "python", "javascript");
        
        // Convertir a mayúsculas
        List<String> mayusculas = palabras.stream()
            .map(String::toUpperCase)
            .collect(Collectors.toList());
        
        System.out.println(mayusculas); // [JAVA, PYTHON, JAVASCRIPT]
        
        // Obtener longitudes
        List<Integer> longitudes = palabras.stream()
            .map(String::length)
            .collect(Collectors.toList());
        
        System.out.println(longitudes); // [4, 6, 10]
        
        // Transformación compleja
        List<Persona> personas = List.of(
            new Persona("Ana", 25),
            new Persona("Carlos", 30)
        );
        
        List<String> nombres = personas.stream()
            .map(Persona::getNombre)
            .collect(Collectors.toList());
    }
}

class Persona {
    private String nombre;
    private int edad;
    
    public Persona(String nombre, int edad) {
        this.nombre = nombre;
        this.edad = edad;
    }
    
    public String getNombre() { return nombre; }
    public int getEdad() { return edad; }
}
```

**⚙️ Funcionamiento interno:**
```java
/*
 * map aplica una función a cada elemento:
 * 
 * <R> Stream<R> map(Function<? super T, ? extends R> mapper) {
 *     // Para cada elemento T:
 *     R resultado = mapper.apply(elemento);
 *     // agregar resultado al stream
 * }
 * 
 * Diferencia con filter:
 * - filter: filtra elementos (misma cantidad o menos)
 * - map: transforma elementos (misma cantidad, diferente tipo)
 */
```

### 5️⃣ .reduce() - Reducir a Un Valor

```java
import java.util.List;

public class ReduceExample {
    public static void main(String[] args) {
        List<Integer> numeros = List.of(1, 2, 3, 4, 5);
        
        // Sumar todos los números
        int suma = numeros.stream()
            .reduce(0, (a, b) -> a + b);
        System.out.println("Suma: " + suma); // 15
        
        // Con method reference
        int suma2 = numeros.stream()
            .reduce(0, Integer::sum);
        
        // Producto
        int producto = numeros.stream()
            .reduce(1, (a, b) -> a * b);
        System.out.println("Producto: " + producto); // 120
        
        // Concatenar strings
        List<String> palabras = List.of("Hola", "Mundo", "Java");
        String frase = palabras.stream()
            .reduce("", (a, b) -> a + " " + b)
            .trim();
        System.out.println(frase); // Hola Mundo Java
    }
}
```

**⚙️ Funcionamiento interno:**
```java
/*
 * reduce combina elementos de izquierda a derecha:
 * 
 * T reduce(T identity, BinaryOperator<T> accumulator) {
 *     T result = identity;
 *     for (T element : stream) {
 *         result = accumulator.apply(result, element);
 *     }
 *     return result;
 * }
 * 
 * Ejemplo con [1, 2, 3, 4]:
 * result = 0 (identity)
 * result = 0 + 1 = 1
 * result = 1 + 2 = 3
 * result = 3 + 3 = 6
 * result = 6 + 4 = 10
 */
```

### 6️⃣ .collect() - Recolectar Resultados

```java
import java.util.List;
import java.util.Set;
import java.util.Map;
import java.util.stream.Collectors;

public class CollectExample {
    public static void main(String[] args) {
        List<String> nombres = List.of("Ana", "Carlos", "Ana", "Pedro", "Carlos");
        
        // A List
        List<String> lista = nombres.stream()
            .collect(Collectors.toList());
        
        // A Set (elimina duplicados)
        Set<String> conjunto = nombres.stream()
            .collect(Collectors.toSet());
        System.out.println(conjunto); // [Ana, Carlos, Pedro]
        
        // Unir en un String
        String unidos = nombres.stream()
            .collect(Collectors.joining(", "));
        System.out.println(unidos); // Ana, Carlos, Ana, Pedro, Carlos
        
        // Agrupar por longitud
        Map<Integer, List<String>> porLongitud = nombres.stream()
            .collect(Collectors.groupingBy(String::length));
        System.out.println(porLongitud); 
        // {3=[Ana, Ana], 6=[Carlos, Carlos], 5=[Pedro]}
        
        // Contar elementos
        long cantidad = nombres.stream()
            .collect(Collectors.counting());
    }
}
```

### 7️⃣ .sorted() - Ordenar

```java
import java.util.List;
import java.util.stream.Collectors;
import java.util.Comparator;

public class SortedExample {
    public static void main(String[] args) {
        List<Integer> numeros = List.of(5, 2, 8, 1, 9);
        
        // Orden natural (ascendente)
        List<Integer> ordenados = numeros.stream()
            .sorted()
            .collect(Collectors.toList());
        System.out.println(ordenados); // [1, 2, 5, 8, 9]
        
        // Orden descendente
        List<Integer> descendente = numeros.stream()
            .sorted(Comparator.reverseOrder())
            .collect(Collectors.toList());
        System.out.println(descendente); // [9, 8, 5, 2, 1]
        
        // Ordenar objetos
        List<Persona> personas = List.of(
            new Persona("Carlos", 30),
            new Persona("Ana", 25),
            new Persona("Pedro", 28)
        );
        
        // Por edad
        List<Persona> porEdad = personas.stream()
            .sorted(Comparator.comparing(Persona::getEdad))
            .collect(Collectors.toList());
        
        // Por nombre (descendente)
        List<Persona> porNombre = personas.stream()
            .sorted(Comparator.comparing(Persona::getNombre).reversed())
            .collect(Collectors.toList());
    }
}
```

### 8️⃣ .distinct() - Eliminar Duplicados

```java
import java.util.List;
import java.util.stream.Collectors;

public class DistinctExample {
    public static void main(String[] args) {
        List<Integer> numeros = List.of(1, 2, 2, 3, 3, 3, 4, 5, 5);
        
        List<Integer> unicos = numeros.stream()
            .distinct()
            .collect(Collectors.toList());
        
        System.out.println(unicos); // [1, 2, 3, 4, 5]
    }
}
```

### 9️⃣ .limit() y .skip()

```java
import java.util.List;
import java.util.stream.Collectors;

public class LimitSkipExample {
    public static void main(String[] args) {
        List<Integer> numeros = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        // Tomar los primeros 5
        List<Integer> primeros = numeros.stream()
            .limit(5)
            .collect(Collectors.toList());
        System.out.println(primeros); // [1, 2, 3, 4, 5]
        
        // Saltar los primeros 5
        List<Integer> despues = numeros.stream()
            .skip(5)
            .collect(Collectors.toList());
        System.out.println(despues); // [6, 7, 8, 9, 10]
        
        // Paginación: obtener elementos 6-10
        List<Integer> pagina = numeros.stream()
            .skip(5)
            .limit(5)
            .collect(Collectors.toList());
        System.out.println(pagina); // [6, 7, 8, 9, 10]
    }
}
```

### 🔟 .anyMatch(), .allMatch(), .noneMatch()

```java
import java.util.List;

public class MatchExample {
    public static void main(String[] args) {
        List<Integer> numeros = List.of(2, 4, 6, 8, 10);
        
        // ¿Alguno es mayor a 5?
        boolean algunoMayor = numeros.stream()
            .anyMatch(n -> n > 5);
        System.out.println(algunoMayor); // true
        
        // ¿Todos son pares?
        boolean todosPares = numeros.stream()
            .allMatch(n -> n % 2 == 0);
        System.out.println(todosPares); // true
        
        // ¿Ninguno es negativo?
        boolean ningunNegativo = numeros.stream()
            .noneMatch(n -> n < 0);
        System.out.println(ningunNegativo); // true
    }
}
```

## 🔗 Set - Conjuntos Sin Duplicados

No permite elementos duplicados.

### HashSet

```java
import java.util.HashSet;
import java.util.Set;

public class HashSetExample {
    public static void main(String[] args) {
        Set<String> colores = new HashSet<>();
        
        colores.add("Rojo");
        colores.add("Azul");
        colores.add("Verde");
        colores.add("Rojo"); // No se agrega (duplicado)
        
        System.out.println(colores); // [Rojo, Verde, Azul] (orden no garantizado)
        System.out.println("Tamaño: " + colores.size()); // 3
        
        // Verificar existencia
        boolean tiene = colores.contains("Azul");
    }
}
```

**⚙️ Funcionamiento interno:**
```java
/*
 * HashSet usa HashMap internamente:
 * 
 * private transient HashMap<E,Object> map;
 * 
 * Almacena elementos como claves del HashMap.
 * Usa hashCode() para distribuir elementos en buckets.
 * 
 * Complejidades:
 * - add(E e): O(1) promedio
 * - contains(Object o): O(1) promedio
 * - remove(Object o): O(1) promedio
 */
```

### TreeSet

Set ordenado.

```java
import java.util.TreeSet;

public class TreeSetExample {
    public static void main(String[] args) {
        TreeSet<Integer> numeros = new TreeSet<>();
        
        numeros.add(5);
        numeros.add(1);
        numeros.add(8);
        numeros.add(3);
        
        System.out.println(numeros); // [1, 3, 5, 8] (ordenado)
        
        // Métodos especiales de TreeSet
        System.out.println("Primero: " + numeros.first());
        System.out.println("Último: " + numeros.last());
        System.out.println("Mayor que 3: " + numeros.higher(3));
    }
}
```

## 🗺️ Map - Pares Clave-Valor

Almacena pares clave-valor (no permite claves duplicadas).

### HashMap

```java
import java.util.HashMap;
import java.util.Map;

public class HashMapExample {
    public static void main(String[] args) {
        Map<String, Integer> edades = new HashMap<>();
        
        // Agregar
        edades.put("Ana", 25);
        edades.put("Carlos", 30);
        edades.put("Pedro", 28);
        
        // Obtener
        int edadAna = edades.get("Ana");
        System.out.println("Edad de Ana: " + edadAna); // 25
        
        // Actualizar
        edades.put("Ana", 26);
        
        // Verificar existencia
        boolean tieneCarlos = edades.containsKey("Carlos");
        boolean hayEdad30 = edades.containsValue(30);
        
        // Iterar
        for (Map.Entry<String, Integer> entry : edades.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
        
        // Con forEach
        edades.forEach((nombre, edad) -> 
            System.out.println(nombre + " tiene " + edad + " años")
        );
        
        // getOrDefault
        int edadJuan = edades.getOrDefault("Juan", 0);
    }
}
```

**⚙️ Funcionamiento interno:**
```java
/*
 * HashMap usa array de buckets + listas enlazadas/árboles:
 * 
 * Node<K,V>[] table;
 * 
 * 1. Calcula hashCode() de la clave
 * 2. Calcula índice: hash & (capacity - 1)
 * 3. Almacena en ese bucket
 * 4. Si hay colisiones, usa lista enlazada (o árbol si >8 elementos)
 * 
 * Complejidades:
 * - put(K, V): O(1) promedio
 * - get(Object key): O(1) promedio
 * - remove(Object key): O(1) promedio
 */
```

## 🎯 ¿Cuándo Usar Cada Método?

| Método | Cuándo Usarlo | Ejemplo de Uso |
|--------|---------------|----------------|
| **forEach** | Ejecutar acción en cada elemento | Imprimir, guardar en BD |
| **filter** | Quedarte solo con elementos que cumplen condición | Usuarios activos, números pares |
| **map** | Transformar cada elemento | Convertir a mayúsculas, extraer campo |
| **reduce** | Combinar todos los elementos en uno | Suma, producto, concatenación |
| **collect** | Convertir stream a colección | Volver a List, Set, Map |
| **sorted** | Ordenar elementos | Lista de productos por precio |
| **distinct** | Eliminar duplicados | Lista única de categorías |
| **anyMatch** | ¿Existe al menos uno? | ¿Hay usuarios admin? |
| **allMatch** | ¿Todos cumplen? | ¿Todos los pedidos están pagados? |

## 💪 Ejercicios Prácticos

### Ejercicio 1: Filtrar y Transformar
**Dificultad**: Medio

Dada una lista de productos, obtén los nombres de productos con precio > $100, en mayúsculas.

<details>
<summary>✅ Solución</summary>

```java
import java.util.List;
import java.util.stream.Collectors;

class Producto {
    private String nombre;
    private double precio;
    
    public Producto(String nombre, double precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
    
    public String getNombre() { return nombre; }
    public double getPrecio() { return precio; }
}

public class Main {
    public static void main(String[] args) {
        List<Producto> productos = List.of(
            new Producto("Laptop", 1200.0),
            new Producto("Mouse", 25.0),
            new Producto("Teclado", 150.0),
            new Producto("USB", 15.0)
        );
        
        List<String> resultado = productos.stream()
            .filter(p -> p.getPrecio() > 100)
            .map(p -> p.getNombre().toUpperCase())
            .collect(Collectors.toList());
        
        System.out.println(resultado); // [LAPTOP, TECLADO]
    }
}
```
</details>

### Ejercicio 2: Agrupar Datos
**Dificultad**: Medio

Agrupa estudiantes por edad.

<details>
<summary>✅ Solución</summary>

```java
import java.util.*;
import java.util.stream.Collectors;

class Estudiante {
    private String nombre;
    private int edad;
    
    public Estudiante(String nombre, int edad) {
        this.nombre = nombre;
        this.edad = edad;
    }
    
    public String getNombre() { return nombre; }
    public int getEdad() { return edad; }
}

public class Main {
    public static void main(String[] args) {
        List<Estudiante> estudiantes = List.of(
            new Estudiante("Ana", 20),
            new Estudiante("Carlos", 22),
            new Estudiante("Pedro", 20),
            new Estudiante("María", 22)
        );
        
        Map<Integer, List<Estudiante>> porEdad = estudiantes.stream()
            .collect(Collectors.groupingBy(Estudiante::getEdad));
        
        porEdad.forEach((edad, lista) -> {
            System.out.println("Edad " + edad + ":");
            lista.forEach(e -> System.out.println("  - " + e.getNombre()));
        });
    }
}
```
</details>

### Ejercicio 3: Operaciones Complejas
**Dificultad**: Difícil

Dada una lista de transacciones, calcula el total de ventas por categoría para productos con cantidad > 5.

<details>
<summary>✅ Solución</summary>

```java
import java.util.*;
import java.util.stream.Collectors;

class Transaccion {
    private String categoria;
    private int cantidad;
    private double precio;
    
    public Transaccion(String categoria, int cantidad, double precio) {
        this.categoria = categoria;
        this.cantidad = cantidad;
        this.precio = precio;
    }
    
    public String getCategoria() { return categoria; }
    public int getCantidad() { return cantidad; }
    public double getPrecio() { return precio; }
    public double getTotal() { return cantidad * precio; }
}

public class Main {
    public static void main(String[] args) {
        List<Transaccion> transacciones = List.of(
            new Transaccion("Electrónica", 10, 50.0),
            new Transaccion("Ropa", 3, 30.0),
            new Transaccion("Electrónica", 7, 100.0),
            new Transaccion("Alimentos", 20, 5.0),
            new Transaccion("Ropa", 15, 25.0)
        );
        
        Map<String, Double> totalPorCategoria = transacciones.stream()
            .filter(t -> t.getCantidad() > 5)
            .collect(Collectors.groupingBy(
                Transaccion::getCategoria,
                Collectors.summingDouble(Transaccion::getTotal)
            ));
        
        totalPorCategoria.forEach((cat, total) ->
            System.out.println(cat + ": $" + total)
        );
        // Electrónica: $1200.0
        // Alimentos: $100.0
        // Ropa: $375.0
    }
}
```
</details>

## 🔗 Temas Relacionados

- [Streams y Lambdas](./streams)
- [Generics](./genericos)
- [Programación Funcional](../avanzado/funcional)

## 📚 Recursos Adicionales

- [Collections Framework Overview - Oracle](https://docs.oracle.com/javase/tutorial/collections/)
- [Stream API Guide](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html)
- [Collectors Examples](https://www.baeldung.com/java-8-collectors)