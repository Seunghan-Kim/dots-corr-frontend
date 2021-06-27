import React from 'react';

import ScrollBox from './ScrollBox';
import ColorCardCorr from './ColorCardCorr';


const HorizontalScrollCorr = ({data, clickHandler}) => {

  let totalNumOfCards = data.length
  console.log(totalNumOfCards)

  return(
    <ScrollBox>
      {data.map((v, i) => {
        return(
        <ColorCardCorr 
          key={v.code + v.date + v.n_days}
          name={v.Name}
          date={v.date}
          n_days={v.n_days}
          sector={v.Sector}
          corr_value={v.corr_value}
          clickHandler={clickHandler}
          num={i}
          total={totalNumOfCards}
          code={v.code}/>
          )
      })}
    </ScrollBox>  
  )
}

export default HorizontalScrollCorr;