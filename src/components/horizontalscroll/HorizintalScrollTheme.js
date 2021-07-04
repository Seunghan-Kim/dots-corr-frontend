import React from 'react';

import ScrollBox from './ScrollBox';
import ColorCardTheme from './ColorCardTheme';


const HorizontalScrollTheme = ({data, code, clickHandler}) => {

  if (data.length !== 0) {

    return(      
      <ScrollBox>
        {data.map((v, i) => {
          
            return(
            <ColorCardTheme
              key={v.code}
              name={v.stock_name}
              reason={v.reason_theme}
              theme={v.theme_name}
              code={v.code}
              id={i+1}
              clickHandler={clickHandler}/>
            )
        
          })
        }
      </ScrollBox>  
  ) 
  } else {
    return(
      
        <div className='nothingText'>Nothing to show</div>
      
    )
  }
}

export default HorizontalScrollTheme;