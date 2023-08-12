import { getElem, getAnalyser, getAudioCtx } from "./utils.js";
import { draw } from "./draw.js";

// *****ELEMENT SETUP*****
const canvas = getElem("#canvas");
const input = getElem("#input");
const audio = getElem("#audio");

// *****CANVAS SETUP*****
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let audioContext = null;
let analyser = null;

// *****FILE UPLOAD*****
input.addEventListener("change", (e) => {
  e.stopPropagation();
  const file = URL.createObjectURL(e.target.files[0]);
  audio.src = file;
  audio.load();
  audio.loop = true;
  audio.play();
  canvas.scrollIntoView({ behavior: "smooth" });
  audioContext = getAudioCtx(audioContext);
  analyser = getAnalyser(audioContext, audio);

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const barWidth = 15;
  let barHeight;
  let x = 0;

  function animate() {
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);
    draw(ctx, bufferLength, x, barWidth, barHeight, dataArray);
    requestAnimationFrame(animate);
  }
  animate();
});

const play = (file) => {
  audio.src = `./assets/${file}.mp3`;
  audio.load();
  audio.loop = true;
  audio.play();
  canvas.scrollIntoView({ behavior: "smooth" });
  audioContext = getAudioCtx(audioContext);
  analyser = getAnalyser(audioContext, audio);

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const barWidth = 15;
  let barHeight;
  let x = 0;

  function animate() {
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);
    draw(ctx, bufferLength, x, barWidth, barHeight, dataArray);
    requestAnimationFrame(animate);
  }
  animate();
};

// *****SPECIAL EDITION*****
const hous = getElem("#hous");
const fato = getElem("#fato");
const nub = getElem("#nub");
hous.addEventListener("click", () => play("hous"));
fato.addEventListener("click", () => play("fato"));
nub.addEventListener("click", () => play("nub"));
