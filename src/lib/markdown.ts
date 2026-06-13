import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';

/**
 * Configura el renderizador de markdown con syntax highlighting y estilos mejorados
 */
export function configureMarkdown() {
  const renderer = new marked.Renderer();
  
  // Renderizado de código con mejoras
  renderer.code = (code, language) => {
    const validLanguage = language && Prism.languages[language] ? language : 'plaintext';
    const highlighted = Prism.highlight(
      code,
      Prism.languages[validLanguage],
      validLanguage
    );
    
    return `<div class="code-block-wrapper">
      <div class="code-block-header">
        <span class="code-language">${validLanguage}</span>
      </div>
      <pre class="language-${validLanguage}"><code class="language-${validLanguage}">${highlighted}</code></pre>
    </div>`;
  };
  
  // Headings con IDs y anchor links
  renderer.heading = (text, level) => {
    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    return `<h${level} id="${id}" class="markdown-heading">
      <a href="#${id}" class="heading-anchor" aria-hidden="true">#</a>
      ${text}
    </h${level}>`;
  };
  
  // Tablas con estilos
  renderer.table = (header, body) => {
    return `<div class="table-wrapper">
      <table class="markdown-table">
        <thead>${header}</thead>
        <tbody>${body}</tbody>
      </table>
    </div>`;
  };
  
  // Blockquotes mejorados (para alertas)
  renderer.blockquote = (quote) => {
    // Detectar tipo de alerta
    const alertMatch = quote.match(/^<p>([⚠️✅❌ℹ️💡]|\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\])/);
    
    if (alertMatch) {
      const emoji = alertMatch[1];
      let alertClass = 'alert-info';
      let alertTitle = 'Nota';
      
      if (emoji.includes('⚠️') || emoji.includes('WARNING')) {
        alertClass = 'alert-warning';
        alertTitle = 'Advertencia';
      } else if (emoji.includes('❌') || emoji.includes('CAUTION')) {
        alertClass = 'alert-danger';
        alertTitle = 'Precaución';
      } else if (emoji.includes('✅') || emoji.includes('TIP')) {
        alertClass = 'alert-success';
        alertTitle = 'Consejo';
      } else if (emoji.includes('💡') || emoji.includes('IMPORTANT')) {
        alertClass = 'alert-important';
        alertTitle = 'Importante';
      }
      
      return `<div class="markdown-alert ${alertClass}">
        <div class="alert-title">${alertTitle}</div>
        ${quote}
      </div>`;
    }
    
    return `<blockquote class="markdown-blockquote">${quote}</blockquote>`;
  };
  
  // Listas con mejores estilos
  renderer.list = (body, ordered, start) => {
    const type = ordered ? 'ol' : 'ul';
    const startAttr = ordered && start !== 1 ? ` start="${start}"` : '';
    return `<${type}${startAttr} class="markdown-list">${body}</${type}>`;
  };
  
  // Code inline
  renderer.codespan = (code) => {
    return `<code class="inline-code">${code}</code>`;
  };
  
  // Links con icon externo
  renderer.link = (href, title, text) => {
    const isExternal = href?.startsWith('http');
    const external = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
    const icon = isExternal ? '<span class="external-link-icon">↗</span>' : '';
    const titleAttr = title ? ` title="${title}"` : '';
    return `<a href="${href}"${titleAttr}${external} class="markdown-link">${text}${icon}</a>`;
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
