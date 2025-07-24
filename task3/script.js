
const display = document.getElementById('display');
const buttons   = document.querySelectorAll('button');

let current = '';          


buttons.forEach(btn => {
  btn.addEventListener('click', handleClick);
});


function handleClick(e) {
  const target = e.currentTarget;


  if (target.dataset.num) {
    current += target.dataset.num;
    updateDisplay();
    return;
  }


  if (target.dataset.op) {
    
    const lastChar = current.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) return;

    current += target.dataset.op;
    updateDisplay();
    return;
  }


  if (target.dataset.action === 'clear') {
    current = '';
    updateDisplay('0');
    return;
  }

 
  if (target.dataset.action === 'delete') {
    current = current.slice(0, -1);
    updateDisplay(current || '0');
    return;
  }

  
  if (target.dataset.action === 'equals') {
    try {
     
      if (!current || /[+\-*/]$/.test(current)) return;

     
      const result = Function('"use strict"; return (' + current + ')')();
      current = result.toString();
      updateDisplay();
    } catch (err) {
      updateDisplay('Error');
      current = '';
    }
  }
}


function updateDisplay(value = current) {
  display.value = value;
}