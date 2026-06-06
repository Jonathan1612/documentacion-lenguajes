---
title: "Variables y Tipos de Datos"
level: basico
category: fundamentos
tags: [java, variables, tipos, primitivos, string]
duration: 15min
prerequisites: [introduccion]
---

# Variables y Tipos de Datos en Java

## 📋 ¿Qué es una Variable?

Una **variable** es un espacio en memoria que almacena un valor que puede cambiar durante la ejecución del programa. Cada variable tiene un **nombre**, un **tipo** y un **valor**.

## 🔑 Tipos de Datos Primitivos

Java tiene 8 tipos de datos primitivos:

| Tipo | Tamaño | Rango | Ejemplo |
|------|--------|-------|---------|
| `byte` | 8 bits | -128 a 127 | `byte edad = 25;` |
| `short` | 16 bits | -32,768 a 32,767 | `short año = 2024;` |
| `int` | 32 bits | -2³¹ a 2³¹-1 | `int poblacion = 1000000;` |
| `long` | 64 bits | -2⁶³ a 2⁶³-1 | `long distancia = 150000000L;` |
| `float` | 32 bits | decimales | `float precio = 19.99f;` |
| `double` | 64 bits | decimales | `double pi = 3.14159265359;` |
| `boolean` | 1 bit | true/false | `boolean activo = true;` |
| `char` | 16 bits | caracteres Unicode | `char letra = 'A';` |

## 💡 Sintaxis de Declaración

```java
// Sintaxis: tipo nombreVariable = valor;

// Declaración simple
int edad;

// Declaración con inicialización
int edad = 25;

// Múltiples variables del mismo tipo
int x = 5, y = 10, z = 15;

// Constantes (no pueden cambiar)
final double PI = 3.14159;
```

## 📝 Ejemplos Prácticos

### Ejemplo 1: Tipos Numéricos

```java
public class TiposNumericos {
    public static void main(String[] args) {
        // Números enteros
        int cantidad = 100;
        long poblacionMundial = 7800000000L;
        
        // Números decimales
        double precio = 29.99;
        float descuento = 0.15f;
        
        // Operaciones
        double precioFinal = precio - (precio * descuento);
        
        System.out.println("Cantidad: " + cantidad);
        System.out.println("Población mundial: " + poblacionMundial);
        System.out.println("Precio original: $" + precio);
        System.out.println("Precio final: $" + precioFinal);
    }
}
```

**Salida**:
```
Cantidad: 100
Población mundial: 7800000000
Precio original: $29.99
Precio final: $25.4915
```

### Ejemplo 2: Strings y Caracteres

```java
public class TextoYCaracteres {
    public static void main(String[] args) {
        // String (no es primitivo, es una clase)
        String nombre = "Juan";
        String apellido = "Pérez";
        String nombreCompleto = nombre + " " + apellido; // Concatenación
        
        // Caracteres individuales
        char inicial = 'J';
        char grado = 'A';
        
        System.out.println("Nombre completo: " + nombreCompleto);
        System.out.println("Inicial: " + inicial);
        System.out.println("Longitud del nombre: " + nombreCompleto.length());
        System.out.println("En mayúsculas: " + nombreCompleto.toUpperCase());
    }
}
```

**Salida**:
```
Nombre completo: Juan Pérez
Inicial: J
Longitud del nombre: 10
En mayúsculas: JUAN PÉREZ
```

### Ejemplo 3: Boolean

```java
public class EjemploBoolean {
    public static void main(String[] args) {
        int edad = 18;
        boolean esMayorDeEdad = edad >= 18;
        boolean tieneLicencia = true;
        boolean puedeConducir = esMayorDeEdad && tieneLicencia;
        
        System.out.println("Edad: " + edad);
        System.out.println("¿Es mayor de edad? " + esMayorDeEdad);
        System.out.println("¿Tiene licencia? " + tieneLicencia);
        System.out.println("¿Puede conducir? " + puedeConducir);
    }
}
```

