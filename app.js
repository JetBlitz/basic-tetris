document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const ScoreDisplay = document.querySelector('#score')
  const StartBtn = document.querySelector('#start-button')
  const width = 10

  //The Tetrominoes: link below to my own Google Sheet with added logic
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
    [width, width+1, width+2, 1]
  ]
  console.log(tTetromino[0])
})
