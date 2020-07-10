//
// Calculating Envido in javascript
//

let suits = ["Hearts" , "Clubs" , "Diamonds" , "Spades"];
let values = ["Ace" , "Two" , "Three" , "Four" , "Five" , "Six" , "Seven" , 
            "Ten" , "Jack" , "Queen" , "King"];
let deck = [];
let playerCards = [];

let runButton = document.getElementById('runButton');
let textArea = document.getElementById('textArea');
// let deck = [];

runButton.addEventListener("click",function(){
    deck = newDeck();
    randomiseDeck(deck);

    playerCards.push(getNextCard() , getNextCard(), getNextCard() );
    textArea.innerText = 'Cards Dealt: ';
    showStatus();
    playerCards=[];
},false);

function showStatus(){

    let playerCardString = '';
    for(let i = 0; i < playerCards.length ; i++){
        playerCardString += playerCards[i].name + ' ('+ getCardNumericValue(playerCards[i]) +')' +' - ' ;  
    }
    textArea.innerText = 
    'Player\'s hand: \n' + 
    playerCardString + 
    '\n' +  'Envido: ('+ getEnvido(playerCards) +')\n\n';

}

function newDeck(){
    let deck = []
    for (let i = 0 ; i < suits.length ; i++){
        for (let s = 0; s < values.length ; s++){
            deck.push({ suit : suits[i] , 
                value: values[s],
                name: values[s] + " of " + suits[i]
            });
        }
    }
    return deck
} 
function getNextCard(){
    return deck.shift();
}
function randomiseDeck(deck){
    for(let i = 0; i < deck.length; i++){
        let idxSwap = Math.trunc(Math.random() * deck.length);
        let tmp = deck[idxSwap];
        deck[idxSwap] = deck[i];
        deck[i] = tmp;
    }
}

function getEnvido(cards){
    let envido = 0;
    console.table(cards)
    let suitDivision = [
    hearts = cards.filter(card => card.suit === "Hearts"),
    spades = cards.filter(card => card.suit === "Spades"),
    clubs = cards.filter(card => card.suit === "Clubs"),
    diamonds = cards.filter(card => card.suit === "Diamonds")
    ]
    
    let usefullCards = suitDivision.find(arrays =>  arrays.length >=2);

    if(usefullCards){
        console.log(usefullCards);
        envido = 20 + getValues(usefullCards);
    }else{
    let usefullArrays = suitDivision.filter(array => array.length >0);
    console.log(usefullArrays);
      envido =  getSplit(usefullArrays)
    }

    // console.log(suitDivision);
    return(envido);
}

function getSplit(cards){
    let values = [ getCardNumericValue(cards[0][0]) , getCardNumericValue(cards[1][0])  , getCardNumericValue(cards[2][0]) ];
    return getHighest(values);
}

function getValues(cards){
    let values = [];
    for(let i = 0; i<cards.length; i++){
        values.push(getCardNumericValue(cards[i]))
    }
    // console.log(values);
    return getResult(values);
}

function getResult(values){
    let minor = 0;
    let highest = 0;

    for(let i = 0; i < values.length ; i++){
        if(values[i] > minor) {
            if(values[i] > highest){
                minor = highest;
                highest = values[i];
            }else{
                minor = values[i];
            }
        }
    }
    // console.log(minor,highest);
    return minor + highest;
}
function getHighest(values){
    let highest = 0;

    for(let i = 0; i < values.length ; i++){
            if(values[i] > highest){
                highest = values[i];
        }
    }
    // console.log(minor,highest);
    return  highest;
}

function getCardNumericValue(card){
    switch (card.value) {
        case 'Ace':
            return 1;
        case 'Two':
            return 2;
        case 'Three':
            return 3;
        case 'Four':
            return 4;
        case 'Five':
            return 5;
        case 'Six':
            return 6;
        case 'Seven':
            return 7;
        default:
            return 0;
    }
}

