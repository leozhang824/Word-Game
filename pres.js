// GLOBAL letIABLES (accessible by all functions)
// ==================================================================================================
// Array of Word Options (all lowercase)
let heroesList = ["captain america", "iron man", "thor", "hulk", "spider man", "black widow", "black panther", "dr. Strange", "hawkeye", "captain marvel", "star lord"];
// Solution will be held here.
let chosenHero = "";
// This will be the number of blanks we show based on the solution
let numBlanks = 0;
// An array that describes the state of which letters the user has guessed correctly so far. For example, if the chosen word is "neena" and the only correct letter that the user has picked is "n", then the value of this array will be ["n", "_", "_", "n", "_"
// identify the elements to report the state of the letiables
let wordBlanks = document.getElementById("word-blanks");
let wrongGuesses = document.getElementById("wrong-guesses");
let guessesLeft = document.getElementById("guesses-left");
let winCounterSpan = document.getElementById("win-counter");
let lossCounterSpan = document.getElementById("loss-counter");
// Game counters
let winCounter = 0;
let lossCounter = 0;
let numGuesses = 9;
//set up for the first round
initializeRound();
//make the browser listen for the user to press a letter
document.addEventListener("keyup", userPick, false);
//a function that sets up a round of the game
function initializeRound() {
  //pick a word at random
  let heroIndex = Math.floor(Math.random() * heroesList.length)

  chosenHero = heroesList[heroIndex];
  // This will be the number of blanks we show based on the solution
  numBlanks = chosenHero.length;
  // make blanksAndSuccesses an array containing as many underscores as there are letters in the chosen word
  blanksAndSuccesses = [];

    if (heroesList[heroIndex].includes(" ")) {
      for (let i = 0; i < chosenHero.length; i++) {
        if (chosenHero[i] === " "){
          blanksAndSuccesses.push("<span class='blankSpaces'></span>")
        } else {
          blanksAndSuccesses.push("_ ")
        }
      }
      console.log(blanksAndSuccesses)
    }
    else {
      for (let i = 0; i < chosenHero.length; i++) {
        blanksAndSuccesses.push("_");
      }
    }
  
  //write the blanks on the page
  wordBlanks.innerHTML = blanksAndSuccesses.join("");
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
  if(chosenHero.indexOf(lowerCasePick) !== -1) {
    //if user has already guessed this letter
    if(blanksAndSuccesses.some(letter => letter === lowerCasePick)) {
      //don't do anything
      return;
    }
    //walk through the word to locate the match(es)
    for(let i = 0; i < chosenHero.length; i++){
      //if we find a matching letter in this position
      if(lowerCasePick == chosenHero[i]) {
        //replace the blank in this position with the letter
        blanksAndSuccesses[i] = lowerCasePick;
        //decrement the number of blanks
        numBlanks--;
      }
    }
    //update the page with a representation of the current state of blanksAndSuccesses
    wordBlanks.innerHTML = blanksAndSuccesses.join(" ");
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
}let sec = 30;
function timer(){
  if(sec === 30){
  let timer = setInterval(function(){
    if(sec < 10){
      document.getElementById("TimerDisplay").innerHTML='00:0'+ sec;
    }else{
      document.getElementById("TimerDisplay").innerHTML='00:'+ sec;
    }
      sec--;
      if (sec < 0) {
          clearInterval(timer);
          wordBlanks.textContent = chosenHero;
      }
  }, 1000);
  }
  
}

let url = window.location.href;
let urlArray = url.split("/");
if (urlArray.at(-1) === "pres2.html") {

  timer()
}



