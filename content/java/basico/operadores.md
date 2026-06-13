---
title: "Operadores en Java"
level: basico
category: fundamentos
tags: [operadores, aritmeticos, logicos, comparacion, java]
duration: 20min
prerequisites: [variables]
---

# Operadores en Java

## 📋 ¿Qué son los Operadores?

Los **operadores** son símbolos especiales que le indican al compilador que realice operaciones específicas sobre uno o más operandos. Java proporciona una amplia variedad de operadores para realizar diferentes tipos de operaciones.

## 🔑 Tipos de Operadores

### 1️⃣ Operadores Aritméticos

Realizan operaciones matemáticas básicas.

| Operador | Descripción | Ejemplo | Resultado |
|----------|-------------|---------|-----------|
| `+` | Suma | `5 + 3` | `8` |
| `-` | Resta | `5 - 3` | `2` |
| `*` | Multiplicación | `5 * 3` | `15` |
| `/` | División | `10 / 2` | `5` |
| `%` | Módulo (resto) | `10 % 3` | `1` |
| `++` | Incremento | `x++` | `x = x + 1` |
| `--` | Decremento | `x--` | `x = x - 1` |

```java
public class OperadoresAritmeticos {
    public static void main(String[] args) {
        int a = 10;
        int b = 3;
        
        System.out.println("Suma: " + (a + b));           // 13
        System.out.println("Resta: " + (a - b));          // 7
        System.out.println("Multiplicación: " + (a * b)); // 30
        System.out.println("División: " + (a / b));       // 3 (división entera)
        System.out.println("Módulo: " + (a % b));         // 1
        
        // Incremento y decremento
        int x = 5;
        System.out.println("x++: " + (x++)); // Imprime 5, luego x = 6
        System.out.println("x: " + x);       // 6
        
        int y = 5;
        System.out.println("++y: " + (++y)); // Primero y = 6, luego imprime 6
    }
}
```

**⚠️ Importante**: La división entre enteros trunca el resultado: `10 / 3 = 3` (no 3.33)

### 2️⃣ Operadores de Comparación

Comparan dos valores y devuelven un `boolean`.

| Operador | Descripción | Ejemplo | Resultado |
|----------|-------------|---------|-----------|
| `==` | Igual a | `5 == 5` | `true` |
| `!=` | Diferente de | `5 != 3` | `true` |
| `>` | Mayor que | `5 > 3` | `true` |
| `<` | Menor que | `5 < 3` | `false` |
| `>=` | Mayor o igual | `5 >= 5` | `true` |
| `<=` | Menor o igual | `3 <= 5` | `true` |

```java
public class OperadoresComparacion {
    public static void main(String[] args) {
        int edad = 18;
        int edadMinima = 18;
        
        boolean esMayorDeEdad = edad >= edadMinima;
        System.out.println("¿Es mayor de edad? " + esMayorDeEdad); // true
        
        String nombre1 = "Ana";
        String nombre2 = "Pedro";
        boolean sonIguales = nombre1.equals(nombre2); // ¡No uses == para Strings!
        System.out.println("¿Son iguales? " + sonIguales); // false
    }
}
```

### 3️⃣ Operadores Lógicos

Realizan operaciones lógicas con valores booleanos.

| Operador | Descripción | Ejemplo | Resultado |
|----------|-------------|---------|-----------|
| `&&` | AND (Y) | `true && false` | `false` |
| `\|\|` | OR (O) | `true \|\| false` | `true` |
| `!` | NOT (Negación) | `!true` | `false` |

```java
public class OperadoresLogicos {
    public static void main(String[] args) {
        int edad = 20;
        boolean tieneLicencia = true;
        boolean tieneExperiencia = false;
        
        // AND: Ambas condiciones deben ser verdaderas
        boolean puedeConducir = edad >= 18 && tieneLicencia;
        System.out.println("¿Puede conducir? " + puedeConducir); // true
        
        // OR: Al menos una condición debe ser verdadera
        boolean puedeTrabajar = edad >= 18 || tieneExperiencia;
        System.out.println("¿Puede trabajar? " + puedeTrabajar); // true
        
        // NOT: Invierte el valor booleano
        boolean esNovato = !tieneExperiencia;
        System.out.println("¿Es novato? " + esNovato); // true
    }
}
```

