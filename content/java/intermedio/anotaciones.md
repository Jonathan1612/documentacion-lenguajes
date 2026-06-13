---
title: "Anotaciones en Java"
level: intermedio
category: caracteristicas-avanzadas
tags: [anotaciones, annotations, metadata, reflection, custom-annotations]
duration: 35min
prerequisites: [poo, interfaces]
---

# Anotaciones en Java

## 📋 ¿Qué son las Anotaciones?

Las **anotaciones** (annotations) son una forma de agregar **metadatos** al código. No afectan directamente la ejecución del programa, pero proporcionan información adicional al compilador, herramientas de desarrollo o en tiempo de ejecución.

### 🎯 ¿Para qué sirven?

- **Información para el compilador**: detectar errores o suprimir warnings
- **Procesamiento en tiempo de compilación**: generar código automáticamente
- **Procesamiento en tiempo de ejecución**: inspeccionar código usando Reflection
- **Configuración**: frameworks como Spring, Hibernate usan anotaciones extensivamente

## 💡 Sintaxis Básica

```java
@NombreAnotacion
public class MiClase {
    
    @OtraAnotacion(parametro = "valor")
    public void miMetodo() {
        // código
    }
}
```

## 🏷️ Anotaciones Predefinidas de Java

### 1️⃣ @Override

Indica que un método sobrescribe un método de la superclase.

```java
public class Animal {
    public void hacerSonido() {
        System.out.println("Algún sonido");
    }
}

public class Perro extends Animal {
    @Override // El compilador verifica que efectivamente sobrescribe
    public void hacerSonido() {
        System.out.println("¡Guau!");
    }
    
    // ❌ Error de compilación si el método no existe en la superclase
    // @Override
    // public void ladrar() { } // Error: no sobrescribe nada
}
```

**¿Por qué usarlo?**
- Previene errores de tipeo
- Si el método padre cambia de nombre, el compilador alertará
- Mejora la legibilidad del código

### 2️⃣ @Deprecated

Marca código que no debería usarse más.

```java
public class CalculadoraVieja {
    /**
     * @deprecated Usa {@link #sumarNuevo(int, int)} en su lugar
     */
    @Deprecated
    public int sumar(int a, int b) {
        return a + b;
    }
    
    public int sumarNuevo(int a, int b) {
        return a + b; // Implementación mejorada
    }
}

public class Main {
    public static void main(String[] args) {
        CalculadoraVieja calc = new CalculadoraVieja();
        
        // ⚠️ El compilador genera una advertencia
        int resultado = calc.sumar(5, 3);
        
        // ✅ Forma recomendada
        int resultadoNuevo = calc.sumarNuevo(5, 3);
    }
}
```

**Java 9+** añadió parámetros:
```java
@Deprecated(since = "1.5", forRemoval = true)
public void metodoAntiguo() {
    // Se eliminará en versiones futuras
}
```

### 3️⃣ @SuppressWarnings

Suprime advertencias del compilador.

```java
public class EjemploSuppress {
    @SuppressWarnings("unused")
    public void metodoConVariableNoUsada() {
        int x = 10; // Sin esta anotación, advertencia de variable no usada
    }
    
    @SuppressWarnings("deprecation")
    public void usarMetodoDeprecated() {
        Date fecha = new Date(2024, 1, 1); // Constructor deprecated
    }
    
    @SuppressWarnings({"unchecked", "rawtypes"})
    public void usarRawTypes() {
        List lista = new ArrayList(); // Raw type sin genéricos
        lista.add("elemento");
    }
}
```

**Valores comunes**:
- `"unchecked"`: conversiones sin verificar
- `"deprecation"`: uso de API deprecated
- `"unused"`: variables/métodos no usados
- `"rawtypes"`: uso de tipos sin genéricos

### 4️⃣ @SafeVarargs

Indica que un método con varargs es seguro para tipos genéricos.

```java
public class SafeVarargsExample {
    @SafeVarargs
    public static <T> void imprimirTodos(T... elementos) {
        for (T elemento : elementos) {
            System.out.println(elemento);
        }
    }
    
    public static void main(String[] args) {
        imprimirTodos("Java", "Python", "JavaScript");
        imprimirTodos(1, 2, 3, 4, 5);
    }
}
```

