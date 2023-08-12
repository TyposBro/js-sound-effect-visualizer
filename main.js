const btn = document.querySelector("#btn1");

const audio1 = new Audio("./assets/date.mp3");

btn.addEventListener("click", () => {
  audio1.play();
  audio1.addEventListener("playing", () => {
    // btn.classList.add("playing");
    alert("playing");
  });
  audio1.addEventListener("ended", () => {
    audio1.currentTime = 0;
    audio1.play();
  });
});
