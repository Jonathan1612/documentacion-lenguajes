'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, BookOpen, Code, Layers } from 'lucide-react';
import { useState } from 'react';

const navigationData = {
  java: {
    name: 'Java',
    icon: '☕',
    sections: [
      {
        title: 'Básico',
        items: [
          { title: 'Introducción', href: '/java/basico/introduccion' },
          { title: 'Variables y Tipos', href: '/java/basico/variables' },
          { title: 'Operadores', href: '/java/basico/operadores' },
          { title: 'Control de Flujo', href: '/java/basico/control-flujo' },
          { title: 'Funciones', href: '/java/basico/funciones' },
          { title: 'Arrays', href: '/java/basico/arrays' },
          { title: 'Strings', href: '/java/basico/strings' },
          { title: 'POO - Clases', href: '/java/basico/poo-clases' },
          { title: 'Excepciones', href: '/java/basico/excepciones' },
          { title: 'Errores y Debugging', href: '/java/basico/errores-debugging' },
        ],
      },
      {
        title: 'Intermedio',
        items: [
          { title: 'Herencia', href: '/java/intermedio/herencia' },
          { title: 'Polimorfismo', href: '/java/intermedio/polimorfismo' },
          { title: 'Interfaces', href: '/java/intermedio/interfaces' },
          { title: 'Anotaciones', href: '/java/intermedio/anotaciones' },
          { title: 'Collections', href: '/java/intermedio/collections' },
          { title: 'Streams API', href: '/java/intermedio/streams' },
          { title: 'Genericos', href: '/java/intermedio/genericos' },
          { title: 'Lambdas', href: '/java/intermedio/lambdas' },
          { title: 'Enums', href: '/java/intermedio/enums' },
        ],
      },
      {
        title: 'Avanzado',
        items: [
          { title: 'Threads y Multithreading', href: '/java/avanzado/threads' },
          { title: 'Concurrencia Avanzada', href: '/java/avanzado/concurrencia' },
          { title: 'Optional', href: '/java/avanzado/optional' },
          { title: 'Records', href: '/java/avanzado/records' },
          { title: 'Sealed Classes', href: '/java/avanzado/sealed-classes' },
          { title: 'Pattern Matching', href: '/java/avanzado/pattern-matching' },
          { title: 'Reflection API', href: '/java/avanzado/reflection' },
          { title: 'Sistema de Módulos', href: '/java/avanzado/modulos' },
        ],
      },
    ],
  },
  javascript: {
    name: 'JavaScript',
    icon: '🟨',
    sections: [
      {
        title: 'Básico',
        items: [
          { title: 'Introducción', href: '/javascript/basico/introduccion' },
          { title: 'Variables (let, const, var)', href: '/javascript/basico/variables' },
          { title: 'Tipos de Datos', href: '/javascript/basico/tipos' },
          { title: 'Funciones', href: '/javascript/basico/funciones' },
        ],
      },
      {
        title: 'Intermedio',
        items: [
          { title: 'Arrays y Métodos', href: '/javascript/intermedio/arrays' },
          { title: 'Objetos', href: '/javascript/intermedio/objetos' },
          { title: 'Async/Await', href: '/javascript/intermedio/async' },
          { title: 'ES6+ Features', href: '/javascript/intermedio/es6' },
        ],
      },
    ],
  },
  python: {
    name: 'Python',
    icon: '🐍',
    sections: [
      {
        title: 'Básico',
        items: [
          { title: 'Introducción', href: '/python/basico/introduccion' },
          { title: 'Variables y Tipos', href: '/python/basico/variables' },
          { title: 'Operadores', href: '/python/basico/operadores' },
          { title: 'Control de Flujo', href: '/python/basico/control-flujo' },
          { title: 'Funciones', href: '/python/basico/funciones' },
          { title: 'Listas y Tuplas', href: '/python/basico/listas-tuplas' },
          { title: 'Diccionarios', href: '/python/basico/diccionarios' },
          { title: 'Strings', href: '/python/basico/strings' },
          { title: 'Sets', href: '/python/basico/sets' },
          { title: 'Errores y Debugging', href: '/python/basico/errores-debugging' },
        ],
      },
      {
        title: 'Intermedio',
        items: [
          { title: 'Archivos', href: '/python/intermedio/archivos' },
          { title: 'Módulos', href: '/python/intermedio/modulos' },
          { title: 'Clases', href: '/python/intermedio/clases' },
          { title: 'Herencia', href: '/python/intermedio/herencia' },
          { title: 'Métodos Especiales', href: '/python/intermedio/metodos-especiales' },
          { title: 'Iteradores y Generadores', href: '/python/intermedio/iteradores-generadores' },
          { title: 'Decoradores', href: '/python/intermedio/decoradores' },
          { title: 'Programación Funcional', href: '/python/intermedio/funcional' },
          { title: 'Comprehensions', href: '/python/intermedio/comprehensions' },
          { title: 'Fechas y Tiempos', href: '/python/intermedio/datetime' },
          { title: 'Regex', href: '/python/intermedio/regex' },
          { title: 'Context Managers', href: '/python/intermedio/context-managers' },
        ],
      },
      {
        title: 'Avanzado',
        items: [
          { title: 'Concurrencia', href: '/python/avanzado/concurrencia' },
          { title: 'Async/Await', href: '/python/avanzado/asyncio' },
          { title: 'Type Hints', href: '/python/avanzado/type-hints' },
          { title: 'Metaclases', href: '/python/avanzado/metaclases' },
          { title: 'Descriptores', href: '/python/avanzado/descriptores' },
          { title: 'Testing', href: '/python/avanzado/testing' },
          { title: 'Gestión de Dependencias', href: '/python/avanzado/dependencias' },
          { title: 'Performance', href: '/python/avanzado/performance' },
        ],
      },
      {
        title: 'AI Engineering',
        items: [
          { title: 'SQL con Python', href: '/python/ai-engineering/sql-python' },
          { title: 'APIs REST', href: '/python/ai-engineering/apis-rest' },
          { title: 'FastAPI', href: '/python/ai-engineering/fastapi' },
          { title: 'LLMs y OpenAI', href: '/python/ai-engineering/llms-openai' },
          { title: 'RAG Systems', href: '/python/ai-engineering/rag-systems' },
          { title: 'LangChain', href: '/python/ai-engineering/langchain' },
          { title: 'LangGraph', href: '/python/ai-engineering/langgraph' },
          { title: 'MCP', href: '/python/ai-engineering/mcp' },
          { title: 'n8n', href: '/python/ai-engineering/n8n' },
          { title: 'Prompt Engineering', href: '/python/ai-engineering/prompt-engineering' },
          { title: 'Deployment', href: '/python/ai-engineering/deployment' },
        ],
      },
    ],
  },
};

