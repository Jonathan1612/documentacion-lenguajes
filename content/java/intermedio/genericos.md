---
title: "Genéricos (Generics) en Java"
level: intermedio
category: caracteristicas-avanzadas
tags: [generics, tipos-parametrizados, type-safety, java]
duration: 30min
prerequisites: [poo, collections]
---

# Genéricos (Generics) en Java

## 📋 ¿Qué son los Genéricos?

Los **genéricos** (generics) permiten crear clases, interfaces y métodos que funcionan con **diferentes tipos** manteniendo la **seguridad de tipos** en tiempo de compilación.

### Sin Genéricos (Código Antiguo)

```java
// ❌ Antes de Java 5 - sin type safety
List lista = new ArrayList();
lista.add("Hola");
lista.add(123);

String texto = (String) lista.get(0); // Cast necesario
String texto2 = (String) lista.get(1); // ❌ Error en runtime!
```

### Con Genéricos

```java
// ✅ Con genéricos - type safe
List<String> lista = new ArrayList<>();
lista.add("Hola");
// lista.add(123); // ❌ Error de compilación
String texto = lista.get(0); // Sin cast
```

## 🎯 ¿Para qué sirven?

✅ **Seguridad de tipos** en tiempo de compilación  
✅ **Eliminar casts** manuales  
✅ **Código reutilizable** para diferentes tipos  
✅ **Errores tempranos** (compilación vs runtime)

## 💡 Sintaxis Básica

### Clases Genéricas

```java
// Definir clase genérica
public class Caja<T> {
    private T contenido;
    
    public void guardar(T item) {
        this.contenido = item;
    }
    
    public T obtener() {
        return contenido;
    }
}

// Usar la clase
public class Main {
    public static void main(String[] args) {
        // Caja de Strings
        Caja<String> cajaTexto = new Caja<>();
        cajaTexto.guardar("Hola Mundo");
        String texto = cajaTexto.obtener(); // Sin cast
        
        // Caja de Integers
        Caja<Integer> cajaNumero = new Caja<>();
        cajaNumero.guardar(42);
        Integer numero = cajaNumero.obtener();
        
        System.out.println(texto);   // Hola Mundo
        System.out.println(numero);  // 42
    }
}
```

### Múltiples Parámetros de Tipo

```java
public class Par<K, V> {
    private K clave;
    private V valor;
    
    public Par(K clave, V valor) {
        this.clave = clave;
        this.valor = valor;
    }
    
    public K getClave() { return clave; }
    public V getValor() { return valor; }
}

// Uso
Par<String, Integer> par = new Par<>("edad", 25);
System.out.println(par.getClave());  // edad
System.out.println(par.getValor());  // 25
```

## 📝 Métodos Genéricos

```java
public class Utils {
    // Método genérico
    public static <T> void imprimir(T elemento) {
        System.out.println(elemento);
    }
    
    // Método que retorna tipo genérico
    public static <T> T obtenerPrimero(T[] array) {
        return array.length > 0 ? array[0] : null;
    }
    
    // Intercambiar elementos de un array
    public static <T> void intercambiar(T[] array, int i, int j) {
        T temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// Uso
public class Main {
    public static void main(String[] args) {
        Utils.imprimir("Hola");
        Utils.imprimir(123);
        Utils.imprimir(3.14);
        
        String[] nombres = {"Ana", "Carlos", "Pedro"};
        String primero = Utils.obtenerPrimero(nombres);
        System.out.println(primero); // Ana
        
        Utils.intercambiar(nombres, 0, 2);
        System.out.println(Arrays.toString(nombres)); // [Pedro, Carlos, Ana]
    }
}
```

## 🔒 Bounded Type Parameters (Tipos Limitados)

### Upper Bound (extends)

```java
// T debe ser Number o subclase
public class Calculadora<T extends Number> {
    private T numero;
    
    public Calculadora(T numero) {
        this.numero = numero;
    }
    
    public double obtenerDoble() {
        return numero.doubleValue();
    }
}

// Uso
Calculadora<Integer> calc1 = new Calculadora<>(42);
Calculadora<Double> calc2 = new Calculadora<>(3.14);
// Calculadora<String> calc3 = new Calculadora<>("error"); // ❌ Error

System.out.println(calc1.obtenerDoble()); // 42.0
System.out.println(calc2.obtenerDoble()); // 3.14
```

### Ejemplo: Método con Bounded Type

```java
public class ComparadorUtils {
    // T debe implementar Comparable
    public static <T extends Comparable<T>> T maximo(T a, T b) {
        return a.compareTo(b) > 0 ? a : b;
    }
    
    public static void main(String[] args) {
        System.out.println(maximo(5, 10));           // 10
        System.out.println(maximo("Ana", "Zebra"));  // Zebra
        System.out.println(maximo(3.14, 2.71));      // 3.14
    }
}
```

