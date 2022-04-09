import { defineConfig } from 'vite'
import path from 'path'
import { injectHtml, minifyHtml } from 'vite-plugin-html'
import legacy from '@vitejs/plugin-legacy';
import { version } from 'esbuild';
import viteImagemin from 'vite-plugin-imagemin'
import vue from '@vitejs/plugin-vue'


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
    // viteImagemin({
    //   gifsicle: {
    //     optimizationLevel: 7,
    //     interlaced: false,
    //   },
    //   optipng: {
    //     optimizationLevel: 7,
    //   },
    //   mozjpeg: {
    //     quality: 20,
    //   },
    //   pngquant: {
    //     quality: [0.8, 0.9],
    //     speed: 4,
    //   },
    //   svgo: {
    //     plugins: [
    //       {
    //         name: 'removeViewBox',
    //       },
    //       {
    //         name: 'removeEmptyAttrs',
    //         active: false,
    //       },
    //     ],
    //   },
    // }),
    // vue()
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
      },
      output: {
        entryFileNames: `assets/js/[name].js`,
        // entryFileNames: `assets/js/[name]-[hash].js`,
        chunkFileNames: `assets/js/[name].js`,
        // chunkFileNames: `assets/js/[name]-[hash].js`,

        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
            // return 'assets/img/[name]-[hash][extname]';
            return 'assets/img/[name][extname]';
          }

          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name].[ext]';
          }

          // default value
          // ref: https://rollupjs.org/guide/en/#outputassetfilenames
          return 'assets/[name].[ext]';
        },
        // assetFileNames: `assets/[name].[ext]`,
      }
    }
  }
});