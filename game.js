console.log("Script loaded");

function handleHit(){
    const card = {
        label: 'A',
        value: 14,
        suit: {
            name: 'spades',
            symbol: '&spades;'
        }

    };
    document.getElementById('Player-hand').appendChild(createCard(card));
}

function handleStand(){
    console.log("Stand")
}

function createCard(card) {
    const newCard = document.createElement('div');
    newCard.classList.add('card');

    const top = document.createElement('div')
    top.classList.add('card-top');
    top.textContent = card.label;

    const middle = document.createElement('div')
    middle.classList.add('suit');
    middle.innerHTML = card.suit.symbol;

    const bottom = document.createElement('div')
    bottom.classList.add('card-bottom');
    bottom.textContent = card.label;


    console.log(top);
    newCard.appendChild(top);
    newCard.appendChild(middle);
    newCard.appendChild(bottom);

    return newCard;
}

async function makeAction(action) {
    const protocol = 'https://';
    const host = 'polar-temple-58359.herokuapp.com';
    const path = '/api/v1/game/';
    const gameId = 'test';

    const url = protocol + host + path + gameId;

    const reqData = {
        action: action
    }
    const response = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqData)
    });

    const resData = await response.json();

    console.log(resData);

}

function addCard(container) {
    container.appendChild(createCard());
}

document.getElementById('hit').onclick = handleHit;
document.getElementById('stand').addEventListener('click',handleStand);

console.log(createCard());
