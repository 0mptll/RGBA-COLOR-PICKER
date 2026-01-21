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
});

gSlider.addEventListener("input",()=>{
    gValue.value = gSlider.value;
    updateRGBA();
});
bSlider.addEventListener("input",()=>{
    bValue.value = bSlider.value;
    updateRGBA();
});
aSlider.addEventListener("input",()=>{
    aValue.value = aSlider.value;
    updateRGBA();
});

// number -> slider
rValue.addEventListener("input",()=>{
    rSlider.value = rValue.value;
    updateRGBA();
});
gValue.addEventListener("input",()=>{
    gSlider.value = gValue.value;
    updateRGBA();
});
bValue.addEventListener("input",()=>{
    bSlider.value = bValue.value;
    updateRGBA();
});
aValue.addEventListener("input",()=>{
    aSlider.value = aValue.value;
    updateRGBA();
});

function updateRGBA() {
  const r = rSlider.value;
  const g = gSlider.value;
  const b = bSlider.value;
  const a = aSlider.value;

  heroText.textContent = `rgba(${r}, ${g}, ${b}, ${a})`;
}

updateRGBA();