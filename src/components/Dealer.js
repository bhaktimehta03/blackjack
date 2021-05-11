import React, { useState, useEffect, useContext } from 'react'
import Deck from './Deck.js'

import { GameStateContext } from '../App'

function Dealer() {
    const [total, setTotal] = useState(0);

    const gameStateContext = useContext(GameStateContext)



    return (<>
        <h2>Dealer</h2>
        <div className="cardParent">
            {
                gameStateContext.gameState.dealerCards && gameStateContext.gameState.dealerCards.length ? gameStateContext.gameState.dealerCards.map(
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

export default Dealer;