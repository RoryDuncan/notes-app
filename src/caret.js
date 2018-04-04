/* global Range NodeFilter */
import selection from './selection.js'


// Helper class for capturing
export default class Caret {
  
  constructor(e) {
    
    this.event = e || null
    
    // context is the element where the caret / cursor is first captured
    this.context = null;
    
    // length is the final range position
    this.length = 0;
    
    // our selection
    this.selection = null;
  }
  
  // saves the current caret position within context <HTMLElement>
  save(context) {
    
    this.context = context;
    
    if (context == null) {
      this.selection = null;
      return;
    }
    
    this.selection = selection(this.context)
    
    const { start: cursorPos, end: cursorEndPos } = selection(this.context)
    if (cursorPos !== cursorEndPos) {
      return // Bail on selections
    }
  }
  
  restore(context) {
    this.context = context
    selection(this.context, this.selection)
  }
  
  getTextNodeAtPosition(root, index) {
    console.Warn("Obsolete Method")
    
    let offset = index;
    const treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, (el) => {
        
        // filter through each node subtracting it's text length from our
        if (offset >= el.textContent.length){
            offset -= el.textContent.length;
            return NodeFilter.FILTER_REJECT
        }
        
        return NodeFilter.FILTER_ACCEPT;
    });
    
    const nextNode = treeWalker.nextNode();
    const node = nextNode || root;
    
    offset = nextNode ? offset : 0;
    
    return { node, offset };
  }
}