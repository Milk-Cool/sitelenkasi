const vowelF1In = document.querySelector("#vowel-f1-in") as HTMLInputElement;
const vowelF2In = document.querySelector("#vowel-f2-in") as HTMLInputElement;
const vowelF1Out = document.querySelector("#vowel-f1-out") as HTMLSpanElement;
const vowelF2Out = document.querySelector("#vowel-f2-out") as HTMLSpanElement;
const vowelIPA = document.querySelector("#vowel-ipa") as HTMLSpanElement;
const vowelCanvas = document.querySelector("#vowel") as HTMLCanvasElement;
const vowelCtx = vowelCanvas.getContext("2d")!;

const consonantPlace1In = document.querySelector("#consonant-place1-in") as HTMLSelectElement;
const consonantPlace2In = document.querySelector("#consonant-place2-in") as HTMLSelectElement;
const consonantMannerIn = document.querySelector("#consonant-manner-in") as HTMLSelectElement;
const consonantIPA = document.querySelector("#consonant-ipa") as HTMLSpanElement;
const consonantModIn = document.querySelector("#consonant-mod-in") as HTMLSelectElement;
const consonantCanvas = document.querySelector("#consonant") as HTMLCanvasElement;
const consonantCtx = consonantCanvas.getContext("2d")!;

const padding = 20;
const pad = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.save();
    ctx.scale((w - 2 * padding) / w, (h - 2 * padding) / h);
    ctx.translate(padding, padding);
}

for(const ctx of [vowelCtx, consonantCtx]) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
}

const generateVowel = (ctx: CanvasRenderingContext2D, w: number, h: number, f1: number, f2: number) => {
    const ratioL = 330 / (f1 - 130);
    const ratioR = 1130 / (f2 - 140);
    const ratioLAbs = ratioL / (ratioL + 1);
    const ratioRAbs = ratioR / (ratioR + 1);
    
    ctx.beginPath();
    ctx.moveTo(w / 2, h);
    ctx.lineTo(w / 2, h / 3);
    ctx.bezierCurveTo(w / 2, h / 6, w / 2, 0, w / 8, 0);
    ctx.bezierCurveTo(w / 8, h / 3, w / 4, h * ratioLAbs, w / 2, h * ratioLAbs);
    ctx.moveTo(w / 2, h / 3);
    ctx.bezierCurveTo(w / 2, h / 6, w / 2, 0, 7 * w / 8, 0);
    ctx.bezierCurveTo(7 * w / 8, h / 3, 3 * w / 4, h * ratioRAbs, w / 2, h * ratioRAbs);
    ctx.moveTo(3 * w / 8, h);
    ctx.lineTo(5 * w / 8, h);
    ctx.stroke();
};
const ipaVowels: Record<string, [number, number]> = {
    "i": [300, 2350],
    "ɪ": [360, 2200],
    "e": [425, 2150],
    "ɛ": [575, 1850],
    "æ": [770, 1780],
    "a": [810, 1640],
    "ä": [780, 1200],
    "ɑ": [780, 1060],
    "ɒ": [650, 850],
    "ɔ": [550, 840],
    "o": [400, 740],
    "u": [300, 750],
    "ʊ": [330, 900],
};
const generateVowelGUI = () => {
    vowelF1Out.innerText = vowelF1In.value;
    vowelF2Out.innerText = vowelF2In.value;
    vowelIPA.innerText = Object.entries(ipaVowels).sort((a, b) => Math.hypot(a[1][0] - vowelF1In.valueAsNumber, a[1][1] - vowelF2In.valueAsNumber) - Math.hypot(b[1][0] - vowelF1In.valueAsNumber, b[1][1] - vowelF2In.valueAsNumber))[0][0];
    vowelCtx.clearRect(0, 0, vowelCanvas.width, vowelCanvas.height);
    pad(vowelCtx, vowelCanvas.width, vowelCanvas.height);
    generateVowel(vowelCtx, vowelCanvas.width, vowelCanvas.height, vowelF1In.valueAsNumber, vowelF2In.valueAsNumber);
    vowelCtx.restore();
};
vowelF1In.addEventListener("change", generateVowelGUI);
vowelF2In.addEventListener("change", generateVowelGUI);
generateVowelGUI();

