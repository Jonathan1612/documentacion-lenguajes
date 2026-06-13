---
title: "Pattern Matching"
level: avanzado
category: modern-java
tags: [java, pattern-matching, java17, java21, switch, instanceof]
duration: 35min
prerequisites: [control-flujo, poo-clases, sealed-classes, records]
---

# Pattern Matching (Java 16+)

## 📋 ¿Qué es Pattern Matching?

**Pattern matching** permite extraer componentes de un objeto y verificar su tipo en una sola operación, eliminando código repetitivo de casting y condicionales.

> 💡 **Evolución**: Java 16 (instanceof), Java 17 (switch con sealed classes), Java 21 (record patterns)

## 🎯 ¿Para qué sirve?

- **Código más conciso**: Menos casting manual
- **Type-safe**: El compilador verifica tipos
- **Extracción de datos**: Deconstruir records y objetos
- **Switch expressions mejorado**: Patrones en lugar de constantes
- **Exhaustividad**: El compilador verifica todos los casos

## 💡 Pattern Matching con instanceof

### Antes (Java 15-)

```java
// Forma antigua - Verbose
if (obj instanceof String) {
    String str = (String) obj; // Cast manual
    System.out.println(str.toUpperCase());
}
```

### Ahora (Java 16+)

```java
// Pattern matching - Conciso
if (obj instanceof String str) {
    System.out.println(str.toUpperCase()); // str ya está casteado
}

// Con condiciones adicionales
if (obj instanceof String str && str.length() > 5) {
    System.out.println("String larga: " + str);
}
```

## 🔄 Switch Expressions con Patterns (Java 17+)

### Switch Tradicional

```java
// Antes
String formatear(Object obj) {
    String result;
    if (obj instanceof Integer) {
        result = String.format("int %d", obj);
    } else if (obj instanceof Long) {
        result = String.format("long %d", obj);
    } else if (obj instanceof Double) {
        result = String.format("double %f", obj);
    } else if (obj instanceof String) {
        result = String.format("String %s", obj);
    } else {
        result = obj.toString();
    }
    return result;
}
```

### Switch con Pattern Matching

```java
// Ahora - Mucho más limpio
String formatear(Object obj) {
    return switch (obj) {
        case Integer i -> String.format("int %d", i);
        case Long l -> String.format("long %d", l);
        case Double d -> String.format("double %f", d);
        case String s -> String.format("String %s", s);
        default -> obj.toString();
    };
}
```

## 📊 Record Patterns (Java 21+)

### Deconstrucción de Records

```java
record Punto(int x, int y) {}

record Circulo(Punto centro, int radio) {}

// Deconstrucción anidada
void imprimirCirculo(Object obj) {
    if (obj instanceof Circulo(Punto(int x, int y), int radio)) {
        System.out.println("Círculo en (" + x + ", " + y + ") con radio " + radio);
    }
}

// En switch
String describir(Object forma) {
    return switch (forma) {
        case Circulo(Punto(int x, int y), int radio) ->
            String.format("Círculo en (%d, %d) radio %d", x, y, radio);
        case Punto(int x, int y) ->
            String.format("Punto (%d, %d)", x, y);
        default -> "Forma desconocida";
    };
}
```

### Ejemplo Completo: Procesador de Comandos

