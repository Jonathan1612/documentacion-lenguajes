---
title: "Control de Flujo en Java"
level: basico
category: fundamentos
tags: [if, else, switch, for, while, loops, condicionales]
duration: 25min
prerequisites: [variables, operadores]
---

# Control de Flujo en Java

## 📋 ¿Qué es el Control de Flujo?

El **control de flujo** permite alterar el orden en que se ejecutan las instrucciones de un programa. En lugar de ejecutar código línea por línea, podemos tomar decisiones (`if`), repetir acciones (`for`, `while`) o elegir entre múltiples opciones (`switch`).

## 🔀 Estructuras Condicionales

### 1️⃣ if - else

Ejecuta código basándose en una condición booleana.

```java
// Sintaxis básica
if (condición) {
    // Código si la condición es verdadera
}

// Con else
if (condición) {
    // Código si es true
} else {
    // Código si es false
}

// if-else if-else (múltiples condiciones)
if (condición1) {
    // Código si condición1 es true
} else if (condición2) {
    // Código si condición2 es true
} else {
    // Código si ninguna es true
}
```

### 📝 Ejemplo: Sistema de Calificaciones

```java
public class Calificaciones {
    public static void main(String[] args) {
        int nota = 85;
        
        if (nota >= 90) {
            System.out.println("Calificación: A - Excelente");
        } else if (nota >= 80) {
            System.out.println("Calificación: B - Muy bien");
        } else if (nota >= 70) {
            System.out.println("Calificación: C - Bien");
        } else if (nota >= 60) {
            System.out.println("Calificación: D - Suficiente");
        } else {
            System.out.println("Calificación: F - Reprobado");
        }
    }
}
```

### 📝 Ejemplo: Verificar Edad

```java
public class VerificarEdad {
    public static void main(String[] args) {
        int edad = 17;
        boolean tieneLicencia = false;
        
        // Condiciones anidadas
        if (edad >= 18) {
            if (tieneLicencia) {
                System.out.println("Puede conducir");
            } else {
                System.out.println("Es mayor pero necesita licencia");
            }
        } else {
            System.out.println("Es menor de edad");
        }
        
        // Mejor: usar operadores lógicos
        if (edad >= 18 && tieneLicencia) {
            System.out.println("Puede conducir");
        } else {
            System.out.println("No puede conducir");
        }
    }
}
```

### 2️⃣ switch

Evalúa una expresión y ejecuta el caso que coincida.

```java
// Sintaxis
switch (expresión) {
    case valor1:
        // Código
        break;
    case valor2:
        // Código
        break;
    default:
        // Código si ningún caso coincide
}
```

### 📝 Ejemplo: Días de la Semana

```java
public class DiasSemana {
    public static void main(String[] args) {
        int dia = 3;
        String nombreDia;
        
        switch (dia) {
            case 1:
                nombreDia = "Lunes";
                break;
            case 2:
                nombreDia = "Martes";
                break;
            case 3:
                nombreDia = "Miércoles";
                break;
            case 4:
                nombreDia = "Jueves";
                break;
            case 5:
                nombreDia = "Viernes";
                break;
            case 6:
                nombreDia = "Sábado";
                break;
            case 7:
                nombreDia = "Domingo";
                break;
            default:
                nombreDia = "Día inválido";
        }
        
        System.out.println("Día: " + nombreDia);
    }
}
```

### 🆕 Switch Expressions (Java 14+)

Sintaxis más moderna y concisa:

```java
public class SwitchModerno {
    public static void main(String[] args) {
        int mes = 4;
        
        // Switch tradicional
        String estacion1;
        switch (mes) {
            case 12, 1, 2:
                estacion1 = "Invierno";
                break;
            case 3, 4, 5:
                estacion1 = "Primavera";
                break;
            case 6, 7, 8:
                estacion1 = "Verano";
                break;
            case 9, 10, 11:
                estacion1 = "Otoño";
                break;
            default:
                estacion1 = "Mes inválido";
        }
        
        // Switch expression (más limpio)
        String estacion2 = switch (mes) {
            case 12, 1, 2 -> "Invierno";
            case 3, 4, 5 -> "Primavera";
            case 6, 7, 8 -> "Verano";
            case 9, 10, 11 -> "Otoño";
            default -> "Mes inválido";
        };
        
        System.out.println("Estación: " + estacion2);
    }
}
```

## 🔄 Bucles (Loops)

### 1️⃣ for

Repite código un número específico de veces.

