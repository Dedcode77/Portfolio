import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator';

export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      include: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    }),

    mode === 'production' &&
      obfuscatorPlugin({
        compact: true,
        controlFlowFlattening: true,
        deadCodeInjection: true,
        stringArray: true,
        rotateStringArray: true,
        stringArrayEncoding: ['rc4'],
        stringArrayThreshold: 0.75,
      }),
  ].filter(Boolean), // Enlève les valeurs false

  esbuild: {
    loader: 'jsx',
  },

  base: './', // Important pour le déploiement

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },

  // Gérer les assets
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.jpeg', '**/*.gif', '**/*.svg'],
}));