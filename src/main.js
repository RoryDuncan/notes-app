import { Store } from 'svelte/store.js';
import App from "./App.html";

// test data
var notes = new Array(10).fill(true).map( (a, i) => ({
  id: i,
  isPublished: false,
  content: "words <code>hey</code>",
  title: `Note no. ${i}`,
}));


const store = new Store({
  name: 'world',
  notes: [],
});


const app = new App({
  target: document.querySelector('main'),
  store,
});

window.store = store; // useful for debugging!