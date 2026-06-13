---
title: "Manejo de Excepciones"
level: basico
category: control-errores
tags: [excepciones, try-catch, throw, throws, finally]
duration: 25min
prerequisites: [poo-clases, funciones]
---

# Manejo de Excepciones en Java

## 📋 ¿Qué es una Excepción?

Una **excepción** es un evento que interrumpe el flujo normal de ejecución del programa. Java usa excepciones para manejar errores de forma estructurada.

```java
public class Main {
    public static void main(String[] args) {
        int[] numeros = {1, 2, 3};
        
        // ❌ Sin manejo - programa se detiene
        // System.out.println(numeros[10]); // ArrayIndexOutOfBoundsException
        
        // ✅ Con manejo - programa continúa
        try {
            System.out.println(numeros[10]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("❌ Índice fuera de rango");
        }
        
        System.out.println("Programa continúa...");
    }
}
```

## 💡 Sintaxis Básica: try-catch

```java
try {
    // Código que puede lanzar excepción
    int resultado = 10 / 0;
} catch (ArithmeticException e) {
    // Código que maneja la excepción
    System.out.println("Error: " + e.getMessage());
}
```

### Múltiples Bloques catch

```java
public class Main {
    public static void main(String[] args) {
        try {
            String texto = null;
            System.out.println(texto.length()); // NullPointerException
            
            int resultado = 10 / 0; // ArithmeticException
            
        } catch (NullPointerException e) {
            System.out.println("❌ Referencia nula");
        } catch (ArithmeticException e) {
            System.out.println("❌ División por cero");
        } catch (Exception e) {
            System.out.println("❌ Error general: " + e.getMessage());
        }
    }
}
```

### Multi-catch (Java 7+)

```java
try {
    // código
} catch (NullPointerException | ArithmeticException e) {
    System.out.println("Error de operación: " + e.getMessage());
}
```

## 🔧 Bloque finally

Se ejecuta **siempre**, haya o no excepción.

```java
public class Main {
    public static void main(String[] args) {
        try {
            System.out.println("En try");
            int resultado = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("En catch");
        } finally {
            System.out.println("En finally - SIEMPRE se ejecuta");
        }
    }
}
```

**Salida**:
```
En try
En catch
En finally - SIEMPRE se ejecuta
```

### Uso Común: Cerrar Recursos

```java
import java.io.*;

public class Main {
    public static void main(String[] args) {
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new FileReader("archivo.txt"));
            String linea = reader.readLine();
            System.out.println(linea);
        } catch (IOException e) {
            System.out.println("Error leyendo archivo");
        } finally {
            // Cerrar recurso - se ejecuta siempre
            try {
                if (reader != null) {
                    reader.close();
                }
            } catch (IOException e) {
                System.out.println("Error cerrando archivo");
            }
        }
    }
}
```

## 📊 Jerarquía de Excepciones

```
Throwable
├── Error (errores graves del sistema - NO capturar)
│   ├── OutOfMemoryError
│   └── StackOverflowError
└── Exception
    ├── RuntimeException (unchecked - no obligatorio capturar)
    │   ├── NullPointerException
    │   ├── ArrayIndexOutOfBoundsException
    │   ├── ArithmeticException
    │   └── IllegalArgumentException
    └── IOException (checked - obligatorio capturar)
        ├── FileNotFoundException
        └── SQLException
```

### Excepciones Checked vs Unchecked

| Tipo | Checked | Unchecked (Runtime) |
|------|---------|---------------------|
| Hereda de | `Exception` | `RuntimeException` |
| Manejo | Obligatorio | Opcional |
| Momento | Problemas externos | Errores de programación |
| Ejemplos | `IOException`, `SQLException` | `NullPointerException`, `ArrayIndexOutOfBoundsException` |

```java
// Checked - DEBES manejar o declarar
public void leerArchivo() throws IOException { // Declarar con throws
    FileReader fr = new FileReader("archivo.txt");
}

// O capturar
public void leerArchivo2() {
    try {
        FileReader fr = new FileReader("archivo.txt");
    } catch (FileNotFoundException e) {
        e.printStackTrace();
    }
}

// Unchecked - opcional manejar
public void dividir(int a, int b) {
    int resultado = a / b; // Puede lanzar ArithmeticException, pero no es obligatorio capturar
}
```

## 🎯 Lanzar Excepciones: throw

