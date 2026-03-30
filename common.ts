export const vowelOpennesses = ["open", "near-open", "open-mid", "mid", "close-mid", "near-close", "close"] as const;
export type VowelOpenness = typeof vowelOpennesses[number];
export const vowelBacknesses = ["front", "front central", "central", "central back", "back"] as const;
export type VowelBackness = typeof vowelBacknesses[number];

export const ipaVowels: Record<string, [number, number, boolean, VowelOpenness, VowelBackness]> = { // [f1, f2, rounded, openness, backness]
    "i": [300, 2350, false, "close", "front"],
    "y": [300, 2350, true, "close", "front"],
    "ɨ": [300, 1600, false, "close", "central"],
    "ʉ": [300, 1600, true, "close", "central"],
    "ɘ": [425, 1600, false, "close-mid", "central"],
    "ɵ": [425, 1600, true, "close-mid", "central"],
    "ə": [500, 1600, false, "mid", "central"],
    "ɜ": [575, 1600, false, "open-mid", "central"],
    "ɞ": [575, 1600, true, "open-mid", "central"],
    "ɐ": [770, 1600, false, "near-open", "central"],
    "ɪ": [360, 2200, false, "near-close", "front central"],
    "ʏ": [360, 2200, true, "near-close", "front central"],
    "e": [425, 2150, false, "close-mid", "front"],
    "ø": [425, 2150, true, "close-mid", "front"],
    "e̞": [500, 2150, false, "mid", "front"],
    "ø̞": [500, 2150, true, "mid", "front"],
    "ɛ": [575, 1850, false, "open-mid", "front"],
    "œ": [575, 1850, true, "open-mid", "front"],
    "æ": [770, 1780, false, "near-open", "front"],
    "a": [810, 1640, false, "open", "front"],
    "ɶ": [810, 1640, true, "open", "front"],
    "ä": [780, 1200, false, "open", "central"],
    "ɑ": [780, 1060, false, "open", "back"],
    "ɒ": [650, 850, true, "open", "back"],
    "ʌ": [550, 840, false, "open-mid", "back"],
    "ɔ": [550, 840, true, "open-mid", "back"],
    "o": [400, 740, true, "close-mid", "back"],
    "ɤ": [400, 740, false, "close-mid", "back"],
    "o̞": [500, 740, true, "mid", "back"],
    "ɤ̞": [500, 740, false, "mid", "back"],
    "ɯ": [300, 750, false, "close", "back"],
    "u": [300, 750, true, "close", "back"],
    "ʊ": [330, 900, true, "near-close", "central back"],
};

export const consonantPlaces = ["bilabial", "labiodental", "linguolabial", "dental", "alveolar", "postalveolar", "retroflex", "palatal", "velar", "uvular", "epiglottal", "glottal"] as const;
export const consonantPlacesOpt = [...consonantPlaces, "none"] as const;
export const consonantManners = ["nasal", "plosive", "sibilant affricate", "non-sibilant affricate", "sibilant fricative", "non-sibilant fricative", "approximant", "tap/flap", "trill", "lateral affricate", "lateral fricative", "lateral approximant", "lateral tap/flap", "implosive", "click"] as const;
export const consonantModifiers = ["voiced", "none", "ejective"] as const;
export const consonantModifiersAdditional = ["palatalized"] as const;
export type ConsonantPlace = typeof consonantPlaces[number];
export type ConsonantPlaceOpt = typeof consonantPlacesOpt[number];
export type ConsonantManner = typeof consonantManners[number];
export type ConsonantModifier = typeof consonantModifiers[number];
export type ConsonantModifierAdditional = typeof consonantModifiersAdditional[number];

export type IPAConsonantKeyModifierAdditional = 
    `${ConsonantModifierAdditional}`
    | `${ConsonantModifierAdditional}~${ConsonantModifierAdditional}`
    | `${ConsonantModifierAdditional}~${ConsonantModifierAdditional}~${ConsonantModifierAdditional}`;
