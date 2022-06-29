// SETTING UP PLAYER OBJECTS, PLAYER X/PLAYER O ARE THE DEFAULT NAMES

const player = (name) => {
    return { name };
};

var theX = player("Player X");
var theO = player("Player O");

// STORES PLAYERS' NAMES WHEN ENTERED, DISABLES SUBMIT BUTTON

const xsubmitbtn = document.querySelector(".xsubmitbtn");
const osubmitbtn = document.querySelector(".osubmitbtn");

function storeXName() {
    var inputspacex = document.querySelector("#xplayername");
    xsubmitbtn.disabled = true;
    if (inputspacex.value == "") {
        theX = player("Player X");
        //console.log(theX.name);
    } else {
        theX = player(inputspacex.value);
        //console.log(theX.name);
    }
}

function storeOName() {
    var inputspaceo = document.querySelector("#oplayername");
    osubmitbtn.disabled = true;
    if (inputspaceo.value == "") {
        theO = player("Player O");
        //console.log(theO.name);
    } else {
        theO = player(inputspaceo.value);
        //console.log(theO.name);
    }
}

xsubmitbtn.addEventListener("click", storeXName);
osubmitbtn.addEventListener("click", storeOName);

// CREATES THE GAMEBOARD ON BUTTON CLICK

var creategamebtn = document.querySelector("#creategamebtn")
var gamecontainer = document.querySelector("#gamecontainer")

var gameboardArray = ["topleft", "topmiddle", "topright", "centerleft", "centermiddle", "centerright", "bottomleft", "bottommiddle", "bottomright"]

function createGameboard() {
    var gameboard = document.createElement("div");
    gamecontainer.appendChild(gameboard);
    creategamebtn.remove();
    gameboard.setAttribute("id", "gameboard");
        function createAllSquares() {
            for (var i = 0; i < gameboardArray.length; i++) {
                function createASquare() {
                    var gamesquare = document.createElement("div");
                    gameboard.appendChild(gamesquare);
                    gamesquare.classList.add("gamesquare");
                    gamesquare.setAttribute("id", gameboardArray[i]);
                }
                createASquare();
            }
        }
        createAllSquares();
        displayFirstPlayer();
        playGame();
}

creategamebtn.addEventListener("click", createGameboard);

// RANDOMIZES FIRST PLAYER & DISPLAYS FIRST PLAYER'S NAME

const currentplayer = document.querySelector("#currentplayer");
var firstPlayer;

function displayFirstPlayer() {
var randomfpm = ["X", "O"];
    function RandomizeFirstPlayer(randomfp) {
        return randomfp[Math.floor(Math.random()*randomfp.length)];
    }
        firstPlayer = RandomizeFirstPlayer(randomfpm);
        if (firstPlayer == "O") {
            currentplayer.textContent = `${theO.name} Goes First`;
        } else if (firstPlayer == "X") {
            currentplayer.textContent = `${theX.name} Goes First`;
        }
}

// DISPLAYS SECOND PLAYER

var secondPlayer;
var secondRound;

function displaySecondPlayer() {
    if (firstPlayer == "O") {
        secondPlayer = "X";
        currentplayer.textContent = `${theX.name}'s Turn`;
    } else if (firstPlayer == "X") {
        secondPlayer = "O";
        currentplayer.textContent = `${theO.name}'s Turn`;
    }
}

// DISPLAYS FIRST PLAYER AGAIN

function displayFirstPlayerAgain() {
    if (firstPlayer == "O") {
        currentplayer.textContent = `${theO.name}'s Turn`;
    } else if (firstPlayer == "X") {
        currentplayer.textContent = `${theX.name}'s Turn`;
    }
}

// FIRST PLAYER CHOOSES SPOT

function playGame() {
    let secondPlayerPlay = "stop";
    const playerPicks = document.querySelectorAll(".gamesquare");
        for (let i = 0; i < playerPicks.length; i++) {
            playerPicks[i].addEventListener("click", function turn() {
                if (playerPicks[i].textContent == "") {
                    if (secondPlayerPlay == "stop") {
                        playerPicks[i].style.backgroundColor = "violet";
                        playerPicks[i].textContent = firstPlayer;
                        secondPlayerPlay = "go";
                        displaySecondPlayer();
                    } else if (secondPlayerPlay == "go") {
                        playerPicks[i].style.backgroundColor = "navy";
                        playerPicks[i].textContent = secondPlayer;
                        secondPlayerPlay = "stop";
                        displayFirstPlayerAgain();
                    }
                }
                reviewMoves();
            });
        }
};
    
playGame();

// DETERMINE WINNERS

