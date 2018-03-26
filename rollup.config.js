import * as fs from 'fs';
import svelte from 'rollup-plugin-svelte';

export default {
  input: 'src/main.js',
  output: {
    file: 'public/bundle.js',
    format: 'iife'
  },
  plugins: [
    svelte({
      // You can restrict which files are compiled
      // using `include` and `exclude`
      include: 'src/components/**/*.html',

      // By default, the client-side compiler is used. You
      // can also use the server-side rendering compiler
      generate: 'ssr',

      // Extract CSS into a separate file (recommended).
      // See note below
      css: function (css) {
        // console.log(css.code); // the concatenated CSS
        // console.log(css.map); // a sourcemap

        // creates `main.css` and `main.css.map` — pass `false`
        // as the second argument if you don't want the sourcemap
        css.write('public/main.css');
      }
    })
  ]
}