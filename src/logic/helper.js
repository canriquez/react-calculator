const onBtn = btn => {
  const targetBtn = document.getElementById(btn);
  targetBtn.classList.remove('disabled');
  targetBtn.classList.add('enabled');
};

const offBtn = btn => {
  const targetBtn = document.getElementById(btn);
  targetBtn.classList.remove('enabled');
  targetBtn.classList.add('disabled');
};

const onIcon = icon => {
  const targetIcon = document.getElementById(icon);
  targetIcon.classList.remove('offIcon');
  targetIcon.classList.add('onIcon');
};

const offIcon = icon => {
  const targetIcon = document.getElementById(icon);
  targetIcon.classList.remove('onIcon');
  targetIcon.classList.add('offIcon');
};


const key2Click = (key) => {
  const allowedKeys = ['s', 'l', 'p', 'Enter', 'Backspace',
    '%', '/', '7', '8', '9', 'x', '4', '5', '6',
    '-', '_', '*', '1', '2', '3', '+', '0', '.', '='];
  const clickPad = ['Speech', 'En', 'PTT', '=', 'AC',
    '%', '÷', '7', '8', '9', 'x', '4', '5', '6',
    '-', '+/-', 'x', '1', '2', '3', '+', '0', '.', '='];
  return clickPad[allowedKeys.indexOf(key)];
}


export {
  onBtn, offBtn, onIcon, offIcon, key2Click
};
