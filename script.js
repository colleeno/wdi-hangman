var selWord = 'forrest gump'
var wordArray

function setPlaceholder () {
  wordArray = selWord.split('')
  wordArray.forEach(wordDivs)
  console.log(wordArray)
}


function wordDivs (wordArray) {
  for (let i = 0; i < wordArray.length; i++) {
      if (wordArray[i] === ' ') {
        $('.word').append(' ')
      }
      else $('.word').append('_')
  }
}

setPlaceholder()

var alph = $('.alph')
var alphPick
var alphList = []
var rightPicks = []
var wrongPicks = []

alph.on('click', alphHover)
alph.on('click', alphSelect)
alph.on('click', addToList)
alph.on('click', checkPick)
alph.on('click', showMan)
alph.on('click', display)
alph.on('click', resetDivs)

function alphHover () { $(this).css('opacity', '0.5') }
function alphSelect () { alphPick = $(this).attr('id') }
function addToList () { alphList.push(alphPick) }

function checkPick () {
  if (wordArray.includes(alphPick)) {
    console.log(true)
    rightPicks.push(alphPick)
  }
  else {
    console.log(false)
    wrongPicks.push(alphPick)
  }
}

function showMan () {
  if (wrongPicks.length === 1) {
    $('.head').removeClass('hidden')
  }
  else if (wrongPicks.length === 2) {
    $('.torso').removeClass('hidden')
  }
  else if (wrongPicks.length === 3) {
    $('.left-arm').removeClass('hidden')
  }
  else if (wrongPicks.length === 4) {
    $('.right-arm').removeClass('hidden')
  }
  else if (wrongPicks.length === 5) {
    $('.left-leg').removeClass('hidden')
  }
  else if (wrongPicks.length === 6) {
    $('.right-leg').removeClass('hidden')
    // show answer - or make click to see?
  }
}

var displayArray

function display () {
  displayArray = wordArray.map((letter) => {
  if (alphList.includes(letter)) {
    return letter
  } else if (alphList.includes(' ')) {
    return ' '
  } else {
    return '_'
    }
  })
  console.log(displayArray)
}

function resetDivs () {
  displayArray.forEach(redoDivs)
  console.log('divs reset')
}

function redoDivs (displayArray) {
  for (let i = 0; i < displayArray.length; i++) {
      if (displayArray[i] === '_') {
        $('<div>_</div>').attr('class', 'space').appendTo('.word')
      }
      else $('<div> </div>').attr('class', 'letter').text(displayArray[i]).appendTo('.word')
  }
}
