---
title: "Programación Orientada a Objetos - Clases y Objetos"
level: basico
category: poo
tags: [poo, clases, objetos, constructores, encapsulacion, this]
duration: 35min
prerequisites: [funciones, arrays]
---

# Programación Orientada a Objetos - Clases y Objetos

## 📋 ¿Qué es la POO?

La **Programación Orientada a Objetos (POO)** es un paradigma de programación que organiza el código en **objetos** que contienen datos (atributos) y comportamientos (métodos).

### 🎯 Conceptos Clave

- **Clase**: Plantilla o molde para crear objetos
- **Objeto**: Instancia concreta de una clase
- **Atributos**: Datos que pertenecen al objeto
- **Métodos**: Acciones que puede realizar el objeto

## 💡 Tu Primera Clase

### Crear una Clase Simple

```java
public class Persona {
    // Atributos (datos)
    String nombre;
    int edad;
    
    // Método (comportamiento)
    void saludar() {
        System.out.println("Hola, soy " + nombre);
    }
}

// Usar la clase
public class Main {
    public static void main(String[] args) {
        // Crear objeto (instanciar)
        Persona persona1 = new Persona();
        
        // Asignar valores
        persona1.nombre = "Ana";
        persona1.edad = 25;
        
        // Llamar método
        persona1.saludar(); // Hola, soy Ana
    }
}
```

## 🏗️ Constructores

Los **constructores** inicializan objetos al crearlos.

### Constructor por Defecto

```java
public class Persona {
    String nombre;
    int edad;
    
    // Constructor
    public Persona(String nombre, int edad) {
        this.nombre = nombre;
        this.edad = edad;
    }
    
    void mostrarInfo() {
        System.out.println("Nombre: " + nombre + ", Edad: " + edad);
    }
}

// Uso
public class Main {
    public static void main(String[] args) {
        Persona p1 = new Persona("Carlos", 30);
        p1.mostrarInfo(); // Nombre: Carlos, Edad: 30
    }
}
```

### Múltiples Constructores (Sobrecarga)

```java
public class Persona {
    String nombre;
    int edad;
    String ciudad;
    
    // Constructor 1: solo nombre
    public Persona(String nombre) {
        this.nombre = nombre;
        this.edad = 0;
        this.ciudad = "Desconocida";
    }
    
    // Constructor 2: nombre y edad
    public Persona(String nombre, int edad) {
        this.nombre = nombre;
        this.edad = edad;
        this.ciudad = "Desconocida";
    }
    
    // Constructor 3: todos los datos
    public Persona(String nombre, int edad, String ciudad) {
        this.nombre = nombre;
        this.edad = edad;
        this.ciudad = ciudad;
    }
    
    void mostrarInfo() {
        System.out.println(nombre + ", " + edad + " años, " + ciudad);
    }
}

// Uso
public class Main {
    public static void main(String[] args) {
        Persona p1 = new Persona("Ana");
        Persona p2 = new Persona("Carlos", 30);
        Persona p3 = new Persona("María", 28, "Madrid");
        
        p1.mostrarInfo(); // Ana, 0 años, Desconocida
        p2.mostrarInfo(); // Carlos, 30 años, Desconocida
        p3.mostrarInfo(); // María, 28 años, Madrid
    }
}
```

## 🔒 Encapsulación

Ocultar los detalles internos y exponer solo lo necesario.

### Modificadores de Acceso

```java
public class CuentaBancaria {
    // private: solo accesible dentro de la clase
    private double saldo;
    private String numeroCuenta;
    
    // public: accesible desde cualquier lugar
    public CuentaBancaria(String numeroCuenta, double saldoInicial) {
        this.numeroCuenta = numeroCuenta;
        this.saldo = saldoInicial;
    }
    
    // Getter: obtener valor
    public double getSaldo() {
        return saldo;
    }
    
    // Setter: modificar valor con validación
    public void depositar(double cantidad) {
        if (cantidad > 0) {
            saldo += cantidad;
            System.out.println("Depósito exitoso. Nuevo saldo: " + saldo);
        } else {
            System.out.println("Cantidad inválida");
        }
    }
    
    public void retirar(double cantidad) {
        if (cantidad > 0 && cantidad <= saldo) {
            saldo -= cantidad;
            System.out.println("Retiro exitoso. Nuevo saldo: " + saldo);
        } else {
            System.out.println("Fondos insuficientes o cantidad inválida");
        }
    }
}

// Uso
public class Main {
    public static void main(String[] args) {
        CuentaBancaria cuenta = new CuentaBancaria("123456", 1000);
        
        // cuenta.saldo = 5000; // ❌ Error: saldo es private
        
        System.out.println("Saldo: " + cuenta.getSaldo()); // ✅ Usar getter
        cuenta.depositar(500);  // Saldo: 1500
        cuenta.retirar(200);    // Saldo: 1300
    }
}
```

