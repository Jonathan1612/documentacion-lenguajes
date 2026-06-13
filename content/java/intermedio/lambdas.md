---
title: "Expresiones Lambda en Java"
level: intermedio
category: funcional
tags: [lambda, functional, functional-interface, method-reference, stream]
duration: 25min
prerequisites: [interfaces, collections]
---

# Expresiones Lambda en Java

## 📋 ¿Qué son las Lambdas?

Las **lambdas** son funciones anónimas (sin nombre) que permiten escribir código más conciso. Introducidas en **Java 8**.

```java
// Sin lambda - forma tradicional
Runnable r1 = new Runnable() {
    @Override
    public void run() {
        System.out.println("Hola desde Runnable");
    }
};

// Con lambda - forma concisa ✨
Runnable r2 = () -> System.out.println("Hola desde Lambda");

r1.run();
r2.run();
```

## 💡 Sintaxis Básica

```java
// Estructura general
(parámetros) -> expresión
(parámetros) -> { bloque de código }

// Ejemplos
() -> System.out.println("Sin parámetros")
x -> x * 2                    // Un parámetro (sin paréntesis)
(x) -> x * 2                  // Un parámetro (con paréntesis)
(x, y) -> x + y               // Múltiples parámetros
(x, y) -> {                   // Bloque de código
    int suma = x + y;
    return suma;
}
```

## 🎯 Interfaces Funcionales

Las lambdas solo funcionan con **interfaces funcionales** (interfaces con un solo método abstracto).

```java
@FunctionalInterface
public interface Operacion {
    int calcular(int a, int b);
}

// Uso con lambda
public class Main {
    public static void main(String[] args) {
        // Lambda que implementa Operacion
        Operacion suma = (a, b) -> a + b;
        Operacion resta = (a, b) -> a - b;
        Operacion multiplicacion = (a, b) -> a * b;
        
        System.out.println(suma.calcular(10, 5));           // 15
        System.out.println(resta.calcular(10, 5));          // 5
        System.out.println(multiplicacion.calcular(10, 5)); // 50
    }
}
```

## 📦 Interfaces Funcionales del JDK

### 1. Predicate<T> - Condición

```java
import java.util.function.Predicate;

public class Main {
    public static void main(String[] args) {
        // Predicate: T -> boolean
        Predicate<Integer> esPar = n -> n % 2 == 0;
        Predicate<String> esLargo = s -> s.length() > 5;
        
        System.out.println(esPar.test(4));      // true
        System.out.println(esPar.test(7));      // false
        System.out.println(esLargo.test("Java")); // false
        System.out.println(esLargo.test("JavaScript")); // true
    }
}
```

### 2. Function<T, R> - Transformación

```java
import java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        // Function: T -> R
        Function<String, Integer> longitud = s -> s.length();
        Function<Integer, Integer> cuadrado = n -> n * n;
        Function<String, String> mayusculas = s -> s.toUpperCase();
        
        System.out.println(longitud.apply("Java"));  // 4
        System.out.println(cuadrado.apply(5));       // 25
        System.out.println(mayusculas.apply("hola")); // HOLA
    }
}
```

### 3. Consumer<T> - Consumir

```java
import java.util.function.Consumer;

public class Main {
    public static void main(String[] args) {
        // Consumer: T -> void
        Consumer<String> imprimir = s -> System.out.println(s);
        Consumer<Integer> duplicar = n -> System.out.println(n * 2);
        
        imprimir.accept("Hola");  // Hola
        duplicar.accept(5);       // 10
    }
}
```

### 4. Supplier<T> - Proveer

```java
import java.util.function.Supplier;

public class Main {
    public static void main(String[] args) {
        // Supplier: () -> T
        Supplier<Double> aleatorio = () -> Math.random();
        Supplier<String> saludo = () -> "Hola Mundo";
        
        System.out.println(aleatorio.get()); // 0.xxxxx
        System.out.println(saludo.get());    // Hola Mundo
    }
}
```

### Tabla Resumen

| Interfaz | Firma | Descripción | Ejemplo |
|----------|-------|-------------|---------|
| `Predicate<T>` | `T -> boolean` | Condición | `n -> n > 0` |
| `Function<T,R>` | `T -> R` | Transformación | `s -> s.length()` |
| `Consumer<T>` | `T -> void` | Consumir | `x -> System.out.println(x)` |
| `Supplier<T>` | `() -> T` | Proveer | `() -> new User()` |
| `BiFunction<T,U,R>` | `(T,U) -> R` | Dos parámetros | `(a,b) -> a + b` |
| `BinaryOperator<T>` | `(T,T) -> T` | Dos del mismo tipo | `(x,y) -> x * y` |

