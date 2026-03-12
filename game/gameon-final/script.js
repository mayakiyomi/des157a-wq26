(function(){
    "use strict";
    console.log("reading js");
    /* consts */
    const closeOverlay = document.querySelector('#closeOverlay');
    const overlay = document.querySelector('#overlay');
    const colorBox = document.querySelector('#colorBox');
    const pickerContainer = document.querySelector('#pickerContainer');
    const submit = document.querySelector('#submitBtn');
    const colorPicker = document.querySelector('#colorPicker');
    const answerScreen = document.querySelector('#answerScreen');
    const guessBox = document.querySelector('#playerGuess');
    const ogColorBox = document.querySelector('#originalColor');
    const feedback = document.querySelector('#feedback');
    const next=document.querySelector('#nextRound');
    const winScreen = document.querySelector('#winScreen');
    const winText = document.querySelector('#winText');
    const playAgain = document.querySelector('#playAgain');
    
    /* audio */
    const right1= document.querySelector('#right1');
    const rightWin= document.querySelector('#rightWin');
    const wrong= document.querySelector('#wrong');

    /* lets */
    let targetColor;
    let player1Score = 0;
    let player2Score = 0;
    let currentPlayer = 1; // 1 or 2

    /* close overlay and start game */
    closeOverlay.addEventListener('click', startGame);

    function startGame(){
       overlay.className = 'hidden';
       targetColor= randomColor();
       colorBox.style.backgroundColor = `rgb(${targetColor[0]}, ${targetColor[1]}, ${targetColor[2]})`;
       setTimeout(function(){
            colorBox.className = 'hidden';
            pickerContainer.className = '';
        }, 3000);
    };
    /* create random color */
    function randomColor(){
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return [r,g,b];
    };

    submit.addEventListener('click', checkGuess);
    
    function checkGuess(){
        const playerHex = colorPicker.value;
        const playerColor = hexToRgb(playerHex);
        let points = 0;
        let difference =
        Math.abs(targetColor[0] - playerColor[0]) +
        Math.abs(targetColor[1] - playerColor[1]) +
        Math.abs(targetColor[2] - playerColor[2]);
    

        if(difference < 36){
            points = 2;
            feedback.innerHTML = "Nice! +2 points";
            rightWin.play();
        }
        else if(difference < 120){
            points = 1;
            feedback.innerHTML = "Close! +1 point";
            right1.play();
        }
        else{
            points = 0;
            feedback.innerHTML = "Not close enough!";
            wrong.play();
        };

        /* update scores */
        if(currentPlayer === 1){
            player1Score += points;
            document.querySelector('#score1').innerHTML = player1Score;
        } else {
            player2Score += points;
            document.querySelector('#score2').innerHTML = player2Score;
        };

        /* check score for winner */

        if(player1Score >= 5){
            winText.innerHTML = "PLAYER 1 WINS!";
            winScreen.className = ''; // show win screen
            pickerContainer.className = 'hidden';
            answerScreen.className = 'hidden';
            rightWin.play();
            return; // stop the function here
        } else if(player2Score >= 5){
            winText.innerHTML = "PLAYER 2 WINS!";
            winScreen.className = ''; // show win screen
            pickerContainer.className = 'hidden';
            answerScreen.className = 'hidden';
            rightWin.play();
            return;
        }

        pickerContainer.className = 'hidden';
        answerScreen.className = '';
        guessBox.style.backgroundColor = playerHex;
        ogColorBox.style.backgroundColor =
        `rgb(${targetColor[0]}, ${targetColor[1]}, ${targetColor[2]})`;
    };
    /* had to look this up: to convert user hex guess to rgb (explaining for my own understanding) for each pair in the 6 val hex number, you multiply the first value (1-f) by 16 and then add the second val and that gets a single number for an rgb sequence. the .substr starts at the first value in the parentheses, and then takes 2 values (second number in parentheses). then, the parseInt converts the two characters, whetehr they are letters or numbers, to base 16, returning 3 rgb vals.*/

    function hexToRgb(hex){
        const r = parseInt(hex.substr(1,2),16);
        const g = parseInt(hex.substr(3,2),16);
        const b = parseInt(hex.substr(5,2),16);
        return [r,g,b];
    };

    next.addEventListener('click', newRound);

    function newRound(){
        answerScreen.className = 'hidden';
        colorBox.className = '';
        feedback.innerHTML = '';

        /* siwtch players */

        if (currentPlayer == 1 ){
            currentPlayer = 2;
        } else{
            currentPlayer = 1;
        };

        document.querySelector('#currentPlayer').innerHTML = `CURRENT TURN: PLAYER ${currentPlayer}`;
        targetColor = randomColor();
        colorBox.style.backgroundColor = `rgb(${targetColor[0]}, ${targetColor[1]}, ${targetColor[2]})`;
        colorPicker.value='#808080';
        setTimeout(function(){
            colorBox.className = "hidden";
            pickerContainer.className = "";
        }, 3000);

    };

    playAgain.addEventListener('click', reset);

    function reset(){
        player1Score=0;
        player2Score = 0;
        currentPlayer = 1;
        document.querySelector('#score1').innerHTML = player1Score;
        document.querySelector('#score2').innerHTML = player2Score;
        document.querySelector('#currentPlayer').innerHTML = `CURRENT TURN: PLAYER ${currentPlayer}`;
        winScreen.className = 'hidden';
        newRound();
    }
})();