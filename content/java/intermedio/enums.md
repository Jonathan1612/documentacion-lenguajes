---
title: "Enums en Java"
level: intermedio
category: tipos
tags: [enum, constantes, tipos-enumerados, enumset, enummap]
duration: 20min
prerequisites: [poo-clases, funciones]
---

# Enums en Java

## 📋 ¿Qué es un Enum?

Un **enum** (enumeración) es un tipo especial para representar un conjunto fijo de constantes. Es más seguro y expresivo que usar constantes numéricas o strings.

```java
// Sin enum - propenso a errores ❌
public class DiaSinEnum {
    public static final int LUNES = 1;
    public static final int MARTES = 2;
    public static final int MIERCOLES = 3;
    // ...
}

// Con enum - seguro y claro ✅
public enum Dia {
    LUNES, MARTES, MIERCOLES, JUEVES, VIERNES, SABADO, DOMINGO
}
```

## 💡 Crear y Usar Enums

### Enum Básico

```java
public enum DiaSemana {
    LUNES, MARTES, MIERCOLES, JUEVES, VIERNES, SABADO, DOMINGO
}

public class Main {
    public static void main(String[] args) {
        DiaSemana dia = DiaSemana.LUNES;
        
        System.out.println(dia); // LUNES
        
        // Switch con enum
        switch (dia) {
            case LUNES:
                System.out.println("Inicio de semana");
                break;
            case VIERNES:
                System.out.println("¡Casi fin de semana!");
                break;
            case SABADO:
            case DOMINGO:
                System.out.println("Fin de semana");
                break;
            default:
                System.out.println("Día laboral");
        }
    }
}
```

### Iterar sobre Enums

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Días de la semana:");
        for (DiaSemana dia : DiaSemana.values()) {
            System.out.println(dia);
        }
    }
}
```

**Salida**:
```
Días de la semana:
LUNES
MARTES
MIERCOLES
JUEVES
VIERNES
SABADO
DOMINGO
```

## 🔧 Enums con Atributos

Los enums pueden tener atributos, constructores y métodos.

```java
public enum Planeta {
    MERCURIO(3.303e+23, 2.4397e6),
    VENUS(4.869e+24, 6.0518e6),
    TIERRA(5.976e+24, 6.37814e6),
    MARTE(6.421e+23, 3.3972e6),
    JUPITER(1.9e+27, 7.1492e7),
    SATURNO(5.688e+26, 6.0268e7),
    URANO(8.686e+25, 2.5559e7),
    NEPTUNO(1.024e+26, 2.4746e7);
    
    private final double masa;   // en kilogramos
    private final double radio;  // en metros
    
    // Constructor privado
    private Planeta(double masa, double radio) {
        this.masa = masa;
        this.radio = radio;
    }
    
    // Getters
    public double getMasa() {
        return masa;
    }
    
    public double getRadio() {
        return radio;
    }
    
    // Métodos
    public double gravedadSuperficial() {
        double G = 6.67300E-11; // Constante gravitacional
        return G * masa / (radio * radio);
    }
}

public class Main {
    public static void main(String[] args) {
        Planeta tierra = Planeta.TIERRA;
        
        System.out.println("Planeta: " + tierra);
        System.out.println("Masa: " + tierra.getMasa() + " kg");
        System.out.println("Radio: " + tierra.getRadio() + " m");
        System.out.println("Gravedad: " + tierra.gravedadSuperficial() + " m/s²");
        
        System.out.println("\nTodos los planetas:");
        for (Planeta p : Planeta.values()) {
            System.out.printf("%s - Gravedad: %.2f m/s²%n", 
                p, p.gravedadSuperficial());
        }
    }
}
```

## 📊 Ejemplo Completo: Niveles de Log

```java
public enum NivelLog {
    DEBUG(1, "🔍"),
    INFO(2, "ℹ️"),
    WARNING(3, "⚠️"),
    ERROR(4, "❌"),
    FATAL(5, "💀");
    
    private final int severidad;
    private final String icono;
    
    private NivelLog(int severidad, String icono) {
        this.severidad = severidad;
        this.icono = icono;
    }
    
    public int getSeveridad() {
        return severidad;
    }
    
    public String getIcono() {
        return icono;
    }
    
    public boolean esMasSeveroQue(NivelLog otro) {
        return this.severidad > otro.severidad;
    }
}

