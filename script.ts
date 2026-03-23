const vowelF1In = document.querySelector("#vowel-f1-in") as HTMLInputElement;
const vowelF2In = document.querySelector("#vowel-f2-in") as HTMLInputElement;
const vowelF1Out = document.querySelector("#vowel-f1-out") as HTMLSpanElement;
const vowelF2Out = document.querySelector("#vowel-f2-out") as HTMLSpanElement;
const vowelIPA = document.querySelector("#vowel-ipa") as HTMLSpanElement;
const vowelCanvas = document.querySelector("#vowel") as HTMLCanvasElement;
const vowelCtx = vowelCanvas.getContext("2d")!;

const padding = 20;
const pad = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.save();
    ctx.scale((w - 2 * padding) / w, (h - 2 * padding) / h);
    ctx.translate(padding, padding);
}

for(const ctx of [vowelCtx]) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 10;
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