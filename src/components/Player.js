import React, { useState, useEffect, useContext } from 'react'
import Deck from './Deck.js'

import { GameStateContext } from '../App'

function Player() {
    const [total, setTotal] = useState(0);

    const gameStateContext = useContext(GameStateContext)


    return (<>
        <h2>Player</h2>
        <div className="cardParent">
            {
                gameStateContext.gameState.playerCards && gameStateContext.gameState.playerCards.length ? gameStateContext.gameState.playerCards.map(
                    function (card) {
                        return (
                            <Deck key={card?.id} card={card}> </Deck>
                        )
                    }
                ) : ""
            }
        </div>
    </>
    )
}

export default Player;