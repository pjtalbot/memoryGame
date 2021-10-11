const gameContainer = document.getElementById("game");
// const card = doucment.div

const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');

let guesses = 0;
let matches = 0;
let cardCount = 0;

function addStartedClass() {
  startButton.classList.add("started");
  resetButton.classList.add("started");
}

startButton.addEventListener("click", function() {
  buildGameContainer(); 
  addStartedClass();
});

function resetScore(){
  guesses = guesses - guesses;
  let scoreBoard = document.getElementById('guesses')
  scoreBoard.innerHTML = `${guesses}`

}

resetButton.addEventListener("click", function() {
  resetGameContainer();
  resetScore();
  
});

function updateScore() {
  let scoreBoard = document.getElementById('guesses')
  scoreBoard.innerHTML = `${guesses}`
}

function resetGameContainer() {
  while (gameContainer.firstChild) {
      gameContainer.removeChild(gameContainer.firstChild);
  }
  resetScore();
  updateScore();
  buildGameContainer();

  if (document.getElementById('youWin')) {

    let a = document.getElementById('youWin')


    a.remove();

  }
}






function buildGameContainer() {
  const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
  ];
  
  // here is a helper function to shuffle an array
  // it returns the same array with values shuffled
  // it is based on an algorithm called Fisher Yates if you want ot research more
  function shuffle(array) {
    let counter = array.length;
  
    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);
      // Decrease counter by 1
      counter--;
      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
  
    return array;
  }
  
  let shuffledColors = shuffle(COLORS);
  
  // this function loops over the array of colors
  // it creates a new div and gives it a class with the value of the color
  // it also adds an event listener for a click for each card
  
  function createDivsForColors(colorArray) {
    for (let color of colorArray) {
      // create a new div
      const newDiv = document.createElement("div");
  
      // give it a class attribute for the value we are looping over
      newDiv.classList.add(color);
  
      // call a function handleCardClick when a div is clicked on
      // function handleCardClick() {
        
      //   document.div.classList.add('selected');
      // }
      newDiv.addEventListener("click", handleCardClick);
      
  
      // append the div to the element with an id of game
      gameContainer.append(newDiv);
      cardCount++;
    }
  }
  
  createDivsForColors(shuffledColors);
}



function checkMatch(firstInput, secondInput) {
  if (secondInput.style.backgroundColor === firstInput.style.backgroundColor ) {
      
    secondInput.classList.add("matched");
    firstInput.classList.add('matched');

    secondInput.classList.remove('secondSelected')
    firstInput.classList.remove('firstSelected')

    console.log('You Matched!')

    firstCardArr = [];
    guesses++;
    updateScore();
    matches++;

    // This Code runs when you win! if the amount of matches = .5 * cardCount

    if (matches === (cardCount / 2)) {
      let youWin = document.createElement('div');
      youWin.innerText = 'YOU WIN!'
      youWin.setAttribute('id', 'youWin')
      document.body.append(youWin);

      let endReset = document.createElement('button');
    
      // endReset.setAttribute('id', 'endReset');
      // endReset.innerText = 'Play Again'
      // endReset.addEventListener("click", function() {
      //   resetGameContainer();
      //   resetScore();
      //   let a = document.getElementById('youWin')
      //   a.remove();
      //   let b = document.getElementById('endReset')
      //   b.remove();

        

      // })

      
  
      
    }

    
    } else {
    console.log('Not a Match')
    setTimeout(function() {
      firstInput.classList.remove('firstSelected');
      secondInput.classList.remove('secondSelected');
      guesses++;
      updateScore();
      }, 1000)
      
}
  
}



// use this array to store and acess the first card selection with a wider SCOPE
let firstCardArr = [];

// TODO: Implement this function!
function handleCardClick(event) {

  // prevents selection of already matched cards

  if (event.target.classList.contains('matched')) {
    alert('that card is already matched');
  } 
  else if (document.getElementsByClassName('secondSelected').length) {
    alert('Slow down there, buddy');

  }

  else {

    if(!document.getElementsByClassName('firstSelected').length) {
  
    //reveal color
      var classColor = event.target.classList
      var firstCard = event.target;
      firstCardArr.push(firstCard);
      firstCard.style.backgroundColor = `${classColor}`;
      firstCard.classList.toggle("firstSelected");
      console.log(firstCard.classList)
  
      let first = document.getElementsByClassName('firstSelected');
      console.log(first);
    } else {
        if (event.target.classList.contains('firstSelected')) {
        alert('Nice Try, smart ass');
        event.target.classList.remove('firstSelected')
        firstCardArr = [];
        } else {console.log("Your second choice was", event.target);
      //reveal color
        let classColor = event.target.classList;
        let secondCard = event.target;
        secondCard.style.backgroundColor = `${classColor}`;
        secondCard.classList.toggle("secondSelected");
        
        let first = document.getElementsByClassName('firstSelected');
        let second = document.getElementsByClassName('secondSelected');
        // console.log(second);
        console.log(second)
        let firstCard = firstCardArr[0];
        firstCardArr = [];
  
        checkMatch(firstCard, secondCard);
      }
    
      // Check to see match
      
      
  }}

  
}




// when the DOM loads



