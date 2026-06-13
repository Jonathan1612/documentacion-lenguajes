---
title: "Funciones y Métodos en Java"
level: basico
category: fundamentos
tags: [funciones, metodos, parametros, return, sobrecarga, java]
duration: 30min
prerequisites: [variables, control-flujo]
---

# Funciones y Métodos en Java

## 📋 ¿Qué son los Métodos?

Un **método** (o función) es un bloque de código reutilizable que realiza una tarea específica. Los métodos nos permiten:
- **Reutilizar código** sin repetirlo
- **Organizar** el programa en partes lógicas
- **Facilitar el mantenimiento** y testing
- **Abstraer** complejidad

## 🔑 Anatomía de un Método

```java
modificadorAcceso tipoRetorno nombreMetodo(parametros) {
    // Cuerpo del método
    return valor; // si tipoRetorno no es void
}
```

### Componentes:

1. **Modificador de acceso**: `public`, `private`, `protected`
2. **Tipo de retorno**: `int`, `String`, `void` (no retorna nada)
3. **Nombre del método**: debe seguir camelCase
4. **Parámetros**: datos que recibe el método
5. **Cuerpo**: código que se ejecuta
6. **return**: devuelve un valor (si no es `void`)

## 💡 Sintaxis Básica

### Método sin parámetros ni retorno

```java
public class MetodosBasicos {
    // Método simple
    public static void saludar() {
        System.out.println("¡Hola!");
    }
    
    public static void main(String[] args) {
        saludar(); // Llamada al método
        saludar(); // Se puede llamar múltiples veces
    }
}
```

### Método con parámetros

```java
public class MetodosConParametros {
    public static void saludarPersona(String nombre) {
        System.out.println("¡Hola, " + nombre + "!");
    }
    
    public static void main(String[] args) {
        saludarPersona("Ana");    // ¡Hola, Ana!
        saludarPersona("Carlos"); // ¡Hola, Carlos!
    }
}
```

### Método con retorno

```java
public class MetodosConRetorno {
    public static int sumar(int a, int b) {
        return a + b;
    }
    
    public static void main(String[] args) {
        int resultado = sumar(5, 3);
        System.out.println("5 + 3 = " + resultado); // 8
        
        // Uso directo
        System.out.println("10 + 20 = " + sumar(10, 20)); // 30
    }
}
```

## 📝 Ejemplos Prácticos

### Ejemplo 1: Calculadora Básica

```java
public class Calculadora {
    public static double sumar(double a, double b) {
        return a + b;
    }
    
    public static double restar(double a, double b) {
        return a - b;
    }
    
    public static double multiplicar(double a, double b) {
        return a * b;
    }
    
    public static double dividir(double a, double b) {
        if (b == 0) {
            System.out.println("Error: División por cero");
            return 0;
        }
        return a / b;
    }
    
    public static void main(String[] args) {
        System.out.println("5 + 3 = " + sumar(5, 3));
        System.out.println("5 - 3 = " + restar(5, 3));
        System.out.println("5 × 3 = " + multiplicar(5, 3));
        System.out.println("6 ÷ 2 = " + dividir(6, 2));
    }
}
```

### Ejemplo 2: Validaciones

```java
public class Validaciones {
    public static boolean esPar(int numero) {
        return numero % 2 == 0;
    }
    
    public static boolean esMayorDeEdad(int edad) {
        return edad >= 18;
    }
    
    public static boolean esEmailValido(String email) {
        return email.contains("@") && email.contains(".");
    }
    
    public static void main(String[] args) {
        System.out.println("¿8 es par? " + esPar(8));           // true
        System.out.println("¿25 es par? " + esPar(25));         // false
        System.out.println("¿17 es mayor de edad? " + esMayorDeEdad(17)); // false
        System.out.println("¿Email válido? " + esEmailValido("user@example.com")); // true
    }
}
```

### Ejemplo 3: Procesamiento de Strings

```java
public class StringUtils {
    public static String invertir(String texto) {
        StringBuilder resultado = new StringBuilder(texto);
        return resultado.reverse().toString();
    }
    
    public static int contarVocales(String texto) {
        int contador = 0;
        texto = texto.toLowerCase();
        
        for (char c : texto.toCharArray()) {
            if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
                contador++;
            }
        }
        return contador;
    }
    
    public static String primeraLetraMayuscula(String texto) {
        if (texto == null || texto.isEmpty()) {
            return texto;
        }
        return texto.substring(0, 1).toUpperCase() + texto.substring(1).toLowerCase();
    }
    
    public static void main(String[] args) {
        String palabra = "Java";
        
        System.out.println("Original: " + palabra);
        System.out.println("Invertido: " + invertir(palabra));
        System.out.println("Vocales: " + contarVocales(palabra));
        System.out.println("Capitalizado: " + primeraLetraMayuscula("hola"));
    }
}
```

