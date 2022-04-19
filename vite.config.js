import { defineConfig } from 'vite'
import path from 'path'
import { injectHtml, minifyHtml } from 'vite-plugin-html'
import legacy from '@vitejs/plugin-legacy';
import { version } from 'esbuild';


export default defineConfig({
  root: './src',
  base: '/', /* for static site use '' or './', default is '/' */
  plugins: [
    // minifyHtml(),
    // legacy({ 
    //   targets: 
    //       // ["last 2 version, not dead, > 0.2%, not IE 11"] 
    //       // ['defaults', 'not IE 11']
    // }),
  ],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      input: {
        main: `${path.resolve(__dirname, 'src')}/index.html`,
        login: `${path.resolve(__dirname, 'src')}/login.html`,
        registration: `${path.resolve(__dirname, 'src')}/registration.html`,
        field: `${path.resolve(__dirname, 'src')}/field.html`,
        cabinet: `${path.resolve(__dirname, 'src')}/cabinet.html`,
        academy: `${path.resolve(__dirname, 'src')}/academy.html`,
        tests: `${path.resolve(__dirname, 'src')}/tests.html`,
      },
      output: {
        entryFileNames: `assets/js/[name]-[hash].js`,
        // entryFileNames: `assets/js/[name]-[hash].js`,
        chunkFileNames: `assets/js/[name]-[hash].js`,
        // chunkFileNames: `assets/js/[name]-[hash].js`,

        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
            // return 'assets/img/[name]-[hash][extname]';
            return 'assets/img/[name]-[hash][extname]';
          }

          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash].[ext]';
          }

          // default value
          // ref: https://rollupjs.org/guide/en/#outputassetfilenames
          return 'assets/[name]-[hash].[ext]';
        },
        // assetFileNames: `assets/[name].[ext]`,
      }
    }
  }
});