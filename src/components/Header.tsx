'use client';

import Link from 'next/link';
import { Search, Moon, Sun, Menu } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="font-bold text-xl">DevDocs</span>
          </Link>
          
          <nav className="hidden md:flex gap-6">
            <Link href="/java" className="text-sm font-medium hover:text-primary transition-colors">
              Java
            </Link>
            <Link href="/javascript" className="text-sm font-medium hover:text-primary transition-colors">
              JavaScript
            </Link>
            <Link href="/python" className="text-sm font-medium hover:text-primary transition-colors">
              Python
            </Link>
            <Link href="/golang" className="text-sm font-medium hover:text-primary transition-colors">
              Go
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/search"
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">Buscar...</span>
            <kbd className="hidden sm:inline pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
              <span className="text-xs">Ctrl+K</span>
            </kbd>
          </Link>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
