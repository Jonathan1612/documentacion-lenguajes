---
title: "Interfaces en Java"
level: intermedio
category: poo
tags: [interfaces, implements, default, static, functional-interface, multiple-inheritance]
duration: 25min
prerequisites: [herencia, polimorfismo]
---

# Interfaces en Java

## 📋 ¿Qué es una Interfaz?

Una **interfaz** es un contrato que define **qué** debe hacer una clase, pero no **cómo** lo hace. Define métodos abstractos que las clases deben implementar.

```java
// Definir interfaz
public interface Volador {
    void volar(); // Método abstracto (sin implementación)
    void aterrizar();
}

// Implementar interfaz
public class Pajaro implements Volador {
    @Override
    public void volar() {
        System.out.println("El pájaro vuela batiendo sus alas");
    }
    
    @Override
    public void aterrizar() {
        System.out.println("El pájaro aterriza en un árbol");
    }
}

// Uso
public class Main {
    public static void main(String[] args) {
        Volador pajaro = new Pajaro();
        pajaro.volar();
        pajaro.aterrizar();
    }
}
```

## 🎯 Características de las Interfaces

### Todos los métodos son públicos y abstractos (por defecto)

```java
public interface Ejemplo {
    // Estos dos son equivalentes:
    void metodo1();
    public abstract void metodo2();
    
    // No puedes tener métodos private (excepto en Java 9+)
}
```

### Pueden tener constantes (public static final)

```java
public interface Configuracion {
    // Constantes
    int MAX_USUARIOS = 100; // public static final por defecto
    String VERSION = "1.0";
    double PI = 3.14159;
}

// Uso
System.out.println(Configuracion.MAX_USUARIOS); // 100
```

### Una clase puede implementar múltiples interfaces

```java
public interface Volador {
    void volar();
}

public interface Nadador {
    void nadar();
}

// Múltiples interfaces
public class Pato implements Volador, Nadador {
    @Override
    public void volar() {
        System.out.println("El pato vuela");
    }
    
    @Override
    public void nadar() {
        System.out.println("El pato nada");
    }
}
```

## 💡 Ejemplo Completo: Sistema de Pagos

```java
public interface Pagable {
    boolean procesarPago(double monto);
    String obtenerInformacion();
}

public class TarjetaCredito implements Pagable {
    private String numero;
    private double limite;
    
    public TarjetaCredito(String numero, double limite) {
        this.numero = numero;
        this.limite = limite;
    }
    
    @Override
    public boolean procesarPago(double monto) {
        if (monto <= limite) {
            limite -= monto;
            System.out.println("✓ Pago de $" + monto + " procesado con tarjeta");
            return true;
        }
        System.out.println("✗ Límite insuficiente");
        return false;
    }
    
    @Override
    public String obtenerInformacion() {
        return "Tarjeta **** " + numero.substring(numero.length() - 4);
    }
}

public class PayPal implements Pagable {
    private String email;
    private double saldo;
    
    public PayPal(String email, double saldo) {
        this.email = email;
        this.saldo = saldo;
    }
    
    @Override
    public boolean procesarPago(double monto) {
        if (monto <= saldo) {
            saldo -= monto;
            System.out.println("✓ Pago de $" + monto + " procesado via PayPal");
            return true;
        }
        System.out.println("✗ Saldo insuficiente");
        return false;
    }
    
    @Override
    public String obtenerInformacion() {
        return "PayPal: " + email;
    }
}

// Procesador genérico que acepta cualquier Pagable
public class ProcesadorPagos {
    public void procesarCompra(Pagable metodoPago, double monto) {
        System.out.println("\n--- Procesando con " + metodoPago.obtenerInformacion() + " ---");
        metodoPago.procesarPago(monto);
    }
}

// Uso
public class Main {
    public static void main(String[] args) {
        ProcesadorPagos procesador = new ProcesadorPagos();
        
        Pagable tarjeta = new TarjetaCredito("1234567890123456", 5000);
        Pagable paypal = new PayPal("usuario@email.com", 1000);
        
        procesador.procesarCompra(tarjeta, 250);
        procesador.procesarCompra(paypal, 150);
    }
}
```

