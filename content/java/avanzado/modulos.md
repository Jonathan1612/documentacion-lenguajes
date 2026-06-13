---
title: "Sistema de Módulos (JPMS)"
level: avanzado
category: arquitectura
tags: [java, modules, jpms, java9, encapsulation, modularity]
duration: 35min
prerequisites: [poo-clases, packages, interfaces]
---

# Sistema de Módulos (JPMS) - Java 9+

## 📋 ¿Qué es el Sistema de Módulos?

El **Java Platform Module System (JPMS)** introducido en Java 9 permite agrupar packages relacionados en **módulos**, con control explícito de qué se exporta y qué dependencias se requieren.

> 💡 **Objetivo**: Mejor encapsulación, dependencias claras, y JRE personalizadas más pequeñas.

## 🎯 ¿Para qué sirve?

- **Encapsulación fuerte**: Ocultar implementación interna
- **Dependencias explícitas**: Declarar qué módulos necesitas
- **Imágenes runtime custom**: JRE con solo los módulos necesarios
- **Performance mejorado**: Carga de clases optimizada
- **Eliminación de classpath hell**: Conflictos de versiones

## 🔑 Conceptos Clave

| Concepto | Descripción |
|----------|-------------|
| **Módulo** | Grupo de packages con module-info.java |
| **module-info.java** | Descriptor del módulo |
| **exports** | Declara packages públicos |
| **requires** | Declara dependencias |
| **opens** | Permite reflection a un package |
| **provides/uses** | Service Provider Interface |

## 💡 Estructura de un Módulo

### Anatomía Básica

```
mi-modulo/
├── module-info.java          # Descriptor del módulo
└── com/
    └── empresa/
        └── MiClase.java
```

### module-info.java

```java
module com.empresa.modulo {
    // Exportar packages (accesibles desde otros módulos)
    exports com.empresa.api;
    exports com.empresa.util;
    
    // Requerir otros módulos
    requires java.sql;
    requires java.logging;
    
    // Requerir módulo transitivamente (sus dependencias también)
    requires transitive com.empresa.core;
    
    // Abrir package para reflection (usado por frameworks)
    opens com.empresa.model to com.fasterxml.jackson.databind;
    
    // Opcional: Servicios
    provides com.empresa.spi.Plugin with com.empresa.impl.MiPlugin;
    uses com.empresa.spi.Plugin;
}
```

## 📊 Ejemplo Completo: Sistema Modular

### Módulo 1: Core (Biblioteca compartida)

```
com.empresa.core/
├── module-info.java
└── com/
    └── empresa/
        └── core/
            ├── Usuario.java
            └── Validador.java
```

**module-info.java:**
```java
module com.empresa.core {
    exports com.empresa.core;
}
```

**Usuario.java:**
```java
package com.empresa.core;

public class Usuario {
    private String nombre;
    private String email;
    
    public Usuario(String nombre, String email) {
        this.nombre = nombre;
        this.email = email;
    }
    
    public String getNombre() { return nombre; }
    public String getEmail() { return email; }
}
```

**Validador.java:**
```java
package com.empresa.core;

public class Validador {
    public static boolean esEmailValido(String email) {
        return email != null && email.contains("@");
    }
}
```

### Módulo 2: Servicio (Usa Core)

```
com.empresa.servicio/
├── module-info.java
└── com/
    └── empresa/
        └── servicio/
            └── UsuarioService.java
```

**module-info.java:**
```java
module com.empresa.servicio {
    requires com.empresa.core;
    exports com.empresa.servicio;
}
```

**UsuarioService.java:**
```java
package com.empresa.servicio;

import com.empresa.core.Usuario;
import com.empresa.core.Validador;
import java.util.*;

public class UsuarioService {
    private List<Usuario> usuarios = new ArrayList<>();
    
    public boolean agregarUsuario(Usuario usuario) {
        if (!Validador.esEmailValido(usuario.getEmail())) {
            System.err.println("Email inválido");
            return false;
        }
        usuarios.add(usuario);
        return true;
    }
    
    public List<Usuario> getUsuarios() {
        return new ArrayList<>(usuarios);
    }
}
```

