import { ConsonantManner, consonantManners, ConsonantModifier, ConsonantModifierAdditional, consonantModifiers, consonantModifiersAdditional, ConsonantPlace, ConsonantPlaceOpt, consonantPlaces, consonantPlacesOpt, consonants, getConsonantIPA, ipaVowels, makeOption, pad } from "./common";

const vowelF1In = document.querySelector("#v1-vowel-f1-in") as HTMLInputElement;
const vowelF2In = document.querySelector("#v1-vowel-f2-in") as HTMLInputElement;
const vowelF1Out = document.querySelector("#v1-vowel-f1-out") as HTMLSpanElement;
const vowelF2Out = document.querySelector("#v1-vowel-f2-out") as HTMLSpanElement;
const vowelRoundedIn = document.querySelector("#v1-vowel-rounded-in") as HTMLInputElement;
const vowelIPA = document.querySelector("#v1-vowel-ipa") as HTMLSpanElement;
const vowelCanvas = document.querySelector("#v1-vowel") as HTMLCanvasElement;
const vowelCtx = vowelCanvas.getContext("2d")!;

const consonantPlace1In = document.querySelector("#v1-consonant-place1-in") as HTMLSelectElement;
const consonantPlace2In = document.querySelector("#v1-consonant-place2-in") as HTMLSelectElement;
const consonantMannerIn = document.querySelector("#v1-consonant-manner-in") as HTMLSelectElement;
const consonantIPA = document.querySelector("#v1-consonant-ipa") as HTMLSpanElement;
const consonantModIn = document.querySelector("#v1-consonant-mod-in") as HTMLSelectElement;
const consonantModAddIn = document.querySelector("#v1-consonant-mod-add-in") as HTMLSelectElement;
const consonantCanvas = document.querySelector("#v1-consonant") as HTMLCanvasElement;
const consonantCtx = consonantCanvas.getContext("2d")!;

const phraseIn = document.querySelector("#v1-phrase-input") as HTMLInputElement;
const phraseScaleIn = document.querySelector("#v1-phrase-scale-in") as HTMLInputElement;
const phraseScaleOut = document.querySelector("#v1-phrase-scale-out") as HTMLSpanElement;
const phraseErrors = document.querySelector("#v1-phrase-errors") as HTMLSpanElement;
const phraseCanvas = document.querySelector("#v1-phrase") as HTMLCanvasElement;
const phraseCtx = phraseCanvas.getContext("2d")!;

for(const ctx of [vowelCtx, consonantCtx, phraseCtx]) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
}

