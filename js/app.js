
const squares = document.querySelectorAll("div.square");
const button = document.querySelector(".button");

const x = document.querySelectorAll(".clicked-x")
const o = document.querySelectorAll(".clicked-o")

const alert = document.querySelector(".alert")

let myMoves = [];
let yourMoves = [];

let count = 0;

const choice = (event) => {

    count++ 

    const id = event.target.id
    
    // first player
    if (count % 2 === 1) {

        // add the css class to the square
        // if you click the orange circle, give the class to its parent (the square)
        if (event.target.tagName === 'IMG') {

            event.target.parentElement.classList.add('clicked-x');

        } 
        else {
            event.target.classList.add('clicked-x')
        }
        

        // add target index to myMoves array
        myMoves.push(id)

        console.log("my moves:", myMoves)

        alert.innerText = "Player 2 moves next"
    }

    // second player 
    if (count % 2 === 0 ) {

        // add the css class to the square
        // if you click the orange circle, give the class to its parent (the square)
        if (event.target.tagName === 'IMG') {

            event.target.parentElement.classList.add('clicked-o');

        } 
        else {

            event.target.classList.add('clicked-o')

        }

        // add target index to the yourMoves array
        yourMoves.push(id)

        console.log("your moves: ", yourMoves)

        alert.innerText = "Player 1 moves next"
    }

    updateDOM();

    if (count >= 5) {
        checkWinner();
    }

    checkWinner();
}


// Add event listener to squares
const setupBoard = () => {

    for (const square of squares) {

        square.addEventListener('click', choice)

        square.classList.remove("no-hover")
    
    }

}


// update DOM to reflect choices after each click
const updateDOM = () => {

    for (let i = 0; i < squares.length; i++) {

        if (squares[i].classList.contains("clicked-x")) {

            squares[i].innerText = 'X'

        }

        if (squares[i].classList.contains("clicked-o")) {

            squares[i].innerText = 'O'

        }

        if (squares[i].classList.contains("clicked-o") || squares[i].classList.contains("clicked-x")){

            // make squares un-clickable after choice is made
            squares[i].removeEventListener("click", choice)

            // remove hover state 
            squares[i].classList.add('no-hover')

        }
    }
}




// Check for winners / no winners
// only allow 9 possible moves
const checkWinner = () => {

   const winningCombinations = {
        0: "1,2,3",
        1: "4,5,6",
        2: "7,8,9",
        3: "1,4,7",
        4: "2,5,8",
        5: "3,6,9",
        6: "1,5,9",
        7: "3,5,7"
   }


    for (win in winningCombinations) {

        // console.log(winningCombinations[win])

        if (winningCombinations[win] === myMoves) {
            console.log('win')
        }
        // console.log('my moves: ', myMoves)
    }

    // console.log(winningCombinations)

   // loop over arrays to see if there are any winning combos 



   // if winner 
   // alert.innerText = "${winner} won!"
}

checkWinner();


// Reset the board to play again
const reset = () => {

    console.log('reset')

    count = 0;
    myMoves = [];
    yourMoves = [];

    for (const square of squares) {

        square.classList.remove("clicked-x") 
        square.classList.remove("clicked-o")

        square.innerHTML = "<img src='images/orange-32x32.png' />";
        
        alert.innerText = "Player 1 moves first";
    }

    setupBoard();
}

button.addEventListener('click', reset)


// only run after count = > 3 or more
// document.addEventListener('DOMContentLoaded', checkWinner);
document.addEventListener('DOMContentLoaded', setupBoard)