import React from 'react';

import ScrollBox from './ScrollBox';
import ColorCard from './ColorCard';


const HorizontalScroll = ({kind, data, clickHandler}) => {

  if (kind === "top30"){

    return(
      <ScrollBox>
        {data.map(({ code, name, 상승률}) => (
          <ColorCard 
            key={code}
            name={name}
            상승률={상승률}
            code={code}
            clickHandler={clickHandler}/>
        ))}
      </ScrollBox>  
    ) 
  } else {

      return(
        <ScrollBox>
          {data.map(({ code, name, 상승률}) => ( 
            <ColorCard 
              key={code}
              name={name} 
              상승률={상승률}
              code={code}
              clickHandler={clickHandler}/>
          ))}
        </ScrollBox>  
      )
  }
}

export default HorizontalScroll;