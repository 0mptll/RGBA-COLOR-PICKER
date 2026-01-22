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
}

hueSlider.addEventListener("input", () => {
  const hue = hueSlider.value;

  hueSlider.style.setProperty(
    "--thumb-color",
    `hsl(${hue}, 100%, 50%)`
  );
});

opacitySlider.addEventListener("input", () => {
  const alpha = opacitySlider.value;
  console.log("Opacity:", alpha);
});


updateRGBA();
displayColor();
