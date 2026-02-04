console.log(document.querySelectorAll("button"))
console.log(document.getElementsByClassName('box'))
const audioTurn = new Audio("ting.mp3")
const backMusic = new Audio("music.mp3")
const endMusic = new Audio("gameover.mp3")
const boxes = document.getElementsByClassName('box')
let gameOver = false
let turn = 'X'

const changeTurn = (e) => {
    return e === 'X' ? 'O' : 'X';
}

const updateInfo = () => {
    document.querySelector('.info').innerText = `Turn for ${turn}`
}

const checkwin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    const wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ]
    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "")) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won"
            gameOver = true
            endMusic.play()
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
            document.querySelector(".line").style.width = "20vw";
        }
    })
}

// backMusic.muted = true
backMusic.loop = true
backMusic.play()
for (let index = 0; index < boxes.length; index++) {
    let element = boxes[index];
    element.addEventListener("click", () => {
        if(!gameOver && element.querySelector('.boxtext').innerText === ""){
            element.querySelector('.boxtext').innerText = turn
            audioTurn.play()
            turn = changeTurn(turn)
            updateInfo()
            checkwin()
        }
    })
}

const reset = document.getElementById('reset')
reset.addEventListener("click", () => {
    Array.from(boxes).forEach(element => {
        element.querySelector('.boxtext').innerText = " "
    })
    document.querySelector(".line").style.width = "0";
    document.querySelector(".line").style.transform = "translate(0, 0) rotate(0deg)";
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0";
    gameOver = false
    turn = 'X'
    updateInfo()
})