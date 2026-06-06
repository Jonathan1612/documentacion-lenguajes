---
title: "Introducción a Java"
level: basico
category: fundamentos
tags: [java, introduccion, jdk, jvm, basico]
duration: 10min
prerequisites: []
---

# Introducción a Java

## 📋 ¿Qué es Java?

Java es un lenguaje de programación orientado a objetos, de propósito general, diseñado para ser **portable**, **seguro** y **robusto**. Creado por Sun Microsystems en 1995 (ahora propiedad de Oracle), es uno de los lenguajes más populares del mundo.

## 🎯 ¿Para qué sirve?

- **Aplicaciones empresariales**: Sistemas bancarios, e-commerce
- **Aplicaciones Android**: Apps móviles nativas
- **Aplicaciones web**: Con frameworks como Spring Boot
- **Big Data**: Herramientas como Hadoop, Apache Spark
- **Sistemas distribuidos**: Microservicios escalables

## 🔑 Conceptos Clave

- **JDK (Java Development Kit)**: Kit de desarrollo con compilador y herramientas
- **JRE (Java Runtime Environment)**: Entorno de ejecución para programas Java
- **JVM (Java Virtual Machine)**: Máquina virtual que ejecuta bytecode Java
- **Write Once, Run Anywhere**: Código compilado funciona en cualquier plataforma

## 💡 Tu Primer Programa en Java

### HolaMundo.java

```java
public class HolaMundo {
    public static void main(String[] args) {
        System.out.println("¡Hola Mundo!");
    }
}
```

**Explicación línea por línea**:
1. `public class HolaMundo`: Define una clase pública llamada HolaMundo
2. `public static void main(String[] args)`: Método principal, punto de entrada del programa
3. `System.out.println()`: Imprime texto en consola
4. El nombre del archivo debe coincidir con el nombre de la clase: `HolaMundo.java`

## 🚀 Compilar y Ejecutar

```bash
# Compilar el código fuente
javac HolaMundo.java

# Ejecutar el programa
java HolaMundo
```

**Salida esperada**:
```
¡Hola Mundo!
```

## 📝 Estructura de un Programa Java

```java
// 1. Importaciones (opcional)
import java.util.Scanner;

// 2. Declaración de la clase
public class MiPrograma {
    
    // 3. Variables de clase (opcional)
    private static int contador = 0;
    
    // 4. Método main (obligatorio)
    public static void main(String[] args) {
        // Tu código aquí
        System.out.println("Mi programa");
    }
    
    // 5. Otros métodos (opcional)
    public static void otroMetodo() {
        // Código adicional
    }
}
```

## ⚠️ Errores Comunes

1. **El nombre del archivo no coincide con la clase**
   - ❌ `programa.java` con `public class HolaMundo`
   - ✅ `HolaMundo.java` con `public class HolaMundo`

2. **Olvidar el punto y coma**
   ```java
   System.out.println("Hola")  // ❌ Error de compilación
   System.out.println("Hola"); // ✅ Correcto
   ```

3. **Errores de mayúsculas/minúsculas**
   - Java es case-sensitive: `String` ≠ `string`

## 💪 Ejercicios Prácticos

### Ejercicio 1: Modifica el Hola Mundo
**Dificultad**: Fácil

Crea un programa que imprima tu nombre y tu lenguaje favorito en dos líneas separadas.

<details>
<summary>💡 Pista</summary>
Usa `System.out.println()` dos veces, una por cada línea.
</details>

<details>
<summary>✅ Solución</summary>

```java
public class MiPresentacion {
    public static void main(String[] args) {
        System.out.println("Mi nombre es Juan");
        System.out.println("Mi lenguaje favorito es Java");
    }
}
```
</details>

### Ejercicio 2: Suma de Números
**Dificultad**: Fácil

Crea un programa que sume dos números y muestre el resultado.

<details>
<summary>✅ Solución</summary>

```java
public class Suma {
    public static void main(String[] args) {
        int numero1 = 10;
        int numero2 = 20;
        int resultado = numero1 + numero2;
        
        System.out.println("La suma es: " + resultado);
    }
}
```
</details>

## 🔗 Temas Relacionados

- [Variables y Tipos de Datos](./variables)
- [Operadores](./operadores)
- [Control de Flujo](./control-flujo)

## 📚 Recursos Adicionales

- [Documentación oficial de Java](https://docs.oracle.com/en/java/)
- [Java Tutorial de Oracle](https://docs.oracle.com/javase/tutorial/)
