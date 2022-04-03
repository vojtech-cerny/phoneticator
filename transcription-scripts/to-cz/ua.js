const letters = ["А", "а", "Б", "б", "В", "в", "Г", "г", "Ґ", "ґ", "Д", "д", "Е", "е", "Є", "є", "Ж", "ж", "З", "з", "И", "и", "І", "і", "Ї", "ї", "Й", "й", "К", "к", "Л", "л", "М", "м", "Н", "н", "О", "о", "П", "п", "Р", "р", "С", "с", "Т", "т", "У", "у", "Ф", "ф", "Х", "х", "Ц", "ц", "Ч", "ч", "Ш", "ш", "Щ", "щ", "Ь", "ь", "Ю", "ю", "Я", "я"]

const key = {
    "А": "A",
    "Б": "B",
    "В": "V",
    "Г": "H",
    "Ґ": "G",
    "Д": "D",
    "Е": "E",
    "Є": "Je",
    "Ж": "Ž",
    "З": "Z",
    "И": "Y",
    "І": "I",
    "Ї": "Ji",
    "Й": "J",
    "К": "K",
    "Л": "L",
    "М": "M",
    "Н": "N",
    "О": "O",
    "П": "P",
    "Р": "R",
    "С": "S",
    "Т": "T",
    "У": "U",
    "Ф": "F",
    "Х": "Ch",
    "Ц": "C",
    "Ч": "Č",
    "Ш": "Š",
    "Щ": "Šč",
    // "Ь": "Soft letter",
    "Ю": "Ju",
    "Я": "Ja"
}

const softened = {
  "D": "Ď",
  "T": "Ť",
  "N": "Ň"
}

const ableToSoft = ["D"];

export const uaTranscript = (str) => {
  //split to letters
  str = str.split("");
  //analyze every single letter
  str.forEach((letter, i) => {
    var isUpperCase,
        isSoft;
    //remember if is letter uppercase
    if (letter == letter.toUpperCase() && letters.includes(letter.toUpperCase())) {
      isUpperCase = true;
    }
    //remember if is letter soft
    if (i !== str.length-1 && str[i+1].toUpperCase() === 'Ь') {
      isSoft = true;
    };
    //uppercase every letter to search in object
    letter = letter.toUpperCase();
    //check if letter
    if (letters.includes(letter)) {
      if (letter.toUpperCase() === 'Ь') {
        str[i] = '';
        return;
      }
      //update in array
      str[i] = letter;
      //uppercase / lowercase
      var latin = key[str[i]];
      //if soft soften
      if (isSoft) {
        if (softened[latin] != undefined || softened[latin] != null) {
          latin = softened[latin];
        } else {
          latin += "\'";
        }
      }
      //remember if previous letter is able to soften
      if (i > 0 && str[i].toUpperCase() === 'Є' && ableToSoft.includes(str[i-1].toUpperCase())) {
        latin = "Ě";
      };
      if (isUpperCase) {
        str[i] = latin;
      } else {
        str[i] = latin.toLowerCase();
      }
    }
  });
  //join to full string
  str = str.join("");
  return str;
}