### 5️⃣ @FunctionalInterface

Marca una interfaz como funcional (un solo método abstracto).

```java
@FunctionalInterface
public interface Calculable {
    int calcular(int a, int b);
    
    // ❌ Error: solo puede haber un método abstracto
    // int restar(int a, int b);
    
    // ✅ Métodos default están permitidos
    default void imprimir(int resultado) {
        System.out.println("Resultado: " + resultado);
    }
}

// Uso con lambda
public class Main {
    public static void main(String[] args) {
        Calculable suma = (a, b) -> a + b;
        System.out.println(suma.calcular(5, 3)); // 8
    }
}
```

## 🎨 Anotaciones para Documentación

### @Documented
Incluye la anotación en JavaDoc.

### @Target
Especifica dónde se puede usar la anotación.

### @Retention
Define cuándo está disponible la anotación.

```java
import java.lang.annotation.*;

@Documented // Aparecerá en JavaDoc
@Target(ElementType.METHOD) // Solo en métodos
@Retention(RetentionPolicy.RUNTIME) // Disponible en runtime
public @interface MiAnotacion {
    String valor() default "";
}
```

## 🛠️ Crear Anotaciones Personalizadas

### Ejemplo 1: Anotación Simple

```java
import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Test {
}

// Uso
public class MiTest {
    @Test
    public void testSuma() {
        assert 2 + 2 == 4;
    }
    
    @Test
    public void testResta() {
        assert 5 - 3 == 2;
    }
}
```

### Ejemplo 2: Anotación con Parámetros

```java
import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Autor {
    String nombre();
    String fecha();
    int version() default 1;
}

// Uso
public class Calculadora {
    @Autor(
        nombre = "Juan Pérez",
        fecha = "2024-01-15",
        version = 2
    )
    public int sumar(int a, int b) {
        return a + b;
    }
}
```

### Ejemplo 3: Ejecutor de Tests Personalizado

```java
import java.lang.annotation.*;
import java.lang.reflect.Method;

// Definir anotación
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@interface MiTest {
    String descripcion() default "";
}

// Clase con tests
class CalculadoraTest {
    @MiTest(descripcion = "Verifica suma básica")
    public void testSumar() {
        int resultado = 2 + 2;
        if (resultado != 4) {
            throw new AssertionError("Error: esperado 4, obtenido " + resultado);
        }
    }
    
    @MiTest(descripcion = "Verifica multiplicación")
    public void testMultiplicar() {
        int resultado = 3 * 4;
        if (resultado != 12) {
            throw new AssertionError("Error: esperado 12, obtenido " + resultado);
        }
    }
    
    public void metodoNormal() {
        System.out.println("Este método no se ejecutará");
    }
}

// Ejecutor de tests
public class TestRunner {
    public static void ejecutarTests(Class<?> clase) {
        int pasados = 0;
        int fallidos = 0;
        
        for (Method metodo : clase.getDeclaredMethods()) {
            if (metodo.isAnnotationPresent(MiTest.class)) {
                MiTest anotacion = metodo.getAnnotation(MiTest.class);
                
                try {
                    Object instancia = clase.getDeclaredConstructor().newInstance();
                    metodo.invoke(instancia);
                    
                    System.out.println("✅ PASADO: " + metodo.getName() + 
                                     " - " + anotacion.descripcion());
                    pasados++;
                } catch (Exception e) {
                    System.out.println("❌ FALLIDO: " + metodo.getName() + 
                                     " - " + e.getCause().getMessage());
                    fallidos++;
                }
            }
        }
        
        System.out.println("\n=== RESUMEN ===");
        System.out.println("Pasados: " + pasados);
        System.out.println("Fallidos: " + fallidos);
    }
    
    public static void main(String[] args) {
        ejecutarTests(CalculadoraTest.class);
    }
}
```

## 🎯 @Target - Dónde se Aplican

