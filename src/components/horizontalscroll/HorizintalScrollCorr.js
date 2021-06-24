import React from 'react';

import ScrollBox from './ScrollBox';
import ColorCardCorr from './ColorCardCorr';


const HorizontalScrollCorr = ({data, clickHandler}) => {

  return(
    <ScrollBox>
      {data.map(({ Name, base, Sector, corr_value, code}) => (
        <ColorCardCorr 
          name={Name}
          base={base}
          sector={Sector}
          corr_value={corr_value}
          clickHandler={clickHandler}
          code={code}/>
      ))}
    </ScrollBox>  
  )
}

export default HorizontalScrollCorr;