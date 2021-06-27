import React from 'react';
import './ColorCard.css';

function ColorCard({ name, 상승률, code, clickHandler, id}) {

  function adjFontSize(nameLength) {
    if (nameLength > 3) {
      return (1.3 - (name.length - 4)*0.15) + "em";
    } else {
      return "1.3em"
    }      
  }

  let fontSizeAdj= adjFontSize(name.length)

  return (
    <div className="color-card" onClick={() => {clickHandler(code, name)}}>
      <div className="color-card__name" style={{fontSize : fontSizeAdj}} >{name}</div>      
      <div className="yield-id-container">
        <div className="color-card_yield" >{parseFloat(상승률).toFixed(1)}</div>
        <div className="top30Rank">{id}</div>
      </div>
      
      
      
    </div>
  );
}

export default ColorCard;