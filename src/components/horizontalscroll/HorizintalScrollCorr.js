import React from 'react';

import ScrollBox from './ScrollBox';
import ColorCardCorr from './ColorCardCorr';


const HorizontalScrollCorr = ({data, clickHandler}) => {

  return(
    <ScrollBox>
      {data.map(({ Name, date, n_days, Sector, corr_value, code}) => (
        <ColorCardCorr 
          key={code + date + n_days}
          name={Name}
          date={date}
          n_days={n_days}
          sector={Sector}
          corr_value={corr_value}
          clickHandler={clickHandler}
          code={code}/>
      ))}
    </ScrollBox>  
  )
}

export default HorizontalScrollCorr;