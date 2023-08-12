import { getElem } from "./utils.js";
import { vandals_date } from "../assets/base64.js";

// *****ELEMENT SETUP*****
const audio = new Audio(`data:audio/x-wav;base64,${vandals_date}`);
// const audioCtx = new AudioContext();
const container = getElem("#container");

// *****CANVAS SETUP*****
const canvas = getElem("#canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let audioSource;
let analyser;

// test
container.addEventListener("click", () => {
  const audioCtx = new AudioContext();

  audio.play();
  audioSource = audioCtx.createMediaElementSource(audio);
  analyser = audioCtx.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioCtx.destination);
  analyser.fftSize = 2048;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const barWidth = canvas.width / bufferLength;
  let barHeight;
  let x = 0;

  function animate() {
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);
    dataArray.forEach((item) => {
      barHeight = item;
      ctx.fillStyle = `rgba(${barHeight + 100}, 50, 50, 0.5)`;
      ctx.fillRect(x, canvas.height - barHeight, barWidth + 10, barHeight);
      x += barWidth + 10;
    });
    requestAnimationFrame(animate);
  }
  animate();
});
