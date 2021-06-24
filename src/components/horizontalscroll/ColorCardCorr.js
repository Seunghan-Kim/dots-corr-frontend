import React from 'react';
import './ColorCardCorr.css';

function ColorCardCorr({ name, base, sector, corr_value, clickHandler, code }) {

  let newBase = base.slice(9,String(base).length)

  return (
    <div className="color-card_corr" onClick={() => {clickHandler(code, 'top30', name)}}>
      <div className='color-card_name_corr'>{name}</div>
      <div>
        <div className='color-card_value'>{corr_value.toFixed(2)}</div>
        <div className='color-card_etc'>{newBase}</div>
      </div>      
      <div className='color-card_etc'>{sector}</div>
    </div>
  );
}

export default ColorCardCorr;