/* global $ */
var moviesList = ['the sound of music', 'braveheart', 'jaws', 'titanic' , 'casablanca', 'the wizard of oz']
var songsList = ['vogue', 'thriller', 'uptown funk', 'my heart will go on']
var booksList = ['crime and punishment', 'the bible', 'the great gatsby']

var cat = $('.cat')
var catList
// var randomMovie = moviesList[Math.floor(Math.random()*moviesList.length)]
var wordPlay = moviesList[Math.floor(Math.random()*moviesList.length)]
var wordArray
var alph = $('.alph')
var alphPick
var alphList = []
var rightPicks = []
var wrongPicks = []
var showRight
var displayWord
var wordCanvas = $('.word')
var getAnswer = $('#answer')

cat.on('click', resetPlaceholder)
cat.on('click', resetWord)
cat.on('click', setPlaceholder)
alph.on('click', alphSelect)
alph.on('click', alphUsed)
alph.on('click', addToList)
alph.on('click', checkPick)
alph.on('click', reveal)
alph.on('click', showMan)
getAnswer.on('click', showAnswer)

function resetWord () {
  catList = $(this).attr('id')
  if (catList === 'movies') { console.log('movies')
  wordPlay = moviesList[Math.floor(Math.random()*moviesList.length)]
  } else if (catList === 'songs') { console.log('songs')
  wordPlay = songsList[Math.floor(Math.random()*songsList.length)]
  } else if (catList === 'books') { console.log('books')
  wordPlay = booksList[Math.floor(Math.random()*booksList.length)]
  }
}

function setPlaceholder () {
  wordArray = wordPlay.split('')
  wordArray.forEach(wordDivs)
}
function resetPlaceholder () {
  wordCanvas.html('')
}

function wordDivs (wordArray) {
  for (let i = 0; i < wordArray.length; i++) {
    if (wordArray[i] === ' ') {
      $('.word').append(' ')
    } else $('.word').append('_')
  }
}
setPlaceholder()

function alphUsed () { $(this).css({'opacity': '0.2', 'cursor': 'auto'}) }
function alphSelect () { alphPick = $(this).attr('id') }
function addToList () { alphList.push(alphPick) }

function checkPick () {
  if (wordArray.includes(alphPick)) {
    rightPicks.push(alphPick)
  } else {
    wrongPicks.push(alphPick)
  }
}

function reveal () {
  showRight = wordArray.map((letter) => {
    if (alphList.includes(letter)) {
      return letter
    } else if (letter === ' ') {
      return ' '
    } else return '_'
  })
  displayWord = showRight.join('')
  wordCanvas.text(displayWord)
  if (displayWord === wordPlay) {
    console.log('won')
    getAnswer.text('you win!')
    getAnswer.css('border', 'none')
    getAnswer.animate({'opacity': '1'}, {'duration': 900})
  }
}


/* wrong answers to reveal hangman */
function showMan () {
  if (wrongPicks.length === 1) {
    $('.head').removeClass('hidden')
  } else if (wrongPicks.length === 2) {
    $('.torso').removeClass('hidden')
  } else if (wrongPicks.length === 3) {
    $('.left-arm').removeClass('hidden')
  } else if (wrongPicks.length === 4) {
    $('.right-arm').removeClass('hidden')
  } else if (wrongPicks.length === 5) {
    $('.left-leg').removeClass('hidden')
  } else if (wrongPicks.length === 6) {
    $('.right-leg').removeClass('hidden')
    getAnswer.animate({'opacity': '1'}, {'duration': 900})
  }
}
/* get answer */
function showAnswer () {
  wordCanvas.text(wordPlay)
}
