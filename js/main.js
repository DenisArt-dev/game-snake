'use strict';

alert('Добро пожаловать в игру "Змейка". Чтобы начать, нажмите "\u2190", "\u2191", "\u2192" или "\u2193"');

const canvas = document.getElementById('game'); // обращение к элементу html
const ctx = canvas.getContext('2d');

let btn2 = document.getElementById('btn2');
let btn3 = document.getElementById('btn3');
let btn1 = document.getElementById('btn1');
let btn4 = document.getElementById('btn4');


const ground = new Image(); // подключение картинки
ground.src = 'images/map.jpg';

const foodImg = new Image();
foodImg.src = 'images/food.png';

let box = 29;
let score = 0;
let food = {
    x: Math.floor( (Math.random() * 16 + 1) ) * box,
    y: Math.floor( (Math.random() * 16 + 2) ) * box,
};

let snake = [];

snake[0] = {
    x: 8 * box,
    y: 9 * box,
};

document.addEventListener('keydown', direction);

let dir;

function direction(event) {
    if(event.keyCode == 37 && dir != 'right')
        dir = 'left';
    else if (event.keyCode == 38 && dir != 'down')
        dir = 'up';
    else if (event.keyCode == 39 && dir != 'left')
        dir = 'right';
    else if (event.keyCode == 40 && dir != 'up')
        dir = 'down';
}


btn2.onclick = function () {
    if (dir != 'right') dir = 'left';
};

btn3.onclick = function () {
    if (dir != 'left') dir = 'right';
};

btn1.onclick = function () {
    if (dir != 'down') dir = 'up';
};

btn4.onclick = function () {
    if (dir != 'up') dir = 'down';
};


function eatTail(head, arr) {
    for(let i = 0; i < arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y) {
            clearInterval(game);
            alert('GAME OWER \nЧтобы сыграть еще, обновите страницу');
        }
    }
}

function drawGame() {
    ctx.drawImage(ground, 0, 0); // функция, которая рисует img

    ctx.drawImage(foodImg, food.x, food.y);
    ctx.drawImage(foodImg, box + 5, box * 0.5 + 1);


    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? '#b94607' : '#d0640d';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = '#ffd306';
    ctx.font = '40px Areal';
    ctx.fillText(score, box * 3.3, box * 1.5);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor( (Math.random() * 16 + 1) ) * box,
            y: Math.floor( (Math.random() * 16 + 2) ) * box,
        };
    } else {
        snake.pop();
    }

    if(snakeX < box || snakeX > box * 16
        || snakeY < box * 2 || snakeY > box * 17) {
            clearInterval(game);
            alert('GAME OWER \nЧтобы сыграть еще, обновите страницу');
        }

    if(dir == 'left') snakeX -= box;
    if(dir == 'right') snakeX += box;
    if(dir == 'up') snakeY -= box;
    if(dir == 'down') snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY,
    };

    eatTail(newHead, snake);

    snake.unshift(newHead);
}

let game = setInterval(drawGame, 100); // вызывает функцию каждые 100 милисекунд