## 🔧 Lambdas con Listas

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> nombres = Arrays.asList("Ana", "Carlos", "María", "Pedro");
        
        // forEach con lambda
        nombres.forEach(nombre -> System.out.println(nombre));
        
        // Forma abreviada (method reference)
        nombres.forEach(System.out::println);
        
        // removeIf con Predicate
        List<Integer> numeros = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5, 6));
        numeros.removeIf(n -> n % 2 == 0); // Eliminar pares
        System.out.println(numeros); // [1, 3, 5]
        
        // sort con Comparator
        List<String> palabras = Arrays.asList("Java", "Python", "C++", "JavaScript");
        palabras.sort((a, b) -> Integer.compare(a.length(), b.length()));
        System.out.println(palabras); // [C++, Java, Python, JavaScript]
    }
}
```

## 📊 Ejemplo Completo: Filtrar y Transformar

```java
import java.util.*;
import java.util.function.*;

public class Main {
    public static void main(String[] args) {
        List<String> palabras = Arrays.asList("Java", "Python", "JavaScript", "C++", "Go");
        
        // Filtrar palabras largas (> 4 caracteres)
        Predicate<String> esLarga = s -> s.length() > 4;
        
        // Transformar a mayúsculas
        Function<String, String> aMayusculas = s -> s.toUpperCase();
        
        // Imprimir
        Consumer<String> imprimir = s -> System.out.println("- " + s);
        
        System.out.println("Palabras largas:");
        palabras.stream()
                .filter(esLarga)
                .map(aMayusculas)
                .forEach(imprimir);
    }
}
```

**Salida**:
```
Palabras largas:
- PYTHON
- JAVASCRIPT
```

## 🎨 Method References (Referencias a Métodos)

Forma abreviada de lambdas que llaman a un método existente.

### Sintaxis

| Tipo | Sintaxis | Equivalente Lambda |
|------|----------|-------------------|
| Método estático | `Clase::metodo` | `(args) -> Clase.metodo(args)` |
| Método de instancia | `objeto::metodo` | `(args) -> objeto.metodo(args)` |
| Método de instancia arbitrario | `Clase::metodo` | `(obj, args) -> obj.metodo(args)` |
| Constructor | `Clase::new` | `(args) -> new Clase(args)` |

### Ejemplos

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> palabras = Arrays.asList("Java", "Python", "C++");
        
        // 1. Método estático
        palabras.forEach(System.out::println);
        // Equivalente a: palabras.forEach(s -> System.out.println(s));
        
        // 2. Método de instancia
        String prefijo = "Lenguaje: ";
        palabras.forEach(prefijo::concat);
        
        // 3. Método de instancia arbitrario
        palabras.sort(String::compareToIgnoreCase);
        // Equivalente a: palabras.sort((a, b) -> a.compareToIgnoreCase(b));
        
        // 4. Constructor
        List<Integer> longitudes = new ArrayList<>();
        palabras.stream()
                .map(String::length)
                .forEach(longitudes::add);
        System.out.println(longitudes); // [4, 6, 3]
    }
}
```

## 🔄 Composición de Funciones

```java
import java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        Function<Integer, Integer> multiplicarPor2 = x -> x * 2;
        Function<Integer, Integer> sumar10 = x -> x + 10;
        
        // andThen: primero multiplicar, luego sumar
        Function<Integer, Integer> multiplicarYSumar = 
            multiplicarPor2.andThen(sumar10);
        System.out.println(multiplicarYSumar.apply(5)); // (5 * 2) + 10 = 20
        
        // compose: primero sumar, luego multiplicar
        Function<Integer, Integer> sumarYMultiplicar = 
            multiplicarPor2.compose(sumar10);
        System.out.println(sumarYMultiplicar.apply(5)); // (5 + 10) * 2 = 30
    }
}
```

## 📝 Ejemplo Real: Validador de Formularios

```java
import java.util.function.Predicate;

public class Validador {
    // Validaciones como Predicates
    public static Predicate<String> noVacio = s -> !s.isEmpty();
    public static Predicate<String> emailValido = s -> s.contains("@") && s.contains(".");
    public static Predicate<String> longitudMinima(int min) {
        return s -> s.length() >= min;
    }
    
    public static boolean validar(String valor, Predicate<String>... validaciones) {
        for (Predicate<String> validacion : validaciones) {
            if (!validacion.test(valor)) {
                return false;
            }
        }
        return true;
    }
}

public class Main {
    public static void main(String[] args) {
        String email = "usuario@email.com";
        String password = "pass123";
        
        // Validar email
        boolean emailOk = Validador.validar(email, 
            Validador.noVacio,
            Validador.emailValido
        );
        System.out.println("Email válido: " + emailOk); // true
        
        // Validar password
        boolean passOk = Validador.validar(password,
            Validador.noVacio,
            Validador.longitudMinima(8)
        );
        System.out.println("Password válido: " + passOk); // false (< 8 caracteres)
    }
}
```

## 🎯 Lambdas con Streams