## 🎨 Métodos Útiles de String

```java
String texto = "Hola Mundo";

// Longitud
int longitud = texto.length(); // 10

// Mayúsculas y minúsculas
String mayus = texto.toUpperCase(); // "HOLA MUNDO"
String minus = texto.toLowerCase(); // "hola mundo"

// Búsqueda
boolean contiene = texto.contains("Mundo"); // true
int posicion = texto.indexOf("Mundo"); // 5

// Reemplazo
String nuevo = texto.replace("Mundo", "Java"); // "Hola Java"

// Subcadenas
String sub = texto.substring(0, 4); // "Hola"

// Comparación
boolean iguales = texto.equals("Hola Mundo"); // true
```

## ⚠️ Errores Comunes

1. **No inicializar variables locales**
   ```java
   int x;
   System.out.println(x); // ❌ Error: variable might not have been initialized
   ```

2. **Comparar Strings con ==**
   ```java
   String a = "Hola";
   String b = "Hola";
   if (a == b) { }        // ❌ Compara referencias
   if (a.equals(b)) { }   // ✅ Compara contenido
   ```

3. **Olvidar sufijos en literales**
   ```java
   long grande = 3000000000;  // ❌ Error: integer too large
   long grande = 3000000000L; // ✅ Correcto
   
   float decimal = 3.14;      // ❌ Error: incompatible types
   float decimal = 3.14f;     // ✅ Correcto
   ```

## 💪 Ejercicios Prácticos

### Ejercicio 1: Calculadora de Edad
**Dificultad**: Fácil

Crea un programa que calcule tu edad en días, horas y minutos aproximadamente.

<details>
<summary>💡 Pista</summary>
1 año = 365 días, 1 día = 24 horas, 1 hora = 60 minutos
</details>

<details>
<summary>✅ Solución</summary>

```java
public class CalculadoraEdad {
    public static void main(String[] args) {
        int edad = 25; // Tu edad en años
        
        int dias = edad * 365;
        int horas = dias * 24;
        int minutos = horas * 60;
        
        System.out.println("Edad en años: " + edad);
        System.out.println("Edad en días: " + dias);
        System.out.println("Edad en horas: " + horas);
        System.out.println("Edad en minutos: " + minutos);
    }
}
```
</details>

### Ejercicio 2: Información Personal
**Dificultad**: Fácil

Crea variables para almacenar tu información personal (nombre, edad, altura, estudiante) y muéstrala formateada.

<details>
<summary>✅ Solución</summary>

```java
public class InfoPersonal {
    public static void main(String[] args) {
        String nombre = "Ana García";
        int edad = 22;
        double altura = 1.65;
        boolean esEstudiante = true;
        
        System.out.println("=== INFORMACIÓN PERSONAL ===");
        System.out.println("Nombre: " + nombre);
        System.out.println("Edad: " + edad + " años");
        System.out.println("Altura: " + altura + " metros");
        System.out.println("Estudiante: " + (esEstudiante ? "Sí" : "No"));
    }
}
```
</details>

### Ejercicio 3: Conversor de Temperatura
**Dificultad**: Medio

Convierte una temperatura de Celsius a Fahrenheit usando la fórmula: F = C × 9/5 + 32

<details>
<summary>✅ Solución</summary>

```java
public class ConversorTemperatura {
    public static void main(String[] args) {
        double celsius = 25.0;
        double fahrenheit = celsius * 9.0 / 5.0 + 32.0;
        
        System.out.println(celsius + "°C = " + fahrenheit + "°F");
        
        // Ejemplo: 25.0°C = 77.0°F
    }
}
```
</details>

## 🔗 Temas Relacionados

- [Introducción a Java](./introduccion)
- [Operadores](./operadores)
- [Control de Flujo](./control-flujo)
- [Arrays](../intermedio/arrays)

## 📚 Recursos Adicionales

- [Java Data Types - Oracle](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html)
- [Variables - Oracle](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/variables.html)
