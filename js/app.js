
const squares = document.querySelectorAll("div.square");
const button = document.querySelector(".button");

const x = document.querySelectorAll(".clicked-x")
const o = document.querySelectorAll(".clicked-o")

const alert = document.querySelector(".alert")

const myMoves = [];
const yourMoves = [];

let count = 0;

const choice = (event) => {

    count++ 

    const id = event.target.id
    
    // first player
    if (count % 2 === 1) {

        // add the css class to the square
        event.target.classList.add('clicked-x')

        // add target index to myMoves array
        myMoves.push(id)

        console.log("my moves:", myMoves)

        alert.innerText = "Player 2 moves next"
    }

    // second player 
    if (count % 2 === 0 ) {

        // add the css class to the square 
        event.target.classList.add('clicked-o')

        // add target index to the yourMoves array
        yourMoves.push(id)

        console.log("your moves: ", yourMoves)

        alert.innerText = "Player 1 moves next"
    }

    updateDOM();

    if (count => 4) {

    }
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

            squares[i].innerText = 'x'

        }

        if (squares[i].classList.contains("clicked-o")) {

            squares[i].innerText = 'o'

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

   // loop over arrays to see if there are any winning combos 

   for (const moves in myMoves) {

        console.log(myMoves, "inside checkWinner")
   }

   // if winner 
   // alert.innerText = "${winner} won!"

   console.log("inside checkWinner")
}





// Reset the board to play again
const reset = () => {

    console.log('reset')

    for (const square of squares) {

        square.classList.remove("clicked-x") 
        square.classList.remove("clicked-o")

        count = 0;
        
    }

    setupBoard();
}

button.addEventListener('click', reset)


// only run after count = > 3 or more
// document.addEventListener('DOMContentLoaded', checkWinner);
document.addEventListener('DOMContentLoaded', setupBoard)