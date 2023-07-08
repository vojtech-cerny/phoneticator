/*a = a
b: {
    "b": [začátek slova, nb, mb] 
    "β": else //něco mezi b/v
}
c: {
    "θ": [ci, ce] //něco jako th v angličtině 
    "k": else
}
ch: "č"
"d": normálně, s postupem na konec slova zaniká
f = f
"g" {
    "ch": ["ge", "gi"],
        "g" else
}
"h": ""
"j": "ch"
k = k
"l": {
    "l": else
    "l`": ["ll"]
}
m = m
"n": {
    "m": [mb, mv]
    "n": else
}
"ñ": "ň"
p = p
"q": "k"
r = r //pokud je na začátku, rn, rs, rl, rr 4× kmit
s = s
t = t
"v": {
    "b": [začátek slova, nv, mv]
    "β": else //něco mezi b/v
}
x = x / ch
y = i
"u" {
    "": [gui, gue, qu]
}
"ü": "u"
"z" {
    "c": [ze, zi]
    "z" else
}
*/

const translateKey = {
    b: {
        b: /((?<=[nm])b|\bb)/gi,
        v: /(?<![nm\W])b/gi
    },
    c: {
        θ: /c(?=[ie])/gi,
        k: /c(?![ieh])/gi
    },
    g: {
        ch: /g(?=[ie])/gi,
        g: /g(?![ie])/gi
    },
    l: {
        ľ: /ll/gi,
        l: /(?<!l)l(?!l)/gi
    },
    n: {
        m: /n(?=[bv])/gi,
        n: /n(?![bv])/gi
    },
    v: {
        b: /((?<=[nm])v|\bv)/gi,
        v: /(?![nm\W])v/gi
    },
    u: {
        mezera: /((?<=[g])u(?=[ie])|(?<=q)u)/gi,
        u: /u/gi
    },
    z: {
        c: /z(?=[ie])/gi,
        z: /z(?![ie])/gi
    },
    ch: "č",
    q: "k",
    ü: "u",
    ñ: "ň",
    h: "",
    j: "ch"
}

export const esTranscript = (str) => {
    str = str.toLowerCase()
    for (const key in translateKey) {
        if (typeof translateKey[key] === "string") {
            str = str.replaceAll(key, translateKey[key])
        } else if (typeof translateKey[key] === "object") {
            for (const translateVariants in translateKey[key]) {
                str = str.replace(translateKey[key][translateVariants], translateVariants == "mezera" ? "" : translateVariants)
            }
            
        }
    }
    return str;
}