```java
public class Validador {
    public static void validarEdad(int edad) {
        if (edad < 0) {
            throw new IllegalArgumentException("Edad no puede ser negativa");
        }
        if (edad < 18) {
            throw new IllegalArgumentException("Debe ser mayor de edad");
        }
        System.out.println("Edad válida: " + edad);
    }
    
    public static void main(String[] args) {
        try {
            validarEdad(15);
        } catch (IllegalArgumentException e) {
            System.out.println("❌ " + e.getMessage());
        }
    }
}
```

### Declarar Excepciones: throws

```java
public class Archivo {
    // Método declara que puede lanzar IOException
    public static String leerPrimeraLinea(String ruta) throws IOException {
        BufferedReader reader = new BufferedReader(new FileReader(ruta));
        return reader.readLine();
    }
    
    public static void main(String[] args) {
        try {
            String linea = leerPrimeraLinea("datos.txt");
            System.out.println(linea);
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

## 📝 Información de la Excepción

```java
try {
    int[] arr = new int[5];
    arr[10] = 100;
} catch (ArrayIndexOutOfBoundsException e) {
    // Mensaje descriptivo
    System.out.println("Mensaje: " + e.getMessage());
    
    // Tipo de excepción
    System.out.println("Tipo: " + e.getClass().getName());
    
    // Stack trace (traza de llamadas)
    e.printStackTrace();
    
    // Causa (si existe)
    if (e.getCause() != null) {
        System.out.println("Causa: " + e.getCause());
    }
}
```

## 💪 Ejemplos Prácticos

### Ejemplo 1: Validar Entrada del Usuario

```java
import java.util.Scanner;

public class CalculadoraSegura {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        while (true) {
            try {
                System.out.print("Ingrese primer número: ");
                int num1 = Integer.parseInt(scanner.nextLine());
                
                System.out.print("Ingrese segundo número: ");
                int num2 = Integer.parseInt(scanner.nextLine());
                
                System.out.println("Resultado: " + (num1 / num2));
                break; // Salir si todo va bien
                
            } catch (NumberFormatException e) {
                System.out.println("❌ Debe ingresar un número válido");
            } catch (ArithmeticException e) {
                System.out.println("❌ No se puede dividir por cero");
            }
        }
        
        scanner.close();
    }
}
```

### Ejemplo 2: Método con Manejo de Errores

```java
public class ConversorTemperatura {
    public static double celsiusAFahrenheit(double celsius) {
        if (celsius < -273.15) {
            throw new IllegalArgumentException(
                "Temperatura no puede estar por debajo del cero absoluto (-273.15°C)"
            );
        }
        return (celsius * 9/5) + 32;
    }
    
    public static void main(String[] args) {
        double[] temperaturas = {0, 100, -300, 37};
        
        for (double temp : temperaturas) {
            try {
                double fahrenheit = celsiusAFahrenheit(temp);
                System.out.printf("%.1f°C = %.1f°F%n", temp, fahrenheit);
            } catch (IllegalArgumentException e) {
                System.out.println("❌ " + temp + "°C: " + e.getMessage());
            }
        }
    }
}
```

**Salida**:
```
0.0°C = 32.0°F
100.0°C = 212.0°F
❌ -300.0°C: Temperatura no puede estar por debajo del cero absoluto (-273.15°C)
37.0°C = 98.6°F
```

### Ejemplo 3: Try-Catch en Métodos

```java
public class CuentaBancaria {
    private double saldo;
    
    public CuentaBancaria(double saldoInicial) {
        this.saldo = saldoInicial;
    }
    
    public void retirar(double cantidad) throws IllegalArgumentException {
        if (cantidad <= 0) {
            throw new IllegalArgumentException("Cantidad debe ser positiva");
        }
        if (cantidad > saldo) {
            throw new IllegalArgumentException("Fondos insuficientes");
        }
        saldo -= cantidad;
        System.out.println("✓ Retiro exitoso. Nuevo saldo: $" + saldo);
    }
    
    public static void main(String[] args) {
        CuentaBancaria cuenta = new CuentaBancaria(1000);
        
        try {
            cuenta.retirar(200);    // ✓ OK
            cuenta.retirar(-50);    // ❌ Error
        } catch (IllegalArgumentException e) {
            System.out.println("❌ " + e.getMessage());
        }
        
        try {
            cuenta.retirar(2000);   // ❌ Error
        } catch (IllegalArgumentException e) {
            System.out.println("❌ " + e.getMessage());
        }
    }
}
```

## 🚀 Excepciones Comunes

| Excepción | Causa | Solución |
|-----------|-------|----------|
| `NullPointerException` | Usar objeto null | Verificar `if (obj != null)` |
| `ArrayIndexOutOfBoundsException` | Índice inválido | Verificar tamaño del array |
| `ArithmeticException` | División por cero | Verificar divisor != 0 |
| `NumberFormatException` | Convertir string inválido a número | Validar formato |
| `IllegalArgumentException` | Argumento inválido | Validar parámetros |
| `FileNotFoundException` | Archivo no existe | Verificar ruta |

## ⚠️ Errores Comunes

### 1. Capturar Exception muy general primero

```java
// ❌ Mal - Exception general va primero (nunca se alcanzan las específicas)
try {
    // código
} catch (Exception e) {           // Captura TODO
    // ...
} catch (NullPointerException e) { // NUNCA se alcanza
    // ...
}

