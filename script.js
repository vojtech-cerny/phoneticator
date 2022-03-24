const cyrilicInput = document.getElementById('cyrilic');
const latinOutput = document.getElementById('latin');
const copyButton = document.getElementById('copyButton');
const agreementButton = document.getElementById('agreementButton');
const modal = document.getElementsByClassName('modal__overlay')[0];


const termsAgreed = localStorage.getItem('odsouhlasenePodminky');

const copyResult = () => {
  latinOutput.select();
  latinOutput.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(latinOutput.innerHTML)
}

const translate = () => {
  latinOutput.innerHTML = toLatin(cyrilicInput.value);
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

cyrilicInput.addEventListener("input", translate);
copyButton.addEventListener("click", copyResult);
agreementButton.addEventListener("click", logAgreement);
