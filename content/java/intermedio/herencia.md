---
title: "Herencia en Java"
level: intermedio
category: poo
tags: [herencia, extends, super, override, reutilizacion]
duration: 30min
prerequisites: [poo-clases, funciones]
---

# Herencia en Java

## 📋 ¿Qué es la Herencia?

La **herencia** permite crear nuevas clases basadas en clases existentes, reutilizando código y creando jerarquías de clases.

```java
// Clase padre (superclase)
public class Animal {
    String nombre;
    
    public void comer() {
        System.out.println(nombre + " está comiendo");
    }
}

// Clase hija (subclase) hereda de Animal
public class Perro extends Animal {
    public void ladrar() {
        System.out.println(nombre + " está ladrando: ¡Guau!");
    }
}

// Uso
public class Main {
    public static void main(String[] args) {
        Perro miPerro = new Perro();
        miPerro.nombre = "Firulais";
        miPerro.comer();   // Heredado de Animal
        miPerro.ladrar();  // Propio de Perro
    }
}
```

**Salida**:
```
Firulais está comiendo
Firulais está ladrando: ¡Guau!
```

## 🏗️ Sintaxis Básica

```java
public class ClaseHija extends ClasePadre {
    // La clase hija hereda todos los atributos y métodos públicos/protected
    // Puede agregar nuevos atributos y métodos
    // Puede sobrescribir (override) métodos del padre
}
```

### Relación "es-un" (is-a)

La herencia modela una relación **"es-un"**:
- Un `Perro` **es-un** `Animal` ✅
- Un `Coche` **es-un** `Vehículo` ✅
- Un `Estudiante` **es-una** `Persona` ✅

## 💡 Ejemplo Completo: Jerarquía de Empleados

```java
// Clase base
public class Empleado {
    protected String nombre;
    protected String id;
    protected double salarioBase;
    
    public Empleado(String nombre, String id, double salarioBase) {
        this.nombre = nombre;
        this.id = id;
        this.salarioBase = salarioBase;
    }
    
    public double calcularSalario() {
        return salarioBase;
    }
    
    public void mostrarInfo() {
        System.out.println("ID: " + id);
        System.out.println("Nombre: " + nombre);
        System.out.println("Salario: $" + calcularSalario());
    }
}

// Clase derivada 1
public class EmpleadoTiempoCompleto extends Empleado {
    private double bono;
    
    public EmpleadoTiempoCompleto(String nombre, String id, double salarioBase, double bono) {
        super(nombre, id, salarioBase); // Llama al constructor del padre
        this.bono = bono;
    }
    
    @Override
    public double calcularSalario() {
        return salarioBase + bono;
    }
}

// Clase derivada 2
public class EmpleadoMedioTiempo extends Empleado {
    private int horasTrabajadas;
    private double tarifaPorHora;
    
    public EmpleadoMedioTiempo(String nombre, String id, int horasTrabajadas, double tarifaPorHora) {
        super(nombre, id, 0); // Salario base = 0
        this.horasTrabajadas = horasTrabajadas;
        this.tarifaPorHora = tarifaPorHora;
    }
    
    @Override
    public double calcularSalario() {
        return horasTrabajadas * tarifaPorHora;
    }
}

// Uso
public class Main {
    public static void main(String[] args) {
        EmpleadoTiempoCompleto emp1 = new EmpleadoTiempoCompleto("Ana García", "E001", 3000, 500);
        EmpleadoMedioTiempo emp2 = new EmpleadoMedioTiempo("Carlos López", "E002", 80, 25);
        
        emp1.mostrarInfo();
        System.out.println();
        emp2.mostrarInfo();
    }
}
```

**Salida**:
```
ID: E001
Nombre: Ana García
Salario: $3500.0

ID: E002
Nombre: Carlos López
Salario: $2000.0
```

## 🔑 Palabra Clave `super`

`super` se refiere a la clase padre.

### Uso 1: Llamar al Constructor del Padre

```java
public class Vehiculo {
    protected String marca;
    protected int año;
    
    public Vehiculo(String marca, int año) {
        this.marca = marca;
        this.año = año;
    }
}

public class Coche extends Vehiculo {
    private int numPuertas;
    
    public Coche(String marca, int año, int numPuertas) {
        super(marca, año); // DEBE ser la primera línea
        this.numPuertas = numPuertas;
    }
}
```

⚠️ **Si no llamas a `super()`, Java llama automáticamente a `super()` sin argumentos**.

