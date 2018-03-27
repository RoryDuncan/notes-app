import * as fs from 'fs';
import resolve from 'rollup-plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';

export default {
  input: 'src/main.js',
  output: {
    file: 'public/scripts/bundle.js',
    format: 'iife',
    // external: ['svelte', 'svelte/store.js', 'store'],
    // globals: {'svelte/store.js': 'store'},
  },
  plugins: [
    resolve(),
    svelte({

      // You can restrict which files are compiled
      // using `include` and `exclude`
      include: 'src/**/*.html',

      // By default, the client-side compiler is used. You
      // can also use the server-side rendering compiler
      // generate: 'ssr',

      // Extract CSS into a separate file (recommended).
      // See note below
      css: function (css) {
        // console.log(css.code); // the concatenated CSS
        // console.log(css.map); // a sourcemap

        // creates `main.css` and `main.css.map` — pass `false`
        // as the second argument if you don't want the sourcemap
        css.write('public/stylesheets/main.css');
        
      },
      // svelte options
      store: true,
    })
  ]
}