```java
// Sintaxis
for (inicialización; condición; incremento) {
    // Código a repetir
}
```

### 📝 Ejemplo: Contar del 1 al 10

```java
public class BucleFor {
    public static void main(String[] args) {
        // Contar del 1 al 10
        for (int i = 1; i <= 10; i++) {
            System.out.println("Número: " + i);
        }
        
        // Contar de 10 a 1 (descendente)
        for (int i = 10; i >= 1; i--) {
            System.out.println("Cuenta regresiva: " + i);
        }
        
        // De 2 en 2
        for (int i = 0; i <= 20; i += 2) {
            System.out.println("Par: " + i);
        }
        
        // Tabla de multiplicar
        int numero = 5;
        for (int i = 1; i <= 10; i++) {
            System.out.println(numero + " x " + i + " = " + (numero * i));
        }
    }
}
```

### 📝 Ejemplo: Recorrer Arrays

```java
public class RecorrerArray {
    public static void main(String[] args) {
        String[] frutas = {"Manzana", "Banana", "Naranja", "Pera"};
        
        // Forma tradicional
        for (int i = 0; i < frutas.length; i++) {
            System.out.println((i + 1) + ". " + frutas[i]);
        }
        
        // For-each (más limpio)
        for (String fruta : frutas) {
            System.out.println("Fruta: " + fruta);
        }
    }
}
```

### 2️⃣ while

Repite mientras la condición sea verdadera (evalúa antes de ejecutar).

```java
// Sintaxis
while (condición) {
    // Código a repetir
}
```

### 📝 Ejemplo: Validar Entrada

```java
import java.util.Scanner;

public class BucleWhile {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // Validar entrada hasta que sea correcta
        int numero = 0;
        while (numero < 1 || numero > 10) {
            System.out.print("Ingresa un número entre 1 y 10: ");
            numero = scanner.nextInt();
            
            if (numero < 1 || numero > 10) {
                System.out.println("Número inválido. Intenta de nuevo.");
            }
        }
        
        System.out.println("Número válido: " + numero);
        
        // Contador simple
        int contador = 1;
        while (contador <= 5) {
            System.out.println("Iteración: " + contador);
            contador++;
        }
    }
}
```

### 3️⃣ do-while

Ejecuta al menos una vez, luego evalúa la condición.

```java
// Sintaxis
do {
    // Código a repetir
} while (condición);
```

### 📝 Ejemplo: Menú de Opciones

```java
import java.util.Scanner;

public class MenuOpciones {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int opcion;
        
        do {
            System.out.println("\n=== MENÚ ===");
            System.out.println("1. Ver perfil");
            System.out.println("2. Configuración");
            System.out.println("3. Ayuda");
            System.out.println("0. Salir");
            System.out.print("Elige una opción: ");
            opcion = scanner.nextInt();
            
            switch (opcion) {
                case 1:
                    System.out.println("→ Mostrando perfil...");
                    break;
                case 2:
                    System.out.println("→ Abriendo configuración...");
                    break;
                case 3:
                    System.out.println("→ Mostrando ayuda...");
                    break;
                case 0:
                    System.out.println("→ Saliendo...");
                    break;
                default:
                    System.out.println("→ Opción inválida");
            }
        } while (opcion != 0);
    }
}
```

## 🛑 Control de Bucles

### `break`

Sale completamente del bucle.

```java
public class BreakExample {
    public static void main(String[] args) {
        // Buscar un número
        int[] numeros = {5, 12, 8, 21, 3, 15};
        int buscar = 21;
        
        for (int i = 0; i < numeros.length; i++) {
            if (numeros[i] == buscar) {
                System.out.println("¡Encontrado en posición " + i + "!");
                break; // Sale del bucle
            }
        }
    }
}
```

### `continue`

Salta a la siguiente iteración.

```java
public class ContinueExample {
    public static void main(String[] args) {
        // Imprimir solo números pares
        for (int i = 1; i <= 10; i++) {
            if (i % 2 != 0) {
                continue; // Salta números impares
            }
            System.out.println("Par: " + i);
        }
        
        // Resultado: 2, 4, 6, 8, 10
    }
}
```

### Labels (Etiquetas)

Controlan bucles anidados.

```java
public class LabelsExample {
    public static void main(String[] args) {
        externo:
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 3; j++) {
                if (i == 2 && j == 2) {
                    break externo; // Sale de ambos bucles
                }
                System.out.println("i=" + i + ", j=" + j);
            }
        }
    }
}
```

