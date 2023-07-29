let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let currentLevel = 0;
let first = true;

function nextSequence() {
  level = level + 1;
  $("h1").html("LEVEL " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  currentLevel = 0;
  userClickedPattern = [];

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  audio(randomChosenColour);
}

$(document).keypress((event) => {
  if (first === true) {
    first = false;
    setTimeout(() => nextSequence(), 200);
  }
});

$(".btn").click((event) => {
  const { id } = event.target; // DOKUNMAAAAA
  const userChosenColour = id;
  audio(userChosenColour);
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  console.log(userClickedPattern);
  checkAnswer();
});

function audio(audio) {
  var audio = new Audio("./sounds/" + audio + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function () {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer() {
  let user = userClickedPattern[currentLevel];
  if (userClickedPattern[currentLevel] !== gamePattern[currentLevel]) {
    gameOver();
  } else if (currentLevel === level - 1) {
    setTimeout(() => nextSequence(), 1000);
  } else if (currentLevel !== level - 1) {
    currentLevel++;
  }
}

function gameOver() {
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  audio("wrong");
  $("h1").html("GAME OVER, Press Any key To Restart");
  $(document).keypress((event) => {
    location.reload(true);
  });
}
