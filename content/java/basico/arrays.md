---
title: "Arrays en Java"
level: basico
category: estructuras-datos
tags: [arrays, arreglos, matrices, vectores]
duration: 20min
prerequisites: [variables, control-flujo]
---

# Arrays en Java

## 📋 ¿Qué son los Arrays?

Un **array** (arreglo) es una estructura de datos que almacena múltiples elementos del mismo tipo en una secuencia ordenada. Cada elemento tiene un **índice** (posición) que empieza en **0**.

## 🎯 ¿Para qué sirven?

- Almacenar **colecciones de datos** relacionados
- Acceso **rápido** por índice: O(1)
- **Tamaño fijo** definido al crear el array
- Iterar sobre múltiples valores

## 💡 Sintaxis Básica

### Declarar e Inicializar

```java
// Forma 1: Declarar y definir tamaño
int[] numeros = new int[5]; // Array de 5 enteros (inicializados en 0)

// Forma 2: Declarar e inicializar con valores
int[] numeros = {10, 20, 30, 40, 50};

// Forma 3: Declaración en dos pasos
String[] frutas;
frutas = new String[]{"Manzana", "Banana", "Naranja"};
```

### Acceder a Elementos

```java
public class AccesoArray {
    public static void main(String[] args) {
        String[] colores = {"Rojo", "Verde", "Azul"};
        
        // Acceder por índice (empieza en 0)
        System.out.println(colores[0]); // Rojo
        System.out.println(colores[1]); // Verde
        System.out.println(colores[2]); // Azul
        
        // Modificar elemento
        colores[1] = "Amarillo";
        System.out.println(colores[1]); // Amarillo
        
        // Longitud del array
        System.out.println("Tamaño: " + colores.length); // 3
    }
}
```

## 📝 Ejemplos Prácticos

### Ejemplo 1: Recorrer un Array

```java
public class RecorrerArray {
    public static void main(String[] args) {
        int[] numeros = {5, 10, 15, 20, 25};
        
        // Forma 1: For tradicional
        for (int i = 0; i < numeros.length; i++) {
            System.out.println("Índice " + i + ": " + numeros[i]);
        }
        
        // Forma 2: For-each (más simple)
        for (int numero : numeros) {
            System.out.println("Número: " + numero);
        }
    }
}
```

### Ejemplo 2: Calcular Promedio

```java
public class Promedio {
    public static void main(String[] args) {
        int[] notas = {85, 90, 78, 92, 88};
        
        int suma = 0;
        for (int nota : notas) {
            suma += nota;
        }
        
        double promedio = (double) suma / notas.length;
        System.out.println("Promedio: " + promedio); // 86.6
    }
}
```

### Ejemplo 3: Buscar Elemento

```java
public class BuscarElemento {
    public static void main(String[] args) {
        String[] nombres = {"Ana", "Carlos", "María", "Pedro"};
        String buscar = "María";
        
        boolean encontrado = false;
        int posicion = -1;
        
        for (int i = 0; i < nombres.length; i++) {
            if (nombres[i].equals(buscar)) {
                encontrado = true;
                posicion = i;
                break;
            }
        }
        
        if (encontrado) {
            System.out.println(buscar + " encontrado en posición " + posicion);
        } else {
            System.out.println(buscar + " no encontrado");
        }
    }
}
```

### Ejemplo 4: Encontrar Máximo y Mínimo

```java
public class MaxMin {
    public static void main(String[] args) {
        int[] numeros = {45, 12, 89, 23, 67, 5, 91};
        
        int maximo = numeros[0];
        int minimo = numeros[0];
        
        for (int numero : numeros) {
            if (numero > maximo) {
                maximo = numero;
            }
            if (numero < minimo) {
                minimo = numero;
            }
        }
        
        System.out.println("Máximo: " + maximo); // 91
        System.out.println("Mínimo: " + minimo); // 5
    }
}
```

## 🔄 Arrays Multidimensionales

### Matrices (Arrays 2D)

```java
public class Matrices {
    public static void main(String[] args) {
        // Declarar matriz 3x3
        int[][] matriz = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        // Acceder a elementos
        System.out.println(matriz[0][0]); // 1
        System.out.println(matriz[1][2]); // 6
        
        // Recorrer matriz
        for (int i = 0; i < matriz.length; i++) {           // Filas
            for (int j = 0; j < matriz[i].length; j++) {     // Columnas
                System.out.print(matriz[i][j] + " ");
            }
            System.out.println();
        }
    }
}
```

**Salida**:
```
1 2 3 
4 5 6 
7 8 9 
```

### Ejemplo: Suma de Matriz

```java
public class SumaMatriz {
    public static void main(String[] args) {
        int[][] matriz = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        int suma = 0;
        for (int[] fila : matriz) {
            for (int valor : fila) {
                suma += valor;
            }
        }
        
        System.out.println("Suma total: " + suma); // 45
    }
}
```

## 🛠️ Métodos de la Clase Arrays

La clase `java.util.Arrays` proporciona métodos útiles:

```java
import java.util.Arrays;

public class MetodosArrays {
    public static void main(String[] args) {
        int[] numeros = {5, 2, 8, 1, 9};
        
        // 1. Ordenar
        Arrays.sort(numeros);
        System.out.println(Arrays.toString(numeros)); // [1, 2, 5, 8, 9]
        
        // 2. Buscar (el array DEBE estar ordenado)
        int indice = Arrays.binarySearch(numeros, 5);
        System.out.println("5 está en índice: " + indice); // 2
        
        // 3. Llenar array con un valor
        int[] zeros = new int[5];
        Arrays.fill(zeros, 100);
        System.out.println(Arrays.toString(zeros)); // [100, 100, 100, 100, 100]
        
        // 4. Comparar arrays
        int[] arr1 = {1, 2, 3};
        int[] arr2 = {1, 2, 3};
        boolean iguales = Arrays.equals(arr1, arr2);
        System.out.println("¿Iguales? " + iguales); // true
        
        // 5. Copiar array
        int[] copia = Arrays.copyOf(numeros, numeros.length);
        
        // 6. Convertir a String
        System.out.println(Arrays.toString(numeros));
    }
}
```