const consonantPlaces = ["bilabial", "labiodental", "linguolabial", "dental", "alveolar", "postalveoral", "retroflex", "palatal", "velar", "uvular", "epiglottal", "glottal"] as const;
const consonantPlacesOpt = [...consonantPlaces, "none"] as const;
const consonantManners = ["nasal", "plosive", "sibilant affricate", "non-sibilant affricate", "sibilant fricative", "non-sibilant fricative", "approximant", "tap/flap", "trill", "lateral affricate", "lateral fricative", "lateral approximant", "lateral tap/flap", "implosive", "ejective", "click"] as const;
const consonantModifiers = ["voiced", "none"] as const;
type ConsonantPlace = typeof consonantPlaces[number];
type ConsonantPlaceOpt = typeof consonantPlacesOpt[number];
type ConsonantManner = typeof consonantManners[number];
type ConsonantModifier = typeof consonantModifiers[number];

const makeOption = (opt: string, sel: boolean) => {
    const el = document.createElement("option");
    el.value = opt;
    el.innerText = opt;
    el.selected = sel;
    return el;
}
for(const place of consonantPlaces)
    consonantPlace1In.appendChild(makeOption(place, place === "alveolar"));
for(const place of consonantPlacesOpt)
    consonantPlace2In.appendChild(makeOption(place, place === "none"));
for(const manner of consonantManners)
    consonantMannerIn.appendChild(makeOption(manner, manner === "nasal"));
for(const mod of consonantModifiers)
    consonantModIn.appendChild(makeOption(mod, mod === "voiced"));

