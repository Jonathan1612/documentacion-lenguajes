'use client';

import { useState } from 'react';
import { Play, Check, X } from 'lucide-react';

interface CodePlaygroundProps {
  language: string;
  initialCode?: string;
  expectedOutput?: string;
}

export function CodePlayground({ language, initialCode = '', expectedOutput }: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);

  const runCode = async () => {
    setIsRunning(true);
    setOutput('');
    setTestResult(null);

    // Simulación de ejecución (en producción usarías Judge0 API o similar)
    setTimeout(() => {
      const simulatedOutput = `Salida del código:\nHola Mundo!`;
      setOutput(simulatedOutput);
      
      if (expectedOutput) {
        const isCorrect = simulatedOutput.trim() === expectedOutput.trim();
        setTestResult(isCorrect ? 'success' : 'error');
      }
      
      setIsRunning(false);
    }, 1000);
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden my-4">
      <div className="bg-secondary px-4 py-2 flex items-center justify-between border-b border-border">
        <span className="text-sm font-medium">{language}</span>
        <button
          onClick={runCode}
          disabled={isRunning}
          className="flex items-center gap-2 px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <Play className="w-4 h-4" />
          {isRunning ? 'Ejecutando...' : 'Ejecutar'}
        </button>
      </div>

      <div className="grid md:grid-cols-2 divide-x divide-border">
        <div className="p-4">
          <label className="text-xs font-medium text-muted-foreground mb-2 block">
            CÓDIGO
          </label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 p-2 bg-background border border-border rounded font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            spellCheck={false}
          />
        </div>

        <div className="p-4">
          <label className="text-xs font-medium text-muted-foreground mb-2 block">
            SALIDA
          </label>
          <div className="w-full h-64 p-2 bg-background border border-border rounded font-mono text-sm overflow-auto whitespace-pre-wrap">
            {output || 'La salida aparecerá aquí...'}
          </div>
          
          {testResult && (
            <div className={`mt-2 p-2 rounded flex items-center gap-2 text-sm ${
              testResult === 'success' 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' 
                : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
            }`}>
              {testResult === 'success' ? (
                <>
                  <Check className="w-4 h-4" />
                  ¡Correcto! El código funciona como se esperaba.
                </>
              ) : (
                <>
                  <X className="w-4 h-4" />
                  La salida no coincide con lo esperado. Intenta de nuevo.
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
