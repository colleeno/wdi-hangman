/* global $ */
var moviesList = ['the sound of music', 'braveheart', 'jaws', 'titanic', 'casablanca', 'the wizard of oz']
var songsList = ['vogue', 'thriller', 'uptown funk', 'my heart will go on']
var booksList = ['crime and punishment', 'the bible', 'the great gatsby']

var cat = $('.cat')
var catList
var wordPlay = ' '
var wordArray = null
var wordCanvas = $('.word')

cat.on('click', setWord)
cat.on('click', setPlaceholder)
cat.on('click', startGame)

/*set word*/
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

/*set placeholder*/
function setPlaceholder () {
  wordArray = wordPlay.split('')
  wordCanvas.html('')
  for (let i = 0; i < wordArray.length; i++) {
    if (wordArray[i] === ' ') {
      $('.word').append(' ')
    } else $('.word').append('_')
  }
}

function startGame () {

  var alph = $('.alph')
  var alphPick
  var allPicks = []
  var rightPicks = []
  var wrongPicks = []
  var showRight
  var displayWord
  var getAnswer = $('#answer')
  var endHideElem = $('h2, .word, ul, footer')

  alph.on('click', alphSelect)
  alph.on('click', alphUsed)
  alph.on('click', addToList)
  alph.on('click', checkPick)
  alph.on('click', reveal)
  alph.on('click', showMan)
  getAnswer.on('click', showAnswer)
  getAnswer.on('click', function () { getAnswer.css({'opacity': '0', 'cursor': 'default'}) })

  /* mark and store letters selected */
  function alphUsed () { $(this).css({'opacity': '0.2', 'cursor': 'auto'}) }
  function alphSelect () { alphPick = $(this).attr('id') }
  function addToList () { allPicks.push(alphPick) }

  /* check if pick is right or wrong and track in array */
  function checkPick () {
    if (wordArray.includes(alphPick)) {
      rightPicks.push(alphPick)
    } else {
      wrongPicks.push(alphPick)
      $('.stand-base').append(alphPick)
    }
  }

  /* reveal right letters on board */
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

  /* display win when all letters guessed */
    if (displayWord === wordPlay) {
      console.log('won')
      endHideElem.css('opacity', '0.5')
      $('aside').css('opacity', '0.5')
      $('#result').text('YOU WIN!')
      $('#play-again').text('play again')
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
      getAnswer.text('get answer')
      $('#result').text('YOU LOSE')
      endHideElem.css('opacity', '0.5')
      $('.eyes').animate({'opacity': '1'}, {'duration': 900})
      $('.frown').animate({'opacity': '1'}, {'duration': 900})
      $('#play-again').text('play again')
    }
  }

  /* if lose, show answer */
  function showAnswer () {
    wordCanvas.text(wordPlay)
  }
}
/* play again */
$('#play-again').on('click', replay)
function replay () {
  location.reload()
}
