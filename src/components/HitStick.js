import React, { useState, useEffect, useContext } from 'react'
import { GameStateContext } from '../App'

function HitStick() {

    const gameStateContext = useContext(GameStateContext)

    let dealNewGame = () => {
        // console.log("dealNewGame= ");
        // let deck = shuffleCards();
        // console.log("dealNewGame= ", deck);
        gameStateContext.setGameStateDispatch('deal');
    };

    let stickAction = () => {
        console.log(" stickAction event called!")
        gameStateContext.setGameStateDispatch('stick');
    }

    let hitAction = () => {
        console.log(" hitAction event called!")
        gameStateContext.setGameStateDispatch('hit');
    }

    let showActionButtons = (gameStaus) => {
        if (gameStaus === 'active') {
            return (<>
                <button onClick={hitAction}>hit </button>
                <button onClick={stickAction}>stick</button>
            </>);
        }

    }


    let showGameStaus = (gameStaus) => {
        let retString = "Please press deal to stat new game";
        switch (gameStaus) {
            case 'active':
                retString = "Please select HIT or STICK";
                break;
            case 'playerBust':
                retString = "Player Bust  :(   better luck next time. " + retString;
                break;
            case 'dealerBust':
                retString = "Yay! Dealer Bust, ***YOU WIN***,  " + retString;

                break;
            case 'tie':
                retString = "its a tie,  " + retString;
                break;
            case 'playerWins':
                retString = "Yay!  ***YOU WIN***,  " + retString;
                break;
            case 'dealerWins':
                retString = "Dealer wins,  better luck next time.  " + retString;
                break;
            default:

        }
        return retString;

    }
    return (
        <div>
            <h2>Player: {gameStateContext.gameState.playerTotal} | Dealer: {gameStateContext.gameState.dealerTotal}</h2>
            <div style={{ color: "blue" }}>
                {showGameStaus(gameStateContext.gameState.gameStaus)}
            </div>
            <button onClick={dealNewGame}>Deal</button>

            {showActionButtons(gameStateContext.gameState.gameStaus)}




        </div>

    )
}

export default HitStick;