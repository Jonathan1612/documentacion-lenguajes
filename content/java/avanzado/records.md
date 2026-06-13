---
title: "Records - Clases de Datos"
level: avanzado
category: modern-java
tags: [java, records, java14, java16, data-classes, immutable]
duration: 25min
prerequisites: [poo-clases, interfaces, genericos]
---

# Records (Java 14+)

## 📋 ¿Qué son los Records?

Los **records** son un tipo especial de clase introducido en Java 14 (preview) y finalizado en Java 16, diseñados para ser **contenedores inmutables de datos**. Son la forma concisa de Java para crear clases que solo almacenan estado.

> 💡 **En una línea**: Records = Clases de datos inmutables con menos boilerplate

## 🎯 ¿Para qué sirven?

- **Eliminar boilerplate**: No más getters, equals, hashCode, toString manuales
- **Inmutabilidad garantizada**: Todos los campos son `final`
- **DTOs y Value Objects**: Transferir datos entre capas
- **Modelar datos estructurados**: Resultados de consultas, configuraciones
- **Claridad semántica**: Deja claro que es "solo datos"

## 🔑 Conceptos Clave

| Concepto | Descripción |
|----------|-------------|
| **Componentes** | Campos del record (automáticamente private final) |
| **Constructor canónico** | Constructor con todos los componentes |
| **Getters automáticos** | Sin prefijo `get` (nombre() en vez de getNombre()) |
| **Inmutabilidad** | No se puede modificar después de crear |
| **Herencia limitada** | No puede extender clases, solo implementar interfaces |

## 💡 Sintaxis Básica

### Record Simple

```java
// Antes (Java 8-13) - Mucho código
public final class Persona {
    private final String nombre;
    private final int edad;
    
    public Persona(String nombre, int edad) {
        this.nombre = nombre;
        this.edad = edad;
    }
    
    public String getNombre() { return nombre; }
    public int getEdad() { return edad; }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Persona persona = (Persona) o;
        return edad == persona.edad && 
               Objects.equals(nombre, persona.nombre);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(nombre, edad);
    }
    
    @Override
    public String toString() {
        return "Persona{nombre='" + nombre + "', edad=" + edad + "}";
    }
}

// Ahora (Java 16+) - UNA LÍNEA
public record Persona(String nombre, int edad) {}
```

### Uso

```java
// Crear instancia
Persona p1 = new Persona("Ana", 25);

// Acceder componentes (sin "get")
String nombre = p1.nombre();
int edad = p1.edad();

// toString automático
System.out.println(p1); // Persona[nombre=Ana, edad=25]

// equals y hashCode automáticos
Persona p2 = new Persona("Ana", 25);
System.out.println(p1.equals(p2)); // true
System.out.println(p1.hashCode() == p2.hashCode()); // true
```

## 📊 Ejemplos Completos

### Record con Validación

```java
public record Producto(String id, String nombre, double precio) {
    
    // Constructor compacto - Validación antes de asignación
    public Producto {
        if (precio < 0) {
            throw new IllegalArgumentException("Precio no puede ser negativo");
        }
        if (nombre == null || nombre.isBlank()) {
            throw new IllegalArgumentException("Nombre es requerido");
        }
        // No hace falta this.id = id; - se hace automáticamente
    }
    
    // Constructor adicional
    public Producto(String nombre, double precio) {
        this(UUID.randomUUID().toString(), nombre, precio);
    }
    
    // Métodos personalizados
    public boolean esGratis() {
        return precio == 0;
    }
    
    public Producto conDescuento(double porcentaje) {
        double nuevoPrecio = precio * (1 - porcentaje / 100);
        return new Producto(id, nombre, nuevoPrecio);
    }
}

// Uso
Producto laptop = new Producto("LAP001", "Laptop Dell", 799.99);
System.out.println(laptop.nombre()); // Laptop Dell

Producto conDescuento = laptop.conDescuento(10);
System.out.println(conDescuento.precio()); // 719.991
```

### Record como DTO (Data Transfer Object)