### Uso 2: Acceder a Métodos del Padre

```java
public class Animal {
    public void hacerSonido() {
        System.out.println("El animal hace un sonido");
    }
}

public class Gato extends Animal {
    @Override
    public void hacerSonido() {
        super.hacerSonido(); // Llama al método del padre
        System.out.println("El gato maúlla: ¡Miau!");
    }
}

// Uso
Gato gato = new Gato();
gato.hacerSonido();
// Salida:
// El animal hace un sonido
// El gato maúlla: ¡Miau!
```

### Uso 3: Acceder a Atributos del Padre

```java
public class Persona {
    protected String nombre = "Persona Genérica";
}

public class Estudiante extends Persona {
    private String nombre = "Estudiante Específico";
    
    public void mostrarNombres() {
        System.out.println("this.nombre: " + this.nombre);
        System.out.println("super.nombre: " + super.nombre);
    }
}
```

## 🎯 Sobrescribir Métodos (@Override)

Cambiar el comportamiento de un método heredado.

```java
public class Figura {
    protected String nombre;
    
    public double calcularArea() {
        return 0;
    }
    
    public void describir() {
        System.out.println("Esta es una figura geométrica");
    }
}

public class Rectangulo extends Figura {
    private double base;
    private double altura;
    
    public Rectangulo(double base, double altura) {
        this.nombre = "Rectángulo";
        this.base = base;
        this.altura = altura;
    }
    
    @Override
    public double calcularArea() {
        return base * altura;
    }
    
    @Override
    public void describir() {
        super.describir(); // Llama al método del padre
        System.out.println("Soy un " + nombre + " de " + base + "x" + altura);
    }
}

public class Circulo extends Figura {
    private double radio;
    
    public Circulo(double radio) {
        this.nombre = "Círculo";
        this.radio = radio;
    }
    
    @Override
    public double calcularArea() {
        return Math.PI * radio * radio;
    }
}

// Uso
public class Main {
    public static void main(String[] args) {
        Rectangulo rect = new Rectangulo(5, 3);
        Circulo circ = new Circulo(4);
        
        System.out.println("Área rectángulo: " + rect.calcularArea()); // 15.0
        System.out.println("Área círculo: " + circ.calcularArea());    // 50.26...
        
        rect.describir();
    }
}
```

### 📌 Anotación @Override

```java
@Override // ✅ Buena práctica - el compilador verifica que estás sobrescribiendo
public void metodo() {
    // ...
}
```

**Beneficios**:
- Detecta errores de ortografía
- Documenta la intención
- Evita errores al cambiar el padre

## 🔒 Modificadores de Acceso en Herencia

| Modificador | Misma Clase | Mismo Package | Subclase | Todos |
|-------------|-------------|---------------|----------|-------|
| `private` | ✅ | ❌ | ❌ | ❌ |
| `default` (sin modificador) | ✅ | ✅ | ❌ | ❌ |
| `protected` | ✅ | ✅ | ✅ | ❌ |
| `public` | ✅ | ✅ | ✅ | ✅ |

```java
public class Padre {
    private int privado = 1;       // NO heredado
    int defecto = 2;               // Heredado si está en mismo package
    protected int protegido = 3;   // Heredado siempre
    public int publico = 4;        // Heredado siempre
}

public class Hijo extends Padre {
    public void probar() {
        // System.out.println(privado);   // ❌ Error
        System.out.println(defecto);      // ✅ Si está en mismo package
        System.out.println(protegido);    // ✅ Siempre
        System.out.println(publico);      // ✅ Siempre
    }
}
```

## 📊 Ejemplo Completo: Sistema Bancario

