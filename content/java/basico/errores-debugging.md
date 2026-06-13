---
title: "Errores y Debugging"
level: basico
category: fundamentos
tags: [java, errores, debugging, stack-trace, exceptions, troubleshooting]
duration: 45min
prerequisites: [introduccion, variables]
---

# Errores y Debugging en Java

## 📋 ¿Por qué es importante?

Aprender a **leer, interpretar y resolver errores** es una de las habilidades más valiosas en programación, pero raramente se enseña de forma estructurada. La mayoría dice "se aprende con experiencia", pero en realidad hay técnicas y patrones concretos que puedes dominar.

> 💡 **Verdad incómoda**: Pasarás más tiempo leyendo mensajes de error que escribiendo código nuevo. Aprende a hacerlo bien.

## 🔑 Tipos de Errores

### 1. Errores de Compilación (Compile-time Errors)

**Cuándo ocurren**: Al compilar el código (antes de ejecutar)  
**Qué significan**: Sintaxis incorrecta o violación de reglas del lenguaje  
**Impacto**: El programa NO puede ejecutarse

```java
// ❌ Error de compilación
public class Ejemplo {
    public static void main(String[] args) {
        int numero = "texto";  // Type mismatch
        System.out.println(numero)
    }  // Missing semicolon
}
```

**Mensaje de error:**
```
Error:(3, 22) java: incompatible types: java.lang.String cannot be converted to int
Error:(4, 38) java: ';' expected
```

### 2. Errores de Ejecución (Runtime Errors)

**Cuándo ocurren**: Durante la ejecución del programa  
**Qué significan**: Operación ilegal o condición inesperada  
**Impacto**: El programa se detiene (crash)

```java
// ❌ Error de ejecución
public class Ejemplo {
    public static void main(String[] args) {
        int[] numeros = {1, 2, 3};
        System.out.println(numeros[10]);  // ArrayIndexOutOfBoundsException
        
        String texto = null;
        System.out.println(texto.length());  // NullPointerException
        
        int resultado = 10 / 0;  // ArithmeticException
    }
}
```

### 3. Errores Lógicos (Logic Errors)

**Cuándo ocurren**: El programa corre pero da resultados incorrectos  
**Qué significan**: La lógica de tu código es incorrecta  
**Impacto**: Resultados erróneos (¡los más peligrosos!)

```java
// ❌ Error lógico (compila y corre, pero está mal)
public class Promedio {
    public static void main(String[] args) {
        int a = 10, b = 20;
        int promedio = a + b / 2;  // Debería ser (a + b) / 2
        System.out.println(promedio);  // Imprime 20, no 15
    }
}
```

## 📖 Cómo Leer un Stack Trace

El **stack trace** es el mensaje detallado que Java muestra cuando ocurre un error. Aprender a leerlo es ESENCIAL.

### Anatomía de un Stack Trace

```java
public class EjemploError {
    public static void main(String[] args) {
        metodoA();
    }
    
    static void metodoA() {
        metodoB();
    }
    
    static void metodoB() {
        metodoC();
    }
    
    static void metodoC() {
        String texto = null;
        System.out.println(texto.length());  // ⚠️ Error aquí
    }
}
```

**Stack Trace resultante:**

```
Exception in thread "main" java.lang.NullPointerException: Cannot invoke "String.length()" because "texto" is null
	at EjemploError.metodoC(EjemploError.java:15)    👈 AQUÍ está el error
	at EjemploError.metodoB(EjemploError.java:11)    👈 metodoB llamó a metodoC
	at EjemploError.metodoA(EjemploError.java:7)     👈 metodoA llamó a metodoB
	at EjemploError.main(EjemploError.java:3)        👈 main llamó a metodoA
```

### Cómo Interpretarlo (de arriba hacia abajo)

| Parte | Significado |
|-------|-------------|
| **Exception in thread "main"** | El error ocurrió en el hilo principal |
| **java.lang.NullPointerException** | Tipo de error |
| **Cannot invoke "String.length()"...** | Descripción específica (Java 14+) |
| **at ... (EjemploError.java:15)** | Archivo y línea EXACTA donde falló |
| **Líneas siguientes** | Secuencia de llamadas (de más reciente a más antigua) |

> 💡 **Regla de oro**: Empieza leyendo desde **la primera línea que menciona TU código**, no librerías de Java.

## 🚨 Errores de Compilación Comunes

### 1. Missing Semicolon

```java
// ❌ Error
int numero = 5
System.out.println(numero);

// Error: ';' expected
```

**Cómo identificarlo**: El mensaje dice `';' expected` y apunta a la línea siguiente  
**Solución**: Agregar `;` al final de la línea anterior