## 🔄 Sobrecarga de Métodos (Method Overloading)

Java permite múltiples métodos con el mismo nombre pero **diferentes parámetros**.

```java
public class SobrecargaMetodos {
    // Diferentes cantidades de parámetros
    public static int sumar(int a, int b) {
        return a + b;
    }
    
    public static int sumar(int a, int b, int c) {
        return a + b + c;
    }
    
    // Diferentes tipos de parámetros
    public static double sumar(double a, double b) {
        return a + b;
    }
    
    // Método de utilidad que imprime diferentes tipos
    public static void imprimir(int valor) {
        System.out.println("Entero: " + valor);
    }
    
    public static void imprimir(String valor) {
        System.out.println("String: " + valor);
    }
    
    public static void imprimir(boolean valor) {
        System.out.println("Boolean: " + valor);
    }
    
    public static void main(String[] args) {
        System.out.println(sumar(5, 3));           // 8
        System.out.println(sumar(5, 3, 2));        // 10
        System.out.println(sumar(5.5, 3.2));       // 8.7
        
        imprimir(42);           // Entero: 42
        imprimir("Hola");       // String: Hola
        imprimir(true);         // Boolean: true
    }
}
```

## 📦 Métodos con Arrays

```java
public class MetodosArrays {
    public static double calcularPromedio(int[] numeros) {
        int suma = 0;
        for (int num : numeros) {
            suma += num;
        }
        return (double) suma / numeros.length;
    }
    
    public static int encontrarMaximo(int[] numeros) {
        int max = numeros[0];
        for (int num : numeros) {
            if (num > max) {
                max = num;
            }
        }
        return max;
    }
    
    public static int[] duplicarValores(int[] numeros) {
        int[] resultado = new int[numeros.length];
        for (int i = 0; i < numeros.length; i++) {
            resultado[i] = numeros[i] * 2;
        }
        return resultado;
    }
    
    public static void imprimirArray(int[] array) {
        System.out.print("[");
        for (int i = 0; i < array.length; i++) {
            System.out.print(array[i]);
            if (i < array.length - 1) {
                System.out.print(", ");
            }
        }
        System.out.println("]");
    }
    
    public static void main(String[] args) {
        int[] numeros = {5, 12, 8, 21, 3};
        
        System.out.println("Array original:");
        imprimirArray(numeros);
        
        System.out.println("Promedio: " + calcularPromedio(numeros));
        System.out.println("Máximo: " + encontrarMaximo(numeros));
        
        int[] duplicados = duplicarValores(numeros);
        System.out.println("Duplicados:");
        imprimirArray(duplicados);
    }
}
```

## 🎯 Varargs (Parámetros Variables)

Permite pasar un número variable de argumentos.

```java
public class VarargsExample {
    // ... indica varargs
    public static int sumar(int... numeros) {
        int suma = 0;
        for (int num : numeros) {
            suma += num;
        }
        return suma;
    }
    
    public static String concatenar(String separador, String... palabras) {
        if (palabras.length == 0) return "";
        
        StringBuilder resultado = new StringBuilder(palabras[0]);
        for (int i = 1; i < palabras.length; i++) {
            resultado.append(separador).append(palabras[i]);
        }
        return resultado.toString();
    }
    
    public static void main(String[] args) {
        System.out.println(sumar(1, 2, 3));                  // 6
        System.out.println(sumar(5, 10, 15, 20));            // 50
        System.out.println(sumar(2));                        // 2
        
        System.out.println(concatenar(" ", "Hola", "Mundo")); // Hola Mundo
        System.out.println(concatenar("-", "A", "B", "C"));   // A-B-C
    }
}
```

## 🔧 Recursividad

Un método que se llama a sí mismo.

```java
public class Recursividad {
    // Factorial: 5! = 5 × 4 × 3 × 2 × 1
    public static long factorial(int n) {
        if (n <= 1) {
            return 1; // Caso base
        }
        return n * factorial(n - 1); // Llamada recursiva
    }
    
    // Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13...
    public static int fibonacci(int n) {
        if (n <= 1) {
            return n;
        }
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    // Suma de dígitos: 123 → 1 + 2 + 3 = 6
    public static int sumaDigitos(int numero) {
        if (numero == 0) {
            return 0;
        }
        return numero % 10 + sumaDigitos(numero / 10);
    }
    
    public static void main(String[] args) {
        System.out.println("5! = " + factorial(5));        // 120
        System.out.println("Fibonacci(7) = " + fibonacci(7)); // 13
        System.out.println("Suma dígitos de 123 = " + sumaDigitos(123)); // 6
    }
}
```