const generateConsonantPlace = (ctx: CanvasRenderingContext2D, w: number, h: number, place: ConsonantPlaceOpt) => {
    if(place === "none") return;
    ctx.beginPath();
    ctx.moveTo(w / 2, h);
    ctx.lineTo(w / 2, h / 4);
    switch(place) {
        case "bilabial":
            ctx.moveTo(w / 2, h / 4); // required!!
            ctx.arcTo(w / 4, h / 2, w / 2, 3 * h / 4, w / 4);
            ctx.lineTo(w / 2, 3 * h / 4);
            ctx.arcTo(3 * w / 4, h / 2, w / 2, h / 4, w / 4);
            ctx.lineTo(w / 2, h / 4);
            break;
        case "labiodental":
            ctx.moveTo(w / 2, h / 4); // required!!
            ctx.arcTo(w / 4, h / 2, w / 2, 3 * h / 4, w / 4);
            ctx.lineTo(w / 2, 3 * h / 4);
            ctx.moveTo(w / 2, 3 * h / 4);
            ctx.lineTo(5 * w / 8, 3 * h / 4);
            ctx.moveTo(w / 2, 7 * h / 12);
            ctx.lineTo(5 * w / 8, 7 * h / 12);
            ctx.moveTo(w / 2, 5 * h / 12);
            ctx.lineTo(5 * w / 8, 5 * h / 12);
            ctx.moveTo(w / 2, h / 4);
            ctx.lineTo(5 * w / 8, h / 4);
            break;
        case "linguolabial":
            ctx.moveTo(w / 2, h / 4); // required!!
            ctx.arcTo(w / 4, 3 * h / 8, w / 2, h / 2, w / 8);
            ctx.lineTo(w / 2, h / 2);
            ctx.moveTo(w / 2, h / 2); // just as important!!
            ctx.arcTo(w / 4, 5 * h / 8, w / 2, 3 * h / 4, w / 8);
            ctx.lineTo(w / 2, 3 * h / 4);
            break;
        case "dental":
            ctx.moveTo(3 * w / 8, h / 4);
            ctx.lineTo(3 * w / 8, h / 2);
            ctx.lineTo(5 * w / 8, h / 2);
            ctx.lineTo(5 * w / 8, h / 4);
            break;
        case "postalveoral":
            ctx.moveTo(3 * w / 8, 3 * h / 8);
            ctx.lineTo(5 * w / 8, h / 2);
        case "alveolar":
            ctx.moveTo(3 * w / 8, 3 * h / 8);
            ctx.lineTo(5 * w / 8, 3 * h / 8);
            ctx.moveTo(3 * w / 8, h / 2);
            ctx.lineTo(5 * w / 8, h / 2);
            break;
        case "retroflex":
            ctx.arc(3 * w / 8, h / 4, w / 8, 0, Math.PI, true);
            break;
        case "velar":
            ctx.moveTo(w / 2, h / 4);
            ctx.lineTo(3 * w / 8, h / 8);
            ctx.moveTo(w / 2, h / 4);
            ctx.lineTo(5 * w / 8, h / 8);
        case "palatal":
            ctx.moveTo(w / 2, h / 4);
            ctx.lineTo(3 * w / 8, 3 * h / 8);
            ctx.moveTo(w / 2, h / 4);
            ctx.lineTo(5 * w / 8, 3 * h / 8);
            break;
        case "glottal":
            ctx.moveTo(w / 2, h / 2);
            ctx.lineTo(3 * w / 8, 3 * h / 8);
            ctx.moveTo(w / 2, h / 2);
            ctx.lineTo(5 * w / 8, 3 * h / 8);
        case "epiglottal":
            ctx.moveTo(w / 2, 3 * h / 8);
            ctx.lineTo(3 * w / 8, h / 4);
            ctx.moveTo(w / 2, 3 * h / 8);
            ctx.lineTo(5 * w / 8, h / 4);
        case "uvular":
            ctx.moveTo(w / 2, h / 4);
            ctx.lineTo(3 * w / 8, h / 8);
            ctx.moveTo(w / 2, h / 4);
            ctx.lineTo(5 * w / 8, h / 8);
            break;
    }
    ctx.stroke();
};
const generateConsonantManner = (ctx: CanvasRenderingContext2D, w: number, h: number, manner: ConsonantManner) => {
    ctx.beginPath();
    ctx.moveTo(w / 2, h);
    ctx.lineTo(w / 2, h / 4);
    if(manner.startsWith("lateral ")) {
        ctx.moveTo(7 * w / 16, 5 * h / 8);
        ctx.lineTo(9 * w / 16, 5 * h / 8);
        ctx.lineTo(9 * w / 16, 3 * h / 4);
        ctx.lineTo(7 * w / 16, 3 * h / 4);
        ctx.lineTo(7 * w / 16, 5 * h / 8);
    }
    switch(manner) {
        case "nasal":
            ctx.moveTo(5 * w / 8, 5 * h / 8);
            ctx.arc(w / 2, 5 * h / 8, w / 8, 0, Math.PI * 2);
            break;
        case "plosive":
            ctx.moveTo(w / 2, h / 4);
            ctx.lineTo(3 * w / 8, h / 8);
            ctx.moveTo(w / 2, h / 4);
            ctx.lineTo(5 * w / 8, h / 8);
            ctx.moveTo(w / 2, h / 4);
            ctx.lineTo(3 * w / 8, 3 * h / 8);
            ctx.moveTo(w / 2, h / 4);
            ctx.lineTo(5 * w / 8, 3 * h / 8);
            break;
        case "sibilant affricate":
            ctx.moveTo(3 * w / 8, 3 * h / 4);
            ctx.lineTo(5 * w / 8, 3 * h / 4);
        case "lateral affricate":
        case "non-sibilant affricate":
            ctx.moveTo(5 * w / 8, 3 * h / 8);
            ctx.arc(w / 2, 3 * h / 8, w / 8, 0, Math.PI * 2);
            ctx.moveTo(w / 2, h / 4);
            ctx.lineTo(3 * w / 8, h / 8);
            ctx.moveTo(w / 2, h / 4);
            ctx.lineTo(5 * w / 8, h / 8);
            break;
        case "sibilant fricative":
            ctx.moveTo(3 * w / 8, 3 * h / 4);
            ctx.lineTo(5 * w / 8, 3 * h / 4);
        case "lateral fricative":
        case "non-sibilant fricative":
            ctx.moveTo(5 * w / 8, h / 8);
            ctx.arc(w / 2, h / 8, w / 8, 0, Math.PI * 2);
            break;
        case "lateral approximant":
        case "approximant":
            ctx.moveTo(3 * w / 8, h / 4);
            ctx.lineTo(3 * w / 8, h / 2);
            ctx.moveTo(5 * w / 8, h / 4);
            ctx.lineTo(5 * w / 8, h / 2);
            break;
        case "lateral tap/flap":
        case "tap/flap":
            ctx.moveTo(3 * w / 8, h / 4);
            ctx.lineTo(5 * w / 8, h / 4);
            break;
        case "trill":
            ctx.moveTo(11 * w / 32, 7 * h / 32);
            ctx.lineTo(13 * w / 32, 9 * h / 32);
            ctx.lineTo(15 * w / 32, 7 * h / 32);
            ctx.lineTo(17 * w / 32, 9 * h / 32);
            ctx.lineTo(19 * w / 32, 7 * h / 32);
            ctx.lineTo(21 * w / 32, 9 * h / 32);
            break;
        case "implosive":
            ctx.moveTo(7 * w / 16, 5 * h / 8);
            ctx.lineTo(9 * w / 16, 3 * h / 4);
            ctx.moveTo(9 * w / 16, 5 * h / 8);
            ctx.lineTo(7 * w / 16, 3 * h / 4);
            ctx.moveTo(7 * w / 16, 11 * h / 16);
            ctx.lineTo(9 * w / 16, 11 * h / 16);
            break;
        case "click":
            ctx.moveTo(w / 2, 3 * h / 4);
            ctx.lineTo(9 * w / 16, 11 * h / 16);
            ctx.lineTo(w / 2, 5 * h / 8);
        case "ejective":
            ctx.moveTo(w / 2, 5 * h / 8);
            ctx.lineTo(7 * w / 16, 11 * h / 16);
            ctx.lineTo(w / 2, 3 * h / 4);
            break;
    }
    ctx.stroke();
}
const generateConsonant = (ctx: CanvasRenderingContext2D, w: number, h: number, place1: ConsonantPlace, place2: ConsonantPlaceOpt, manner: ConsonantManner, modifier: ConsonantModifier) => {
    ctx.beginPath();
    ctx.moveTo(w / 2, h);
    ctx.lineTo(w / 2, 3 * h / 4);
    ctx.stroke();

    if(modifier === "voiced") {
        ctx.moveTo(3 * w / 8, 7 * h / 8);
        ctx.lineTo(5 * w / 8, 7 * h / 8);
        ctx.stroke();
    }

    ctx.save();
    ctx.translate(w / 2 - 1 / Math.sqrt(2) * 1.5 * 3 * w / 4, 3 * h / 4 - 1 / Math.sqrt(2) * 0.5 * 3 * h / 4);
    ctx.rotate(-Math.PI / 4);
    generateConsonantPlace(ctx, 3 * w / 4, 3 * h / 4, place1);
    ctx.restore();

    ctx.save();
    ctx.translate(w / 8, 0);
    generateConsonantPlace(ctx, 3 * w / 4, 3 * h / 4, place2);
    ctx.restore();

    ctx.save();
    ctx.translate(w / 2 + 1 / Math.sqrt(2) * 0.5 * 3 * w / 4, 3 * h / 4 - 1 / Math.sqrt(2) * 1.5 * 3 * h / 4);
    ctx.rotate(Math.PI / 4);
    generateConsonantManner(ctx, 3 * w / 4, 3 * h / 4, manner);
    ctx.restore();
};
const generateConsonantGUI = () => {
    consonantCtx.clearRect(0, 0, consonantCanvas.width, consonantCanvas.height);
    pad(consonantCtx, consonantCanvas.width, consonantCanvas.height);
    generateConsonant(consonantCtx, consonantCanvas.width, consonantCanvas.height, consonantPlace1In.value as ConsonantPlace, consonantPlace2In.value as ConsonantPlaceOpt, consonantMannerIn.value as ConsonantManner, consonantModIn.value as ConsonantModifier);
    consonantCtx.restore();
};
consonantPlace1In.addEventListener("change", generateConsonantGUI);
consonantPlace2In.addEventListener("change", generateConsonantGUI);
consonantMannerIn.addEventListener("change", generateConsonantGUI);
consonantModIn.addEventListener("change", generateConsonantGUI);
generateConsonantGUI();