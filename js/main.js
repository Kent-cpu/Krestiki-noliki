
const field = JSON.parse(localStorage.getItem("field"));
let circle =  `<svg class = "circle">
<circle r = "20" cx = "30" cy = "30" stroke = "blue" stroke-width = "8" fill = "none" stroke-linecap = "round"/>
</svg>`
//document.querySelector(".restartGame").addEventListener("click", () => {
//   
//});


function createField(){
    const widthField = Number(field.Size) * 60 + 30;
    document.querySelector(".gameField").style.width = widthField.toString() + "px";
}

function createCell(){
    const gameField = document.querySelector(".gameField");
    for(let numberCells = 0; numberCells < field.Size * field.Size; ++numberCells){
        gameField.prepend(document.createElement("p"));
    }
}


createField();
createCell();


document.querySelectorAll(".gameField p").forEach( (el) => {
    el.addEventListener("click", e => {
        //e.target.innerHTML += `<svg class = "circle">
        //            <circle r = "20" cx = "30" cy = "30" stroke = "blue" stroke-width = "8" fill = "none" stroke-linecap = "round"/>
        //        </svg>`;
        e.target.innerHTML += circle;
    })
})