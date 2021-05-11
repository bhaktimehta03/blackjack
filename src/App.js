import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useContext, useReducer } from 'react'
import Player from './components/Player.js'
import Dealer from './components/Dealer.js'
import HitStick from './components/HitStick.js'

export const GameStateContext = React.createContext();

const initialGameState = {
  deck: [],
  playerCards: [],
  dealerCards: [],
  playerTotal: 0,
  dealerTotal: 0,
  gameStaus: "na",
};
const reducer = (state, action) => {
  // console.log("here state is ", state)
  // console.log("here action is ", action)

  var deck, dealerTotal, playerTotal, dealerCards, playerCards, dealerBust, playerBust, gameStaus;
  switch (action) {

    case 'deal':
      deck = shuffleCards();
      playerCards = [deck.pop(), deck.pop()];
      dealerCards = [deck.pop()];
      playerTotal = getTotal(playerCards);
      dealerTotal = getTotal(dealerCards);

      var a = { j1: 1, k2: 2 }
      var b = { j1: 1, j2: 2 }
      state = {
        ...state,
        deck,
        playerCards: playerCards,
        dealerCards,
        dealerTotal,
        playerTotal,
        gameStaus: 'active'
      }


      break;
    case 'hit':
      deck = [...state.deck];
      playerCards = [...state.playerCards, deck.pop()];
      playerTotal = getTotal(playerCards);
      playerBust = (playerTotal > 21);
      gameStaus = playerBust ? "" : gameStaus;
      state = {
        ...state,
        deck,
        playerCards,
        playerTotal,

      }
      if (playerBust) {
        state.gameStaus = "playerBust";
      }
      break;
    case 'stick':
      playerTotal = state.playerTotal;
      deck = [...state.deck];
      dealerCards = [...state.dealerCards];
      gameStaus = state.gameStaus;
      while (gameStaus === "active" && deck.length > 0) {
        dealerCards = [...dealerCards, deck.pop()];
        dealerTotal = getTotal(dealerCards);
        console.log("dealerTotal = ", dealerTotal)
        if (dealerTotal > 21) {
          gameStaus = "dealerBust";
        } else if (dealerTotal > state.playerTotal) {
          gameStaus = "dealerWins";
        } else if (dealerTotal === state.playerTotal) {
          gameStaus = "tie";
        } else {
          gameStaus = "active";
        }
      }
      console.log("Game status = ", gameStaus);
      state = {
        ...state,
        deck,
        dealerCards,
        dealerTotal,
        gameStaus
      }
      break;


  }
  return state
}


function App() {

  const [gameState, setGameStateDispatch] = useReducer(reducer, initialGameState);// redux can be used here...



  return (
    <div className="App">
      <header className="App-header">
        <GameStateContext.Provider value={
          { gameState: gameState, setGameStateDispatch: setGameStateDispatch }
        }>
          <Player></Player>
          <HitStick></HitStick>
          <Dealer></Dealer>
        </GameStateContext.Provider>
      </header>
    </div>
  );
}

function getRandomNos(no) {
  var arr = [];
  while (arr.length < no) {
    var r = (Math.floor(Math.random() * 100)) % no;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}

function shuffleCards() {
  let randomNos = getRandomNos(deckMaster.length);
  let newDeck = [];
  for (let i = 0; i < randomNos.length; i++) {
    var card = { ...deckMaster[randomNos[i]], id: i };
    newDeck.push(card);
  }
  return newDeck;
}

function getTotal(cardArr) {
  let total = 0
  let aceCount = 0;
  for (let i = 0; i < cardArr.length; i++) {
    let points = cardArr[i].points;
    if (points === 11) {
      aceCount++;
    }
    total += points;
  }
  console.log("Total Ace : ", aceCount)
  while (total > 21 && aceCount > 0) {
    console.log(" Reducing value of ACE ");
    aceCount--;
    total -= 10;
  }
  return total;
}

const deckMaster = [
  { face: "♥-A", points: 11 },
  { face: "♥-2", points: 2 },
  { face: "♥-3", points: 3 },
  { face: "♥-4", points: 4 },
  { face: "♥-5", points: 5 },
  { face: "♥-6", points: 6 },
  { face: "♥-7", points: 7 },
  { face: "♥-8", points: 8 },
  { face: "♥-9", points: 9 },
  { face: "♥-10", points: 10 },
  { face: "♥-J", points: 10 },
  { face: "♥-Q", points: 10 },
  { face: "♥-K", points: 10 },

  { face: "♦-A", points: 11 },
  { face: "♦-2", points: 2 },
  { face: "♦-3", points: 3 },
  { face: "♦-4", points: 4 },
  { face: "♦-5", points: 5 },
  { face: "♦-6", points: 6 },
  { face: "♦-7", points: 7 },
  { face: "♦-8", points: 8 },
  { face: "♦-9", points: 9 },
  { face: "♦-10", points: 10 },
  { face: "♦-J", points: 10 },
  { face: "♦-Q", points: 10 },
  { face: "♦-K", points: 10 },

  { face: "♠-A", points: 11 },
  { face: "♠-2", points: 2 },
  { face: "♠-3", points: 3 },
  { face: "♠-4", points: 4 },
  { face: "♠-5", points: 5 },
  { face: "♠-6", points: 6 },
  { face: "♠-7", points: 7 },
  { face: "♠-8", points: 8 },
  { face: "♠-9", points: 9 },
  { face: "♠-10", points: 10 },
  { face: "♠-J", points: 10 },
  { face: "♠-Q", points: 10 },
  { face: "♠-K", points: 10 },

  { face: "♣-A", points: 11 },
  { face: "♣-2", points: 2 },
  { face: "♣-3", points: 3 },
  { face: "♣-4", points: 4 },
  { face: "♣-5", points: 5 },
  { face: "♣-6", points: 6 },
  { face: "♣-7", points: 7 },
  { face: "♣-8", points: 8 },
  { face: "♣-9", points: 9 },
  { face: "♣-10", points: 10 },
  { face: "♣-J", points: 10 },
  { face: "♣-Q", points: 10 },
  { face: "♣-K", points: 10 },

];
export default App;