## 🆚 Interfaces vs Clases Abstractas

| Característica | Interfaz | Clase Abstracta |
|----------------|----------|-----------------|
| Herencia múltiple | ✅ Sí (implements múltiples) | ❌ No (solo una) |
| Atributos | ❌ Solo constantes | ✅ Cualquier atributo |
| Constructores | ❌ No | ✅ Sí |
| Métodos concretos | ⚠️ Solo default/static (Java 8+) | ✅ Sí |
| Cuándo usar | "Puede hacer" (capacidad) | "Es un" (identidad) |

### Ejemplo de Diferencia

```java
// Interfaz - define CAPACIDAD
public interface Volador {
    void volar(); // Puede volar
}

// Clase abstracta - define IDENTIDAD
public abstract class Animal {
    protected String nombre;
    
    public Animal(String nombre) {
        this.nombre = nombre;
    }
    
    public abstract void hacerSonido();
}

// Clase que es un Animal Y puede volar
public class Pajaro extends Animal implements Volador {
    public Pajaro(String nombre) {
        super(nombre);
    }
    
    @Override
    public void hacerSonido() {
        System.out.println("Pío pío");
    }
    
    @Override
    public void volar() {
        System.out.println(nombre + " vuela");
    }
}
```

## 🔧 Métodos Default (Java 8+)

Métodos con implementación por defecto en la interfaz.

```java
public interface Logger {
    // Método abstracto - obligatorio implementar
    void log(String mensaje);
    
    // Método default - opcional sobrescribir
    default void logInfo(String mensaje) {
        log("[INFO] " + mensaje);
    }
    
    default void logError(String mensaje) {
        log("[ERROR] " + mensaje);
    }
}

public class ConsoleLogger implements Logger {
    @Override
    public void log(String mensaje) {
        System.out.println(mensaje);
    }
    
    // No necesito implementar logInfo y logError
    // Heredan la implementación default
}

// Uso
public class Main {
    public static void main(String[] args) {
        Logger logger = new ConsoleLogger();
        logger.log("Mensaje directo");
        logger.logInfo("Información importante");
        logger.logError("Algo salió mal");
    }
}
```

### Sobrescribir Métodos Default

```java
public class FileLogger implements Logger {
    private String archivo;
    
    public FileLogger(String archivo) {
        this.archivo = archivo;
    }
    
    @Override
    public void log(String mensaje) {
        // Escribir a archivo
        System.out.println("Escribiendo a " + archivo + ": " + mensaje);
    }
    
    // Sobrescribir método default
    @Override
    public void logError(String mensaje) {
        log("[CRITICAL ERROR] " + mensaje);
        // Enviar alerta adicional
        System.out.println("🚨 Alerta enviada!");
    }
}
```

## 📦 Métodos Static en Interfaces (Java 8+)

Métodos estáticos que pertenecen a la interfaz.

```java
public interface Matematicas {
    // Método static
    static int sumar(int a, int b) {
        return a + b;
    }
    
    static int restar(int a, int b) {
        return a - b;
    }
    
    static double promedio(int... numeros) {
        int suma = 0;
        for (int num : numeros) {
            suma += num;
        }
        return (double) suma / numeros.length;
    }
}

// Uso (sin crear objeto)
public class Main {
    public static void main(String[] args) {
        System.out.println(Matematicas.sumar(5, 3));      // 8
        System.out.println(Matematicas.restar(10, 4));    // 6
        System.out.println(Matematicas.promedio(10, 20, 30)); // 20.0
    }
}
```

## 🎨 Interfaces Funcionales

Interfaz con **un solo método abstracto** (SAM - Single Abstract Method). Se usan con expresiones lambda.

