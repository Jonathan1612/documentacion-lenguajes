---
title: "Strings en Java - Manipulación de Texto"
level: basico
category: fundamentos
tags: [string, texto, stringbuilder, stringbuffer, regex]
duration: 25min
prerequisites: [variables, funciones]
---

# Strings en Java

## 📋 ¿Qué es un String?

Un **String** es una secuencia de caracteres. En Java, los Strings son **objetos inmutables** (no se pueden modificar una vez creados).

```java
String saludo = "Hola Mundo";
String nombre = "Java";
```

## 💡 Crear Strings

```java
// Forma 1: Literal (más común y eficiente)
String texto1 = "Hola";

// Forma 2: Con new (menos común)
String texto2 = new String("Hola");

// String vacío
String vacio = "";

// Concatenación
String completo = "Hola" + " " + "Mundo"; // "Hola Mundo"
```

## 🔧 Métodos Principales de String

### Información del String

```java
String texto = "Java Programming";

// Longitud
int longitud = texto.length(); // 16

// Está vacío
boolean vacio = texto.isEmpty(); // false

// Carácter en posición
char letra = texto.charAt(0); // 'J'
char ultima = texto.charAt(texto.length() - 1); // 'g'
```

### Comparación

```java
String a = "Java";
String b = "Java";
String c = "java";

// Comparar (case-sensitive)
boolean igual1 = a.equals(b); // true
boolean igual2 = a.equals(c); // false

// Comparar ignorando mayúsculas
boolean igual3 = a.equalsIgnoreCase(c); // true

// Comparación alfabética
int comparacion = a.compareTo(b); // 0 (iguales)
// < 0 si a < b, > 0 si a > b, 0 si iguales
```

⚠️ **Nunca uses `==` para comparar Strings**:
```java
String s1 = new String("Java");
String s2 = new String("Java");

System.out.println(s1 == s2);        // false (compara referencias)
System.out.println(s1.equals(s2));   // true (compara contenido)
```

### Búsqueda

```java
String texto = "Aprender Java es divertido";

// Contiene
boolean contiene = texto.contains("Java"); // true

// Empieza con
boolean empieza = texto.startsWith("Aprender"); // true

// Termina con
boolean termina = texto.endsWith("divertido"); // true

// Índice de primera aparición
int indice = texto.indexOf("Java"); // 9
int indice2 = texto.indexOf("Python"); // -1 (no encontrado)

// Índice de última aparición
String repetido = "Java Java Java";
int ultimo = repetido.lastIndexOf("Java"); // 10
```

### Extracción

```java
String texto = "Programación";

// Substring desde índice hasta el final
String sub1 = texto.substring(0); // "Programación"
String sub2 = texto.substring(8); // "ación"

// Substring entre índices
String sub3 = texto.substring(0, 7); // "Program" (no incluye índice 7)

// Dividir por separador
String frase = "Java,Python,JavaScript";
String[] lenguajes = frase.split(",");
// ["Java", "Python", "JavaScript"]

for (String lenguaje : lenguajes) {
    System.out.println(lenguaje);
}
```

### Transformación

```java
String texto = "  Java Programming  ";

// Mayúsculas y minúsculas
String mayus = texto.toUpperCase(); // "  JAVA PROGRAMMING  "
String minus = texto.toLowerCase(); // "  java programming  "

// Eliminar espacios al inicio y final
String limpio = texto.trim(); // "Java Programming"

// Reemplazar
String reemplazo = texto.replace("Java", "Python"); // "  Python Programming  "
String reemplazo2 = texto.replaceAll("\\s+", "-"); // "Java-Programming"
```

## 📝 Ejemplos Prácticos

### Ejemplo 1: Validar Email

```java
public class ValidadorEmail {
    public static boolean esEmailValido(String email) {
        if (email == null || email.isEmpty()) {
            return false;
        }
        
        // Verificar que contiene @ y .
        return email.contains("@") && 
               email.contains(".") && 
               email.indexOf("@") < email.lastIndexOf(".");
    }
    
    public static void main(String[] args) {
        System.out.println(esEmailValido("usuario@ejemplo.com")); // true
        System.out.println(esEmailValido("invalido@com"));        // false
        System.out.println(esEmailValido("sin-arroba.com"));      // false
    }
}
```

