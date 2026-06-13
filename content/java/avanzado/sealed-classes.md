---
title: "Sealed Classes - Jerarquías Controladas"
level: avanzado
category: modern-java
tags: [java, sealed-classes, java17, inheritance, pattern-matching]
duration: 30min
prerequisites: [poo-clases, herencia, interfaces, records]
---

# Sealed Classes (Java 17+)

## 📋 ¿Qué son las Sealed Classes?

Las **sealed classes** (clases selladas) permiten controlar exactamente qué clases pueden extender o implementar una clase/interfaz. Introducidas en Java 17, restringen explícitamente la jerarquía de herencia.

> 💡 **En esencia**: Control total sobre quién puede heredar de tu clase

## 🎯 ¿Para qué sirven?

- **Jerarquías cerradas**: Definir un conjunto fijo de subclases
- **Modelado de dominios**: Representar estados o tipos conocidos
- **Pattern matching exhaustivo**: El compilador verifica todos los casos
- **Seguridad**: Prevenir extensiones no autorizadas
- **APIs más claras**: Documentar todas las implementaciones posibles

## 🔑 Conceptos Clave

| Concepto | Descripción |
|----------|-------------|
| **sealed** | Keyword para clase/interfaz sellada |
| **permits** | Lista explícita de clases permitidas |
| **final** | Subclase que no puede tener más hijos |
| **sealed** | Subclase que también es sellada |
| **non-sealed** | Subclase que permite herencia abierta |

## 💡 Sintaxis Básica

### Sealed Class Simple

```java
// Clase sellada que solo permite 3 subclases
public sealed class Forma 
    permits Circulo, Rectangulo, Triangulo {
    
    public abstract double area();
}

// Subclases permitidas (DEBEN ser final, sealed o non-sealed)
public final class Circulo extends Forma {
    private final double radio;
    
    public Circulo(double radio) {
        this.radio = radio;
    }
    
    @Override
    public double area() {
        return Math.PI * radio * radio;
    }
}

public final class Rectangulo extends Forma {
    private final double ancho, alto;
    
    public Rectangulo(double ancho, double alto) {
        this.ancho = ancho;
        this.alto = alto;
    }
    
    @Override
    public double area() {
        return ancho * alto;
    }
}

public final class Triangulo extends Forma {
    private final double base, altura;
    
    public Triangulo(double base, double altura) {
        this.base = base;
        this.altura = altura;
    }
    
    @Override
    public double area() {
        return (base * altura) / 2;
    }
}

// ❌ ESTO NO COMPILA
// public class Hexagono extends Forma {} // Error: no está en permits
```

### Sealed con Subclases en el Mismo Archivo

```java
// Cuando las subclases están en el mismo archivo, permits es opcional
public sealed class Vehiculo {
    // permits es implícito si las clases están aquí
}

final class Auto extends Vehiculo {}
final class Moto extends Vehiculo {}
final class Camion extends Vehiculo {}
```

### Sealed Interfaces

```java
public sealed interface Pago 
    permits PagoTarjeta, PagoEfectivo, PagoTransferencia {
    
    double getMonto();
    void procesar();
}

public final class PagoTarjeta implements Pago {
    private final String numeroTarjeta;
    private final double monto;
    
    public PagoTarjeta(String numeroTarjeta, double monto) {
        this.numeroTarjeta = numeroTarjeta;
        this.monto = monto;
    }
    
    @Override
    public double getMonto() {
        return monto;
    }
    
    @Override
    public void procesar() {
        System.out.println("Procesando pago con tarjeta **** " + 
            numeroTarjeta.substring(numeroTarjeta.length() - 4));
    }
}

public final class PagoEfectivo implements Pago {
    private final double monto;
    
    public PagoEfectivo(double monto) {
        this.monto = monto;
    }
    
    @Override
    public double getMonto() {
        return monto;
    }
    
    @Override
    public void procesar() {
        System.out.println("Procesando pago en efectivo: $" + monto);
    }
}

public final class PagoTransferencia implements Pago {
    private final String cuentaDestino;
    private final double monto;
    
    public PagoTransferencia(String cuentaDestino, double monto) {
        this.cuentaDestino = cuentaDestino;
        this.monto = monto;
    }
    
    @Override
    public double getMonto() {
        return monto;
    }
    
    @Override
    public void procesar() {
        System.out.println("Procesando transferencia a " + cuentaDestino);
    }
}
```

## 📊 Ejemplo Completo: Sistema de Resultados

