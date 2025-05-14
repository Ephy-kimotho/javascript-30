const keys = document.querySelectorAll("div.key");

function playSound(event) {
  const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
  const key = document.querySelector(`div.key[data-key="${event.keyCode}"]`);

  if (audio === null) {
    return;
  }
  audio.currentTime = 0;
  audio.play();
  key.classList.add("playing");
}

function playSound2(event) {
  const keyDiv = event.target.parentNode;
  if (keyDiv) {
    const keyId = keyDiv.dataset.key;
    const audio = document.querySelector(`audio[data-key='${keyId}']`);
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      keyDiv.classList.add("playing");
    }
  }
}

function removeTransition() {
  keys.forEach((key) => {
    key.addEventListener("transitionend", (e) => {
      if (e.propertyName === "transform") {
        key.classList.remove("playing");
      }
      return;
    });
  });
}

window.addEventListener("keydown", playSound);
window.addEventListener("click", playSound2);
removeTransition();
