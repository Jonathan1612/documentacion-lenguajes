---
title: "Polimorfismo en Java"
level: intermedio
category: poo
tags: [polimorfismo, casting, instanceof, dynamic-binding, upcasting, downcasting]
duration: 25min
prerequisites: [herencia, poo-clases]
---

# Polimorfismo en Java

## 📋 ¿Qué es el Polimorfismo?

**Polimorfismo** significa "muchas formas". Permite que un objeto tome diferentes formas según el contexto. Una referencia de tipo padre puede apuntar a objetos de tipos hijos.

```java
// Una referencia Animal puede apuntar a cualquier animal específico
Animal animal1 = new Perro();
Animal animal2 = new Gato();
Animal animal3 = new Pajaro();

animal1.hacerSonido(); // Guau
animal2.hacerSonido(); // Miau
animal3.hacerSonido(); // Pío
```

## 💡 Ejemplo Básico

```java
public class Animal {
    public void hacerSonido() {
        System.out.println("El animal hace un sonido");
    }
}

public class Perro extends Animal {
    @Override
    public void hacerSonido() {
        System.out.println("¡Guau!");
    }
}

public class Gato extends Animal {
    @Override
    public void hacerSonido() {
        System.out.println("¡Miau!");
    }
}

// Polimorfismo en acción
public class Main {
    public static void main(String[] args) {
        Animal animal; // Referencia de tipo Animal
        
        animal = new Perro(); // Apunta a un Perro
        animal.hacerSonido(); // ¡Guau!
        
        animal = new Gato();  // Ahora apunta a un Gato
        animal.hacerSonido(); // ¡Miau!
    }
}
```

## 🎯 Ventajas del Polimorfismo

### 1. Código Genérico y Reutilizable

```java
public class Veterinaria {
    // Un solo método funciona para todos los animales
    public void atender(Animal animal) {
        System.out.println("Atendiendo al animal...");
        animal.hacerSonido();
        System.out.println("Consulta finalizada\n");
    }
}

public class Main {
    public static void main(String[] args) {
        Veterinaria vet = new Veterinaria();
        
        vet.atender(new Perro());  // ¡Guau!
        vet.atender(new Gato());   // ¡Miau!
        vet.atender(new Pajaro()); // ¡Pío!
    }
}
```

### 2. Arrays y Colecciones Heterogéneas

```java
public class Main {
    public static void main(String[] args) {
        // Array de diferentes animales
        Animal[] animales = {
            new Perro(),
            new Gato(),
            new Pajaro(),
            new Perro()
        };
        
        // Iterar sobre todos
        for (Animal animal : animales) {
            animal.hacerSonido();
        }
    }
}
```

**Salida**:
```
¡Guau!
¡Miau!
¡Pío!
¡Guau!
```

## 📊 Ejemplo Completo: Sistema de Pagos

```java
// Clase base
public abstract class MetodoPago {
    protected String titular;
    
    public MetodoPago(String titular) {
        this.titular = titular;
    }
    
    public abstract boolean procesarPago(double monto);
    
    public void mostrarRecibo(double monto) {
        System.out.println("Recibo para: " + titular);
        System.out.println("Monto: $" + monto);
    }
}

// Implementaciones concretas
public class TarjetaCredito extends MetodoPago {
    private String numeroTarjeta;
    private double limiteCredito;
    
    public TarjetaCredito(String titular, String numeroTarjeta, double limiteCredito) {
        super(titular);
        this.numeroTarjeta = numeroTarjeta;
        this.limiteCredito = limiteCredito;
    }
    
    @Override
    public boolean procesarPago(double monto) {
        if (monto <= limiteCredito) {
            System.out.println("Pago procesado con tarjeta " + numeroTarjeta.substring(0, 4) + "****");
            limiteCredito -= monto;
            return true;
        }
        System.out.println("Límite de crédito insuficiente");
        return false;
    }
}

public class PayPal extends MetodoPago {
    private String email;
    private double saldo;
    
    public PayPal(String titular, String email, double saldo) {
        super(titular);
        this.email = email;
        this.saldo = saldo;
    }
    
    @Override
    public boolean procesarPago(double monto) {
        if (monto <= saldo) {
            System.out.println("Pago procesado via PayPal (" + email + ")");
            saldo -= monto;
            return true;
        }
        System.out.println("Saldo insuficiente en PayPal");
        return false;
    }
}

public class Efectivo extends MetodoPago {
    public Efectivo(String titular) {
        super(titular);
    }
    
    @Override
    public boolean procesarPago(double monto) {
        System.out.println("Pago recibido en efectivo");
        return true;
    }
}

// Sistema de procesamiento - POLIMORFISMO
public class ProcesadorPagos {
    public void procesarCompra(MetodoPago metodo, double monto) {
        System.out.println("\n--- Procesando compra ---");
        if (metodo.procesarPago(monto)) {
            metodo.mostrarRecibo(monto);
            System.out.println("✓ Compra exitosa");
        } else {
            System.out.println("✗ Compra fallida");
        }
    }
}

// Uso
public class Main {
    public static void main(String[] args) {
        ProcesadorPagos procesador = new ProcesadorPagos();
        
        MetodoPago pago1 = new TarjetaCredito("Ana García", "4532123456789012", 5000);
        MetodoPago pago2 = new PayPal("Carlos López", "carlos@email.com", 1000);
        MetodoPago pago3 = new Efectivo("María Pérez");
        
        procesador.procesarCompra(pago1, 250);
        procesador.procesarCompra(pago2, 150);
        procesador.procesarCompra(pago3, 75);
    }
}
```