public class Logger {
    private NivelLog nivelMinimo;
    
    public Logger(NivelLog nivelMinimo) {
        this.nivelMinimo = nivelMinimo;
    }
    
    public void log(NivelLog nivel, String mensaje) {
        if (nivel.getSeveridad() >= nivelMinimo.getSeveridad()) {
            System.out.println(nivel.getIcono() + " [" + nivel + "] " + mensaje);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Logger logger = new Logger(NivelLog.INFO);
        
        logger.log(NivelLog.DEBUG, "Depurando...");        // No se muestra (DEBUG < INFO)
        logger.log(NivelLog.INFO, "Aplicación iniciada");  // ℹ️ [INFO] Aplicación iniciada
        logger.log(NivelLog.WARNING, "Memoria baja");      // ⚠️ [WARNING] Memoria baja
        logger.log(NivelLog.ERROR, "Conexión fallida");    // ❌ [ERROR] Conexión fallida
    }
}
```

## 🎯 Enums con Métodos Abstractos

Cada constante puede tener su propia implementación.

```java
public enum Operacion {
    SUMA {
        @Override
        public double aplicar(double a, double b) {
            return a + b;
        }
    },
    RESTA {
        @Override
        public double aplicar(double a, double b) {
            return a - b;
        }
    },
    MULTIPLICACION {
        @Override
        public double aplicar(double a, double b) {
            return a * b;
        }
    },
    DIVISION {
        @Override
        public double aplicar(double a, double b) {
            if (b == 0) throw new ArithmeticException("División por cero");
            return a / b;
        }
    };
    
    // Método abstracto que cada constante debe implementar
    public abstract double aplicar(double a, double b);
}

public class Main {
    public static void main(String[] args) {
        double a = 10, b = 5;
        
        System.out.println("Operaciones con " + a + " y " + b + ":");
        for (Operacion op : Operacion.values()) {
            System.out.println(op + ": " + op.aplicar(a, b));
        }
    }
}
```

**Salida**:
```
Operaciones con 10.0 y 5.0:
SUMA: 15.0
RESTA: 5.0
MULTIPLICACION: 50.0
DIVISION: 2.0
```

## 🔍 Métodos Útiles de Enum

```java
public enum Estado {
    ACTIVO, INACTIVO, PENDIENTE
}

public class Main {
    public static void main(String[] args) {
        Estado estado = Estado.ACTIVO;
        
        // name() - nombre de la constante
        System.out.println(estado.name()); // ACTIVO
        
        // ordinal() - índice (0-based)
        System.out.println(estado.ordinal()); // 0
        
        // toString() - representación en string
        System.out.println(estado.toString()); // ACTIVO
        
        // valueOf() - obtener enum desde string
        Estado otro = Estado.valueOf("INACTIVO");
        System.out.println(otro); // INACTIVO
        
        // values() - array con todas las constantes
        Estado[] todos = Estado.values();
        System.out.println("Total estados: " + todos.length); // 3
        
        // compareTo() - comparar por ordinal
        System.out.println(Estado.ACTIVO.compareTo(Estado.INACTIVO)); // -1
    }
}
```

## 📦 EnumSet y EnumMap

### EnumSet - Conjunto eficiente de enums

```java
import java.util.EnumSet;

public enum Dia {
    LUNES, MARTES, MIERCOLES, JUEVES, VIERNES, SABADO, DOMINGO
}

public class Main {
    public static void main(String[] args) {
        // Crear EnumSet
        EnumSet<Dia> diasLaborales = EnumSet.of(Dia.LUNES, Dia.MARTES, 
                                                 Dia.MIERCOLES, Dia.JUEVES, Dia.VIERNES);
        
        EnumSet<Dia> finDeSemana = EnumSet.of(Dia.SABADO, Dia.DOMINGO);
        
        EnumSet<Dia> todosDias = EnumSet.allOf(Dia.class);
        
        // Operaciones
        System.out.println("¿LUNES es laboral? " + diasLaborales.contains(Dia.LUNES));   // true
        System.out.println("¿SABADO es laboral? " + diasLaborales.contains(Dia.SABADO)); // false
        
        // Range
        EnumSet<Dia> lunes_a_miercoles = EnumSet.range(Dia.LUNES, Dia.MIERCOLES);
        System.out.println(lunes_a_miercoles); // [LUNES, MARTES, MIERCOLES]
    }
}
```

### EnumMap - Mapa optimizado para enums

```java
import java.util.EnumMap;

public enum Dia {
    LUNES, MARTES, MIERCOLES, JUEVES, VIERNES, SABADO, DOMINGO
}

public class Main {
    public static void main(String[] args) {
        EnumMap<Dia, String> actividades = new EnumMap<>(Dia.class);
        
        actividades.put(Dia.LUNES, "Reunión de equipo");
        actividades.put(Dia.MIERCOLES, "Presentación cliente");
        actividades.put(Dia.VIERNES, "Code review");
        
        System.out.println("Actividad del LUNES: " + actividades.get(Dia.LUNES));
        
        System.out.println("\nCalendario semanal:");
        for (Dia dia : Dia.values()) {
            String actividad = actividades.getOrDefault(dia, "Trabajo normal");
            System.out.println(dia + ": " + actividad);
        }
    }
}
```

## 🎨 Ejemplo Real: Sistema de Estado de Pedido

```java
public enum EstadoPedido {
    PENDIENTE("En espera de confirmación", true),
    CONFIRMADO("Pedido confirmado", true),
    EN_PREPARACION("Preparando pedido", true),
    ENVIADO("En camino", true),
    ENTREGADO("Entregado", false),
    CANCELADO("Cancelado", false);
    