```java
public enum ElementType {
    TYPE,           // Clase, interfaz, enum
    FIELD,          // Atributos
    METHOD,         // Métodos
    PARAMETER,      // Parámetros de métodos
    CONSTRUCTOR,    // Constructores
    LOCAL_VARIABLE, // Variables locales
    ANNOTATION_TYPE,// Otras anotaciones
    PACKAGE,        // Paquetes
    TYPE_PARAMETER, // Parámetros de tipo (Java 8+)
    TYPE_USE        // Cualquier uso de tipo (Java 8+)
}
```

### Ejemplo con múltiples targets

```java
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Info {
    String valor();
}

public class Ejemplo {
    @Info(valor = "Campo de usuario")
    private String nombre;
    
    @Info(valor = "Obtiene el nombre")
    public String getNombre() {
        return nombre;
    }
}
```

## ⏱️ @Retention - Ciclo de Vida

```java
public enum RetentionPolicy {
    SOURCE,      // Solo en código fuente, descartada por compilador
    CLASS,       // En .class pero no en runtime (default)
    RUNTIME      // Disponible en runtime via Reflection
}
```

### Ejemplo comparativo

```java
@Retention(RetentionPolicy.SOURCE)
@interface AnotacionFuente {
    // Solo vista por el compilador
}

@Retention(RetentionPolicy.CLASS)
@interface AnotacionClase {
    // En bytecode, no accesible en runtime
}

@Retention(RetentionPolicy.RUNTIME)
@interface AnotacionRuntime {
    // Accesible durante ejecución
}
```

## 🌟 Anotaciones en Frameworks Populares

### Spring Framework

```java
// Spring Boot
@SpringBootApplication
public class MiAplicacion {
    public static void main(String[] args) {
        SpringApplication.run(MiAplicacion.class, args);
    }
}

// REST Controller
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioService service;
    
    @GetMapping("/{id}")
    public Usuario obtener(@PathVariable Long id) {
        return service.buscar(id);
    }
    
    @PostMapping
    public Usuario crear(@RequestBody Usuario usuario) {
        return service.guardar(usuario);
    }
}

// Service
@Service
public class UsuarioService {
    @Transactional
    public Usuario guardar(Usuario usuario) {
        // Lógica de negocio
    }
}
```

### JPA/Hibernate

```java
@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;
    
    @Column(unique = true)
    private String email;
    
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<Pedido> pedidos;
    
    // Getters y setters
}
```

### JUnit (Testing)

```java
import org.junit.jupiter.api.*;

public class CalculadoraTest {
    private Calculadora calc;
    
    @BeforeEach
    void setUp() {
        calc = new Calculadora();
    }
    
    @Test
    @DisplayName("Suma de dos números positivos")
    void testSumar() {
        assertEquals(5, calc.sumar(2, 3));
    }
    
    @Test
    @Disabled("Pendiente de implementar")
    void testDividir() {
        // Test deshabilitado temporalmente
    }
    
    @AfterEach
    void tearDown() {
        calc = null;
    }
}
```

## ⚠️ Errores Comunes

### 1. Olvidar @Override

```java
class Animal {
    public void hacerSonido() { }
}

class Gato extends Animal {
    // ❌ Mal - typo no detectado
    public void hacerSonid() { // Falta 'o'
        System.out.println("Miau");
    }
    
    // ✅ Correcto - el compilador detectaría el error
    @Override
    public void hacerSonido() {
        System.out.println("Miau");
    }
}
```

### 2. Retention incorrecta

```java
// ❌ Mal - no se puede leer en runtime
@Retention(RetentionPolicy.SOURCE)
@interface MiTest { }

// En runtime
if (metodo.isAnnotationPresent(MiTest.class)) {
    // Nunca se ejecuta - anotación no disponible
}

// ✅ Correcto
@Retention(RetentionPolicy.RUNTIME)
@interface MiTest { }
```

## 💪 Ejercicios Prácticos

### Ejercicio 1: Validador de Campos
**Dificultad**: Medio

Crea anotaciones `@NotNull` y `@MinLength` para validar campos.

<details>
<summary>✅ Solución</summary>