### 2. Type Mismatch

```java
// ❌ Error
int edad = "25";

// Error: incompatible types: String cannot be converted to int
```

**Cómo identificarlo**: Dice `incompatible types` y muestra los dos tipos  
**Solución**: Usar el tipo correcto o convertir con `Integer.parseInt("25")`

### 3. Cannot Find Symbol

```java
// ❌ Error
public class Main {
    public static void main(String[] args) {
        int numero = 10;
        System.out.println(numeros);  // Typo: numeros vs numero
    }
}

// Error: cannot find symbol
//   symbol:   variable numeros
//   location: class Main
```

**Cómo identificarlo**: `cannot find symbol` + nombre del símbolo  
**Causas comunes**:
- Typo en el nombre de variable
- Variable no declarada
- Variable fuera de scope
- Falta import de clase

### 4. Class, Interface, or Enum Expected

```java
// ❌ Error
public static void main(String[] args) {
    System.out.println("Hola");
}

// Error: class, interface, or enum expected
```

**Cómo identificarlo**: Método fuera de una clase  
**Solución**: Envolver en una clase

```java
// ✅ Correcto
public class Main {
    public static void main(String[] args) {
        System.out.println("Hola");
    }
}
```

### 5. Missing Return Statement

```java
// ❌ Error
public int sumar(int a, int b) {
    if (a > 0) {
        return a + b;
    }
    // ⚠️ ¿Qué pasa si a <= 0?
}

// Error: missing return statement
```

**Cómo identificarlo**: Método con tipo de retorno pero no todos los caminos retornan un valor  
**Solución**: Asegurar que TODOS los caminos tengan `return`

## 💥 Errores de Ejecución Comunes

### 1. NullPointerException (NPE)

**El error más común en Java**

```java
// ❌ Error
String nombre = null;
System.out.println(nombre.length());  // NPE

// Stack trace:
// Exception in thread "main" java.lang.NullPointerException: 
// Cannot invoke "String.length()" because "nombre" is null
```

**Cómo identificarlo**:
- Dice `NullPointerException`
- En Java 14+, te dice exactamente qué es null

**Causas comunes**:
1. Variable no inicializada
2. Método retorna null
3. Array con elementos null
4. Objeto no creado con `new`

**Cómo prevenirlo**:
```java
// ✅ Verificar antes de usar
if (nombre != null) {
    System.out.println(nombre.length());
}

// ✅ Usar Optional (Java 8+)
Optional<String> nombreOpt = Optional.ofNullable(nombre);
nombreOpt.ifPresent(n -> System.out.println(n.length()));

// ✅ Valores por defecto
String nombreSeguro = nombre != null ? nombre : "Sin nombre";
```

### 2. ArrayIndexOutOfBoundsException

```java
// ❌ Error
int[] numeros = {10, 20, 30};
System.out.println(numeros[3]);  // Índice 3 no existe (solo 0, 1, 2)

// Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: 
// Index 3 out of bounds for length 3
```

**Cómo identificarlo**: Dice qué índice intentaste acceder y cuál es el tamaño  
**Solución**: Siempre verificar `index < array.length`

```java
// ✅ Correcto
if (index >= 0 && index < numeros.length) {
    System.out.println(numeros[index]);
}
```

### 3. ArithmeticException

```java
// ❌ Error
int resultado = 10 / 0;

// Exception in thread "main" java.lang.ArithmeticException: / by zero
```

**Cómo identificarlo**: División entre cero con enteros  
**Nota**: Con `double`, da `Infinity` en vez de error

```java
// ✅ Verificar antes
if (divisor != 0) {
    int resultado = dividendo / divisor;
}
```

### 4. NumberFormatException

```java
// ❌ Error
String texto = "abc123";
int numero = Integer.parseInt(texto);

// Exception in thread "main" java.lang.NumberFormatException: 
// For input string: "abc123"
```

**Cómo identificarlo**: Al convertir String a número con texto inválido  
**Solución**: Validar o usar try-catch

```java
// ✅ Con validación
try {
    int numero = Integer.parseInt(texto);
} catch (NumberFormatException e) {
    System.out.println("Texto no es un número válido");
}
```

### 5. ClassCastException

```java
// ❌ Error
Object obj = "Hola";
Integer numero = (Integer) obj;  // String no es Integer

// Exception in thread "main" java.lang.ClassCastException: 
// class java.lang.String cannot be cast to class java.lang.Integer
```

**Cómo identificarlo**: Cast inválido entre tipos incompatibles  
**Solución**: Verificar tipo antes de castear

```java
// ✅ Verificar con instanceof
if (obj instanceof Integer) {
    Integer numero = (Integer) obj;
}
```

