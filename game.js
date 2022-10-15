var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

if (level == 0 && !started) {
  $("html").keypress(function() {
    nextSequence();
    started = true;
  });
}

// choose random item from buttonColors, add that item to userClickedPattern, increase level and and update h1
function nextSequence() {
  var randomNumber = (Math.floor(Math.random() * 4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(50).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
  level++;
  $("h1").text("Level- " + level);
  console.log(level);
}

// check the last item from userClickedPattern and gamePattern. if correct run nextSequence again. if wrong give result.
function checkAnswer() {
  if (gamePattern[gamePattern.length - 1] === userClickedPattern[userClickedPattern.length - 1]) {
    console.log("Correct answer");
    nextSequence();
  } else {
    console.log("Wrong answer");
    $("h1").text("Game Over!\nYou have reached level " + level + "\nPress A Key to Restart");
    var audio = new Audio("sounds\\wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    $("body").fadeIn(50).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    gameOver();
  }
}

// upon click add item to userClickedPattern, playSond, animatePress and checkAnswer.
$(".btn").click(function() {
  if (level === 0 && !started) {
    $("h1").text("Press A Key to Start");
  }
  else {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer();
  }

});

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(color_name) {
  var soundInput = color_name;
  switch (soundInput) {
    case "red":
      var audio = new Audio("sounds\\red.mp3");
      audio.play();
      break;
    case "blue":
      var audio = new Audio("sounds\\blue.mp3");
      audio.play();
      break;
    case "green":
      var audio = new Audio("sounds\\green.mp3");
      audio.play();
      break;
    case "yellow":
      var audio = new Audio("sounds\\yellow.mp3");
      audio.play();
      break;
    default:
      console.log("Something is wrong")
  }
}

function gameOver() {
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
  started = false;

}
