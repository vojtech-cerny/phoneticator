import { uaTranscript } from './to-cz/ua.js'
import { geTranscript } from './to-cz/ge.js'

export const langData = {
  ua: {
    hasKeyboard: true,
    placeholderText: 'cyrilicí'
  },
  ge: {
    hasKeyboard: false,
    placeholderText: 'mchedrulí'
  }
}

export const toggleTranscript = (lang, str) => {
  switch (lang) {
    case 'ua': return uaTranscript(str); break;
    case 'ge': return geTranscript(str); break;
    default: return; break;
  }
}