## ⚙️ Funcionamiento Interno

```java
/*
 * Un array en Java es:
 * - Un objeto almacenado en el HEAP
 * - Tamaño fijo definido en tiempo de creación
 * - Elementos contiguos en memoria
 * 
 * int[] arr = new int[5];
 * 
 * Memoria:
 * [índice 0][índice 1][índice 2][índice 3][índice 4]
 *    0         0         0         0         0
 * 
 * Acceso por índice es O(1) porque:
 * dirección_elemento = dirección_base + (índice * tamaño_tipo)
 */
```

## ⚠️ Errores Comunes

### 1. ArrayIndexOutOfBoundsException

```java
int[] numeros = {10, 20, 30};

// ❌ Error - índice 3 no existe (solo 0, 1, 2)
System.out.println(numeros[3]); // Exception!

// ✅ Correcto
if (3 < numeros.length) {
    System.out.println(numeros[3]);
} else {
    System.out.println("Índice fuera de rango");
}
```

### 2. Confundir length() con length

```java
String texto = "Hola";
int[] numeros = {1, 2, 3};

// ✅ String usa length()
System.out.println(texto.length()); // Método

// ✅ Array usa length
System.out.println(numeros.length); // Propiedad (sin paréntesis)
```

### 3. No inicializar antes de usar

```java
// ❌ Mal
int[] numeros;
numeros[0] = 10; // Error: array no inicializado

// ✅ Correcto
int[] numeros = new int[5];
numeros[0] = 10;
```

## 💪 Ejercicios Prácticos

### Ejercicio 1: Invertir Array
**Dificultad**: Fácil

Invierte el orden de los elementos de un array.

<details>
<summary>💡 Pista</summary>
Intercambia elementos desde los extremos hacia el centro
</details>

<details>
<summary>✅ Solución</summary>

```java
public class InvertirArray {
    public static void invertir(int[] arr) {
        int inicio = 0;
        int fin = arr.length - 1;
        
        while (inicio < fin) {
            // Intercambiar
            int temp = arr[inicio];
            arr[inicio] = arr[fin];
            arr[fin] = temp;
            
            inicio++;
            fin--;
        }
    }
    
    public static void main(String[] args) {
        int[] numeros = {1, 2, 3, 4, 5};
        System.out.println("Original: " + Arrays.toString(numeros));
        
        invertir(numeros);
        System.out.println("Invertido: " + Arrays.toString(numeros));
        // Invertido: [5, 4, 3, 2, 1]
    }
}
```
</details>

### Ejercicio 2: Rotar Array
**Dificultad**: Medio

Rota un array k posiciones a la derecha.

<details>
<summary>✅ Solución</summary>

```java
import java.util.Arrays;

public class RotarArray {
    public static void rotar(int[] arr, int k) {
        int n = arr.length;
        k = k % n; // Por si k > longitud
        
        // Invertir todo
        invertir(arr, 0, n - 1);
        // Invertir primeros k
        invertir(arr, 0, k - 1);
        // Invertir resto
        invertir(arr, k, n - 1);
    }
    
    private static void invertir(int[] arr, int inicio, int fin) {
        while (inicio < fin) {
            int temp = arr[inicio];
            arr[inicio] = arr[fin];
            arr[fin] = temp;
            inicio++;
            fin--;
        }
    }
    
    public static void main(String[] args) {
        int[] numeros = {1, 2, 3, 4, 5};
        rotar(numeros, 2);
        System.out.println(Arrays.toString(numeros)); // [4, 5, 1, 2, 3]
    }
}
```
</details>

### Ejercicio 3: Eliminar Duplicados
**Dificultad**: Medio

Elimina elementos duplicados de un array ordenado.

<details>
<summary>✅ Solución</summary>

```java
import java.util.Arrays;

public class EliminarDuplicados {
    public static int[] eliminarDuplicados(int[] arr) {
        if (arr.length == 0) return arr;
        
        int j = 0; // Índice para elementos únicos
        
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] != arr[j]) {
                j++;
                arr[j] = arr[i];
            }
        }
        
        return Arrays.copyOf(arr, j + 1);
    }
    
    public static void main(String[] args) {
        int[] numeros = {1, 1, 2, 2, 3, 4, 4, 5};
        int[] unicos = eliminarDuplicados(numeros);
        System.out.println(Arrays.toString(unicos)); // [1, 2, 3, 4, 5]
    }
}
```
</details>

## 🎯 Arrays vs ArrayList

| Característica | Array | ArrayList |
|----------------|-------|-----------|
| Tamaño | Fijo | Dinámico |
| Tipo | Primitivos y objetos | Solo objetos (usa wrappers) |
| Sintaxis | `int[]` | `ArrayList<Integer>` |
| Rendimiento | Más rápido | Ligeramente más lento |
| Métodos | Limitados | Muchos métodos útiles |

**Cuándo usar cada uno:**
- **Array**: Tamaño conocido, necesitas máximo rendimiento, trabajas con primitivos
- **ArrayList**: Tamaño variable, necesitas métodos como add/remove, flexibilidad

## 🔗 Temas Relacionados

- [Collections](../intermedio/collections)
- [Funciones](./funciones)
- [Control de Flujo](./control-flujo)

## 📚 Recursos Adicionales

- [Arrays Tutorial - Oracle](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html)
- [Arrays Class Documentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Arrays.html)
