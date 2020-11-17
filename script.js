var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];

$(document).keydown(function () {
    if (level === 0) {
        gamePattern.push(buttonColours[nextSequence()]);
        showSequence();
        showLevel();
    }
});

$(".btn").click(function (event) {
    var userChosenClour = event.target.id;
    //Check if game is not started yet
    if (gamePattern.length !== 0) {
        userClickedPattern.push(userChosenClour);
    }

    //Animation and effects
    $("#" + userChosenClour).addClass("pressed");
    setTimeout(function () {
        playSound(userChosenClour);
        $(".btn").removeClass("pressed");
    }, 200);

    //Check if game is started
    if (gamePattern.length !== 0) {
        //If game is started - check answer. If Answer is wrong - restart game.
        if (!checkAnswer(userClickedPattern.length - 1)) {
            $("h1").text("Game Over, Press Any Key to Restart");

            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
                restartGame();
            }, 200);

        } else if (gamePattern.length === userClickedPattern.length) { //If sequences match - show new sequence
            setTimeout(function(){
                userClickedPattern.length = 0;
                level++;
                showLevel();
                var nextColor = buttonColours[nextSequence()];
                gamePattern.push(nextColor);
                playAnimation(nextColor);
                playSound(nextColor);
            }, 1000);
        }
    }
});

function showSequence() {
    gamePattern.forEach(element => {
        playAnimation(element);
        playSound(element);
    });
}

function playAnimation(button) {
    $("#" + button).fadeOut(50).fadeIn(50);
}

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    return randomNumber;
}

function checkAnswer(index) {
    if (gamePattern[index] !== userClickedPattern[index]) {
        return false;
    }
    return true;
}

function showLevel() {
    $("h1").text("Level " + level);
}

function restartGame() {
    level = 0;
    gamePattern.length = 0;
    userClickedPattern.length = 0;
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

