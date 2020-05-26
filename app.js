document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const ScoreDisplay = document.querySelector('#score')
  const StartBtn = document.querySelector('#start-button')
  const width = 10

  //  The Tetrominoes: link below to my own Google Sheet with added logic
  // https://docs.google.com/spreadsheets/d/1u9pkr2Pgd-521Dwr_DfxNLWZpQT1GlggB1s4z8mPTGo/edit?usp=sharing
  const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]

  const zTetromino = [
    [width*2, width*2+1, width+1, width+2], //note that this repeats
    [0, width, width+1, width*2+1], //note that this repeats as well
    [width*2, width*2+1, width+1, width+2],
    [0, width, width+1, width*2+1]
  ]

  const tTetromino = [
    [width, width+1, width+2, 1],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [width, 1, width+1, width*2+1]
  ]

  const oTetromino = [
    [0, 1, width, width+1], //note that this repeats
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1]
  ]

  const iTetromino = [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3]
  ]

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  window.theTetrominoes = theTetrominoes;

  let currentPosition = 4
  let currentRotation = 0


  // randomly select a Tetromino and its first rotation
  let random = Math.floor(Math.random()*theTetrominoes.length)
  console.log(random)
  let current = theTetrominoes[random][currentRotation]

  // draw the Tetromino
  function draw() {
    // the current tetromino array (lTetromino[0]) has the value [1, 2, 11, 21]
    current.forEach(index => {
      // each div will contain a CSS class of tetromino to colour it blue
      // to choose which div will be blue, it will first need a currentPosition and the value of the index of the current array
      squares[currentPosition + index].classList.add('tetromino')
    })
  }

  // undraw the Tetromino
  function undraw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino')
    })
  }

  // make the tetromino move down every second
  timerId = setInterval(moveDown, 1000)

  // move down function
  function moveDown() {
    undraw()
    currentPosition += width
    draw()
  }
})
