import { ConsonantManner, consonantManners, ConsonantModifier, ConsonantModifierAdditional, consonantModifiers, consonantModifiersAdditional, ConsonantPlace, ConsonantPlaceOpt, consonantPlaces, consonantPlacesOpt, consonants, getConsonantIPA, ipaVowels, makeOption, pad, VowelBackness, vowelBacknesses, VowelOpenness, vowelOpennesses } from "./common";

const vowelOpennessIn = document.querySelector("#v2-vowel-openness-in") as HTMLSelectElement;
const vowelBacknessIn = document.querySelector("#v2-vowel-backness-in") as HTMLSelectElement;
const vowelRoundedIn = document.querySelector("#v2-vowel-rounded-in") as HTMLInputElement;
const vowelIPA = document.querySelector("#v2-vowel-ipa") as HTMLSpanElement;
const vowelCanvas = document.querySelector("#v2-vowel") as HTMLCanvasElement;
const vowelCtx = vowelCanvas.getContext("2d")!;

for(const ctx of [vowelCtx]) {
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