function reviewMoves() {
    var gb = document.getElementById("gameboard");
    var gbk = gb.children;
    function reviewXMoves() {
        if (gbk[0].textContent === "X" && gbk[1].textContent === "X" && gbk[2].textContent === "X") {
            console.log("X - top row");
            createXWinnerContainer();
        } else if (gbk[3].textContent === "X" && gbk[4].textContent === "X" && gbk[5].textContent === "X") {
            console.log("X - middle row");
            createXWinnerContainer();
        } else if (gbk[6].textContent === "X" && gbk[7].textContent === "X" && gbk[8].textContent === "X") {
            console.log("X - bottom row");
            createXWinnerContainer();
        } else if (gbk[0].textContent === "X" && gbk[3].textContent === "X" && gbk[6].textContent === "X") {
            console.log("X - first column");
            createXWinnerContainer();
        } else if (gbk[1].textContent === "X" && gbk[4].textContent === "X" && gbk[7].textContent === "X") {
            console.log("X - second column");
            createXWinnerContainer();
        } else if (gbk[2].textContent === "X" && gbk[5].textContent === "X" && gbk[8].textContent === "X") {
            console.log("X - third column");
            createXWinnerContainer();
        } else if (gbk[0].textContent === "X" && gbk[4].textContent === "X" && gbk[8].textContent === "X") {
            console.log("X - diagonal top left to bottom right");
            createXWinnerContainer();
        } else if (gbk[6].textContent === "X" && gbk[4].textContent === "X" && gbk[2].textContent === "X") {
            console.log("X - diagonal bottom left to top right");
            createXWinnerContainer();
        }
    }
    reviewXMoves();
    function reviewOMoves() {
        if (gbk[0].textContent === "O" && gbk[1].textContent === "O" && gbk[2].textContent === "O") {
            console.log("O - top row");
            createOWinnerContainer();
        } else if (gbk[3].textContent === "O" && gbk[4].textContent === "O" && gbk[5].textContent === "O") {
            console.log("O - middle row");
            createOWinnerContainer();
        } else if (gbk[6].textContent === "O" && gbk[7].textContent === "O" && gbk[8].textContent === "O") {
            console.log("O - bottom row");
            createOWinnerContainer();
        } else if (gbk[0].textContent === "O" && gbk[3].textContent === "O" && gbk[6].textContent === "O") {
            console.log("O - first column");
            createOWinnerContainer();
        } else if (gbk[1].textContent === "O" && gbk[4].textContent === "O" && gbk[7].textContent === "O") {
            console.log("O - second column");
            createOWinnerContainer();
        } else if (gbk[2].textContent === "O" && gbk[5].textContent === "O" && gbk[8].textContent === "O") {
            console.log("O - third column");
            createOWinnerContainer();
        } else if (gbk[0].textContent === "O" && gbk[4].textContent === "O" && gbk[8].textContent === "O") {
            console.log("O - diagonal top left to bottom right");
            createOWinnerContainer();
        } else if (gbk[6].textContent === "O" && gbk[4].textContent === "O" && gbk[2].textContent === "O") {
            console.log("O - diagonal bottom left to top right");
            createOWinnerContainer();
        }
    }
    reviewOMoves();
}

// DECLARES A WINNER

function createXWinnerContainer() {
    removeFirstContainer();
    var winnerdiv = document.createElement("div");
    gamecontainer.appendChild(winnerdiv);
    winnerdiv.textContent = `X Wins! Congratulations, ${theX.name}!`;
    currentplayer.textContent = "Click 'New Game' to play again";
};

function createOWinnerContainer() {
    removeFirstContainer();
    var winnerdiv = document.createElement("div");
    gamecontainer.appendChild(winnerdiv);
    winnerdiv.textContent = `O Wins! Congratulations, ${theO.name}!`;
    currentplayer.textContent = "Click 'New Game' to play again";
};

// RESETS THE GAME

const newbtn = document.querySelector("#newbtn");

function clearPlayerInfo() {
    currentplayer.textContent = "Enter player names to start the game";
    function clearX() {
        xsubmitbtn.disabled = false;
        document.querySelector("#xplayername").value = ""
        theX = player("Player X");
    }
    clearX();
    function clearO() {
        osubmitbtn.disabled = false;
        document.querySelector("#oplayername").value = ""
        theO = player("Player O");
    }    
    clearO();
}

function newGame() {
    clearPlayerInfo();
    removeFirstContainer();
    createGameboard()
}

function removeFirstContainer() {
    gamecontainer.removeChild(gamecontainer.firstElementChild);
}

newbtn.addEventListener("click", newGame);