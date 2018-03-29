import { Store } from 'svelte/store.js';
import App from "./App.html";
import firebase from "./firebase";

// test data
var names = Object.keys(window);
var notes = new Array(10).fill(true).map( (a, i) => ({
  id: i,
  isPublished: false,
  content: "words <code>hey</code>",
  title: names[~~(Math.random()*names.length)],
}));


const store = new Store({
  title: 'App',
  notes: notes,
  currentNoteID: null,
});


const app = new App({
  target: document.querySelector('main'),
  store,
});

window.store = store; // useful for debugging!