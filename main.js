const rSlider = document.getElementById("rSlider");
const rValue = document.getElementById("rValue");

const gSlider = document.getElementById("gSlider");
const gValue = document.getElementById("gValue");

const bSlider = document.getElementById("bSlider");
const bValue = document.getElementById("bValue");

const aSlider = document.getElementById("aSlider");
const aValue = document.getElementById("aValue");

// slider -> number
rSlider.addEventListener("input",()=>{
    rValue.value = rSlider.value;
});
gSlider.addEventListener("input",()=>{
    gValue.value = gSlider.value;
});
bSlider.addEventListener("input",()=>{
    bValue.value = bSlider.value;
});
aSlider.addEventListener("input",()=>{
    aValue.value = aSlider.value;
});

// number -> slider
rValue.addEventListener("input",()=>{
    rSlider.value = rValue.value;
});
gValue.addEventListener("input",()=>{
    gSlider.value = gValue.value;
});
bValue.addEventListener("input",()=>{
    bSlider.value = bValue.value;
});
aValue.addEventListener("input",()=>{
    aSlider.value = aValue.value;
});