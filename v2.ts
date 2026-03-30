import { ConsonantManner, consonantManners, ConsonantModifier, ConsonantModifierAdditional, consonantModifiers, consonantModifiersAdditional, ConsonantPlace, ConsonantPlaceOpt, consonantPlaces, consonantPlacesOpt, consonants, getConsonantIPA, ipaVowels, makeOption, pad, VowelBackness, vowelBacknesses, VowelOpenness, vowelOpennesses } from "./common";

const vowelOpennessIn = document.querySelector("#v2-vowel-openness-in") as HTMLSelectElement;
const vowelBacknessIn = document.querySelector("#v2-vowel-backness-in") as HTMLSelectElement;
const vowelRoundedIn = document.querySelector("#v2-vowel-rounded-in") as HTMLInputElement;
const vowelIPA = document.querySelector("#v2-vowel-ipa") as HTMLSpanElement;
const vowelCanvas = document.querySelector("#v2-vowel") as HTMLCanvasElement;
const vowelCtx = vowelCanvas.getContext("2d")!;

const consonantPlace1In = document.querySelector("#v2-consonant-place1-in") as HTMLSelectElement;
const consonantPlace2In = document.querySelector("#v2-consonant-place2-in") as HTMLSelectElement;
const consonantMannerIn = document.querySelector("#v2-consonant-manner-in") as HTMLSelectElement;
const consonantIPA = document.querySelector("#v2-consonant-ipa") as HTMLSpanElement;
const consonantModIn = document.querySelector("#v2-consonant-mod-in") as HTMLSelectElement;
const consonantModAddIn = document.querySelector("#v2-consonant-mod-add-in") as HTMLSelectElement;
const consonantCanvas = document.querySelector("#v2-consonant") as HTMLCanvasElement;
const consonantCtx = consonantCanvas.getContext("2d")!;

for(const ctx of [vowelCtx, consonantCtx]) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
}

for(const openness of vowelOpennesses)
    vowelOpennessIn.appendChild(makeOption(openness, openness === "mid"));
for(const backness of vowelBacknesses)
    vowelBacknessIn.appendChild(makeOption(backness, backness === "central"));

const generateVowelLeaf = (ctx: CanvasRenderingContext2D, w: number, h: number, openness: VowelOpenness | "none", rounded: boolean) => {
    ctx.beginPath();
    ctx.moveTo(w / 2, h);
    ctx.lineTo(w / 2, 0);
    ctx.moveTo(w / 2, 0);
    ctx.bezierCurveTo(rounded ? w / 4 : w / 2, 0, w / 16, 3 * h / 4, w / 2, 3 * h / 4);
    ctx.bezierCurveTo(15 * w / 16, 3 * h / 4, rounded ? 3 * w / 4 : w / 2, 0, w / 2, 0);

    if(openness === "open" || openness === "near-open" || openness === "open-mid") {
        ctx.moveTo(7 * w / 16, h / 8);
        ctx.lineTo(w / 2, 3 * h / 16);
        ctx.lineTo(9 * w / 16, h / 8);
    }
    if(openness === "near-open" || openness === "open-mid" || openness === "mid" || openness === "close-mid") {
        ctx.moveTo(7 * w / 16, 5 * h / 16);
        ctx.lineTo(w / 2, 3 * h / 8);
        ctx.lineTo(9 * w / 16, 5 * h / 16);
    }
    if(openness === "open-mid" || openness === "mid" || openness === "close-mid" || openness === "near-close") {
        ctx.moveTo(7 * w / 16, h / 2);
        ctx.lineTo(w / 2, 9 * h / 16);
        ctx.lineTo(9 * w / 16, h / 2);
    }
    if(openness === "close-mid" || openness === "near-close" || openness === "close") {
        ctx.moveTo(7 * w / 16, 11 * h / 16);
        ctx.lineTo(w / 2, 3 * h / 4);
        ctx.lineTo(9 * w / 16, 11 * h / 16);
    }

    ctx.stroke();
};
const generateVowel = (ctx: CanvasRenderingContext2D, w: number, h: number, openness: VowelOpenness, backness: VowelBackness, rounded: boolean) => {
    ctx.beginPath();
    ctx.moveTo(w / 2, h);
    ctx.lineTo(w / 2, 3 * h / 4);
    ctx.stroke();

    const n = backness === "front" ? 1 : backness === "front central" || backness === "central" ? 2 : 3;
    let rot = n === 1 ? 0 : -Math.PI / 2.3 * (n - 1) / 2;

    for(let i = 1; i <= n; i++) {
        ctx.save();
        ctx.translate(w / 2, 3 * h / 4);
        ctx.rotate(rot);
        i === n && (backness === "central back" || backness === "front central")
            ? ctx.translate(-w / 8, -h / 4)
            : ctx.translate(-w / 4, -h / 2);
        i === n && (backness === "central back" || backness === "front central")
            ? generateVowelLeaf(ctx, w / 4, h / 4, openness, rounded)
            : generateVowelLeaf(ctx, w / 2, h / 2, openness, rounded);
        ctx.restore();

        rot += Math.PI / 2.3;
    }
};
generateVowel(vowelCtx, vowelCanvas.width, vowelCanvas.height, "open-mid", "central back", true);

