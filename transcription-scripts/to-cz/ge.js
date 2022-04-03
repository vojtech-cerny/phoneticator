const key = {
    "ა": "a",
    "ბ": "b",
    "გ": "g",
    "დ": "d",
    "ე": "e",
    "ვ": "v",
    "ზ": "z",
    "თ": "t",
    "ი": "i",
    "კ": "k",
    "ლ": "l",
    "მ": "m",
    "ნ": "n",
    "ო": "o",
    "პ": "p",
    "ჟ": "ž",
    "რ": "r",
    "ს": "s",
    "ტ": "t",
    "უ": "u",
    "ფ": "p",
    "ქ": "k",
    "ღ": "g",
    "ყ": "q",
    "შ": "š",
    "ჩ": "č",
    "ც": "c",
    "ძ": "dz",
    "წ": "c",
    "ჭ": "č",
    "ხ": "ch",
    "ჯ": "dž",
    "ჰ": "h"
}

const reverseKey = {
    "a": "ა",
    "b": "ბ",
    "g": "ღ",
    "d": "დ",
    "e": "ე",
    "v": "ვ",
    "z": "ზ",
    "t": "ტ",
    "i": "ი",
    "k": "ქ",
    "l": "ლ",
    "m": "მ",
    "n": "ნ",
    "o": "ო",
    "p": "ფ",
    "ž": "ჟ",
    "r": "რ",
    "s": "ს",
    "u": "უ",
    "q": "ყ",
    "š": "შ",
    "č": "ჭ",
    "c": "წ",
    "dz": "ძ",
    "ch": "ხ",
    "dž": "ჯ",
    "h": "ჰ"
}

export const geTranscript = (str) => {
  const objectKeys = Object.keys(key)
                    .sort((a, b) => {
                      return b.length - a.length
                    });
  objectKeys.forEach((objectKey, i) => {
    str = str.replaceAll(objectKey, key[objectKey]);
  });
  // str = capitaliseAfterDot(str); //TODO!
  return str;
}
