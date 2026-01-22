const rSlider = document.getElementById("rSlider");
const rValue = document.getElementById("rValue");

const gSlider = document.getElementById("gSlider");
const gValue = document.getElementById("gValue");

const bSlider = document.getElementById("bSlider");
const bValue = document.getElementById("bValue");

const aSlider = document.getElementById("aSlider");
const aValue = document.getElementById("aValue");

const heroText = document.querySelector(".hero-style");
const copyBtn = document.querySelector(".copy-btn");

const leftChildOne = document.querySelector(".left-child-1");

const colorBox = document.getElementById("colorBox");
const hueSlider = document.getElementById("hueSlider");
const opacitySlider = document.getElementById("opacitySlider");


copyBtn.addEventListener("click", () => {
    const textToCopy = heroText.textContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert(`Copied to clipboard: ${textToCopy}`);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});

// slider -> number
rSlider.addEventListener("input",()=>{
    rValue.value = rSlider.value;
    updateRGBA();
    displayColor();
});

gSlider.addEventListener("input",()=>{
    gValue.value = gSlider.value;
    updateRGBA();
    displayColor();
});
bSlider.addEventListener("input",()=>{
    bValue.value = bSlider.value;
    updateRGBA();
    displayColor();
});
aSlider.addEventListener("input",()=>{
    aValue.value = aSlider.value;
    updateRGBA();
    displayColor();
});

// number -> slider
rValue.addEventListener("input",()=>{
    rSlider.value = rValue.value;
    updateRGBA();
    displayColor();
});
gValue.addEventListener("input",()=>{
    gSlider.value = gValue.value;
    updateRGBA();
    displayColor();
});
bValue.addEventListener("input",()=>{
    bSlider.value = bValue.value;
    updateRGBA();
    displayColor();
});
aValue.addEventListener("input",()=>{
    aSlider.value = aValue.value;
    updateRGBA();
    displayColor();
});

function updateRGBA() {
  const r = rSlider.value;
  const g = gSlider.value;
  const b = bSlider.value;
  const a = aSlider.value;

  heroText.textContent = `rgba(${r}, ${g}, ${b}, ${a})`;
}

function displayColor(){
    leftChildOne.style.backgroundColor = heroText.textContent;
    syncHueAndOpacityFromRGBA();
}

function updateOpacityBackground() {
  const hue = hueSlider.value;

  const hueColor = `hsl(${hue}, 100%, 50%)`;

  hueSlider.style.setProperty("--thumb-color", hueColor);

  opacitySlider.style.background =
    `linear-gradient(to right, transparent, ${hueColor})`;
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h *= 60;
  }

  return Math.round(h);
}
function hslToRgb(h, s = 100, l = 50) {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;

  if (h < 60)      [r, g, b] = [c, x, 0];
  else if (h < 120)[r, g, b] = [x, c, 0];
  else if (h < 180)[r, g, b] = [0, c, x];
  else if (h < 240)[r, g, b] = [0, x, c];
  else if (h < 300)[r, g, b] = [x, 0, c];
  else             [r, g, b] = [c, 0, x];

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  };
}

function applyRGBA(r, g, b, a) {
  // update sliders
  rSlider.value = r;
  gSlider.value = g;
  bSlider.value = b;
  aSlider.value = a;

  rValue.value = r;
  gValue.value = g;
  bValue.value = b;
  aValue.value = a;

  heroText.textContent = `rgba(${r}, ${g}, ${b}, ${a})`;
  leftChildOne.style.backgroundColor = heroText.textContent;

  syncHueAndOpacityFromRGBA();
}
[rSlider, gSlider, bSlider, aSlider].forEach(slider => {
  slider.addEventListener("input", () => {
    applyRGBA(
      rSlider.value,
      gSlider.value,
      bSlider.value,
      aSlider.value
    );
  });
});

[rValue, gValue, bValue, aValue].forEach(input => {
  input.addEventListener("input", () => {
    applyRGBA(
      rValue.value,
      gValue.value,
      bValue.value,
      aValue.value
    );
  });
});


function syncHueAndOpacityFromRGBA() {
  const r = Number(rSlider.value);
  const g = Number(gSlider.value);
  const b = Number(bSlider.value);
  const a = Number(aSlider.value);

  // convert RGB → Hue
  const hue = rgbToHsl(r, g, b);

  // set slider values
  hueSlider.value = hue;
  opacitySlider.value = a;

  const hueColor = `hsl(${hue}, 100%, 50%)`;

  // update visuals
  hueSlider.style.setProperty("--thumb-color", hueColor);
  opacitySlider.style.background =
    `linear-gradient(to right, transparent, ${hueColor})`;
}



hueSlider.addEventListener("input", () => {
  const hue = hueSlider.value;

  hueSlider.style.setProperty(
    "--thumb-color",
    `hsl(${hue}, 100%, 50%)`
  );
  updateOpacityBackground();
});
hueSlider.addEventListener("input", () => {
  const hue = Number(hueSlider.value);
  const { r, g, b } = hslToRgb(hue);

  applyRGBA(r, g, b, aSlider.value);
});
opacitySlider.addEventListener("input", () => {
  const alpha = opacitySlider.value;
});
opacitySlider.addEventListener("input", () => {
  applyRGBA(
    rSlider.value,
    gSlider.value,
    bSlider.value,
    opacitySlider.value
  );
});

updateRGBA();
displayColor();
updateOpacityBackground();


