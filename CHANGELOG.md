# Changelog

## v1.0.0 - MVP Inicial (2026-06-06)

### ✨ Características Implementadas

#### 🏗️ Infraestructura
- [x] Configuración completa de Next.js 14 + TypeScript
- [x] Tailwind CSS configurado con tema dark mode
- [x] Estructura de proyecto modular y escalable
- [x] Sistema de rutas dinámicas para contenido

#### 🎨 Componentes UI
- [x] Header con navegación y búsqueda
- [x] Sidebar dinámico por lenguaje
- [x] Layout responsive
- [x] Sistema de colores por lenguaje
- [x] CodePlayground para ejemplos interactivos (base)

#### 📚 Sistema de Contenido
- [x] Procesamiento de Markdown con Gray Matter
- [x] Syntax highlighting con Prism.js
- [x] Sistema de templates para nuevo contenido
- [x] Metadata: nivel, tags, duración, prerequisitos
- [x] Búsqueda por título, tags y categorías

#### 📝 Contenido Inicial
- [x] **Java - Básico**
  - Introducción a Java
  - Variables y Tipos de Datos
- [x] **Java - Intermedio**
  - Streams y Lambdas
- [x] Plantilla reutilizable para nuevos temas

#### 🔍 Funcionalidades
- [x] Página principal con lenguajes disponibles
- [x] Navegación por lenguaje y nivel
- [x] Búsqueda de contenido
- [x] Breadcrumbs de navegación
- [x] Tags y categorización

### 📁 Estructura Creada

```
✅ Archivos de configuración
✅ Componentes base (Header, Sidebar, CodePlayground)
✅ Sistema de rutas dinámicas
✅ Utilidades (content, markdown, utils)
✅ Contenido inicial de Java
✅ Documentación (README, QUICK_START)
```

### 🎯 Próximos Pasos (Fase 2)

#### Editor Interactivo
- [ ] Integrar Monaco Editor real
- [ ] API para ejecutar código (Judge0 / Piston)
- [ ] Sistema de tests automáticos
- [ ] Feedback visual de errores

#### Más Contenido
- [ ] Completar Java (30+ temas)
- [ ] JavaScript básico → avanzado
- [ ] Python básico → avanzado
- [ ] Go, CSS, HTML

#### UX Improvements
- [ ] Modo oscuro toggle persistente
- [ ] Atajos de teclado (Ctrl+K para búsqueda)
- [ ] Tabla de contenidos en artículos largos
- [ ] Progreso de lectura

### 🐛 Issues Conocidos
- Búsqueda es simulada (pendiente implementar índice real)
- CodePlayground no ejecuta código real aún
- Falta generación de static params para SSG completo

---

## Cómo Ejecutar

```bash
npm install
npm run dev
```

Visita `http://localhost:3000`
