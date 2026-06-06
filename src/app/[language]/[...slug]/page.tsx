import { getContentByPath } from '@/lib/content';
import { markdownToHtml } from '@/lib/markdown';
import { Clock, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: {
    language: string;
    slug: string[];
  };
}

export default async function ContentPage({ params }: PageProps) {
  const { language, slug } = params;
  const slugPath = slug.join('/');
  
  const content = getContentByPath(language, slugPath);
  
  if (!content) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Contenido no encontrado</h1>
        <p className="text-muted-foreground mb-8">
          El contenido que buscas no existe o ha sido movido.
        </p>
        <Link href={`/${language}`} className="text-primary hover:underline">
          Volver a {language}
        </Link>
      </div>
    );
  }
  
  const htmlContent = await markdownToHtml(content.content);
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Inicio
        </Link>
        <span>/</span>
        <Link href={`/${language}`} className="hover:text-foreground transition-colors capitalize">
          {language}
        </Link>
        <span>/</span>
        <span className="text-foreground">{content.title}</span>
      </nav>
      
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(content.level)}`}>
            {content.level}
          </span>
          {content.duration && (
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              {content.duration}
            </span>
          )}
        </div>
        
        <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
        
        {content.tags && content.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {content.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 px-2 py-1 bg-secondary rounded text-xs">
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>
      
      {/* Prerequisites */}
      {content.prerequisites && content.prerequisites.length > 0 && (
        <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">
            📚 Requisitos previos
          </h3>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Se recomienda conocer: {content.prerequisites.join(', ')}
          </p>
        </div>
      )}
      
      {/* Content */}
      <article 
        className="prose prose-lg dark:prose-invert max-w-none
                   prose-headings:font-bold prose-headings:text-foreground
                   prose-p:text-foreground prose-li:text-foreground
                   prose-strong:text-foreground prose-code:text-foreground
                   prose-pre:bg-secondary prose-pre:border prose-pre:border-border
                   prose-a:text-primary hover:prose-a:underline
                   prose-blockquote:border-l-primary prose-blockquote:bg-secondary/50"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      
      {/* Navigation */}
      <div className="mt-12 pt-8 border-t border-border">
        <Link 
          href={`/${language}`}
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a {language}
        </Link>
      </div>
    </div>
  );
}

function getLevelColor(level: string): string {
  switch (level) {
    case 'basico':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
    case 'intermedio':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200';
    case 'avanzado':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200';
  }
}

// Generate static params for all content
export async function generateStaticParams() {
  // En producción, aquí generarías todas las rutas estáticas
  return [];
}
