# DevDocs Learning Platform - Comandos Rápidos

## 🚀 Desarrollo

```powershell
# Iniciar servidor de desarrollo
npm run dev

# El proyecto estará en: http://localhost:3000
```

## 📝 Agregar Contenido Nuevo

### Ejemplo: Agregar "Operadores en Java"

1. Crea el archivo:
```
content/java/basico/operadores.md
```

2. Usa esta plantilla:
```markdown
---
title: "Operadores en Java"
level: basico
category: fundamentos
tags: [operadores, aritmeticos, logicos, java]
duration: 15min
prerequisites: [variables]
---

# Operadores en Java

## 📋 ¿Qué son?

Los operadores son símbolos especiales que realizan operaciones...

## 💡 Ejemplos

\`\`\`java
int suma = 5 + 3;  // Operador suma
boolean resultado = 10 > 5;  // Operador comparación
\`\`\`
```

3. ¡Listo! El contenido aparecerá automáticamente

## 🗂️ Estructura de Carpetas para Cada Lenguaje

```
content/
├── java/
│   ├── basico/          # Variables, tipos, control de flujo
│   ├── intermedio/      # POO, Collections, Streams
│   └── avanzado/        # Spring Boot, Testing, Concurrencia
├── javascript/
│   ├── basico/          # Variables, funciones, DOM
│   ├── intermedio/      # Async, Promises, ES6+
│   └── avanzado/        # React, Node.js, TypeScript
├── python/
│   ├── basico/          # Tipos, listas, diccionarios
│   ├── intermedio/      # POO, módulos, excepciones
│   └── avanzado/        # Django, FastAPI, Data Science
└── _templates/          # Plantillas para copiar
```

## 🎯 Temas Sugeridos por Lenguaje

### Java
- **Básico**: Variables, Operadores, Control de Flujo, Funciones, Arrays
- **Intermedio**: POO, Collections, Streams, Excepciones, Generics, File I/O
- **Avanzado**: Concurrencia, Spring Boot, Maven/Gradle, JUnit, JDBC

### JavaScript
- **Básico**: Variables (let/const/var), Tipos, Funciones, Arrays, Objetos
- **Intermedio**: Async/Await, Promises, Arrow Functions, Destructuring, Modules
- **Avanzado**: React, Node.js, Express, TypeScript, Testing

### Python
- **Básico**: Variables, Listas, Diccionarios, Control de Flujo, Funciones
- **Intermedio**: POO, Módulos, Excepciones, List Comprehensions, Decoradores
- **Avanzado**: Django, FastAPI, Pandas, NumPy, Testing

## 🔍 Tips para el Contenido

### ✅ Contenido de Calidad
- **Explicaciones simples**: Como si le hablaras a alguien que nunca programó
- **Muchos ejemplos**: Código > texto
- **Ejercicios prácticos**: Con soluciones ocultas en `<details>`
- **Errores comunes**: Anticipa problemas típicos
- **Enlaces relacionados**: Conecta temas

### Formato de Ejercicios

```markdown
## 💪 Ejercicios Prácticos

### Ejercicio 1: Suma de Números
**Dificultad**: Fácil

Crea una función que sume dos números.

<details>
<summary>💡 Pista</summary>
Usa el operador + para sumar
</details>

<details>
<summary>✅ Solución</summary>

\`\`\`java
public static int sumar(int a, int b) {
    return a + b;
}
\`\`\`

**Explicación**: La función recibe dos parámetros...
</details>
```

## 📊 Niveles de Dificultad

| Nivel | Descripción | Ejemplos |
|-------|-------------|----------|
| `basico` | Sin conocimientos previos | Variables, tipos, if/else |
| `intermedio` | Requiere conceptos básicos | POO, Collections, Async |
| `avanzado` | Conceptos complejos | Frameworks, arquitectura |

## 🎨 Tags Recomendados

Usa tags específicos para mejor búsqueda:
- **Java**: `poo`, `collections`, `streams`, `spring-boot`, `maven`
- **JavaScript**: `async`, `promises`, `react`, `node`, `es6`
- **Python**: `listas`, `diccionarios`, `django`, `pandas`, `decoradores`

## ⚡ Atajos de Desarrollo

```powershell
# Ver errores de tipo
npm run type-check

# Linter
npm run lint

# Build de producción
npm run build

# Preview de producción
npm start
```

## 📚 Próximas Mejoras

- [ ] Editor de código real (Monaco)
- [ ] Ejecución de código en navegador
- [ ] Sistema de usuarios y progreso
- [ ] Más lenguajes: Go, Rust, C++

---

**¿Dudas?** Revisa [QUICK_START.md](./QUICK_START.md) para más detalles.