### Módulo 3: Aplicación (Entry point)

```
com.empresa.app/
├── module-info.java
└── com/
    └── empresa/
        └── app/
            └── Main.java
```

**module-info.java:**
```java
module com.empresa.app {
    requires com.empresa.servicio;
    requires com.empresa.core;
}
```

**Main.java:**
```java
package com.empresa.app;

import com.empresa.core.Usuario;
import com.empresa.servicio.UsuarioService;

public class Main {
    public static void main(String[] args) {
        UsuarioService service = new UsuarioService();
        
        service.agregarUsuario(new Usuario("Ana", "ana@email.com"));
        service.agregarUsuario(new Usuario("Juan", "juan@email.com"));
        service.agregarUsuario(new Usuario("Pedro", "email-invalido"));
        
        System.out.println("\n📋 Usuarios registrados:");
        service.getUsuarios().forEach(u -> 
            System.out.println("  - " + u.getNombre() + " (" + u.getEmail() + ")")
        );
    }
}
```

## 🔧 Comandos de Compilación y Ejecución

```bash
# Compilar módulo core
javac -d mods/com.empresa.core \
    com.empresa.core/module-info.java \
    com.empresa.core/com/empresa/core/*.java

# Compilar módulo servicio
javac --module-path mods \
    -d mods/com.empresa.servicio \
    com.empresa.servicio/module-info.java \
    com.empresa.servicio/com/empresa/servicio/*.java

# Compilar módulo app
javac --module-path mods \
    -d mods/com.empresa.app \
    com.empresa.app/module-info.java \
    com.empresa.app/com/empresa/app/*.java

# Ejecutar
java --module-path mods \
    -m com.empresa.app/com.empresa.app.Main
```

## 🎭 Tipos de Módulos

### 1. Módulo Automático

```
// JAR sin module-info.java
// Java lo convierte automáticamente en módulo
// Nombre: nombre del JAR (sin versión)
```

### 2. Módulo Unnamed (Classpath)

```bash
# Código en classpath tradicional
java -cp lib/* Main.class
```

### 3. Módulo Named (Explícito)

```java
// Con module-info.java explícito
module mi.modulo {
    exports mi.api;
}
```

## 🔓 Opens vs Exports

```java
module mi.modulo {
    // exports: Acceso público normal
    exports com.empresa.api;
    
    // opens: Permite reflection (para frameworks)
    opens com.empresa.model;
    
    // opens to: Reflection solo para módulos específicos
    opens com.empresa.internal to com.framework.orm;
    
    // Módulo completamente abierto para reflection
}

// O marcar todo el módulo:
open module mi.modulo {
    exports com.empresa.api;
}
```

## 📦 Crear Runtime Image Custom

```bash
# Listar módulos del JDK
java --list-modules

# Crear imagen runtime con solo módulos necesarios
jlink --module-path $JAVA_HOME/jmods:mods \
      --add-modules com.empresa.app \
      --output custom-runtime \
      --compress=2 \
      --no-header-files \
      --no-man-pages

# Ejecutar desde runtime custom
./custom-runtime/bin/java -m com.empresa.app/com.empresa.app.Main

# Tamaño típico:
# JRE completo: ~200 MB
# Runtime custom: ~40 MB (solo con lo necesario)
```

## 🌐 Service Provider Interface (SPI)

```java
// Módulo API: Define interfaz
module com.empresa.plugin.api {
    exports com.empresa.plugin;
}

package com.empresa.plugin;

public interface Plugin {
    void ejecutar();
}

// Módulo Implementación: Provee servicio
module com.empresa.plugin.impl {
    requires com.empresa.plugin.api;
    provides com.empresa.plugin.Plugin 
        with com.empresa.plugin.impl.MiPlugin;
}

package com.empresa.plugin.impl;

import com.empresa.plugin.Plugin;

public class MiPlugin implements Plugin {
    @Override
    public void ejecutar() {
        System.out.println("Plugin ejecutándose");
    }
}

// Módulo Consumidor: Usa servicios
module com.empresa.app {
    requires com.empresa.plugin.api;
    uses com.empresa.plugin.Plugin;
}

package com.empresa.app;

import com.empresa.plugin.Plugin;
import java.util.ServiceLoader;

public class Main {
    public static void main(String[] args) {
        ServiceLoader<Plugin> loader = ServiceLoader.load(Plugin.class);
        
        for (Plugin plugin : loader) {
            plugin.ejecutar();
        }
    }
}
```

