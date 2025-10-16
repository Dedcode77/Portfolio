import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import obfuscator from 'vite-plugin-obfuscator';

export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      include: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    }),

    // Activer l’obfuscation uniquement en production
    mode === 'production' &&
      obfuscator({
        compact: true,
        controlFlowFlattening: true,
        deadCodeInjection: true,
        stringArray: true,
        rotateStringArray: true,
        stringArrayEncoding: ['rc4'],
        stringArrayThreshold: 0.75,
      }),
  ],

  esbuild: {
    loader: 'jsx', // Traite les fichiers .js comme du JSX
  },
}));
