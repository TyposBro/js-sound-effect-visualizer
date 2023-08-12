export const getElem = (selector) => document.querySelector(selector);

export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const getAudioCtx = (ctx) => {
  if (ctx) return ctx;

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  return new AudioContext();
};

export const getAnalyser = (ctx, audioElement) => {
  const audioSource = ctx.createMediaElementSource(audioElement);
  const analyser = ctx.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(ctx.destination);
  analyser.fftSize = 512;
  return analyser;
};
