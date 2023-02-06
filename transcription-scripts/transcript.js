import { uaTranscript } from './to-cz/ua.js'
import { geTranscript } from './to-cz/ge.js'
import { esTranscript } from './to-cz/es.js'
import { trTranscript } from './to-cz/tr.js'

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
  },
  tr: {
    hasKeyboard: false, 
    placeholderText: 'turecky'
  }
}

export const toggleTranscript = (lang, str) => {
  switch (lang) {
    case 'ua': return uaTranscript(str); break;
    case 'ge': return geTranscript(str); break;
    case 'es': return esTranscript(str); break;
    case 'tr': return trTranscript(str); break;
    default: return; break;
  }
}