## ⚠️ Errores Comunes

### 1. Olvidar return

```java
// ❌ Mal - no retorna valor
public static int sumar(int a, int b) {
    int suma = a + b;
    // Falta return
}

// ✅ Correcto
public static int sumar(int a, int b) {
    return a + b;
}
```

### 2. Modificar parámetros primitivos

```java
public class ModificarParametros {
    public static void incrementar(int x) {
        x = x + 1; // Solo modifica la copia local
    }
    
    public static void main(String[] args) {
        int numero = 5;
        incrementar(numero);
        System.out.println(numero); // Sigue siendo 5
    }
}
```

### 3. Recursión infinita

```java
// ❌ Mal - no tiene caso base
public static int factorial(int n) {
    return n * factorial(n - 1); // Stack Overflow
}

// ✅ Correcto
public static int factorial(int n) {
    if (n <= 1) return 1; // Caso base
    return n * factorial(n - 1);
}
```

## 💪 Ejercicios Prácticos

### Ejercicio 1: Calculadora de IMC
**Dificultad**: Fácil

Crea un método que calcule el Índice de Masa Corporal: IMC = peso / (altura²)

<details>
<summary>✅ Solución</summary>

```java
public class CalculadoraIMC {
    public static double calcularIMC(double peso, double altura) {
        return peso / (altura * altura);
    }
    
    public static String clasificarIMC(double imc) {
        if (imc < 18.5) return "Bajo peso";
        if (imc < 25) return "Normal";
        if (imc < 30) return "Sobrepeso";
        return "Obesidad";
    }
    
    public static void main(String[] args) {
        double peso = 70;  // kg
        double altura = 1.75; // metros
        
        double imc = calcularIMC(peso, altura);
        System.out.println("IMC: " + String.format("%.2f", imc));
        System.out.println("Clasificación: " + clasificarIMC(imc));
    }
}
```
</details>

### Ejercicio 2: Palíndromo
**Dificultad**: Medio

Verifica si una palabra es un palíndromo (se lee igual al revés).

<details>
<summary>💡 Pista</summary>
Compara el string original con su versión invertida
</details>

<details>
<summary>✅ Solución</summary>

```java
public class Palindromo {
    public static boolean esPalindromo(String texto) {
        texto = texto.toLowerCase().replaceAll("\\s+", "");
        String invertido = new StringBuilder(texto).reverse().toString();
        return texto.equals(invertido);
    }
    
    public static void main(String[] args) {
        System.out.println(esPalindromo("anita lava la tina")); // true
        System.out.println(esPalindromo("hola"));                // false
        System.out.println(esPalindromo("radar"));               // true
    }
}
```
</details>

### Ejercicio 3: Número Perfecto
**Dificultad**: Medio

Un número perfecto es igual a la suma de sus divisores propios. Ej: 6 = 1 + 2 + 3

<details>
<summary>✅ Solución</summary>

```java
public class NumeroPerfecto {
    public static boolean esPerfecto(int numero) {
        int suma = 0;
        for (int i = 1; i < numero; i++) {
            if (numero % i == 0) {
                suma += i;
            }
        }
        return suma == numero;
    }
    
    public static void main(String[] args) {
        System.out.println("6 es perfecto: " + esPerfecto(6));   // true
        System.out.println("28 es perfecto: " + esPerfecto(28)); // true
        System.out.println("10 es perfecto: " + esPerfecto(10)); // false
    }
}
```
</details>

## 🎯 Buenas Prácticas

✅ **Hacer**:
- Nombres descriptivos: `calcularPromedio()`, no `cp()`
- Un método, una responsabilidad
- Mantener métodos cortos (< 20 líneas idealmente)
- Documentar con comentarios lo que hace

❌ **Evitar**:
- Métodos muy largos
- Nombres genéricos: `hacer()`, `procesar()`
- Demasiados parámetros (> 5)
- Modificar variables globales

## 🔗 Temas Relacionados

- [Control de Flujo](./control-flujo)
- [Arrays](../intermedio/arrays)
- [POO - Métodos de Instancia](../intermedio/poo)

## 📚 Recursos Adicionales

- [Methods - Oracle](https://docs.oracle.com/javase/tutorial/java/javaOO/methods.html)
- [Method Overloading](https://docs.oracle.com/javase/tutorial/java/javaOO/methods.html)
