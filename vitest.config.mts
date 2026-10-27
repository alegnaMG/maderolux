import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // No replicamos babel-plugin-react-compiler aquí a propósito: el compilador
  // es una optimización de build y los tests validan comportamiento, no output.
  plugins: [react()],
  // Resuelve el alias "@/*" de tsconfig.json de forma nativa (Vite 7+),
  // sin necesidad del plugin vite-tsconfig-paths.
  resolve: { tsconfigPaths: true },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      // json-summary: la tabla de texto oculta los archivos que ya están al
      // 100%, así que el dato por archivo se lee de coverage-summary.json.
      reporter: ['text', 'html', 'json-summary'],
      include: ['src/components/**/*.{ts,tsx}', 'src/lib/**/*.{ts,tsx}'],
      // src/components/ui/** es código generado por shadcn: no lo mantenemos
      // nosotros, así que no entra en el umbral.
      exclude: ['src/components/ui/**', 'src/**/*.test.{ts,tsx}'],
      thresholds: {
        lines: 100,
        branches: 100,
        functions: 100,
        statements: 100,
      },
    },
  },
});