    private final String descripcion;
    private final boolean puedeModificar;
    
    private EstadoPedido(String descripcion, boolean puedeModificar) {
        this.descripcion = descripcion;
        this.puedeModificar = puedeModificar;
    }
    
    public String getDescripcion() {
        return descripcion;
    }
    
    public boolean puedeModificar() {
        return puedeModificar;
    }
    
    public boolean puedeTransicionarA(EstadoPedido nuevoEstado) {
        // Lógica de transiciones válidas
        switch (this) {
            case PENDIENTE:
                return nuevoEstado == CONFIRMADO || nuevoEstado == CANCELADO;
            case CONFIRMADO:
                return nuevoEstado == EN_PREPARACION || nuevoEstado == CANCELADO;
            case EN_PREPARACION:
                return nuevoEstado == ENVIADO || nuevoEstado == CANCELADO;
            case ENVIADO:
                return nuevoEstado == ENTREGADO;
            default:
                return false;
        }
    }
}

public class Pedido {
    private String id;
    private EstadoPedido estado;
    
    public Pedido(String id) {
        this.id = id;
        this.estado = EstadoPedido.PENDIENTE;
    }
    
    public void cambiarEstado(EstadoPedido nuevoEstado) {
        if (estado.puedeTransicionarA(nuevoEstado)) {
            System.out.println("✓ Pedido " + id + ": " + estado + " → " + nuevoEstado);
            estado = nuevoEstado;
        } else {
            System.out.println("✗ Transición inválida: " + estado + " → " + nuevoEstado);
        }
    }
    
    public void mostrarInfo() {
        System.out.println("\nPedido: " + id);
        System.out.println("Estado: " + estado);
        System.out.println("Descripción: " + estado.getDescripcion());
        System.out.println("¿Puede modificar?: " + estado.puedeModificar());
    }
}

public class Main {
    public static void main(String[] args) {
        Pedido pedido = new Pedido("PED-001");
        
        pedido.mostrarInfo();
        
        pedido.cambiarEstado(EstadoPedido.CONFIRMADO);
        pedido.cambiarEstado(EstadoPedido.EN_PREPARACION);
        pedido.cambiarEstado(EstadoPedido.ENVIADO);
        pedido.cambiarEstado(EstadoPedido.ENTREGADO);
        
        // Intento inválido
        pedido.cambiarEstado(EstadoPedido.PENDIENTE);
        
        pedido.mostrarInfo();
    }
}
```

## ⚙️ Funcionamiento Interno

### Los Enums son Clases Especiales

```java
// Este enum
public enum Color {
    ROJO, VERDE, AZUL
}

// Es equivalente a (simplificado)
public final class Color extends Enum<Color> {
    public static final Color ROJO = new Color("ROJO", 0);
    public static final Color VERDE = new Color("VERDE", 1);
    public static final Color AZUL = new Color("AZUL", 2);
    
    private Color(String name, int ordinal) {
        super(name, ordinal);
    }
    
    public static Color[] values() {
        return new Color[] { ROJO, VERDE, AZUL };
    }
    
