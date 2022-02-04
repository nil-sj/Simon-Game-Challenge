//connection test successful

var userClickedPattern = [];
var level = 0;

const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

function nextSequence() {
  userClickedPattern = [];
  level += 1;
  $('#level-title').text('Level '+ level);
  var randomChosenColour = buttonColours[Math.floor(Math.random()*buttonColours.length)];
  gamePattern.push(randomChosenColour);
  animatePress(randomChosenColour)
  playSound(randomChosenColour)
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
     $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function () {
          nextSequence();
        }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
       $("body").removeClass("game-over");
    }, 200);
    $('#level-title').text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
}

var started = false;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});