```java
sealed interface Comando permits Crear, Leer, Actualizar, Eliminar {}

record Crear(String entidad, Map<String, Object> datos) implements Comando {}
record Leer(String entidad, String id) implements Comando {}
record Actualizar(String entidad, String id, Map<String, Object> datos) implements Comando {}
record Eliminar(String entidad, String id) implements Comando {}

class ProcesadorComandos {
    void ejecutar(Comando cmd) {
        switch (cmd) {
            case Crear(var entidad, var datos) ->
                System.out.println("Creando " + entidad + " con datos: " + datos);
            
            case Leer(var entidad, var id) ->
                System.out.println("Leyendo " + entidad + " con ID: " + id);
            
            case Actualizar(var entidad, var id, var datos) ->
                System.out.println("Actualizando " + entidad + " " + id + ": " + datos);
            
            case Eliminar(var entidad, var id) ->
                System.out.println("Eliminando " + entidad + " con ID: " + id);
        }
        // ¡No necesita default! Sealed interface es exhaustiva
    }
    
    public static void main(String[] args) {
        ProcesadorComandos proc = new ProcesadorComandos();
        
        proc.ejecutar(new Crear("Usuario", Map.of("nombre", "Ana")));
        proc.ejecutar(new Leer("Usuario", "123"));
        proc.ejecutar(new Actualizar("Usuario", "123", Map.of("edad", 25)));
        proc.ejecutar(new Eliminar("Usuario", "123"));
    }
}
```

## 🎭 Guarded Patterns

```java
// Patrones con condiciones adicionales
String clasificarNumero(Object obj) {
    return switch (obj) {
        case Integer i when i > 0 -> "Positivo: " + i;
        case Integer i when i < 0 -> "Negativo: " + i;
        case Integer i -> "Cero";
        case Double d when d > 100.0 -> "Grande: " + d;
        case Double d -> "Normal: " + d;
        default -> "No es número";
    };
}

// Uso
System.out.println(clasificarNumero(42));    // Positivo: 42
System.out.println(clasificarNumero(-10));   // Negativo: -10
System.out.println(clasificarNumero(150.5)); // Grande: 150.5
```

## 📋 Ejemplo Completo: Sistema de Mensajes

```java
sealed interface Mensaje {}

record TextoMensaje(String remitente, String contenido) implements Mensaje {}
record ImagenMensaje(String remitente, String url, int ancho, int alto) implements Mensaje {}
record AudioMensaje(String remitente, String url, int duracionSegundos) implements Mensaje {}
record VideoMensaje(String remitente, String url, int duracionSegundos, int resolucion) implements Mensaje {}

class ProcesadorMensajes {
    void procesar(Mensaje msg) {
        String resultado = switch (msg) {
            case TextoMensaje(var remitente, var contenido) -> {
                if (contenido.length() > 200) {
                    yield remitente + ": [texto largo]";
                }
                yield remitente + ": " + contenido;
            }
            
            case ImagenMensaje(var remitente, var url, var ancho, var alto) 
                when ancho * alto > 1920 * 1080 ->
                remitente + " envió imagen HD: " + url;
            
            case ImagenMensaje(var remitente, var url, _, _) ->
                remitente + " envió imagen: " + url;
            
            case AudioMensaje(var remitente, _, var duracion) 
                when duracion > 300 ->
                remitente + " envió audio largo (" + (duracion / 60) + " min)";
            
            case AudioMensaje(var remitente, _, var duracion) ->
                remitente + " envió audio (" + duracion + "s)";
            
            case VideoMensaje(var remitente, _, var duracion, var res) ->
                String.format("%s envió video %dp (%ds)", 
                    remitente, res, duracion);
        };
        
        System.out.println(resultado);
    }
    
    public static void main(String[] args) {
        ProcesadorMensajes proc = new ProcesadorMensajes();
        
        proc.procesar(new TextoMensaje("Ana", "Hola!"));
        proc.procesar(new ImagenMensaje("Pedro", "foto.jpg", 1920, 1080));
        proc.procesar(new ImagenMensaje("Juan", "grande.jpg", 3840, 2160));
        proc.procesar(new AudioMensaje("María", "nota.mp3", 45));
        proc.procesar(new AudioMensaje("Carlos", "podcast.mp3", 3600));
        proc.procesar(new VideoMensaje("Laura", "video.mp4", 120, 1080));
    }
}
```

## 🌳 Ejemplo: Evaluador de Expresiones

