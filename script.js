console.log('linked')
// set up categories, each with an array of 3 words - gold
// var movies = ['jaws', 'braveheart', 'titanic'] - gold
// var songs = ['vogue', 'thriller', 'uptown funk'] - gold
// var books = ['crime and punishment', 'the bible', 'the great gatsby'] - gold
// user click category to select which category to use - gold
// break word into letters
// create placeholders for each item - div with class (letter)
    // spaces? if space (or not letter a-z)
// user click on letter (divs with ids corresponding to (letters or numbers?))
    // mark letter used
// check if letter clicked matches letters
    // if yes
      // store letter
      // show letter - insert in the div?
    // if no
      // add hangman's body part
      // count wrong
        // if wrong count === 6 (total parts), game over
// continue until wrong count, or user click - solve.
  // if solve check if correct letters stored equals correct letters in word
var selWord = 'forrest gump'
var wordArray

function setPlaceholder () {
  wordArray = selWord.split('')
  wordArray.forEach(wordDivs)
  console.log(wordArray)
  console.log(wordArray.length)
}

function wordDivs (wordArray) {
  for (let i = 0; i < wordArray.length; i++) {
      if (wordArray[i] === ' ') {
        $('<div></div>').attr('class', 'space').appendTo('.word')
      }
      else $('<div></div>').attr('class', 'letter').appendTo('.word')
  }
}

setPlaceholder();

var alph = $('.alph')
var alphPick
var alphList = []

alph.on('click', alphHover)
alph.on('click', alphSelect)
alph.on('click', addToList)

function alphHover () { $(this).css('opacity', '0.5') }
function alphSelect () { alphPick = $(this).attr('id') }
function addToList () { alphList.push(alphPick) }

function checkPick () {
  forEach(wordArray)
}

// check if alphPick is in selWord

// $('button').on('click', grow)
// function grow() {$('.torso').animate({height: '+=120px'}, 2000)}