```java
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numeros = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        // Filtrar pares, multiplicar por 2, sumar
        int resultado = numeros.stream()
                .filter(n -> n % 2 == 0)      // Lambda: filtrar pares
                .map(n -> n * 2)              // Lambda: multiplicar por 2
                .reduce(0, (a, b) -> a + b);  // Lambda: sumar
        
        System.out.println(resultado); // (2+4+6+8+10) * 2 = 60
        
        // Encontrar primer número > 5
        Optional<Integer> primero = numeros.stream()
                .filter(n -> n > 5)
                .findFirst();
        primero.ifPresent(n -> System.out.println("Primer número > 5: " + n)); // 6
    }
}
```

## ⚙️ Funcionamiento Interno

### ¿Cómo Funcionan las Lambdas?

Java convierte lambdas en instancias de interfaces funcionales usando **invokedynamic**.

```java
// Esta lambda
Runnable r = () -> System.out.println("Hola");

// Se convierte internamente en algo como:
Runnable r = new Runnable() {
    public void run() {
        System.out.println("Hola");
    }
};

// Pero más eficiente usando invokedynamic (no crea clase anónima)
```

### Captura de Variables

Las lambdas pueden capturar variables del contexto externo, pero deben ser **efectivamente finales**.

```java
public class Main {
    public static void main(String[] args) {
        int factor = 2;
        
        // Lambda captura 'factor'
        Function<Integer, Integer> multiplicar = n -> n * factor;
        
        System.out.println(multiplicar.apply(5)); // 10
        
        // factor = 3; // ❌ Error: factor debe ser efectivamente final
    }
}
```

## ⚠️ Errores Comunes

### 1. Modificar variables capturadas

```java
int contador = 0;

// ❌ Error
Consumer<String> imprimir = s -> {
    contador++; // No puedes modificar variables externas
    System.out.println(s);
};

// ✅ Solución: usar variable de instancia o AtomicInteger
```

### 2. No especificar tipos cuando es ambiguo

```java
// ❌ Ambiguo
Function algo = x -> x * 2;

// ✅ Correcto
Function<Integer, Integer> algo = x -> x * 2;
```

### 3. Olvidar return en bloques

```java
// ❌ Error: falta return
Function<Integer, Integer> cuadrado = n -> {
    n * n; // Sin return
};

// ✅ Correcto
Function<Integer, Integer> cuadrado = n -> {
    return n * n;
};

// ✅ O expresión sin llaves
Function<Integer, Integer> cuadrado = n -> n * n;
```

## 💪 Ejercicios Prácticos

### Ejercicio 1: Filtrar Números
**Dificultad**: Fácil

Filtra números mayores a 50 usando lambda.

<details>
<summary>✅ Solución</summary>

```java
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numeros = Arrays.asList(10, 55, 30, 80, 45, 90, 25);
        
        List<Integer> mayoresA50 = numeros.stream()
                .filter(n -> n > 50)
                .collect(Collectors.toList());
        
        System.out.println(mayoresA50); // [55, 80, 90]
    }
}
```
</details>

### Ejercicio 2: Transformar Nombres
**Dificultad**: Medio

Convierte lista de nombres a mayúsculas y ordena alfabéticamente.

<details>
<summary>✅ Solución</summary>

```java
import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<String> nombres = Arrays.asList("ana", "carlos", "maría", "pedro");
        
        List<String> resultado = nombres.stream()
                .map(nombre -> nombre.toUpperCase())
                .sorted()
                .collect(Collectors.toList());
        
        System.out.println(resultado); // [ANA, CARLOS, MARÍA, PEDRO]
        
        // Con method reference (más conciso)
        List<String> resultado2 = nombres.stream()
                .map(String::toUpperCase)
                .sorted()
                .collect(Collectors.toList());
    }
}
```
</details>

### Ejercicio 3: Calcular Promedio
**Dificultad**: Medio

Calcula el promedio de números pares.

<details>
<summary>✅ Solución</summary>

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numeros = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        double promedio = numeros.stream()
                .filter(n -> n % 2 == 0)
                .mapToInt(n -> n)
                .average()
                .orElse(0.0);
        
        System.out.println("Promedio de pares: " + promedio); // 6.0
    }
}
```
</details>

## 🎯 Cuándo Usar Lambdas

✅ **Usar lambdas cuando**:
- Necesitas implementar interfaces funcionales
- Trabajas con Streams
- El código es simple y legible
- Quieres evitar clases anónimas verbosas

❌ **Evitar lambdas cuando**:
- La lógica es compleja (usa método normal)
- Necesitas reutilizar en múltiples lugares (crea clase/método)
- Dificulta la depuración

## 🔗 Temas Relacionados

- [Interfaces](./interfaces)
- [Streams](./streams)
- [Collections](./collections)

## 📚 Recursos Adicionales

- [Lambda Expressions - Oracle](https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html)
- [Functional Interfaces](https://docs.oracle.com/javase/8/docs/api/java/util/function/package-summary.html)
- [Method References](https://docs.oracle.com/javase/tutorial/java/javaOO/methodreferences.html)