```java
import java.lang.annotation.*;
import java.lang.reflect.Field;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@interface NotNull { }

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@interface MinLength {
    int valor();
}

class Usuario {
    @NotNull
    @MinLength(valor = 3)
    private String nombre;
    
    @NotNull
    private String email;
    
    public Usuario(String nombre, String email) {
        this.nombre = nombre;
        this.email = email;
    }
}

class Validador {
    public static boolean validar(Object objeto) throws IllegalAccessException {
        Class<?> clase = objeto.getClass();
        
        for (Field campo : clase.getDeclaredFields()) {
            campo.setAccessible(true);
            Object valor = campo.get(objeto);
            
            if (campo.isAnnotationPresent(NotNull.class)) {
                if (valor == null) {
                    System.out.println("Error: " + campo.getName() + " no puede ser null");
                    return false;
                }
            }
            
            if (campo.isAnnotationPresent(MinLength.class)) {
                MinLength anotacion = campo.getAnnotation(MinLength.class);
                String texto = (String) valor;
                if (texto == null || texto.length() < anotacion.valor()) {
                    System.out.println("Error: " + campo.getName() + 
                                     " debe tener al menos " + anotacion.valor() + " caracteres");
                    return false;
                }
            }
        }
        
        return true;
    }
}

public class Main {
    public static void main(String[] args) throws IllegalAccessException {
        Usuario u1 = new Usuario("Juan", "juan@email.com");
        Usuario u2 = new Usuario("Al", null);
        
        System.out.println("Usuario 1 válido: " + Validador.validar(u1)); // true
        System.out.println("Usuario 2 válido: " + Validador.validar(u2)); // false
    }
}
```
</details>

### Ejercicio 2: Medidor de Tiempo
**Dificultad**: Medio

Crea una anotación `@MedirTiempo` que mida la ejecución de métodos.

<details>
<summary>✅ Solución</summary>

```java
import java.lang.annotation.*;
import java.lang.reflect.Method;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@interface MedirTiempo { }

class Calculadora {
    @MedirTiempo
    public void calcularFibonacci(int n) {
        int a = 0, b = 1;
        for (int i = 0; i < n; i++) {
            int temp = a + b;
            a = b;
            b = temp;
        }
        System.out.println("Fibonacci(" + n + ") = " + a);
    }
}

public class Main {
    public static void ejecutarConMedicion(Object objeto, String nombreMetodo, Object... args) 
            throws Exception {
        Method metodo = objeto.getClass().getMethod(nombreMetodo, 
                                                    int.class); // Asumiendo un parámetro int
        
        if (metodo.isAnnotationPresent(MedirTiempo.class)) {
            long inicio = System.nanoTime();
            metodo.invoke(objeto, args);
            long fin = System.nanoTime();
            
            double milisegundos = (fin - inicio) / 1_000_000.0;
            System.out.println("⏱️  Tiempo de ejecución: " + milisegundos + " ms");
        } else {
            metodo.invoke(objeto, args);
        }
    }
    
    public static void main(String[] args) throws Exception {
        Calculadora calc = new Calculadora();
        ejecutarConMedicion(calc, "calcularFibonacci", 1000000);
    }
}
```
</details>

## 🎯 ¿Cuándo Usar Anotaciones?

| Escenario | Anotación Recomendada |
|-----------|----------------------|
| Sobrescribir métodos | `@Override` |
| Marcar código obsoleto | `@Deprecated` |
| Suprimir warnings específicos | `@SuppressWarnings` |
| Configurar entidades JPA | `@Entity`, `@Table`, `@Column` |
| Crear endpoints REST | `@RestController`, `@GetMapping` |
| Inyectar dependencias | `@Autowired`, `@Inject` |
| Testing | `@Test`, `@BeforeEach` |

## 🔗 Temas Relacionados

- [Reflection](../avanzado/reflection)
- [POO - Interfaces](./poo)
- [Streams y Lambdas](./streams)

## 📚 Recursos Adicionales

- [Annotations Tutorial - Oracle](https://docs.oracle.com/javase/tutorial/java/annotations/)
- [Creating Custom Annotations](https://www.baeldung.com/java-custom-annotation)
- [Spring Annotations Guide](https://www.baeldung.com/spring-annotations)
