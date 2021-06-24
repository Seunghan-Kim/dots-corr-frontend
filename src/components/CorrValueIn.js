import React from 'react';
// import './ColorCard.css';

function CorrValueIn({ name, base, sector }) {
    let baseStr = String(base)
    let baseShort = base.slice(9, baseStr.length)
    console.log(baseShort)

    return (
        <div >
        <div>{name}</div>
        <div>{baseShort}</div>
        <div>{sector}</div>
        </div>
    );
}

export default CorrValueIn;