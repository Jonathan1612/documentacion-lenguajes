# 🚀 Guía de Inicio Rápido

## 📦 Instalación

```bash
# Navegar al proyecto
cd documentacion-lenguajes

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
documentacion-lenguajes/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Página principal
│   │   ├── [language]/         # Páginas dinámicas por lenguaje
│   │   └── search/             # Página de búsqueda
│   ├── components/             # Componentes React
│   │   ├── Header.tsx          # Barra superior
│   │   ├── Sidebar.tsx         # Menú lateral
│   │   └── CodePlayground.tsx  # Editor de código
│   └── lib/                    # Utilidades
│       ├── content.ts          # Manejo de contenido
│       ├── markdown.ts         # Procesamiento MD
│       └── utils.ts            # Helpers
├── content/                    # 📚 CONTENIDO DE DOCUMENTACIÓN
│   ├── _templates/             # Plantillas para nuevo contenido
│   │   └── topic-template.md
│   ├── java/
│   │   ├── basico/
│   │   ├── intermedio/
│   │   └── avanzado/
│   ├── javascript/
│   ├── python/
│   └── ...
└── public/                     # Archivos estáticos
```

## ✍️ Cómo Agregar Nuevo Contenido

### 1. Usar la plantilla

Copia el archivo `content/_templates/topic-template.md` como base.

### 2. Crear nuevo archivo

Ejemplo para agregar "Operadores en Java":

```bash
# Crear el archivo
content/java/basico/operadores.md
```

### 3. Formato del archivo

```markdown
---
title: "Operadores en Java"
level: basico
category: fundamentos
tags: [operadores, aritmeticos, logicos]
duration: 15min
prerequisites: [variables]
---

# Operadores en Java

## 📋 ¿Qué son?
[Tu contenido aquí]

## 💡 Ejemplos
\`\`\`java
int suma = 5 + 3;
\`\`\`
```

### 4. El contenido aparecerá automáticamente

- En la navegación del sidebar
- En la lista de temas del lenguaje
- En los resultados de búsqueda

## 🎨 Niveles y Categorías

### Niveles disponibles:
- `basico` - Para principiantes
- `intermedio` - Conocimientos previos necesarios
- `avanzado` - Conceptos complejos

### Estructura recomendada por lenguaje:

```
java/
├── basico/
│   ├── introduccion.md
│   ├── variables.md
│   ├── operadores.md
│   ├── control-flujo.md
│   └── funciones.md
├── intermedio/
│   ├── poo.md
│   ├── collections.md
│   ├── streams.md
│   └── excepciones.md
└── avanzado/
    ├── concurrencia.md
    ├── spring-boot.md
    └── testing.md
```

## 🔍 Sistema de Búsqueda

La búsqueda indexa automáticamente:
- Títulos de temas
- Tags/etiquetas
- Categorías
- Contenido del markdown

## 💻 Comandos Útiles

```bash
# Desarrollo
npm run dev           # Inicia servidor de desarrollo

# Producción
npm run build         # Construye para producción
npm start             # Inicia servidor de producción

# Validación
npm run lint          # Ejecuta linter
npm run type-check    # Verifica tipos TypeScript
```

## 🎯 Próximas Características (Roadmap)

### Fase 2 - Editor Interactivo
- [ ] Integrar Monaco Editor (VS Code)
- [ ] Ejecutar código en el navegador
- [ ] Validación automática de ejercicios

### Fase 3 - Usuarios y Progreso
- [ ] Autenticación (Auth.js)
- [ ] Base de datos (PostgreSQL + Prisma)
- [ ] Sistema de puntos y badges
- [ ] Historial de ejercicios completados

### Fase 4 - Contenido Expandido
- [ ] Completar todos los niveles de Java
- [ ] Agregar JavaScript completo
- [ ] Agregar Python completo
- [ ] Más lenguajes: Go, Rust, TypeScript

## 📝 Tips para Escribir Contenido

### ✅ Buenas prácticas:

1. **Explicaciones claras**: Como si le hablaras a un principiante
2. **Muchos ejemplos**: El código habla más que las palabras
3. **Ejercicios graduales**: De fácil a difícil
4. **Errores comunes**: Anticipa problemas típicos
5. **Enlaces relacionados**: Conecta temas entre sí

### Ejemplo de buen contenido:

```markdown
## 💡 Ejemplo Práctico

\`\`\`java
// Mal - Sin comentarios
int x = 5 + 3;

// Bien - Con explicación
int sumaTotal = precioProducto + impuesto; // Calcula el precio final
\`\`\`

**Explicación**: Siempre usa nombres descriptivos...
```

## 🤝 Contribuir

Para agregar más lenguajes o mejorar el contenido:

1. Crea una nueva carpeta en `content/`
2. Sigue la estructura: `basico/`, `intermedio/`, `avanzado/`
3. Usa la plantilla de `_templates/topic-template.md`
4. Agrega el lenguaje en `src/components/Sidebar.tsx` (navigationData)

## 🐛 Resolución de Problemas

### El contenido no aparece
- Verifica que el archivo `.md` esté en la ruta correcta
- Revisa que el frontmatter (---) esté bien formado
- Comprueba que los campos requeridos estén presentes

### Error de compilación
```bash
# Limpia y reinstala
rm -rf .next node_modules
npm install
npm run dev
```

## 📚 Recursos Adicionales

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Markdown Guide](https://www.markdownguide.org/)

---

**¡Feliz aprendizaje! 🎓**
