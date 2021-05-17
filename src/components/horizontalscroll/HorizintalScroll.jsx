import React from 'react';

import ScrollBox from './ScrollBox';
import ColorCard from './ColorCard';


const HorizontalScroll = ({kind, data, clickHandler}) => {

  // console.log('is in?')


  if (kind === "top30"){

    return(
      <ScrollBox>
        {data.map(({ code, name, 상승률}) =>
        ( <div key={code} onClick={() => {clickHandler(code)}}>
            <ColorCard name={name} 상승률={상승률} />
          </div>
        ))}
      </ScrollBox>  
    ) 
  } else {

    return(
      <ScrollBox>
        {data.map(({ code, name, 상승률}) =>
        ( <div key={code} onClick={() => {clickHandler(code)}}>
            <ColorCard name={name} key={code} 상승률={상승률}/>
          </div>
        ))}
      </ScrollBox>  
    )
  }
}

export default HorizontalScroll;