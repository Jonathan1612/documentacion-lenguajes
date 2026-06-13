---
title: "Optional - Manejo de Nulls"
level: avanzado
category: functional
tags: [java, optional, null-safety, functional, java8]
duration: 30min
prerequisites: [lambdas, streams, interfaces]
---

# Optional<T>

## 📋 ¿Qué es Optional?

`Optional<T>` es un contenedor que puede o no contener un valor no nulo. Introducido en Java 8, es una forma funcional y segura de manejar valores que pueden ser **null**, evitando el temido `NullPointerException`.

## 🎯 ¿Para qué sirve?

- **Evitar NullPointerException**: Manejo explícito de ausencia de valor
- **Código más expresivo**: Deja claro cuando un valor puede no existir
- **Programación funcional**: Métodos como map, flatMap, filter
- **API más segura**: Forzar al consumidor a manejar la ausencia

> 💡 **Importante**: Optional NO reemplaza todas las verificaciones de null, sino que es una herramienta para **valores de retorno** que pueden estar ausentes.

## 🔑 Conceptos Clave

| Concepto | Descripción |
|----------|-------------|
| **empty()** | Optional vacío (sin valor) |
| **of()** | Optional con valor (lanza excepción si null) |
| **ofNullable()** | Optional que acepta null |
| **isPresent()** | Verifica si hay valor |
| **get()** | Obtiene el valor (peligroso si vacío) |
| **orElse()** | Valor por defecto si vacío |
| **orElseThrow()** | Lanza excepción si vacío |

## 💡 Creación de Optional

```java
import java.util.Optional;

public class CreacionOptional {
    
    public static void main(String[] args) {
        // Optional vacío
        Optional<String> vacio = Optional.empty();
        
        // Optional con valor (lanza NullPointerException si null)
        Optional<String> conValor = Optional.of("Hola");
        
        // Optional que acepta null
        Optional<String> nullable = Optional.ofNullable(obtenerNombre());
        
        String nombre = null;
        Optional<String> seguro = Optional.ofNullable(nombre); // OK, será empty()
    }
    
    static String obtenerNombre() {
        return Math.random() > 0.5 ? "Juan" : null;
    }
}
```

## 📊 Métodos Principales

### Verificación y Obtención Básica

```java
Optional<String> opt = Optional.of("Java");

// ❌ FORMA ANTIGUA (no recomendada)
if (opt.isPresent()) {
    String valor = opt.get();
    System.out.println(valor);
}

// ✅ FORMA MODERNA
opt.ifPresent(valor -> System.out.println(valor));

// Aún mejor con method reference
opt.ifPresent(System.out::println);
```

### Valores por Defecto

```java
Optional<String> opt = Optional.empty();

// orElse - Devuelve valor por defecto
String resultado1 = opt.orElse("Valor por defecto");

// orElseGet - Devuelve resultado de Supplier (lazy)
String resultado2 = opt.orElseGet(() -> "Calculado solo si vacío");

// orElseThrow - Lanza excepción personalizada
String resultado3 = opt.orElseThrow(() -> 
    new IllegalStateException("Valor requerido"));
```

### Transformaciones (map y flatMap)

```java
Optional<String> nombre = Optional.of("juan");

// map - Transforma el valor si existe
Optional<String> nombreMayus = nombre.map(String::toUpperCase);
// Resultado: Optional["JUAN"]

Optional<Integer> longitud = nombre.map(String::length);
// Resultado: Optional[4]

// filter - Filtra según condición
Optional<String> largo = nombre.filter(n -> n.length() > 5);
// Resultado: Optional.empty() (porque "juan" tiene 4 caracteres)

// flatMap - Para Optional anidados
Optional<Optional<String>> anidado = Optional.of(Optional.of("valor"));
Optional<String> plano = anidado.flatMap(o -> o);
```

## 📋 Ejemplo Completo: Búsqueda de Usuario