```java
// Clase base
public class CuentaBancaria {
    protected String numeroCuenta;
    protected String titular;
    protected double saldo;
    
    public CuentaBancaria(String numeroCuenta, String titular, double saldoInicial) {
        this.numeroCuenta = numeroCuenta;
        this.titular = titular;
        this.saldo = saldoInicial;
    }
    
    public void depositar(double cantidad) {
        if (cantidad > 0) {
            saldo += cantidad;
            System.out.println("Depósito: $" + cantidad + ". Nuevo saldo: $" + saldo);
        }
    }
    
    public void retirar(double cantidad) {
        if (cantidad > 0 && cantidad <= saldo) {
            saldo -= cantidad;
            System.out.println("Retiro: $" + cantidad + ". Nuevo saldo: $" + saldo);
        } else {
            System.out.println("Fondos insuficientes");
        }
    }
    
    public void mostrarInfo() {
        System.out.println("Cuenta: " + numeroCuenta);
        System.out.println("Titular: " + titular);
        System.out.println("Saldo: $" + saldo);
    }
}

// Cuenta de ahorros - tiene interés
public class CuentaAhorros extends CuentaBancaria {
    private double tasaInteres; // 5% = 0.05
    
    public CuentaAhorros(String numeroCuenta, String titular, double saldoInicial, double tasaInteres) {
        super(numeroCuenta, titular, saldoInicial);
        this.tasaInteres = tasaInteres;
    }
    
    public void aplicarInteres() {
        double interes = saldo * tasaInteres;
        saldo += interes;
        System.out.println("Interés aplicado: $" + interes + ". Nuevo saldo: $" + saldo);
    }
    
    @Override
    public void mostrarInfo() {
        super.mostrarInfo();
        System.out.println("Tasa de interés: " + (tasaInteres * 100) + "%");
    }
}

// Cuenta corriente - puede sobregirarse
public class CuentaCorriente extends CuentaBancaria {
    private double limiteCredito;
    
    public CuentaCorriente(String numeroCuenta, String titular, double saldoInicial, double limiteCredito) {
        super(numeroCuenta, titular, saldoInicial);
        this.limiteCredito = limiteCredito;
    }
    
    @Override
    public void retirar(double cantidad) {
        if (cantidad > 0 && cantidad <= (saldo + limiteCredito)) {
            saldo -= cantidad;
            System.out.println("Retiro: $" + cantidad + ". Nuevo saldo: $" + saldo);
        } else {
            System.out.println("Excede el límite de crédito");
        }
    }
    
    @Override
    public void mostrarInfo() {
        super.mostrarInfo();
        System.out.println("Límite de crédito: $" + limiteCredito);
    }
}

// Uso
public class Main {
    public static void main(String[] args) {
        CuentaAhorros ahorros = new CuentaAhorros("AH001", "Ana García", 10000, 0.05);
        CuentaCorriente corriente = new CuentaCorriente("CC001", "Carlos López", 5000, 2000);
        
        System.out.println("=== CUENTA DE AHORROS ===");
        ahorros.mostrarInfo();
        ahorros.aplicarInteres();
        System.out.println();
        
        System.out.println("=== CUENTA CORRIENTE ===");
        corriente.mostrarInfo();
        corriente.retirar(6000); // Usa crédito
        corriente.mostrarInfo();
    }
}
```

## 🔄 Cadenas de Herencia

```java
public class Ser {
    public void vivir() {
        System.out.println("Ser vivo");
    }
}

public class Animal extends Ser {
    public void moverse() {
        System.out.println("El animal se mueve");
    }
}

public class Mamifero extends Animal {
    public void amamantar() {
        System.out.println("El mamífero amamanta");
    }
}

public class Perro extends Mamifero {
    public void ladrar() {
        System.out.println("El perro ladra");
    }
}

// Uso
Perro perro = new Perro();
perro.vivir();      // De Ser
perro.moverse();    // De Animal
perro.amamantar();  // De Mamifero
perro.ladrar();     // De Perro
```

## ⚙️ Funcionamiento Interno

### Constructor Chaining

Cuando creas un objeto de una clase derivada, se ejecutan **todos los constructores de la cadena de herencia**:

```java
public class A {
    public A() {
        System.out.println("Constructor A");
    }
}

public class B extends A {
    public B() {
        super(); // Implícito si no lo pones
        System.out.println("Constructor B");
    }
}

public class C extends B {
    public C() {
        super(); // Implícito
        System.out.println("Constructor C");
    }
}

// Uso
C obj = new C();
// Salida:
// Constructor A
// Constructor B
// Constructor C
```

### Method Dispatch

Java usa **dynamic method dispatch** para decidir qué versión de un método sobrescrito ejecutar:

```java
Animal animal = new Perro(); // Referencia Animal, objeto Perro
animal.hacerSonido(); // Llama al método de Perro, no de Animal
```

## ⚠️ Errores Comunes

### 1. No llamar a super() cuando el padre no tiene constructor sin argumentos

```java
public class Padre {
    private int valor;
    
    public Padre(int valor) { // No hay constructor sin argumentos
        this.valor = valor;
    }
}

public class Hijo extends Padre {
    public Hijo() {
        // ❌ Error: no hay constructor Padre()
    }
    
    // ✅ Correcto
    public Hijo(int valor) {
        super(valor);
    }
}
```

