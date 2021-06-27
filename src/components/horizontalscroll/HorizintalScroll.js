import React from 'react';

import ScrollBox from './ScrollBox';
import ColorCard from './ColorCard';


const HorizontalScroll = ({data, clickHandler}) => {
  return(
      // <ScrollBox>
      //   {data.map(({ code, name, 상승률}) => (
      //     <ColorCard 
      //       key={code}
      //       name={name}
      //       상승률={상승률}
      //       code={code}
      //       clickHandler={clickHandler}/>
      //   ))}
      // </ScrollBox> 
      
      <ScrollBox>
        {data.map((v, i) => {
          return(
          <ColorCard 
            key={v.code}
            name={v.name}
            상승률={v.상승률}
            code={v.code}
            id={i}
            clickHandler={clickHandler}/>
          )
          })
        }
      </ScrollBox>  
  ) 
}

export default HorizontalScroll;