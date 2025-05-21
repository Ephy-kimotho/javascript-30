/* -------------------- DOM SELECTION -------------------- */
const lights = {
  red: document.getElementById("red"),
  orange: document.getElementById("orange"),
  green: document.getElementById("green"),
};

const changeBtn = document.getElementById("change-clr-btn");

/* -------------------- GLOBAL VARIABLES -------------------- */
const colors = ["red", "orange", "green"];
let currentIndex = 0;
let controller = null;
let cycling = true;

/* -------------------- EVENT LISTENERS -------------------- */
changeBtn.addEventListener("click", changeColor);

/* -------------------- UTILITY FUNCTIONS -------------------- */
function sleep(delay, signal) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(resolve, delay);
    signal?.addEventListener("abort", () => {
      clearTimeout(timeoutId);
      reject(new Error("Aborted!"));
    });
  });
}

function turnOn(color) {
  for (const light in lights) {
    lights[light].classList.remove(`${light}-on`);
  }
  lights[color].classList.add(`${color}-on`);
}

/* -------------------- UI FUNCTIONS -------------------- */
async function cycle() {
  cycling = true;

  while (cycling) {
    const color = colors[currentIndex];
    turnOn(color);

    controller = new AbortController();
    try {
      const delay = color === "red" ? 30000 : color === "orange" ? 10000 : 60000;
      await sleep(delay, controller.signal);
    } catch (err) {
      if (err.message === "Aborted!") {
        break; // Exit loop on abort
      }
    }

    currentIndex = (currentIndex + 1) % colors.length;
  }
}

function changeColor() {
  // Stop ongoing cycle
  if (controller) {
    controller.abort();
  }

  cycling = false;

  const currentColor = colors[currentIndex];

  // Determine next index based on logic
  if (currentColor === "red") {
    currentIndex = colors.indexOf("orange");
  } else if (currentColor === "orange") {
    currentIndex = colors.indexOf("green");
  } else if (currentColor === "green") {
    currentIndex = colors.indexOf("red");
  }

  turnOn(colors[currentIndex]);

  // Restart cycle after a short delay
  setTimeout(() => {
    currentIndex = (currentIndex + 1) % colors.length;
    cycle();
  }, 1000);
}

/* -------------------- START -------------------- */
cycle();
