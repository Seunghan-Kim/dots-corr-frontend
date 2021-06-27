import React from 'react';
import './ColorCardCorr.css';

function ColorCardCorr({ name, date, n_days, sector, corr_value, clickHandler, code, num, total }) {

  return (
    <div className="color-card_corr" onClick={() => {clickHandler(code, name)}}>
      <div className="cardHeader">
        <div className='color-card_name_corr'>{name}</div>
        <div className='corrCardNum'>{num+1}/{total}</div>
      </div>
      <div>
        <div className='color-card_value'>{corr_value.toFixed(2)}</div>
        <div className='color-card_etc'>{date.slice(4,9)}</div>
        <div className='color-card_etc'>{n_days}</div>
      </div>      
      <div className='color-card_etc'>{sector}</div>
    </div>
  );
}

export default ColorCardCorr;