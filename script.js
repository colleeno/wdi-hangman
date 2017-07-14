/* global $ */

/* CREATE KEYBOARD */
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

function createAlph () {
  for (var i = 0; i < alphabet.length; i++) {
    $('<div></div>').attr({'class': 'alph', 'id': alphabet[i]}).text(alphabet[i]).appendTo('.alph-wrapper')
  }
}
createAlph()

var moviesList = ['the sound of music', 'braveheart', 'jaws', 'titanic', 'casablanca', 'the wizard of oz']
var songsList = ['vogue', 'thriller', 'i will always love you', 'we will rock you', 'i believe i can fly']
var booksList = ['crime and punishment', 'the catcher in the rye', 'the great gatsby', 'the davinci code', 'war and peace']

var cat = $('.cat')
var catList
var wordPlay = ' '
var wordArray = null
var wordCanvas = $('.word')

cat.on('click', startGame)
cat.on('click', setWord)
cat.on('click', setPlaceholder)

/* SET WORD BASED OFF CATEGORY CHOSEN */
function setWord () {
  wordCanvas.html(' ')
  cat.css('text-decoration', 'none')
  $(this).css('text-decoration', 'underline')
  catList = $(this).attr('id')
  if (catList === 'movies') {
    wordPlay = moviesList[Math.floor(Math.random() * moviesList.length)]
  } else if (catList === 'songs') {
    wordPlay = songsList[Math.floor(Math.random() * songsList.length)]
  } else if (catList === 'books') {
    wordPlay = booksList[Math.floor(Math.random() * booksList.length)]
  }
}

/* SET LINES FOR WORD LETTERS */
function setPlaceholder () {
  wordArray = wordPlay.split('')
  wordCanvas.html('')
  for (let i = 0; i < wordArray.length; i++) {
    if (wordArray[i] === ' ') {
      $('.word').append(' ')
    } else $('.word').append('_')
  }
}

/* GAME FUNCTION */
function startGame () {
  var alph = $('.alph')
  var alphPick
  var allPicks = []
  var rightPicks = []
  var wrongPicks = []
  var showRight
  var displayWord
  var getAnswer = $('#answer')
  var endHideElem = $('h2, .word, ul, footer, h1')
  var result = $('#result')
  var playAgain = $('#play-again')

  alph.on('click', alphSelect)
  alph.on('click', alphUsed)
  alph.on('click', addToList)
  alph.on('click', checkPick)
  alph.on('click', reveal)
  alph.on('click', showMan)

  getAnswer.on('click', showAnswer)
  getAnswer.on('click', function () { getAnswer.css({'opacity': '0', 'cursor': 'default'}) })

  /* STORE GUESSES AND MARK USED */
  function alphUsed () { $(this).css({'opacity': '0.2', 'cursor': 'auto'}) }
  function alphSelect () { alphPick = $(this).attr('id') }
  function addToList () { allPicks.push(alphPick) }

  /* CHECK AND STORE IF LETTER IS RIGHT OR WRONG  */
  function checkPick () {
    if (wordArray.includes(alphPick)) {
      rightPicks.push(alphPick)
    } else {
      wrongPicks.push(alphPick)
      $('.stand-base').text(wrongPicks.join(''))
    }
  }

  /* SHOW RIGHT LETTERS ON BOARD */
  function reveal () {
    showRight = wordArray.map((letter) => {
      if (allPicks.includes(letter)) {
        return letter
      } else if (letter === ' ') {
        return ' '
      } else return '_'
    })
    displayWord = showRight.join('')
    wordCanvas.text(displayWord)

  /* SHOW WIN WHEN ALL LETTERS GUESSED */
    if (displayWord === wordPlay) {
      endHideElem.css('opacity', '0.5')
      $('aside').css('opacity', '0.5')
      result.text('YOU WIN!')
      playAgain.text('play again')
    }
  }

  /* BUILD HANGMAN WITH WRONG PICKS */
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
      getAnswer.text('get answer')
      result.text('YOU LOSE')
      endHideElem.css('opacity', '0.5')
      $('.eyes, .frown').animate({'opacity': '1'}, {'duration': 900})
      playAgain.text('play again')
    }
  }

  /* PROVIDE SHOW ANSWER OPTION ON LOSE */
  function showAnswer () {
    wordCanvas.text(wordPlay)
  }
}
/* PLAY GAME AGAIN */
$('#play-again').on('click', replay)
function replay () {
  location.reload()
}
