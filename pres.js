// GLOBAL VARIABLES (accessible by all functions)
// ==================================================================================================
// Array of Word Options (all lowercase)
var wordsList = ["cecilia", "charly", "george", "glauk", "hunter", "jason",
  "shane", "claudio", "dartaniel", "mike"];
// Solution will be held here.
var chosenWord = "";
// This will be the number of blanks we show based on the solution
var numBlanks = 0;
// An array that describes the state of which letters the user has guessed correctly so far. For example, if the chosen word is "neena" and the only correct letter that the user has picked is "n", then the value of this array will be ["n", "_", "_", "n", "_"]
var blanksAndSuccesses = [];
// identify the elements to report the state of the variables
var wordBlanks = document.getElementById("word-blanks");
var wrongGuesses = document.getElementById("wrong-guesses");
var guessesLeft = document.getElementById("guesses-left");
var winCounterSpan = document.getElementById("win-counter");
var lossCounterSpan = document.getElementById("loss-counter");
// Game counters
var winCounter = 0;
var lossCounter = 0;
var numGuesses = 9;
//set up for the first round
initializeRound();
//make the browser listen for the user to press a letter
document.addEventListener("keyup", userPick, false);
//a function that sets up a round of the game
function initializeRound() {
  //pick a word at random
  chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)];
  // This will be the number of blanks we show based on the solution
  numBlanks = chosenWord.length;
  // make blanksAndSuccesses an array containing as many underscores as there are letters in the chosen word
  blanksAndSuccesses = [];
  for(var i = 0; i < numBlanks; i++) {
    blanksAndSuccesses.push("_");
  }
  //write the blanks on the page
  wordBlanks.textContent = blanksAndSuccesses.join(" ");
  //reset the number of wrong guesses allowed to 9
  numGuesses = 9;
  //write the number of wrong guesses allowed on the page
  guessesLeft.textContent = numGuesses.toString();
  //clear any text showing any wrong guesses
  wrongGuesses.textContent = "";
  //update the page with the current number of wins
  winCounterSpan.textContent = winCounter.toString();
  //update the page with the current number of losses
  lossCounterSpan.textContent = lossCounter.toString();
}
//a function to handle the event when the user presses a key
function userPick(event){
  //determine the letter that the user pressed
  let lowerCasePick = event.key.toLowerCase();
  //if the key is more than one letter
  if(lowerCasePick.length > 1) {
    //don't do anything
    return;
  }
  //if the key is a not a letter key
  if(lowerCasePick.charCodeAt(0) > 122 || lowerCasePick.charCodeAt(0) < 97) {
    //don't do anything
    return;
  }
  //if the letter has already been picked
  if(wrongGuesses.textContent.indexOf(lowerCasePick) !== -1) {
    //don't do anything
    return;
  }
  //if the letter can be found in the word
  if(chosenWord.indexOf(lowerCasePick) !== -1) {
    //if user has already guessed this letter
    if(blanksAndSuccesses.some(letter => letter === lowerCasePick)) {
      //don't do anything
      return;
    }
    //walk through the word to locate the match(es)
    for(var i = 0; i < chosenWord.length; i++){
      //if we find a matching letter in this position
      if(lowerCasePick == chosenWord[i]) {
        //replace the blank in this position with the letter
        blanksAndSuccesses[i] = lowerCasePick;
        //decrement the number of blanks
        numBlanks--;
      }
    }
    //update the page with a representation of the current state of blanksAndSuccesses
    wordBlanks.textContent = blanksAndSuccesses.join(" ");
  //if we can't find the pick in the word
  } else {
    //decrement the number of guesses left
    numGuesses--;
    //update the page with the number of guesses left
    guessesLeft.textContent = numGuesses.toString();
    //update the wrong guesses
    wrongGuesses.textContent += lowerCasePick; 
  }
  //detect if the user has won or lost
  //if the user has guessed the word there will be no more blanks left
  if(numBlanks == 0) {
    //tally the wins
    winCounter++;
    //reset for another round
    initializeRound();
  //if there are no more guesses left
  } else if (numGuesses == 0) {
    //tally the losses
    lossCounter++;
    //reset for another round
    initializeRound();
  }
}
function timer(){
  var sec = 30;
  var timer = setInterval(function(){
      document.getElementById("TimerDisplay").innerHTML='00:'+ sec;
      sec--;
      if (sec < 0) {
          clearInterval(timer);
      }
  }, 1000);
}









