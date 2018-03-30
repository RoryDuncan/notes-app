import { Store } from 'svelte/store.js';
import App from "./App.html";
import firebase from "./firebase";

// test data
var names = Object.keys(window);



const store = new Store({
  title: 'App',
  notes: [{title: "hey there", id: 0, content: "bingo"}],
  currentNoteID: null,
});

// get our notes
var notesRef = firebase.database().ref("notes")
notesRef.on("value", snapshot => {
  
  let values = snapshot.val();
  let notes = [];
  if (values != null) {
    for (let key in values) {
      let note = values[key]
      note.id = key
      notes.push(note)
    }
  }
  console.log("notes:", notes)
  store.set({ notes })
});


const app = new App({
  target: document.querySelector('main'),
  store,
});

window.store = store; // useful for debugging!