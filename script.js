(function() {
    // SETTING UP PLAYER OBJECTS, PLAYER X/PLAYER O ARE THE DEFAULT NAMES
    function player(name) {
        return {
            name,
        }
    };

    var theX = player("Player X");
    var theO = player("Player O");

    // STORES PLAYERS' NAMES WHEN ENTERED, DISABLES SUBMIT BUTTON
    const xsubmitbtn = document.querySelector(".xsubmitbtn");
    const osubmitbtn = document.querySelector(".osubmitbtn");

    let storeXName = function() {
        var inputspacex = document.querySelector("#xplayername");
        xsubmitbtn.disabled = true;
        if (inputspacex.value == "") {
            theX = player("Player X");
        } else {
            theX = player(inputspacex.value);
        }
    };

    let storeOName = function() {
        var inputspaceo = document.querySelector("#oplayername");
        osubmitbtn.disabled = true;
        if (inputspaceo.value == "") {
            theO = player("Player O");
        } else {
            theO = player(inputspaceo.value);
        }
    };

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
                            playerPicks[i].style.color = "red";
                            playerPicks[i].textContent = firstPlayer;
                            secondPlayerPlay = "go";
                            displaySecondPlayer();
                        } else if (secondPlayerPlay == "go") {
                            playerPicks[i].style.color = "blue";
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
    var toprow;
    var middlerow;
    var bottomrow;
    var firstcolumn;
    var secondcolumn;
    var thirdcolumn;
    var diagonaltlbr;
    var diagonalbltr;

    function reviewMoves() {
        var gb = document.getElementById("gameboard");
        var gbk = gb.children;
        function testTopRow() {
            if (gbk[0].textContent !== "" && gbk[1].textContent !== "" && gbk[2].textContent !== "") {
                if (gbk[0].textContent === "X" && gbk[1].textContent === "X" && gbk[2].textContent === "X") {
                    toprow = "xwinstoprow";
                } else if (gbk[0].textContent === "O" && gbk[1].textContent === "O" && gbk[2].textContent === "O") {
                    toprow = "owinstoprow";
                } else {
                    toprow = "drawtoprow";
                }
            }
        }
        function testMiddleRow() {
            if (gbk[3].textContent !== "" && gbk[4].textContent !== "" && gbk[5].textContent !== "") {
                if (gbk[3].textContent === "X" && gbk[4].textContent === "X" && gbk[5].textContent === "X") {
                    middlerow = "xwinsmiddlerow";
                } else if (gbk[3].textContent === "O" && gbk[4].textContent === "O" && gbk[5].textContent === "O") {
                    middlerow = "owinsmiddlerow";
                } else {
                    middlerow = "drawmiddlerow";
                }
            }
        }
        function testBottomRow() {
            if (gbk[6].textContent !== "" && gbk[7].textContent !== "" && gbk[8].textContent !== "") {
                if (gbk[6].textContent === "X" && gbk[7].textContent === "X" && gbk[8].textContent === "X") {
                    bottomrow = "xwinsbottomrow";
                } else if (gbk[7].textContent === "O" && gbk[7].textContent === "O" && gbk[8].textContent === "O") {
                    bottomrow = "owinsbottomrow";
                } else {
                    bottomrow = "drawbottomrow";
                }
            }
        }
        function testFirstColumn() {
            if (gbk[0].textContent !== "" && gbk[3].textContent !== "" && gbk[6].textContent !== "") {
                if (gbk[0].textContent === "X" && gbk[3].textContent === "X" && gbk[6].textContent === "X") {
                    firstcolumn = "xwinsfirstcolumn";
                } else if (gbk[0].textContent === "O" && gbk[3].textContent === "O" && gbk[6].textContent === "O") {
                    firstcolumn = "owinsfirstcolumn";
                } else {
                    firstcolumn = "drawfirstcolumn";
                }
            }
        }
        function testSecondColumn() {
            if (gbk[1].textContent !== "" && gbk[4].textContent !== "" && gbk[7].textContent !== "") {
                if (gbk[1].textContent === "X" && gbk[4].textContent === "X" && gbk[7].textContent === "X") {
                    secondcolumn = "xwinssecondcolumn";
                } else if (gbk[1].textContent === "O" && gbk[4].textContent === "O" && gbk[7].textContent === "O") {
                    secondcolumn = "owinssecondcolumn";
                } else {
                    secondcolumn = "drawsecondcolumn";
                }
            }
        }
        function testThirdColumn() {
            if (gbk[2].textContent !== "" && gbk[5].textContent !== "" && gbk[8].textContent !== "") {
                if (gbk[2].textContent === "X" && gbk[5].textContent === "X" && gbk[8].textContent === "X") {
                    thirdcolumn = "xwinsthirdcolumn";
                } else if (gbk[2].textContent === "O" && gbk[5].textContent === "O" && gbk[8].textContent === "O") {
                    thirdcolumn = "owinsthirdcolumn";
                } else {
                    thirdcolumn = "drawthirdcolumn";
                }
            }
        }
        function testDiagonalTLBR() {
            if (gbk[0].textContent !== "" && gbk[4].textContent !== "" && gbk[8].textContent !== "") {
                if (gbk[0].textContent === "X" && gbk[4].textContent === "X" && gbk[8].textContent === "X") {
                    diagonaltlbr = "xwinsdiagonaltlbr";
                } else if (gbk[0].textContent === "O" && gbk[4].textContent === "O" && gbk[8].textContent === "O") {
                    diagonaltlbr = "owinsdiagonaltlbr";
                } else {
                    diagonaltlbr = "drawdiagonaltlbr";
                }
            }
        }
        function testDiagonalBLTR() {
            if (gbk[6].textContent !== "" && gbk[4].textContent !== "" && gbk[2].textContent !== "") {
                if (gbk[6].textContent === "X" && gbk[4].textContent === "X" && gbk[2].textContent === "X") {
                    diagonalbltr = "xwinsdiagonalbltr";
                } else if (gbk[6].textContent === "O" && gbk[4].textContent === "O" && gbk[2].textContent === "O") {
                    diagonalbltr = "owinsdiagonalbltr";
                } else {
                    diagonalbltr = "drawdiagonalbltr";
                }
            }
        }
        testTopRow();
        testMiddleRow();
        testBottomRow();
        testFirstColumn();
        testSecondColumn();
        testThirdColumn();
        testDiagonalTLBR();
        testDiagonalBLTR();
        declareWinner();
    }

    // DECLARES A WINNER

    function declareWinner() {
        if (toprow == "xwinstoprow" ||  middlerow == "xwinsmiddlerow" || bottomrow == "xwinsbottomrow" || firstcolumn == "xwinsfirstcolumn" || secondcolumn == "xwinssecondcolumn" || thirdcolumn == "xwinsthirdcolumn" || diagonaltlbr == "xwinsdiagonaltlbr" || diagonalbltr == "xwinsdiagonalbltr") {
            function createXWinnerContainer() {
                removeFirstContainer();
                var winnerdiv = document.createElement("div");
                winnerdiv.classList.add("winnerdiv");
                gamecontainer.appendChild(winnerdiv);
                winnerdiv.textContent = `X Wins! Congratulations, ${theX.name}!`;
                currentplayer.textContent = "Click 'New Game' to play again";
            };
            createXWinnerContainer();
        } else if (toprow == "owinstoprow" || middlerow == "owinsmiddlerow" || bottomrow == "owinsbottomrow" || firstcolumn == "owinsfirstcolumn" || secondcolumn == "owinssecondcolumn" || thirdcolumn == "owinsthirdcolumn" || diagonaltlbr == "owinsdiagonaltlbr" || diagonalbltr == "owinsdiagonalbltr") {
            function createOWinnerContainer() {
                removeFirstContainer();
                var winnerdiv = document.createElement("div");
                winnerdiv.classList.add("winnerdiv");
                gamecontainer.appendChild(winnerdiv);
                winnerdiv.textContent = `O Wins! Congratulations, ${theO.name}!`;
                currentplayer.textContent = "Click 'New Game' to play again";
            };
            createOWinnerContainer();
        } else if (toprow == "drawtoprow" && middlerow == "drawmiddlerow" && bottomrow == "drawbottomrow" && "drawfirstcolumn" && secondcolumn == "drawsecondcolumn" && thirdcolumn == "drawthirdcolumn" && diagonaltlbr == "drawdiagonaltlbr" && diagonalbltr == "drawdiagonalbltr") {
            function createDrawContainer() {
                removeFirstContainer();
                var winnerdiv = document.createElement("div");
                winnerdiv.classList.add("winnerdiv");
                gamecontainer.appendChild(winnerdiv);
                winnerdiv.textContent = "Draw!";
                currentplayer.textContent = "Click 'New Game' to play again";
            }
            createDrawContainer();
        }
    }

    // CLEARS THE GAME BOARD AND PLAYERS' NAMES

    const newbtn = document.querySelector("#newbtn");

    function newGame() {
        function clearPlayerInfo() {
            currentplayer.textContent = "Enter player names to start the game";
            function clearX() {
                xsubmitbtn.disabled = false;
                document.querySelector("#xplayername").value = ""
                theX = player("Player X");
            }
            function clearO() {
                osubmitbtn.disabled = false;
                document.querySelector("#oplayername").value = ""
                theO = player("Player O");
            }    
            function clearXOVariables() {
                toprow = "";
                middlerow = "";
                bottomrow = "";
                firstcolumn = "";
                secondcolumn = "";
                thirdcolumn = "";
                diagonaltlbr = "";
                diagonalbltr = "";
            }
            clearX();
            clearO();
            clearXOVariables();
        }
        clearPlayerInfo();
        removeFirstContainer();
        gamecontainer.appendChild(creategamebtn);
    }

    function removeFirstContainer() {
        gamecontainer.removeChild(gamecontainer.firstElementChild);
    };

    newbtn.addEventListener("click", newGame);

})();