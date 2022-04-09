import { geKeyboard } from './layouts/ge.js';
import { uaKeyboard } from './layouts/ua.js';
import { universalCaps } from './layouts/universal.js'

var buttons = [],
    charKeys = [];
const keyboard = document.getElementById('keyboard'),
      output = document.getElementById(keyboard.getAttribute('data-keyboard-output')),
      language = keyboard.getAttribute('data-keyboard-language');

var isShifted = false,
    isCapsLocked = false;

const deshift = () => {
  charKeys.forEach((key, i) => {
    key.innerHTML = key.innerHTML.toLowerCase();
  });
  isShifted = false;
}

const buttonShift = () => {
  if (isShifted) deshift();
  charKeys.forEach((key, i) => {
    key.innerHTML = key.innerHTML.toUpperCase();
  });
  isShifted = true;
}

const buttonBackspace = () => {
  output.value = output.value.slice(0, -1);
}

const buttonCapsLock = () => {
  isShifted = false;
  if (isCapsLocked) {
    charKeys.forEach((key, i) => {
      key.innerHTML = key.innerHTML.toLowerCase();
    });
    isCapsLocked = false;
  } else {
    charKeys.forEach((key, i) => {
      key.innerHTML = key.innerHTML.toUpperCase();
    });
    isCapsLocked = true;
  }
}

const keyClick = (key) => {
  if (key.target.dataset.keyboardRole == 'special') {
    switch (key.target.dataset.keyboardKey) {
      case 'shift': buttonShift(); break;
      case 'backspace': buttonBackspace(); break;
      case 'space': output.value += ' '; break;
      case 'capsLock': buttonCapsLock(); break;
    }
    return;
  }
  output.value += key.target.innerHTML;
  if (isShifted) deshift();
}

const dragKeyboard = () => {
  var leftPosition,
      topPosition,
      cursorX,
      cursorY;

  keyboard.onmousedown = (e) => {
    e.preventDefault()
    cursorX = e.clientX;
    cursorY = e.clientY;

    document.onmouseup = () => {
      document.onmouseup = undefined;
      document.onmousemove = undefined;
    }
    document.onmousemove = drag;
  }

  let drag = (e) => {
    e.preventDefault()
    leftPosition = cursorX - e.clientX;
    topPosition = cursorY - e.clientY;
    cursorX = e.clientX;
    cursorY = e.clientY;
    keyboard.style.top = `${keyboard.offsetTop - topPosition}px`;
    keyboard.style.left = `${keyboard.offsetLeft - leftPosition}px`;
  }
}

const getKeyboardData = (lang) => {
  var tempArray,
      array = [];
  switch (lang) {
    case 'ua': tempArray = uaKeyboard; break;
    case 'ge': tempArray = geKeyboard; break;
    default: throw new Error(`Invalid language \"${lang}\"`);
  }
  // THANKS TO: https://stackoverflow.com/a/16232972/15244427
  tempArray.map((obj) => {
    array.push([...obj]);
  });
  return array
}

export const setupKeyboard = (lang) => {
  var keyboardData = getKeyboardData(lang);
  if (typeof keyboardData === 'undefined') return;
  keyboard.innerHTML = "";
  keyboardData.push([]);
  universalCaps.forEach((row, i) => {
    row.forEach((cap, k) => {
      let pushData = [cap.value];
      if (cap.isSpecial) {
        pushData.push(cap.data)
      }
      if (cap.isOnLeft) {
        keyboardData[i].unshift(pushData);
      } else {
        keyboardData[i].push(pushData);
      }
    });
  });
  keyboardData.forEach((row, i) => {
    var rowDiv = document.createElement("div");
    rowDiv.classList.add("keyboard__row");
    row.forEach((char, k) => {
      let charDiv = document.createElement("button");
      if (typeof char[1] !== 'undefined') {
        charDiv.setAttribute('data-keyboard-role', 'special');
        charDiv.setAttribute('data-keyboard-key', char[1]);
        charDiv.classList.add("special-button")
        charDiv.innerHTML = char[0];
      } else {
        charDiv.innerHTML = char;
      }
      rowDiv.appendChild(charDiv);
    });
    [...rowDiv.children].forEach((key, i) => {
      buttons.push(key)
      key.addEventListener('click', keyClick);
      if (key.dataset.keyboardRole != 'special') charKeys.push(key)
    });
    keyboard.appendChild(rowDiv);
  });
}

dragKeyboard();
// setupKeyboard(language);
