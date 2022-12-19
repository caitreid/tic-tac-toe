
const squares = document.querySelectorAll("div.square");
const button = document.querySelector(".button");

const x = document.querySelectorAll(".clicked-x")
const o = document.querySelectorAll(".clicked-o")

const alert = document.querySelector(".alert")

let myMoves = [];
let yourMoves = [];

let count = 0;

const alertMessage = (message) => {
    alert.innerText = message
}

const choice = (event) => {

    count++ 

    let id = event.target.id
    
    // first player
    if (count % 2 === 1) {

        // add the css class to the square. if you click orange dot, give the class to its parent (the square)
        if (event.target.tagName === 'IMG') {

            event.target.parentElement.classList.add('clicked-x');

            id = event.target.parentElement.id

        } 
        else {
            event.target.classList.add('clicked-x')
        }
        
        // add target index to myMoves array
        myMoves.push(id)

        alertMessage("Player 2 moves next")
    }

    // second player 
    if (count % 2 === 0 ) {

        // add the css class to the square. i
        // if you click orange dot, give the class to its parent, the square
        if (event.target.tagName === 'IMG') {

            event.target.parentElement.classList.add('clicked-o');

            id = event.target.parentElement.id

        } 
        else {

            event.target.classList.add('clicked-o')

        }

        // add target index to the yourMoves array
        yourMoves.push(id)

        alertMessage("Player 1 moves next")
    }

    updateDOM();

    if (count >= 5) {
        checkWinner(myMoves);
        // console.log("eval my moves:", checkWinner(myMoves))

        checkYourMoves(yourMoves);
        // console.log("eval your moves:", checkYourMoves(yourMoves))
    }

    // No one won
    if (count === 9) {

        teardownBoard()
        alertMessage("Draw! Reset to play again")

    }
}


// Add event listener to squares
const setupBoard = () => {

    for (const square of squares) {

        square.addEventListener('click', choice)

        square.classList.remove("no-hover")
    
    }

}

const teardownBoard = () => {

    for (const square of squares) {

        square.removeEventListener('click', choice)

        square.classList.add("no-hover")
    
    
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

const winningCombinations = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],
    ['1', '5', '9'],
    ['3', '5', '7']
]

let newArr = [];

const checkWinner = (myMoves, yourMoves) => {

    // check myMoves
    for (let i = 0; i < winningCombinations.length; i++) {

        for (let j = 0; j < winningCombinations[i].length; j++){

            for (let k = 0; k < myMoves.length; k++ ){

                if (winningCombinations[i][j] === myMoves[k]) {

                    if (!newArr.includes(myMoves[k])){
                        
                        newArr.push(myMoves[k])

                    }
                    
                    let result = winningCombinations[i].every(x => newArr.includes(x))


                    if (result) {

                        alertMessage("Player 1 won! Reset to play again.")
                        teardownBoard();
                        return true
                    
                    }

                }

            };
        }
    }
}

let newArr2 = [];

const checkYourMoves = (yourMoves) => {

    // check yourMoves
    for (let i = 0; i < winningCombinations.length; i++) {

        for (let j = 0; j < winningCombinations[i].length; j++){

            for (let k = 0; k < yourMoves.length; k++ ){

                if (winningCombinations[i][j] === yourMoves[k]) {

                    if (!newArr2.includes(yourMoves[k])){
                        
                        newArr2.push(yourMoves[k])

                    }
                    
                    let result2 = winningCombinations[i].every(x => newArr2.includes(x))

                    if (result2) {
                        alertMessage("Player 2 won! Reset to play again.")
                        teardownBoard();
                        return true
                    
                    }

                }

            };
        }
    }
}

// Reset the board to play again
const reset = () => {

    // console.log('reset');

    count = 0;
    myMoves = [];
    yourMoves = [];

    newArr = [];
    newArr2 = [];

    for (const square of squares) {

        square.classList.remove("clicked-x") 
        square.classList.remove("clicked-o")

        square.innerHTML = "<img src='images/orange-32x32.png' />";
        
        alert.innerText = "Player 1 moves first";
    }

    setupBoard();
}

button.addEventListener('click', reset)

document.addEventListener('DOMContentLoaded', setupBoard)