```java
sealed interface Expr {}
record Constante(int valor) implements Expr {}
record Suma(Expr izq, Expr der) implements Expr {}
record Mult(Expr izq, Expr der) implements Expr {}
record Negacion(Expr expr) implements Expr {}

class Evaluador {
    int evaluar(Expr e) {
        return switch (e) {
            case Constante(int v) -> v;
            case Suma(var izq, var der) -> evaluar(izq) + evaluar(der);
            case Mult(var izq, var der) -> evaluar(izq) * evaluar(der);
            case Negacion(var expr) -> -evaluar(expr);
        };
    }
    
    String aString(Expr e) {
        return switch (e) {
            case Constante(int v) -> String.valueOf(v);
            case Suma(var izq, var der) -> 
                "(" + aString(izq) + " + " + aString(der) + ")";
            case Mult(var izq, var der) -> 
                "(" + aString(izq) + " * " + aString(der) + ")";
            case Negacion(var expr) -> "-(" + aString(expr) + ")";
        };
    }
    
    public static void main(String[] args) {
        Evaluador eval = new Evaluador();
        
        // (3 + 5) * 2 - (-4)
        Expr expr = new Suma(
            new Mult(
                new Suma(new Constante(3), new Constante(5)),
                new Constante(2)
            ),
            new Negacion(new Constante(-4))
        );
        
        System.out.println("Expresión: " + eval.aString(expr));
        System.out.println("Resultado: " + eval.evaluar(expr));
    }
}
```

## ⚠️ Errores Comunes

> ❌ **Orden incorrecto de patrones**

```java
// ❌ INCORRECTO - El caso específico nunca se alcanza
String procesar(Object obj) {
    return switch (obj) {
        case Object o -> "Cualquier objeto";  // Atrapa todo
        case String s -> "String";            // ¡Nunca ejecutado!
    };
}

// ✅ CORRECTO - Específico antes que genérico
String procesar(Object obj) {
    return switch (obj) {
        case String s -> "String";
        case Integer i -> "Integer";
        case Object o -> "Otro objeto";
    };
}
```

## 💪 Ejercicio Práctico

### Sistema de Procesamiento de Pagos

```java
sealed interface EstadoPago {}
record Pendiente(double monto) implements EstadoPago {}
record Procesando(double monto, String transaccionId) implements EstadoPago {}
record Completado(double monto, String transaccionId, LocalDateTime fecha) implements EstadoPago {}
record Fallido(double monto, String error) implements EstadoPago {}

// Tu tarea: implementar procesarPago que retorne un mensaje descriptivo
```

<details>
<summary>✅ Solución</summary>

```java
String procesarPago(EstadoPago estado) {
    return switch (estado) {
        case Pendiente(double monto) ->
            String.format("⏳ Pago pendiente de $%.2f", monto);
        
        case Procesando(double monto, var txId) ->
            String.format("🔄 Procesando $%.2f (TX: %s)", monto, txId);
        
        case Completado(double monto, var txId, var fecha) ->
            String.format("✅ Completado $%.2f (TX: %s) el %s", 
                monto, txId, fecha);
        
        case Fallido(double monto, var error) when monto > 1000 ->
            String.format("❌ ALERTA: Falló pago grande de $%.2f - %s", 
                monto, error);
        
        case Fallido(double monto, var error) ->
            String.format("❌ Falló pago de $%.2f - %s", monto, error);
    };
}
```
</details>

## 🎯 Cuándo Usar Pattern Matching

| ✅ Usar cuando | ❌ Evitar cuando |
|---------------|-----------------|
| Múltiples tipos a manejar | Solo un tipo |
| Sealed hierarchies | Jerarquía abierta compleja |
| Extraer componentes de records | Objetos mutables complejos |
| Switch con tipos | Switch con valores simples |

## 🔗 Temas Relacionados

- [Sealed Classes](./sealed-classes)
- [Records](./records)
- [Control de Flujo](../basico/control-flujo)

## 📚 Recursos Adicionales

- [JEP 440: Record Patterns](https://openjdk.org/jeps/440)
- [JEP 441: Pattern Matching for switch](https://openjdk.org/jeps/441)
