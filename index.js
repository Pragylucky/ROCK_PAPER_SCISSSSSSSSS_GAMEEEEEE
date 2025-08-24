let gameStart = false;
let playerChoice = "rock";
let computerChoice = "rock";

const rps = {
    rock: {
        left: { img: './resources/rock_left.png' },   
        right: { img: './resources/rock_right.png' }, 
        win: 'scissor',
        loss: 'paper'
    },
    paper: {
        left: {
            img: './resources/paper_left.png'
        },
        right: {
            img: './resources/paper_right.png'
        },
        win: 'rock',
        loss: 'scissor'
    },
    scissor: {
        left: {
            img: './resources/scissor_left.png'
        },
        right: {
            img: './resources/scissor_right.png'
        },
        win: 'paper',
        loss: 'rock'
    }
};

const controlButton = document.getElementById('controller');
const rightImage = document.getElementById('rightimage');
const leftImage = document.getElementById('leftimage');
const yourChoiceSpan = document.getElementById('yourChoice');
const computerChoiceSpan = document.getElementById('computerChoice');
const resultDisplay = document.getElementById('result');
const rRock = document.getElementById('rRock');
const rPaper = document.getElementById('rPaper');
const rScissor = document.getElementById('rScissor');

// disable computer side buttons (they aren’t needed)
document.getElementById('lRock').disabled = true;
document.getElementById('lPaper').disabled = true;
document.getElementById('lScissor').disabled = true;

// Initialize game state
disablePlayerChoices();

controlButton.addEventListener('click', function (e) {
    gameStart = !gameStart;
    if (gameStart) {
        e.target.innerHTML = 'Stop';
        enablePlayerChoices();
        resultDisplay.textContent = "Make your choice!";
    } else {
        e.target.innerHTML = 'Start';
        disablePlayerChoices();
        resultDisplay.textContent = "Game stopped";
    }
});

controlButton.addEventListener('mouseover', function (e) {
    e.target.style.backgroundColor = gameStart
        ? 'rgb(220, 62, 62)'
        : 'rgb(113, 173, 135)';
});

controlButton.addEventListener('mouseout', function (e) {
    e.target.style.backgroundColor = gameStart
        ? 'rgb(222, 98, 98)'
        : 'rgb(115, 217, 152)';
});

// Player choice event listeners
rRock.addEventListener('click', () => gameStart && makeChoice('rock'));
rPaper.addEventListener('click', () => gameStart && makeChoice('paper'));
rScissor.addEventListener('click', () => gameStart && makeChoice('scissor'));

function makeChoice(choice) {
    playerChoice = choice;
    yourChoiceSpan.textContent = capitalize(choice);
    rightImage.src = rps[choice].right.img;

    // Computer random choice
    const options = ["rock", "paper", "scissor"];
    computerChoice = options[Math.floor(Math.random() * 3)];
    computerChoiceSpan.textContent = capitalize(computerChoice);
    leftImage.src = rps[computerChoice].left.img;

    // Determine winner
    determineWinner();
}

function determineWinner() {
    if (playerChoice === computerChoice) {
        resultDisplay.textContent = "It's a Draw";
    } else if (rps[playerChoice].win === computerChoice) {
        resultDisplay.textContent = "You Win!";
    } else {
        resultDisplay.textContent = "Computer Wins!";
    }
}

function enablePlayerChoices() {
    [rRock, rPaper, rScissor].forEach(btn => {
        btn.disabled = false;
        btn.style.cursor = "pointer";
    });
}

function disablePlayerChoices() {
    [rRock, rPaper, rScissor].forEach(btn => {
        btn.disabled = true;
        btn.style.cursor = "not-allowed";
    });
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