```java
@FunctionalInterface // Anotación opcional pero recomendada
public interface Operacion {
    int aplicar(int a, int b);
    
    // Puede tener métodos default y static
    default void imprimir(int resultado) {
        System.out.println("Resultado: " + resultado);
    }
}

// Uso con lambda
public class Main {
    public static void main(String[] args) {
        // Lambda - implementación concisa
        Operacion suma = (a, b) -> a + b;
        Operacion multiplicacion = (a, b) -> a * b;
        
        System.out.println(suma.aplicar(5, 3));           // 8
        System.out.println(multiplicacion.aplicar(5, 3)); // 15
    }
}
```

### Interfaces Funcionales del JDK

| Interfaz | Método | Descripción |
|----------|--------|-------------|
| `Predicate<T>` | `boolean test(T)` | Condición |
| `Function<T,R>` | `R apply(T)` | Transformación |
| `Consumer<T>` | `void accept(T)` | Consumir |
| `Supplier<T>` | `T get()` | Proveer |

```java
import java.util.function.*;

public class Main {
    public static void main(String[] args) {
        // Predicate
        Predicate<Integer> esPar = n -> n % 2 == 0;
        System.out.println(esPar.test(4)); // true
        
        // Function
        Function<String, Integer> longitud = s -> s.length();
        System.out.println(longitud.apply("Java")); // 4
        
        // Consumer
        Consumer<String> imprimir = s -> System.out.println(s);
        imprimir.accept("Hola"); // Hola
        
        // Supplier
        Supplier<Double> aleatorio = () -> Math.random();
        System.out.println(aleatorio.get()); // 0.xxxxx
    }
}
```

## 📊 Ejemplo Real: Sistema de Autenticación

```java
public interface Autenticador {
    boolean autenticar(String usuario, String credencial);
    
    default void registrarIntento(String usuario, boolean exitoso) {
        String estado = exitoso ? "EXITOSO" : "FALLIDO";
        System.out.println("Intento " + estado + " para usuario: " + usuario);
    }
}

public class AutenticacionPassword implements Autenticador {
    private Map<String, String> usuarios = new HashMap<>();
    
    public void registrarUsuario(String usuario, String password) {
        usuarios.put(usuario, password);
    }
    
    @Override
    public boolean autenticar(String usuario, String credencial) {
        boolean exitoso = usuarios.containsKey(usuario) && 
                         usuarios.get(usuario).equals(credencial);
        registrarIntento(usuario, exitoso);
        return exitoso;
    }
}

public class AutenticacionBiometrica implements Autenticador {
    private Set<String> huellas = new HashSet<>();
    
    public void registrarHuella(String huella) {
        huellas.add(huella);
    }
    
    @Override
    public boolean autenticar(String usuario, String credencial) {
        boolean exitoso = huellas.contains(credencial);
        registrarIntento(usuario, exitoso);
        return exitoso;
    }
}

public class SistemaSeguridad {
    private Autenticador autenticador;
    
    public SistemaSeguridad(Autenticador autenticador) {
        this.autenticador = autenticador;
    }
    
    public void iniciarSesion(String usuario, String credencial) {
        System.out.println("\n--- Iniciando sesión ---");
        if (autenticador.autenticar(usuario, credencial)) {
            System.out.println("✓ Acceso concedido");
        } else {
            System.out.println("✗ Acceso denegado");
        }
    }
}

// Uso
public class Main {
    public static void main(String[] args) {
        // Sistema con password
        AutenticacionPassword authPass = new AutenticacionPassword();
        authPass.registrarUsuario("ana", "pass123");
        
        SistemaSeguridad sistema1 = new SistemaSeguridad(authPass);
        sistema1.iniciarSesion("ana", "pass123");
        sistema1.iniciarSesion("ana", "incorrecto");
        
        // Sistema con biométrico
        AutenticacionBiometrica authBio = new AutenticacionBiometrica();
        authBio.registrarHuella("HUELLA_ANA_1234");
        
        SistemaSeguridad sistema2 = new SistemaSeguridad(authBio);
        sistema2.iniciarSesion("ana", "HUELLA_ANA_1234");
    }
}
```

## ⚠️ Errores Comunes

### 1. No implementar todos los métodos

