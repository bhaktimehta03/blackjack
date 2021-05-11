import React, { useState, useEffect, useContext } from 'react'


function Deck(props) {
    return (<div className="card">


        <div className="face">{props.card.face} </div>
        <div className="points"> [ {props.card.points} {props.card.points == 11 ? "Or 1" : ""} pts ]</div>

    </div>
    )
}

export default Deck;