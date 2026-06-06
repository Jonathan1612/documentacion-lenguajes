import { getAllContent } from '@/lib/content';
import Link from 'next/link';
import { BookOpen, Clock, Tag } from 'lucide-react';

interface LanguagePageProps {
  params: {
    language: string;
  };
}

const languageInfo: Record<string, { name: string; icon: string; color: string }> = {
  java: { name: 'Java', icon: '☕', color: 'text-java' },
  javascript: { name: 'JavaScript', icon: '🟨', color: 'text-javascript' },
  python: { name: 'Python', icon: '🐍', color: 'text-python' },
  golang: { name: 'Go', icon: '🔵', color: 'text-golang' },
  css: { name: 'CSS', icon: '🎨', color: 'text-css' },
  html: { name: 'HTML', icon: '📄', color: 'text-html' },
};

export default function LanguagePage({ params }: LanguagePageProps) {
  const { language } = params;
  const content = getAllContent(language);
  const info = languageInfo[language] || { name: language, icon: '📚', color: 'text-primary' };
  
  // Agrupar por nivel
  const basico = content.filter(c => c.level === 'basico');
  const intermedio = content.filter(c => c.level === 'intermedio');
  const avanzado = content.filter(c => c.level === 'avanzado');
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-6xl">{info.icon}</span>
          <div>
            <h1 className={`text-5xl font-bold ${info.color}`}>{info.name}</h1>
            <p className="text-muted-foreground mt-2">
              Documentación completa de {info.name} - {content.length} temas disponibles
            </p>
          </div>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-12">
        <StatCard title="Básico" count={basico.length} color="bg-green-500" />
        <StatCard title="Intermedio" count={intermedio.length} color="bg-yellow-500" />
        <StatCard title="Avanzado" count={avanzado.length} color="bg-red-500" />
      </div>
      
      {/* Content Sections */}
      {basico.length > 0 && (
        <ContentSection 
          title="📚 Nivel Básico" 
          description="Conceptos fundamentales para comenzar"
          items={basico}
          language={language}
          level="basico"
        />
      )}
      
      {intermedio.length > 0 && (
        <ContentSection 
          title="📖 Nivel Intermedio" 
          description="Profundiza tus conocimientos"
          items={intermedio}
          language={language}
          level="intermedio"
        />
      )}
      
      {avanzado.length > 0 && (
        <ContentSection 
          title="🚀 Nivel Avanzado" 
          description="Conviértete en un experto"
          items={avanzado}
          language={language}
          level="avanzado"
        />
      )}
      
      {content.length === 0 && (
        <div className="text-center py-16">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Contenido próximamente</h2>
          <p className="text-muted-foreground">
            Estamos trabajando en el contenido de {info.name}
          </p>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, count, color }: { title: string; count: number; color: string }) {
  return (
    <div className="p-6 border border-border rounded-lg bg-secondary/30">
      <div className={`w-3 h-3 rounded-full ${color} mb-2`} />
      <div className="text-3xl font-bold mb-1">{count}</div>
      <div className="text-sm text-muted-foreground">{title}</div>
    </div>
  );
}

function ContentSection({ 
  title, 
  description, 
  items, 
  language,
  level 
}: { 
  title: string; 
  description: string; 
  items: any[];
  language: string;
  level: string;
}) {
  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((item) => (
          <Link 
            key={item.slug} 
            href={`/${language}/${item.slug}`}
            className="block p-6 border border-border rounded-lg hover:shadow-lg hover:border-primary transition-all"
          >
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              {item.title}
            </h3>
            
            {item.duration && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                <Clock className="w-4 h-4" />
                {item.duration}
              </div>
            )}
            
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {item.tags.slice(0, 3).map((tag: string) => (
                  <span key={tag} className="text-xs px-2 py-1 bg-secondary rounded">
                    {tag}
                  </span>
                ))}
                {item.tags.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-secondary rounded">
                    +{item.tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
