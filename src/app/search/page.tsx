'use client';

import { useState } from 'react';
import { Search as SearchIcon, BookOpen, Tag } from 'lucide-react';
import Link from 'next/link';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }
    
    setIsSearching(true);
    
    // Simulación de búsqueda (en producción, llamarías a una API)
    setTimeout(() => {
      const mockResults = [
        {
          title: 'Variables y Tipos de Datos',
          language: 'java',
          slug: 'basico/variables',
          level: 'basico',
          tags: ['variables', 'tipos', 'primitivos'],
        },
        {
          title: 'Streams y Lambdas',
          language: 'java',
          slug: 'intermedio/streams',
          level: 'intermedio',
          tags: ['streams', 'lambda', 'functional'],
        },
      ].filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      
      setResults(mockResults);
      setIsSearching(false);
    }, 300);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Buscar Contenido</h1>
        <p className="text-muted-foreground">
          Encuentra cualquier tema, concepto o ejemplo rápidamente
        </p>
      </div>

      {/* Search Input */}
      <div className="relative mb-8">
        <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Buscar por tema, etiqueta o palabra clave..."
          className="w-full pl-12 pr-4 py-4 border border-border rounded-lg bg-background text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-primary"
          autoFocus
        />
      </div>

      {/* Results */}
      {query.length >= 2 && (
        <div>
          <div className="mb-4 text-sm text-muted-foreground">
            {isSearching ? (
              'Buscando...'
            ) : (
              `${results.length} resultado${results.length !== 1 ? 's' : ''} encontrado${results.length !== 1 ? 's' : ''}`
            )}
          </div>

          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map((result, index) => (
                <Link
                  key={index}
                  href={`/${result.language}/${result.slug}`}
                  className="block p-6 border border-border rounded-lg hover:shadow-lg hover:border-primary transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      {result.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(result.level)}`}>
                      {result.level}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-muted-foreground capitalize">
                      {result.language}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {result.tags.map((tag: string) => (
                      <span key={tag} className="flex items-center gap-1 text-xs px-2 py-1 bg-secondary rounded">
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          ) : !isSearching && (
            <div className="text-center py-16">
              <SearchIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No se encontraron resultados</h3>
              <p className="text-muted-foreground">
                Intenta con otros términos de búsqueda
              </p>
            </div>
          )}
        </div>
      )}

      {/* Popular Topics */}
      {query.length < 2 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Temas Populares</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {['variables', 'funciones', 'arrays', 'loops', 'clases', 'streams', 'async', 'promises'].map(tag => (
              <button
                key={tag}
                onClick={() => handleSearch(tag)}
                className="p-3 border border-border rounded-lg hover:bg-secondary transition-colors text-left"
              >
                <Tag className="w-4 h-4 inline mr-2 text-primary" />
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
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