### ⚙️ Por qué Encapsular

```java
public class SinEncapsulacion {
    public int edad;
    
    // ❌ Cualquiera puede poner valores inválidos
}

public class ConEncapsulacion {
    private int edad;
    
    public void setEdad(int edad) {
        // ✅ Validación
        if (edad >= 0 && edad <= 150) {
            this.edad = edad;
        } else {
            System.out.println("Edad inválida");
        }
    }
    
    public int getEdad() {
        return edad;
    }
}
```

## 🔑 Palabra Clave `this`

`this` se refiere al objeto actual.

### Uso 1: Diferenciar Atributos de Parámetros

```java
public class Persona {
    private String nombre;
    
    public Persona(String nombre) {
        this.nombre = nombre; // this.nombre = atributo, nombre = parámetro
    }
}
```

### Uso 2: Llamar a Otro Constructor

```java
public class Persona {
    private String nombre;
    private int edad;
    private String ciudad;
    
    public Persona(String nombre) {
        this(nombre, 0, "Desconocida"); // Llama al constructor completo
    }
    
    public Persona(String nombre, int edad) {
        this(nombre, edad, "Desconocida");
    }
    
    public Persona(String nombre, int edad, String ciudad) {
        this.nombre = nombre;
        this.edad = edad;
        this.ciudad = ciudad;
    }
}
```

### Uso 3: Pasar el Objeto Actual

```java
public class Persona {
    private String nombre;
    
    public Persona(String nombre) {
        this.nombre = nombre;
    }
    
    public Persona obtenerEsteObjeto() {
        return this; // Retorna el objeto actual
    }
}
```

## 📝 Ejemplo Completo: Clase Producto

```java
public class Producto {
    // Atributos privados
    private String nombre;
    private double precio;
    private int stock;
    
    // Constructor
    public Producto(String nombre, double precio, int stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
    
    // Getters
    public String getNombre() {
        return nombre;
    }
    
    public double getPrecio() {
        return precio;
    }
    
    public int getStock() {
        return stock;
    }
    
    // Setters con validación
    public void setPrecio(double precio) {
        if (precio > 0) {
            this.precio = precio;
        }
    }
    
    public void setStock(int stock) {
        if (stock >= 0) {
            this.stock = stock;
        }
    }
    
    // Métodos de negocio
    public boolean hayStock() {
        return stock > 0;
    }
    
    public void vender(int cantidad) {
        if (cantidad <= stock) {
            stock -= cantidad;
            System.out.println("Venta exitosa. Stock restante: " + stock);
        } else {
            System.out.println("Stock insuficiente");
        }
    }
    
    public void reabastecer(int cantidad) {
        stock += cantidad;
        System.out.println("Reabastecido. Nuevo stock: " + stock);
    }
    
    public double calcularValorInventario() {
        return precio * stock;
    }
    
    public void mostrarInfo() {
        System.out.println("Producto: " + nombre);
        System.out.println("Precio: $" + precio);
        System.out.println("Stock: " + stock);
        System.out.println("Valor total: $" + calcularValorInventario());
    }
}

// Uso
public class Main {
    public static void main(String[] args) {
        Producto laptop = new Producto("Laptop Dell", 1200.0, 15);
        
        laptop.mostrarInfo();
        System.out.println();
        
        laptop.vender(3);
        laptop.reabastecer(10);
        
        System.out.println("\nStock disponible: " + laptop.hayStock());
        laptop.mostrarInfo();
    }
}
```