## ⚠️ Errores Comunes

### 1. Bucle Infinito

```java
// ❌ Mal - bucle infinito
int i = 0;
while (i < 10) {
    System.out.println(i);
    // Falta i++
}

// ✅ Correcto
int i = 0;
while (i < 10) {
    System.out.println(i);
    i++;
}
```

### 2. Off-by-One Error

```java
int[] array = {1, 2, 3, 4, 5};

// ❌ Mal - ArrayIndexOutOfBoundsException
for (int i = 0; i <= array.length; i++) { // <= es incorrecto
    System.out.println(array[i]);
}

// ✅ Correcto
for (int i = 0; i < array.length; i++) { // < es correcto
    System.out.println(array[i]);
}
```

### 3. Olvidar break en switch

```java
int dia = 1;

// ❌ Mal - fall-through no intencional
switch (dia) {
    case 1:
        System.out.println("Lunes");
        // Falta break - ejecutará también case 2
    case 2:
        System.out.println("Martes");
        break;
}

// ✅ Correcto
switch (dia) {
    case 1:
        System.out.println("Lunes");
        break;
    case 2:
        System.out.println("Martes");
        break;
}
```

## 💪 Ejercicios Prácticos

### Ejercicio 1: FizzBuzz
**Dificultad**: Fácil

Imprime números del 1 al 100, pero:
- Si es múltiplo de 3, imprime "Fizz"
- Si es múltiplo de 5, imprime "Buzz"
- Si es múltiplo de ambos, imprime "FizzBuzz"

<details>
<summary>✅ Solución</summary>

```java
public class FizzBuzz {
    public static void main(String[] args) {
        for (int i = 1; i <= 100; i++) {
            if (i % 3 == 0 && i % 5 == 0) {
                System.out.println("FizzBuzz");
            } else if (i % 3 == 0) {
                System.out.println("Fizz");
            } else if (i % 5 == 0) {
                System.out.println("Buzz");
            } else {
                System.out.println(i);
            }
        }
    }
}
```
</details>

### Ejercicio 2: Número Primo
**Dificultad**: Medio

Determina si un número es primo.

<details>
<summary>💡 Pista</summary>
Un número es primo si solo es divisible por 1 y por sí mismo
</details>

<details>
<summary>✅ Solución</summary>

```java
public class NumeroPrimo {
    public static void main(String[] args) {
        int numero = 17;
        boolean esPrimo = true;
        
        if (numero <= 1) {
            esPrimo = false;
        } else {
            for (int i = 2; i <= Math.sqrt(numero); i++) {
                if (numero % i == 0) {
                    esPrimo = false;
                    break;
                }
            }
        }
        
        if (esPrimo) {
            System.out.println(numero + " es primo");
        } else {
            System.out.println(numero + " no es primo");
        }
    }
}
```
</details>

### Ejercicio 3: Factorial
**Dificultad**: Medio

Calcula el factorial de un número (5! = 5×4×3×2×1 = 120)

<details>
<summary>✅ Solución</summary>

```java
public class Factorial {
    public static void main(String[] args) {
        int numero = 5;
        long factorial = 1;
        
        for (int i = 1; i <= numero; i++) {
            factorial *= i;
        }
        
        System.out.println(numero + "! = " + factorial); // 120
    }
}
```
</details>

### Ejercicio 4: Pirámide de Números
**Dificultad**: Medio

Imprime una pirámide de números:
```
1
22
333
4444
55555
```

<details>
<summary>✅ Solución</summary>

```java
public class Piramide {
    public static void main(String[] args) {
        int filas = 5;
        
        for (int i = 1; i <= filas; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(i);
            }
            System.out.println();
        }
    }
}
```
</details>

## 🎯 ¿Cuándo Usar Cada Uno?

| Estructura | Cuándo Usarla |
|------------|---------------|
| **if-else** | Decisiones basadas en condiciones |
| **switch** | Múltiples valores posibles de una variable |
| **for** | Conoces cuántas iteraciones necesitas |
| **while** | No sabes cuántas iteraciones (depende de condición) |
| **do-while** | Al menos una ejecución garantizada |

## 🔗 Temas Relacionados

- [Operadores](./operadores)
- [Funciones](./funciones)
- [Arrays](../intermedio/arrays)

## 📚 Recursos Adicionales

- [Control Flow Statements - Oracle](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/flow.html)
- [Switch Expressions - Java 14](https://openjdk.org/jeps/361)
