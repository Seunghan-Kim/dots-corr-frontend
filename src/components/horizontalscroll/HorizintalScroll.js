import React from 'react';

import ScrollBox from './ScrollBox';
import ColorCard from './ColorCard';


const HorizontalScroll = ({data, clickHandler}) => {
  return(      
      <ScrollBox>
        {data.map((v, i) => {
          return(
          <ColorCard 
            key={v.code}
            name={v.name}
            상승률={v.상승률}
            code={v.code}
            id={i+1}
            clickHandler={clickHandler}/>
          )
          })
        }
      </ScrollBox>  
  ) 
}

export default HorizontalScroll;