```java
import java.time.LocalDate;
import java.util.*;

// Record para respuesta de API
public record UsuarioDTO(
    Long id,
    String username,
    String email,
    LocalDate fechaRegistro,
    List<String> roles
) {
    // Constructor compacto para inmutabilidad defensiva
    public UsuarioDTO {
        // Crear lista inmutable
        roles = roles == null ? List.of() : List.copyOf(roles);
    }
    
    // Constructor de conveniencia
    public UsuarioDTO(Long id, String username, String email) {
        this(id, username, email, LocalDate.now(), List.of("USER"));
    }
    
    // Método derivado
    public boolean esAdmin() {
        return roles.contains("ADMIN");
    }
}

// Servicio que usa el DTO
class UsuarioService {
    public List<UsuarioDTO> obtenerUsuarios() {
        return List.of(
            new UsuarioDTO(1L, "ana", "ana@email.com", 
                LocalDate.of(2023, 1, 15), List.of("USER", "ADMIN")),
            new UsuarioDTO(2L, "pedro", "pedro@email.com", 
                LocalDate.of(2023, 2, 20), List.of("USER"))
        );
    }
}

public class EjemploDTO {
    public static void main(String[] args) {
        UsuarioService service = new UsuarioService();
        
        service.obtenerUsuarios().forEach(usuario -> {
            System.out.printf("%s (%s) - Roles: %s%n",
                usuario.username(),
                usuario.email(),
                usuario.roles()
            );
            
            if (usuario.esAdmin()) {
                System.out.println("  ⭐ Usuario administrador");
            }
        });
    }
}
```

**Salida:**
```
ana (ana@email.com) - Roles: [USER, ADMIN]
  ⭐ Usuario administrador
pedro (pedro@email.com) - Roles: [USER]
```

### Record Genérico

```java
public record Result<T>(boolean success, T data, String error) {
    
    // Métodos estáticos factory
    public static <T> Result<T> success(T data) {
        return new Result<>(true, data, null);
    }
    
    public static <T> Result<T> failure(String error) {
        return new Result<>(false, null, error);
    }
    
    // Métodos de transformación
    public <U> Result<U> map(Function<T, U> mapper) {
        if (success) {
            return Result.success(mapper.apply(data));
        }
        return Result.failure(error);
    }
}

// Uso
class UsuarioRepository {
    public Result<Usuario> buscarPorId(Long id) {
        if (id == null || id <= 0) {
            return Result.failure("ID inválido");
        }
        
        // Simular búsqueda
        if (id == 1) {
            return Result.success(new Usuario("Ana", "ana@email.com"));
        }
        
        return Result.failure("Usuario no encontrado");
    }
}

public class EjemploResult {
    public static void main(String[] args) {
        UsuarioRepository repo = new UsuarioRepository();
        
        Result<Usuario> result = repo.buscarPorId(1L);
        
        if (result.success()) {
            System.out.println("✅ Usuario encontrado: " + result.data().nombre());
        } else {
            System.out.println("❌ Error: " + result.error());
        }
        
        // Transformación con map
        Result<String> emailResult = result.map(usuario -> usuario.email());
        emailResult.ifPresent(email -> System.out.println("Email: " + email));
    }
}
```

### Record Anidado

```java
public record Direccion(String calle, String ciudad, String codigoPostal) {}

public record Empresa(
    String nombre,
    Direccion direccion,
    List<Empleado> empleados
) {
    // Record interno
    public record Empleado(String nombre, String cargo, double salario) {}
    
    public double sumaSalarios() {
        return empleados.stream()
            .mapToDouble(Empleado::salario)
            .sum();
    }
}

// Uso
var empresa = new Empresa(
    "TechCorp",
    new Direccion("Av. Principal 123", "Madrid", "28001"),
    List.of(
        new Empresa.Empleado("Ana", "Desarrolladora", 45000),
        new Empresa.Empleado("Carlos", "Manager", 55000)
    )
);

System.out.println("Total salarios: " + empresa.sumaSalarios());
```

## ⚙️ Funcionamiento Interno

### Lo que Java genera automáticamente

