export const debounce = (delay, fn) => {
  
  let timeoutID = null;
  
  
  return (...args) => {
    
    if (timeoutID != null) {
      clearTimeout(timeoutID)  
    }
      
    timeoutID = window.setTimeout(() => fn(...args), delay)
    
  }
  
}

