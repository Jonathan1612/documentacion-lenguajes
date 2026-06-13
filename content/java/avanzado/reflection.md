---
title: "Reflection API"
level: avanzado
category: metaprogramacion
tags: [java, reflection, api, metaprogramming, dynamic]
duration: 40min
prerequisites: [poo-clases, anotaciones, excepciones, interfaces]
---

# Reflection API

## 📋 ¿Qué es Reflection?

**Reflection** es la capacidad de inspeccionar y manipular clases, métodos, campos y anotaciones en tiempo de ejecución. Permite trabajar con tipos de forma dinámica sin conocerlos en tiempo de compilación.

> ⚠️ **Advertencia**: Reflection es poderoso pero rompe encapsulación y afecta performance. Usar solo cuando sea necesario.

## 🎯 ¿Para qué sirve?

- **Frameworks**: Spring, Hibernate usan reflection extensivamente
- **Serialización/Deserialización**: Jackson, Gson
- **Pruebas unitarias**: JUnit, Mockito
- **Dependencia dinámica**: Cargar clases por nombre
- **Inspección de anotaciones**: Procesar metadatos en runtime

## 🔑 Conceptos Clave

| Concepto | Descripción |
|----------|-------------|
| **Class<T>** | Objeto que representa una clase |
| **Method** | Representa un método |
| **Field** | Representa un campo/variable |
| **Constructor** | Representa un constructor |
| **Annotation** | Representa una anotación |
| **Modifier** | public, private, static, final, etc. |

## 💡 Obtener Información de Clases

### Obtener Class<?>

```java
// 3 formas de obtener Class
Class<?> clase1 = String.class;                    // Tipo conocido
Class<?> clase2 = "Hola".getClass();               // Desde instancia
Class<?> clase3 = Class.forName("java.lang.String"); // Nombre completo

// Información básica
System.out.println("Nombre: " + clase1.getName());
System.out.println("Simple: " + clase1.getSimpleName());
System.out.println("Package: " + clase1.getPackage());
System.out.println("Es interfaz: " + clase1.isInterface());
System.out.println("Es array: " + clase1.isArray());
```

### Inspeccionar Métodos

```java
import java.lang.reflect.*;

public class InspectorMetodos {
    public static void main(String[] args) {
        Class<?> clase = String.class;
        
        // Obtener todos los métodos públicos
        Method[] metodos = clase.getMethods();
        System.out.println("Métodos públicos de String:");
        
        for (Method metodo : metodos) {
            System.out.printf("%s %s(",
                Modifier.toString(metodo.getModifiers()),
                metodo.getName()
            );
            
            // Parámetros
            Class<?>[] params = metodo.getParameterTypes();
            for (int i = 0; i < params.length; i++) {
                System.out.print(params[i].getSimpleName());
                if (i < params.length - 1) System.out.print(", ");
            }
            
            System.out.println(") -> " + metodo.getReturnType().getSimpleName());
        }
    }
}
```

### Inspeccionar Campos

```java
import java.lang.reflect.*;

class Usuario {
    public String nombre;
    private int edad;
    protected String email;
    private static final String VERSION = "1.0";
}

public class InspectorCampos {
    public static void main(String[] args) {
        Class<?> clase = Usuario.class;
        
        // Todos los campos (incluye privados)
        Field[] campos = clase.getDeclaredFields();
        
        System.out.println("Campos de Usuario:");
        for (Field campo : campos) {
            int mods = campo.getModifiers();
            System.out.printf("%s %s %s%n",
                Modifier.toString(mods),
                campo.getType().getSimpleName(),
                campo.getName()
            );
        }
    }
}
```

## 🔧 Manipulación Dinámica

### Crear Instancias

```java
import java.lang.reflect.*;

public class CreadorInstancias {
    public static void main(String[] args) throws Exception {
        // Crear instancia con constructor sin argumentos
        Class<?> clase = ArrayList.class;
        Object lista = clase.getDeclaredConstructor().newInstance();
        System.out.println("Creado: " + lista.getClass().getSimpleName());
        
        // Crear instancia con constructor con argumentos
        Class<?> claseString = String.class;
        Constructor<?> constructor = claseString.getConstructor(String.class);
        Object str = constructor.newInstance("Hola Reflection");
        System.out.println("String creado: " + str);
    }
}
```

### Invocar Métodos

