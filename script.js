import { toggleTranscript, langData } from './transcription-scripts/transcript.js'

const textareaInput = document.getElementById('input');
const textareaOutput = document.getElementById('output');
const copyButton = document.getElementById('copyButton');
const agreementButton = document.getElementById('agreementButton');
const modal = document.getElementsByClassName('modal__overlay')[0];
const keyboardButton = document.getElementById('keyboardButton');
const dropdown = document.getElementById('dropdown');
const inputFlag = document.getElementById('inputFlag');
const languageErrorNotification = document.getElementById('languageErrorNotification')

const termsAgreed = localStorage.getItem('odsouhlasenePodminky');

var isKeyboardVisible = false;
var lang = null;

const copyResult = () => {
  textareaOutput.select();
  textareaOutput.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(textareaOutput.innerHTML)
}

const transcript = () => {
  if (lang == null) return;
  textareaOutput.innerHTML = toggleTranscript(lang, textareaInput.value);
}

const toggleLanguage = (e) => {
  if (isKeyboardVisible) {
    toggleKeyboard();
  }
  if (e.target.value == 'none') {
    lang = null;
    inputFlag.style.opacity = "0";
    keyboardButton.style.display = "none";
    textareaInput.placeholder = "";
    textareaInput.classList.add("reject");
    languageErrorNotification.style.display = "flex";
    return;
  }
  lang = e.target.value;
  inputFlag.style.opacity = "1";
  inputFlag.src = `./assets/flags/${lang}.svg`
  textareaInput.placeholder = `Napiš sem ${langData[lang].placeholderText}`;
  textareaInput.classList.remove("reject");
  languageErrorNotification.style.display = "none";
  if (langData[lang].hasKeyboard) {
    keyboardButton.style.display = "flex";
  } else {
    keyboardButton.style.display = "none";
  }
  transcript()
}

const logAgreement = () => {
  localStorage.setItem('odsouhlasenePodminky', 'true');
  modal.style.display = "none";
}

window.onload = () => {
  if (termsAgreed !== "true") {
    modal.style.display = "flex";
  }
}

const toggleKeyboard = () => {
  keyboardButton.classList.toggle("icon-disabled");
  if (isKeyboardVisible) {
    keyboard.style.display = "none"
    isKeyboardVisible = false;
  } else {
    keyboard.style.display = "flex"
    isKeyboardVisible = true;
  }
}

setInterval(() => {
  if (isKeyboardVisible) {
    setInterval(transcript, 200);
  }
}, 2000);

textareaInput.addEventListener("input", transcript);
copyButton.addEventListener("click", copyResult);
agreementButton.addEventListener("click", logAgreement);
keyboardButton.addEventListener("click", toggleKeyboard);
dropdown.addEventListener("change", toggleLanguage);