## 🔄 Upcasting y Downcasting

### Upcasting (Automático)

Convertir de tipo hijo a tipo padre - **siempre seguro**.

```java
Perro perro = new Perro();
Animal animal = perro; // ✅ Upcasting automático

animal.hacerSonido(); // ✅ Funciona
// animal.ladrar();   // ❌ Error: Animal no tiene método ladrar
```

### Downcasting (Manual)

Convertir de tipo padre a tipo hijo - **puede fallar en runtime**.

```java
Animal animal = new Perro();

// Downcasting explícito
Perro perro = (Perro) animal; // ✅ Funciona porque realmente es un Perro
perro.ladrar(); // ✅ Ahora podemos llamar métodos específicos de Perro

// ❌ Downcasting incorrecto
Animal gato = new Gato();
Perro perro2 = (Perro) gato; // ClassCastException en runtime!
```

## 🔍 Operador `instanceof`

Verifica si un objeto es instancia de una clase antes de hacer downcasting.

```java
public class Main {
    public static void identificarAnimal(Animal animal) {
        if (animal instanceof Perro) {
            Perro perro = (Perro) animal;
            perro.ladrar();
        } else if (animal instanceof Gato) {
            Gato gato = (Gato) animal;
            gato.maullar();
        } else {
            System.out.println("Animal desconocido");
        }
    }
    
    public static void main(String[] args) {
        identificarAnimal(new Perro()); // Ladra
        identificarAnimal(new Gato());  // Maúlla
    }
}
```

### Pattern Matching con instanceof (Java 16+)

```java
// ✅ Java 16+ - más conciso
public static void identificarAnimal(Animal animal) {
    if (animal instanceof Perro perro) { // Declara variable automáticamente
        perro.ladrar();
    } else if (animal instanceof Gato gato) {
        gato.maullar();
    }
}
```

## ⚙️ Funcionamiento Interno: Dynamic Binding

Java usa **ligadura dinámica** (dynamic binding) para decidir en **runtime** qué método ejecutar.

```java
public class Demo {
    public static void main(String[] args) {
        Animal animal = obtenerAnimalAleatorio();
        animal.hacerSonido(); // Java decide en runtime qué método llamar
    }
    
    public static Animal obtenerAnimalAleatorio() {
        double random = Math.random();
        if (random < 0.33) return new Perro();
        if (random < 0.66) return new Gato();
        return new Pajaro();
    }
}
```

### Tabla de Métodos Virtuales (VMT)

Internamente, Java mantiene una **tabla de métodos virtuales** para cada clase:

```
Animal VMT:
  hacerSonido() → implementación en Animal

Perro VMT:
  hacerSonido() → implementación en Perro (sobrescrito)
  ladrar() → implementación en Perro

Gato VMT:
  hacerSonido() → implementación en Gato (sobrescrito)
  maullar() → implementación en Gato
```

Al llamar `animal.hacerSonido()`, Java:
1. Verifica el **tipo real** del objeto en runtime (Perro, Gato, etc.)
2. Consulta la VMT de ese tipo
3. Ejecuta el método correspondiente