    public static Color valueOf(String name) {
        // Buscar por nombre
    }
}
```

### Características Clave

- Son **final** (no se pueden extender)
- Heredan de `java.lang.Enum`
- Son **singleton** (una sola instancia por constante)
- Son **thread-safe**

## ⚠️ Errores Comunes

### 1. Usar == vs equals()

```java
// ✅ Ambos son válidos para enums
EstadoPedido estado = EstadoPedido.PENDIENTE;
if (estado == EstadoPedido.PENDIENTE) { }   // ✅ Preferido
if (estado.equals(EstadoPedido.PENDIENTE)) { } // ✅ Válido

// == es más seguro (no da NullPointerException)
```

### 2. Intentar extender un enum

```java
// ❌ Error: enums son final
public enum MiEnum extends OtroEnum { }

// ✅ Alternativa: usar interfaces
public interface Procesable {
    void procesar();
}

public enum Tarea implements Procesable {
    TAREA1 {
        public void procesar() { /* ... */ }
    }
}
```

### 3. Olvidar constructor privado

```java
public enum Estado {
    ACTIVO, INACTIVO;
    
    // ❌ Error: constructor debe ser private o default
    public Estado() { }
    
    // ✅ Correcto
    private Estado() { }
}
```

## 💪 Ejercicios Prácticos

### Ejercicio 1: Enum de Meses
**Dificultad**: Fácil

Crea enum `Mes` con días de cada mes y método para verificar si tiene 31 días.

<details>
<summary>✅ Solución</summary>

```java
public enum Mes {
    ENERO(31), FEBRERO(28), MARZO(31), ABRIL(30),
    MAYO(31), JUNIO(30), JULIO(31), AGOSTO(31),
    SEPTIEMBRE(30), OCTUBRE(31), NOVIEMBRE(30), DICIEMBRE(31);
    
    private final int dias;
    
    private Mes(int dias) {
        this.dias = dias;
    }
    
    public int getDias() {
        return dias;
    }
    
    public boolean tiene31Dias() {
        return dias == 31;
    }
}

public class Main {
    public static void main(String[] args) {
        for (Mes mes : Mes.values()) {
            System.out.println(mes + " tiene " + mes.getDias() + " días" +
                (mes.tiene31Dias() ? " ✓" : ""));
        }
    }
}
```
</details>

### Ejercicio 2: Enum de Tamaños
**Dificultad**: Medio

Crea enum `Tamaño` (S, M, L, XL) con precio adicional y método de descuento.

<details>
<summary>✅ Solución</summary>

```java
public enum Tamaño {
    S("Small", 0),
    M("Medium", 2),
    L("Large", 5),
    XL("Extra Large", 8);
    
    private final String descripcion;
    private final double precioAdicional;
    
    private Tamaño(String descripcion, double precioAdicional) {
        this.descripcion = descripcion;
        this.precioAdicional = precioAdicional;
    }
    
    public double getPrecioAdicional() {
        return precioAdicional;
    }
    
    public double calcularPrecioFinal(double precioBase) {
        return precioBase + precioAdicional;
    }
    
    @Override
    public String toString() {
        return descripcion + " (+$" + precioAdicional + ")";
    }
}

public class Main {
    public static void main(String[] args) {
        double precioBase = 20.0;
        
        System.out.println("Precio base: $" + precioBase);
        for (Tamaño tamaño : Tamaño.values()) {
            System.out.println(tamaño + " → $" + tamaño.calcularPrecioFinal(precioBase));
        }
    }
}
```
</details>

## 🎯 Cuándo Usar Enums

✅ **Usar enums cuando**:
- Tienes un conjunto fijo de constantes relacionadas
- Quieres type-safety (evitar valores inválidos)
- Necesitas asociar datos/comportamiento a constantes
- Implementas máquinas de estado

❌ **No usar enums cuando**:
- Los valores pueden cambiar en runtime
- El conjunto es muy grande o ilimitado
- Necesitas serialización custom compleja

## 🔗 Temas Relacionados

- [POO - Clases](../basico/poo-clases)
- [Collections](./collections)
- [Interfaces](./interfaces)

## 📚 Recursos Adicionales

- [Enum Types - Oracle](https://docs.oracle.com/javase/tutorial/java/javaOO/enum.html)
- [EnumSet and EnumMap](https://docs.oracle.com/javase/8/docs/technotes/guides/collections/overview.html)
