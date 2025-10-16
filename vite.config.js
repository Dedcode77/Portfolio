import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator';

export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      include: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    }),

    mode === 'false' &&
      obfuscatorPlugin({
      compact: true,
  stringArray: true,
  rotateStringArray: true,
        stringArrayEncoding: ['rc4'],
        stringArrayThreshold: 0.75,
      }),
  ],

  esbuild: {
    loader: 'jsx',
  },
}));
