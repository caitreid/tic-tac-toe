
const square = document.querySelectorAll('.square');

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


document.addEventListener('click', choice)