**Salida**:
```
Producto: Laptop Dell
Precio: $1200.0
Stock: 15
Valor total: $18000.0

Venta exitosa. Stock restante: 12
Reabastecido. Nuevo stock: 22

Stock disponible: true
Producto: Laptop Dell
Precio: $1200.0
Stock: 22
Valor total: $26400.0
```

## 🎨 Métodos Static vs de Instancia

### Métodos de Instancia

```java
public class Calculadora {
    private int numero;
    
    public Calculadora(int numero) {
        this.numero = numero;
    }
    
    // Método de instancia: necesita un objeto
    public int sumar(int otro) {
        return this.numero + otro;
    }
}

// Uso
Calculadora calc = new Calculadora(10);
System.out.println(calc.sumar(5)); // 15
```

### Métodos Estáticos (static)

```java
public class Utilidades {
    // Método estático: NO necesita objeto
    public static int sumar(int a, int b) {
        return a + b;
    }
    
    public static double calcularPromedio(int[] numeros) {
        int suma = 0;
        for (int num : numeros) {
            suma += num;
        }
        return (double) suma / numeros.length;
    }
}

// Uso (sin crear objeto)
System.out.println(Utilidades.sumar(5, 3)); // 8
int[] notas = {85, 90, 78};
System.out.println(Utilidades.calcularPromedio(notas)); // 84.33
```

### Cuándo Usar Cada Uno

| Tipo | Cuándo Usar |
|------|-------------|
| **Instancia** | Necesita datos del objeto (atributos) |
| **Static** | Operación independiente del objeto, utilidades |

## 📦 Ejemplo: Sistema de Biblioteca

```java
public class Libro {
    private String titulo;
    private String autor;
    private boolean prestado;
    
    public Libro(String titulo, String autor) {
        this.titulo = titulo;
        this.autor = autor;
        this.prestado = false;
    }
    
    public String getTitulo() {
        return titulo;
    }
    
    public String getAutor() {
        return autor;
    }
    
    public boolean estaPrestado() {
        return prestado;
    }
    
    public boolean prestar() {
        if (!prestado) {
            prestado = true;
            System.out.println("Libro '" + titulo + "' prestado");
            return true;
        }
        System.out.println("El libro ya está prestado");
        return false;
    }
    
    public void devolver() {
        if (prestado) {
            prestado = false;
            System.out.println("Libro '" + titulo + "' devuelto");
        } else {
            System.out.println("Este libro no estaba prestado");
        }
    }
    
    public void mostrarInfo() {
        String estado = prestado ? "Prestado" : "Disponible";
        System.out.println("'" + titulo + "' por " + autor + " - " + estado);
    }
}

public class Main {
    public static void main(String[] args) {
        Libro libro1 = new Libro("1984", "George Orwell");
        Libro libro2 = new Libro("El Quijote", "Cervantes");
        
        libro1.mostrarInfo();
        libro2.mostrarInfo();
        
        System.out.println();
        libro1.prestar();
        libro1.prestar(); // Intenta prestar de nuevo
        
        System.out.println();
        libro1.devolver();
        libro1.mostrarInfo();
    }
}
```

## ⚠️ Errores Comunes

### 1. Olvidar Inicializar Objetos

```java
// ❌ Mal
Persona p;
p.saludar(); // NullPointerException

// ✅ Correcto
Persona p = new Persona("Ana", 25);
p.saludar();
```

### 2. Confundir Clase con Objeto

```java
// ❌ Mal - Persona es la clase, no un objeto
Persona.saludar();

// ✅ Correcto - necesitas crear un objeto
Persona p = new Persona("Ana", 25);
p.saludar();
```

### 3. No Validar en Setters

```java
// ❌ Mal
public void setEdad(int edad) {
    this.edad = edad; // Permite valores negativos
}

// ✅ Correcto
public void setEdad(int edad) {
    if (edad >= 0 && edad <= 150) {
        this.edad = edad;
    }
}
```

## 💪 Ejercicios Prácticos

### Ejercicio 1: Clase Rectángulo
**Dificultad**: Fácil

Crea una clase `Rectangulo` con base y altura, y métodos para calcular área y perímetro.

<details>
<summary>✅ Solución</summary>