```java
import java.lang.reflect.*;

public class InvocadorMetodos {
    public static void main(String[] args) throws Exception {
        String texto = "java reflection";
        Class<?> clase = texto.getClass();
        
        // Invocar método sin parámetros
        Method metodUpper = clase.getMethod("toUpperCase");
        Object resultado = metodUpper.invoke(texto);
        System.out.println("Resultado: " + resultado);
        
        // Invocar método con parámetros
        Method metodSubstr = clase.getMethod("substring", int.class, int.class);
        Object substr = metodSubstr.invoke(texto, 0, 4);
        System.out.println("Substring: " + substr);
        
        // Método privado
        Method metodPrivado = clase.getDeclaredMethod("somePrivateMethod");
        metodPrivado.setAccessible(true); // ⚠️ Rompe encapsulación
        metodPrivado.invoke(texto);
    }
}
```

### Acceder a Campos Privados

```java
import java.lang.reflect.*;

class CuentaBancaria {
    private double saldo;
    
    public CuentaBancaria(double saldoInicial) {
        this.saldo = saldoInicial;
    }
    
    public double getSaldo() {
        return saldo;
    }
}

public class AccesorCampos {
    public static void main(String[] args) throws Exception {
        CuentaBancaria cuenta = new CuentaBancaria(1000.0);
        
        // Acceder campo privado con reflection
        Field campoSaldo = CuentaBancaria.class.getDeclaredField("saldo");
        campoSaldo.setAccessible(true); // ⚠️ Peligroso!
        
        // Leer valor
        double saldo = (double) campoSaldo.get(cuenta);
        System.out.println("Saldo actual: " + saldo);
        
        // Modificar valor (¡Rompe encapsulación!)
        campoSaldo.set(cuenta, 999999.99);
        System.out.println("Saldo modificado: " + cuenta.getSaldo());
    }
}
```

## 📊 Ejemplo Completo: Inspector de Clases

```java
import java.lang.reflect.*;
import java.util.*;

public class InspectorClases {
    
    public static void inspeccionar(Class<?> clase) {
        System.out.println("========================================");
        System.out.println("CLASE: " + clase.getName());
        System.out.println("========================================\n");
        
        // Superclase e interfaces
        Class<?> superclase = clase.getSuperclass();
        if (superclase != null) {
            System.out.println("Extiende: " + superclase.getSimpleName());
        }
        
        Class<?>[] interfaces = clase.getInterfaces();
        if (interfaces.length > 0) {
            System.out.print("Implementa: ");
            for (int i = 0; i < interfaces.length; i++) {
                System.out.print(interfaces[i].getSimpleName());
                if (i < interfaces.length - 1) System.out.print(", ");
            }
            System.out.println("\n");
        }
        
        // Campos
        System.out.println("CAMPOS:");
        Field[] campos = clase.getDeclaredFields();
        for (Field campo : campos) {
            System.out.printf("  %s %s %s%n",
                Modifier.toString(campo.getModifiers()),
                campo.getType().getSimpleName(),
                campo.getName()
            );
        }
        
        // Constructores
        System.out.println("\nCONSTRUCTORES:");
        Constructor<?>[] constructores = clase.getDeclaredConstructors();
        for (Constructor<?> c : constructores) {
            System.out.print("  " + Modifier.toString(c.getModifiers()) + " ");
            System.out.print(clase.getSimpleName() + "(");
            
            Class<?>[] params = c.getParameterTypes();
            for (int i = 0; i < params.length; i++) {
                System.out.print(params[i].getSimpleName());
                if (i < params.length - 1) System.out.print(", ");
            }
            System.out.println(")");
        }
        
        // Métodos
        System.out.println("\nMÉTODOS:");
        Method[] metodos = clase.getDeclaredMethods();
        for (Method m : metodos) {
            System.out.printf("  %s %s %s(",
                Modifier.toString(m.getModifiers()),
                m.getReturnType().getSimpleName(),
                m.getName()
            );
            
            Class<?>[] params = m.getParameterTypes();
            for (int i = 0; i < params.length; i++) {
                System.out.print(params[i].getSimpleName());
                if (i < params.length - 1) System.out.print(", ");
            }
            System.out.println(")");
        }
    }
    
    public static void main(String[] args) {
        inspeccionar(ArrayList.class);
        System.out.println();
        inspeccionar(String.class);
    }
}
```

## 🏷️ Procesamiento de Anotaciones

