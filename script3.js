const backgroundSwitch = document.querySelector('#background-switch');

function switchBackground() {
  if (backgroundSwitch.checked) {
    document.body.classList.add('light');
  } else {
    document.body.classList.remove('light');
  }
}

backgroundSwitch.addEventListener('change', switchBackground);