### Ejemplo 2: Contar Palabras

```java
public class ContadorPalabras {
    public static int contarPalabras(String texto) {
        if (texto == null || texto.trim().isEmpty()) {
            return 0;
        }
        
        String[] palabras = texto.trim().split("\\s+");
        return palabras.length;
    }
    
    public static void main(String[] args) {
        String frase = "Java es un lenguaje de programación";
        System.out.println("Palabras: " + contarPalabras(frase)); // 6
    }
}
```

### Ejemplo 3: Invertir String

```java
public class InvertirString {
    public static String invertir(String texto) {
        StringBuilder sb = new StringBuilder(texto);
        return sb.reverse().toString();
    }
    
    public static void main(String[] args) {
        String original = "Java";
        String invertido = invertir(original);
        System.out.println(invertido); // avaJ
    }
}
```

## 🔄 StringBuilder y StringBuffer

Como los Strings son **inmutables**, concatenar muchos strings es ineficiente. Usa **StringBuilder** para construir strings.

### StringBuilder (más rápido, no thread-safe)

```java
public class StringBuilderExample {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder();
        
        // Agregar
        sb.append("Hola");
        sb.append(" ");
        sb.append("Mundo");
        
        // Insertar en posición
        sb.insert(5, "Hermoso ");
        
        // Eliminar rango
        sb.delete(5, 13); // Elimina "Hermoso "
        
        // Reemplazar rango
        sb.replace(0, 4, "Adiós");
        
        // Convertir a String
        String resultado = sb.toString();
        System.out.println(resultado); // Adiós Mundo
    }
}
```

### ⚡ Por qué StringBuilder es Más Rápido

```java
// ❌ Ineficiente - crea nuevo String en cada iteración
String resultado = "";
for (int i = 0; i < 1000; i++) {
    resultado += "a"; // Crea 1000 objetos String
}

// ✅ Eficiente - modifica el mismo StringBuilder
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    sb.append("a"); // Un solo objeto
}
String resultado = sb.toString();
```

### Comparación

| Característica | String | StringBuilder | StringBuffer |
|----------------|--------|---------------|--------------|
| Mutable | ❌ No | ✅ Sí | ✅ Sí |
| Thread-safe | ✅ Sí | ❌ No | ✅ Sí |
| Rendimiento | Lento (concatenación) | Rápido | Medio |
| Uso | Texto fijo | Construcción de strings | Multi-threading |

## 🎨 Formateo de Strings

### printf y format

```java
public class FormateoStrings {
    public static void main(String[] args) {
        String nombre = "Ana";
        int edad = 25;
        double altura = 1.65;
        
        // printf
        System.out.printf("Nombre: %s, Edad: %d, Altura: %.2f\n", 
                         nombre, edad, altura);
        // Nombre: Ana, Edad: 25, Altura: 1.65
        
        // format (retorna String)
        String info = String.format("%s tiene %d años", nombre, edad);
        System.out.println(info); // Ana tiene 25 años
    }
}
```

### Especificadores de Formato

| Formato | Tipo | Ejemplo |
|---------|------|---------|
| `%s` | String | "texto" |
| `%d` | Entero | 123 |
| `%f` | Float/Double | 3.14 |
| `%.2f` | 2 decimales | 3.14 |
| `%n` | Nueva línea | \n |
| `%x` | Hexadecimal | 1a |

## 🔍 Expresiones Regulares (Regex) Básicas

```java
public class RegexBasico {
    public static void main(String[] args) {
        String texto = "Mi teléfono es 555-1234";
        
        // Verificar patrón
        boolean tieneNumero = texto.matches(".*\\d+.*");
        System.out.println("¿Tiene número? " + tieneNumero); // true
        
        // Reemplazar con patrón
        String sinNumeros = texto.replaceAll("\\d", "*");
        System.out.println(sinNumeros); // Mi teléfono es ***-****
        
        // Validar formato
        String email = "usuario@ejemplo.com";
        boolean emailValido = email.matches("^[\\w.-]+@[\\w.-]+\\.\\w+$");
        System.out.println("Email válido: " + emailValido); // true
    }
}
```