```java
import java.util.*;

public class SistemaUsuarios {
    
    static class Usuario {
        private String id;
        private String nombre;
        private String email;
        private Optional<String> telefono; // Teléfono es opcional
        
        public Usuario(String id, String nombre, String email) {
            this.id = id;
            this.nombre = nombre;
            this.email = email;
            this.telefono = Optional.empty();
        }
        
        public void setTelefono(String telefono) {
            this.telefono = Optional.ofNullable(telefono);
        }
        
        public Optional<String> getTelefono() {
            return telefono;
        }
        
        public String getNombre() { return nombre; }
        public String getEmail() { return email; }
    }
    
    static class RepositorioUsuarios {
        private Map<String, Usuario> usuarios = new HashMap<>();
        
        public RepositorioUsuarios() {
            Usuario u1 = new Usuario("1", "Ana García", "ana@email.com");
            u1.setTelefono("555-1234");
            
            Usuario u2 = new Usuario("2", "Pedro López", "pedro@email.com");
            // Pedro no tiene teléfono
            
            usuarios.put("1", u1);
            usuarios.put("2", u2);
        }
        
        // Método que devuelve Optional
        public Optional<Usuario> buscarPorId(String id) {
            return Optional.ofNullable(usuarios.get(id));
        }
        
        // Buscar y obtener teléfono
        public Optional<String> obtenerTelefono(String id) {
            return buscarPorId(id)
                .flatMap(Usuario::getTelefono); // flatMap desenvuelve Optional<Optional<String>>
        }
    }
    
    public static void main(String[] args) {
        RepositorioUsuarios repo = new RepositorioUsuarios();
        
        // Ejemplo 1: Usuario existe
        System.out.println("=== Usuario 1 ===");
        repo.buscarPorId("1")
            .ifPresentOrElse(
                usuario -> {
                    System.out.println("Nombre: " + usuario.getNombre());
                    System.out.println("Email: " + usuario.getEmail());
                    
                    // Teléfono opcional
                    String tel = usuario.getTelefono()
                        .orElse("No disponible");
                    System.out.println("Teléfono: " + tel);
                },
                () -> System.out.println("Usuario no encontrado")
            );
        
        // Ejemplo 2: Usuario sin teléfono
        System.out.println("\n=== Usuario 2 ===");
        Optional<String> telefono = repo.obtenerTelefono("2");
        System.out.println("Teléfono: " + telefono.orElse("No registrado"));
        
        // Ejemplo 3: Usuario no existe
        System.out.println("\n=== Usuario 999 ===");
        String nombreUsuario = repo.buscarPorId("999")
            .map(Usuario::getNombre)
            .orElse("Desconocido");
        System.out.println("Nombre: " + nombreUsuario);
        
        // Ejemplo 4: Encadenamiento complejo
        System.out.println("\n=== Email en mayúsculas ===");
        String emailMayus = repo.buscarPorId("1")
            .map(Usuario::getEmail)
            .map(String::toUpperCase)
            .filter(email -> email.contains("@"))
            .orElse("Sin email válido");
        System.out.println(emailMayus);
    }
}
```

**Salida:**
```
=== Usuario 1 ===
Nombre: Ana García
Email: ana@email.com
Teléfono: 555-1234

=== Usuario 2 ===
Teléfono: No registrado

=== Usuario 999 ===
Nombre: Desconocido

=== Email en mayúsculas ===
ANA@EMAIL.COM
```

## ⚙️ Funcionamiento Interno

Optional es esencialmente un wrapper inmutable:

```java
// Simplificación conceptual de Optional
public final class Optional<T> {
    private final T value; // null si está vacío
    
    private Optional(T value) {
        this.value = value;
    }
    
    public static <T> Optional<T> empty() {
        return new Optional<>(null);
    }
    
    public static <T> Optional<T> of(T value) {
        if (value == null) {
            throw new NullPointerException();
        }
        return new Optional<>(value);
    }
    
    public boolean isPresent() {
        return value != null;
    }
    
    public T orElse(T other) {
        return value != null ? value : other;
    }
}
```

## ⚠️ Errores Comunes y Anti-Patrones

> ❌ **Anti-patrón 1: Usar get() sin verificar**

```java
// ❌ PELIGROSO - Lanza NoSuchElementException si vacío
Optional<String> opt = Optional.empty();
String valor = opt.get(); // ¡BOOM!

// ✅ CORRECTO
String valor = opt.orElse("default");
```

> ❌ **Anti-patrón 2: isPresent() + get() (Java viejo)**

```java
// ❌ VIEJO - Estilo Java 7
Optional<String> opt = Optional.of("valor");
if (opt.isPresent()) {
    String valor = opt.get();
    System.out.println(valor);
}

// ✅ MODERNO - Estilo Java 8+
opt.ifPresent(System.out::println);
```

> ❌ **Anti-patrón 3: Optional.of() con posible null**

```java
// ❌ INCORRECTO - Lanza NullPointerException
String nombre = obtenerNombreQuePuedeSerNull();
Optional<String> opt = Optional.of(nombre); // ¡Explota si nombre es null!

// ✅ CORRECTO
Optional<String> opt = Optional.ofNullable(nombre);
```

> ⚠️ **Anti-patrón 4: Optional como campo de clase**

```java
// ❌ INCORRECTO - Optional no es Serializable
public class Usuario {
    private Optional<String> telefono; // ¡NO!
}

// ✅ CORRECTO
public class Usuario {
    private String telefono; // Puede ser null
    
    public Optional<String> getTelefono() {
        return Optional.ofNullable(telefono);
    }
}
```

