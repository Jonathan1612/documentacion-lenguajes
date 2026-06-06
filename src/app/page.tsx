import Link from 'next/link';
import { BookOpen, Code2, Rocket, Search } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Aprende Programación
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Documentación completa, ejemplos prácticos y ejercicios interactivos para convertirte en un experto desarrollador
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/java/basico"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity inline-flex items-center gap-2"
          >
            <Rocket className="w-5 h-5" />
            Comenzar
          </Link>
          <Link
            href="/search"
            className="px-6 py-3 border border-border rounded-lg hover:bg-secondary transition-colors inline-flex items-center gap-2"
          >
            <Search className="w-5 h-5" />
            Explorar
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <FeatureCard
          icon={<BookOpen className="w-8 h-8 text-blue-500" />}
          title="Documentación Completa"
          description="Desde conceptos básicos hasta temas avanzados, todo lo que necesitas en un solo lugar"
        />
        <FeatureCard
          icon={<Code2 className="w-8 h-8 text-green-500" />}
          title="Ejemplos Prácticos"
          description="Aprende con código real y ejemplos que puedes ejecutar directamente en el navegador"
        />
        <FeatureCard
          icon={<Rocket className="w-8 h-8 text-purple-500" />}
          title="Ejercicios Interactivos"
          description="Practica y valida tu código con nuestro sistema de ejercicios automáticos"
        />
      </section>

      {/* Languages Grid */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Lenguajes Disponibles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LanguageCard
            name="Java"
            icon="☕"
            color="bg-java"
            description="POO, Collections, Streams, Spring Boot"
            href="/java"
          />
          <LanguageCard
            name="JavaScript"
            icon="🟨"
            color="bg-javascript"
            description="ES6+, Async/Await, React, Node.js"
            href="/javascript"
          />
          <LanguageCard
            name="Python"
            icon="🐍"
            color="bg-python"
            description="Básico, POO, Django, Data Science"
            href="/python"
          />
          <LanguageCard
            name="Go"
            icon="🔵"
            color="bg-golang"
            description="Concurrencia, APIs, Microservicios"
            href="/golang"
          />
          <LanguageCard
            name="CSS"
            icon="🎨"
            color="bg-css"
            description="Flexbox, Grid, Animaciones"
            href="/css"
          />
          <LanguageCard
            name="HTML"
            icon="📄"
            color="bg-html"
            description="Semántica, Accesibilidad, SEO"
            href="/html"
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 border border-border rounded-lg hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function LanguageCard({ name, icon, color, description, href }: { name: string; icon: string; color: string; description: string; href: string }) {
  return (
    <Link href={href} className="block">
      <div className="p-6 border border-border rounded-lg hover:shadow-lg transition-all hover:scale-105">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{icon}</span>
          <h3 className="text-2xl font-bold">{name}</h3>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}