**🎯 Evaluación en Cortocircuito**:
- En `a && b`, si `a` es `false`, no evalúa `b`
- En `a || b`, si `a` es `true`, no evalúa `b`

### 4️⃣ Operadores de Asignación

Asignan valores a variables.

| Operador | Equivalente | Ejemplo | Resultado |
|----------|-------------|---------|-----------|
| `=` | Asignación simple | `x = 5` | `x = 5` |
| `+=` | Suma y asigna | `x += 3` | `x = x + 3` |
| `-=` | Resta y asigna | `x -= 3` | `x = x - 3` |
| `*=` | Multiplica y asigna | `x *= 3` | `x = x * 3` |
| `/=` | Divide y asigna | `x /= 3` | `x = x / 3` |
| `%=` | Módulo y asigna | `x %= 3` | `x = x % 3` |

```java
public class OperadoresAsignacion {
    public static void main(String[] args) {
        int puntos = 10;
        
        puntos += 5;  // puntos = puntos + 5  → 15
        System.out.println("Puntos: " + puntos);
        
        puntos *= 2;  // puntos = puntos * 2  → 30
        System.out.println("Puntos: " + puntos);
        
        puntos /= 3;  // puntos = puntos / 3  → 10
        System.out.println("Puntos: " + puntos);
    }
}
```

### 5️⃣ Operador Ternario

Operador condicional compacto: `condición ? valorSiTrue : valorSiFalse`

```java
public class OperadorTernario {
    public static void main(String[] args) {
        int edad = 17;
        
        // Forma tradicional con if-else
        String mensaje;
        if (edad >= 18) {
            mensaje = "Mayor de edad";
        } else {
            mensaje = "Menor de edad";
        }
        
        // Con operador ternario (más compacto)
        String mensajeTernario = (edad >= 18) ? "Mayor de edad" : "Menor de edad";
        System.out.println(mensajeTernario); // "Menor de edad"
        
        // Útil para valores inline
        int precio = 100;
        int descuento = (precio > 50) ? 10 : 0;
        System.out.println("Descuento: " + descuento + "%"); // 10%
    }
}
```

### 6️⃣ Operadores Bit a Bit

Realizan operaciones a nivel de bits (avanzado).

| Operador | Descripción | Ejemplo |
|----------|-------------|---------|
| `&` | AND bit a bit | `5 & 3 = 1` |
| `\|` | OR bit a bit | `5 \| 3 = 7` |
| `^` | XOR bit a bit | `5 ^ 3 = 6` |
| `~` | Complemento | `~5 = -6` |
| `<<` | Desplazamiento izq. | `5 << 1 = 10` |
| `>>` | Desplazamiento der. | `5 >> 1 = 2` |

```java
public class OperadoresBit {
    public static void main(String[] args) {
        int a = 5;  // 0101 en binario
        int b = 3;  // 0011 en binario
        
        System.out.println("a & b: " + (a & b));   // 0001 = 1
        System.out.println("a | b: " + (a | b));   // 0111 = 7
        System.out.println("a ^ b: " + (a ^ b));   // 0110 = 6
        System.out.println("a << 1: " + (a << 1)); // 1010 = 10 (multiplicar por 2)
        System.out.println("a >> 1: " + (a >> 1)); // 0010 = 2 (dividir por 2)
    }
}
```

## 📊 Precedencia de Operadores

El orden en que se evalúan los operadores (de mayor a menor prioridad):

1. `()` - Paréntesis
2. `++`, `--`, `!`, `~` - Unarios
3. `*`, `/`, `%` - Multiplicativos
4. `+`, `-` - Aditivos
5. `<<`, `>>`, `>>>` - Desplazamiento
6. `<`, `<=`, `>`, `>=` - Relacionales
7. `==`, `!=` - Igualdad
8. `&`, `^`, `|` - Bit a bit
9. `&&` - AND lógico
10. `||` - OR lógico
11. `?:` - Ternario
12. `=`, `+=`, `-=`, etc. - Asignación

```java
int resultado = 10 + 5 * 2;  // 20 (no 30) porque * tiene mayor prioridad
int resultado2 = (10 + 5) * 2;  // 30 (paréntesis cambian la precedencia)
```