## ⚙️ Migración a Módulos

### Enfoque Incremental

1. **Bottom-up**: Modularizar bibliotecas primero
   ```
   libs (módulos) → servicios (módulos) → app (módulo)
   ```

2. **Top-down**: Módulo automático para JARs antiguos
   ```bash
   # JAR antiguo sin module-info.java
   # Se convierte automáticamente en módulo
   java --module-path libs --add-modules old.jar ...
   ```

3. **Parches para código legacy**
   ```bash
   # Agregar exports a módulos del JDK
   --add-exports java.base/sun.security.util=ALL-UNNAMED
   
   # Abrir packages para reflection
   --add-opens java.base/java.lang=ALL-UNNAMED
   ```

## ⚠️ Problemas Comunes

> ❌ **Split Package**: Mismo package en múltiples módulos

```java
// ❌ ILEGAL
// Módulo A: com.empresa.util
// Módulo B: com.empresa.util  // Error: split package
```

> ⚠️ **Dependencias Transitivas**

```java
// Módulo A
module A {
    requires transitive B;  // Exporta dependencia
}

// Módulo C
module C {
    requires A;  // Automáticamente obtiene acceso a B
}
```

## 💪 Ejercicio Práctico

Crea un sistema modular con 3 módulos:
1. **math.core**: Operaciones básicas (suma, resta)
2. **math.advanced**: Operaciones avanzadas (potencia, raíz) que usa core
3. **calculator.app**: Aplicación que usa ambos módulos

<details>
<summary>✅ Solución</summary>

```java
// math.core/module-info.java
module math.core {
    exports com.math.core;
}

// math.core/com/math/core/Operaciones.java
package com.math.core;

public class Operaciones {
    public static double sumar(double a, double b) {
        return a + b;
    }
    
    public static double restar(double a, double b) {
        return a - b;
    }
}

// math.advanced/module-info.java
module math.advanced {
    requires math.core;
    exports com.math.advanced;
}

// math.advanced/com/math/advanced/OperacionesAvanzadas.java
package com.math.advanced;

import com.math.core.Operaciones;

public class OperacionesAvanzadas {
    public static double potencia(double base, double exponente) {
        return Math.pow(base, exponente);
    }
    
    public static double promedio(double a, double b) {
        return Operaciones.sumar(a, b) / 2;
    }
}

// calculator.app/module-info.java
module calculator.app {
    requires math.core;
    requires math.advanced;
}

// calculator.app/com/calculator/Main.java
package com.calculator;

import com.math.core.Operaciones;
import com.math.advanced.OperacionesAvanzadas;

public class Main {
    public static void main(String[] args) {
        System.out.println("Suma: " + Operaciones.sumar(5, 3));
        System.out.println("Potencia: " + OperacionesAvanzadas.potencia(2, 10));
        System.out.println("Promedio: " + OperacionesAvanzadas.promedio(10, 20));
    }
}
```
</details>

## 🎯 Ventajas vs Desventajas

| ✅ Ventajas | ❌ Desventajas |
|------------|---------------|
| Encapsulación fuerte | Curva de aprendizaje |
| Dependencias claras | Migración compleja |
| Imágenes runtime pequeñas | Incompatibilidad con código antiguo |
| Mejor performance | Frameworks pueden tener problemas |
| Elimina classpath hell | Requiere rediseño de arquitectura |

## 🔗 Temas Relacionados

- [Packages](../basico/poo-clases)
- [Interfaces](../intermedio/interfaces)
- [Reflection](./reflection)

## 📚 Recursos Adicionales

- [Project Jigsaw](https://openjdk.org/projects/jigsaw/)
- [Module System Guide](https://docs.oracle.com/javase/specs/jls/se21/html/jls-7.html#jls-7.7)
- [jlink Documentation](https://docs.oracle.com/en/java/javase/21/docs/specs/man/jlink.html)