### Patrones Comunes

| Patrón | Significado | Ejemplo |
|--------|-------------|---------|
| `\\d` | Dígito (0-9) | `"a1b".replaceAll("\\d", "")` → "ab" |
| `\\w` | Letra, dígito o _ | matches palabra |
| `\\s` | Espacio en blanco | `"a b".split("\\s")` → ["a", "b"] |
| `.` | Cualquier carácter | matches todo |
| `*` | 0 o más veces | `"aaa".matches("a*")` → true |
| `+` | 1 o más veces | `"aaa".matches("a+")` → true |

## ⚠️ Errores Comunes

### 1. Usar == para comparar

```java
// ❌ Mal
if (nombre == "Java") { }

// ✅ Correcto
if (nombre.equals("Java")) { }
```

### 2. No verificar null

```java
String texto = null;

// ❌ Mal - NullPointerException
if (texto.equals("Hola")) { }

// ✅ Correcto
if (texto != null && texto.equals("Hola")) { }

// ✅ Alternativa (Java 7+)
if ("Hola".equals(texto)) { } // No falla si texto es null
```

### 3. Modificar String pensando que es mutable

```java
String texto = "Hola";
texto.toUpperCase(); // ❌ Esto no modifica texto

// ✅ Correcto
texto = texto.toUpperCase();
System.out.println(texto); // HOLA
```

## 💪 Ejercicios Prácticos

### Ejercicio 1: Palíndromo
**Dificultad**: Fácil

Verifica si un string es palíndromo (se lee igual al revés).

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
        System.out.println(esPalindromo("A man a plan a canal Panama")); // true
    }
}
```
</details>

### Ejercicio 2: Contar Vocales
**Dificultad**: Fácil

Cuenta las vocales en un string.

<details>
<summary>✅ Solución</summary>

```java
public class ContarVocales {
    public static int contarVocales(String texto) {
        int contador = 0;
        texto = texto.toLowerCase();
        
        for (int i = 0; i < texto.length(); i++) {
            char c = texto.charAt(i);
            if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
                contador++;
            }
        }
        return contador;
    }
    
    public static void main(String[] args) {
        System.out.println(contarVocales("Programación")); // 5
        System.out.println(contarVocales("Java"));         // 2
    }
}
```
</details>

### Ejercicio 3: Capitalizar Palabras
**Dificultad**: Medio

Convierte la primera letra de cada palabra en mayúscula.

<details>
<summary>✅ Solución</summary>

```java
public class CapitalizarPalabras {
    public static String capitalizar(String texto) {
        String[] palabras = texto.split(" ");
        StringBuilder resultado = new StringBuilder();
        
        for (String palabra : palabras) {
            if (palabra.length() > 0) {
                resultado.append(Character.toUpperCase(palabra.charAt(0)))
                         .append(palabra.substring(1).toLowerCase())
                         .append(" ");
            }
        }
        
        return resultado.toString().trim();
    }
    
    public static void main(String[] args) {
        System.out.println(capitalizar("hola mundo java")); 
        // Hola Mundo Java
    }
}
```
</details>

## 🎯 Cuándo Usar Cada Uno

| Escenario | Usar |
|-----------|------|
| Texto que no cambia | `String` |
| Construir strings dinámicamente | `StringBuilder` |
| Multi-threading | `StringBuffer` |
| Muchas concatenaciones en loop | `StringBuilder` |

## 🔗 Temas Relacionados

- [Variables](./variables)
- [Arrays](./arrays)
- [Collections](../intermedio/collections)

## 📚 Recursos Adicionales

- [String API Documentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html)
- [StringBuilder vs StringBuffer](https://www.baeldung.com/java-string-builder-string-buffer)
- [Regular Expressions](https://docs.oracle.com/javase/tutorial/essential/regex/)