## ⚠️ Errores Comunes

### 1. Confundir `=` con `==`

```java
int x = 5;
if (x = 10) { }  // ❌ Error: asignación, no comparación
if (x == 10) { } // ✅ Correcto: comparación
```

### 2. División entera

```java
int resultado = 5 / 2;      // 2 (no 2.5)
double resultado = 5.0 / 2; // 2.5 ✅
```

### 3. Comparar Strings con `==`

```java
String a = new String("Hola");
String b = new String("Hola");
if (a == b) { }        // ❌ Compara referencias
if (a.equals(b)) { }   // ✅ Compara contenido
```

### 4. Pre-incremento vs Post-incremento

```java
int x = 5;
int y = x++;  // y = 5, x = 6 (primero asigna, luego incrementa)

int a = 5;
int b = ++a;  // b = 6, a = 6 (primero incrementa, luego asigna)
```

## 💪 Ejercicios Prácticos

### Ejercicio 1: Calculadora Básica
**Dificultad**: Fácil

Crea un programa que calcule el área y perímetro de un rectángulo.

<details>
<summary>💡 Pista</summary>
Área = base × altura, Perímetro = 2 × (base + altura)
</details>

<details>
<summary>✅ Solución</summary>

```java
public class Rectangulo {
    public static void main(String[] args) {
        double base = 5.0;
        double altura = 3.0;
        
        double area = base * altura;
        double perimetro = 2 * (base + altura);
        
        System.out.println("Área: " + area);           // 15.0
        System.out.println("Perímetro: " + perimetro); // 16.0
    }
}
```
</details>

### Ejercicio 2: Par o Impar
**Dificultad**: Fácil

Determina si un número es par o impar usando el operador módulo.

<details>
<summary>✅ Solución</summary>

```java
public class ParImpar {
    public static void main(String[] args) {
        int numero = 7;
        
        String resultado = (numero % 2 == 0) ? "Par" : "Impar";
        System.out.println("El número " + numero + " es " + resultado);
    }
}
```
</details>

### Ejercicio 3: Descuento en Compra
**Dificultad**: Medio

Un cliente recibe 15% de descuento si compra más de $100, o 10% si compra más de $50.

<details>
<summary>✅ Solución</summary>

```java
public class CalcularDescuento {
    public static void main(String[] args) {
        double precioTotal = 120.0;
        double descuento;
        
        if (precioTotal > 100) {
            descuento = 0.15;
        } else if (precioTotal > 50) {
            descuento = 0.10;
        } else {
            descuento = 0;
        }
        
        double precioFinal = precioTotal - (precioTotal * descuento);
        
        System.out.println("Precio original: $" + precioTotal);
        System.out.println("Descuento: " + (descuento * 100) + "%");
        System.out.println("Precio final: $" + precioFinal);
    }
}
```
</details>

### Ejercicio 4: Intercambiar Variables
**Dificultad**: Medio

Intercambia los valores de dos variables sin usar una tercera variable.

<details>
<summary>💡 Pista</summary>
Usa operadores aritméticos para intercambiar valores
</details>

<details>
<summary>✅ Solución</summary>

```java
public class IntercambiarValores {
    public static void main(String[] args) {
        int a = 10;
        int b = 20;
        
        System.out.println("Antes: a = " + a + ", b = " + b);
        
        // Método 1: Con operadores aritméticos
        a = a + b;  // a = 30
        b = a - b;  // b = 10
        a = a - b;  // a = 20
        
        System.out.println("Después: a = " + a + ", b = " + b);
        
        // Método 2: Con XOR (más eficiente)
        int x = 5;
        int y = 8;
        x = x ^ y;
        y = x ^ y;
        x = x ^ y;
        System.out.println("x = " + x + ", y = " + y); // x = 8, y = 5
    }
}
```
</details>

## 🔗 Temas Relacionados

- [Variables y Tipos de Datos](./variables)
- [Control de Flujo](./control-flujo)
- [Funciones](./funciones)

## 📚 Recursos Adicionales

- [Java Operators - Oracle](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/operators.html)
- [Operator Precedence - Oracle](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/expressions.html)
