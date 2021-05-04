
const field = JSON.parse(localStorage.getItem("field"));
const circle = `<svg class="circle">
                    <circle r="20" cx="30" cy="30" stroke="blue" stroke-width="7" fill="none" stroke-linecap="round"></circle>
                </svg>`;
const cross = `<svg class="cross">
<line class="first" x1="10" y1="10" x2="50" y2="50" stroke="red" stroke-width="7" stroke-linecap="round"></line>
<line class="second" x1="50" y1="10" x2="10" y2="50" stroke="red" stroke-width="7" stroke-linecap="round"></line>
</svg>`;
let endGame = false;
let current = "X";
let arrField = [];
let numberMoves = 0;

function createCell(){
    let gameField = document.querySelector(".gameField");
    for(let line = 0; line < Number(field.Size); ++line){
        let tr = gameField.insertRow();
        let buf = [];
        for(let numberCells = 0; numberCells < Number(field.Size); ++numberCells){
            let td = tr.insertCell();
            buf.push(td);
        }
        arrField.push(buf);
    }
}

function checkEndGAme(row, col, symbol){
    ++numberMoves;
    for(let i = 0, horizontal = 0, vertical = 0; i < Number(field.Size); ++i){
        horizontal = arrField[row][i].innerHTML == symbol ?  ++horizontal : 0;
        vertical = arrField[i][col].innerHTML == symbol ? ++vertical : 0;
        if (horizontal == 3 || vertical == 3){
            endGame = true; 
            let winPlayer = symbol == cross ? "X" : "O";
            document.querySelector(".winPlayer").textContent = "Выиграл: " + winPlayer;
            current = "X";
            return;
        }
    }


    if(numberMoves == (Number(arrField.length) * Number(arrField.length))){
        document.querySelector(".winPlayer").textContent = "Ничья";
        endGame = true;
    }
}


function determinationCourse(){
    if(current == field.FirstGamer){
        playerMove();   
    }else{
        moveBot();
    }
}

function moveBot(){
    let gameSymbol = field.FirstGamer == "X" ? circle : cross;
    while(!endGame){
        let row = Math.floor(Math.random() * Number(field.Size));
        let column =  Math.floor(Math.random() * Number(field.Size));
        if(arrField[row][column].innerHTML == ""){
            arrField[row][column].innerHTML += gameSymbol;
            current = field.FirstGamer == "X"  ? "X" : "O";
            checkEndGAme(row, column , gameSymbol);
            return;
        }   
    }
}


createCell();
setInterval(determinationCourse, 50);


function playerMove(){
    for(let i = 0; i < Number(field.Size); ++i){
        for(let j = 0; j < Number(field.Size); ++j){
            arrField[i][j].addEventListener("click", e =>{
                if(e.target.innerHTML == "" && e.target.tagName == "TD" && !endGame){
                    let gameSymbol = field.FirstGamer == "X" ? cross : circle;
                    e.target.innerHTML += gameSymbol;
                    current = field.FirstGamer == "O" ? "X" : "O";
                    checkEndGAme(i, j, gameSymbol);
                }
            })
        }
    }
}

document.querySelector(".restartGame").addEventListener("click", e => {
    document.querySelector(".winPlayer").textContent = "";
    endGame = false;
    numberMoves = 0;
    for(let i = 0; i < Number(field.Size); ++i){
        for(let j = 0; j < Number(field.Size); ++j){
            arrField[i][j].innerHTML = "";
        }
    }
});