### Múltiples Bounds

```java
// T debe extender Comparable E implementar Serializable
public class MultipleB<T extends Comparable<T> & Serializable> {
    private T valor;
    
    public MultipleB(T valor) {
        this.valor = valor;
    }
    
    public boolean esMayorQue(T otro) {
        return valor.compareTo(otro) > 0;
    }
}
```

## 🎭 Wildcards (Comodines)

### Unbounded Wildcard (?)

Acepta cualquier tipo.

```java
public class WildcardExample {
    public static void imprimirLista(List<?> lista) {
        for (Object elemento : lista) {
            System.out.println(elemento);
        }
    }
    
    public static void main(String[] args) {
        List<String> nombres = Arrays.asList("Ana", "Carlos");
        List<Integer> numeros = Arrays.asList(1, 2, 3);
        
        imprimirLista(nombres);  // ✅ Funciona
        imprimirLista(numeros);  // ✅ Funciona
    }
}
```

### Upper Bounded Wildcard (? extends)

Acepta tipo específico y sus subclases.

```java
public class UpperBoundExample {
    // Acepta List de Number o cualquier subclase (Integer, Double, etc.)
    public static double sumar(List<? extends Number> lista) {
        double suma = 0;
        for (Number num : lista) {
            suma += num.doubleValue();
        }
        return suma;
    }
    
    public static void main(String[] args) {
        List<Integer> enteros = Arrays.asList(1, 2, 3);
        List<Double> decimales = Arrays.asList(1.5, 2.5, 3.5);
        
        System.out.println(sumar(enteros));   // 6.0
        System.out.println(sumar(decimales)); // 7.5
    }
}
```

### Lower Bounded Wildcard (? super)

Acepta tipo específico y sus superclases.

```java
public class LowerBoundExample {
    // Acepta List de Integer o cualquier superclase (Number, Object)
    public static void agregarEnteros(List<? super Integer> lista) {
        lista.add(1);
        lista.add(2);
        lista.add(3);
    }
    
    public static void main(String[] args) {
        List<Integer> enteros = new ArrayList<>();
        List<Number> numeros = new ArrayList<>();
        List<Object> objetos = new ArrayList<>();
        
        agregarEnteros(enteros); // ✅
        agregarEnteros(numeros); // ✅
        agregarEnteros(objetos); // ✅
        
        System.out.println(enteros); // [1, 2, 3]
    }
}
```

## 🎯 PECS: Producer Extends, Consumer Super

**Regla mnemotécnica** para saber cuándo usar qué wildcard:

### Producer Extends

Si **lees** de la estructura (produce datos), usa `extends`.

```java
// Copiar de src (produce) a dest
public static <T> void copiar(
    List<? extends T> src,      // Producer: lee elementos
    List<? super T> dest        // Consumer: escribe elementos
) {
    for (T item : src) {
        dest.add(item);
    }
}
```

### Consumer Super

Si **escribes** en la estructura (consume datos), usa `super`.

```java
List<Number> numeros = new ArrayList<>();
List<Integer> enteros = Arrays.asList(1, 2, 3);

// extends: lee de enteros
// super: escribe en numeros
copiar(enteros, numeros);
```

## 📝 Ejemplos Prácticos Avanzados

### Ejemplo 1: Pila Genérica

```java
import java.util.ArrayList;
import java.util.List;

public class Pila<T> {
    private List<T> elementos = new ArrayList<>();
    
    public void push(T elemento) {
        elementos.add(elemento);
    }
    
    public T pop() {
        if (isEmpty()) {
            throw new IllegalStateException("Pila vacía");
        }
        return elementos.remove(elementos.size() - 1);
    }
    
    public T peek() {
        if (isEmpty()) {
            throw new IllegalStateException("Pila vacía");
        }
        return elementos.get(elementos.size() - 1);
    }
    
    public boolean isEmpty() {
        return elementos.isEmpty();
    }
    
    public int size() {
        return elementos.size();
    }
}

// Uso
public class Main {
    public static void main(String[] args) {
        Pila<String> pila = new Pila<>();
        
        pila.push("Primero");
        pila.push("Segundo");
        pila.push("Tercero");
        
        System.out.println(pila.pop());  // Tercero
        System.out.println(pila.peek()); // Segundo
        System.out.println(pila.size()); // 2
    }
}
```

### Ejemplo 2: Repositorio Genérico

