console.log("Script loaded");

async function handleHit(){
    console.log("hit");

    const state = await makeAction('hit');
    
    if (state.resolve) {
        gameOver(state.resolve);
    }

}

async function handleStand(){
    console.log("Stand");
    let state = await makeAction('stand');


    if(!state.resolve){
        handlePlay();
    } else {
        gameOver(state.resolve);
    }

};

const gameOver = (resolve) => {
    document.querySelector('#overlay').style.visibility = 'visible';
    document.querySelector('#gameover p').textContent = resolve.message;
};

const handlePlay = async () => {
    let state = await makeAction('play');

    if(!state.resolve){
        setTimeout(handlePlay, 1000);

    }
    else {
        gameOver(state.resolve);
    }

};

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
    const protocol = 'http://';
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

    const respData = await response.json();

    console.log(action, respData);
    render(respData);

    return respData;
}

function render(state){
    console.log('To render', state);

    const dealerHand = document.getElementById('Dealer-hand');
    dealerHand.innerHTML = '';
    for(let i = 0; i < state.dealer.cards.length; i++) {
        dealerHand.appendChild(createCard(state.dealer.cards[i]));
    }
   
    const playerHand = document.getElementById('Player-hand');
    playerHand.innerHTML = '';

    state.player.cards.forEach(card => {
        playerHand.appendChild(createCard(card));
    });

   
}


document.getElementById('hit').onclick = handleHit;
document.getElementById('stand').addEventListener('click',handleStand);
document.querySelector('#gameover button').onclick= () => {
     document.getElementById('overlay').style.visibility = 'hidden';
     makeAction('deal');
};

makeAction('deal');