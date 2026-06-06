import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface ContentMetadata {
  title: string;
  level: 'basico' | 'intermedio' | 'avanzado';
  category: string;
  tags: string[];
  duration?: string;
  prerequisites?: string[];
  slug: string;
}

export interface ContentPage extends ContentMetadata {
  content: string;
}

/**
 * Obtiene todas las rutas de contenido para un lenguaje
 */
export function getContentPaths(language: string): string[] {
  const languageDir = path.join(contentDirectory, language);
  
  if (!fs.existsSync(languageDir)) {
    return [];
  }

  const paths: string[] = [];
  
  function walkDir(dir: string) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (file.endsWith('.md')) {
        paths.push(filePath);
      }
    }
  }
  
  walkDir(languageDir);
  return paths;
}

/**
 * Obtiene el contenido de un archivo markdown
 */
export function getContentByPath(language: string, slug: string): ContentPage | null {
  try {
    const filePath = path.join(contentDirectory, language, `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      ...(data as ContentMetadata),
      content,
      slug,
    };
  } catch (error) {
    console.error('Error reading content:', error);
    return null;
  }
}

/**
 * Obtiene todos los archivos de contenido de un lenguaje
 */
export function getAllContent(language: string): ContentMetadata[] {
  const paths = getContentPaths(language);
  
  return paths.map(filePath => {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    
    const relativePath = path.relative(path.join(contentDirectory, language), filePath);
    const slug = relativePath.replace(/\.md$/, '').replace(/\\/g, '/');
    
    return {
      ...(data as ContentMetadata),
      slug,
    };
  });
}

/**
 * Busca contenido por texto
 */
export function searchContent(query: string): ContentMetadata[] {
  const languages = ['java', 'javascript', 'python', 'golang', 'css', 'html'];
  const results: ContentMetadata[] = [];
  
  for (const lang of languages) {
    const content = getAllContent(lang);
    const filtered = content.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
      item.category?.toLowerCase().includes(query.toLowerCase())
    );
    results.push(...filtered);
  }
  
  return results;
}