export type IPAConsonantKey =
    `${ConsonantPlace}+${ConsonantManner}+${ConsonantModifier}`
    | `${ConsonantPlace}+${ConsonantPlace}+${ConsonantManner}+${ConsonantModifier}`
    | `${ConsonantPlace}+${ConsonantPlaceOpt}+${ConsonantManner}+${ConsonantModifier}+${IPAConsonantKeyModifierAdditional}`;
export const consonants: Partial<Record<IPAConsonantKey, string>> = {
    "bilabial+nasal+none": "m̥",
    "bilabial+nasal+voiced": "m",
    "labiodental+nasal+none": "ɱ̊",
    "labiodental+nasal+voiced": "ɱ",
    "linguolabial+nasal+voiced": "n̼",
    "dental+nasal+none": "n̪̊",
    "dental+nasal+voiced": "n̪",
    "alveolar+nasal+none": "n̥",
    "alveolar+nasal+voiced": "n",
    "postalveolar+nasal+none": "n̠̊",
    "postalveolar+nasal+voiced": "n̠",
    "retroflex+nasal+none": "ɳ̊",
    "retroflex+nasal+voiced": "ɳ",
    "palatal+nasal+none": "ɲ̊",
    "palatal+nasal+voiced": "ɲ",
    "velar+nasal+none": "ŋ̊",
    "velar+nasal+voiced": "ŋ",
    "uvular+nasal+none": "ɴ̥",
    "uvular+nasal+voiced": "ɴ",
    "bilabial+plosive+none": "p",
    "bilabial+plosive+voiced": "b",
    "labiodental+plosive+none": "p̪",
    "labiodental+plosive+voiced": "b̪",
    "linguolabial+plosive+none": "t̼",
    "linguolabial+plosive+voiced": "d̼",
    "dental+plosive+none": "t̪",
    "dental+plosive+voiced": "d̪",
    "alveolar+plosive+none": "t",
    "alveolar+plosive+voiced": "d",
    "retroflex+plosive+none": "ʈ",
    "retroflex+plosive+voiced": "ɖ",
    "palatal+plosive+none": "c",
    "palatal+plosive+voiced": "ɟ",
    "velar+plosive+none": "k",
    "velar+plosive+voiced": "ɡ",
    "uvular+plosive+none": "q",
    "uvular+plosive+voiced": "ɢ",
    "epiglottal+plosive+none": "ʡ",
    "glottal+plosive+none": "ʔ",
    "dental+sibilant affricate+none": "t̪s̪",
    "dental+sibilant affricate+voiced": "d̪z̪",
    "alveolar+sibilant affricate+none": "ts",
    "alveolar+sibilant affricate+voiced": "dz",
    "postalveolar+sibilant affricate+none": "t̠ʃ",
    "postalveolar+sibilant affricate+voiced": "d̠ʒ",
    "retroflex+sibilant affricate+none": "tʂ",
    "retroflex+sibilant affricate+voiced": "dʐ",
    "palatal+sibilant affricate+none": "tɕ",
    "palatal+sibilant affricate+voiced": "dʑ",
    "bilabial+non-sibilant affricate+none": "pɸ",
    "bilabial+non-sibilant affricate+voiced": "bβ",
    "labiodental+non-sibilant affricate+none": "p̪f",
    "labiodental+non-sibilant affricate+voiced": "b̪v",
    "dental+non-sibilant affricate+none": "t̪θ",
    "dental+non-sibilant affricate+voiced": "d̪ð",
    "alveolar+non-sibilant affricate+none": "tɹ̝̊",
    "alveolar+non-sibilant affricate+voiced": "dɹ̝",
    "postalveolar+non-sibilant affricate+none": "t̠ɹ̠̊˔",
    "postalveolar+non-sibilant affricate+voiced": "d̠ɹ̠˔",
    "palatal+non-sibilant affricate+none": "cç",
    "palatal+non-sibilant affricate+voiced": "ɟʝ",
    "velar+non-sibilant affricate+none": "kx",
    "velar+non-sibilant affricate+voiced": "ɡɣ",
    "uvular+non-sibilant affricate+none": "qχ",
    "uvular+non-sibilant affricate+voiced": "ɢʁ",
    "epiglottal+non-sibilant affricate+none": "ʡʜ",
    "epiglottal+non-sibilant affricate+voiced": "ʡʢ",
    "glottal+non-sibilant affricate+none": "ʔh",
    "dental+sibilant fricative+none": "s̪",
    "dental+sibilant fricative+voiced": "z̪",
    "alveolar+sibilant fricative+none": "s",
    "alveolar+sibilant fricative+voiced": "z",
    "postalveolar+sibilant fricative+none": "ʃ",
    "postalveolar+sibilant fricative+voiced": "ʒ",
    "retroflex+sibilant fricative+none": "ʂ",
    "retroflex+sibilant fricative+voiced": "ʐ",
    "palatal+sibilant fricative+none": "ɕ",
    "palatal+sibilant fricative+voiced": "ʑ",
    "bilabial+non-sibilant fricative+none": "ɸ",
    "bilabial+non-sibilant fricative+voiced": "β",
    "labiodental+non-sibilant fricative+none": "f",
    "labiodental+non-sibilant fricative+voiced": "v",
    "linguolabial+non-sibilant fricative+none": "θ̼",
    "linguolabial+non-sibilant fricative+voiced": "ð̼",
    "dental+non-sibilant fricative+none": "θ",
    "dental+non-sibilant fricative+voiced": "ð",
    "alveolar+non-sibilant fricative+none": "θ̠",
    "alveolar+non-sibilant fricative+voiced": "ð̠",
    "postalveolar+non-sibilant fricative+none": "ɹ̠̊˔",
    "postalveolar+non-sibilant fricative+voiced": "ɹ̠˔",
    "retroflex+non-sibilant fricative+none": "ɻ̊˔",
    "retroflex+non-sibilant fricative+voiced": "ɻ˔",
    "palatal+non-sibilant fricative+none": "ç",
    "palatal+non-sibilant fricative+voiced": "ʝ",
    "velar+non-sibilant fricative+none": "x",
    "velar+non-sibilant fricative+voiced": "ɣ",
    "uvular+non-sibilant fricative+none": "χ",
    "uvular+non-sibilant fricative+voiced": "ʁ",
    "epiglottal+non-sibilant fricative+none": "ħ",
    "epiglottal+non-sibilant fricative+voiced": "ʕ",
    "glottal+non-sibilant fricative+none": "h",
    "glottal+non-sibilant fricative+voiced": "ɦ",
    "bilabial+approximant+voiced": "β̞",
    "labiodental+approximant+voiced": "ʋ",
    "dental+approximant+voiced": "ð̞",
    "alveolar+approximant+voiced": "ɹ",
    "postalveolar+approximant+voiced": "ɹ̠",
    "retroflex+approximant+voiced": "ɻ",
    "palatal+approximant+voiced": "j",
    "palatal+none+approximant+voiced+palatalized": "j",
    "velar+approximant+voiced": "ɰ",
    "glottal+approximant+voiced": "˷",
    "bilabial+tap/flap+voiced": "ⱱ̟",
    "labiodental+tap/flap+voiced": "ⱱ",
    "alveolar+tap/flap+none": "ɾ̥",
    "alveolar+tap/flap+voiced": "ɾ",
    "retroflex+tap/flap+none": "ɽ̊",
    "retroflex+tap/flap+voiced": "ɽ",
    "uvular+tap/flap+voiced": "ɢ̆",
    "epiglottal+tap/flap+voiced": "ʡ̮",
    "bilabial+trill+none": "ʙ̥",
    "bilabial+trill+voiced": "ʙ",
    "alveolar+trill+none": "r̥",
    "alveolar+trill+voiced": "r",
    "postalveolar+trill+voiced": "r̠",
    "retroflex+trill+none": "ɽ̊r̥",
    "retroflex+trill+voiced": "ɽr",
    "uvular+trill+none": "ʀ̥",
    "uvular+trill+voiced": "ʀ",
    "epiglottal+trill+none": "ʜ",
    "epiglottal+trill+voiced": "ʢ",
    "alveolar+lateral affricate+none": "tɬ",
    "alveolar+lateral affricate+voiced": "dɮ",
    "retroflex+lateral affricate+none": "tꞎ",
    "retroflex+lateral affricate+voiced": "d𝼅",
    "palatal+lateral affricate+none": "c𝼆",
    "palatal+lateral affricate+voiced": "ɟʎ̝",
    "velar+lateral affricate+none": "k𝼄",
    "velar+lateral affricate+voiced": "ɡʟ̝",
    "dental+lateral fricative+none": "ɬ̪",
    "alveolar+lateral fricative+none": "ɬ",
    "alveolar+lateral fricative+voiced": "ɮ",
    "retroflex+lateral fricative+none": "ꞎ",
    "retroflex+lateral fricative+voiced": "𝼅",
    "palatal+lateral fricative+none": "𝼆",
    "palatal+lateral fricative+voiced": "ʎ̝",
    "velar+lateral fricative+none": "𝼄",
    "velar+lateral fricative+voiced": "ʟ̝",
    "dental+lateral approximant+voiced": "l̪",
    "alveolar+lateral approximant+none": "l̥",
    "alveolar+lateral approximant+voiced": "l",
    "postalveolar+lateral approximant+voiced": "l̠",
    "retroflex+lateral approximant+none": "ɭ̊",
    "retroflex+lateral approximant+voiced": "ɭ",
    "palatal+lateral approximant+none": "ʎ̥",
    "palatal+lateral approximant+voiced": "ʎ",
    "velar+lateral approximant+none": "ʟ̥",
    "velar+lateral approximant+voiced": "ʟ",
    "uvular+lateral approximant+voiced": "ʟ̠",
    "alveolar+lateral tap/flap+none": "ɺ̥",
    "alveolar+lateral tap/flap+voiced": "ɺ",
    "retroflex+lateral tap/flap+none": "𝼈̥",
    "retroflex+lateral tap/flap+voiced": "𝼈",
    "palatal+lateral tap/flap+voiced": "ʎ̮",
    "velar+lateral tap/flap+voiced": "ʟ̆",
    "alveolar+bilabial+plosive+none": "t͡p",
    "velar+bilabial+plosive+none": "k͡p",
    "velar+bilabial+plosive+voiced": "ɡ͡b",
    "uvular+bilabial+plosive+voiced": "q͡p",
    "velar+bilabial+nasal+voiced": "ŋ͡m",
    "velar+bilabial+sibilant fricative+none": "ʍ",
    "velar+bilabial+sibilant fricative+voiced": "w",
    "palatal+bilabial+sibilant fricative+voiced": "ɥ",
    "velar+postalveolar+sibilant fricative+none": "ɧ",
    "dental+alveolar+approximant+voiced": "ɫ",
    "velar+bilabial+implosive+none": "ɠ̊͜ɓ̥",
    "velar+bilabial+implosive+voiced": "ɠ͡ɓ",
    "bilabial+implosive+voiced": "ɓ",
    "bilabial+implosive+none": "ɓ̥",
    "alveolar+implosive+voiced": "ɗ",
    "alveolar+implosive+none": "ɗ̥",
    "retroflex+implosive+voiced": "ᶑ",
    "retroflex+implosive+none": "ᶑ̥",
    "palatal+implosive+voiced": "ʄ",
    "palatal+implosive+none": "ʄ̥",
    "velar+implosive+voiced": "ɠ",
    "velar+implosive+none": "ɠ̊",
    "uvular+implosive+voiced": "ʛ",
    "uvular+implosive+none": "ʛ̥",

    "bilabial+plosive+ejective": "pʼ",
    "alveolar+plosive+ejective": "tʼ",
    "dental+plosive+ejective": "tʼ", // yep the same one
    "retroflex+plosive+ejective": "ʈʼ",
    "palatal+plosive+ejective": "cʼ",
    "velar+plosive+ejective": "kʼ",
    "uvular+plosive+ejective": "qʼ",
    "labiodental+non-sibilant fricative+ejective": "fʼ",
    "alveolar+non-sibilant fricative+ejective": "sʼ",
    "retroflex+non-sibilant fricative+ejective": "ʂʼ",
    "alveolar+palatal+non-sibilant fricative+ejective": "ɕʼ",
    "velar+non-sibilant fricative+ejective": "xʼ",
    "uvular+non-sibilant fricative+ejective": "χʼ",
    "bilabial+non-sibilant fricative+ejective": "ɸʼ",
    "dental+non-sibilant fricative+ejective": "θʼ",
    "palatal+alveolar+non-sibilant fricative+ejective": "ʃʼ",
    "dental+non-sibilant affricate+ejective": "t̪θʼ",
    "alveolar+non-sibilant affricate+ejective": "tsʼ",
    "retroflex+non-sibilant affricate+ejective": "ʈʂʼ",
    "palatal+alveolar+non-sibilant affricate+ejective": "t̠ʃʼ",
    "velar+non-sibilant affricate+ejective": "kxʼ",
    "uvular+non-sibilant affricate+ejective": "qχʼ",
    "alveolar+lateral fricative+ejective": "ɬʼ",
    "alveolar+lateral affricate+ejective": "tɬʼ",
    "palatal+lateral affricate+ejective": "c𝼆ʼ",
    "velar+lateral affricate+ejective": "k𝼄ʼ",

    "bilabial+click+none": "kʘ",
    "dental+click+none": "kǀ",
    "alveolar+click+none": "kǃ",
    "velar+click+none": "kǁ",
    "retroflex+click+none": "k𝼊",
    "palatal+click+none": "kǂ"
};
export const getConsonantIPA = (place1: ConsonantPlace, place2: ConsonantPlaceOpt, manner: ConsonantManner, mod: ConsonantModifier, modAdd: ConsonantModifierAdditional[]) => {
    const combo = `${place1}+${place2 === "none" ? "" : place2 + "+"}${manner}+${mod}`;
    return (combo in consonants ? consonants[combo as IPAConsonantKey]! : "unknown") + (modAdd.includes("palatalized") ? "ʲ" : "");
};

export const makeOption = (opt: string, sel: boolean) => {
    const el = document.createElement("option");
    el.value = opt;
    el.innerText = opt;
    el.selected = sel;
    return el;
}

export const pad = (ctx: CanvasRenderingContext2D, w: number, h: number, padding: number) => {
    ctx.save();
    ctx.scale((w - 2 * padding) / w, (h - 2 * padding) / h);
    ctx.translate(padding, padding);
}

export const exampleSize = 150;
export const generateCard = (parent: HTMLElement, label: string, render: (ctx: CanvasRenderingContext2D) => any, lineWidth: number = 5) => {
    const el = document.createElement("div");
    el.classList.add("card");

    const canvas = document.createElement("canvas");
    canvas.width = exampleSize;
    canvas.height = exampleSize;
    el.appendChild(canvas);

    const ctx = canvas.getContext("2d")!;
    ctx.strokeStyle = "black";
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";

    pad(ctx, exampleSize, exampleSize, 20);
    render(ctx);
    ctx.restore();

    const p = document.createElement("p");
    p.innerText = label;
    el.appendChild(p);

    parent.appendChild(el);
}