## 🔍 Técnicas de Debugging

### 1. Print Debugging (Para empezar)

```java
public static int calcularPromedio(int[] numeros) {
    System.out.println("🔍 Entrada: " + Arrays.toString(numeros));
    
    int suma = 0;
    for (int num : numeros) {
        suma += num;
        System.out.println("🔍 suma actual: " + suma);
    }
    
    int promedio = suma / numeros.length;
    System.out.println("🔍 Resultado: " + promedio);
    
    return promedio;
}
```

**Ventajas**: Simple, rápido para problemas pequeños  
**Desventajas**: Contamina el código, tedioso para problemas complejos

### 2. Usar el Debugger (Nivel intermedio)

**Conceptos clave**:
- **Breakpoint**: Punto donde el programa se pausa
- **Step Over (F8)**: Ejecutar línea actual, no entrar en métodos
- **Step Into (F7)**: Entrar en el método llamado
- **Step Out (Shift+F8)**: Salir del método actual
- **Resume (F9)**: Continuar hasta el siguiente breakpoint

```java
public static void main(String[] args) {
    int a = 10;
    int b = 20;
    // 👈 Pon un breakpoint aquí (click en margen izquierdo)
    int resultado = sumar(a, b);
    System.out.println(resultado);
}
```

### 3. Dividir y Conquistar

Si un método largo falla, divídelo en partes más pequeñas:

```java
// ❌ Difícil de debuggear
public void procesarDatos(List<String> datos) {
    // 50 líneas de código complicado
}

// ✅ Fácil de debuggear
public void procesarDatos(List<String> datos) {
    List<String> datosLimpios = limpiarDatos(datos);
    List<Integer> numeros = convertirANumeros(datosLimpios);
    int resultado = calcularResultado(numeros);
    mostrarResultado(resultado);
}
```

### 4. Rubber Duck Debugging 🦆

Explica tu código línea por línea a un patito de goma (o cualquier objeto). Suena tonto, pero funciona:

1. "Este método recibe una lista..."
2. "Primero verifico si está vacía..."
3. "Luego itero sobre... ¡ah! Aquí está el error, no estoy verificando null"

## 📊 Ejercicio Práctico: Detective de Errores

### Ejercicio 1: Encuentra el Bug

```java
public class CalculadoraPromedio {
    public static void main(String[] args) {
        int[] calificaciones = {85, 90, 78, 92, 88};
        double promedio = calcularPromedio(calificaciones);
        System.out.println("Promedio: " + promedio);
    }
    
    static double calcularPromedio(int[] numeros) {
        int suma = 0;
        for (int i = 0; i <= numeros.length; i++) {  // ⚠️ Bug aquí
            suma += numeros[i];
        }
        return suma / numeros.length;
    }
}
```

<details>
<summary>💡 Pista</summary>

Mira la condición del loop: `i <= numeros.length`
</details>

<details>
<summary>✅ Solución</summary>

**Error**: `ArrayIndexOutOfBoundsException`

**Causa**: `i <= numeros.length` debería ser `i < numeros.length`  
Los índices válidos son 0 a `length-1`, no 0 a `length`

**Corrección**:
```java
for (int i = 0; i < numeros.length; i++) {
    suma += numeros[i];
}
```
</details>

### Ejercicio 2: Debug del Stack Trace

```java
public class EjemploError {
    public static void main(String[] args) {
        procesarDatos("123", "456", "abc");
    }
    
    static void procesarDatos(String... valores) {
        for (String valor : valores) {
            int numero = convertirANumero(valor);
            System.out.println("Número: " + numero);
        }
    }
    
    static int convertirANumero(String texto) {
        return Integer.parseInt(texto);
    }
}
```

**Stack Trace que obtienes:**
```
Exception in thread "main" java.lang.NumberFormatException: For input string: "abc"
	at java.base/java.lang.Integer.parseInt(Integer.java:652)
	at EjemploError.convertirANumero(EjemploError.java:13)
	at EjemploError.procesarDatos(EjemploError.java:7)
	at EjemploError.main(EjemploError.java:3)
```

**Preguntas**:
1. ¿En qué línea está el error?
2. ¿Cuál es la causa?
3. ¿Cómo lo solucionarías?

<details>
<summary>✅ Solución</summary>

1. **Línea 13**: `return Integer.parseInt(texto);`
2. **Causa**: El String "abc" no se puede convertir a número
3. **Solución**:
```java
static int convertirANumero(String texto) {
    try {
        return Integer.parseInt(texto);
    } catch (NumberFormatException e) {
        System.err.println("Error: '" + texto + "' no es un número válido");
        return 0;  // O lanzar la excepción
    }
}
```
</details>

