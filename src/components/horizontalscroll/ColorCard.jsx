import React from 'react';
import './ColorCard.css';

function ColorCard({ name, 상승률, code, clickHandler }) {

  function adjFontSize(nameLength) {
    if (nameLength > 3) {
      return (1.3 - (name.length - 4)*0.15) + "em";
    } else {
      return "1.3em"
    }      
  }

  // let colorCode = '#dddddd';

  let fontSizeAdj= adjFontSize(name.length)

  return (
    <div className="color-card" onClick={() => {clickHandler(code)}}>
      <div className="color-card_yield" >{상승률}</div>
      <div className="color-card__name" style={{fontSize : fontSizeAdj}} >{name}</div>
    </div>
  );
}

export default ColorCard;