```java
public interface Calculadora {
    int sumar(int a, int b);
    int restar(int a, int b);
}

// ❌ Error: debe implementar ambos métodos
public class MiCalculadora implements Calculadora {
    @Override
    public int sumar(int a, int b) {
        return a + b;
    }
    // Falta restar()
}

// ✅ Correcto
public class MiCalculadora implements Calculadora {
    @Override
    public int sumar(int a, int b) {
        return a + b;
    }
    
    @Override
    public int restar(int a, int b) {
        return a - b;
    }
}
```

### 2. Intentar instanciar una interfaz

```java
// ❌ Error: no puedes instanciar interfaces
Volador volador = new Volador();

// ✅ Correcto: instancia una clase que implementa la interfaz
Volador volador = new Pajaro();
```

### 3. Confundir extends con implements

```java
// ❌ Mal
public class Pajaro extends Volador { } // extends solo para clases

// ✅ Correcto
public class Pajaro implements Volador { }
```

## 💪 Ejercicios Prácticos

### Ejercicio 1: Sistema de Notificaciones
**Dificultad**: Fácil

Crea interfaz `Notificable` con método `enviar()`. Implementa `Email` y `SMS`.

<details>
<summary>✅ Solución</summary>

```java
public interface Notificable {
    void enviar(String mensaje);
}

public class Email implements Notificable {
    private String direccion;
    
    public Email(String direccion) {
        this.direccion = direccion;
    }
    
    @Override
    public void enviar(String mensaje) {
        System.out.println("📧 Email enviado a " + direccion + ": " + mensaje);
    }
}

public class SMS implements Notificable {
    private String telefono;
    
    public SMS(String telefono) {
        this.telefono = telefono;
    }
    
    @Override
    public void enviar(String mensaje) {
        System.out.println("📱 SMS enviado a " + telefono + ": " + mensaje);
    }
}

public class Main {
    public static void main(String[] args) {
        Notificable[] notificaciones = {
            new Email("usuario@email.com"),
            new SMS("555-1234")
        };
        
        for (Notificable notif : notificaciones) {
            notif.enviar("Mensaje importante");
        }
    }
}
```
</details>

### Ejercicio 2: Comparador de Objetos
**Dificultad**: Medio

Crea interfaz `Comparable` con método `comparar()`. Implementa en clase `Producto`.

<details>
<summary>✅ Solución</summary>

```java
public interface Comparador<T> {
    int comparar(T otro);
}

public class Producto implements Comparador<Producto> {
    private String nombre;
    private double precio;
    
    public Producto(String nombre, double precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
    
    @Override
    public int comparar(Producto otro) {
        return Double.compare(this.precio, otro.precio);
    }
    
    @Override
    public String toString() {
        return nombre + " - $" + precio;
    }
}

public class Main {
    public static void main(String[] args) {
        Producto p1 = new Producto("Laptop", 1200);
        Producto p2 = new Producto("Mouse", 25);
        
        int resultado = p1.comparar(p2);
        if (resultado > 0) {
            System.out.println(p1 + " es más caro");
        } else {
            System.out.println(p2 + " es más caro");
        }
    }
}
```
</details>

## 🎯 Cuándo Usar Interfaces

✅ **Usar interfaces cuando**:
- Quieres definir un contrato sin implementación
- Necesitas herencia múltiple de comportamiento
- Diferentes clases no relacionadas deben tener el mismo comportamiento
- Quieres lograr bajo acoplamiento

## 🔗 Temas Relacionados

- [Polimorfismo](./polimorfismo)
- [Clases Abstractas](./clases-abstractas)
- [Lambdas](./lambdas)

## 📚 Recursos Adicionales

- [Interfaces - Oracle](https://docs.oracle.com/javase/tutorial/java/IandI/createinterface.html)
- [Default Methods](https://docs.oracle.com/javase/tutorial/java/IandI/defaultmethods.html)
- [Functional Interfaces](https://docs.oracle.com/javase/8/docs/api/java/util/function/package-summary.html)
