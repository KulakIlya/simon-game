const colors = ["red", "green", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];
let level = -1;

// Events

$(".btn").on("click", function () {
  userChosenColor = this.id
  userClickedPattern.push(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);

  playSound(userChosenColor);
  animatePress(userChosenColor);
});

$(document).on("keypress", function (event) {
  if (event.which === 97 && level + 1 === 0) {
    nextSequence();
  }
})

// Functions

function playSound(currentColor) {
  const sound = new Audio(`./sounds/${currentColor}.mp3`);
  sound.play();
}

function nextSequence() {
  $("#level-title").text("Level " + (level + 2));

  let randInt = Math.floor(Math.random() * 4);
  let randChosenColor = colors[randInt];
  gamePattern.push(randChosenColor);

  $("#" + randChosenColor).fadeOut(250).fadeIn(250);
  playSound(randChosenColor);

  userClickedPattern = [];
  level++;
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentElem) {
  if (userClickedPattern[currentElem] === gamePattern[currentElem]) {
    if (userClickedPattern.length === gamePattern.length)
      setTimeout(() => nextSequence(), 1000);
  } else {
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    playSound("wrong");
    restart();
  }
}

function restart() {
  gamePattern = [];
  level = -1;

  $("#level-title").text("Game Over, Press A to Restart");

}