export function Sidebar() {
  const pathname = usePathname();
  const currentLang = pathname.split('/')[1] as keyof typeof navigationData;
  const [expandedSections, setExpandedSections] = useState<string[]>(['Básico']);

  const toggleSection = (title: string) => {
    setExpandedSections(prev =>
      prev.includes(title) ? prev.filter(s => s !== title) : [...prev, title]
    );
  };

  if (!currentLang || !navigationData[currentLang]) {
    return null;
  }

  const currentNav = navigationData[currentLang];

  return (
    <aside className="hidden lg:block w-64 border-r border-border bg-secondary/30 overflow-y-auto">
      <div className="p-4 sticky top-0 bg-secondary/50 backdrop-blur border-b border-border">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">{currentNav.icon}</span>
          <h2 className="font-bold text-lg">{currentNav.name}</h2>
        </div>
      </div>

      <nav className="p-4 space-y-6">
        {currentNav.sections.map((section) => (
          <div key={section.title}>
            <button
              onClick={() => toggleSection(section.title)}
              className="flex items-center justify-between w-full text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-2"
            >
              <span>{section.title}</span>
              <ChevronRight
                className={`w-4 h-4 transition-transform ${
                  expandedSections.includes(section.title) ? 'rotate-90' : ''
                }`}
              />
            </button>
            
            {expandedSections.includes(section.title) && (
              <ul className="space-y-1 ml-2">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block py-2 px-3 rounded text-sm transition-colors ${
                        pathname === item.href
                          ? 'bg-primary text-primary-foreground font-medium'
                          : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