// ✅ Correcto - de específico a general
try {
    // código
} catch (NullPointerException e) {
    // ...
} catch (ArithmeticException e) {
    // ...
} catch (Exception e) {           // Captura lo que no se capturó antes
    // ...
}
```

### 2. Ignorar Excepciones

```java
// ❌ Muy mal - tragar la excepción
try {
    // código riesgoso
} catch (Exception e) {
    // No hacer nada
}

// ✅ Correcto - al menos registrar
try {
    // código riesgoso
} catch (Exception e) {
    System.err.println("Error: " + e.getMessage());
    e.printStackTrace();
}
```

### 3. Uso innecesario de try-catch

```java
// ❌ Innecesario
try {
    int x = 5;
    int y = 10;
    int z = x + y;
} catch (Exception e) {
    // Esta operación NUNCA puede lanzar excepción
}

// ✅ Correcto
int x = 5;
int y = 10;
int z = x + y;
```

## 💪 Ejercicios Prácticos

### Ejercicio 1: Calculadora Segura
**Dificultad**: Fácil

Crea una calculadora que maneje división por cero.

<details>
<summary>✅ Solución</summary>

```java
public class Calculadora {
    public static double dividir(double a, double b) {
        if (b == 0) {
            throw new ArithmeticException("No se puede dividir por cero");
        }
        return a / b;
    }
    
    public static void main(String[] args) {
        double[][] casos = {{10, 2}, {15, 0}, {20, 4}};
        
        for (double[] caso : casos) {
            try {
                double resultado = dividir(caso[0], caso[1]);
                System.out.printf("%.1f / %.1f = %.2f%n", caso[0], caso[1], resultado);
            } catch (ArithmeticException e) {
                System.out.printf("%.1f / %.1f → Error: %s%n", caso[0], caso[1], e.getMessage());
            }
        }
    }
}
```
</details>

### Ejercicio 2: Validar Email
**Dificultad**: Medio

Crea método que valide email y lance excepción si es inválido.

<details>
<summary>✅ Solución</summary>

```java
public class ValidadorEmail {
    public static void validarEmail(String email) throws IllegalArgumentException {
        if (email == null || email.isEmpty()) {
            throw new IllegalArgumentException("Email no puede estar vacío");
        }
        if (!email.contains("@")) {
            throw new IllegalArgumentException("Email debe contener @");
        }
        if (!email.contains(".")) {
            throw new IllegalArgumentException("Email debe contener dominio");
        }
        if (email.indexOf("@") > email.lastIndexOf(".")) {
            throw new IllegalArgumentException("Formato de email inválido");
        }
        System.out.println("✓ Email válido: " + email);
    }
    
    public static void main(String[] args) {
        String[] emails = {
            "usuario@ejemplo.com",
            "invalido.com",
            "sin@punto",
            "@ejemplo.com",
            ""
        };
        
        for (String email : emails) {
            try {
                validarEmail(email);
            } catch (IllegalArgumentException e) {
                System.out.println("❌ \"" + email + "\": " + e.getMessage());
            }
        }
    }
}
```
</details>

## 🎯 Buenas Prácticas

✅ **Hacer**:
- Capturar excepciones específicas
- Liberar recursos en `finally`
- Proporcionar mensajes descriptivos
- Registrar excepciones (logging)

❌ **Evitar**:
- Capturar `Exception` genérico (excepto al final)
- Ignorar excepciones (catch vacío)
- Usar excepciones para control de flujo normal
- Lanzar `Exception` genérico

## 🔗 Temas Relacionados

- [POO - Clases](./poo-clases)
- [Funciones](./funciones)
- [Entrada/Salida](./entrada-salida)

## 📚 Recursos Adicionales

- [Exceptions - Oracle](https://docs.oracle.com/javase/tutorial/essential/exceptions/)
- [Exception Handling Best Practices](https://www.baeldung.com/java-exceptions)
