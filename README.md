# 🎓 DevDocs Learning Platform

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

> Plataforma interactiva de aprendizaje de programación con documentación completa, ejemplos prácticos y ejercicios validados automáticamente.

[🌐 Ver Demo](https://documentacion-lenguajes.vercel.app) | [📖 Documentación](./QUICK_START.md) | [🤝 Contribuir](./CONTRIBUTING.md)

## ✨ Características

- 📚 **Documentación Progresiva** - De básico a experto en múltiples lenguajes
- 🔍 **Búsqueda Inteligente** - Encuentra cualquier concepto rápidamente
- 💻 **Editor Integrado** - Practica código directamente en el navegador
- ✅ **Ejercicios Validados** - Sistema automático de verificación
- 🎯 **Progreso Tracking** - Sigue tu avance de aprendizaje
- 🌙 **Modo Oscuro** - Interfaz amigable con tus ojos
- 📱 **Responsive** - Funciona perfectamente en móvil y desktop

## 🚀 Lenguajes Disponibles

| Lenguaje | Estado | Temas |
|----------|--------|-------|
| ☕ **Java** | ✅ En progreso | Variables, Streams, Spring Boot |
| 🟨 **JavaScript** | 🔄 Próximamente | ES6+, Async/Await, React |
| 🐍 **Python** | 🔄 Próximamente | Básico, POO, Django |
| 🔵 **Go** | 📋 Planeado | Concurrencia, APIs |
| 🎨 **CSS** | 📋 Planeado | Flexbox, Grid, Animaciones |
| 📄 **HTML** | 📋 Planeado | Semántica, Accesibilidad |

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Procesamiento MD**: Gray Matter + Marked
- **Syntax Highlighting**: Prism.js
- **Editor**: Monaco Editor (próximamente)
- **Búsqueda**: Fuse.js

## 📦 Instalación Local

```bash
# Clonar el repositorio
git clone git@github.com:Jonathan1612/documentacion-lenguajes.git
cd documentacion-lenguajes

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Visita [http://localhost:3000](http://localhost:3000) 🎉

## 📁 Estructura del Proyecto

```
documentacion-lenguajes/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── [language]/   # Páginas dinámicas por lenguaje
│   │   └── search/       # Búsqueda global
│   ├── components/       # Componentes React reutilizables
│   └── lib/              # Utilidades y helpers
├── content/              # 📚 Contenido de documentación (Markdown)
│   ├── _templates/       # Plantillas para nuevo contenido
│   ├── java/            # Documentación de Java
│   ├── javascript/      # Documentación de JavaScript
│   └── ...              # Más lenguajes
└── public/              # Archivos estáticos
```

## ✍️ Cómo Contribuir con Contenido

### 1. Crea un nuevo archivo Markdown

```bash
# Ejemplo: Agregar "Operadores en Java"
content/java/basico/operadores.md
```

### 2. Usa el formato establecido

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
[Tu explicación aquí]

## 💡 Ejemplos
\`\`\`java
int suma = 5 + 3;
\`\`\`
```

### 3. El contenido aparece automáticamente ✨

Ver la [guía completa de contribución](./CONTRIBUTING.md) para más detalles.

## 🎯 Roadmap

### ✅ Fase 1: MVP (Completado)
- [x] Estructura base del proyecto
- [x] Sistema de navegación y rutas dinámicas
- [x] Procesamiento de Markdown
- [x] Búsqueda básica
- [x] Contenido inicial de Java

### 🔄 Fase 2: Interactividad (En desarrollo)
- [ ] Integrar Monaco Editor
- [ ] Ejecutar código en el navegador
- [ ] Sistema de validación de ejercicios
- [ ] Tests automatizados

### 📋 Fase 3: Usuarios y Progreso
- [ ] Autenticación (NextAuth.js)
- [ ] Base de datos (PostgreSQL + Prisma)
- [ ] Sistema de puntos y badges
- [ ] Historial de ejercicios completados

### 📋 Fase 4: Contenido Expandido
- [ ] Completar todos los niveles de Java
- [ ] JavaScript completo
- [ ] Python completo
- [ ] Más lenguajes: Go, Rust, C++

## 💻 Scripts Disponibles

```bash
npm run dev          # Desarrollo local
npm run build        # Build de producción
npm start            # Servidor de producción
npm run lint         # Linter ESLint
npm run type-check   # Verificación de tipos TypeScript
```

## 🌐 Deploy

### Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Jonathan1612/documentacion-lenguajes)

1. Haz clic en el botón de arriba
2. Conecta tu cuenta de GitHub
3. ¡Deploy automático! 🚀

### Otras Opciones
- **Netlify**: Importa el repositorio directamente
- **Railway**: Conecta desde GitHub
- **Docker**: `docker build -t devdocs . && docker run -p 3000:3000 devdocs`

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](./LICENSE) para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas! Por favor revisa:
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Guía de contribución
- [QUICK_START.md](./QUICK_START.md) - Guía de inicio rápido

## 📧 Contacto

- **GitHub**: [@Jonathan1612](https://github.com/Jonathan1612)
- **Proyecto**: [documentacion-lenguajes](https://github.com/Jonathan1612/documentacion-lenguajes)

---

**Hecho con ❤️ para desarrolladores que quieren aprender y crecer** 🎓✨

¿Te gusta el proyecto? ¡Dale una ⭐ en GitHub!
