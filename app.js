document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  let squares = Array.from(document.querySelectorAll(".grid div"));
  const ScoreDisplay = document.querySelector("#score");
  const StartBtn = document.querySelector("#start-button");
  const width = 10;

  //  The Tetrominoes: link below to my own Google Sheet with added logic
  // https://docs.google.com/spreadsheets/d/1u9pkr2Pgd-521Dwr_DfxNLWZpQT1GlggB1s4z8mPTGo/edit?usp=sharing
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];

  const zTetromino = [
    [width * 2, width * 2 + 1, width + 1, width + 2], //note that this repeats
    [0, width, width + 1, width * 2 + 1], //note that this repeats as well
    [width * 2, width * 2 + 1, width + 1, width + 2],
    [0, width, width + 1, width * 2 + 1],
  ];

  const tTetromino = [
    [width, width + 1, width + 2, 1],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [width, 1, width + 1, width * 2 + 1],
  ];

  const oTetromino = [
    [0, 1, width, width + 1], //note that this repeats
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  const theTetrominoes = [
    lTetromino,
    zTetromino,
    tTetromino,
    oTetromino,
    iTetromino,
  ];

  window.theTetrominoes = theTetrominoes;

  let currentPosition = 4;
  let currentRotation = 0;

  // randomly select a Tetromino and its first rotation
  let random = Math.floor(Math.random() * theTetrominoes.length);
  console.log("Index " + random + " of theTetrominoes array");
  let current = theTetrominoes[random][currentRotation];

  // draw the Tetromino
  function draw() {
    // the current tetromino array (lTetromino[0]) has the value [1, 2, 11, 21]
    current.forEach((index) => {
      // each div will contain a CSS class of tetromino to colour it blue
      // to choose which div will be blue, it will first need a currentPosition and the value of the index of the current array
      squares[currentPosition + index].classList.add("tetromino");
    });
  }

  // undraw the Tetromino
  function undraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove("tetromino");
    });
  }

  // make the tetromino move down every second
  timerId = setInterval(moveDown, 250);

  // move down function
  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  // freeze function
  function freeze() {
    if (
      current.some((index) =>
        squares[currentPosition + index + width].classList.contains("taken")
      )
    ) {
      current.forEach((index) =>
        squares[currentPosition + index].classList.add("taken")
      );
      // start a new tetromino falling
      random = Math.floor(Math.random() * theTetrominoes.length);
      current = theTetrominoes[random][currentRotation];
      currentPosition = 4;
      draw();
    }
  }

  // move the tetromino left, unless at the edge or there is a blockage
  function moveLeft() {
    //remove the shape at its current location regardless where it is
    undraw();

    //if the most left square of the tetromino is on a square that is divisible by 10 and leaves a remainder of 0, then it returns TRUE that it is at the LEFT EDGE of the grid.
    const isAtLeftEdge = current.some(
      (index) => (currentPosition + index) % width === 0
    );

    //if it's NOT at the left edge, we can move it left
    if (!isAtLeftEdge) currentPosition -= 1; //this is in-line syntax for if-statements (conditionals); read: if !isAtLeftEdge is true, currentPosition = currentPosition - 1. This will move our tetromino Left when we moveLeft().

    //we want our tetromino to stop IF there's another tetromino already there that has already been frozen

    //if some of the squares in our tetromino shape go into a space that contains the class "taken" while traveling left, move it back one space so it appears to not have moved. We want to do this for EVERY index in our tetromino shape.
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition += 1;
    }

    // draw the tetromino
    draw();
  }
});
//test