```java
// Modelar resultado de operación: Success o Failure
public sealed interface Result<T> 
    permits Result.Success, Result.Failure {
    
    // Método para verificar éxito
    boolean isSuccess();
    
    // Records como subclases sealed
    record Success<T>(T value) implements Result<T> {
        @Override
        public boolean isSuccess() {
            return true;
        }
    }
    
    record Failure<T>(String error, Exception exception) implements Result<T> {
        // Constructor de conveniencia
        public Failure(String error) {
            this(error, null);
        }
        
        @Override
        public boolean isSuccess() {
            return false;
        }
    }
    
    // Métodos de factory
    static <T> Result<T> success(T value) {
        return new Success<>(value);
    }
    
    static <T> Result<T> failure(String error) {
        return new Failure<>(error);
    }
    
    static <T> Result<T> failure(String error, Exception ex) {
        return new Failure<>(error, ex);
    }
}

// Servicio que usa Result
class UsuarioService {
    private Map<Long, String> usuarios = Map.of(
        1L, "Ana García",
        2L, "Pedro López"
    );
    
    public Result<String> buscarUsuario(Long id) {
        if (id == null) {
            return Result.failure("ID no puede ser null");
        }
        
        String nombre = usuarios.get(id);
        if (nombre == null) {
            return Result.failure("Usuario no encontrado con ID: " + id);
        }
        
        return Result.success(nombre);
    }
    
    public Result<Integer> dividir(int a, int b) {
        if (b == 0) {
            return Result.failure("División por cero");
        }
        return Result.success(a / b);
    }
}

public class EjemploResult {
    public static void main(String[] args) {
        UsuarioService service = new UsuarioService();
        
        // Caso exitoso
        Result<String> result1 = service.buscarUsuario(1L);
        procesarResultado(result1);
        
        // Caso fallido
        Result<String> result2 = service.buscarUsuario(999L);
        procesarResultado(result2);
        
        // División
        Result<Integer> div1 = service.dividir(10, 2);
        procesarResultado(div1);
        
        Result<Integer> div2 = service.dividir(10, 0);
        procesarResultado(div2);
    }
    
    static <T> void procesarResultado(Result<T> result) {
        // Pattern matching con sealed class (Java 17+)
        switch (result) {
            case Result.Success<T>(var value) -> 
                System.out.println("✅ Éxito: " + value);
            case Result.Failure<T>(var error, var ex) -> 
                System.out.println("❌ Error: " + error);
        }
        // ¡No necesita default! El compilador sabe que cubrimos todos los casos
    }
}
```

## 🎭 Tres Modificadores para Subclases

### 1. final - No más herencia

```java
public sealed class Animal permits Perro, Gato {}

public final class Perro extends Animal {
    // Perro NO puede tener subclases
}

// ❌ public class Beagle extends Perro {} // Error: Perro es final
```

### 2. sealed - Herencia controlada

```java
public sealed class Animal permits Mamifero, Ave {}

public sealed class Mamifero extends Animal 
    permits Perro, Gato {
    // Mamifero también es sealed
}

public final class Perro extends Mamifero {}
public final class Gato extends Mamifero {}
```

### 3. non-sealed - Herencia abierta

```java
public sealed class Animal permits Mamifero {}

public non-sealed class Mamifero extends Animal {
    // Mamifero permite herencia libre
}

// ✅ ESTO SÍ COMPILA
public class Perro extends Mamifero {}
public class Gato extends Mamifero {}
public class Elefante extends Mamifero {}
```

## 🌳 Ejemplo Completo: Jerarquía de Expresiones

```java
// AST (Abstract Syntax Tree) para calculadora
public sealed interface Expresion 
    permits Numero, Suma, Resta, Multiplicacion, Division {
    
    double evaluar();
}

public record Numero(double valor) implements Expresion {
    @Override
    public double evaluar() {
        return valor;
    }
}

public record Suma(Expresion izq, Expresion der) implements Expresion {
    @Override
    public double evaluar() {
        return izq.evaluar() + der.evaluar();
    }
}

public record Resta(Expresion izq, Expresion der) implements Expresion {
    @Override
    public double evaluar() {
        return izq.evaluar() - der.evaluar();
    }
}

public record Multiplicacion(Expresion izq, Expresion der) implements Expresion {
    @Override
    public double evaluar() {
        return izq.evaluar() * der.evaluar();
    }
}

public record Division(Expresion izq, Expresion der) implements Expresion {
    @Override
    public double evaluar() {
        double divisor = der.evaluar();
        if (divisor == 0) {
            throw new ArithmeticException("División por cero");
        }
        return izq.evaluar() / divisor;
    }
}

public class CalculadoraExpresiones {
    public static void main(String[] args) {
        // Construir expresión: (10 + 5) * 2 - 8 / 4
        Expresion expr = new Resta(
            new Multiplicacion(
                new Suma(new Numero(10), new Numero(5)),
                new Numero(2)
            ),
            new Division(new Numero(8), new Numero(4))
        );
        
        double resultado = expr.evaluar();
        System.out.println("Resultado: " + resultado); // 28.0
        
        // Pretty print con pattern matching
        System.out.println("Expresión: " + imprimirExpresion(expr));
    }
    
    static String imprimirExpresion(Expresion expr) {
        return switch (expr) {
            case Numero(var valor) -> String.valueOf(valor);
            case Suma(var izq, var der) -> 
                "(" + imprimirExpresion(izq) + " + " + imprimirExpresion(der) + ")";
            case Resta(var izq, var der) -> 
                "(" + imprimirExpresion(izq) + " - " + imprimirExpresion(der) + ")";
            case Multiplicacion(var izq, var der) -> 
                "(" + imprimirExpresion(izq) + " * " + imprimirExpresion(der) + ")";
            case Division(var izq, var der) -> 
                "(" + imprimirExpresion(izq) + " / " + imprimirExpresion(der) + ")";
        };
    }
}
```