## 🎨 Polimorfismo con Interfaces

```java
public interface Volador {
    void volar();
}

public class Pajaro implements Volador {
    @Override
    public void volar() {
        System.out.println("El pájaro vuela batiendo sus alas");
    }
}

public class Avion implements Volador {
    @Override
    public void volar() {
        System.out.println("El avión vuela con motores");
    }
}

// Polimorfismo con interfaz
public class Main {
    public static void despegar(Volador volador) {
        System.out.println("Preparando despegue...");
        volador.volar();
    }
    
    public static void main(String[] args) {
        despegar(new Pajaro()); // Vuela batiendo alas
        despegar(new Avion());  // Vuela con motores
    }
}
```

## 📦 Ejemplo Real: Sistema de Notificaciones

```java
public interface Notificacion {
    void enviar(String mensaje);
}

public class NotificacionEmail implements Notificacion {
    private String email;
    
    public NotificacionEmail(String email) {
        this.email = email;
    }
    
    @Override
    public void enviar(String mensaje) {
        System.out.println("📧 Email enviado a " + email + ": " + mensaje);
    }
}

public class NotificacionSMS implements Notificacion {
    private String telefono;
    
    public NotificacionSMS(String telefono) {
        this.telefono = telefono;
    }
    
    @Override
    public void enviar(String mensaje) {
        System.out.println("📱 SMS enviado a " + telefono + ": " + mensaje);
    }
}

public class NotificacionPush implements Notificacion {
    private String dispositivoId;
    
    public NotificacionPush(String dispositivoId) {
        this.dispositivoId = dispositivoId;
    }
    
    @Override
    public void enviar(String mensaje) {
        System.out.println("🔔 Push enviado a dispositivo " + dispositivoId + ": " + mensaje);
    }
}

public class ServicioNotificaciones {
    private List<Notificacion> notificaciones;
    
    public ServicioNotificaciones() {
        notificaciones = new ArrayList<>();
    }
    
    public void agregarCanal(Notificacion notificacion) {
        notificaciones.add(notificacion);
    }
    
    // Polimorfismo: envía por todos los canales
    public void enviarATodos(String mensaje) {
        System.out.println("\n=== Enviando notificación ===");
        for (Notificacion notif : notificaciones) {
            notif.enviar(mensaje);
        }
    }
}

// Uso
public class Main {
    public static void main(String[] args) {
        ServicioNotificaciones servicio = new ServicioNotificaciones();
        
        servicio.agregarCanal(new NotificacionEmail("usuario@email.com"));
        servicio.agregarCanal(new NotificacionSMS("555-1234"));
        servicio.agregarCanal(new NotificacionPush("device-abc123"));
        
        servicio.enviarATodos("¡Nueva actualización disponible!");
    }
}
```

## ⚠️ Errores Comunes

### 1. Downcasting sin verificar con instanceof

```java
// ❌ Mal - puede lanzar ClassCastException
Animal animal = new Gato();
Perro perro = (Perro) animal; // ¡Error en runtime!

// ✅ Correcto
if (animal instanceof Perro) {
    Perro perro = (Perro) animal;
    perro.ladrar();
}
```

### 2. Confundir tipo de referencia con tipo de objeto

```java
Animal animal = new Perro();

// El tipo de referencia (Animal) determina qué métodos puedes llamar
animal.hacerSonido(); // ✅ Animal tiene este método
// animal.ladrar();   // ❌ Animal no tiene este método

// El tipo de objeto (Perro) determina qué implementación se ejecuta
animal.hacerSonido(); // Ejecuta la implementación de Perro
```

### 3. Intentar acceder a métodos específicos sin casting

```java
Animal animal = new Perro();

// ❌ Mal
animal.ladrar(); // Error de compilación

// ✅ Correcto
if (animal instanceof Perro) {
    ((Perro) animal).ladrar();
}
```

## 💪 Ejercicios Prácticos

### Ejercicio 1: Sistema de Figuras
**Dificultad**: Medio

Crea un sistema polimórfico con `Figura`, `Circulo`, `Rectangulo`, `Triangulo`.

<details>
<summary>✅ Solución</summary>

