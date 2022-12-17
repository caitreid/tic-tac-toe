
const squares = document.querySelectorAll("div.square");
const button = document.querySelector(".button");

let count = 0;

const choice = (event) => {

    count++ 
    
    if (count % 2 === 1) {

        event.target.classList.add('clicked-x')

    }

    if (count % 2 === 0 ) {

        event.target.classList.add('clicked-o')
    }
    console.log(event.target);
}

console.log(typeof squares)


for (const square of squares) {

    square.addEventListener('click', choice)

    square.addEventListener('click', () => {
        console.log('square clicked')
    })
}

const reset = () => {

    console.log('reset')
}

button.addEventListener('click', reset)

