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
const colorCursor = document.getElementById("colorCursor");

let currentHue = 0;
let currentAlpha = 1;
let currentSaturation = 100;
let currentValue = 50;


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

function updateColorBox() {
  colorBox.style.background = `linear-gradient(to top, black, transparent), linear-gradient(to right, white, hsl(${currentHue}, 100%, 50%))`;
}

function displayColor(){
    leftChildOne.style.backgroundColor = heroText.textContent;
    updateColorBox();
    syncHueAndOpacityFromRGBA();
}

function updateOpacityBackground() {
  const hue = hueSlider.value;

  const hueColor = `hsl(${hue}, 100%, 50%)`;

  hueSlider.style.setProperty("--thumb-color", hueColor);

  opacitySlider.style.background =
    `linear-gradient(to right, transparent, ${hueColor})`;
}

function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, v = max;

  if (max === min) {
    h = 0;
  } else {
    const d = max - min;
    s = max === 0 ? 0 : d / max;

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
    if (h < 0) h += 360;
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    v: Math.round(v * 100)
  };
}
function hsvToRgb(h, s = 100, v = 100) {
  h = h % 360;
  s /= 100;
  v /= 100;

  const c = v * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = v - c;

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

function moveCursorFromSV() {
  colorCursor.style.left = `${currentSaturation}%`;
  colorCursor.style.top = `${100 - currentValue}%`;
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

  const hsv = rgbToHsv(r, g, b);

  currentHue = hsv.h;
  currentSaturation = hsv.s;
  currentValue = hsv.v;
  currentAlpha = a;

  // Prevent jumping from 360 to 0 since they represent the same color
  if (hsv.h === 0 && Number(hueSlider.value) === 360) {
    currentHue = 360;
  }

  hueSlider.value = currentHue;
  opacitySlider.value = currentAlpha;

  const hueColor = `hsl(${currentHue}, 100%, 50%)`;

  // update visuals
  hueSlider.style.setProperty("--thumb-color", hueColor);
  opacitySlider.style.background =
    `linear-gradient(to right, transparent, ${hueColor})`;

  updateColorBox();
  moveCursorFromSV();
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
  currentHue = hue;
  const { r, g, b } = hsvToRgb(hue, currentSaturation, currentValue);

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

colorBox.addEventListener("mousedown", (e) => {
  const rect = colorBox.getBoundingClientRect();

  function pickColor(ev) {
    let x = ev.clientX - rect.left;
    let y = ev.clientY - rect.top;

    x = Math.max(0, Math.min(x, rect.width));
    y = Math.max(0, Math.min(y, rect.height));

    currentSaturation = Math.round((x / rect.width) * 100);
    currentValue = Math.round(100 - (y / rect.height) * 100);

    const rgb = hsvToRgb(currentHue, currentSaturation, currentValue);
    applyRGBA(rgb.r, rgb.g, rgb.b, currentAlpha);
  }

  pickColor(e);
  window.addEventListener("mousemove", pickColor);
  window.addEventListener("mouseup", () => {
    window.removeEventListener("mousemove", pickColor);
  }, { once: true });
});

updateRGBA();
displayColor();
updateOpacityBackground();


