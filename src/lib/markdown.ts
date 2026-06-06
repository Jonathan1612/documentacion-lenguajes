import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';

/**
 * Configura el renderizador de markdown con syntax highlighting
 */
export function configureMarkdown() {
  const renderer = new marked.Renderer();
  
  // Personalizar renderizado de código
  renderer.code = (code, language) => {
    const validLanguage = language && Prism.languages[language] ? language : 'plaintext';
    const highlighted = Prism.highlight(
      code,
      Prism.languages[validLanguage],
      validLanguage
    );
    
    return `<pre class="language-${validLanguage}"><code class="language-${validLanguage}">${highlighted}</code></pre>`;
  };
  
  // Personalizar headings para añadir IDs
  renderer.heading = (text, level) => {
    const id = text.toLowerCase().replace(/[^\w]+/g, '-');
    return `<h${level} id="${id}">${text}</h${level}>`;
  };
  
  marked.setOptions({
    renderer,
    breaks: true,
    gfm: true,
  });
}

/**
 * Convierte markdown a HTML
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  configureMarkdown();
  return marked(markdown);
}
