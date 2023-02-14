const translateKey = {
    a: {
        á: /a(?=ğ)/gi,
        a: /a(?!ğ)/gi
    },
    e: {
        é: /e(?=ğ)/gi,
        e: /e(?!ğ)/gi
    },
    i: {
        í: /i(?=ğ)/gi,
        i: /i(?!ğ)/gi
    },
    ı: {
        ɯɯ: /ı(?=ğ)/gi,
        ɯ: /ı(?!ğ)/gi
    },
    o: {
        ó: /o(?=ğ)/gi,
        o: /o(?!ğ)/gi
    },
    ö: {
        öö: /ö(?=ğ)/gi,
        ö: /ö(?!ğ)/gi
    },
    u: {
        ú: /u(?=ğ)/gi,
        u: /u(?!ğ)/gi
    },
    ü: {
        üü: /ü(?=ğ)/gi,
        ü: /ü(?!ğ)/gi
    },
    c: "dž",
    ç: "č",
    ğ: "mezera",
    j: "ž",
    ş: "š",
    y: "j",
}

export const trTranscript = (str) => {
    str = str.toLowerCase()
    for (const key in translateKey) {
        if (typeof translateKey[key] === "string") {
            str = str.replaceAll(key, translateKey[key] == "mezera" ? "" : translateKey[key])
        } else if (typeof translateKey[key] === "object") {
            for (const translateVariants in translateKey[key]) {
                str = str.replace(translateKey[key][translateVariants], translateVariants == "mezera" ? "" : translateVariants)
            }

        }
    }
    return str;
}
