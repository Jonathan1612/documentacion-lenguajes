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
        ],
      },
      {
        title: 'Intermedio',
        items: [
          { title: 'POO - Clases y Objetos', href: '/java/intermedio/poo' },
          { title: 'Collections Framework', href: '/java/intermedio/collections' },
          { title: 'Streams y Lambdas', href: '/java/intermedio/streams' },
          { title: 'Excepciones', href: '/java/intermedio/excepciones' },
          { title: 'Generics', href: '/java/intermedio/generics' },
        ],
      },
      {
        title: 'Avanzado',
        items: [
          { title: 'Concurrencia', href: '/java/avanzado/concurrencia' },
          { title: 'Spring Boot', href: '/java/avanzado/spring-boot' },
          { title: 'Maven & Gradle', href: '/java/avanzado/maven-gradle' },
          { title: 'Testing (JUnit)', href: '/java/avanzado/testing' },
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
          { title: 'Listas y Tuplas', href: '/python/basico/listas' },
          { title: 'Diccionarios', href: '/python/basico/diccionarios' },
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