const generateVowel = (ctx: CanvasRenderingContext2D, w: number, h: number, f1: number, f2: number, rounded: boolean) => {
    const ratioL = 330 / (f1 - 130);
    const ratioR = 1130 / (f2 - 140);
    const ratioLAbs = ratioL / (ratioL + 1);
    const ratioRAbs = ratioR / (ratioR + 1);
    
    ctx.beginPath();
    ctx.moveTo(w / 2, h);
    if(rounded) {
        ctx.arc(w / 2, h, w / 8, 0, 2 * Math.PI);
        ctx.moveTo(w / 2, h);
    }
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
const generateVowelGUI = () => {
    vowelF1Out.innerText = vowelF1In.value;
    vowelF2Out.innerText = vowelF2In.value;
    vowelIPA.innerText = Object.entries(ipaVowels).filter(x => x[1][2] === vowelRoundedIn.checked).sort((a, b) => Math.hypot(a[1][0] - vowelF1In.valueAsNumber, a[1][1] - vowelF2In.valueAsNumber) - Math.hypot(b[1][0] - vowelF1In.valueAsNumber, b[1][1] - vowelF2In.valueAsNumber))[0][0];
    vowelCtx.clearRect(0, 0, vowelCanvas.width, vowelCanvas.height);
    pad(vowelCtx, vowelCanvas.width, vowelCanvas.height, 20);
    generateVowel(vowelCtx, vowelCanvas.width, vowelCanvas.height, vowelF1In.valueAsNumber, vowelF2In.valueAsNumber, vowelRoundedIn.checked);
    vowelCtx.restore();
};
vowelF1In.addEventListener("change", generateVowelGUI);
vowelF2In.addEventListener("change", generateVowelGUI);
vowelRoundedIn.addEventListener("change", generateVowelGUI);
generateVowelGUI();

for(const place of consonantPlaces)
    consonantPlace1In.appendChild(makeOption(place, place === "alveolar"));
for(const place of consonantPlacesOpt)
    consonantPlace2In.appendChild(makeOption(place, place === "none"));
for(const manner of consonantManners)
    consonantMannerIn.appendChild(makeOption(manner, manner === "nasal"));
for(const mod of consonantModifiers)
    consonantModIn.appendChild(makeOption(mod, mod === "voiced"));
for(const mod of consonantModifiersAdditional)
    consonantModAddIn.appendChild(makeOption(mod, false));

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
        case "postalveolar":
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
            ctx.moveTo(w / 2, 5 * h / 8);
            ctx.lineTo(7 * w / 16, 11 * h / 16);
            ctx.lineTo(w / 2, 3 * h / 4);
            break;
    }
    ctx.stroke();
}
const generateConsonant = (ctx: CanvasRenderingContext2D, w: number, h: number, place1: ConsonantPlace, place2: ConsonantPlaceOpt, manner: ConsonantManner, modifier: ConsonantModifier, modifiersAdditional: ConsonantModifierAdditional[]) => {
    ctx.beginPath();
    ctx.moveTo(w / 2, h);
    ctx.lineTo(w / 2, 3 * h / 4);
    ctx.stroke();

    if(modifiersAdditional.includes("palatalized")) {
        ctx.moveTo(5 * w / 8, h);
        ctx.arc(5 * w / 8, h, ctx.lineWidth / 2, 0, Math.PI * 2);
        ctx.stroke();
    }

    if(modifier === "voiced") {
        ctx.moveTo(3 * w / 8, 7 * h / 8);
        ctx.lineTo(5 * w / 8, 7 * h / 8);
        ctx.stroke();
    } else if(modifier === "ejective") {
        ctx.moveTo(3 * w / 8, 7 * h / 8);
        ctx.lineTo(5 * w / 8, 7 * h / 8);
        ctx.lineTo(5 * w / 8, 3 * h / 4);
        ctx.lineTo(3 * w / 8, 3 * h / 4);
        ctx.lineTo(3 * w / 8, 7 * h / 8);
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
    consonantIPA.innerText = getConsonantIPA(consonantPlace1In.value as ConsonantPlace, consonantPlace2In.value as ConsonantPlaceOpt, consonantMannerIn.value as ConsonantManner, consonantModIn.value as ConsonantModifier, Array.from(consonantModAddIn.selectedOptions).map(x => x.value) as ConsonantModifierAdditional[]);
    consonantCtx.clearRect(0, 0, consonantCanvas.width, consonantCanvas.height);
    pad(consonantCtx, consonantCanvas.width, consonantCanvas.height, 20);
    generateConsonant(consonantCtx, consonantCanvas.width, consonantCanvas.height, consonantPlace1In.value as ConsonantPlace, consonantPlace2In.value as ConsonantPlaceOpt, consonantMannerIn.value as ConsonantManner, consonantModIn.value as ConsonantModifier, Array.from(consonantModAddIn.selectedOptions).map(x => x.value) as ConsonantModifierAdditional[]);
    consonantCtx.restore();
};
consonantPlace1In.addEventListener("change", generateConsonantGUI);
consonantPlace2In.addEventListener("change", generateConsonantGUI);
consonantMannerIn.addEventListener("change", generateConsonantGUI);
consonantModIn.addEventListener("change", generateConsonantGUI);
consonantModAddIn.addEventListener("change", generateConsonantGUI);
generateConsonantGUI();

const generatePhrase = (ctx: CanvasRenderingContext2D, w: number, h: number, phrase: string) => {
    const maxLen = Math.max(Object.values(consonants).sort((a, b) => b.length - a.length)[0].length, Object.keys(ipaVowels).sort((a, b) => b.length - a.length)[0].length);
    let i = 0;
    const arr: ["vowel" | "consonant" | "subphrase", ...any][] = [];
    while(i < phrase.length) {
        if(phrase[i] === "[") {
            let depth = 1, subphrase = ""; i++;
            while(i < phrase.length && depth > 0) {
                const c = phrase[i++];
                if(c === "[") depth++;
                else if(c === "]") depth--;
                if(depth !== 0) subphrase += c;
            }
            if(depth !== 0) return -1;
            arr.push(["subphrase", subphrase]);
            continue;
        }
        let skip = 1;
        for(let x = maxLen; x > 0; x--) {
            if(Object.values(consonants).includes(phrase.slice(i, i + x))) {
                const k = Object.entries(consonants).find(y => y[1] === phrase.slice(i, i + x))![0].split("+");
                const modAdd: ConsonantModifierAdditional[] = [];
                let skipAdd = 0;
                if(phrase[i + x] === "ʲ") { modAdd.push("palatalized"); skipAdd++; }
                if(k.length === 3) {
                    arr.push(["consonant", k[0], "none", k[1], k[2], modAdd]);
                } else if(k.length === 4) {
                    arr.push(["consonant", ...k, modAdd]);
                } else {
                    arr.push(["consonant", ...k.slice(0, 4), k[4].split("~").concat(modAdd)])
                }
                skip = x + skipAdd; break;
            } else if(Object.keys(ipaVowels).includes(phrase.slice(i, i + x))) {
                const vowel = ipaVowels[phrase.slice(i, i + x)];
                arr.push(["vowel", ...vowel]);
                skip = x; break;
            }
        }
        i += skip;
    }

    const halfCircumference = Math.PI * w;
    const size = halfCircumference / arr.length * 0.35;
    for(let i = 0; i < arr.length; i++) {
        const angle = -Math.PI + Math.PI * (i / (arr.length - 1));
        const pointX = arr.length === 1 ? w / 2 : Math.cos(angle) * w / 3 + w / 2;
        const pointY = arr.length === 1 ? h / 2 : Math.sin(angle) * h / 3 + h / 2;

        ctx.save();
        ctx.translate(pointX, pointY);
        ctx.rotate(angle + Math.PI / 2);
        ctx.translate(-size / 2, -size / 2);
        if(arr[i][0] === "vowel")
            generateVowel(ctx, size, size, ...arr[i].slice(1) as [number, number, boolean]);
        else if(arr[i][0] === "consonant")
            generateConsonant(ctx, size, size, ...arr[i].slice(1) as [ConsonantPlace, ConsonantPlaceOpt, ConsonantManner, ConsonantModifier, ConsonantModifierAdditional[]]);
        else if(arr[i][0] === "subphrase")
            if(generatePhrase(ctx, size, size, arr[i][1]) === -1) return -1;
        ctx.restore();

        ctx.beginPath();
        ctx.moveTo(w / 2, 3 * h / 4);
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        ctx.bezierCurveTo(w / 2, h / 2, pointX - cos * (size / 2 + w / 32), pointY - sin * (size / 2 + w / 32), pointX - cos * size / 2, pointY - sin * size / 2);
        ctx.stroke();
    }
    
    ctx.beginPath();
    ctx.moveTo(w / 2, 3 * h / 4);
    ctx.lineTo(w / 2, h);
    ctx.stroke();
}
const generatePhraseGUI = () => {
    phraseCanvas.width = phraseCanvas.height = phraseScaleIn.valueAsNumber;
    phraseScaleOut.innerText = phraseScaleIn.value;
    phraseCtx.lineWidth = 3;

    phraseCtx.clearRect(0, 0, phraseCanvas.width, phraseCanvas.height);
    pad(phraseCtx, phraseCanvas.width, phraseCanvas.height, 100);
    const out = generatePhrase(phraseCtx, phraseCanvas.width, phraseCanvas.height, phraseIn.value);
    phraseErrors.innerText = out === -1
        ? "invalid brackets"
        : "";
    phraseCtx.restore();
}
phraseIn.addEventListener("change", generatePhraseGUI);
phraseScaleIn.addEventListener("change", generatePhraseGUI);
generatePhraseGUI();

const exampleSize = 150;
const generateCard = (parent: HTMLElement, label: string, render: (ctx: CanvasRenderingContext2D) => any) => {
    const el = document.createElement("div");
    el.classList.add("card");

    const canvas = document.createElement("canvas");
    canvas.width = exampleSize;
    canvas.height = exampleSize;
    el.appendChild(canvas);

    const ctx = canvas.getContext("2d")!;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";

    pad(ctx, exampleSize, exampleSize, 20);
    render(ctx);
    ctx.restore();

    const p = document.createElement("p");
    p.innerText = label;
    el.appendChild(p);

    parent.appendChild(el);
}

const vowelFrequencies: ([number, number, boolean])[] = [[300, 700, false], [800, 700, true], [300, 2400, false], [800, 2400, true]];
const vowelExamples = ["i", "y", "a", "e", "o", "u"];

const consonantExamples = ["b", "p", "k", "l", "w", "xʼ", "kʘ"];

for(const freq of vowelFrequencies)
    generateCard(document.querySelector("#v1-key-vowels-frequencies") as HTMLDivElement, `F1 = ${freq[0]}; F2 = ${freq[1]}; ${freq[2] ? "rounded" : "unrounded"}`,
        ctx => generateVowel(ctx, exampleSize, exampleSize, ...freq));
for(const ex of vowelExamples)
    generateCard(document.querySelector("#v1-key-vowels-examples") as HTMLDivElement, `IPA: /${ex}/`,
        ctx => generateVowel(ctx, exampleSize, exampleSize, ipaVowels[ex][0], ipaVowels[ex][1], ipaVowels[ex][2]));
for(const pl of consonantPlaces)
    generateCard(document.querySelector("#v1-key-consonants-places") as HTMLDivElement, `place: ${pl}`,
        ctx => generateConsonantPlace(ctx, exampleSize, exampleSize, pl));
for(const pl of consonantManners)
    generateCard(document.querySelector("#v1-key-consonants-manners") as HTMLDivElement, `manner: ${pl}`,
        ctx => generateConsonantManner(ctx, exampleSize, exampleSize, pl));
for(const pl of consonantModifiers)
    generateCard(document.querySelector("#v1-key-consonants-modifiers") as HTMLDivElement, `modifier: ${pl}`,
        ctx => generateConsonant(ctx, exampleSize, exampleSize, "alveolar", "none", "sibilant fricative", pl, []));
for(const pl of (["none"] as (ConsonantModifierAdditional | "none")[]).concat([...consonantModifiersAdditional]))
    generateCard(document.querySelector("#v1-key-consonants-additional-modifiers") as HTMLDivElement, `add. modifier: ${pl}`,
        ctx => generateConsonant(ctx, exampleSize, exampleSize, "alveolar", "none", "lateral approximant", "voiced", pl === "none" ? [] : [pl]));
for(const ex of consonantExamples) {
    const k = Object.entries(consonants).find(y => y[1] === ex)![0].split("+");
    let args: [ConsonantPlace, ConsonantPlaceOpt, ConsonantManner, ConsonantModifier, ConsonantModifierAdditional[]];
    if(k.length === 3) {
        args = [k[0] as ConsonantPlace, "none", k[1] as ConsonantManner, k[2] as ConsonantModifier, []];
    } else if(k.length === 4) {
        args = [...k as [ConsonantPlace, ConsonantPlaceOpt, ConsonantManner, ConsonantModifier], []];
    } else {
        args = [...k.slice(0, 4) as [ConsonantPlace, ConsonantPlaceOpt, ConsonantManner, ConsonantModifier], k[4].split("~") as ConsonantModifierAdditional[]];
    }
    generateCard(document.querySelector("#v1-key-consonants-examples") as HTMLDivElement, `IPA: /${ex}/`,
        ctx => generateConsonant(ctx, exampleSize, exampleSize, ...args));
}