**Salida:**
```
Resultado: 28.0
Expresión: (((10.0 + 5.0) * 2.0) - (8.0 / 4.0))
```

## ⚙️ Ventajas sobre Enums

| Feature | Enum | Sealed Class |
|---------|------|--------------|
| Valores únicos | ✅ Sí | ❌ No |
| Datos asociados | ⚠️ Limitado | ✅ Flexible |
| Herencia | ❌ No | ✅ Sí |
| Serialización | ✅ Automática | ⚠️ Manual |
| Pattern matching | ✅ Sí | ✅ Sí |

```java
// Enum - Simple pero limitado
enum EstadoSimple {
    ACTIVO, INACTIVO, BLOQUEADO
}

// Sealed class - Más expresivo con datos
sealed interface Estado permits Activo, Inactivo, Bloqueado {}
record Activo(LocalDateTime ultimaActividad) implements Estado {}
record Inactivo(String razon) implements Estado {}
record Bloqueado(LocalDateTime hasta, String motivo) implements Estado {}
```

## ⚠️ Errores Comunes

> ❌ **Olvidar modificador en subclase**

```java
public sealed class Base permits Sub {}

// ❌ Error: Sub debe ser final, sealed o non-sealed
public class Sub extends Base {}

// ✅ Correcto
public final class Sub extends Base {}
```

> ❌ **Subclase no está en permits**

```java
public sealed class Animal permits Perro {}

// ❌ Error: Gato no está en permits
public final class Gato extends Animal {}
```

## 💪 Ejercicios Prácticos

### Ejercicio 1: Sistema de Notificaciones
**Dificultad**: Media

Crea una jerarquía sealed para Notificacion con Email, SMS y Push.

<details>
<summary>✅ Solución</summary>

```java
public sealed interface Notificacion 
    permits EmailNotificacion, SMSNotificacion, PushNotificacion {
    void enviar();
}

public record EmailNotificacion(String destinatario, String asunto, String cuerpo) 
    implements Notificacion {
    @Override
    public void enviar() {
        System.out.println("📧 Email a " + destinatario + ": " + asunto);
    }
}

public record SMSNotificacion(String telefono, String mensaje) 
    implements Notificacion {
    @Override
    public void enviar() {
        System.out.println("📱 SMS a " + telefono + ": " + mensaje);
    }
}

public record PushNotificacion(String dispositivoId, String titulo, String mensaje) 
    implements Notificacion {
    @Override
    public void enviar() {
        System.out.println("🔔 Push a " + dispositivoId + ": " + titulo);
    }
}

class ServicioNotificaciones {
    public void procesarNotificacion(Notificacion notif) {
        switch (notif) {
            case EmailNotificacion email -> email.enviar();
            case SMSNotificacion sms -> sms.enviar();
            case PushNotificacion push -> push.enviar();
        }
    }
}
```
</details>

## 🎯 Cuándo Usar Sealed Classes

| ✅ Usar cuando | ❌ Evitar cuando |
|---------------|-----------------|
| Jerarquía fija y conocida | Necesitas extensibilidad abierta |
| Modelado de dominios | API pública que otros extenderán |
| Pattern matching exhaustivo | Jerarquía puede cambiar frecuentemente |
| Estados o tipos finitos | Simple enum es suficiente |

## 🔗 Temas Relacionados

- [Pattern Matching](./pattern-matching) - Deconstrucción con sealed classes
- [Records](./records) - Combinan perfectamente
- [Enums](../intermedio/enums) - Alternativa más simple

## 📚 Recursos Adicionales

- [JEP 409: Sealed Classes](https://openjdk.org/jeps/409)
- [Oracle Tutorial: Sealed Classes](https://docs.oracle.com/en/java/javase/21/language/sealed-classes-and-interfaces.html)