```java
import java.util.*;

interface Identificable {
    Long getId();
}

public class Repositorio<T extends Identificable> {
    private Map<Long, T> datos = new HashMap<>();
    
    public void guardar(T entidad) {
        datos.put(entidad.getId(), entidad);
    }
    
    public Optional<T> buscarPorId(Long id) {
        return Optional.ofNullable(datos.get(id));
    }
    
    public List<T> buscarTodos() {
        return new ArrayList<>(datos.values());
    }
    
    public void eliminar(Long id) {
        datos.remove(id);
    }
}

// Entidades
class Usuario implements Identificable {
    private Long id;
    private String nombre;
    
    public Usuario(Long id, String nombre) {
        this.id = id;
        this.nombre = nombre;
    }
    
    @Override
    public Long getId() { return id; }
    public String getNombre() { return nombre; }
}

// Uso
public class Main {
    public static void main(String[] args) {
        Repositorio<Usuario> repo = new Repositorio<>();
        
        repo.guardar(new Usuario(1L, "Ana"));
        repo.guardar(new Usuario(2L, "Carlos"));
        
        Optional<Usuario> usuario = repo.buscarPorId(1L);
        usuario.ifPresent(u -> System.out.println(u.getNombre())); // Ana
        
        System.out.println("Total usuarios: " + repo.buscarTodos().size()); // 2
    }
}
```

## ⚙️ Type Erasure (Borrado de Tipos)

Los genéricos solo existen en tiempo de **compilación**. En tiempo de ejecución se eliminan:

```java
/*
 * Código con genéricos:
 * List<String> lista = new ArrayList<>();
 * 
 * Después del type erasure (bytecode):
 * List lista = new ArrayList();
 * 
 * Los genéricos son solo verificación en compilación.
 * Por eso no puedes hacer:
 */

// ❌ Error
if (lista instanceof List<String>) { }  // No puede verificar en runtime
T obj = new T();                         // No puede instanciar
T[] array = new T[10];                   // No puede crear array
```

## ⚠️ Errores Comunes

### 1. Raw Types

```java
// ❌ Mal - raw type (sin genéricos)
List lista = new ArrayList();
lista.add("texto");
lista.add(123); // Mezcla tipos

// ✅ Correcto
List<String> lista = new ArrayList<>();
```

### 2. Arrays de Tipos Genéricos

```java
// ❌ No se puede crear array de tipo genérico
List<String>[] arrays = new List<String>[10]; // Error

// ✅ Alternativas
List<String>[] arrays = (List<String>[]) new List[10]; // Cast
List<List<String>> listas = new ArrayList<>();          // List de listas
```

### 3. Confundir Wildcards

```java
List<? extends Number> lista = new ArrayList<Integer>();
// lista.add(10); // ❌ Error: no puede agregar

List<? super Integer> lista2 = new ArrayList<Number>();
lista2.add(10); // ✅ Puede agregar Integer
```

## 💪 Ejercicios Prácticos

### Ejercicio 1: Encontrar Elemento
**Dificultad**: Fácil

Crea un método genérico que encuentre un elemento en un array.

<details>
<summary>✅ Solución</summary>

```java
public class Busqueda {
    public static <T> int encontrar(T[] array, T elemento) {
        for (int i = 0; i < array.length; i++) {
            if (array[i].equals(elemento)) {
                return i;
            }
        }
        return -1;
    }
    
    public static void main(String[] args) {
        String[] nombres = {"Ana", "Carlos", "Pedro"};
        Integer[] numeros = {10, 20, 30, 40};
        
        System.out.println(encontrar(nombres, "Carlos")); // 1
        System.out.println(encontrar(numeros, 30));       // 2
        System.out.println(encontrar(numeros, 99));       // -1
    }
}
```
</details>

### Ejercicio 2: Clase Par Genérica
**Dificultad**: Medio

Crea una clase `Par<K, V>` con métodos útiles.

<details>
<summary>✅ Solución</summary>

```java
public class Par<K, V> {
    private K clave;
    private V valor;
    
    public Par(K clave, V valor) {
        this.clave = clave;
        this.valor = valor;
    }
    
    public K getClave() { return clave; }
    public V getValor() { return valor; }
    
    public void setClave(K clave) { this.clave = clave; }
    public void setValor(V valor) { this.valor = valor; }
    
    public Par<V, K> invertir() {
        return new Par<>(valor, clave);
    }
    
    @Override
    public String toString() {
        return "(" + clave + ", " + valor + ")";
    }
    
    public static void main(String[] args) {
        Par<String, Integer> par = new Par<>("edad", 25);
        System.out.println(par); // (edad, 25)
        
        Par<Integer, String> invertido = par.invertir();
        System.out.println(invertido); // (25, edad)
    }
}
```
</details>

## 🔗 Temas Relacionados

- [Collections](./collections)
- [POO - Interfaces](./poo)
- [Lambdas y Streams](./streams)

## 📚 Recursos Adicionales

- [Generics Tutorial - Oracle](https://docs.oracle.com/javase/tutorial/java/generics/)
- [Effective Java - Item 26-31](https://www.oreilly.com/library/view/effective-java/9780134686097/)
- [Type Erasure Explained](https://www.baeldung.com/java-type-erasure)
