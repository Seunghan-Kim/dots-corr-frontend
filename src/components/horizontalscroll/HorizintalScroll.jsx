import React from 'react';

import ScrollBox from './ScrollBox';
import ColorCard from './ColorCard';


const HorizontalScroll = (props) => {

  let data = props.data;

  if (props.kind === "top30"){

    let data = props.data;

    return(
      <ScrollBox>
        {data.map(({ code, name, 상승률}) =>
        (
          <ColorCard name={name} key={code} 상승률={상승률}/>
        ))}
      </ScrollBox>  
    ) 
  } else {

    return(
      <ScrollBox>
        {data.map(({ code, name, 상승률}) =>
        (
          <ColorCard name={name} key={code} 상승률={상승률}/>
        ))}
      </ScrollBox>  
    )
  }
}

export default HorizontalScroll;