### 2. Sobrescribir con modificador de acceso más restrictivo

```java
public class Padre {
    public void metodo() { }
}

public class Hijo extends Padre {
    // ❌ Error: no puedes hacer más restrictivo
    private void metodo() { }
    
    // ✅ Correcto: igual o menos restrictivo
    public void metodo() { }
}
```

### 3. Olvidar @Override

```java
public class Padre {
    public void calcular() { }
}

public class Hijo extends Padre {
    // ❌ Typo - crea nuevo método en lugar de sobrescribir
    public void calular() { }
    
    // ✅ @Override detecta el error
    @Override
    public void calcular() { }
}
```

## 💪 Ejercicios Prácticos

### Ejercicio 1: Jerarquía de Vehículos
**Dificultad**: Medio

Crea una jerarquía: `Vehiculo` (base) → `Coche` y `Moto` (derivadas).

<details>
<summary>✅ Solución</summary>

```java
public class Vehiculo {
    protected String marca;
    protected int año;
    
    public Vehiculo(String marca, int año) {
        this.marca = marca;
        this.año = año;
    }
    
    public void mostrarInfo() {
        System.out.println("Marca: " + marca + ", Año: " + año);
    }
}

public class Coche extends Vehiculo {
    private int numPuertas;
    
    public Coche(String marca, int año, int numPuertas) {
        super(marca, año);
        this.numPuertas = numPuertas;
    }
    
    @Override
    public void mostrarInfo() {
        super.mostrarInfo();
        System.out.println("Puertas: " + numPuertas);
    }
}

public class Moto extends Vehiculo {
    private boolean tieneSidecar;
    
    public Moto(String marca, int año, boolean tieneSidecar) {
        super(marca, año);
        this.tieneSidecar = tieneSidecar;
    }
    
    @Override
    public void mostrarInfo() {
        super.mostrarInfo();
        System.out.println("Sidecar: " + (tieneSidecar ? "Sí" : "No"));
    }
}
```
</details>

### Ejercicio 2: Sistema de Productos
**Dificultad**: Medio

Crea `Producto` (base) → `ProductoPerecible` y `ProductoElectronico` con atributos específicos.

<details>
<summary>✅ Solución</summary>

```java
import java.time.LocalDate;

public class Producto {
    protected String nombre;
    protected double precio;
    
    public Producto(String nombre, double precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
    
    public void mostrarInfo() {
        System.out.println("Producto: " + nombre + " - $" + precio);
    }
}

public class ProductoPerecible extends Producto {
    private LocalDate fechaExpiracion;
    
    public ProductoPerecible(String nombre, double precio, LocalDate fechaExpiracion) {
        super(nombre, precio);
        this.fechaExpiracion = fechaExpiracion;
    }
    
    public boolean estaVencido() {
        return LocalDate.now().isAfter(fechaExpiracion);
    }
    
    @Override
    public void mostrarInfo() {
        super.mostrarInfo();
        System.out.println("Vence: " + fechaExpiracion);
        System.out.println("Estado: " + (estaVencido() ? "VENCIDO" : "Vigente"));
    }
}

public class ProductoElectronico extends Producto {
    private int garantiaMeses;
    
    public ProductoElectronico(String nombre, double precio, int garantiaMeses) {
        super(nombre, precio);
        this.garantiaMeses = garantiaMeses;
    }
    
    @Override
    public void mostrarInfo() {
        super.mostrarInfo();
        System.out.println("Garantía: " + garantiaMeses + " meses");
    }
}
```
</details>

## 🎯 Cuándo Usar Herencia

✅ **Usar herencia cuando**:
- Hay una clara relación "es-un"
- Quieres reutilizar código
- Las clases tienen comportamiento común

❌ **No usar herencia cuando**:
- La relación es "tiene-un" (usa composición)
- No hay relación lógica entre clases
- Solo quieres reutilizar algunos métodos

## 🔗 Temas Relacionados

- [POO - Clases](../basico/poo-clases)
- [Polimorfismo](./polimorfismo)
- [Interfaces](./interfaces)
- [Clases Abstractas](./clases-abstractas)

## 📚 Recursos Adicionales

- [Inheritance - Oracle](https://docs.oracle.com/javase/tutorial/java/IandI/subclasses.html)
- [Override and Overload](https://docs.oracle.com/javase/tutorial/java/IandI/override.html)
