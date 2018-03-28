import { Store } from 'svelte/store.js';
import App from "./App.html";

const store = new Store({
  name: 'world'
});

const app = new App({
  target: document.querySelector('main'),
  store,
});

window.store = store; // useful for debugging!