```java
public abstract class Figura {
    protected String color;
    
    public Figura(String color) {
        this.color = color;
    }
    
    public abstract double calcularArea();
    public abstract double calcularPerimetro();
    
    public void mostrarInfo() {
        System.out.println("Color: " + color);
        System.out.println("Área: " + calcularArea());
        System.out.println("Perímetro: " + calcularPerimetro());
    }
}

public class Circulo extends Figura {
    private double radio;
    
    public Circulo(String color, double radio) {
        super(color);
        this.radio = radio;
    }
    
    @Override
    public double calcularArea() {
        return Math.PI * radio * radio;
    }
    
    @Override
    public double calcularPerimetro() {
        return 2 * Math.PI * radio;
    }
}

public class Rectangulo extends Figura {
    private double base, altura;
    
    public Rectangulo(String color, double base, double altura) {
        super(color);
        this.base = base;
        this.altura = altura;
    }
    
    @Override
    public double calcularArea() {
        return base * altura;
    }
    
    @Override
    public double calcularPerimetro() {
        return 2 * (base + altura);
    }
}

// Polimorfismo en acción
public class Main {
    public static void dibujarFigura(Figura figura) {
        System.out.println("\n--- " + figura.getClass().getSimpleName() + " ---");
        figura.mostrarInfo();
    }
    
    public static void main(String[] args) {
        Figura[] figuras = {
            new Circulo("Rojo", 5),
            new Rectangulo("Azul", 4, 6)
        };
        
        for (Figura f : figuras) {
            dibujarFigura(f);
        }
    }
}
```
</details>

### Ejercicio 2: Sistema de Transporte
**Dificultad**: Medio

Crea jerarquía `Transporte` → `Terrestre`, `Aereo`, `Maritimo` con método polimórfico `mover()`.

<details>
<summary>✅ Solución</summary>

```java
public abstract class Transporte {
    protected String nombre;
    protected int capacidad;
    
    public Transporte(String nombre, int capacidad) {
        this.nombre = nombre;
        this.capacidad = capacidad;
    }
    
    public abstract void mover();
    
    public void mostrarInfo() {
        System.out.println("\nTransporte: " + nombre);
        System.out.println("Capacidad: " + capacidad + " personas");
    }
}

public class Terrestre extends Transporte {
    private int numRuedas;
    
    public Terrestre(String nombre, int capacidad, int numRuedas) {
        super(nombre, capacidad);
        this.numRuedas = numRuedas;
    }
    
    @Override
    public void mover() {
        System.out.println(nombre + " se mueve por tierra con " + numRuedas + " ruedas");
    }
}

public class Aereo extends Transporte {
    private int altitudMaxima;
    
    public Aereo(String nombre, int capacidad, int altitudMaxima) {
        super(nombre, capacidad);
        this.altitudMaxima = altitudMaxima;
    }
    
    @Override
    public void mover() {
        System.out.println(nombre + " vuela hasta " + altitudMaxima + "m de altura");
    }
}

public class Maritimo extends Transporte {
    private boolean tieneVela;
    
    public Maritimo(String nombre, int capacidad, boolean tieneVela) {
        super(nombre, capacidad);
        this.tieneVela = tieneVela;
    }
    
    @Override
    public void mover() {
        String propulsion = tieneVela ? "vela" : "motor";
        System.out.println(nombre + " navega por el agua con " + propulsion);
    }
}

public class Main {
    public static void main(String[] args) {
        Transporte[] transportes = {
            new Terrestre("Autobús", 40, 6),
            new Aereo("Avión", 180, 10000),
            new Maritimo("Velero", 8, true)
        };
        
        for (Transporte t : transportes) {
            t.mostrarInfo();
            t.mover();
        }
    }
}
```
</details>

## 🎯 Cuándo Usar Polimorfismo

✅ **Usar polimorfismo cuando**:
- Tienes operaciones comunes para diferentes tipos
- Quieres código flexible y extensible
- Necesitas trabajar con colecciones de objetos relacionados
- Implementas patrones de diseño (Strategy, Factory, etc.)

## 🔗 Temas Relacionados

- [Herencia](./herencia)
- [Interfaces](./interfaces)
- [Clases Abstractas](./clases-abstractas)

## 📚 Recursos Adicionales

- [Polymorphism - Oracle](https://docs.oracle.com/javase/tutorial/java/IandI/polymorphism.html)
- [Type Casting](https://docs.oracle.com/javase/specs/jls/se17/html/jls-5.html)