```java
public class Rectangulo {
    private double base;
    private double altura;
    
    public Rectangulo(double base, double altura) {
        this.base = base;
        this.altura = altura;
    }
    
    public double calcularArea() {
        return base * altura;
    }
    
    public double calcularPerimetro() {
        return 2 * (base + altura);
    }
    
    public void mostrarInfo() {
        System.out.println("Rectángulo " + base + "x" + altura);
        System.out.println("Área: " + calcularArea());
        System.out.println("Perímetro: " + calcularPerimetro());
    }
    
    public static void main(String[] args) {
        Rectangulo rect = new Rectangulo(5, 3);
        rect.mostrarInfo();
        // Área: 15.0
        // Perímetro: 16.0
    }
}
```
</details>

### Ejercicio 2: Clase Estudiante
**Dificultad**: Medio

Crea una clase `Estudiante` que almacene nombre y un array de notas, con método para calcular promedio.

<details>
<summary>✅ Solución</summary>

```java
public class Estudiante {
    private String nombre;
    private int[] notas;
    
    public Estudiante(String nombre, int[] notas) {
        this.nombre = nombre;
        this.notas = notas;
    }
    
    public double calcularPromedio() {
        int suma = 0;
        for (int nota : notas) {
            suma += nota;
        }
        return (double) suma / notas.length;
    }
    
    public String getEstado() {
        double promedio = calcularPromedio();
        return promedio >= 60 ? "Aprobado" : "Reprobado";
    }
    
    public void mostrarInfo() {
        System.out.println("Estudiante: " + nombre);
        System.out.println("Promedio: " + calcularPromedio());
        System.out.println("Estado: " + getEstado());
    }
    
    public static void main(String[] args) {
        int[] notas = {85, 90, 78, 92};
        Estudiante est = new Estudiante("Ana", notas);
        est.mostrarInfo();
    }
}
```
</details>

### Ejercicio 3: Clase Coche
**Dificultad**: Medio

Crea una clase `Coche` con marca, modelo, velocidad actual. Métodos: acelerar, frenar, mostrarVelocidad.

<details>
<summary>✅ Solución</summary>

```java
public class Coche {
    private String marca;
    private String modelo;
    private int velocidad;
    private static final int VELOCIDAD_MAXIMA = 200;
    
    public Coche(String marca, String modelo) {
        this.marca = marca;
        this.modelo = modelo;
        this.velocidad = 0;
    }
    
    public void acelerar(int incremento) {
        if (velocidad + incremento <= VELOCIDAD_MAXIMA) {
            velocidad += incremento;
            System.out.println("Acelerando... Velocidad: " + velocidad + " km/h");
        } else {
            velocidad = VELOCIDAD_MAXIMA;
            System.out.println("Velocidad máxima alcanzada: " + VELOCIDAD_MAXIMA + " km/h");
        }
    }
    
    public void frenar(int decremento) {
        if (velocidad - decremento >= 0) {
            velocidad -= decremento;
            System.out.println("Frenando... Velocidad: " + velocidad + " km/h");
        } else {
            velocidad = 0;
            System.out.println("Coche detenido");
        }
    }
    
    public void mostrarInfo() {
        System.out.println(marca + " " + modelo + " - " + velocidad + " km/h");
    }
    
    public static void main(String[] args) {
        Coche coche = new Coche("Toyota", "Corolla");
        coche.mostrarInfo();
        coche.acelerar(50);
        coche.acelerar(80);
        coche.frenar(30);
        coche.mostrarInfo();
    }
}
```
</details>

## 🎯 Principios de POO

| Principio | Descripción |
|-----------|-------------|
| **Encapsulación** | Ocultar detalles internos (private) |
| **Abstracción** | Mostrar solo lo esencial |
| **Responsabilidad única** | Cada clase debe tener un propósito claro |

## 🔗 Temas Relacionados

- [Funciones](./funciones)
- [Herencia](../intermedio/herencia)
- [Polimorfismo](../intermedio/polimorfismo)

## 📚 Recursos Adicionales

- [OOP Concepts - Oracle](https://docs.oracle.com/javase/tutorial/java/concepts/)
- [Classes and Objects](https://docs.oracle.com/javase/tutorial/java/javaOO/classes.html)
