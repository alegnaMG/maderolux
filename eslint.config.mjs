import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import eslintConfigPrettier from 'eslint-config-prettier';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Siempre el último: desactiva las reglas de estilo que chocarían con Prettier.
  eslintConfigPrettier,
  globalIgnores([
    // Ignorados por defecto de eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Reporte HTML/JS generado por Vitest.
    'coverage/**',
  ]),
]);

export default eslintConfig;
