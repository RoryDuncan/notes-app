import { Store } from 'svelte/store.js';
import App from "./App.html";
import { database } from "./firebase";

// test data

const store = new Store({
  title: 'App',
  boards: [],
  notes: [] // deprecated
});

// get our notes
var boardsRef = database.ref("boards")
boardsRef.on("value", snapshot => {
  
  let values = snapshot.val();
  let boards = [];
  
  if (values != null) {
    for (let key in values) {
      let board = values[key]
      board.id = key
      boards.push(board)
    }
  }
  console.log("boards:", boards)
  store.set({ boards })
});


const app = new App({
  target: document.querySelector('main'),
  store,
});

window.store = store; // useful for debugging!