
var buttonColours = ["red", "blue", "green", "yellow"];

var pattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).on("keypress", function () {
  if (!started) {
    $("#level-title").html("Level " + level);
    sequence();
    started = true;
  }
});

$(".play").on("click", function(){
  if (!started) {
    $("#level-title").html("Level " + level);
    sequence();
    started = true;
  }
});

$(".btn").on("click", function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  sound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (pattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");
    if (userClickedPattern.length === pattern.length) {
      setTimeout(function () {
        sequence();
      }, 1000);
    }
  } else {
    console.log("Wrong");
    sound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").html("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function sequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").html("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var color = buttonColours[randomNumber];
  pattern.push(color);
  $("#" + color)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  sound(color);
}

function sound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  pattern = [];
  started = false;
}