```java
import java.lang.annotation.*;
import java.lang.reflect.*;

// Definir anotación
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@interface Test {
    String nombre() default "";
    int timeout() default 1000;
}

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@interface Ignorar {}

// Clase con métodos anotados
class SuitePruebas {
    @Test(nombre = "Prueba suma", timeout = 500)
    public void testSuma() {
        System.out.println("Ejecutando testSuma");
    }
    
    @Test
    public void testResta() {
        System.out.println("Ejecutando testResta");
    }
    
    @Ignorar
    @Test
    public void testIgnorado() {
        System.out.println("Este test debería ignorarse");
    }
    
    public void metodoNormal() {
        System.out.println("No es un test");
    }
}

// Ejecutor de pruebas con reflection
public class EjecutorPruebas {
    public static void ejecutar(Class<?> clase) throws Exception {
        Object instancia = clase.getDeclaredConstructor().newInstance();
        Method[] metodos = clase.getDeclaredMethods();
        
        int ejecutados = 0, ignorados = 0;
        
        for (Method metodo : metodos) {
            // Verificar si tiene @Test
            if (metodo.isAnnotationPresent(Test.class)) {
                // Verificar si está marcado como @Ignorar
                if (metodo.isAnnotationPresent(Ignorar.class)) {
                    System.out.println("⏭️  Ignorando: " + metodo.getName());
                    ignorados++;
                    continue;
                }
                
                // Obtener datos de la anotación
                Test test = metodo.getAnnotation(Test.class);
                String nombre = test.nombre().isEmpty() ? 
                    metodo.getName() : test.nombre();
                
                System.out.println("▶️  Ejecutando: " + nombre);
                metodo.invoke(instancia);
                ejecutados++;
            }
        }
        
        System.out.println("\n📊 Resumen:");
        System.out.println("   Ejecutados: " + ejecutados);
        System.out.println("   Ignorados: " + ignorados);
    }
    
    public static void main(String[] args) throws Exception {
        ejecutar(SuitePruebas.class);
    }
}
```

## ⚠️ Desventajas de Reflection

| Problema | Descripción |
|----------|-------------|
| **Performance** | 10-100x más lento que llamadas directas |
| **Seguridad** | Puede romper encapsulación |
| **Complejidad** | Código difícil de mantener |
| **Errores en runtime** | Problemas no detectados en compilación |
| **Refactoring** | IDEs no detectan usos dinámicos |

> ⚠️ **Regla de oro**: Usa reflection solo cuando NO haya alternativa directa.

## 💪 Ejercicio Práctico

### Mapper de Objetos Genérico

```java
// Tu tarea: Implementar copyProperties que copie campos entre objetos
class ObjectMapper {
    public static void copyProperties(Object source, Object target) {
        // Usar reflection para copiar campos con mismo nombre y tipo
    }
}

// Prueba
class Origen {
    public String nombre = "Juan";
    public int edad = 25;
}

class Destino {
    public String nombre;
    public int edad;
}
```

<details>
<summary>✅ Solución</summary>

```java
import java.lang.reflect.*;

class ObjectMapper {
    public static void copyProperties(Object source, Object target) 
            throws IllegalAccessException {
        Class<?> sourceClass = source.getClass();
        Class<?> targetClass = target.getClass();
        
        for (Field sourceField : sourceClass.getDeclaredFields()) {
            sourceField.setAccessible(true);
            
            try {
                Field targetField = targetClass.getDeclaredField(sourceField.getName());
                targetField.setAccessible(true);
                
                // Verificar tipos compatibles
                if (targetField.getType().equals(sourceField.getType())) {
                    Object value = sourceField.get(source);
                    targetField.set(target, value);
                    System.out.println("Copiado: " + sourceField.getName());
                }
            } catch (NoSuchFieldException e) {
                // Campo no existe en destino, ignorar
            }
        }
    }
}
```
</details>

## 🎯 Cuándo Usar Reflection

| ✅ Usar cuando | ❌ Evitar cuando |
|---------------|-----------------|
| Frameworks/Libraries | Código de aplicación normal |
| Plugins dinámicos | Tipos conocidos en compilación |
| Serialización genérica | Performance crítica |
| Procesamiento de anotaciones | Alternativas directas existen |

## 🔗 Temas Relacionados

- [Anotaciones](../intermedio/anotaciones)
- [Genericos](../intermedio/genericos)
- [Excepciones](../basico/excepciones)

## 📚 Recursos Adicionales

- [Reflection API Docs](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/reflect/package-summary.html)
- [Oracle Tutorial: Reflection](https://docs.oracle.com/javase/tutorial/reflect/)