### Ejercicio 3: Bug Lógico Sutil

```java
public class ValidadorEdad {
    public static void main(String[] args) {
        System.out.println(esAdulto(17));  // false ✓
        System.out.println(esAdulto(18));  // true ✓
        System.out.println(esAdulto(25));  // false ✗ ¿Qué?
    }
    
    static boolean esAdulto(int edad) {
        if (edad >= 18);  // ⚠️ Bug sutil aquí
            return true;
        return false;
    }
}
```

<details>
<summary>💡 Pista</summary>

Mira con mucho cuidado el punto y coma después del `if`
</details>

<details>
<summary>✅ Solución</summary>

**Error**: El `;` después del `if` hace que el bloque esté vacío

```java
if (edad >= 18);  // Esto no hace nada
    return true;  // Esto SIEMPRE se ejecuta
```

**Corrección**:
```java
static boolean esAdulto(int edad) {
    if (edad >= 18) {  // Sin punto y coma
        return true;
    }
    return false;
}

// Mejor aún:
static boolean esAdulto(int edad) {
    return edad >= 18;
}
```
</details>

## 🛠️ Herramientas y Comandos Útiles

### 1. Compilar desde Terminal

```bash
# Ver errores de compilación detallados
javac -Xlint:all MiClase.java

# Ver warnings adicionales
javac -Xlint:unchecked MiClase.java
```

### 2. Stack Trace Completo

```java
try {
    // Código que puede fallar
} catch (Exception e) {
    e.printStackTrace();  // Imprime stack trace completo
}
```

### 3. Assertions para Testing

```java
public static int dividir(int a, int b) {
    assert b != 0 : "El divisor no puede ser cero";
    return a / b;
}

// Ejecutar con: java -ea MiClase
```

## 📋 Checklist de Debugging

Cuando encuentres un error, sigue estos pasos:

1. ✅ **Lee el mensaje completo** - No te asustes, léelo con calma
2. ✅ **Identifica el tipo** - ¿Compilación, runtime, o lógico?
3. ✅ **Localiza la línea exacta** - Primera mención de tu código en el stack trace
4. ✅ **Entiende la causa** - ¿Por qué está fallando?
5. ✅ **Reproduce el error** - Asegúrate de poder hacer que falle de nuevo
6. ✅ **Forma una hipótesis** - "Creo que el problema es..."
7. ✅ **Prueba la solución** - Haz un cambio y verifica
8. ✅ **Aprende del error** - Documenta qué aprendiste

## 🎯 Errores por Categoría

### Errores con Strings

```java
// ❌ Comparar con ==
String a = "hola";
String b = new String("hola");
if (a == b) { }  // false (compara referencias)

// ✅ Usar .equals()
if (a.equals(b)) { }  // true (compara contenido)
```

### Errores con Arrays

```java
// ❌ Olvidar inicializar
int[] numeros;
numeros[0] = 10;  // NullPointerException

// ✅ Inicializar primero
int[] numeros = new int[5];
numeros[0] = 10;
```

### Errores con Loops

```java
// ❌ Off-by-one error
for (int i = 1; i <= array.length; i++) {
    System.out.println(array[i]);  // Empieza en 1, debería ser 0
}

// ✅ Correcto
for (int i = 0; i < array.length; i++) {
    System.out.println(array[i]);
}
```

## 💡 Mensajes de Error y Qué Significan

| Error | Significado | Solución |
|-------|-------------|----------|
| `cannot find symbol` | Variable/método no existe | Verificar nombre, scope, imports |
| `incompatible types` | Tipos no coinciden | Convertir o usar tipo correcto |
| `';' expected` | Falta punto y coma | Agregar `;` |
| `class, interface, or enum expected` | Código fuera de clase | Envolver en clase |
| `unreachable statement` | Código después de return | Eliminar o reestructurar |
| `variable might not have been initialized` | Variable no inicializada | Inicializar antes de usar |

## 🔗 Temas Relacionados

- [Excepciones](./excepciones)
- [Try-Catch](./excepciones)
- [Testing y JUnit](../avanzado/testing)

## 📚 Recursos Adicionales

- [Java Exception Hierarchy](https://docs.oracle.com/javase/8/docs/api/java/lang/Exception.html)
- [IntelliJ Debugger Guide](https://www.jetbrains.com/help/idea/debugging-code.html)
- [Common Java Errors](https://docs.oracle.com/javase/tutorial/getStarted/problems/index.html)

---

> 💪 **Recuerda**: Los mejores programadores no son los que no cometen errores, son los que saben encontrarlos y resolverlos rápidamente.