```java
public record Punto(int x, int y) {}

// Java genera internamente (simplificado):
public final class Punto extends java.lang.Record {
    private final int x;
    private final int y;
    
    public Punto(int x, int y) {
        this.x = x;
        this.y = y;
    }
    
    public int x() { return x; }
    public int y() { return y; }
    
    @Override
    public boolean equals(Object o) {
        // Compara componentes
    }
    
    @Override
    public int hashCode() {
        // Hash de componentes
    }
    
    @Override
    public String toString() {
        return "Punto[x=" + x + ", y=" + y + "]";
    }
}
```

## 🔄 Records e Interfaces

```java
// Records PUEDEN implementar interfaces
public interface Identificable {
    String getId();
}

public record Usuario(String id, String nombre) implements Identificable {
    @Override
    public String getId() {
        return id;
    }
}

// Records con Serializable
public record Config(String host, int puerto) implements Serializable {}
```

## ⚠️ Limitaciones y Restricciones

> ❌ **No pueden extender clases**

```java
// ❌ ILEGAL
public record MiRecord() extends MiClase {} // Error de compilación
```

> ❌ **No pueden declarar campos de instancia adicionales**

```java
// ❌ ILEGAL
public record Persona(String nombre) {
    private int edad; // Error: solo los componentes pueden ser campos
}
```

> ❌ **No pueden ser abstractos**

```java
// ❌ ILEGAL
public abstract record AbstractRecord() {} // Error
```

> ⚠️ **Todos los campos son implícitamente final**

```java
public record Contador(int valor) {
    // ❌ No puedes hacer esto
    public void incrementar() {
        valor++; // Error: valor es final
    }
    
    // ✅ Debes crear un nuevo record
    public Contador incrementar() {
        return new Contador(valor + 1);
    }
}
```

## 💪 Ejercicios Prácticos

### Ejercicio 1: Sistema de Pedidos
**Dificultad**: Media

Crea records para `Pedido`, `ItemPedido` y `Cliente`. Calcula el total del pedido.

<details>
<summary>✅ Solución</summary>

```java
import java.time.LocalDateTime;
import java.util.*;

public record Cliente(String id, String nombre, String email) {}

public record ItemPedido(String producto, int cantidad, double precioUnitario) {
    public double subtotal() {
        return cantidad * precioUnitario;
    }
}

public record Pedido(
    String id,
    Cliente cliente,
    LocalDateTime fecha,
    List<ItemPedido> items
) {
    public Pedido {
        items = List.copyOf(items); // Inmutabilidad defensiva
    }
    
    public double total() {
        return items.stream()
            .mapToDouble(ItemPedido::subtotal)
            .sum();
    }
    
    public int cantidadItems() {
        return items.stream()
            .mapToInt(ItemPedido::cantidad)
            .sum();
    }
}

class TestPedidos {
    public static void main(String[] args) {
        Cliente cliente = new Cliente("C001", "Ana García", "ana@email.com");
        
        Pedido pedido = new Pedido(
            "P001",
            cliente,
            LocalDateTime.now(),
            List.of(
                new ItemPedido("Laptop", 1, 799.99),
                new ItemPedido("Mouse", 2, 25.50)
            )
        );
        
        System.out.println("Cliente: " + pedido.cliente().nombre());
        System.out.println("Items: " + pedido.cantidadItems());
        System.out.println("Total: $" + pedido.total());
    }
}
```
</details>

## 🎯 Cuándo Usar Records

| ✅ Usar cuando | ❌ NO usar cuando |
|---------------|-------------------|
| DTOs / Value Objects | Necesitas mutabilidad |
| Resultados de consultas | Necesitas herencia de clases |
| Configuraciones | Lógica de negocio compleja |
| Datos inmutables | Campos adicionales más allá de componentes |
| Reducir boilerplate | Necesitas lazy initialization |

## 🔗 Temas Relacionados

- [Sealed Classes](./sealed-classes) - Jerarquías controladas
- [Pattern Matching](./pattern-matching) - Deconstrucción de records
- [POO - Clases](../basico/poo-clases)

## 📚 Recursos Adicionales

- [JEP 395: Records](https://openjdk.org/jeps/395)
- [Oracle Tutorial: Records](https://docs.oracle.com/en/java/javase/21/language/records.html)
