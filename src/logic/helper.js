const onBtn = (btn) => {
    const targetBtn = document.getElementById(btn);
    targetBtn.classList.remove('disabled');
    targetBtn.classList.add('enabled');
}

const offBtn = (btn) => {
    const targetBtn = document.getElementById(btn);
    targetBtn.classList.remove('enabled');
    targetBtn.classList.add('disabled');
}

const onIcon = (icon) => {
    const targetIcon = document.getElementById(icon);
    targetIcon.classList.remove('offIcon');
    targetIcon.classList.add('onIcon');
}

const offIcon = (icon) => {
    const targetIcon = document.getElementById(icon);
    targetIcon.classList.remove('onIcon');
    targetIcon.classList.add('offIcon');
}


export { onBtn, offBtn, onIcon, offIcon };