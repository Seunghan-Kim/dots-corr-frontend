import React from 'react';
import './ColorCard.css';

function ColorCard({ name, 상승률 }) {

  function handleColorCopy() {
    console.log(상승률, name)
  }

  function adjFontSize(nameLength) {
    if (nameLength > 3) {
      return (1.3 - (name.length - 4)*0.15) + "em";
    } else {
      return "1.3em"
    }      
  }

  let colorCode = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');

  let fontSizeAdj= adjFontSize(name.length)

  return (
    <div className="color-card" style={{ backgroundColor: colorCode }} onClick={handleColorCopy}>
      <div className="color-card_yield" >{상승률}</div>
      <div className="color-card__name" style={{fontSize : fontSizeAdj}} >{name}</div>
      
    </div>
  );
}

// ColorCard.propTypes = {
//   color: PropTypes.string.isRequired,
// };

export default ColorCard;