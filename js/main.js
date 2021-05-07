
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
let numberMoves = 0, countCrossWin = 0 , countCircleWin = 0;

function createCell(){ // Создание игрового поля
    let gameField = document.querySelector(".game-field");
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

function stopGame(winPlayer, list){ // Остановление игры после победы
    for(let i = 0; i < list.length; ++i){
        arrField[list[i].R][list[i].C].style.background = "lime";
    }
    if(winPlayer == "X"){
        ++countCrossWin;
    }else if (winPlayer == "O"){
        ++countCircleWin;
    }
    endGame = true; 
    document.querySelector(".win-player").textContent = "Выиграл: " + winPlayer;
    document.querySelector(".game-account").textContent = "Крестик: " + countCrossWin + " - " + countCircleWin + " :Нолик";
    current = "X";
    numberMoves = 0;
}

function checkEndGAme(row, col, symbol){ // Проверка победителя 
    ++numberMoves;
    const winPlayer = symbol == cross ? "X" : "O";
    let min = Math.min(row , col), listKoordinate = [];
    for(let i = 0, win = 0; i < Number(field.Size); ++i){ // проверка горизонтали
        if(arrField[row][i].innerHTML == symbol){
            ++win;
            listKoordinate.push({R: row, C: i});
            if(win == 3){
                stopGame(winPlayer, listKoordinate);
                return;
            }
        }else{
            win = 0;
            listKoordinate.splice(0, listKoordinate.length); 
        }
    }

    listKoordinate.splice(0, listKoordinate.length);
    
    for(let i = 0, win = 0; i < Number(field.Size); ++i){ // проверка вертикали
        if(arrField[i][col].innerHTML == symbol){
            ++win;
            listKoordinate.push({R: i, C: col});
            if(win == 3){
                stopGame(winPlayer, listKoordinate);
                return;
            }
        }else{
            win = 0;
            listKoordinate.splice(0, listKoordinate.length);
        }
    }

    listKoordinate.splice(0, listKoordinate.length);
    for(let r = row - min, c = col - min, win = 0; r < Number(field.Size)  && c < Number(field.Size); ++r, ++c ){ // Проверка диагонали на 45 градусов
        if(arrField[r][c].innerHTML == symbol){
            ++win;
            listKoordinate.push({R: r, C: c});
            if(win == 3){
                stopGame(winPlayer, listKoordinate);
                return;
            }
        }else{
            win = 0;
            listKoordinate.splice(0 , listKoordinate.length);
        }
    }

    listKoordinate.splice(0, listKoordinate.length);
    min = Math.min(row, Number(field.Size) - 1 - col);
    for(let r = row - min, c = col + min , win = 0; r < Number(field.Size)  && c >= 0 &&  c < Number(field.Size) ; ++r, --c ){ // Проверка диагонали на 135 градусов
        if(arrField[r][c].innerHTML == symbol){
            ++win;
            listKoordinate.push({R: r, C: c});
            if(win == 3){
                stopGame(winPlayer, listKoordinate);
                return;
            }
        }else{
            win = 0;
            listKoordinate.splice(0 , listKoordinate.length);
        }
    }

    if(numberMoves == (Number(arrField.length) * Number(arrField.length))){ // Проверка на ничью
        endGame = true; 
        document.querySelector(".win-player").textContent = "Ничья";
        current = "X";
        numberMoves = 0;
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

function playerMove(){
    for(let i = 0; i < Number(field.Size); ++i){
        for(let j = 0; j < Number(field.Size); ++j){
            arrField[i][j].addEventListener("click", e => {
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

function determinationCourse(){ 
    if(current == field.FirstGamer){
        playerMove();   
    }else{
        moveBot();
    }
}


createCell();
setInterval(determinationCourse, 50);


document.querySelector(".restart-game").addEventListener("click", () => { // Перезапуск игрового процесса
    document.querySelector(".win-player").textContent = "";
    endGame = false;
    numberMoves = 0;
    current = "X";
    for(let i = 0; i < Number(field.Size); ++i){
        for(let j = 0; j < Number(field.Size); ++j){
            arrField[i][j].innerHTML = "";
            arrField[i][j].style.background = "white";
        }
    }
});