const generateVowelGUI = () => {
    vowelIPA.innerText = Object.entries(ipaVowels).find(x => x[1][2] === vowelRoundedIn.checked && x[1][3] === vowelOpennessIn.value as VowelOpenness && x[1][4] === vowelBacknessIn.value as VowelBackness)?.[0] || "unknown";
    vowelCtx.clearRect(0, 0, vowelCanvas.width, vowelCanvas.height);
    pad(vowelCtx, vowelCanvas.width, vowelCanvas.height, 20);
    generateVowel(vowelCtx, vowelCanvas.width, vowelCanvas.height, vowelOpennessIn.value as VowelOpenness, vowelBacknessIn.value as VowelBackness, vowelRoundedIn.checked);
    vowelCtx.restore();
};
vowelOpennessIn.addEventListener("change", generateVowelGUI);
vowelBacknessIn.addEventListener("change", generateVowelGUI);
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

const generateConsonantPetal = (ctx: CanvasRenderingContext2D, w: number, h: number, manner: ConsonantManner) => {
    ctx.beginPath();

    if(manner.startsWith("sibilant ")) {
        ctx.moveTo(w / 2, h);
        ctx.lineTo(w / 2, h / 2);
    }

    switch(manner) {
        case "nasal":
            ctx.moveTo(3 * w / 8, h);
            ctx.bezierCurveTo(3 * w / 8, h, w / 4, 0, w / 2, 0);
            ctx.moveTo(5 * w / 8, h);
            ctx.bezierCurveTo(5 * w / 8, h, 3 * w / 4, 0, w / 2, 0);
            ctx.moveTo(7 * w / 16, h / 4);
            ctx.lineTo(7 * w / 16, h / 2);
            ctx.moveTo(9 * w / 16, h / 4);
            ctx.lineTo(9 * w / 16, h / 2);
            break;
        case "plosive":
            ctx.moveTo(3 * w / 8, h);
            ctx.lineTo(w / 4, 0);
            ctx.lineTo(3 * w / 4, 0);
            ctx.lineTo(5 * w / 8, h);
            break;
        case "lateral affricate":
            ctx.moveTo(w / 2, h);
            ctx.lineTo(w / 2, 0);
        case "non-sibilant affricate":
        case "sibilant affricate":
            ctx.moveTo(3 * w / 8, h);
            ctx.bezierCurveTo(w / 4, 3 * h / 4, w / 4, h / 4, w / 2, 0);
            ctx.moveTo(5 * w / 8, h);
            ctx.bezierCurveTo(3 * w / 4, 3 * h / 4, 3 * w / 4, h / 4, w / 2, 0);
            break;
        case "lateral fricative":
            ctx.moveTo(w / 2, h);
            ctx.lineTo(w / 2, h / 5);
        case "non-sibilant fricative":
        case "sibilant fricative":
            ctx.moveTo(3 * w / 8, h);
            ctx.bezierCurveTo(w / 4, 3 * h / 4, w / 4, h / 4, w / 4, 0);
            ctx.moveTo(5 * w / 8, h);
            ctx.bezierCurveTo(3 * w / 4, 3 * h / 4, 3 * w / 4, h / 4, 3 * w / 4, 0);
            ctx.moveTo(w / 4, 0);
            ctx.bezierCurveTo(3 * w / 8, h / 4, 5 * w / 8, h / 4, 3 * w / 4, 0);
            break;
        case "lateral approximant":
            ctx.moveTo(w / 2, h);
            ctx.lineTo(w / 2, h / 4);
        case "approximant":
            ctx.moveTo(3 * w / 8, h);
            ctx.lineTo(w / 4, 0);
            ctx.lineTo(w / 2, h / 4);
            ctx.lineTo(3 * w / 4, 0);
            ctx.lineTo(5 * w / 8, h);
            break;
        case "lateral tap/flap":
            ctx.moveTo(w / 2, h);
            ctx.lineTo(w / 2, 15 * h / 48);
        case "tap/flap":
            ctx.moveTo(3 * w / 8, h);
            ctx.bezierCurveTo(3 * w / 8, h, w / 8, 3 * h / 8, w / 4, h / 4);
            ctx.bezierCurveTo(w / 4, h / 4, w / 3, h / 8, 5 * w / 12, h / 4);
            ctx.bezierCurveTo(5 * w / 12, h / 4, w / 2, 3 * h / 8, 7 * w / 12, h / 4);
            ctx.bezierCurveTo(7 * w / 12, h / 4, 2 * w / 3, h / 8, 3 * w / 4, h / 4);
            ctx.bezierCurveTo(3 * w / 4, h / 4, 7 * w / 8, 3 * h / 8, 5 * w / 8, h);
            break;
        case "trill":
            ctx.moveTo(3 * w / 8, h);
            ctx.bezierCurveTo(3 * w / 8, h, w / 8, h / 2, w / 4, h / 4);
            ctx.bezierCurveTo(w / 4, h / 4, 3 * w / 10, h / 8, 7 * w / 20, h / 4);
            ctx.bezierCurveTo(7 * w / 20, h / 4, 4 * w / 10, 3 * h / 8, 9 * w / 20, h / 4);
            ctx.bezierCurveTo(9 * w / 20, h / 4, w / 2, h / 8, 11 * w / 20, h / 4);
            ctx.bezierCurveTo(11 * w / 20, h / 4, 3 * w / 5, 3 * h / 8, 13 * w / 20, h / 4);
            ctx.bezierCurveTo(13 * w / 20, h / 4, 7 * w / 10, h / 8, 3 * w / 4, h / 4);
            ctx.bezierCurveTo(3 * w / 4, h / 4, 7 * w / 8, h / 2, 5 * w / 8, h);
            break;
        case "implosive":
            ctx.moveTo(3 * w / 8, h);
            ctx.lineTo(w / 4, 0);
            ctx.lineTo(3 * w / 8, h / 4);
            ctx.lineTo(w / 2, 0);
            ctx.lineTo(5 * w / 8, h / 4);
            ctx.lineTo(3 * w / 4, 0);
            ctx.lineTo(5 * w / 8, h);
            break;
        case "click":
            ctx.moveTo(3 * w / 8, h);
            ctx.lineTo(w / 2, 0);
            ctx.lineTo(5 * w / 8, h);
            break;
    }

    ctx.stroke();
};
const generateSingleConsonant = (ctx: CanvasRenderingContext2D, w: number, h: number, place: ConsonantPlace, manner: ConsonantManner, modifier: ConsonantModifier, modifiersAdditional: ConsonantModifierAdditional[]) => {
    ctx.beginPath();

    ctx.moveTo(7 * w / 12, h / 2);
    ctx.arc(w / 2, h / 2, w / 12, 0, Math.PI * 2);
    if(modifier === "voiced") {
        ctx.moveTo(w / 2 + ctx.lineWidth / 2, h / 2);
        ctx.arc(w / 2, h / 2, ctx.lineWidth / 2, 0, Math.PI * 2);
    } else if(modifier === "ejective") {
        ctx.moveTo(13 * w / 24, h / 2);
        ctx.arc(w / 2, h / 2, w / 24, 0, Math.PI * 2);
    }

    ctx.moveTo(w / 2, h);
    ctx.lineTo(w / 2, 7 * h / 8);
    if(modifiersAdditional.includes("palatalized")) {
        ctx.lineTo(23 * w / 48, h / 2 + w / 12);
        ctx.moveTo(w / 2, 7 * h / 8);
        ctx.lineTo(25 * w / 48, h / 2 + w / 12);
    } else ctx.lineTo(w / 2, h / 2 + w / 12);

    ctx.stroke();

    const placements: number[] = [];
    if(place === "bilabial")
        placements.push(-Math.PI / 8, Math.PI / 8);
    else if(place === "labiodental")
        placements.push(-Math.PI / 4, Math.PI / 4);
    else if(place === "linguolabial")
        placements.push(-7 * Math.PI / 8, 7 * Math.PI / 8);
    else if(place === "dental")
        placements.push(-Math.PI / 2, Math.PI / 2);
    else if(place === "alveolar")
        placements.push(0, -3 * Math.PI / 4, 3 * Math.PI / 4);
    else if(place === "postalveolar")
        placements.push(-Math.PI / 8, Math.PI / 8, -3 * Math.PI / 4, 3 * Math.PI / 4);
    else if(place === "retroflex")
        placements.push(-Math.PI / 4, 0, Math.PI / 4);
    else if(place === "palatal")
        placements.push(-Math.PI / 2, -3 * Math.PI / 4, Math.PI / 2, 3 * Math.PI / 4);
    else if(place === "velar")
        placements.push(-4 * Math.PI / 5, -2 * Math.PI / 5, 0, 2 * Math.PI / 5, 4 * Math.PI / 5);
    else if(place === "uvular")
        placements.push(-5 * Math.PI / 7, -3 * Math.PI / 7, -1 * Math.PI / 7, 1 * Math.PI / 7, 3 * Math.PI / 7, 5 * Math.PI / 7);
    else if(place === "epiglottal")
        placements.push(-3 * Math.PI / 4, -Math.PI / 2, -Math.PI / 4, 0, Math.PI / 4, Math.PI / 2, 3 * Math.PI / 4);
    else if(place === "glottal")
        placements.push(-7 * Math.PI / 8, -5 * Math.PI / 8, -3 * Math.PI / 8, -Math.PI / 8, Math.PI / 8, 3 * Math.PI / 8, 5 * Math.PI / 8, 7 * Math.PI / 8);

    for(const rot of placements) {
        ctx.save();
        ctx.translate(w / 2, h / 2);
        ctx.rotate(rot);
        ctx.translate(0, -w / 12);
        ctx.translate(-w / 8, -h / 6);
        generateConsonantPetal(ctx, w / 4, h / 6, manner);
        ctx.restore();
    }
};
const generateConsonant = (ctx: CanvasRenderingContext2D, w: number, h: number, place1: ConsonantPlace, place2: ConsonantPlaceOpt, manner: ConsonantManner, modifier: ConsonantModifier, modifiersAdditional: ConsonantModifierAdditional[]) => {
    if(place2 === "none")
        return generateSingleConsonant(ctx, w, h, place1, manner, modifier, modifiersAdditional);
    
    for(const [rot, place] of [[-Math.PI / 6, place1], [Math.PI / 6, place2]]) {
        ctx.save();
        ctx.translate(w / 2, 7 * h / 8);
        ctx.rotate(rot as number);
        ctx.translate(-w / 2, -h);
        generateSingleConsonant(ctx, w, h, place as ConsonantPlace, manner, modifier, modifiersAdditional);
        ctx.restore();
    }

    ctx.beginPath();
    ctx.moveTo(w / 2, 7 * h / 8);
    ctx.lineTo(w / 2, h);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(w / 2, 7 * h / 8, w / 8, -Math.PI / 6 - Math.PI / 2, Math.PI / 6 - Math.PI / 2);
    ctx.stroke();
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