> ⚠️ **Anti-patrón 5: orElse con cálculo costoso**

```java
// ❌ INEFICIENTE - calcularDefault() se ejecuta SIEMPRE
String valor = opt.orElse(calcularDefault());

// ✅ EFICIENTE - calcularDefault() solo si vacío
String valor = opt.orElseGet(() -> calcularDefault());
```

## 📊 Comparación: Antes vs Después

### Código sin Optional (Java 7)

```java
public String obtenerNombreUsuario(String id) {
    Usuario usuario = repositorio.buscar(id);
    if (usuario != null) {
        String nombre = usuario.getNombre();
        if (nombre != null) {
            return nombre.toUpperCase();
        }
    }
    return "ANÓNIMO";
}
```

### Código con Optional (Java 8+)

```java
public String obtenerNombreUsuario(String id) {
    return repositorio.buscar(id)
        .map(Usuario::getNombre)
        .map(String::toUpperCase)
        .orElse("ANÓNIMO");
}
```

## 💪 Ejercicios Prácticos

### Ejercicio 1: Configuración con Valores Opcionales
**Dificultad**: Media

Crea una clase `Configuracion` con propiedades opcionales (puerto, host, timeout). Proporciona valores por defecto.

<details>
<summary>✅ Solución</summary>

```java
public class Configuracion {
    private Optional<Integer> puerto;
    private Optional<String> host;
    private Optional<Integer> timeout;
    
    public Configuracion() {
        this.puerto = Optional.empty();
        this.host = Optional.empty();
        this.timeout = Optional.empty();
    }
    
    public void setPuerto(Integer puerto) {
        this.puerto = Optional.ofNullable(puerto);
    }
    
    public void setHost(String host) {
        this.host = Optional.ofNullable(host);
    }
    
    public void setTimeout(Integer timeout) {
        this.timeout = Optional.ofNullable(timeout);
    }
    
    public int getPuerto() {
        return puerto.orElse(8080);
    }
    
    public String getHost() {
        return host.orElse("localhost");
    }
    
    public int getTimeout() {
        return timeout.orElse(3000);
    }
    
    public void mostrarConfiguracion() {
        System.out.println("Host: " + getHost());
        System.out.println("Puerto: " + getPuerto());
        System.out.println("Timeout: " + getTimeout() + "ms");
    }
    
    public static void main(String[] args) {
        Configuracion config = new Configuracion();
        config.setHost("api.ejemplo.com");
        // Puerto y timeout usarán valores por defecto
        
        config.mostrarConfiguracion();
    }
}
```
</details>

### Ejercicio 2: Validación en Cadena
**Dificultad**: Alta

Valida un email: debe existir, contener @, y el dominio debe ser permitido.

<details>
<summary>✅ Solución</summary>

```java
import java.util.*;

public class ValidadorEmail {
    private static final Set<String> DOMINIOS_PERMITIDOS = 
        Set.of("gmail.com", "yahoo.com", "hotmail.com");
    
    public static Optional<String> validarEmail(String email) {
        return Optional.ofNullable(email)
            .filter(e -> !e.isBlank())
            .filter(e -> e.contains("@"))
            .filter(e -> {
                String dominio = e.substring(e.indexOf("@") + 1);
                return DOMINIOS_PERMITIDOS.contains(dominio);
            });
    }
    
    public static void main(String[] args) {
        String[] emails = {
            "usuario@gmail.com",    // ✅ Válido
            "test@dominio.com",     // ❌ Dominio no permitido
            null,                    // ❌ Null
            "sin-arroba.com",       // ❌ Sin @
            ""                       // ❌ Vacío
        };
        
        for (String email : emails) {
            String resultado = validarEmail(email)
                .map(e -> "✅ Válido: " + e)
                .orElse("❌ Inválido: " + email);
            System.out.println(resultado);
        }
    }
}
```
</details>

## 🎯 Cuándo Usar Optional

| ✅ Usar cuando | ❌ Evitar cuando |
|---------------|-----------------|
| Valores de retorno opcionales | Parámetros de métodos |
| APIs públicas donde null no es obvio | Campos de clase (usar null) |
| Encadenar transformaciones | Colecciones (ya manejan vacío) |
| Evitar complejidad de verificaciones null | Performance crítica |

## 🔗 Temas Relacionados

- [Streams](../intermedio/streams) - Optional y Stream se complementan
- [Lambdas](../intermedio/lambdas) - Expresiones lambda con Optional
- [Interfaces Funcionales](../intermedio/interfaces) - Supplier, Function, etc.

## 📚 Recursos Adicionales

- [Optional JavaDoc](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Optional.html)
- [Oracle Tutorial: Optional](https://docs.oracle.com/javase/tutorial/java/javaOO/optional.html)
