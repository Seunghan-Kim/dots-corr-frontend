import React, {useState} from 'react';
import './ColorCardTheme.css';

function ColorCardTheme({ name, clickHandler, code, reason, theme, id }) {

  return (
    <div className="color-card-theme" onClick={() => {clickHandler(code, name)}}>
      <div className="cardHeader">
        <div className='color-card_name_corr'>{name}</div>
        <div className='corrCardNum'>{id}</div>
      </div>
      <div>
        <div className='color-card-theme-name'>{theme}</div>
        <div className='color-card-theme-reason'>{reason}</div>
      </div>      
      {/* <div className='color-card_etc'>{sector}</div> */}
    </div>
  );
}

export default ColorCardTheme;