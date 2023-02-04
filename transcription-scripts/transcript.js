import { uaTranscript } from './to-cz/ua.js'
import { geTranscript } from './to-cz/ge.js'
import { esTranscript } from './to-cz/es.js'

export const langData = {
  ua: {
    hasKeyboard: true,
    placeholderText: 'cyrilicí'
  },
  ge: {
    hasKeyboard: true,
    placeholderText: 'mchedrulí'
  },
  es: {
    hasKeyboard: false,
    placeholderText: 'španělsky'
  }
}

export const toggleTranscript = (lang, str) => {
  switch (lang) {
    case 'ua': return uaTranscript(str); break;
    case 'ge': return geTranscript(str); break;
    case 'es': return esTranscript(str); break;
    default: return; break;
  }
}
